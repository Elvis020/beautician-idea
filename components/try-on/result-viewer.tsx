"use client";

import { useState } from "react";
import Image from "next/image";
import { RefreshCw, Camera, Share2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ServiceType } from "@/types";

interface ResultViewerProps {
  originalImage: string;
  generatedImage: string;
  service: ServiceType;
  onTryAnother: () => void;
  onRetake: () => void;
}

export function ResultViewer({
  originalImage,
  generatedImage,
  service,
  onTryAnother,
  onRetake,
}: ResultViewerProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging && e.type !== "click") return;

    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();

    let clientX: number;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My LukGood Try-On",
          text: "Check out my new look on LukGood!",
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Before/After Comparison */}
      <div
        className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-ew-resize select-none"
        onClick={handleSliderMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleSliderMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleSliderMove}
      >
        {/* Generated Image (Full) */}
        <div className="absolute inset-0">
          <Image
            src={generatedImage}
            alt="Generated look"
            fill
            className="object-cover"
            unoptimized // External URL from Replicate
          />
        </div>

        {/* Original Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={originalImage}
            alt="Original photo"
            fill
            className="object-cover"
          />
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-4 bg-zinc-400 rounded-full" />
              <div className="w-0.5 h-4 bg-zinc-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
          <span className="text-white text-xs font-medium">Before</span>
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
          <span className="text-white text-xs font-medium">After</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onRetake}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-zinc-100 hover:bg-zinc-200 rounded-xl text-zinc-700 font-medium transition-colors"
        >
          <Camera className="w-5 h-5" />
          New Photo
        </button>
        <button
          onClick={onTryAnother}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-zinc-100 hover:bg-zinc-200 rounded-xl text-zinc-700 font-medium transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Try Style
        </button>
        <button
          onClick={handleShare}
          className="p-3 bg-zinc-100 hover:bg-zinc-200 rounded-xl text-zinc-700 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Find Beauticians CTA */}
      <Link
        href={`/explore?service=${service}`}
        className={cn(
          "flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-medium transition-all",
          "bg-gradient-to-r from-pink-600 to-rose-500 text-white",
          "hover:from-pink-700 hover:to-rose-600 hover:shadow-lg hover:shadow-pink-500/25"
        )}
      >
        Find Beauticians for This Look
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
