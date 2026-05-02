"use client";

import { useState } from "react";
import { GeneratedSpec } from "@/lib/generator";
import { useToast } from "@/components/ToastProvider";

interface SpecCardProps {
  spec: GeneratedSpec;
  index: number;
}

export default function SpecCard({ spec, index }: SpecCardProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(spec.spec);
    setCopied(true);
    showToast("Copied to clipboard", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryColorMap: Record<string, string> = {
    backend: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    frontend: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    ai_agent: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    devops: "bg-green-500/10 text-green-400 border-green-500/20",
    database: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  const categoryColor =
    categoryColorMap[spec.category] ||
    "bg-[var(--accent-dim)] text-[var(--accent-text)] border-[var(--accent)]/20";

  return (
    <div className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden transition-all hover:border-[var(--border-hover)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-overlay)] text-xs font-medium text-[var(--text-tertiary)]">
            {index + 1}
          </span>
          <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${categoryColor}`}>
            {spec.categoryLabel || spec.category.replace("_", " ")}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="rounded-md p-1.5 text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)] hover:bg-[var(--surface-overlay)]"
          title="Copy to clipboard"
        >
          {copied ? (
            <svg className="h-4 w-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          )}
        </button>
      </div>

      <div className="p-4">
        <p className="text-sm leading-relaxed text-[var(--text-secondary)] font-mono">
          {spec.spec}
        </p>
      </div>
    </div>
  );
}
