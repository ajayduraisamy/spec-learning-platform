import Link from "next/link";

export default function TemplatesHubPage() {
  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 py-24 sm:px-6 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-dim)]">
        <svg
          className="h-8 w-8 text-[var(--accent)]"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold sm:text-4xl">Template Library</h1>
      <p className="mx-auto mt-4 max-w-lg text-[var(--text-secondary)]">
        Coming soon. Browse and use pre-built spec templates for every
        engineering domain.
      </p>
      <div className="mt-8">
        <Link
          href="/learn/templates"
          className="text-sm font-medium text-[var(--accent-text)] hover:text-[var(--accent)] transition-colors"
        >
          Learn about templates first →
        </Link>
      </div>
    </div>
  );
}
