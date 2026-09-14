"use client";

import { useState } from "react";

export function SubscribeButton({ channelId, subscribed }: { channelId: string; subscribed: boolean }) {
  const [subs, setSubs] = useState(subscribed);

  async function onClick() {
    const next = !subs;
    await fetch(`/api/channels/${channelId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscribe: next }),
    });
    setSubs(next);
  }

  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium ${
        subs ? "bg-[#272727] text-white" : "bg-white text-black"
      }`}
    >
      {subs ? "Subscribed" : "Subscribe"}
    </button>
  );
}
