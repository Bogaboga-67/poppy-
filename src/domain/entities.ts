export type Category =
  | "All"
  | "Music"
  | "Gaming"
  | "News"
  | "Live"
  | "Podcasts"
  | "Mixes"
  | "Sports"
  | "Learning";

export interface Channel {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  subscriberCount: number;
  description: string;
}

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  channelId: string;
  views: number;
  likes: number;
  dislikes: number;
  publishedAt: string;
  duration: string;
  category: Exclude<Category, "All">;
  tags: string[];
}

export interface Comment {
  id: string;
  videoId: string;
  parentId: string | null;
  authorName: string;
  authorAvatar: string;
  text: string;
  likes: number;
  createdAt: string;
  isPinned?: boolean;
}

export interface CurrentUser {
  id: string;
  name: string;
  avatarUrl: string;
}
