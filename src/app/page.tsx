import {
  FAQ,
  Header,
  Hero,
  Pricing,
  VideoExplanation,
} from "@/components/landing-page";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto ">
      <Header />
      <Hero />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  );
}
