"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Beautician } from "@/types";
import { cn } from "@/lib/utils";

interface BeauticianCardProps {
  beautician: Beautician;
  distance?: number;
  variant?: "grid" | "list";
}

export function BeauticianCard({ beautician, distance, variant = "grid" }: BeauticianCardProps) {
  if (variant === "list") {
    return (
      <Link href={`/beautician/${beautician.id}`}>
        <Card className="overflow-hidden card-hover flex flex-row">
          {/* Image */}
          <div className="relative w-32 sm:w-40 md:w-48 flex-shrink-0 bg-zinc-100">
            {beautician.cover_photo ? (
              <Image
                src={beautician.cover_photo}
                alt={beautician.business_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-100" />
            )}
            {/* Profile Photo */}
            <div className="absolute bottom-2 left-2">
              <div className="relative h-10 w-10 rounded-full border-2 border-white overflow-hidden bg-white shadow-md">
                {beautician.profile_photo ? (
                  <Image
                    src={beautician.profile_photo}
                    alt={beautician.business_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-sm">
                    {beautician.business_name[0]}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col justify-center">
            {/* Name & Verified */}
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="font-semibold text-zinc-900 truncate">
                {beautician.business_name}
              </h3>
              {beautician.is_verified && (
                <BadgeCheck className="h-4 w-4 text-pink-600 flex-shrink-0" />
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span className="text-sm font-medium text-zinc-900">
                {beautician.rating?.toFixed(1)}
              </span>
              <span className="text-sm text-zinc-500">
                ({beautician.review_count} reviews)
              </span>
            </div>

            {/* Location & Distance */}
            <div className="flex items-center gap-1 text-sm text-zinc-500 mb-3">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="truncate">{beautician.address}</span>
              {distance !== undefined && (
                <span className="flex-shrink-0 text-pink-600 font-medium">
                  • {distance.toFixed(1)} km
                </span>
              )}
            </div>

            {/* Services */}
            <div className="flex flex-wrap gap-1.5">
              {beautician.services_offered.map((service) => (
                <Badge
                  key={service}
                  variant={service as "nails" | "makeup" | "wig"}
                  className="capitalize"
                >
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/beautician/${beautician.id}`}>
      <Card className="overflow-hidden card-hover h-full">
        {/* Cover/Profile Image */}
        <div className="relative h-28 sm:h-32 lg:h-36 bg-zinc-100">
          {beautician.cover_photo ? (
            <Image
              src={beautician.cover_photo}
              alt={beautician.business_name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-100" />
          )}

          {/* Profile Photo Overlay */}
          <div className="absolute -bottom-5 left-3">
            <div className="relative h-11 w-11 lg:h-12 lg:w-12 rounded-full border-[3px] border-white overflow-hidden bg-white shadow-md">
              {beautician.profile_photo ? (
                <Image
                  src={beautician.profile_photo}
                  alt={beautician.business_name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-base">
                  {beautician.business_name[0]}
                </div>
              )}
            </div>
          </div>

          {/* Distance Badge */}
          {distance !== undefined && (
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-medium text-pink-600 shadow-sm">
              {distance.toFixed(1)} km
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 pt-7 lg:p-4 lg:pt-8">
          {/* Name & Verified */}
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="font-semibold text-zinc-900 truncate text-sm lg:text-base">
              {beautician.business_name}
            </h3>
            {beautician.is_verified && (
              <BadgeCheck className="h-4 w-4 text-pink-600 flex-shrink-0" />
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs lg:text-sm font-medium text-zinc-900">
              {beautician.rating?.toFixed(1)}
            </span>
            <span className="text-xs lg:text-sm text-zinc-500">
              ({beautician.review_count})
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs lg:text-sm text-zinc-500 mb-2.5">
            <MapPin className="h-3 w-3 lg:h-3.5 lg:w-3.5 flex-shrink-0" />
            <span className="truncate">{beautician.address}</span>
          </div>

          {/* Services */}
          <div className="flex flex-wrap gap-1">
            {beautician.services_offered.map((service) => (
              <Badge
                key={service}
                variant={service as "nails" | "makeup" | "wig"}
                className="capitalize text-[10px] lg:text-xs px-2 py-0.5"
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
