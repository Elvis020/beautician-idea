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
  Sparkles,
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
      {/* Desktop Header Bar */}
      <header className="hidden lg:block sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/explore" className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back to Explore</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg p-1.5">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-zinc-900">LukGood</span>
          </Link>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-pink-600 transition-colors"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "text-pink-600 fill-pink-600" : ""}`} />
            <span className="hidden xl:inline">{isFavorite ? "Saved" : "Save"}</span>
          </button>
        </div>
      </header>

      {/* Main Container - Centered with max-width */}
      <div className="max-w-6xl mx-auto lg:px-6 lg:py-8">
        <div className="lg:flex lg:gap-8">
          {/* Main Content Column */}
          <div className="flex-1 lg:max-w-3xl">
            {/* Cover Image */}
            <div className="relative h-52 sm:h-64 lg:h-80 lg:rounded-2xl lg:overflow-hidden bg-zinc-200">
              {beautician.cover_photo ? (
                <Image
                  src={beautician.cover_photo}
                  alt={beautician.business_name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-pink-300 to-rose-200" />
              )}

              {/* Mobile Navigation */}
              <div className="absolute top-4 left-4 right-4 flex justify-between lg:hidden">
                <Link
                  href="/explore"
                  className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm"
                >
                  <ArrowLeft className="h-5 w-5 text-zinc-700" />
                </Link>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm"
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "text-pink-600 fill-pink-600" : "text-zinc-700"}`} />
                </button>
              </div>
            </div>

            {/* Profile Card */}
            <div className="relative bg-white lg:bg-transparent">
              {/* Profile Photo - Overlapping cover */}
              <div className="absolute -top-12 left-4 lg:left-0">
                <div className="relative h-24 w-24 rounded-2xl border-4 border-white overflow-hidden bg-white shadow-xl">
                  {beautician.profile_photo ? (
                    <Image
                      src={beautician.profile_photo}
                      alt={beautician.business_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center text-pink-600 font-bold text-3xl">
                      {beautician.business_name[0]}
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="px-4 lg:px-0 pt-16 pb-6">
                {/* Name & Verified */}
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 tracking-tight">
                    {beautician.business_name}
                  </h1>
                  {beautician.is_verified && (
                    <BadgeCheck className="h-6 w-6 text-pink-600 flex-shrink-0" />
                  )}
                </div>
                {beautician.is_verified && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full mb-2">
                    Verified Professional
                  </span>
                )}

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-zinc-900">{beautician.rating?.toFixed(1)}</span>
                  </div>
                  <span className="text-zinc-400">•</span>
                  <span className="text-zinc-500">{beautician.review_count} reviews</span>
                </div>

                {/* Meta Info Row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-zinc-400" />
                    <span>{beautician.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-zinc-400" />
                    <span>Open 9:00 AM - 6:00 PM</span>
                  </div>
                </div>

                {/* Service Tags */}
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
                  <p className="text-zinc-600 leading-relaxed lg:text-lg">
                    {beautician.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Inventory Section */}
            <div className="px-4 lg:px-0 py-6 pb-28 lg:pb-8 border-t border-zinc-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-zinc-900">Available Services</h2>
                <span className="text-sm text-zinc-400 font-medium">
                  {filteredInventory.length} {filteredInventory.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Service Filter */}
              <div className="mb-5">
                <ServiceFilter
                  selected={selectedService}
                  onChange={setSelectedService}
                />
              </div>

              {/* Inventory Grid */}
              {filteredInventory.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                  {filteredInventory.map((item) => (
                    <InventoryCard
                      key={item.id}
                      item={item}
                      onSelect={setSelectedItem}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-zinc-50 rounded-2xl">
                  <div className="text-5xl mb-3">📦</div>
                  <p className="text-zinc-500 font-medium">No items in this category</p>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="mt-2 text-sm text-pink-600 font-medium hover:underline"
                  >
                    View all services
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Desktop Only */}
          <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-24">
              {/* Contact Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-5 mb-4">
                <h3 className="font-semibold text-zinc-900 mb-4 text-center">
                  Contact {beautician.business_name.split(" ")[0]}
                </h3>
                <ContactButtons
                  phone={beautician.phone}
                  whatsapp={beautician.whatsapp}
                  businessName={beautician.business_name}
                  itemName={selectedItem?.name}
                  compact
                />

                {/* Selected Item Preview */}
                {selectedItem && (
                  <div className="mt-4 pt-4 border-t border-zinc-100">
                    <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">Selected</p>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
                        {selectedItem.photos[0] ? (
                          <Image
                            src={selectedItem.photos[0]}
                            alt={selectedItem.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg">
                            {selectedItem.type === "nails" ? "💅" : selectedItem.type === "makeup" ? "💄" : "💇‍♀️"}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-zinc-900 truncate">{selectedItem.name}</p>
                        <p className="text-pink-600 font-semibold">{formatPrice(selectedItem.price)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Location Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-5">
                <h3 className="font-semibold text-zinc-900 mb-3">Location & Hours</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 text-zinc-600">
                    <MapPin className="h-4 w-4 text-zinc-400 mt-0.5 flex-shrink-0" />
                    <span>{beautician.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-600">
                    <Clock className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Fixed Contact Bar - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-zinc-100 shadow-lg lg:hidden z-30">
        {selectedItem ? (
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-zinc-400">Selected</p>
              <p className="font-medium text-zinc-900 truncate">{selectedItem.name}</p>
            </div>
            <p className="text-pink-600 font-bold">{formatPrice(selectedItem.price)}</p>
          </div>
        ) : null}
        <div className={selectedItem ? "mt-3" : ""}>
          <ContactButtons
            phone={beautician.phone}
            whatsapp={beautician.whatsapp}
            businessName={beautician.business_name}
            itemName={selectedItem?.name}
          />
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-t-3xl lg:rounded-2xl overflow-hidden animate-slide-up lg:animate-fade-in lg:m-4 lg:max-h-[90vh] lg:overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors lg:bg-zinc-100 lg:hover:bg-zinc-200"
            >
              <X className="h-5 w-5 text-white lg:text-zinc-600" />
            </button>

            {/* Item Image */}
            <div className="relative aspect-[4/3] bg-zinc-100">
              {selectedItem.photos[0] ? (
                <Image
                  src={selectedItem.photos[0]}
                  alt={selectedItem.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-7xl bg-gradient-to-br from-pink-50 to-rose-50">
                  {selectedItem.type === "nails" ? "💅" : selectedItem.type === "makeup" ? "💄" : "💇‍♀️"}
                </div>
              )}
            </div>

            {/* Item Content */}
            <div className="p-5 lg:p-6">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant={selectedItem.type as "nails" | "makeup" | "wig"} className="capitalize">
                  {selectedItem.type}
                </Badge>
                {selectedItem.occasion_tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Name & Price */}
              <h3 className="text-2xl font-bold text-zinc-900 mb-1">{selectedItem.name}</h3>
              <p className="text-2xl font-bold text-pink-600 mb-4">{formatPrice(selectedItem.price)}</p>

              {/* Description */}
              {selectedItem.description && (
                <p className="text-zinc-600 mb-6 leading-relaxed">{selectedItem.description}</p>
              )}

              {/* Contact Buttons */}
              <ContactButtons
                phone={beautician.phone}
                whatsapp={beautician.whatsapp}
                businessName={beautician.business_name}
                itemName={selectedItem.name}
              />

              {/* Close text - Mobile */}
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full mt-4 py-2 text-zinc-400 text-sm font-medium lg:hidden"
              >
                Tap outside to close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
