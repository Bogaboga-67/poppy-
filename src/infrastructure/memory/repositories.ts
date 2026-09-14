import type { Category, Channel, Comment, Video } from "@/domain/entities";
import type {
  ChannelRepository,
  CommentRepository,
  VideoRepository,
} from "@/domain/repositories";
import { channels as seedChannels, comments as seedComments, videos as seedVideos } from "../seed/catalog";

type Store = {
  videos: Video[];
  channels: Channel[];
  comments: Comment[];
  likedVideos: Record<string, "like" | "dislike">;
  subscribed: Record<string, boolean>;
};

const globalStore = globalThis as typeof globalThis & { __ytStore?: Store };

function createStore(): Store {
  return {
    videos: structuredClone(seedVideos),
    channels: structuredClone(seedChannels),
    comments: structuredClone(seedComments),
    likedVideos: {},
    subscribed: {},
  };
}

export function getStore(): Store {
  if (!globalStore.__ytStore) {
    globalStore.__ytStore = createStore();
  }
  return globalStore.__ytStore;
}

export class MemoryVideoRepository implements VideoRepository {
  async list(category?: Category): Promise<Video[]> {
    const { videos } = getStore();
    if (!category || category === "All") return videos;
    return videos.filter((v) => v.category === category);
  }

  async getById(id: string): Promise<Video | null> {
    return getStore().videos.find((v) => v.id === id) ?? null;
  }

  async search(query: string): Promise<Video[]> {
    const q = query.trim().toLowerCase();
    if (!q) return getStore().videos;
    return getStore().videos.filter((v) => {
      return (
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.tags.some((t) => t.includes(q))
      );
    });
  }

  async related(videoId: string): Promise<Video[]> {
    const current = await this.getById(videoId);
    if (!current) return getStore().videos.slice(0, 8);
    return getStore()
      .videos.filter((v) => v.id !== videoId)
      .sort((a, b) => {
        const aScore = a.category === current.category ? 1 : 0;
        const bScore = b.category === current.category ? 1 : 0;
        return bScore - aScore || b.views - a.views;
      });
  }

  async like(id: string, direction: "like" | "dislike" | "none"): Promise<Video | null> {
    const store = getStore();
    const video = store.videos.find((v) => v.id === id);
    if (!video) return null;
    const prev = store.likedVideos[id];
    if (prev === "like") video.likes -= 1;
    if (prev === "dislike") video.dislikes -= 1;
    if (direction === "none") {
      delete store.likedVideos[id];
    } else {
      store.likedVideos[id] = direction;
      if (direction === "like") video.likes += 1;
      if (direction === "dislike") video.dislikes += 1;
    }
    return video;
  }
}

export class MemoryChannelRepository implements ChannelRepository {
  async getById(id: string): Promise<Channel | null> {
    return getStore().channels.find((c) => c.id === id) ?? null;
  }

  async list(): Promise<Channel[]> {
    return getStore().channels;
  }

  async subscribe(id: string, subscribe: boolean): Promise<Channel | null> {
    const store = getStore();
    const channel = store.channels.find((c) => c.id === id);
    if (!channel) return null;
    const already = !!store.subscribed[id];
    if (subscribe && !already) {
      channel.subscriberCount += 1;
      store.subscribed[id] = true;
    }
    if (!subscribe && already) {
      channel.subscriberCount -= 1;
      delete store.subscribed[id];
    }
    return channel;
  }
}

export class MemoryCommentRepository implements CommentRepository {
  async listByVideo(videoId: string): Promise<Comment[]> {
    return getStore()
      .comments.filter((c) => c.videoId === videoId)
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }

  async add(input: Omit<Comment, "id" | "createdAt" | "likes">): Promise<Comment> {
    const comment: Comment = {
      ...input,
      id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    getStore().comments.push(comment);
    return comment;
  }

  async like(id: string): Promise<Comment | null> {
    const comment = getStore().comments.find((c) => c.id === id);
    if (!comment) return null;
    comment.likes += 1;
    return comment;
  }
}

export function isSubscribed(channelId: string) {
  return !!getStore().subscribed[channelId];
}

export function videoReaction(videoId: string) {
  return getStore().likedVideos[videoId] ?? "none";
}
