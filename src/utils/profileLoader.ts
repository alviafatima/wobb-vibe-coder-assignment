import type {
  FullUserProfile,
  Platform,
  ProfileDetailResponse,
  SearchData,
} from "@/types";

import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

const searchData: Record<Platform, SearchData> = {
  instagram: instagramData as SearchData,
  youtube: youtubeData as SearchData,
  tiktok: tiktokData as SearchData,
};

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  // -------------------------------
  // 1. Try loading detailed JSON
  // -------------------------------

  const possibleNames = [
    username,
    username.toLowerCase(),
    username.toUpperCase(),
  ];

  for (const name of possibleNames) {
    const path = `../assets/data/profiles/${name}.json`;

    const loader = profileModules[path];

    if (loader) {
      const result = await loader();

      return (
        (result as { default?: ProfileDetailResponse }).default ??
        (result as ProfileDetailResponse)
      );
    }
  }

  // -------------------------------
  // 2. Search inside search dataset
  // -------------------------------

  for (const platform of Object.keys(searchData) as Platform[]) {
    const account = searchData[platform].accounts.find((item) => {
      const profile = item.account.user_profile;

      const search = username.toLowerCase();

      return (
  profile.username?.toLowerCase() === search ||
  profile.handle?.toLowerCase() === search ||
  profile.fullname?.toLowerCase() === search
);
    });

    if (account) {
      const user = account.account.user_profile;

      let profileUrl = "";

      if (platform === "instagram") {
        profileUrl =
          user.url ||
          `https://www.instagram.com/${user.username}`;
      }

      if (platform === "youtube") {
        profileUrl =
          user.url ||
          `https://www.youtube.com/@${user.username}`;
      }

      if (platform === "tiktok") {
        profileUrl =
          user.url ||
          `https://www.tiktok.com/@${user.username}`;
      }

      const profile: FullUserProfile = {
        ...user,

        description:
          "Creator profile loaded from search dataset.",

        posts_count: 0,
        avg_likes: 0,
        avg_comments: 0,
        avg_views: 0,
        engagements: 0,

        url: profileUrl,
      };

      return {
  data: {
    success: true,
    user_profile: profile,
  },
};
    }
  }

  // -------------------------------
  // 3. Not found
  // -------------------------------

  return null;
}