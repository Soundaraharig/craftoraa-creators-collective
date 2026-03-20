import { useEffect, useRef, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "@/integrations/supabase/client";

// Approximate coordinates for known Tamil Nadu cities
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  chennai: { lat: 13.0827, lng: 80.2707 },
  coimbatore: { lat: 11.0168, lng: 76.9558 },
  madurai: { lat: 9.9252, lng: 78.1198 },
  salem: { lat: 11.6643, lng: 78.1460 },
  trichy: { lat: 10.7905, lng: 78.7047 },
  tiruchirappalli: { lat: 10.7905, lng: 78.7047 },
  bangalore: { lat: 12.9716, lng: 77.5946 },
  bengaluru: { lat: 12.9716, lng: 77.5946 },
  pondicherry: { lat: 11.9416, lng: 79.8083 },
  kanchipuram: { lat: 12.8342, lng: 79.7036 },
  thanjavur: { lat: 10.7870, lng: 79.1378 },
  erode: { lat: 11.3410, lng: 77.7172 },
  tirunelveli: { lat: 8.7139, lng: 77.7567 },
  vellore: { lat: 12.9165, lng: 79.1325 },
};

function getCoordinatesFromLocation(location: string): { lat: number; lng: number } | null {
  const lower = location.toLowerCase();
  for (const [city, coords] of Object.entries(cityCoordinates)) {
    if (lower.includes(city)) {
      // Add small random offset so markers don't overlap
      return {
        lat: coords.lat + (Math.random() - 0.5) * 0.02,
        lng: coords.lng + (Math.random() - 0.5) * 0.02,
      };
    }
  }
  return null;
}

const DEFAULT_CENTER = { lat: 13.0827, lng: 80.2707 };

interface NearbySellerMapProps {
  category: string;
  selectedSeller?: string;
}

interface SellerPin {
  name: string;
  businessName: string;
  location: string;
  plan: string;
  paid: boolean;
  lat: number;
  lng: number;
}

const NearbySellerMap = ({ category, selectedSeller }: NearbySellerMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [sellers, setSellers] = useState<SellerPin[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch registered sellers from database
  useEffect(() => {
    const fetchSellers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("sellers")
        .select("name, business_name, location, plan, paid, craft_type");

      if (!error && data) {
        const pins: SellerPin[] = [];
        data.forEach((s) => {
          const coords = getCoordinatesFromLocation(s.location);
          if (coords) {
            pins.push({
              name: s.name,
              businessName: s.business_name,
              location: s.location,
              plan: s.plan,
              paid: s.paid,
              lat: coords.lat,
              lng: coords.lng,
            });
          }
        });
        setSellers(pins);
      }
      setLoading(false);
    };
    fetchSellers();
  }, []);

  // Render map when sellers are loaded
  useEffect(() => {
    if (!mapRef.current || loading || sellers.length === 0) return;

    // Clean up previous map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current).setView(
      [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng],
      11
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      maxZoom: 18,
    }).addTo(map);

    const freeIcon = L.divIcon({
      html: `<div style="background:#f97316;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
      className: "",
      iconSize: [26, 26],
      iconAnchor: [13, 26],
    });

    const paidIcon = L.divIcon({
      html: `<div style="background:#16a34a;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
      className: "",
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });

    const selectedIcon = L.divIcon({
      html: `<div style="background:#7c3aed;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.4)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
      className: "",
      iconSize: [34, 34],
      iconAnchor: [17, 34],
    });

    const bounds: [number, number][] = [];

    sellers.forEach((seller) => {
      const isSelected =
        selectedSeller === seller.name ||
        selectedSeller === seller.businessName;
      const icon = isSelected
        ? selectedIcon
        : seller.paid
        ? paidIcon
        : freeIcon;

      const marker = L.marker([seller.lat, seller.lng], {
        icon,
        zIndexOffset: isSelected ? 1000 : 0,
      }).addTo(map);

      const badge = seller.paid
        ? `<span style="background:#16a34a;color:white;padding:1px 6px;border-radius:8px;font-size:10px">${seller.plan}</span>`
        : `<span style="background:#9ca3af;color:white;padding:1px 6px;border-radius:8px;font-size:10px">Free</span>`;

      marker.bindPopup(
        `<div style="min-width:120px">
          <div style="font-size:13px;font-weight:600">${seller.businessName}</div>
          <div style="font-size:11px;color:#666;margin:2px 0">${seller.name} · ${seller.location}</div>
          ${badge}
        </div>`,
        { closeButton: false }
      );

      if (isSelected) marker.openPopup();
      bounds.push([seller.lat, seller.lng]);
    });

    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [sellers, loading, selectedSeller]);

  return (
    <div className="craft-card overflow-hidden">
      <div className="p-3 flex items-center gap-2 border-b border-border">
        <MapPin className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-display font-semibold text-foreground">Registered Sellers Nearby</h3>
      </div>
      {loading ? (
        <div className="w-full h-48 flex items-center justify-center bg-muted">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : sellers.length === 0 ? (
        <div className="w-full h-48 flex items-center justify-center bg-muted">
          <p className="text-xs text-muted-foreground">No registered sellers found</p>
        </div>
      ) : (
        <div ref={mapRef} className="w-full h-48" style={{ zIndex: 0 }} />
      )}
      <div className="px-3 py-2 flex items-center gap-3 text-[10px] text-muted-foreground border-t border-border">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block" /> Paid</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" /> Free</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-violet-600 inline-block" /> Selected</span>
      </div>
    </div>
  );
};

export default NearbySellerMap;
