export default function ContributePage() {
  return (
    <div className="animate-fade-in mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-[var(--accent)]">
        Open Source
      </p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
        Contribute to SpecEngine
      </h1>

      <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">
        SpecEngine is an open-source project built by the community, for the
        community. Whether you want to add new learning content, improve the
        spec generator, or fix a bug — every contribution matters.
      </p>

      <div className="mt-10 space-y-8">
        {/* Why contribute */}
        <section>
          <h2 className="text-xl font-semibold">Why Contribute?</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Shape the Standard",
                desc: "Help define how the industry thinks about and builds LLM prompts.",
              },
              {
                title: "Learn Publicly",
                desc: "Writing content teaches you more than reading it. Your work helps thousands of developers.",
              },
              {
                title: "Build Your Portfolio",
                desc: "Open-source contributions are the strongest signal of engineering skill to employers.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--border-hover)]"
              >
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How to contribute */}
        <section>
          <h2 className="text-xl font-semibold">How to Contribute</h2>
          <div className="mt-4 space-y-4">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-dim)] text-base font-bold text-[var(--accent)]">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  Fork the Repository
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Create your own copy of the project on GitHub. This gives you
                  a sandbox to work in without affecting the main codebase.
                </p>
                <div className="mt-3 rounded-md bg-[var(--surface-overlay)] p-3 font-mono text-xs text-[var(--accent-text)] border border-[var(--border)]">
                  git clone https://github.com/ajayduraisamy/spec-learning-platform.git
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-dim)] text-base font-bold text-[var(--accent)]">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  Make Your Changes
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Add new learning content, improve existing lessons, fix bugs,
                  or enhance the spec generator. Follow the code style and
                  content guidelines in the repository.
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] mt-0.5">→</span>
                    Add content: <code className="text-[var(--accent-text)]">app/learn/your-topic/page.tsx</code>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] mt-0.5">→</span>
                    Add spec templates: <code className="text-[var(--accent-text)]">specs/baseSpecs.json</code>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] mt-0.5">→</span>
                    Fix bugs: any file in the codebase
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-dim)] text-base font-bold text-[var(--accent)]">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  Submit a Pull Request
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Push your changes and open a pull request. Describe what you
                  changed and why. The maintainers will review it and provide
                  feedback. Once approved, your contribution goes live.
                </p>
                <div className="mt-3 rounded-md bg-[var(--surface-overlay)] p-3 font-mono text-xs text-[var(--accent-text)] border border-[var(--border)]">
                  <p>git add .</p>
                  <p>git commit -m "feat: add spec template"</p>
                  <p>git push origin your-branch</p>
                  <p className="text-[var(--text-tertiary)]">
                    # Then open PR on GitHub
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contribution areas */}
        <section>
          <h2 className="text-xl font-semibold">What You Can Contribute</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              {
                area: "Learning Content",
                desc: "New tutorials, lessons, and examples on spec engineering topics.",
              },
              {
                area: "Spec Templates",
                desc: "Industry-specific templates for healthcare, fintech, gaming, etc.",
              },
              {
                area: "Generator Tools",
                desc: "Improve the combinator engine, add new output formats, build a CLI.",
              },
              {
                area: "Design & UX",
                desc: "Improve the platform interface, add dark mode variants, enhance accessibility.",
              },
            ].map((item) => (
              <div
                key={item.area}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <h3 className="font-medium text-[var(--text-primary)]">
                  {item.area}
                </h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* GitHub CTA */}
        <section>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-[var(--text-tertiary)]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 2.953 1.305.858-.238 1.772-.357 2.685-.361.913.004 1.827.123 2.685.361 1.945-1.627 2.953-1.305 2.953-1.305.652 1.652.241 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">
              Join Us on GitHub
            </h3>
            <p className="mt-2 text-[var(--text-secondary)]">
              Star the repo, fork it, and start contributing today.
            </p>
            <a
              href="https://github.com/ajayduraisamy/spec-learning-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface-overlay)] hover:-translate-y-0.5"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 2.953 1.305.858-.238 1.772-.357 2.685-.361.913.004 1.827.123 2.685.361 1.945-1.627 2.953-1.305 2.953-1.305.652 1.652.241 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
