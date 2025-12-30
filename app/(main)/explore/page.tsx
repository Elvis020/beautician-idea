"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, Sparkles, ArrowLeft, Grid3X3, LayoutList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BeauticianCard } from "@/components/beautician-card";
import { ServiceFilter } from "@/components/service-filter";
import {
  filterBeauticians,
  calculateDistance,
  DEFAULT_LOCATION,
} from "@/lib/mock-data";
import { ServiceType } from "@/types";

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") as ServiceType | null;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceType | null>(initialService);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Update service when URL changes
  useEffect(() => {
    const service = searchParams.get("service") as ServiceType | null;
    if (service && ["nails", "makeup", "wig"].includes(service)) {
      setSelectedService(service);
    }
  }, [searchParams]);

  // Filter beauticians based on selected filters
  const filteredBeauticians = useMemo(() => {
    const results = filterBeauticians({
      service: selectedService || undefined,
      searchQuery: searchQuery || undefined,
    });

    // Add distance calculation
    return results.map((b) => ({
      ...b,
      distance: calculateDistance(
        DEFAULT_LOCATION.lat,
        DEFAULT_LOCATION.lng,
        b.location.lat,
        b.location.lng
      ),
    }));
  }, [searchQuery, selectedService]);

  // Sort by distance
  const sortedBeauticians = useMemo(() => {
    return [...filteredBeauticians].sort((a, b) => a.distance - b.distance);
  }, [filteredBeauticians]);

  return (
    <div className="min-h-dvh bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-zinc-200">
        <div className="container-app py-3 lg:py-4">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-1.5 -ml-1.5 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <Link href="/" className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-pink-600" />
                <span className="font-bold text-zinc-900">LukGood</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              {/* View Toggle - Desktop only */}
              <div className="hidden lg:flex items-center gap-1 bg-zinc-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === "grid" ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === "list" ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
                  }`}
                >
                  <LayoutList className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <MapPin className="h-4 w-4" />
                <span>Accra</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              type="text"
              placeholder="Search beauticians..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="container-app pb-3">
          <ServiceFilter selected={selectedService} onChange={setSelectedService} />
        </div>
      </header>

      {/* Results */}
      <main className="container-app py-4 lg:py-6">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          <p className="text-sm text-zinc-500">
            {sortedBeauticians.length} beautician{sortedBeauticians.length !== 1 ? "s" : ""} found
            {selectedService && ` for ${selectedService}`}
          </p>
        </div>

        {/* Beautician Grid */}
        {sortedBeauticians.length > 0 ? (
          <div className={`grid gap-4 lg:gap-6 stagger-children ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-5xl"
          }`}>
            {sortedBeauticians.map((beautician) => (
              <BeauticianCard
                key={beautician.id}
                beautician={beautician}
                distance={beautician.distance}
                variant={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 lg:py-24">
            <div className="mb-4 text-6xl lg:text-7xl">💇‍♀️</div>
            <h3 className="text-lg lg:text-xl font-semibold text-zinc-900 mb-2">
              No beauticians found
            </h3>
            <p className="text-zinc-500 mb-6 max-w-md mx-auto">
              Try adjusting your filters or search query to find beauticians in your area
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedService(null);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh bg-zinc-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Sparkles className="h-8 w-8 text-pink-600 animate-pulse" />
            <p className="text-zinc-500">Loading...</p>
          </div>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
