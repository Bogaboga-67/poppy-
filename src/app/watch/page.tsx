import { notFound } from "next/navigation";
import { getWatchPage } from "@/application/use-cases";
import { CommentSection } from "@/presentation/components/CommentSection";
import { RelatedCard } from "@/presentation/components/VideoCard";
import { VideoActions } from "@/presentation/components/VideoActions";

export default async function WatchPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v } = await searchParams;
  if (!v) notFound();
  const data = await getWatchPage(v);
  if (!data) notFound();

  return (
    <div className="mx-auto flex max-w-[1800px] flex-col gap-6 px-6 py-6 lg:flex-row">
      <div className="min-w-0 flex-1">
        <div className="aspect-video overflow-hidden rounded-xl bg-black">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${data.video.youtubeId}?autoplay=1&rel=0`}
            title={data.video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="mt-3">
          <VideoActions
            video={data.video}
            channel={data.channel}
            subscribed={data.subscribed}
            reaction={data.reaction}
          />
          <CommentSection
            videoId={data.video.id}
            comments={data.comments}
            currentUser={data.currentUser}
          />
        </div>
      </div>
      <aside className="w-full shrink-0 lg:w-[402px]">
        <div className="flex flex-col gap-3">
          {data.related.map((item) => (
            <RelatedCard key={item.video.id} video={item.video} channel={item.channel} />
          ))}
        </div>
      </aside>
    </div>
  );
}
