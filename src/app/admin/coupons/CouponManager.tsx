"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCoupon, toggleCoupon, deleteCoupon } from "./actions";

interface Coupon {
  id: string;
  code: string;
  discount_type: string;
  discount_value: number;
  applicable_plans: string[];
  max_uses: number | null;
  current_uses: number;
  expires_at: string | null;
  active: boolean;
  created_at: string;
}

export default function CouponManager({ coupons }: { coupons: Coupon[] }) {
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCreating(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const result = await createCoupon(fd);
    if (result.error) setError(result.error);
    else setShowForm(false);
    setCreating(false);
  }

  return (
    <div>
      {/* Create button */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{coupons.length} coupon{coupons.length !== 1 ? "s" : ""}</p>
        <Button onClick={() => setShowForm(!showForm)} size="sm">
          {showForm ? "Cancel" : "+ New Coupon"}
        </Button>
      </div>

      {/* Create form */}
      {showForm && (
        <Card className="mb-6">
          <CardContent className="p-5">
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="code">Coupon Code</Label>
                  <Input id="code" name="code" placeholder="LAUNCH50" required className="mt-1 uppercase" />
                </div>
                <div>
                  <Label htmlFor="discountType">Type</Label>
                  <select name="discountType" id="discountType" className="mt-1 w-full rounded-lg border px-3 py-2 text-sm bg-background">
                    <option value="percent">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₱)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="discountValue">Discount Value</Label>
                  <Input id="discountValue" name="discountValue" type="number" placeholder="50" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="maxUses">Max Uses (empty = unlimited)</Label>
                  <Input id="maxUses" name="maxUses" type="number" placeholder="100" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="expiresAt">Expires (empty = never)</Label>
                  <Input id="expiresAt" name="expiresAt" type="date" className="mt-1" />
                </div>
                <div>
                  <Label>Applicable Plans</Label>
                  <div className="mt-2 flex gap-3">
                    {["core", "pro", "ai"].map((p) => (
                      <label key={p} className="flex items-center gap-1.5 text-sm">
                        <input type="checkbox" name="plans" value={p} defaultChecked className="rounded" />
                        {p === "ai" ? "AI Careers" : p.charAt(0).toUpperCase() + p.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" disabled={creating} className="w-full sm:w-auto">
                {creating ? "Creating..." : "Create Coupon"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Coupon list */}
      <div className="space-y-3">
        {coupons.map((c) => {
          const isExpired = c.expires_at && new Date(c.expires_at) < new Date();
          const isMaxed = c.max_uses !== null && c.current_uses >= c.max_uses;

          return (
            <Card key={c.id} className={!c.active || isExpired || isMaxed ? "opacity-60" : ""}>
              <CardContent className="flex items-center gap-4 p-4">
                {/* Code */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg font-bold tracking-wider">{c.code}</span>
                    {c.active && !isExpired && !isMaxed ? (
                      <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200 text-[9px]">Active</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[9px]">
                        {isExpired ? "Expired" : isMaxed ? "Used Up" : "Disabled"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {c.discount_type === "percent" ? `${c.discount_value}% off` : `₱${c.discount_value} off`}
                    {" · "}
                    {c.applicable_plans.join(", ")}
                    {" · "}
                    {c.current_uses}{c.max_uses ? `/${c.max_uses}` : ""} uses
                    {c.expires_at && (
                      <> · Expires {new Date(c.expires_at).toLocaleDateString()}</>
                    )}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(c.code);
                    }}
                    className="text-xs"
                  >
                    Copy
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCoupon(c.id, !c.active)}
                    className="text-xs"
                  >
                    {c.active ? "Disable" : "Enable"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { if (confirm("Delete this coupon?")) deleteCoupon(c.id); }}
                    className="text-xs text-red-500 hover:text-red-600"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {coupons.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">No coupons yet. Create your first one.</p>
        )}
      </div>
    </div>
  );
}
