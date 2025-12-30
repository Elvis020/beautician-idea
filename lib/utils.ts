import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number): string {
  return `GH₵ ${amount.toFixed(2)}`
}

export function formatPhoneNumber(phone: string): string {
  // Format Ghana phone numbers
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('233')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`
  }
  return phone
}

export function getWhatsAppLink(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const baseUrl = `https://wa.me/${cleaned}`
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl
}

export function getCallLink(phone: string): string {
  return `tel:${phone}`
}
