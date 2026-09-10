"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

type LocationMapProps = {
  latitude: number;
  longitude: number;
  label: string;
  addressLine: string;
};

export function LocationMap({
  latitude,
  longitude,
  label,
  addressLine,
}: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;

    (async () => {
      const L = (await import("leaflet")).default;
      if (!containerRef.current || map) return;

      const pinIcon = L.divIcon({
        className: "",
        html: `
          <span class="creative-pin">
            <svg viewBox="0 0 32 42" width="40" height="52">
              <path
                d="M16 0C7.163 0 0 7.163 0 16c0 11 16 26 16 26s16-15 16-26C32 7.163 24.837 0 16 0Z"
                fill="#2f4a3d"
                stroke="#ffffff"
                stroke-width="2"
              />
              <circle cx="16" cy="16" r="6" fill="#ffffff" />
            </svg>
          </span>
        `,
        iconSize: [40, 52],
        iconAnchor: [20, 50],
        popupAnchor: [0, -46],
      });

      map = L.map(containerRef.current, {
        center: [latitude, longitude],
        zoom: 15,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        boxZoom: false,
        keyboard: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      L.marker([latitude, longitude], { icon: pinIcon })
        .addTo(map)
        .bindPopup(
          `<strong>${label}</strong><br />${addressLine}`
        );
    })();

    return () => {
      map?.remove();
    };
  }, [latitude, longitude, label, addressLine]);

  return (
    <>
      <style jsx global>{`
        .creative-pin {
          display: block;
          filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.35));
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
        }
        .leaflet-grab {
          cursor: default;
        }
      `}</style>
      <div ref={containerRef} className="h-[260px] w-full sm:h-[320px]" />
    </>
  );
}
