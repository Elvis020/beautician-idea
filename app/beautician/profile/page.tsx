"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Save, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServiceType } from "@/types";

// Mock profile data
const initialProfile = {
  business_name: "Akosua Beauty Lounge",
  bio: "Professional nail artist with 5 years experience. Specializing in intricate nail art and gel extensions.",
  address: "Osu, Oxford Street, Accra",
  phone: "+233241234567",
  whatsapp: "+233241234567",
  services_offered: ["nails", "makeup"] as ServiceType[],
  profile_photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400",
  working_hours: {
    open: "09:00",
    close: "18:00",
  },
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const toggleService = (service: ServiceType) => {
    const services = profile.services_offered.includes(service)
      ? profile.services_offered.filter((s) => s !== service)
      : [...profile.services_offered, service];
    setProfile({ ...profile, services_offered: services });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-900">My Profile</h1>
        {isEditing ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </div>

      {/* Profile Photo */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="relative h-24 w-24 rounded-full overflow-hidden bg-zinc-100">
            {profile.profile_photo ? (
              <Image
                src={profile.profile_photo}
                alt={profile.business_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl text-pink-600 font-bold">
                {profile.business_name[0]}
              </div>
            )}
          </div>
          {isEditing && (
            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-pink-600 text-white shadow-lg">
              <Camera className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Business Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Business Name
            </label>
            {isEditing ? (
              <Input
                value={profile.business_name}
                onChange={(e) =>
                  setProfile({ ...profile, business_name: e.target.value })
                }
              />
            ) : (
              <p className="text-zinc-900">{profile.business_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Bio
            </label>
            {isEditing ? (
              <textarea
                className="w-full rounded-xl border border-zinc-300 px-4 py-2 text-base focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            ) : (
              <p className="text-zinc-600 text-sm">{profile.bio}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Services Offered
            </label>
            <div className="flex gap-2">
              {(["nails", "makeup", "wig"] as ServiceType[]).map((service) => {
                const isSelected = profile.services_offered.includes(service);
                return isEditing ? (
                  <button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`px-3 py-1.5 rounded-full text-sm capitalize transition-colors ${
                      isSelected
                        ? "bg-pink-600 text-white"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {service}
                  </button>
                ) : (
                  isSelected && (
                    <Badge
                      key={service}
                      variant={service as "nails" | "makeup" | "wig"}
                      className="capitalize"
                    >
                      {service}
                    </Badge>
                  )
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              <MapPin className="h-4 w-4 inline mr-1" />
              Address
            </label>
            {isEditing ? (
              <Input
                value={profile.address}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
              />
            ) : (
              <p className="text-zinc-600 text-sm">{profile.address}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              <Phone className="h-4 w-4 inline mr-1" />
              Phone Number
            </label>
            {isEditing ? (
              <Input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            ) : (
              <p className="text-zinc-600 text-sm">{profile.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              WhatsApp Number
            </label>
            {isEditing ? (
              <Input
                type="tel"
                value={profile.whatsapp}
                onChange={(e) =>
                  setProfile({ ...profile, whatsapp: e.target.value })
                }
                placeholder="Same as phone if blank"
              />
            ) : (
              <p className="text-zinc-600 text-sm">
                {profile.whatsapp || "Same as phone"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Working Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            <Clock className="h-4 w-4 inline mr-1" />
            Working Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                type="time"
                value={profile.working_hours.open}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    working_hours: { ...profile.working_hours, open: e.target.value },
                  })
                }
                className="w-auto"
              />
              <span className="text-zinc-500">to</span>
              <Input
                type="time"
                value={profile.working_hours.close}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    working_hours: { ...profile.working_hours, close: e.target.value },
                  })
                }
                className="w-auto"
              />
            </div>
          ) : (
            <p className="text-zinc-600 text-sm">
              {profile.working_hours.open} - {profile.working_hours.close}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Preview Profile */}
      <Button variant="outline" className="w-full" asChild>
        <a href={`/beautician/b1b2c3d4-e5f6-7890-abcd-111111111111`} target="_blank">
          Preview Public Profile
        </a>
      </Button>
    </div>
  );
}
