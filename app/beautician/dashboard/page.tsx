"use client";

import { Eye, MessageCircle, Phone, TrendingUp, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock stats for demo
const stats = {
  profileViews: 248,
  whatsappClicks: 34,
  callClicks: 12,
  inventoryItems: 4,
};

const recentContacts = [
  { id: 1, type: "whatsapp", item: "Glitter Ombre Nails", time: "2 hours ago" },
  { id: 2, type: "call", item: null, time: "5 hours ago" },
  { id: 3, type: "whatsapp", item: "Bridal Glam Package", time: "Yesterday" },
  { id: 4, type: "whatsapp", item: "French Tips", time: "Yesterday" },
];

export default function DashboardPage() {
  return (
    <div className="p-4 space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Welcome back!</h1>
        <p className="text-zinc-500">Here's how your business is doing</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-pink-100 p-2">
                <Eye className="h-4 w-4 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900">{stats.profileViews}</p>
                <p className="text-xs text-zinc-500">Profile Views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <MessageCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900">{stats.whatsappClicks}</p>
                <p className="text-xs text-zinc-500">WhatsApp Clicks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Phone className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900">{stats.callClicks}</p>
                <p className="text-xs text-zinc-500">Call Clicks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <Package className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900">{stats.inventoryItems}</p>
                <p className="text-xs text-zinc-500">Active Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/beautician/inventory">
          <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
            <Package className="h-5 w-5" />
            <span>Add New Item</span>
          </Button>
        </Link>
        <Link href="/beautician/profile">
          <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
            <TrendingUp className="h-5 w-5" />
            <span>Edit Profile</span>
          </Button>
        </Link>
      </div>

      {/* Recent Contact Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Contact Requests</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-zinc-100">
            {recentContacts.map((contact) => (
              <div key={contact.id} className="flex items-center gap-3 px-4 py-3">
                <div
                  className={`rounded-full p-2 ${
                    contact.type === "whatsapp" ? "bg-green-100" : "bg-blue-100"
                  }`}
                >
                  {contact.type === "whatsapp" ? (
                    <MessageCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Phone className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 truncate">
                    {contact.item || "General Inquiry"}
                  </p>
                  <p className="text-xs text-zinc-500">{contact.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tip */}
      <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
        <CardContent className="p-4">
          <p className="text-sm text-pink-900">
            <strong>Tip:</strong> Adding more photos to your inventory items can increase contact requests by up to 40%!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
