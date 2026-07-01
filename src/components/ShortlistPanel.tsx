import { Trash2, Users } from "lucide-react";
import { useShortlistStore } from "@/store/shortlistStore";

export function ShortlistPanel() {
  const { shortlisted, removeProfile } = useShortlistStore();
const totalFollowers = shortlisted.reduce(
  (sum, p) => sum + p.followers,
  0
);

const avgFollowers =
  shortlisted.length > 0
    ? totalFollowers / shortlisted.length
    : 0;

const verifiedCount = shortlisted.filter(
  (p) => p.is_verified
).length;

function format(num: number) {
  if (num >= 1000000)
    return (num / 1000000).toFixed(1) + "M";

  if (num >= 1000)
    return (num / 1000).toFixed(0) + "K";

  return String(Math.round(num));
}
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 sticky top-5">
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-indigo-600" />
        <h2 className="text-xl font-bold">
          Shortlisted ({shortlisted.length})
        </h2>
      </div>
<div className="grid grid-cols-3 gap-3 my-4 text-center">

  <div className="bg-gray-50 rounded-lg p-3">

    <p className="text-xs text-gray-500">
      Reach
    </p>

    <p className="font-bold">
      {format(totalFollowers)}
    </p>

  </div>

  <div className="bg-gray-50 rounded-lg p-3">

    <p className="text-xs text-gray-500">
      Avg
    </p>

    <p className="font-bold">
      {format(avgFollowers)}
    </p>

  </div>

  <div className="bg-gray-50 rounded-lg p-3">

    <p className="text-xs text-gray-500">
      Verified
    </p>

    <p className="font-bold">
      {verifiedCount}
    </p>

  </div>

</div>
      {shortlisted.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No influencers shortlisted yet.
        </p>
      ) : (
        <div className="space-y-3">
          {shortlisted.map((profile) => (
            <div
              key={profile.user_id}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={profile.picture}
                  alt={profile.fullname}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <div className="font-semibold">
                    @{profile.username}
                  </div>

                  <div className="text-sm text-gray-500">
                    {profile.fullname}
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeProfile(profile.user_id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}