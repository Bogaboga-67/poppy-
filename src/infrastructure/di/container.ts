import { MemoryChannelRepository, MemoryCommentRepository, MemoryVideoRepository } from "@/infrastructure/memory/repositories";

const videoRepository = new MemoryVideoRepository();
const channelRepository = new MemoryChannelRepository();
const commentRepository = new MemoryCommentRepository();

export function getVideoRepository() {
  return videoRepository;
}

export function getChannelRepository() {
  return channelRepository;
}

export function getCommentRepository() {
  return commentRepository;
}
