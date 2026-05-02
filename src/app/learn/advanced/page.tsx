import Link from "next/link";

export default function AdvancedPage() {
  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-[var(--accent)]">
        Lesson 4 of 5
      </p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
        Advanced Spec Design
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">
        Once you understand the four core components, the next step is
        optimization. Advanced spec design focuses on token efficiency,
        multi-step reasoning control, and edge-case handling.
      </p>

      <div className="mt-10 space-y-8">
        {/* Token Efficiency */}
        <section>
          <h2 className="text-xl font-semibold">Token Efficiency</h2>
          <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
            Every token in a spec costs money and consumes context window.
            Optimizing for token efficiency means removing redundant
            instructions while preserving clarity. The goal is the shortest
            spec that still produces the desired output.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                Wordy (47 tokens)
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                "Please make sure that you write the code in a way that is
                really clean and follows all the best practices that are
                commonly accepted in the industry."
              </p>
            </div>
            <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Efficient (12 tokens)
              </p>
              <p className="mt-2 text-sm text-[var(--text-primary)]">
                "Follow SOLID principles and clean architecture."
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
              Token Saving Techniques
            </p>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              {[
                "Replace explanations with established terminology (e.g., 'SOLID' instead of describing each principle)",
                "Use imperative voice: 'Return JSON' not 'Please return the output in JSON format'",
                "Chain constraints with semicolons instead of full sentences",
                "Remove filler words: please, could you, would you mind",
              ].map((tip, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-[var(--accent)] mt-0.5">→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Multi-step reasoning */}
        <section>
          <h2 className="text-xl font-semibold">Multi-Step Reasoning Control</h2>
          <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
            Complex tasks require the model to think in steps. You can control
            the reasoning process by explicitly structuring the spec to
            request intermediate outputs or chain multiple specs together.
          </p>
          <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
              Chain Pattern
            </p>
            <div className="space-y-3">
              <div className="rounded-md bg-[var(--surface-overlay)] p-3">
                <p className="text-xs font-medium text-[var(--accent)]">
                  Spec 1 — Analyze
                </p>
                <p className="mt-1 text-sm font-mono text-[var(--text-secondary)]">
                  "You are a system architect. Analyze the following
                  requirements and produce a component diagram in Mermaid
                  syntax."
                </p>
              </div>
              <div className="flex justify-center">
                <svg
                  className="h-5 w-5 text-[var(--text-tertiary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                  />
                </svg>
              </div>
              <div className="rounded-md bg-[var(--surface-overlay)] p-3">
                <p className="text-xs font-medium text-[var(--accent)]">
                  Spec 2 — Implement
                </p>
                <p className="mt-1 text-sm font-mono text-[var(--text-secondary)]">
                  "You are a senior engineer. Implement each component from
                  the diagram above. Return complete code for each module."
                </p>
              </div>
              <div className="flex justify-center">
                <svg
                  className="h-5 w-5 text-[var(--text-tertiary)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                  />
                </svg>
              </div>
              <div className="rounded-md bg-[var(--surface-overlay)] p-3">
                <p className="text-xs font-medium text-[var(--accent)]">
                  Spec 3 — Test
                </p>
                <p className="mt-1 text-sm font-mono text-[var(--text-secondary)]">
                  "You are a QA engineer. Write integration tests for the
                  implemented components. Return test files with 90%+
                  coverage."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Edge-case handling */}
        <section>
          <h2 className="text-xl font-semibold">Edge-Case Handling</h2>
          <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
            Specs should anticipate how the model might misinterpret
            instructions. Adding negative constraints (what NOT to do) is
            often as important as positive constraints.
          </p>
          <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
              Negative Constraint Patterns
            </p>
            <ul className="space-y-2 text-sm font-mono text-[var(--text-secondary)]">
              <li>
                <span className="text-red-400">"Do not"</span> use third-party
                libraries
              </li>
              <li>
                <span className="text-red-400">"Do not"</span> include
                explanations or comments
              </li>
              <li>
                <span className="text-red-400">"Never"</span> return partial
                code — always return complete files
              </li>
              <li>
                <span className="text-red-400">"Exclude"</span> error handling
                unless explicitly requested
              </li>
            </ul>
          </div>
        </section>

        {/* Spec validation */}
        <section>
          <h2 className="text-xl font-semibold">Spec Validation Checklist</h2>
          <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
            <ul className="space-y-3">
              {[
                "Role: Is the expertise level and domain clear?",
                "Task: Is the deliverable specific and actionable?",
                "Constraints: Are technology, architecture, and rules defined?",
                "Format: Is the output structure machine-parseable?",
                "Ambiguity: Could a reasonable person interpret this differently?",
                "Brevity: Are there redundant words that can be removed?",
                "Edge cases: Are negative constraints included where needed?",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-[var(--border)] text-xs text-[var(--text-tertiary)]">
                    {i + 1}
                  </span>
                  <span className="text-[var(--text-secondary)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between border-t border-[var(--border)] pt-6">
          <Link
            href="/learn/templates"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Previous: Templates
          </Link>
          <Link
            href="/learn/context"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-text)] hover:text-[var(--accent)] transition-colors"
          >
            Next: Context Engineering
            <svg
              className="h-4 w-4"
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
          </Link>
        </div>
      </div>
    </div>
  );
}
