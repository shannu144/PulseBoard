export type ContentCategory =
  | "technology"
  | "sports"
  | "finance"
  | "entertainment"
  | "science"
  | "gaming";

export type ContentType = "news" | "recommendation" | "social";

export type ContentSource =
  | "NewsAPI"
  | "TechCrunch"
  | "Bloomberg"
  | "ESPN"
  | "TMDB"
  | "Spotify"
  | "Twitter/X"
  | "Instagram"
  | "Wired"
  | "IGN";

export interface ContentItem {
  id: string;
  type: ContentType;
  category: ContentCategory;
  source: ContentSource;
  title: string;
  description: string;
  content?: string;
  url: string;
  imageUrl: string;
  publishedAt: string; // ISO date string
  author?: string;
  readTimeMinutes?: number;
  // Recommendations specific
  rating?: number; // 0-10 or 0-5
  mediaType?: "movie" | "music" | "series" | "podcast";
  // Social specific
  handle?: string;
  avatarUrl?: string;
  likesCount?: number;
  retweetsCount?: number;
  commentsCount?: number;
  hashtags?: string[];
  // Metadata
  isTrending?: boolean;
  engagementScore?: number;
}

export interface UserPreferences {
  selectedCategories: ContentCategory[];
  darkMode: boolean;
  contentDensity: "compact" | "normal" | "visual";
  enableRealtime: boolean;
  realtimeSpeedSeconds: number; // e.g. 10s, 30s
  language: "en" | "es" | "fr" | "de" | "hi";
  preferredSourceTypes: ContentType[];
  customApiKeys: {
    newsApi?: string;
    tmdb?: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  joinedDate: string;
}

export type ActiveTab = "for-you" | "trending" | "favorites" | "analytics" | "settings";
