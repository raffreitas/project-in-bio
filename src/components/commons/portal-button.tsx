"use client";

import { useStripe } from "@/hooks/use-stripe";

export function PortalButton() {
  const { handleCreateStripePortal } = useStripe();
  return <button onClick={handleCreateStripePortal}>Portal</button>;
}
