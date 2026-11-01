"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const watch = pathname.startsWith("/watch");
  const [open, setOpen] = useState(!watch);

  useEffect(() => {
    setOpen(!pathname.startsWith("/watch"));
  }, [pathname]);

  return (
    <div>
      <Suspense fallback={<div className="h-14" />}>
        <Header onMenu={() => setOpen((v) => !v)} />
      </Suspense>
      <Sidebar collapsed={!open} />
      <main className={`pt-14 ${open ? "md:pl-[240px]" : "md:pl-[72px]"}`}>{children}</main>
    </div>
  );
}
