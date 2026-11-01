"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const main = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/shorts", label: "Shorts", icon: ShortsIcon },
  { href: "/feed/subscriptions", label: "Subscriptions", icon: SubsIcon },
];

const you = [
  { href: "/feed/you", label: "You", icon: YouIcon },
  { href: "/feed/history", label: "History", icon: HistoryIcon },
  { href: "/feed/playlists", label: "Playlists", icon: PlaylistIcon },
  { href: "/feed/watch-later", label: "Watch later", icon: LaterIcon },
  { href: "/feed/liked", label: "Liked videos", icon: LikedIcon },
];

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  if (collapsed) {
    return (
      <aside className="fixed bottom-0 left-0 top-14 z-30 hidden w-[72px] flex-col bg-[#0f0f0f] pt-2 md:flex">
        {main.concat(you.slice(0, 1)).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`mx-1 flex flex-col items-center rounded-lg px-1 py-4 text-[10px] hover:bg-[#272727] ${
              pathname === item.href ? "bg-[#272727]" : ""
            }`}
          >
            <item.icon />
            <span className="mt-1">{item.label}</span>
          </Link>
        ))}
      </aside>
    );
  }

  return (
    <aside className="yt-scroll fixed bottom-0 left-0 top-14 z-30 w-[240px] overflow-y-auto bg-[#0f0f0f] px-3 py-3">
      <NavGroup items={main} pathname={pathname} />
      <hr className="my-3 border-[#3f3f3f]" />
      <NavGroup items={you} pathname={pathname} />
      <hr className="my-3 border-[#3f3f3f]" />
      <p className="px-3 pb-2 text-sm font-semibold">Explore</p>
      <NavGroup
        items={[
          { href: "/?category=Music", label: "Music", icon: MusicIcon },
          { href: "/?category=Gaming", label: "Gaming", icon: GameIcon },
          { href: "/?category=News", label: "News", icon: NewsIcon },
          { href: "/?category=Sports", label: "Sports", icon: SportsIcon },
          { href: "/?category=Learning", label: "Learning", icon: LearnIcon },
        ]}
        pathname={pathname}
      />
      <p className="mt-6 px-3 text-[12px] leading-5 text-[#aaa]">
        About Press Copyright Contact us Creators Advertise Developers
        <br />
        Terms Privacy Policy & Safety
        <br />
        © 2026 YouTube Clone
      </p>
    </aside>
  );
}

function NavGroup({
  items,
  pathname,
}: {
  items: { href: string; label: string; icon: () => ReactNode }[];
  pathname: string;
}) {
  return (
    <nav className="flex flex-col">
      {items.map((item) => (
        <Link
          key={item.href + item.label}
          href={item.href}
          className={`flex items-center gap-6 rounded-lg px-3 py-2.5 text-sm hover:bg-[#272727] ${
            pathname === item.href ? "bg-[#272727] font-medium" : ""
          }`}
        >
          <item.icon />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z" />
    </svg>
  );
}
function ShortsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z" />
    </svg>
  );
}
function SubsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z" />
    </svg>
  );
}
function YouIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 20h14v1H3V6h1v14zM21 3v15H6V3h15zm-4 7.5L11 7v7l6-3.5z" />
    </svg>
  );
}
function HistoryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.16h2.24v1H2.24V3.91h1v2.81C4.9 4.15 8.16 2 12 2c5.51 0 10 4.49 10 10z" />
    </svg>
  );
}
function PlaylistIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 7H2v1h20V7zm-9 5H2v1h11v-1zm0 5H2v1h11v-1zm2 0v-7l7 3.5-7 3.5z" />
    </svg>
  );
}
function LaterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
    </svg>
  );
}
function LikedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11v9h10.43c1.06 0 1.98-.67 2.19-1.61l1.34-6C21.23 11.58 20.18 11 18.77 11zM7 20H4V11h3v9z" />
    </svg>
  );
}
function MusicIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4v9.38c-.73-.84-1.8-1.38-3-1.38-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V8h6V4h-7z" />
    </svg>
  );
}
function GameIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 6v2h-2v2h-2V8h-2V6h2V4h2v2h2zm-5 8H9v2H7v-2H5v-2h2v-2h2v2h2v2zm8-2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8 8 3.58 8 8z" />
    </svg>
  );
}
function NewsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 8h5v5H6V8zm6 0h6v2h-6V8zm0 3h6v2h-6v-2zm-6 4h12v2H6v-2z" />
    </svg>
  );
}
function SportsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 5V2H6v3H4v3c0 2.97 2.16 5.43 5 5.91V16H7v3h2v3h6v-3h2v-3h-2v-2.09c2.84-.48 5-2.94 5-5.91V5h-2z" />
    </svg>
  );
}
function LearnIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
    </svg>
  );
}
