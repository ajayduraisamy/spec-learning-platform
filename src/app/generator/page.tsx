"use client";

import { useState } from "react";
import GeneratorForm from "@/components/GeneratorForm";
import SpecCard from "@/components/SpecCard";
import { GeneratedSpec } from "@/lib/generator";
import { useToast } from "@/components/ToastProvider";

const VISIBLE_LIMIT = 100;

export default function GeneratorPage() {
  const [specs, setSpecs] = useState<GeneratedSpec[]>([]);
  const [visibleCount, setVisibleCount] = useState(VISIBLE_LIMIT);
  const [isGenerated, setIsGenerated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { showToast } = useToast();

  const handleGenerate = (generatedSpecs: GeneratedSpec[]) => {
    setSpecs(generatedSpecs);
    setVisibleCount(Math.min(VISIBLE_LIMIT, generatedSpecs.length));
    setIsGenerated(true);
    setSearchQuery("");
  };

  const handleDownload = () => {
    const data = {
      generatedAt: new Date().toISOString(),
      totalSpecs: filteredSpecs.length,
      specs: filteredSpecs.map((s) => ({
        id: s.id,
        category: s.category,
        spec: s.spec,
      })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `specs-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Downloaded JSON file", "success");
  };

  const handleCopyAll = async () => {
    const text = filteredSpecs.map((s) => s.spec).join("\n\n---\n\n");
    await navigator.clipboard.writeText(text);
    showToast(`Copied ${filteredSpecs.length} specs`, "success");
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 100, filteredSpecs.length));
  };

  const filteredSpecs = searchQuery
    ? specs.filter((s) =>
        s.spec.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : specs;

  const visibleSpecs = filteredSpecs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSpecs.length;

  return (
    <div className="animate-fade-in mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-dim)]">
            <svg
              className="h-6 w-6 text-[var(--accent)]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">Spec Generator</h1>
        </div>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Generate unique, production-ready specs using combinatorial template
          expansion. Select a category, set your limit, and generate.
        </p>
      </div>

      <div className="mb-8">
        <GeneratorForm onGenerate={handleGenerate} />
      </div>

      {isGenerated && specs.length > 0 && (
        <div className="animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Generated Specs
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Showing {visibleSpecs.length} of {filteredSpecs.length} spec
                {filteredSpecs.length !== 1 ? "s" : ""}
                {searchQuery && " (filtered)"}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopyAll}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-overlay)]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                Copy All
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--background)] transition-all hover:bg-[var(--accent-text)] hover:-translate-y-0.5"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download JSON
              </button>
            </div>
          </div>

          {searchQuery && (
            <div className="mb-4 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(VISIBLE_LIMIT);
                }}
                placeholder="Search specs..."
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] pl-10 pr-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
              />
            </div>
          )}

          {!searchQuery && (
            <div className="mb-4 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-tertiary)]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(VISIBLE_LIMIT);
                }}
                placeholder="Search specs..."
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] pl-10 pr-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
              />
            </div>
          )}

          {visibleSpecs.length > 0 ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                {visibleSpecs.map((spec, index) => (
                  <SpecCard
                    key={`${spec.category}-${spec.id}-${index}`}
                    spec={spec}
                    index={index}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="mt-6 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-6 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]"
                  >
                    Load More ({filteredSpecs.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-raised)]">
                <svg className="h-6 w-6 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[var(--text-primary)]">
                No matching specs
              </h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Try a different search term.
              </p>
            </div>
          )}
        </div>
      )}

      {isGenerated && specs.length === 0 && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-raised)]">
            <svg className="h-6 w-6 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-[var(--text-primary)]">
            No specs generated
          </h3>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Try adjusting your category or limit and generate again.
          </p>
        </div>
      )}
    </div>
  );
}
