import { createFileRoute } from "@tanstack/react-router";
import { Header } from "./admin.products";
import { useState, useEffect } from "react";
import { getClinicSettings } from "@/lib/firebaseServices";
import { updateSingleDoc } from "@/lib/firebaseDataAdapter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneRaw, setPhoneRaw] = useState("");
  const [email, setEmail] = useState("");
  
  // Address
  const [addrLine1, setAddrLine1] = useState("");
  const [addrLine2, setAddrLine2] = useState("");
  const [addrCity, setAddrCity] = useState("");
  const [addrState, setAddrState] = useState("");
  const [addrPincode, setAddrPincode] = useState("");
  
  // Working Hours (Timings)
  const [timingWeek, setTimingWeek] = useState("");
  const [timingSun, setTimingSun] = useState("");

  // Map Embed
  const [mapEmbed, setMapEmbed] = useState("");

  // Socials
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");

  useEffect(() => {
    getClinicSettings().then(settings => {
      if (settings) {
        setName(settings.name || "");
        setTagline(settings.tagline || "");
        setPhone(settings.phone || "");
        setPhoneRaw(settings.phoneRaw || "");
        setEmail(settings.email || "");
        
        if (settings.address) {
          setAddrLine1(settings.address.line1 || "");
          setAddrLine2(settings.address.line2 || "");
          setAddrCity(settings.address.city || "");
          setAddrState(settings.address.state || "");
          setAddrPincode(settings.address.pincode || "");
        }

        if (Array.isArray(settings.timings)) {
          const weekT = settings.timings.find((t: any) => t.day.toLowerCase().includes("mon"));
          const sunT = settings.timings.find((t: any) => t.day.toLowerCase().includes("sun"));
          setTimingWeek(weekT ? weekT.hours : "6:00 PM – 9:00 PM");
          setTimingSun(sunT ? sunT.hours : "Closed");
        } else {
          setTimingWeek("6:00 PM – 9:00 PM");
          setTimingSun("Closed");
        }

        setMapEmbed(settings.mapEmbed || "");

        if (settings.socials) {
          setInstagram(settings.socials.instagram || "");
          setFacebook(settings.socials.facebook || "");
        }
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        name,
        tagline,
        phone,
        phoneRaw,
        email,
        address: {
          line1: addrLine1,
          line2: addrLine2,
          city: addrCity,
          state: addrState,
          pincode: addrPincode,
          country: "India",
        },
        timings: [
          { day: "Monday – Saturday", hours: timingWeek },
          { day: "Sunday", hours: timingSun },
        ],
        mapEmbed,
        socials: {
          instagram,
          facebook,
          youtube: "#",
        }
      };

      await updateSingleDoc("settings", "clinic", data);
      toast.success("Clinic settings updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update clinic settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <Header title="Clinic Settings" />
        <p className="text-sm text-muted-foreground mt-1">Configure business name, address, schedules and map locations.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Branding */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-display text-lg text-[#5c4a37] font-semibold border-b border-[#ecdcc9]/40 pb-2">Branding</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="set-name">Clinic Name</Label>
                <Input id="set-name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="set-tag">Tagline</Label>
                <Input id="set-tag" value={tagline} onChange={e => setTagline(e.target.value)} required />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-display text-lg text-[#5c4a37] font-semibold border-b border-[#ecdcc9]/40 pb-2">Contact Channels</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="set-phone">Phone Number</Label>
                  <Input id="set-phone" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="set-phraw">WhatsApp Country Code Phone</Label>
                  <Input id="set-phraw" value={phoneRaw} onChange={e => setPhoneRaw(e.target.value)} placeholder="e.g. 918459323581" required />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="set-email">Email Address</Label>
                <Input id="set-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-display text-lg text-[#5c4a37] font-semibold border-b border-[#ecdcc9]/40 pb-2">Social Networks</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="set-inst">Instagram Link</Label>
                <Input id="set-inst" value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="#" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="set-fb">Facebook Link</Label>
                <Input id="set-fb" value={facebook} onChange={e => setFacebook(e.target.value)} placeholder="#" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Location / Address */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-display text-lg text-[#5c4a37] font-semibold border-b border-[#ecdcc9]/40 pb-2">Address Coordinates</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="set-l1">Address Line 1</Label>
                <Input id="set-l1" value={addrLine1} onChange={e => setAddrLine1(e.target.value)} required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="set-l2">Address Line 2 (Area/Budruk)</Label>
                <Input id="set-l2" value={addrLine2} onChange={e => setAddrLine2(e.target.value)} required />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="set-city">City</Label>
                  <Input id="set-city" value={addrCity} onChange={e => setAddrCity(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="set-state">State</Label>
                  <Input id="set-state" value={addrState} onChange={e => setAddrState(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="set-pin">Pincode</Label>
                  <Input id="set-pin" value={addrPincode} onChange={e => setAddrPincode(e.target.value)} required />
                </div>
              </div>
            </div>
          </div>

          {/* Timing / Working Hours */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-display text-lg text-[#5c4a37] font-semibold border-b border-[#ecdcc9]/40 pb-2">Timings / Working Hours</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="set-timeweek">Monday – Saturday Hours</Label>
                <Input id="set-timeweek" value={timingWeek} onChange={e => setTimingWeek(e.target.value)} placeholder="e.g. 6:00 PM – 9:00 PM" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="set-timesun">Sunday Hours</Label>
                <Input id="set-timesun" value={timingSun} onChange={e => setTimingSun(e.target.value)} placeholder="e.g. Closed" required />
              </div>
            </div>
          </div>

          {/* Map Coordinates Embed */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
            <h3 className="font-display text-lg text-[#5c4a37] font-semibold border-b border-[#ecdcc9]/40 pb-2">Google Map Embed Link</h3>
            <div className="space-y-1">
              <Label htmlFor="set-map">Embed URL (src of iframe)</Label>
              <textarea
                id="set-map"
                rows={3}
                value={mapEmbed}
                onChange={e => setMapEmbed(e.target.value)}
                className="w-full text-xs rounded-xl border border-border p-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                placeholder="https://www.google.com/maps/embed?pb=..."
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={saving} className="rounded-full bg-primary text-primary-foreground px-8 py-6 flex items-center gap-2">
              <Save className="size-4" />
              {saving ? "Saving Changes..." : "Save Settings"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
