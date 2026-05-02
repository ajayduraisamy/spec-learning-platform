import Link from "next/link";

const topics = [
  {
    title: "Spec Basics",
    href: "/learn/basics",
    description:
      "Understand what a spec is, how it differs from regular prompts, and why structured instructions produce better results.",
    next: "Spec Structure →",
  },
  {
    title: "Spec Structure",
    href: "/learn/structure",
    description:
      "Learn the four core components: Role, Task, Constraints, and Output Format. Each plays a distinct role in guiding the LLM.",
    next: "Templates →",
  },
  {
    title: "Templates",
    href: "/learn/templates",
    description:
      "Build reusable spec templates with variable placeholders. One template can generate hundreds of unique, consistent prompts.",
    next: "Advanced →",
  },
  {
    title: "Advanced Spec Design",
    href: "/learn/advanced",
    description:
      "Optimize specs for token efficiency, multi-step reasoning, and edge-case handling. Learn to control LLM behavior precisely.",
    next: "Context Engineering →",
  },
  {
    title: "Context Engineering",
    href: "/learn/context",
    description:
      "Discover how to design and manage context windows. Understand the difference between specs and context, and when to use each.",
    next: "",
  },
];

export default function LearnPage() {
  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-medium text-[var(--accent)]">
          Tutorial · 5 Modules
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Learn Spec Engineering
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">
          Spec Engineering is the practice of treating prompts as structured
          specifications. Instead of writing conversational instructions, you
          define a precise role, task, constraints, and output format that any
          LLM can follow consistently.
        </p>
      </div>

      {/* How it works */}
      <div className="mb-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-lg font-semibold">How specs differ from prompts</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
              Regular Prompt
            </p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              "Write a function to sort an array"
            </p>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">
              Unclear language, no constraints, unpredictable output
            </p>
          </div>
          <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Engineered Spec
            </p>
            <p className="mt-2 text-sm text-[var(--text-primary)]">
              "You are a performance engineer. Implement an in-place quicksort
              algorithm in TypeScript. Return only the function with JSDoc
              comments. No explanation."
            </p>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">
              Clear role, specific task, language constraint, defined output
            </p>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-4">
        {topics.map((topic, index) => (
          <Link
            key={topic.href}
            href={topic.href}
            className="group block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface-raised)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] text-xs font-medium text-[var(--text-tertiary)]">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-text)] transition-colors">
                    {topic.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {topic.description}
                </p>
              </div>
              <svg
                className="h-5 w-5 text-[var(--text-tertiary)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
