import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useShortlistStore } from "@/store/shortlistStore";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M followers";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K followers";
  return count + " followers";
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();

  const addProfile = useShortlistStore((state) => state.addProfile);
  const removeProfile = useShortlistStore((state) => state.removeProfile);

  const saved = useShortlistStore((state) =>
    state.isShortlisted(profile.user_id)
  );

 const handleClick = () => {
  const profileId =
    profile.username ||
    profile.handle ||
    profile.fullname;

  onProfileClick?.(profileId);

  navigate(
    `/profile/${encodeURIComponent(profileId)}?platform=${platform}`
  );
};
  const handleShortlist = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    if (saved) {
      removeProfile(profile.user_id);
      toast.success(`Removed @${profile.username} from shortlist`);
    } else {
      addProfile(profile);
      toast.success(`Added @${profile.username} to shortlist`);
    }
  };

  return (
    <div
      onClick={handleClick}
      data-search={searchQuery}
      className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 mb-4 cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-1 hover:border-indigo-300 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <img
          src={profile.picture}
          alt={profile.fullname}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          {/* Username */}
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900">
              @{profile.username}
            </h3>

            <VerifiedBadge verified={profile.is_verified} />
          </div>

          {/* Full name */}
          <p className="text-gray-600">
            {profile.fullname}
          </p>

          {/* Badges */}
          <div className="flex gap-2 mt-2 flex-wrap">

            {profile.followers >= 1000000 && (
              <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-2.5 py-1 text-xs font-medium">
                👥 Large Audience
              </span>
            )}

            {(profile.engagement_rate ?? 0) > 0.03 && (
              <span className="inline-flex items-center rounded-full bg-purple-100 text-purple-700 px-2.5 py-1 text-xs font-medium">
                ⭐ High Engagement
              </span>
            )}

          </div>

          {/* Followers */}
          <p className="text-sm text-gray-500 mt-2">
            {formatFollowersLocal(profile.followers)}
          </p>
        </div>
      </div>

      <button
        onClick={handleShortlist}
        className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
          saved
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
      >
        {saved ? "✓ Shortlisted" : "+ Shortlist"}
      </button>
    </div>
  );
}