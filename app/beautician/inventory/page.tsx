"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { InventoryItem, ServiceType, OccasionType } from "@/types";

// Mock inventory for the logged-in beautician
const mockMyInventory: InventoryItem[] = [
  {
    id: "inv-001",
    beautician_id: "demo",
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
    beautician_id: "demo",
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
    beautician_id: "demo",
    type: "makeup",
    name: "Natural Glam Makeup",
    description: "Soft, natural look perfect for everyday",
    price: 200,
    occasion_tags: ["office", "casual"],
    photos: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400"],
    is_available: true,
    created_at: "2024-02-01T10:00:00Z",
  },
  {
    id: "inv-004",
    beautician_id: "demo",
    type: "makeup",
    name: "Bridal Glam Package",
    description: "Full bridal makeup with lashes",
    price: 500,
    occasion_tags: ["wedding"],
    photos: ["https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400"],
    is_available: false,
    created_at: "2024-02-05T10:00:00Z",
  },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState(mockMyInventory);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    type: "nails" as ServiceType,
    price: "",
    description: "",
  });

  const toggleAvailability = (id: string) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, is_available: !item.is_available } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setInventory(inventory.filter((item) => item.id !== id));
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const item: InventoryItem = {
      id: `inv-${Date.now()}`,
      beautician_id: "demo",
      type: newItem.type,
      name: newItem.name,
      description: newItem.description,
      price: parseFloat(newItem.price),
      occasion_tags: [],
      photos: [],
      is_available: true,
      created_at: new Date().toISOString(),
    };
    setInventory([item, ...inventory]);
    setShowAddForm(false);
    setNewItem({ name: "", type: "nails", price: "", description: "" });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Inventory</h1>
          <p className="text-sm text-zinc-500">{inventory.length} items</p>
        </div>
        <Button size="sm" className="gap-1" onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      {/* Add Item Form */}
      {showAddForm && (
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Add New Item</h3>
          <form onSubmit={handleAddItem} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Service Type
              </label>
              <div className="flex gap-2">
                {(["nails", "makeup", "wig"] as ServiceType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setNewItem({ ...newItem, type })}
                    className={`px-3 py-1.5 rounded-full text-sm capitalize ${
                      newItem.type === type
                        ? "bg-pink-600 text-white"
                        : "bg-zinc-100 text-zinc-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <Input
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="Price (GH₵)"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              required
            />
            <Input
              placeholder="Description (optional)"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
            <div className="flex gap-2">
              <Button type="submit" size="sm">
                Save Item
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Inventory List */}
      <div className="space-y-3">
        {inventory.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="flex">
              {/* Image */}
              <div className="relative w-24 h-24 bg-zinc-100 flex-shrink-0">
                {item.photos[0] ? (
                  <Image
                    src={item.photos[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    {item.type === "nails" ? "💅" : item.type === "makeup" ? "💄" : "💇‍♀️"}
                  </div>
                )}
                {!item.is_available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">Unavailable</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={item.type as "nails" | "makeup" | "wig"}
                        className="capitalize text-xs"
                      >
                        {item.type}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-zinc-900 text-sm">{item.name}</h3>
                    <p className="text-pink-600 font-semibold text-sm">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleAvailability(item.id)}
                      className={`text-xs px-2 py-1 rounded ${
                        item.is_available
                          ? "bg-green-100 text-green-700"
                          : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {item.is_available ? "Available" : "Hidden"}
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {inventory.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="font-semibold text-zinc-900 mb-2">No items yet</h3>
          <p className="text-zinc-500 text-sm mb-4">
            Start adding your services to attract customers
          </p>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add First Item
          </Button>
        </div>
      )}
    </div>
  );
}
