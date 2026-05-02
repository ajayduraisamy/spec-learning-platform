"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Learn", href: "/learn" },
  { label: "Generator", href: "/generator" },
  { label: "Playground", href: "/playground" },
  { label: "Contribute", href: "/contribute" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] transition-colors group-hover:bg-[var(--accent-text)]">
            <svg
              className="h-5 w-5 text-[var(--background)]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            Spec<span className="text-[var(--accent)]">Engine</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[var(--accent-text)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-px w-4 -translate-x-1/2 bg-[var(--accent)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/learn"
            className="hidden md:inline-flex rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--background)] transition-colors hover:bg-[var(--accent-text)]"
          >
            Start Learning
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-md p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--surface)] px-4 py-4 space-y-1 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-raised)] hover:text-[var(--text-primary)]"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/learn"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-center text-sm font-semibold text-[var(--background)] hover:bg-[var(--accent-text)]"
            >
              Start Learning
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
