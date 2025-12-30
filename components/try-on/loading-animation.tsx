"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingAnimationProps {
  progress: number;
}

const loadingMessages = [
  "Analyzing your photo...",
  "Preparing AI magic...",
  "Applying style...",
  "Adding finishing touches...",
  "Almost there...",
];

export function LoadingAnimation({ progress }: LoadingAnimationProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 backdrop-blur-sm rounded-2xl">
      {/* Animated Sparkle Icon */}
      <div className="relative">
        <Sparkles className="w-16 h-16 text-pink-400 animate-pulse" />
        <div className="absolute inset-0 animate-ping">
          <Sparkles className="w-16 h-16 text-pink-400/30" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 w-48">
        <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1 text-right text-xs text-zinc-500">{Math.round(progress)}%</p>
      </div>

      {/* Loading Message */}
      <p className="mt-4 text-white text-sm font-medium animate-fade-in">
        {loadingMessages[messageIndex]}
      </p>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-pink-400/30 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
