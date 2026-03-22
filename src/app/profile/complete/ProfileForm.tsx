"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { saveProfileDetails } from "./actions";

export default function ProfileForm({ name }: { name: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);

    // Validate age on client side
    const ageValue = Number(fd.get("age"));
    if (!ageValue || ageValue < 16 || ageValue > 80) {
      setError("Please enter a valid age between 16 and 80.");
      setLoading(false);
      return;
    }

    const result = await saveProfileDetails(fd);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-display text-2xl font-semibold tracking-[-0.04em]">
            <span className="text-foreground">Once</span>
            <span style={{ color: "#4F46E5" }}>.</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground/60">The decision that changes everything.</p>
          <h1 className="mt-4 text-xl font-semibold">Almost there.</h1>
          <p className="mt-1 text-sm text-muted-foreground">Tell us a bit about yourself so we can personalize your path.</p>
        </div>

        <Card>
          <CardContent className="p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" defaultValue={name} placeholder="Juan Dela Cruz" required className="mt-1" />
              </div>

              <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" min="16" max="80" placeholder="25" required className="mt-1" />
              </div>

              <div>
                <Label htmlFor="location">City / Province</Label>
                <Input id="location" name="location" placeholder="Manila, Cebu, Davao..." required className="mt-1" />
              </div>

              <div>
                <Label htmlFor="occupation">Current Job or Occupation</Label>
                <Input id="occupation" name="occupation" placeholder="BPO Agent, Student, Freelancer..." required className="mt-1" />
              </div>

              <div>
                <Label>Have you bought online courses before?</Label>
                <div className="mt-2 flex gap-3">
                  <label className="flex items-center gap-2.5 rounded-lg border px-4 py-2.5 cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors">
                    <input type="radio" name="boughtBefore" value="yes" className="accent-primary h-4 w-4" />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2.5 rounded-lg border px-4 py-2.5 cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors">
                    <input type="radio" name="boughtBefore" value="no" defaultChecked className="accent-primary h-4 w-4" />
                    <span className="text-sm">No, this is my first</span>
                  </label>
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" disabled={loading} className="h-12 w-full text-sm font-semibold">
                {loading ? "Saving..." : "Continue to Your Results"}
              </Button>

              <p className="text-center text-[10px] text-muted-foreground">
                This helps us build a better experience for you. Your data is private.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
