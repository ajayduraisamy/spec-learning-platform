import Link from "next/link";
import { findNextTopic, findPrevTopic } from "@/data/sidebar-links";

interface TopicLayoutProps {
  section: string;
  lessonNumber: string;
  title: string;
  children: React.ReactNode;
  currentHref: string;
}

export default function TopicLayout({
  section,
  lessonNumber,
  title,
  children,
  currentHref,
}: TopicLayoutProps) {
  const nextTopic = findNextTopic(currentHref);
  const prevTopic = findPrevTopic(currentHref);

  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-[var(--accent)]">
        {section} · {lessonNumber}
      </p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>

      <div className="mt-10 space-y-8">{children}</div>

      <div className="flex justify-between border-t border-[var(--border)] pt-6 mt-10">
        {prevTopic ? (
          <Link
            href={prevTopic.href}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {prevTopic.title}
          </Link>
        ) : (
          <div />
        )}
        {nextTopic ? (
          <Link
            href={nextTopic.href}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-text)] hover:text-[var(--accent)] transition-colors"
          >
            {nextTopic.title}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        ) : (
          <Link
            href="/generator"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-text)] hover:text-[var(--accent)] transition-colors"
          >
            Try the Generator
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
