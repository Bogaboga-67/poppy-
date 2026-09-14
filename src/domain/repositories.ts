import type { Category, Channel, Comment, Video } from "./entities";

export interface VideoRepository {
  list(category?: Category): Promise<Video[]>;
  getById(id: string): Promise<Video | null>;
  search(query: string): Promise<Video[]>;
  related(videoId: string): Promise<Video[]>;
  like(id: string, direction: "like" | "dislike" | "none"): Promise<Video | null>;
}

export interface ChannelRepository {
  getById(id: string): Promise<Channel | null>;
  list(): Promise<Channel[]>;
  subscribe(id: string, subscribe: boolean): Promise<Channel | null>;
}

export interface CommentRepository {
  listByVideo(videoId: string): Promise<Comment[]>;
  add(comment: Omit<Comment, "id" | "createdAt" | "likes">): Promise<Comment>;
  like(id: string): Promise<Comment | null>;
}
