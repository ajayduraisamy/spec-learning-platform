"use client";

import { getCategories, generateSpecs, GeneratedSpec } from "@/lib/generator";
import { useToast } from "@/components/ToastProvider";
import { useState } from "react";

interface GeneratorFormProps {
  onGenerate: (specs: GeneratedSpec[]) => void;
}

export default function GeneratorForm({ onGenerate }: GeneratorFormProps) {
  const categories = getCategories();
  const [limit, setLimit] = useState(100);
  const [category, setCategory] = useState("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const { showToast } = useToast();

  const handleGenerate = () => {
    setIsGenerating(true);
    const clampedLimit = Math.min(1000, Math.max(1, limit));

    setTimeout(() => {
      const specs = generateSpecs(
        category === "all" ? null : category,
        clampedLimit
      );
      onGenerate(specs);
      setIsGenerating(false);
      showToast(`Generated ${specs.length} specs`, "success");
    }, 400);
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors">
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
        Configuration
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-overlay)] px-3 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="limit"
            className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
          >
            Number of Specs
          </label>
          <input
            id="limit"
            type="number"
            min={1}
            max={1000}
            value={limit}
            onChange={(e) =>
              setLimit(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))
            }
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-overlay)] px-3 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
          />
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">
            Max: 1,000
          </p>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--background)] transition-all hover:bg-[var(--accent-text)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-[var(--accent)] flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
                Generate Specs
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
