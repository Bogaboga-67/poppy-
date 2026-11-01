import type { Category } from "@/domain/entities";
import { getChannelRepository, getCommentRepository, getVideoRepository } from "@/infrastructure/di/container";
import { isSubscribed, videoReaction } from "@/infrastructure/memory/repositories";
import { CURRENT_USER } from "@/infrastructure/seed/catalog";

export async function getHomeFeed(category: Category = "All") {
  const videos = await getVideoRepository().list(category);
  const channels = await getChannelRepository().list();
  const byId = Object.fromEntries(channels.map((c) => [c.id, c]));
  return videos.map((video) => ({
    video,
    channel: byId[video.channelId],
  }));
}

export async function getWatchPage(videoId: string) {
  const videoRepo = getVideoRepository();
  const channelRepo = getChannelRepository();
  const commentRepo = getCommentRepository();
  const video = await videoRepo.getById(videoId);
  if (!video) return null;
  const [channel, comments, related] = await Promise.all([
    channelRepo.getById(video.channelId),
    commentRepo.listByVideo(videoId),
    videoRepo.related(videoId),
  ]);
  if (!channel) return null;
  const channels = await channelRepo.list();
  const byId = Object.fromEntries(channels.map((c) => [c.id, c]));
  return {
    video,
    channel,
    comments,
    related: related.map((item) => ({ video: item, channel: byId[item.channelId] })),
    subscribed: isSubscribed(channel.id),
    reaction: videoReaction(video.id),
    currentUser: CURRENT_USER,
  };
}

export async function searchVideos(query: string) {
  const videos = await getVideoRepository().search(query);
  const channels = await getChannelRepository().list();
  const byId = Object.fromEntries(channels.map((c) => [c.id, c]));
  return videos.map((video) => ({ video, channel: byId[video.channelId] }));
}

export async function getChannelPage(channelId: string) {
  const channel = await getChannelRepository().getById(channelId);
  if (!channel) return null;
  const videos = (await getVideoRepository().list()).filter((v) => v.channelId === channelId);
  return { channel, videos, subscribed: isSubscribed(channelId) };
}

export async function addComment(videoId: string, text: string, parentId: string | null) {
  const trimmed = text.trim();
  if (!trimmed) throw new Error("Comment cannot be empty");
  return getCommentRepository().add({
    videoId,
    parentId,
    authorName: CURRENT_USER.name,
    authorAvatar: CURRENT_USER.avatarUrl,
    text: trimmed,
  });
}

export async function likeComment(commentId: string) {
  return getCommentRepository().like(commentId);
}

export async function reactToVideo(videoId: string, direction: "like" | "dislike" | "none") {
  return getVideoRepository().like(videoId, direction);
}

export async function toggleSubscribe(channelId: string, subscribe: boolean) {
  return getChannelRepository().subscribe(channelId, subscribe);
}
