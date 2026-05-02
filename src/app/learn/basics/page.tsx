import TopicLayout from "@/components/TopicLayout";

export default function BasicsPage() {
  return (
    <TopicLayout
      section="Foundations"
      lessonNumber="Lesson 2 of 10"
      title="Basics"
      currentHref="/learn/basics"
    >
      <section>
        <h2 className="text-xl font-semibold">What Is a Spec?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A spec is a structured prompt that follows a predictable format to produce consistent, high-quality output from a language model. Unlike free-form prompts that rely on the model to interpret your intent, a spec removes ambiguity by explicitly defining four dimensions of the interaction: who the model should act as (role), what it should accomplish (task), what rules it must follow (constraints), and how to format the result (output format).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Think of a spec as a contract between you and the model. Just as an API contract defines the expected request format, valid parameters, and response schema, a spec defines the behavioral parameters of your interaction with the LLM. When you honor this contract by writing clear, complete specifications, the model honors it by producing output that meets your expectations.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The discipline of writing specs is analogous to writing a Jira ticket or engineering design doc. You would never write a ticket that says "build something for users." You would write "implement JWT authentication with refresh token rotation, return an Express router, follow our existing middleware patterns, and include unit tests." A spec applies this same engineering discipline to LLM interactions, transforming them from conversational gambits into reproducible engineering operations.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The practical impact of this approach is measurable. Teams using specs report that their first-generation output is usable 70-80% of the time, compared to 20-30% for ad-hoc prompts. The remaining 20-30% of iterations typically involve minor adjustments rather than fundamental rewrites, which represents a 3-5x reduction in prompt engineering time.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">The Anatomy of a Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Every spec consists of four components arranged in a specific order. This ordering is not arbitrary—it mirrors the way LLMs process context. The role comes first because it establishes the model's perspective and primes its training weights. The task follows because it defines the objective within that perspective. Constraints come third because they narrow the solution space for the defined task. The output format comes last because it governs how everything preceding it should be presented.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Complete Spec Example — Authentication API
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// 1. Role — who the model acts as"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior backend engineer specializing in authentication and authorization systems.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// 2. Task — what to accomplish"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Design a RESTful API for user authentication that supports registration, login, password reset, and token refresh.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// 3. Constraints — technology and rules"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Use Node.js and Express. Implement JWT with 15-minute access tokens and 7-day refresh tokens. Include rate limiting (5 login attempts per IP per minute), input validation with Zod, and bcrypt password hashing with salt rounds of 12.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// 4. Output Format — how to structure the response"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return output in OpenAPI 3.0 YAML format. Include all endpoints, request/response schemas, and error codes. No explanation, no prose.
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          Notice how each component builds on the previous one. The role establishes expertise in authentication systems. The task defines the specific deliverable within that domain. The constraints specify the exact technology, algorithms, and security parameters. The output format ensures the result is immediately usable as an API specification document.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Why Specs Work Better Than Prompts</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The superiority of specs over ad-hoc prompts is not a matter of opinion—it is a consequence of how transformer models process language. LLMs generate text by predicting the next token based on the probability distribution learned from their training data. When you provide a vague prompt, the probability distribution is wide, and the model samples from a broad range of possibilities. When you provide a spec with clear role, task, constraints, and format, you narrow that distribution dramatically, concentrating probability mass on outputs that match your requirements.
        </p>

        <div className="mt-4 space-y-3">
          {[
            {
              title: "Reduced Ambiguity",
              desc: "Each component eliminates a specific source of variation. The role sets expertise level and domain knowledge. The task defines scope and deliverables. Constraints bound the solution space and prevent unwanted approaches. Output format ensures parseable, consistent results. Together, they reduce the model's degrees of freedom from essentially infinite to a manageable set of valid outputs.",
            },
            {
              title: "Deterministic Behavior",
              desc: "While LLMs are inherently probabilistic, specs make them behave deterministically in practice. By constraining every dimension of the output, you ensure that different runs of the same spec produce structurally identical results. This is essential for any application where the LLM's output is consumed programmatically.",
            },
            {
              title: "Composability and Templating",
              desc: "Because specs follow a predictable structure, they can be templated with variables. A single template like 'You are a {role}. {task} using {tech}. Return output in {format}.' can generate hundreds of unique specs through combinatorial substitution. This is the foundation of scaling LLM interactions across teams and projects.",
            },
            {
              title: "Testability and Evaluation",
              desc: "Structured output enables automated testing. When you specify 'Return JSON with this schema,' you can write a JSON schema validator that checks every response. When you specify 'Include error handling for these cases,' you can verify that each error case is addressed. This transforms spec quality from a subjective judgment into a measurable metric.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <h3 className="font-medium text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Good vs. Bad: A Side-by-Side Comparison</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The clearest way to understand the value of specs is to compare them directly with their ad-hoc alternatives. Below are three real-world examples showing the difference between a prompt that produces mediocre output and a spec that produces production-ready results.
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example 1: Database Migration Script
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Write a database migration"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Which database? What schema? What language? The model will guess, and its guess will likely be wrong.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  You are a database engineer. Write a PostgreSQL migration that adds a users table with id (UUID PK), email (unique, not null), password_hash (not null), created_at (default now()), and updated_at. Use Knex.js migration format with up and down functions.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Every dimension is specified. The output is immediately usable.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example 2: React Component
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Make a user profile card"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  CSS-in-JS? Tailwind? Class components? Hooks? TypeScript? The model has no guidance.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  You are a senior React developer. Create a responsive user profile card component showing avatar, name, email, and role badge. Use TypeScript, Tailwind CSS, and lucide-react icons. Export as a default function component. Accept a UserProfile interface as props.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Framework, language, styling, props interface, and export format are all specified.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example 3: Shell Script
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Write a script to backup my database"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Which database? Where to store backups? How long to retain? What about errors?
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  You are a DevOps engineer. Write a bash script that backs up a PostgreSQL database using pg_dump, compresses the output with gzip, stores it in /var/backups/db/ with a date-stamped filename, retains only the last 7 backups, and logs success/failure to syslog. Include set -euo pipefail and error handling for each step.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Tool, destination, retention, logging, and error handling are all specified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Writing Your First Spec</h2>
        <div className="mt-4 space-y-3">
          {[
            "Write the task first. Before you think about roles or constraints, be crystal clear about what you want the model to produce. If you cannot articulate the task in one sentence, you need to narrow your scope.",
            "Add constraints incrementally. Start with a minimal spec (role + task + format), run it, examine the output, then add constraints to fix specific problems. This iterative approach is faster than trying to anticipate every constraint upfront.",
            "Always specify the output format, even if it seems obvious. The model does not share your intuition about what format is appropriate. Explicitly stating 'Return only the code' or 'Return JSON' prevents entire categories of output problems.",
            "Test your spec with at least three different runs. LLMs are probabilistic. If the output varies significantly between runs, your spec is under-constrained. Add specificity until the output is consistent.",
            "Read your spec aloud before running it. If you stumble over any sentence or notice ambiguity, the model will too. Clarity in the spec directly translates to quality in the output.",
          ].map((tip, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage Scenario</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Consider a startup building a SaaS analytics dashboard. The engineering team needs to generate API endpoints, database schemas, React components, deployment scripts, and test suites. Without specs, each developer writes their own prompts, producing inconsistent output that requires significant manual integration work. With specs, the team creates a library of 12 standardized specifications covering their most common development tasks. New team members onboard by learning to use these specs rather than learning to write prompts from scratch. The specs are version-controlled, reviewed in pull requests, and continuously improved based on output quality metrics. Within three months, the team's development velocity increases by 40% because the specs eliminate the prompt-writing iteration loop and produce consistently usable output on the first generation.
        </p>
      </section>
    </TopicLayout>
  );
}
