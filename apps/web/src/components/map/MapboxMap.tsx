"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { MAPBOX_TOKEN } from "@/lib/map";
import DestinationSearch from "./DestinationSearch";

type Coordinates = [number, number];

export function MapboxMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const originRef = useRef<Coordinates | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const destinationMarkerRef =
    useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !MAPBOX_TOKEN) {
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [72.8777, 19.076],
      zoom: 11.5,
    });

    map.addControl(
      new mapboxgl.NavigationControl(),
      "top-right"
    );

    mapRef.current = map;

    let isMounted = true;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (!isMounted || !mapRef.current) {
            return;
          }

          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;

          const currentLocation: Coordinates = [
            longitude,
            latitude,
          ];

          originRef.current = currentLocation;

          map.flyTo({
            center: currentLocation,
            zoom: 14,
          });

          userMarkerRef.current?.remove();

          if (!isMounted || !mapRef.current) {
            return;
          }

          userMarkerRef.current = new mapboxgl.Marker({
            color: "#2563eb",
          })
            .setLngLat(currentLocation)
            .setPopup(
              new mapboxgl.Popup().setText(
                "Your current location"
              )
            )
            .addTo(map);
        },
        (error) => {
          console.error(
            "Unable to get current location:",
            error.message
          );
        }
      );
    }

    return () => {
      isMounted = false;

      userMarkerRef.current?.remove();
      destinationMarkerRef.current?.remove();

      userMarkerRef.current = null;
      destinationMarkerRef.current = null;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      originRef.current = null;
    };
  }, []);

  async function waitForMapLoad(
    map: mapboxgl.Map
  ): Promise<void> {
    if (map.isStyleLoaded()) {
      return;
    }

    await new Promise<void>((resolve) => {
      map.once("load", () => {
        resolve();
      });
    });
  }

  async function requestRoute(
    origin: Coordinates,
    destination: Coordinates
  ) {
    const map = mapRef.current;

    if (!map || !MAPBOX_TOKEN) {
      return;
    }

    await waitForMapLoad(map);

    if (!mapRef.current) {
      return;
    }

    const coordinates =
      `${origin[0]},${origin[1]};` +
      `${destination[0]},${destination[1]}`;

    const url =
      `https://api.mapbox.com/directions/v5/mapbox/driving/` +
      `${coordinates}` +
      `?geometries=geojson` +
      `&overview=full` +
      `&access_token=${MAPBOX_TOKEN}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Route request failed: ${response.status}`
      );
    }

    const data = await response.json();

    const route = data.routes?.[0];

    if (!route) {
      throw new Error("No route found");
    }

    const routeFeature = {
      type: "Feature" as const,
      properties: {},
      geometry: route.geometry,
    };

    const existingSource = map.getSource("saferoute");

    if (existingSource) {
      (
        existingSource as mapboxgl.GeoJSONSource
      ).setData(routeFeature);

      return;
    }

    map.addSource("saferoute", {
      type: "geojson",
      data: routeFeature,
    });

    map.addLayer({
      id: "saferoute",
      type: "line",
      source: "saferoute",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-width": 6,
        "line-opacity": 0.85,
        "line-color": "#2563eb",
      },
    });
  }

  async function handleDestination(
    coordinates: Coordinates,
    placeName: string
  ) {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    destinationMarkerRef.current?.remove();

    destinationMarkerRef.current =
      new mapboxgl.Marker({
        color: "#dc2626",
      })
        .setLngLat(coordinates)
        .setPopup(
          new mapboxgl.Popup().setText(placeName)
        )
        .addTo(map);

    map.flyTo({
      center: coordinates,
      zoom: 13,
    });

    const origin = originRef.current;

    if (!origin) {
      console.error(
        "Current location is not available."
      );

      return;
    }

    try {
      await requestRoute(origin, coordinates);
    } catch (error) {
      console.error("Route error:", error);
    }
  }

  return (
    <div className="relative h-full min-h-[520px] w-full overflow-hidden rounded-2xl">
      <div
        ref={mapContainerRef}
        className="h-full min-h-[520px] w-full"
      />

      <DestinationSearch
        onSelectDestination={handleDestination}
      />
    </div>
  );
}