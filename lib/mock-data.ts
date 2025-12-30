import { Beautician, InventoryItem, ServiceType, OccasionType } from "@/types";

// Mock beauticians in Accra, Ghana
export const mockBeauticians: Beautician[] = [
  {
    id: "b1b2c3d4-e5f6-7890-abcd-111111111111",
    user_id: "a1b2c3d4-e5f6-7890-abcd-111111111111",
    business_name: "Akosua Beauty Lounge",
    bio: "Professional nail artist with 5 years experience. Specializing in intricate nail art and gel extensions.",
    address: "Osu, Oxford Street, Accra",
    location: { lat: 5.6037, lng: -0.187 },
    services_offered: ["nails", "makeup"],
    profile_photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400",
    cover_photo: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
    phone: "+233241234567",
    whatsapp: "+233241234567",
    is_verified: true,
    rating: 4.8,
    review_count: 124,
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "b1b2c3d4-e5f6-7890-abcd-222222222222",
    user_id: "a1b2c3d4-e5f6-7890-abcd-222222222222",
    business_name: "Ama Glam Studio",
    bio: "Your one-stop shop for wigs and makeup. Bridal specialist with celebrity clientele.",
    address: "East Legon, Accra",
    location: { lat: 5.56, lng: -0.2057 },
    services_offered: ["makeup", "wig"],
    profile_photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400",
    cover_photo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
    phone: "+233501234568",
    whatsapp: "+233501234568",
    is_verified: true,
    rating: 4.9,
    review_count: 89,
    created_at: "2024-02-20T10:00:00Z",
  },
  {
    id: "b1b2c3d4-e5f6-7890-abcd-333333333333",
    user_id: "a1b2c3d4-e5f6-7890-abcd-333333333333",
    business_name: "Efua Nails & More",
    bio: "Affordable quality nails for every occasion. Walk-ins welcome!",
    address: "Madina, Accra",
    location: { lat: 5.6145, lng: -0.1679 },
    services_offered: ["nails"],
    profile_photo: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400",
    cover_photo: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800",
    phone: "+233271234569",
    whatsapp: "+233271234569",
    is_verified: false,
    rating: 4.5,
    review_count: 56,
    created_at: "2024-03-10T10:00:00Z",
  },
  {
    id: "b1b2c3d4-e5f6-7890-abcd-444444444444",
    user_id: "a1b2c3d4-e5f6-7890-abcd-444444444444",
    business_name: "Adwoa Wig Palace",
    bio: "Premium human hair wigs and installation. Custom wig making available.",
    address: "Spintex Road, Accra",
    location: { lat: 5.5913, lng: -0.22 },
    services_offered: ["wig"],
    profile_photo: "https://images.unsplash.com/photo-1611432579699-484f7990b127?w=400",
    cover_photo: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    phone: "+233551234570",
    whatsapp: "+233551234570",
    is_verified: true,
    rating: 4.7,
    review_count: 203,
    created_at: "2024-01-05T10:00:00Z",
  },
  {
    id: "b1b2c3d4-e5f6-7890-abcd-555555555555",
    user_id: "a1b2c3d4-e5f6-7890-abcd-555555555555",
    business_name: "Yaa Complete Beauty",
    bio: "Full service beauty salon. Nails, makeup, and wigs all under one roof.",
    address: "Achimota, Accra",
    location: { lat: 5.632, lng: -0.175 },
    services_offered: ["nails", "makeup", "wig"],
    profile_photo: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400",
    cover_photo: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800",
    phone: "+233201234571",
    whatsapp: "+233201234571",
    is_verified: false,
    rating: 4.6,
    review_count: 78,
    created_at: "2024-04-01T10:00:00Z",
  },
];

// Mock inventory items
export const mockInventory: InventoryItem[] = [
  // Akosua Beauty Lounge
  {
    id: "inv-001",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-111111111111",
    type: "nails",
    name: "Classic French Tips",
    description: "Elegant white tips on natural pink base",
    price: 80,
    occasion_tags: ["office", "casual", "wedding"],
    photos: ["https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400"],
    is_available: true,
    created_at: "2024-01-20T10:00:00Z",
  },
  {
    id: "inv-002",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-111111111111",
    type: "nails",
    name: "Glitter Ombre Nails",
    description: "Stunning gradient with gold glitter finish",
    price: 120,
    occasion_tags: ["party", "wedding"],
    photos: ["https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400"],
    is_available: true,
    created_at: "2024-01-22T10:00:00Z",
  },
  {
    id: "inv-003",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-111111111111",
    type: "nails",
    name: "Matte Black Stiletto",
    description: "Bold matte black with stiletto shape",
    price: 150,
    occasion_tags: ["party", "funeral"],
    photos: ["https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400"],
    is_available: true,
    created_at: "2024-01-25T10:00:00Z",
  },
  {
    id: "inv-004",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-111111111111",
    type: "makeup",
    name: "Natural Glam Makeup",
    description: "Soft, natural look perfect for everyday",
    price: 200,
    occasion_tags: ["office", "casual"],
    photos: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400"],
    is_available: true,
    created_at: "2024-02-01T10:00:00Z",
  },

  // Ama Glam Studio
  {
    id: "inv-005",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-222222222222",
    type: "makeup",
    name: "Bridal Glam Package",
    description: "Full bridal makeup with lashes and setting spray",
    price: 500,
    occasion_tags: ["wedding"],
    photos: ["https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400"],
    is_available: true,
    created_at: "2024-02-22T10:00:00Z",
  },
  {
    id: "inv-006",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-222222222222",
    type: "makeup",
    name: "Party Beat Face",
    description: "Bold, camera-ready makeup for special events",
    price: 350,
    occasion_tags: ["party"],
    photos: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400"],
    is_available: true,
    created_at: "2024-02-25T10:00:00Z",
  },
  {
    id: "inv-007",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-222222222222",
    type: "wig",
    name: "Brazilian Body Wave 18\"",
    description: "Premium human hair, pre-plucked lace front",
    price: 800,
    occasion_tags: ["wedding", "party", "casual"],
    photos: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400"],
    is_available: true,
    created_at: "2024-02-28T10:00:00Z",
  },
  {
    id: "inv-008",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-222222222222",
    type: "wig",
    name: "Pixie Cut Bob",
    description: "Short and sassy synthetic wig",
    price: 250,
    occasion_tags: ["office", "casual"],
    photos: ["https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400"],
    is_available: true,
    created_at: "2024-03-01T10:00:00Z",
  },

  // Efua Nails & More
  {
    id: "inv-009",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-333333333333",
    type: "nails",
    name: "Simple Gel Polish",
    description: "Long-lasting gel polish in any color",
    price: 50,
    occasion_tags: ["office", "casual"],
    photos: ["https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400"],
    is_available: true,
    created_at: "2024-03-12T10:00:00Z",
  },
  {
    id: "inv-010",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-333333333333",
    type: "nails",
    name: "Kente Nail Art",
    description: "Traditional Kente patterns on nails",
    price: 100,
    occasion_tags: ["wedding", "party", "funeral"],
    photos: ["https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400"],
    is_available: true,
    created_at: "2024-03-15T10:00:00Z",
  },

  // Adwoa Wig Palace
  {
    id: "inv-011",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-444444444444",
    type: "wig",
    name: "Bone Straight 24\"",
    description: "Silky straight human hair, HD lace",
    price: 1200,
    occasion_tags: ["wedding", "party"],
    photos: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400"],
    is_available: true,
    created_at: "2024-01-10T10:00:00Z",
  },
  {
    id: "inv-012",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-444444444444",
    type: "wig",
    name: "Water Wave 20\"",
    description: "Natural wave pattern, 13x4 frontal",
    price: 950,
    occasion_tags: ["party", "casual"],
    photos: ["https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400"],
    is_available: true,
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "inv-013",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-444444444444",
    type: "wig",
    name: "Kinky Curly 16\"",
    description: "Natural afro texture, glueless",
    price: 750,
    occasion_tags: ["casual", "office"],
    photos: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400"],
    is_available: true,
    created_at: "2024-01-20T10:00:00Z",
  },

  // Yaa Complete Beauty
  {
    id: "inv-014",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-555555555555",
    type: "nails",
    name: "Coffin Shape Acrylics",
    description: "Trendy coffin shape with custom design",
    price: 140,
    occasion_tags: ["party", "wedding"],
    photos: ["https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400"],
    is_available: true,
    created_at: "2024-04-05T10:00:00Z",
  },
  {
    id: "inv-015",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-555555555555",
    type: "makeup",
    name: "Soft Glam Evening",
    description: "Sophisticated evening look",
    price: 280,
    occasion_tags: ["party", "funeral"],
    photos: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400"],
    is_available: true,
    created_at: "2024-04-08T10:00:00Z",
  },
  {
    id: "inv-016",
    beautician_id: "b1b2c3d4-e5f6-7890-abcd-555555555555",
    type: "wig",
    name: "Closure Wig 14\"",
    description: "Affordable 4x4 closure wig",
    price: 400,
    occasion_tags: ["casual", "office"],
    photos: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400"],
    is_available: true,
    created_at: "2024-04-10T10:00:00Z",
  },
];

// Helper functions
export function getBeauticianById(id: string): Beautician | undefined {
  return mockBeauticians.find((b) => b.id === id);
}

export function getInventoryByBeauticianId(beauticianId: string): InventoryItem[] {
  return mockInventory.filter((item) => item.beautician_id === beauticianId);
}

export function filterBeauticians(filters: {
  service?: ServiceType;
  occasion?: OccasionType;
  searchQuery?: string;
}): Beautician[] {
  let results = [...mockBeauticians];

  if (filters.service) {
    results = results.filter((b) => b.services_offered.includes(filters.service!));
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    results = results.filter(
      (b) =>
        b.business_name.toLowerCase().includes(query) ||
        b.address.toLowerCase().includes(query) ||
        b.bio?.toLowerCase().includes(query)
    );
  }

  return results;
}

export function getInventoryByFilters(filters: {
  beauticianId?: string;
  type?: ServiceType;
  occasion?: OccasionType;
}): InventoryItem[] {
  let results = [...mockInventory];

  if (filters.beauticianId) {
    results = results.filter((item) => item.beautician_id === filters.beauticianId);
  }

  if (filters.type) {
    results = results.filter((item) => item.type === filters.type);
  }

  if (filters.occasion) {
    results = results.filter((item) => item.occasion_tags.includes(filters.occasion!));
  }

  return results;
}

// Calculate mock distance (for demo purposes)
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Default location (Accra city center)
export const DEFAULT_LOCATION = {
  lat: 5.6037,
  lng: -0.187,
};
