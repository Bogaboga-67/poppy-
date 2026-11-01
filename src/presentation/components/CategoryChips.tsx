"use client";

import Link from "next/link";
import type { Category } from "@/domain/entities";

const chips: Category[] = [
  "All",
  "Music",
  "Gaming",
  "News",
  "Live",
  "Podcasts",
  "Mixes",
  "Sports",
  "Learning",
];

export function CategoryChips({ active }: { active: Category }) {
  return (
    <div className="sticky top-14 z-20 -mx-2 flex gap-3 overflow-x-auto bg-[#0f0f0f] px-2 py-3">
      {chips.map((chip) => {
        const href = chip === "All" ? "/" : `/?category=${chip}`;
        const selected = active === chip;
        return (
          <Link
            key={chip}
            href={href}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium ${
              selected ? "bg-white text-black" : "bg-[#272727] text-white hover:bg-[#3f3f3f]"
            }`}
          >
            {chip}
          </Link>
        );
      })}
    </div>
  );
}
