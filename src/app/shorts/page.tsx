import { getHomeFeed } from "@/application/use-cases";
import { thumbnailUrl } from "@/presentation/lib/format";
import Link from "next/link";

export default async function ShortsPage() {
  const feed = (await getHomeFeed("Music")).slice(0, 6);

  return (
    <div className="flex flex-col items-center gap-8 py-6">
      {feed.map((item) => (
        <Link
          key={item.video.id}
          href={`/watch?v=${item.video.id}`}
          className="relative h-[80vh] w-[min(360px,92vw)] overflow-hidden rounded-2xl bg-black"
        >
          <img src={thumbnailUrl(item.video.youtubeId)} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="font-medium">{item.video.title}</p>
            <p className="text-sm text-[#ccc]">{item.channel?.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
