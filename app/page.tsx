"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, MapPin, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div className="flex min-h-dvh bg-white">
      {/* Left Side - Content */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-pink-600 via-pink-500 to-rose-500 text-white lg:max-w-[55%] relative overflow-hidden">
        {/* Decorative Elements - Mobile */}
        <div className="absolute inset-0 opacity-10 lg:hidden">
          <div className="absolute top-20 left-10 text-7xl">💅</div>
          <div className="absolute top-40 right-8 text-6xl">💄</div>
          <div className="absolute bottom-32 left-16 text-5xl">💇‍♀️</div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-dvh">
          {/* Header */}
          <header className="flex items-center justify-between px-6 pt-8 pb-4 lg:pt-10 lg:px-12">
            <div
              className={`flex items-center gap-2.5 transition-all duration-700 ${
                isAnimated ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              <div className="bg-white rounded-xl p-2 shadow-lg shadow-pink-700/20">
                <Sparkles className="h-5 w-5 lg:h-6 lg:w-6 text-pink-600" />
              </div>
              <span className="text-xl lg:text-2xl font-bold tracking-tight">LukGood</span>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex flex-col items-center lg:items-start justify-center px-6 lg:px-12 text-center lg:text-left pb-8">
            <div
              className={`transition-all duration-700 delay-200 max-w-lg ${
                isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {/* Tagline */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-5 leading-[1.1] tracking-tight">
                Find Your Perfect
                <br />
                <span className="text-pink-200">Look Nearby</span>
              </h1>

              <p className="text-pink-100 text-lg lg:text-xl mb-10 max-w-md">
                Discover talented beauticians in your area for nails, makeup & wigs
              </p>

              {/* Service Icons */}
              <div className="flex justify-center lg:justify-start gap-3 lg:gap-4 mb-10">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3.5 lg:p-4 text-3xl lg:text-4xl hover:scale-110 transition-transform cursor-default">
                  💅
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3.5 lg:p-4 text-3xl lg:text-4xl hover:scale-110 transition-transform cursor-default">
                  💄
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3.5 lg:p-4 text-3xl lg:text-4xl hover:scale-110 transition-transform cursor-default">
                  💇‍♀️
                </div>
              </div>

              {/* CTA Button */}
              <Link href="/explore">
                <Button
                  size="lg"
                  className="bg-white text-pink-600 hover:bg-pink-50 font-semibold px-8 py-6 text-base lg:text-lg rounded-full shadow-xl shadow-pink-900/20 gap-2 hover:gap-3 transition-all"
                >
                  <MapPin className="h-5 w-5" />
                  Find Beauticians
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>

              {/* Stats - Desktop only */}
              <div className="hidden lg:flex items-center gap-8 mt-12 pt-8 border-t border-white/20">
                <div>
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-pink-200 text-sm">Beauticians</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">10k+</p>
                  <p className="text-pink-200 text-sm">Happy Customers</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-amber-300 text-amber-300" />
                  <p className="text-3xl font-bold">4.8</p>
                  <p className="text-pink-200 text-sm ml-1">Rating</p>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer
            className={`px-6 lg:px-12 py-6 transition-all duration-700 delay-500 ${
              isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/register?role=beautician"
              className="text-pink-100 hover:text-white text-sm inline-flex items-center gap-1 group"
            >
              Are you a beautician?{" "}
              <span className="font-semibold underline underline-offset-2 group-hover:underline-offset-4 transition-all">
                Join us
              </span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </footer>
        </div>
      </div>

      {/* Right Side - Visual (Desktop Only) */}
      <div className="hidden lg:flex flex-1 bg-zinc-50 items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pattern-dots opacity-30" />

        {/* Floating Cards */}
        <div className="relative w-full max-w-md">
          {/* Main Card */}
          <div
            className={`bg-white rounded-3xl shadow-2xl p-6 transform transition-all duration-1000 delay-300 ${
              isAnimated ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-12 rotate-3"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-2xl">
                👩🏾‍🦱
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900">Akosua Beauty Lounge</h3>
                <div className="flex items-center gap-1 text-sm text-zinc-500">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>4.8</span>
                  <span className="text-zinc-300">•</span>
                  <span>Osu, Accra</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Nails</span>
              <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-medium rounded-full">Makeup</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 flex items-center justify-center text-2xl">💅</div>
              <div className="aspect-square rounded-xl bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center text-2xl">💄</div>
              <div className="aspect-square rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center text-2xl">✨</div>
            </div>
          </div>

          {/* Floating Badge */}
          <div
            className={`absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 transition-all duration-1000 delay-500 ${
              isAnimated ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Distance</p>
                <p className="font-semibold text-zinc-900 text-sm">0.5 km away</p>
              </div>
            </div>
          </div>

          {/* Floating Review */}
          <div
            className={`absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-4 py-3 transition-all duration-1000 delay-700 ${
              isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-sm">👩🏾</div>
                <div className="w-8 h-8 rounded-full bg-pink-200 border-2 border-white flex items-center justify-center text-sm">👩🏽</div>
                <div className="w-8 h-8 rounded-full bg-purple-200 border-2 border-white flex items-center justify-center text-sm">👩🏿</div>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 text-sm">200+ reviews</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
