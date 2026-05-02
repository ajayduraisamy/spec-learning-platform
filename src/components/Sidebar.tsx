"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarSections } from "@/data/sidebar-links";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0 border-r border-[var(--border)] bg-[var(--surface)] transition-colors">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-3 py-5 scrollbar-thin">
        <nav>
          {sidebarSections.map((section) => {
            const isSectionActive = section.topics.some((t) =>
              pathname.startsWith(t.href)
            );

            return (
              <div key={section.name} className="mb-5">
                <p
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isSectionActive
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-tertiary)]"
                  }`}
                >
                  {section.name}
                </p>
                <ul className="space-y-0.5">
                  {section.topics.map((topic) => {
                    const isActive =
                      pathname === topic.href ||
                      pathname.startsWith(topic.href + "/");

                    return (
                      <li key={topic.href}>
                        <Link
                          href={topic.href}
                          className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-[var(--accent-dim)] text-[var(--accent-text)]"
                              : "text-[var(--text-secondary)] hover:bg-[var(--surface-raised)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          {topic.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
