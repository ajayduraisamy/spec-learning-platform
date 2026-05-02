import Link from "next/link";

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="gradient-shimmer absolute inset-0" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-1.5">
            <span className="mr-2 h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-sm text-[var(--text-secondary)]">
              Open Source · Free Forever
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Master{" "}
            <span className="text-[var(--accent)]">Spec Engineering</span>
            <br />
            for LLM Applications
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
            Learn the systematic approach to writing precise, structured prompts
            that produce consistent, production-grade results from any large
            language model.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/learn"
              className="w-full sm:w-auto rounded-xl bg-[var(--accent)] px-8 py-3.5 text-base font-semibold text-[var(--background)] shadow-lg shadow-[var(--accent)]/20 transition-all hover:bg-[var(--accent-text)] hover:shadow-[var(--accent-text)]/30 hover:-translate-y-0.5"
            >
              Start Learning
            </Link>
            <Link
              href="/contribute"
              className="w-full sm:w-auto rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] px-8 py-3.5 text-base font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface-overlay)] hover:-translate-y-0.5"
            >
              Contribute on GitHub
            </Link>
          </div>
        </div>
      </section>

      {/* What is Spec Engineering */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold sm:text-3xl">
            What is Spec Engineering?
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-[var(--text-secondary)]">
            <p>
              Spec Engineering is a disciplined approach to designing prompts as
              structured specifications rather than free-form text. Instead of
              writing conversational instructions, you define a clear
              <span className="text-[var(--text-primary)] font-medium">
                {" "}
                role
              </span>
              , a precise{" "}
              <span className="text-[var(--text-primary)] font-medium">
                task
              </span>
              , explicit{" "}
              <span className="text-[var(--text-primary)] font-medium">
                constraints
              </span>
              , and a defined{" "}
              <span className="text-[var(--text-primary)] font-medium">
                output format
              </span>
              .
            </p>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-overlay)] p-6 font-mono text-sm text-[var(--text-primary)]">
              <p className="text-[var(--text-tertiary)]">// A spec vs a regular prompt</p>
              <p className="mt-3 text-[var(--accent-text)]">
                ❌ "Write some code for a user login"
              </p>
              <p className="mt-2 text-[var(--accent-text)]">
                ✓ "You are a senior backend engineer. Implement JWT-based
                authentication with refresh token rotation in Node.js and
                Express. Return a complete Express router with middleware. No
                explanation."
              </p>
            </div>
            <p>
              The difference is reproducibility. A well-engineered spec produces
              the same quality of output regardless of who runs it or which LLM
              provider processes it.
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="border-t border-[var(--border)] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold sm:text-3xl">Why It Matters</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Consistency",
                desc: "Same input, same output quality. Specs eliminate the randomness of free-form prompting.",
                icon: "◆",
              },
              {
                title: "Scalability",
                desc: "Generate hundreds of unique prompts programmatically. One template becomes thousands of specs.",
                icon: "▲",
              },
              {
                title: "Engineering Rigor",
                desc: "Treat prompts like code: version, test, and iterate. Specs can be linted, validated, and reviewed.",
                icon: "●",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--border-hover)]"
              >
                <div className="mb-4 text-[var(--accent)] text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to build better prompts?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
            Start with the fundamentals and work your way up to advanced spec
            design patterns.
          </p>
          <div className="mt-8">
            <Link
              href="/learn"
              className="inline-flex items-center rounded-xl bg-[var(--accent)] px-8 py-3.5 text-base font-semibold text-[var(--background)] shadow-lg shadow-[var(--accent)]/20 transition-all hover:bg-[var(--accent-text)] hover:shadow-[var(--accent-text)]/30 hover:-translate-y-0.5"
            >
              Begin Tutorial
              <svg
                className="ml-2 h-5 w-5"
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
      </section>
    </div>
  );
}
