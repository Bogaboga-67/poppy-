import Link from "next/link";
import { notFound } from "next/navigation";
import { getChannelPage } from "@/application/use-cases";
import { formatCount, formatViews, thumbnailUrl, timeAgo } from "@/presentation/lib/format";
import { SubscribeButton } from "@/presentation/components/SubscribeButton";

export default async function ChannelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getChannelPage(id);
  if (!data) notFound();
  const { channel, videos, subscribed } = data;

  return (
    <div className="px-6 py-6">
      <div className="h-40 rounded-xl bg-gradient-to-r from-[#272727] to-[#111]" />
      <div className="mt-5 flex flex-wrap items-center gap-5">
        <img src={channel.avatarUrl} alt="" className="h-36 w-36 rounded-full" />
        <div>
          <h1 className="text-4xl font-bold">{channel.name}</h1>
          <p className="mt-1 text-sm text-[#aaa]">
            {channel.handle} · {formatCount(channel.subscriberCount)} subscribers · {videos.length} videos
          </p>
          <p className="mt-2 max-w-2xl text-sm text-[#aaa]">{channel.description}</p>
          <div className="mt-3">
            <SubscribeButton channelId={channel.id} subscribed={subscribed} />
          </div>
        </div>
      </div>
      <div className="mt-8 border-b border-[#3f3f3f]">
        <span className="inline-block border-b-2 border-white px-4 py-3 text-sm font-medium">Videos</span>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {videos.map((video) => (
          <Link key={video.id} href={`/watch?v=${video.id}`}>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-[#222]">
              <img src={thumbnailUrl(video.youtubeId)} alt="" className="h-full w-full object-cover" />
              <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1 text-xs">{video.duration}</span>
            </div>
            <h3 className="mt-2 line-clamp-2 text-sm font-medium">{video.title}</h3>
            <p className="text-xs text-[#aaa]">
              {formatViews(video.views)} · {timeAgo(video.publishedAt)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
