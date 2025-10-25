import { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Zap, Users, Award } from "lucide-react";
import { CTABanner } from "@/components/cta-banner";

export const metadata: Metadata = {
  title: "About Us - Exhibit Fabric",
  description:
    "Learn about Exhibit Fabric's mission to deliver premium trade show booths and fabric printing solutions across Malaysia.",
};

export default function AboutPage() {
  const highlights = [
    {
      icon: Zap,
      title: "Fast Production",
      description:
        "Quick turnaround times without compromising on quality. We understand the importance of deadlines in the exhibition industry.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Our experienced designers and fabricators bring years of expertise to every project, ensuring professional results.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description:
        "We use only the best materials and cutting-edge printing technology to deliver displays that truly stand out.",
    },
    {
      icon: CheckCircle2,
      title: "Nationwide Service",
      description:
        "Serving clients across Kuala Lumpur, Kota Kinabalu, and Kuching with reliable logistics and installation support.",
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[350px] bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            About Exhibit Fabric
          </h1>
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto">
            Your trusted partner for custom trade show booths and fabric
            printing solutions
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Our Story
            </h2>
            <div className="max-w-none text-muted-foreground">
              <p className="mb-4 text-sm">
                Founded with a passion for helping brands make lasting
                impressions, Exhibit Fabric has grown to become a leading
                provider of trade show and exhibition solutions in Malaysia.
              </p>
              <p className="mb-4 text-sm">
                We believe that every brand deserves to shine at their events.
                That's why we've invested in state-of-the-art fabric printing
                technology and assembled a team of creative professionals who
                are dedicated to bringing your vision to life.
              </p>
              <p className="mb-4 text-sm">
                From intimate corporate events to large-scale international
                exhibitions, we've had the privilege of partnering with
                businesses across diverse industries. Each project is an
                opportunity for us to push creative boundaries and deliver
                solutions that exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Mission */}
              <div className="py-6 px-6 md:pr-12 border-b md:border-b-0 md:border-r border-gray-300">
                <div className="flex items-center justify-center w-14 h-14 bg-primary rounded-full mb-5 mx-auto">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-5 text-center">
                  Our Mission
                </h2>
                <p className="max-w-none text-muted-foreground text-center mb-4 text-sm">
                  To empower businesses with exceptional exhibition displays that
                  capture attention, communicate brand values, and create memorable
                  experiences. We're committed to combining innovative design,
                  superior craftsmanship, and outstanding service in every project
                  we undertake.
                </p>
              </div>

              {/* Vision */}
              <div className="py-6 px-6 md:pl-12">
                <div className="flex items-center justify-center w-14 h-14 bg-primary rounded-full mb-5 mx-auto">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-5 text-center">
                  Our Vision
                </h2>
                <p className="max-w-none text-muted-foreground text-center mb-4 text-sm">
                  To be Malaysia's most trusted and innovative exhibition solutions
                  provider, recognized for transforming brands into unforgettable
                  experiences. We aspire to set new standards in quality, creativity,
                  and sustainability while helping businesses across the region shine
                  at every event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className="text-center p-5 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-full mb-3">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </>
  );
}
