import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { Platform } from "@/types";

import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { ShortlistPanel } from "@/components/ShortlistPanel";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";

import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [searchParams] = useSearchParams();

  const initialPlatform =
    (searchParams.get("platform") as Platform) || "instagram";

  const [platform, setPlatform] = useState<Platform>(initialPlatform);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keep selected platform when returning from profile page
  

  // Ctrl + K focuses search input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  return (
    <Layout title="Find Influencers">
      <AnalyticsDashboard profiles={filtered} />

      <p className="text-gray-500 mb-4 text-sm">
        Discover creators across Instagram, YouTube and TikTok.
      </p>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        inputRef={searchInputRef}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Creator List */}
        <div className="lg:col-span-2">
          <p className="text-sm text-gray-500 mb-4">
            Showing <strong>{filtered.length}</strong> creators
          </p>

          <ProfileList
            profiles={filtered}
            platform={platform}
            searchQuery={searchQuery}
            onProfileClick={() => {}}
            onClearSearch={() => setSearchQuery("")}
          />
        </div>

        {/* Shortlist */}
        <div>
          <ShortlistPanel />
        </div>
      </div>
    </Layout>
  );
}