"use client";

import { useState } from "react";
import type { Channel, Video } from "@/domain/entities";
import { formatCount, formatViews, timeAgo } from "@/presentation/lib/format";

export function VideoActions({
  video,
  channel,
  subscribed,
  reaction,
}: {
  video: Video;
  channel: Channel;
  subscribed: boolean;
  reaction: "like" | "dislike" | "none";
}) {
  const [likes, setLikes] = useState(video.likes);
  const [react, setReact] = useState(reaction);
  const [subs, setSubs] = useState(subscribed);
  const [subCount, setSubCount] = useState(channel.subscriberCount);
  const [openDesc, setOpenDesc] = useState(false);

  async function onReact(next: "like" | "dislike") {
    const direction = react === next ? "none" : next;
    const res = await fetch(`/api/videos/${video.id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    });
    const data = (await res.json()) as Video;
    setLikes(data.likes);
    setReact(direction);
  }

  async function onSubscribe() {
    const next = !subs;
    const res = await fetch(`/api/channels/${channel.id}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscribe: next }),
    });
    const data = (await res.json()) as Channel;
    setSubs(next);
    setSubCount(data.subscriberCount);
  }

  return (
    <section>
      <h1 className="text-xl font-semibold leading-7">{video.title}</h1>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <a href={`/channel/${channel.id}`}>
            <img src={channel.avatarUrl} alt="" className="h-10 w-10 rounded-full" />
          </a>
          <div>
            <a href={`/channel/${channel.id}`} className="block font-medium">
              {channel.name}
            </a>
            <p className="text-xs text-[#aaa]">{formatCount(subCount)} subscribers</p>
          </div>
          <button
            onClick={onSubscribe}
            className={`ml-3 rounded-full px-4 py-2 text-sm font-medium ${
              subs ? "bg-[#272727] text-white" : "bg-white text-black"
            }`}
          >
            {subs ? "Subscribed" : "Subscribe"}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-full bg-[#272727]">
            <button
              onClick={() => onReact("like")}
              className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#3f3f3f] ${
                react === "like" ? "text-white" : "text-[#f1f1f1]"
              }`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11v9h10.43c1.06 0 1.98-.67 2.19-1.61l1.34-6C21.23 11.58 20.18 11 18.77 11zM7 20H4V11h3v9z" />
              </svg>
              {formatCount(likes)}
            </button>
            <span className="w-px bg-[#3f3f3f]" />
            <button
              onClick={() => onReact("dislike")}
              className="px-4 py-2 hover:bg-[#3f3f3f]"
              aria-label="Dislike"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="rotate-180">
                <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11v9h10.43c1.06 0 1.98-.67 2.19-1.61l1.34-6C21.23 11.58 20.18 11 18.77 11zM7 20H4V11h3v9z" />
              </svg>
            </button>
          </div>
          <button className="flex items-center gap-2 rounded-full bg-[#272727] px-4 py-2 text-sm hover:bg-[#3f3f3f]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63zM14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z" />
            </svg>
            Share
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#272727] hover:bg-[#3f3f3f]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.5 12c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm4.5-1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm6 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
            </svg>
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setOpenDesc((v) => !v)}
        className="mt-3 w-full rounded-xl bg-[#272727] p-3 text-left text-sm hover:bg-[#3f3f3f]"
      >
        <p className="font-medium">
          {formatViews(video.views)} · {timeAgo(video.publishedAt)}
        </p>
        <p className={`mt-2 whitespace-pre-wrap ${openDesc ? "" : "line-clamp-2"}`}>{video.description}</p>
        <span className="mt-1 inline-block font-medium">{openDesc ? "Show less" : "...more"}</span>
      </button>
    </section>
  );
}
