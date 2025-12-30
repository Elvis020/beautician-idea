"use client";

import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, getCallLink } from "@/lib/utils";

interface ContactButtonsProps {
  phone: string;
  whatsapp?: string;
  businessName: string;
  itemName?: string;
}

export function ContactButtons({
  phone,
  whatsapp,
  businessName,
  itemName,
}: ContactButtonsProps) {
  const whatsappNumber = whatsapp || phone;

  const message = itemName
    ? `Hi! I saw the "${itemName}" on LukGood and I'm interested. Is it available?`
    : `Hi! I found you on LukGood and I'm interested in your services.`;

  return (
    <div className="flex gap-3">
      <a
        href={getWhatsAppLink(whatsappNumber, message)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1"
      >
        <Button variant="whatsapp" size="lg" className="w-full gap-2">
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </Button>
      </a>
      <a href={getCallLink(phone)} className="flex-1">
        <Button variant="call" size="lg" className="w-full gap-2">
          <Phone className="h-5 w-5" />
          Call
        </Button>
      </a>
    </div>
  );
}
