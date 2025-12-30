"use client";

import { cn } from "@/lib/utils";
import { ServiceType } from "@/types";

interface ServiceFilterProps {
  selected: ServiceType | null;
  onChange: (service: ServiceType | null) => void;
}

const services: {
  value: ServiceType | null;
  label: string;
  emoji: string;
}[] = [
  { value: null, label: "All", emoji: "✨" },
  { value: "nails", label: "Nails", emoji: "💅" },
  { value: "makeup", label: "Makeup", emoji: "💄" },
  { value: "wig", label: "Wigs", emoji: "💇‍♀️" },
];

export function ServiceFilter({ selected, onChange }: ServiceFilterProps) {
  return (
    <div className="inline-flex gap-1.5 overflow-x-auto hide-scrollbar p-1 bg-zinc-100/80 rounded-2xl backdrop-blur-sm">
      {services.map((service) => {
        const isSelected = selected === service.value;
        return (
          <button
            key={service.label}
            onClick={() => onChange(service.value)}
            className={cn(
              "relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ease-out",
              isSelected
                ? "bg-white text-zinc-900 shadow-md shadow-zinc-900/10"
                : "text-zinc-500 hover:text-zinc-700 hover:bg-white/50"
            )}
          >
            <span className={cn(
              "text-sm transition-transform duration-300",
              isSelected && "scale-110"
            )}>
              {service.emoji}
            </span>
            <span className="tracking-tight">{service.label}</span>
            {isSelected && (
              <span className="absolute inset-0 rounded-xl ring-1 ring-zinc-900/5" />
            )}
          </button>
        );
      })}
    </div>
  );
}
