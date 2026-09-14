import { searchVideos } from "@/application/use-cases";
import { SearchResultCard } from "@/presentation/components/VideoCard";

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ search_query?: string }>;
}) {
  const { search_query = "" } = await searchParams;
  const results = await searchVideos(search_query);

  return (
    <div className="mx-auto max-w-[1096px] px-6 py-6">
      <p className="mb-4 text-sm text-[#aaa]">
        Results for <span className="text-white">&quot;{search_query}&quot;</span>
      </p>
      <div className="flex flex-col gap-4">
        {results.map((item) => (
          <SearchResultCard key={item.video.id} video={item.video} channel={item.channel} />
        ))}
        {results.length === 0 ? <p>No videos found.</p> : null}
      </div>
    </div>
  );
}
