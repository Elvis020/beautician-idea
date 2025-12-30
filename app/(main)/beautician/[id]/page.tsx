"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  BadgeCheck,
  MapPin,
  Clock,
  Heart,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InventoryCard } from "@/components/inventory-card";
import { ContactButtons } from "@/components/contact-buttons";
import { ServiceFilter } from "@/components/service-filter";
import {
  getBeauticianById,
  getInventoryByBeauticianId,
} from "@/lib/mock-data";
import { ServiceType, InventoryItem } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function BeauticianProfilePage() {
  const params = useParams();
  const beauticianId = params.id as string;

  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const beautician = getBeauticianById(beauticianId);
  const inventory = getInventoryByBeauticianId(beauticianId);

  const filteredInventory = useMemo(() => {
    if (!selectedService) return inventory;
    return inventory.filter((item) => item.type === selectedService);
  }, [inventory, selectedService]);

  if (!beautician) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-zinc-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="text-xl font-semibold mb-2">Beautician not found</h1>
          <Link href="/explore">
            <Button>Back to Explore</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-zinc-50">
      {/* Desktop Layout Container */}
      <div className="lg:container-app lg:py-6 lg:flex lg:gap-8">
        {/* Main Content */}
        <div className="flex-1 lg:max-w-4xl">
          {/* Cover Image */}
          <div className="relative h-48 sm:h-56 lg:h-72 lg:rounded-2xl lg:overflow-hidden bg-zinc-200">
            {beautician.cover_photo ? (
              <Image
                src={beautician.cover_photo}
                alt={beautician.business_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-300 to-pink-100" />
            )}

            {/* Back Button */}
            <Link
              href="/explore"
              className="absolute top-4 left-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-zinc-700" />
            </Link>

            {/* Favorite Button */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "text-pink-600 fill-pink-600" : "text-zinc-700"
                }`}
              />
            </button>
          </div>

          {/* Profile Header */}
          <div className="relative px-4 lg:px-0 pb-4 bg-white lg:bg-transparent border-b border-zinc-200 lg:border-0">
            {/* Profile Photo */}
            <div className="absolute -top-10 left-4 lg:left-0">
              <div className="relative h-20 w-20 lg:h-24 lg:w-24 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                {beautician.profile_photo ? (
                  <Image
                    src={beautician.profile_photo}
                    alt={beautician.business_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-2xl lg:text-3xl">
                    {beautician.business_name[0]}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="pt-12 lg:pt-16">
              {/* Name & Verified */}
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl lg:text-2xl font-bold text-zinc-900">
                  {beautician.business_name}
                </h1>
                {beautician.is_verified && (
                  <BadgeCheck className="h-5 w-5 lg:h-6 lg:w-6 text-pink-600" />
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                <span className="font-medium text-zinc-900">
                  {beautician.rating?.toFixed(1)}
                </span>
                <span className="text-zinc-500">
                  ({beautician.review_count} reviews)
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 text-sm text-zinc-500 mb-2">
                <MapPin className="h-4 w-4" />
                <span>{beautician.address}</span>
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-1 text-sm text-zinc-500 mb-3">
                <Clock className="h-4 w-4" />
                <span>Open 9:00 AM - 6:00 PM</span>
              </div>

              {/* Services */}
              <div className="flex flex-wrap gap-2 mb-4">
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

              {/* Bio */}
              {beautician.bio && (
                <p className="text-sm lg:text-base text-zinc-600 leading-relaxed">
                  {beautician.bio}
                </p>
              )}

              {/* Contact Buttons - Desktop inline */}
              <div className="hidden lg:block mt-6">
                <ContactButtons
                  phone={beautician.phone}
                  whatsapp={beautician.whatsapp}
                  businessName={beautician.business_name}
                  itemName={selectedItem?.name}
                />
              </div>
            </div>
          </div>

          {/* Inventory Section */}
          <div className="p-4 lg:px-0 lg:py-6 pb-28 lg:pb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-900">
                Available Services
              </h2>
              <span className="text-sm text-zinc-500">
                {filteredInventory.length} items
              </span>
            </div>

            {/* Service Filter */}
            <div className="mb-4">
              <ServiceFilter
                selected={selectedService}
                onChange={setSelectedService}
              />
            </div>

            {/* Inventory Grid */}
            {filteredInventory.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                {filteredInventory.map((item) => (
                  <InventoryCard
                    key={item.id}
                    item={item}
                    onSelect={setSelectedItem}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📦</div>
                <p className="text-zinc-500">No items in this category</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Desktop Only */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-6 bg-white rounded-2xl shadow-sm border border-zinc-200 p-6">
            <h3 className="font-semibold text-zinc-900 mb-4">Contact {beautician.business_name.split(" ")[0]}</h3>
            <ContactButtons
              phone={beautician.phone}
              whatsapp={beautician.whatsapp}
              businessName={beautician.business_name}
              itemName={selectedItem?.name}
            />

            {selectedItem && (
              <div className="mt-4 pt-4 border-t border-zinc-100">
                <p className="text-sm text-zinc-500 mb-1">Selected item:</p>
                <p className="font-medium text-zinc-900">{selectedItem.name}</p>
                <p className="text-pink-600 font-semibold">{formatPrice(selectedItem.price)}</p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-zinc-100">
              <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
                <MapPin className="h-4 w-4" />
                <span>{beautician.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Clock className="h-4 w-4" />
                <span>Open 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Fixed Contact Bar - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-zinc-200 shadow-lg lg:hidden">
        <ContactButtons
          phone={beautician.phone}
          whatsapp={beautician.whatsapp}
          businessName={beautician.business_name}
          itemName={selectedItem?.name}
        />
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/50"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-t-3xl lg:rounded-2xl p-6 animate-slide-up lg:animate-fade-in lg:m-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - Desktop */}
            <button
              onClick={() => setSelectedItem(null)}
              className="hidden lg:flex absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X className="h-5 w-5 text-zinc-500" />
            </button>

            {/* Item Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-100 mb-4">
              {selectedItem.photos[0] ? (
                <Image
                  src={selectedItem.photos[0]}
                  alt={selectedItem.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  {selectedItem.type === "nails"
                    ? "💅"
                    : selectedItem.type === "makeup"
                    ? "💄"
                    : "💇‍♀️"}
                </div>
              )}
            </div>

            {/* Item Info */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant={selectedItem.type as "nails" | "makeup" | "wig"}
                  className="capitalize"
                >
                  {selectedItem.type}
                </Badge>
                {selectedItem.occasion_tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-1">
                {selectedItem.name}
              </h3>
              <p className="text-2xl font-bold text-pink-600 mb-2">
                {formatPrice(selectedItem.price)}
              </p>
              {selectedItem.description && (
                <p className="text-zinc-600">{selectedItem.description}</p>
              )}
            </div>

            {/* Contact Buttons */}
            <ContactButtons
              phone={beautician.phone}
              whatsapp={beautician.whatsapp}
              businessName={beautician.business_name}
              itemName={selectedItem.name}
            />

            {/* Close Button - Mobile */}
            <button
              onClick={() => setSelectedItem(null)}
              className="w-full mt-3 py-2 text-zinc-500 text-sm lg:hidden"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
