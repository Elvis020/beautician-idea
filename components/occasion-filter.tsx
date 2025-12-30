"use client";

import { cn } from "@/lib/utils";
import { OccasionType } from "@/types";

interface OccasionFilterProps {
  selected: OccasionType | null;
  onChange: (occasion: OccasionType | null) => void;
}

const occasions: { value: OccasionType | null; label: string; emoji: string }[] = [
  { value: null, label: "Any", emoji: "✨" },
  { value: "wedding", label: "Wedding", emoji: "💒" },
  { value: "party", label: "Party", emoji: "🎉" },
  { value: "funeral", label: "Funeral", emoji: "🖤" },
  { value: "office", label: "Office", emoji: "💼" },
  { value: "casual", label: "Casual", emoji: "👋" },
];

export function OccasionFilter({ selected, onChange }: OccasionFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
      {occasions.map((occasion) => (
        <button
          key={occasion.label}
          onClick={() => onChange(occasion.value)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
            selected === occasion.value
              ? "bg-pink-600 text-white border-pink-600"
              : "bg-white text-zinc-700 border-zinc-200 hover:border-pink-300"
          )}
        >
          <span>{occasion.emoji}</span>
          <span>{occasion.label}</span>
        </button>
      ))}
    </div>
  );
}
