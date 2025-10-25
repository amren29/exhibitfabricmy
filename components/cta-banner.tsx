import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to Make Your Brand Stand Out?
        </h2>
        <p className="text-white/90 text-sm mb-6 max-w-2xl mx-auto">
          Get a custom quotation for your next exhibition or event. Our team is ready
          to bring your vision to life.
        </p>
        <Button
          size="xl"
          variant="outline"
          className="bg-white text-primary hover:bg-gray-100"
          asChild
        >
          <Link href="/contact">Request a Quotation</Link>
        </Button>
      </div>
    </section>
  );
}
