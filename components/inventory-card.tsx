"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { InventoryItem } from "@/types";
import { formatPrice } from "@/lib/utils";

interface InventoryCardProps {
  item: InventoryItem;
  onSelect?: (item: InventoryItem) => void;
}

export function InventoryCard({ item, onSelect }: InventoryCardProps) {
  return (
    <button
      onClick={() => onSelect?.(item)}
      className="text-left w-full bg-white rounded-xl border border-zinc-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="relative aspect-square bg-zinc-100">
        {item.photos[0] ? (
          <Image
            src={item.photos[0]}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {item.type === "nails" ? "💅" : item.type === "makeup" ? "💄" : "💇‍♀️"}
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-2 left-2">
          <Badge variant={item.type as "nails" | "makeup" | "wig"} className="capitalize text-xs">
            {item.type}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h4 className="font-medium text-zinc-900 text-sm truncate mb-1">
          {item.name}
        </h4>
        <p className="text-pink-600 font-semibold text-sm">
          {formatPrice(item.price)}
        </p>
      </div>
    </button>
  );
}
