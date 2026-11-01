"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { CURRENT_USER } from "@/infrastructure/seed/catalog";

export function Header({ onMenu }: { onMenu: () => void }) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("search_query") ?? "");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) {
      router.push("/");
      return;
    }
    router.push(`/results?search_query=${encodeURIComponent(query)}`);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between bg-[#0f0f0f] px-3">
      <div className="flex min-w-[180px] items-center gap-4">
        <button
          type="button"
          onClick={onMenu}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#272727]"
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z" />
          </svg>
        </button>
        <Link href="/" className="flex items-center gap-1">
          <svg width="28" height="20" viewBox="0 0 28 20" aria-hidden>
            <rect width="28" height="20" rx="6" fill="#FF0000" />
            <path d="M11 5.5v9l8-4.5-8-4.5z" fill="#fff" />
          </svg>
          <span className="text-[20px] font-semibold tracking-tight">YouTube</span>
        </Link>
      </div>

      <form onSubmit={onSubmit} className="flex max-w-[640px] flex-1 items-center px-4">
        <div className="flex h-10 flex-1 overflow-hidden rounded-l-full border border-[#303030] bg-[#121212] focus-within:border-[#1c62b9]">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="h-full w-full bg-transparent px-4 text-base outline-none placeholder:text-[#888]"
          />
        </div>
        <button
          type="submit"
          className="flex h-10 w-16 items-center justify-center rounded-r-full border border-l-0 border-[#303030] bg-[#222] hover:bg-[#2a2a2a]"
          aria-label="Search"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.87 20.17l-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
          </svg>
        </button>
        <button
          type="button"
          className="ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#222] hover:bg-[#333]"
          aria-label="Search with your voice"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15a.994.994 0 00-.98-.85c-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
          </svg>
        </button>
      </form>

      <div className="flex min-w-[180px] items-center justify-end gap-2">
        <button className="hidden h-9 items-center gap-1 rounded-full px-3 text-sm font-medium hover:bg-[#272727] sm:flex">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-6.39l4 1.83V8.56l-4 1.83V6m1-1v3.83L22 7v8l-4-1.83V19H2V5h16z" />
          </svg>
          Create
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#272727]" aria-label="Notifications">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.87z" />
          </svg>
        </button>
        <img
          src={CURRENT_USER.avatarUrl}
          alt={CURRENT_USER.name}
          className="h-8 w-8 rounded-full"
        />
      </div>
    </header>
  );
}
