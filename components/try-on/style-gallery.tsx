"use client";

import Image from "next/image";
import { StyleOption } from "@/types/try-on";
import { ServiceType } from "@/types";
import { getStylesByService } from "@/lib/try-on-styles";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StyleGalleryProps {
  service: ServiceType;
  selectedStyle: StyleOption | null;
  onSelect: (style: StyleOption) => void;
}

// Placeholder images for styles (using gradients as fallback)
const placeholderGradients: Record<ServiceType, string[]> = {
  nails: [
    "from-pink-300 to-rose-400",
    "from-amber-300 to-yellow-400",
    "from-red-400 to-rose-500",
    "from-pink-400 to-fuchsia-400",
  ],
  makeup: [
    "from-rose-300 to-pink-400",
    "from-purple-400 to-pink-500",
    "from-pink-200 to-rose-300",
    "from-fuchsia-400 to-pink-500",
  ],
  wig: [
    "from-amber-800 to-yellow-900",
    "from-zinc-800 to-zinc-900",
    "from-amber-600 to-orange-700",
    "from-zinc-700 to-zinc-800",
  ],
};

export function StyleGallery({ service, selectedStyle, onSelect }: StyleGalleryProps) {
  const styles = getStylesByService(service);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-zinc-500">Choose a style</h3>
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
        {styles.map((style, index) => {
          const isSelected = selectedStyle?.id === style.id;
          const gradient = placeholderGradients[service][index % 4];

          return (
            <button
              key={style.id}
              onClick={() => onSelect(style)}
              className={cn(
                "flex-shrink-0 relative rounded-xl overflow-hidden transition-all duration-200",
                "w-24 h-32 md:w-28 md:h-36",
                isSelected
                  ? "ring-2 ring-pink-500 ring-offset-2 scale-[1.02]"
                  : "hover:scale-[1.02]"
              )}
            >
              {/* Style Preview Image */}
              <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)}>
                {style.previewImage && !style.previewImage.startsWith("/styles") && (
                  <Image
                    src={style.previewImage}
                    alt={style.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Style Name */}
              <div className="absolute bottom-0 inset-x-0 p-2">
                <p className="text-white text-xs font-medium text-center truncate">
                  {style.name}
                </p>
              </div>

              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 p-1 bg-pink-500 rounded-full">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
