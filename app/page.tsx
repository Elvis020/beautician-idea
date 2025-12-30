"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, MapPin } from "lucide-react";
import { TryOnSection } from "@/components/try-on/try-on-section";
import { mockBeauticians } from "@/lib/mock-data";
import Image from "next/image";

export default function Home() {
  // Get top beauticians for the popular section
  const popularBeauticians = mockBeauticians
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  return (
    <div className="min-h-dvh bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="container-app py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl p-1.5">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-zinc-900 tracking-tight">LukGood</span>
          </div>
          <Link
            href="/explore"
            className="text-sm text-pink-600 font-medium hover:text-pink-700 flex items-center gap-1"
          >
            Browse Beauticians
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container-app py-8 lg:py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900 mb-3 tracking-tight">
            Try Before You Visit
          </h1>
          <p className="text-zinc-500 md:text-lg max-w-md mx-auto">
            See how you&apos;d look with new nails, makeup, or a wig using AI
          </p>
        </div>

        {/* Try-On Feature */}
        <TryOnSection />
      </section>

      {/* Divider */}
      <div className="container-app">
        <div className="border-t border-zinc-200" />
      </div>

      {/* Popular Beauticians Section */}
      <section className="container-app py-8 lg:py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-zinc-900">
            Popular Near You
          </h2>
          <Link
            href="/explore"
            className="text-sm text-pink-600 font-medium hover:text-pink-700 flex items-center gap-1"
          >
            See all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {popularBeauticians.map((beautician) => (
            <Link
              key={beautician.id}
              href={`/beautician/${beautician.id}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Cover Image */}
              <div className="relative aspect-[4/3]">
                {beautician.cover_photo ? (
                  <Image
                    src={beautician.cover_photo}
                    alt={beautician.business_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-100" />
                )}
                {/* Distance Badge */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-zinc-700 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  2.1 km
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="font-medium text-zinc-900 text-sm truncate">
                  {beautician.business_name}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-amber-500">★</span>
                  <span className="text-sm text-zinc-600">{beautician.rating || "4.5"}</span>
                  <span className="text-zinc-300 text-sm">•</span>
                  <span className="text-sm text-zinc-500 truncate">{beautician.address.split(",")[0]}</span>
                </div>
                {/* Service Tags */}
                <div className="flex gap-1 mt-2">
                  {beautician.services_offered.slice(0, 2).map((service) => (
                    <span
                      key={service}
                      className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 capitalize"
                    >
                      {service === "wig" ? "Wigs" : service}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="container-app py-6 border-t border-zinc-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            Are you a beautician?{" "}
            <Link href="/register?role=beautician" className="text-pink-600 font-medium hover:underline">
              Join LukGood
            </Link>
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Sparkles className="h-4 w-4" />
            <span>Powered by AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
