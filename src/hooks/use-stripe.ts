import { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>();

  useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstance = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!,
      );
      setStripe(stripeInstance);
    }

    loadStripeAsync();
  }, []);

  async function createStripeCheckout({
    metadata,
    isSubscription,
  }: {
    metadata: unknown;
    isSubscription: boolean;
  }) {
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ metadata, isSubscription }),
      });

      const data = await response.json();
      await stripe?.redirectToCheckout({
        sessionId: data.sessionId,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return { stripe, createStripeCheckout };
}
