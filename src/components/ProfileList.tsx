import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  onProfileClick: (username: string) => void;
  onClearSearch: () => void;
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
  onProfileClick,
  onClearSearch,
}: ProfileListProps) {
  return (
    <div className="flex flex-col items-center w-full">
      {profiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">

          <div className="text-6xl mb-4">🔍</div>

          <h2 className="text-2xl font-bold text-gray-800">
            No creators found
          </h2>

          <p className="text-gray-500 mt-2 text-center max-w-sm">
            Try another platform or search using a different name.
          </p>

          <button
            onClick={onClearSearch}
            className="mt-6 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            Clear Search
          </button>

        </div>
      ) : (
        profiles.map((profile) => (
          <ProfileCard
            key={profile.user_id}
            profile={profile}
            platform={platform}
            searchQuery={searchQuery}
            onProfileClick={onProfileClick}
          />
        ))
      )}
    </div>
  );
}