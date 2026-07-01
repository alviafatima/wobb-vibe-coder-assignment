import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useShortlistStore } from "@/store/shortlistStore";
import toast from "react-hot-toast";
import { Check, Plus } from "lucide-react";

function formatFollowersDetail(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return String(count);
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";

  const [profileData, setProfileData] =
    useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  const { shortlisted, addProfile, removeProfile } = useShortlistStore();
  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <p>Invalid profile</p>
        <Link to="/">Back</Link>
      </Layout>
    );
  }

  if (!loaded) {
  return (
    <Layout title={`@${username}`}>
      <div className="max-w-3xl mx-auto animate-pulse">

        <div className="flex gap-6 items-center">

          <div className="w-24 h-24 rounded-full bg-gray-300" />

          <div className="flex-1">

            <div className="h-6 w-56 bg-gray-300 rounded mb-3" />

            <div className="h-4 w-40 bg-gray-200 rounded mb-2" />

            <div className="h-4 w-64 bg-gray-200 rounded" />

          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">

          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-24 rounded-xl bg-gray-200"
            />
          ))}

        </div>

      </div>
    </Layout>
  );
}

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <p className="text-red-600 mb-4">
          Could not load profile details for {username}
        </p>

        <Link
  to={`/?platform=${platform}`}
  className="inline-block mb-6 text-indigo-600 hover:underline"
>
  ← Back to Search
</Link>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

const isAdded = shortlisted.some((p) => p.user_id === user.user_id);
  const handleShortlist = () => {
    if (isAdded) {
      removeProfile(user.user_id);
      toast.success("Removed from shortlist");
    } else {
      addProfile(user);
      toast.success("Added to shortlist");
    }
  };

  return (
    <Layout title={user.fullname}>
      <Link
  to={`/?platform=${platform}`}
  className="inline-block mb-6 text-indigo-600 hover:underline"
>
  ← Back to Search
</Link>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <div className="flex gap-6">

          <img
            src={user.picture}
            alt={user.username}
            className="w-28 h-28 rounded-full border"
          />

          <div className="flex-1">

            <h2 className="text-3xl font-bold flex items-center gap-2">
              @{user.username}
              <VerifiedBadge verified={user.is_verified} />
            </h2>

            <p className="text-gray-600 mt-1">{user.fullname}</p>
<div className="flex gap-2 mt-3 flex-wrap">

  {user.is_verified && (
    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
      ✔ Verified Creator
    </span>
  )}

  {user.followers >= 1000000 && (
    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
      👥 Large Audience
    </span>
  )}

  {(user.engagement_rate ?? 0) > 0.03 && (
    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
      ⭐ High Engagement
    </span>
  )}

</div>
            <p className="text-sm text-gray-400 mt-1 capitalize">
              {platform}
            </p>

            {user.description && (
              <p className="mt-4 text-gray-700 leading-relaxed">
                {user.description}
              </p>
            )}

            <button
              onClick={handleShortlist}
              className={`mt-6 flex items-center gap-2 px-5 py-3 rounded-lg text-white transition ${
                isAdded
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isAdded ? <Check size={18} /> : <Plus size={18} />}

              {isAdded ? "Shortlisted" : "Add to Shortlist"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">

          <div className="border rounded-xl p-4">
            <p className="text-gray-500 text-sm">Followers</p>
            <p className="font-bold text-xl">
              {formatFollowersDetail(user.followers)}
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-gray-500 text-sm">Engagement Rate</p>
            <p className="font-bold text-xl">
              {user.engagement_rate !== undefined
                ? (user.engagement_rate * 100).toFixed(2) + "%"
                : "N/A"}
            </p>
          </div>

          {user.posts_count !== undefined && (
            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">Posts</p>
              <p className="font-bold text-xl">
                {user.posts_count}
              </p>
            </div>
          )}

          {user.avg_likes !== undefined && (
            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">Average Likes</p>
              <p className="font-bold text-xl">
                {formatFollowersDetail(user.avg_likes)}
              </p>
            </div>
          )}

          {user.avg_comments !== undefined && (
            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">Average Comments</p>
              <p className="font-bold text-xl">
                {user.avg_comments}
              </p>
            </div>
          )}

          {user.avg_views !== undefined && (
            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">Average Views</p>
              <p className="font-bold text-xl">
                {formatFollowersDetail(user.avg_views)}
              </p>
            </div>
          )}

          {user.engagements !== undefined && (
            <div className="border rounded-xl p-4">
              <p className="text-gray-500 text-sm">Engagements</p>
              <p className="font-bold text-xl">
                {formatEngagementRate(user.engagement_rate)}
              </p>
            </div>
          )}

        </div>

        {user.url && (
          <a
            href={user.url}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-8 text-indigo-600 hover:underline"
          >
            Visit Profile →
          </a>
        )}

      </div>
    </Layout>
  );
}