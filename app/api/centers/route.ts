import { NextRequest, NextResponse } from "next/server";

// Demo centers — in production, use Google Maps Places API
const DEMO_CENTERS = [
  { id: "1", name: "City Hall Polling Station", address: "123 Main Street, Downtown", distance: "0.8 km", hours: "7:00 AM – 7:00 PM", accessible: true, lat: 40.7128, lng: -74.006 },
  { id: "2", name: "Public Library – Community Room", address: "456 Oak Avenue, Midtown", distance: "1.2 km", hours: "7:00 AM – 7:00 PM", accessible: true, lat: 40.7148, lng: -74.008 },
  { id: "3", name: "Lincoln Elementary School", address: "789 Park Road, Westside", distance: "2.1 km", hours: "7:00 AM – 7:00 PM", accessible: false, lat: 40.7168, lng: -74.012 },
  { id: "4", name: "Community Recreation Center", address: "321 River Drive, Eastside", distance: "3.5 km", hours: "7:00 AM – 7:00 PM", accessible: true, lat: 40.7108, lng: -74.002 },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const accessible = searchParams.get("accessible");

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (apiKey && lat && lng) {
    try {
      // In production: use Google Maps Places API nearby search
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=local_government_office&key=${apiKey}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.results?.length) {
          const centers = data.results.map((place: Record<string, unknown>, i: number) => ({
            id: String(i + 1),
            name: place.name,
            address: place.vicinity,
            distance: "Calculating...",
            hours: (place.opening_hours as Record<string, unknown>)?.open_now ? "Open Now" : "Check hours",
            accessible: true,
            lat: (place.geometry as Record<string, Record<string, number>>)?.location?.lat,
            lng: (place.geometry as Record<string, Record<string, number>>)?.location?.lng,
          }));
          return NextResponse.json({ centers });
        }
      }
    } catch {
      // Fall through to demo data
    }
  }

  // Return demo centers
  let centers = DEMO_CENTERS;
  if (accessible === "true") {
    centers = centers.filter((c) => c.accessible);
  }

  return NextResponse.json({
    centers,
    demo: true,
    note: "Using demo data. Add GOOGLE_MAPS_API_KEY for live results.",
  });
}
