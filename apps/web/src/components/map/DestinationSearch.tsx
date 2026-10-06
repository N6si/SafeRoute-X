"use client";

import { useState } from "react";

type Coordinates = [number, number];

type SearchResult = {
  id: string;
  placeName: string;
  coordinates: Coordinates;
};

type DestinationSearchProps = {
  onSelectDestination: (
    coordinates: Coordinates,
    placeName: string
  ) => void;
};

export default function DestinationSearch({
  onSelectDestination,
}: DestinationSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchDestination() {
    if (!query.trim()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token =
        process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

      if (!token) {
        throw new Error(
          "Mapbox access token is missing."
        );
      }

      const url =
        `https://api.mapbox.com/search/geocode/v6/forward` +
        `?q=${encodeURIComponent(query)}` +
        `&limit=5` +
        `&access_token=${token}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Search failed: ${response.status}`
        );
      }

      const data = await response.json();

      const formattedResults: SearchResult[] =
        (data.features ?? []).map(
          (feature: any) => ({
            id: feature.id,
            placeName:
              feature.properties?.full_address ||
              feature.properties?.name ||
              "Unknown location",
            coordinates:
              feature.geometry.coordinates,
          })
        );

      setResults(formattedResults);

      if (formattedResults.length === 0) {
        setError("No locations found.");
      }
    } catch (searchError) {
      console.error(
        "Destination search error:",
        searchError
      );

      setResults([]);
      setError(
        "Unable to search for this destination."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(result: SearchResult) {
    onSelectDestination(
      result.coordinates,
      result.placeName
    );

    setQuery(result.placeName);
    setResults([]);
    setError("");
  }

  return (
    <div className="absolute left-4 top-4 z-10 w-[min(380px,calc(100%-2rem))]">
      <div className="rounded-xl bg-white p-3 shadow-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                searchDestination();
              }
            }}
            placeholder="Search destination..."
            className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={searchDestination}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {results.length > 0 && (
          <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-gray-200">
            {results.map((result) => (
              <button
                key={result.id}
                type="button"
                onClick={() =>
                  handleSelect(result)
                }
                className="block w-full border-b border-gray-100 px-3 py-3 text-left text-sm text-gray-800 transition last:border-b-0 hover:bg-gray-100"
              >
                {result.placeName}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}