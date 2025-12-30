export type UserRole = 'customer' | 'beautician'

export type ServiceType = 'nails' | 'makeup' | 'wig'

export type OccasionType = 'wedding' | 'party' | 'funeral' | 'office' | 'casual'

export interface User {
  id: string
  phone: string
  name: string
  role: UserRole
  avatar_url?: string
  location?: {
    lat: number
    lng: number
  }
  created_at: string
}

export interface Beautician {
  id: string
  user_id: string
  business_name: string
  bio?: string
  address: string
  location: {
    lat: number
    lng: number
  }
  working_hours?: {
    open: string
    close: string
    days: string[]
  }
  services_offered: ServiceType[]
  profile_photo?: string
  cover_photo?: string
  phone: string
  whatsapp?: string
  is_verified: boolean
  rating?: number
  review_count?: number
  created_at: string
}

export interface InventoryItem {
  id: string
  beautician_id: string
  type: ServiceType
  name: string
  description?: string
  price: number
  occasion_tags: OccasionType[]
  photos: string[]
  is_available: boolean
  created_at: string
}

export interface Favorite {
  id: string
  user_id: string
  beautician_id: string
  created_at: string
}

export interface ContactLog {
  id: string
  user_id: string
  beautician_id: string
  contact_type: 'whatsapp' | 'call'
  created_at: string
}
