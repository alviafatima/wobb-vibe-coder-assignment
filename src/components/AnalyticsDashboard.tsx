import { Users, Star, BadgeCheck, TrendingUp } from "lucide-react";
import type { UserProfileSummary } from "@/types";
import { useShortlistStore } from "@/store/shortlistStore";

interface AnalyticsDashboardProps {
  profiles: UserProfileSummary[];
}

function formatFollowers(count: number) {
  if (count >= 1_000_000_000)
    return (count / 1_000_000_000).toFixed(1) + "B";

  if (count >= 1_000_000)
    return (count / 1_000_000).toFixed(1) + "M";

  if (count >= 1_000)
    return (count / 1_000).toFixed(1) + "K";

  return count.toString();
}

export function AnalyticsDashboard({
  profiles,
}: AnalyticsDashboardProps) {

  const shortlisted = useShortlistStore(
    (state) => state.shortlisted
  );

  const verified = shortlisted.filter(
  (p) => p.is_verified
).length;

  const totalFollowers = shortlisted.reduce(
  (sum, p) => sum + p.followers,
  0
);

  const avgEngagement =
  shortlisted.length > 0
    ? (
        shortlisted.reduce(
          (sum, p) => sum + (p.engagement_rate ?? 0),
          0
        ) / shortlisted.length
      ) * 100
    : 0;

  const cards = [
    {
      title: "Creators",
      value: profiles.length,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Shortlisted",
      value: shortlisted.length,
      icon: Star,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Verified",
      value: verified,
      icon: BadgeCheck,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Followers",
      value: formatFollowers(totalFollowers),
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="mb-8">

      <div className="mb-5">
  <h2 className="text-2xl font-bold text-gray-900">
    Dashboard Overview
  </h2>

  <p className="text-sm text-gray-500 mt-1">
    Real-time creator insights and shortlist metrics
  </p>
</div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        {cards.map((card) => {

          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border"
            >
              <div className="flex justify-between items-center">

                <div>

                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {card.value}
                  </h2>

                </div>

                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${card.color}`}
                >
                  <Icon size={28} />
                </div>

              </div>
            </div>
          );

        })}

      </div>

      <div className="bg-white rounded-xl border p-5 mt-6">

  <h3 className="font-semibold text-gray-700 mb-4">
    Platform Insights
  </h3>

  <div className="flex justify-between text-sm mb-2">

    <span>
      Average Engagement
    </span>

    <span className="font-semibold text-indigo-600">
      {avgEngagement.toFixed(2)}%
    </span>

  </div>

  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

    <div
      className="bg-indigo-600 h-full rounded-full"
      style={{
        width: `${Math.min(avgEngagement * 15, 100)}%`,
      }}
    />

  </div>

  <p className="text-xs text-gray-500 mt-3">
    Excellent engagement across creators.
  </p>

</div>
    </div>
  );
}