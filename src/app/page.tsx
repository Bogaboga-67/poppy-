import { getHomeFeed } from "@/application/use-cases";
import type { Category } from "@/domain/entities";
import { CategoryChips } from "@/presentation/components/CategoryChips";
import { VideoCard } from "@/presentation/components/VideoCard";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: Category }>;
}) {
  const params = await searchParams;
  const category = params.category ?? "All";
  const feed = await getHomeFeed(category);

  return (
    <div className="px-6 pb-10">
      <CategoryChips active={category} />
      <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {feed.map((item) => (
          <VideoCard key={item.video.id} video={item.video} channel={item.channel} />
        ))}
      </div>
    </div>
  );
}
