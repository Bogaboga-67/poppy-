import Link from "next/link";
import type { Channel, Video } from "@/domain/entities";
import { formatViews, thumbnailUrl, timeAgo } from "@/presentation/lib/format";

export function VideoCard({ video, channel }: { video: Video; channel?: Channel }) {
  return (
    <article>
      <Link href={`/watch?v=${video.id}`} className="block">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-[#222]">
          <img
            src={thumbnailUrl(video.youtubeId)}
            alt={video.title}
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1 text-xs font-medium">
            {video.duration}
          </span>
        </div>
      </Link>
      <div className="mt-3 flex gap-3">
        {channel ? (
          <Link href={`/channel/${channel.id}`} className="shrink-0">
            <img src={channel.avatarUrl} alt="" className="h-9 w-9 rounded-full" />
          </Link>
        ) : null}
        <div className="min-w-0">
          <Link href={`/watch?v=${video.id}`} className="line-clamp-2 text-sm font-medium leading-5">
            {video.title}
          </Link>
          {channel ? (
            <Link href={`/channel/${channel.id}`} className="mt-1 block text-sm text-[#aaa] hover:text-[#fff]">
              {channel.name}
            </Link>
          ) : null}
          <p className="text-sm text-[#aaa]">
            {formatViews(video.views)} · {timeAgo(video.publishedAt)}
          </p>
        </div>
      </div>
    </article>
  );
}

export function RelatedCard({ video, channel }: { video: Video; channel?: Channel }) {
  return (
    <Link href={`/watch?v=${video.id}`} className="flex gap-2">
      <div className="relative h-[94px] w-[168px] shrink-0 overflow-hidden rounded-lg bg-[#222]">
        <img src={thumbnailUrl(video.youtubeId)} alt="" className="h-full w-full object-cover" />
        <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-[10px] font-medium">
          {video.duration}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="line-clamp-2 text-sm font-medium leading-5">{video.title}</h3>
        <p className="mt-1 text-xs text-[#aaa]">{channel?.name}</p>
        <p className="text-xs text-[#aaa]">
          {formatViews(video.views)} · {timeAgo(video.publishedAt)}
        </p>
      </div>
    </Link>
  );
}

export function SearchResultCard({ video, channel }: { video: Video; channel?: Channel }) {
  return (
    <article className="flex gap-4">
      <Link href={`/watch?v=${video.id}`} className="relative w-[360px] max-w-[45%] shrink-0">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-[#222]">
          <img src={thumbnailUrl(video.youtubeId)} alt="" className="h-full w-full object-cover" />
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1 text-xs">
            {video.duration}
          </span>
        </div>
      </Link>
      <div>
        <Link href={`/watch?v=${video.id}`}>
          <h3 className="text-lg leading-6">{video.title}</h3>
        </Link>
        <p className="mt-1 text-xs text-[#aaa]">
          {formatViews(video.views)} · {timeAgo(video.publishedAt)}
        </p>
        {channel ? (
          <Link href={`/channel/${channel.id}`} className="mt-3 flex items-center gap-2 text-xs text-[#aaa]">
            <img src={channel.avatarUrl} alt="" className="h-6 w-6 rounded-full" />
            {channel.name}
          </Link>
        ) : null}
        <p className="mt-3 line-clamp-2 text-xs text-[#aaa]">{video.description}</p>
      </div>
    </article>
  );
}
