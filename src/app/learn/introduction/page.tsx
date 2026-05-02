import TopicLayout from "@/components/TopicLayout";

export default function IntroductionPage() {
  return (
    <TopicLayout
      section="Foundations"
      lessonNumber="Lesson 1 of 10"
      title="Introduction"
      currentHref="/learn/introduction"
    >
      <section>
        <h2 className="text-xl font-semibold">What Is Spec Engineering?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Spec Engineering is the disciplined practice of designing structured prompts—called specifications—that produce consistent, predictable, and high-quality output from large language models. Unlike casual prompting, where you type a question and hope for a useful answer, spec engineering treats every interaction with an LLM as a software engineering problem. You define inputs, constraints, expected outputs, and error conditions with the same rigor you would apply to writing an API contract.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The core insight is simple but transformative: LLMs are not conversation partners. They are deterministic function approximators that respond to patterns in their input. When you write a vague prompt like "help me build a website," the model draws from billions of training examples and produces a generic, low-signal response. When you write a spec that says "You are a senior React developer. Build a responsive dashboard component with three metric cards, a line chart, and a data table. Use Tailwind CSS. Return only the TSX file," the model's output space is dramatically narrowed, and the result is immediately useful.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          This paradigm shift—from prompting as conversation to prompting as specification—changes how teams integrate LLMs into their workflows. It transforms the LLM from a novelty into a reliable tool that can be tested, versioned, and composed into larger systems. Every spec you write becomes a reusable asset, not a throwaway prompt.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The term "spec" comes from the software engineering tradition of writing specifications: documents that define what a system should do without dictating how it should do it. A good spec is precise about requirements but flexible about implementation. Applied to LLMs, this means being exact about the role, task, constraints, and output format while allowing the model to use its training to fill in the details.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">The Problem Spec Engineering Solves</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Anyone who has spent significant time with LLMs has encountered the same frustration: you ask a question, get an answer, refine your question, get a slightly better answer, and repeat this loop until exhaustion. This iterative prompting is inefficient, inconsistent, and impossible to scale. Each conversation is stateless—you cannot guarantee that the same prompt will produce the same output twice, and you certainly cannot guarantee that a colleague will get the same result you did.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Consider a team of ten developers who each need code review assistance. Without specs, each developer writes their own prompt: some are detailed, some are terse, some ask for security analysis, others focus on performance. The results are inconsistent, the team learns different things from the same codebase, and there is no way to measure or improve the quality of the prompts themselves. With specs, the team agrees on a standardized code review specification that every developer uses. The output is consistent, the quality is measurable, and improvements to the spec benefit everyone simultaneously.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Spec engineering solves three fundamental problems that plague ad-hoc prompting. First, it eliminates ambiguity by forcing the prompt writer to be explicit about every dimension of the task. Second, it enables composability—specs can be chained, templated, and parameterized to create complex workflows. Third, it introduces testability: because the expected output format is defined, you can write assertions that verify the LLM's response meets your criteria.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The economic impact is significant. Teams that adopt spec engineering report 3-5x faster iteration cycles when building LLM-powered features. Instead of spending hours refining prompts through trial and error, engineers write a spec, test it against a small evaluation set, and deploy. When the model updates or requirements change, they update the spec—not every individual prompt in their system.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How Specs Differ from Prompts</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The distinction between a spec and a prompt is architectural, not cosmetic. A prompt is a single message sent to an LLM. A spec is a structured system of instructions that governs the model's behavior across every dimension of the interaction. Every spec is a prompt, but not every prompt is a spec—just as every square is a rectangle but not every rectangle is a square.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
              Ad-Hoc Prompt
            </p>
            <div className="mt-3 rounded-md bg-[var(--surface-overlay)] p-3 font-mono text-sm text-[var(--text-secondary)]">
              "Write me a login page"
            </div>
            <div className="mt-3 space-y-1 text-xs text-[var(--text-tertiary)]">
              <p>No defined role or expertise level</p>
              <p>No technology constraints</p>
              <p>No output format specification</p>
              <p>No validation criteria</p>
            </div>
          </div>
          <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Engineered Spec
            </p>
            <div className="mt-3 rounded-md bg-[var(--surface-overlay)] p-3 font-mono text-sm text-[var(--accent-text)]">
              You are a senior React developer. Build a login page with email/password form, OAuth Google button, and "forgot password" link. Use Next.js 14 App Router, React Hook Form, Zod validation, and Tailwind CSS. Return only the page.tsx file. No explanation.
            </div>
            <div className="mt-3 space-y-1 text-xs text-[var(--text-tertiary)]">
              <p>Role: senior React developer</p>
              <p>Task: build login page with specific features</p>
              <p>Constraints: Next.js 14, React Hook Form, Zod, Tailwind</p>
              <p>Output: only page.tsx, no explanation</p>
            </div>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          The prompt on the left might produce a login page in any framework, with any styling, in any format. The spec on the left produces exactly the component the engineer needs, in exactly the format their project expects. The difference is not subtle—it is the difference between a random generator and a precision instrument.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">The Four Pillars of Every Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Every well-constructed spec is built from four components that work together to constrain the model's output space. These are not optional sections or stylistic choices—they are the structural elements that make spec engineering effective. Understanding each pillar and how they interact is the foundation of everything that follows in this course.
        </p>

        <div className="mt-4 space-y-3">
          {[
            {
              pillar: "Role",
              description: "Defines who the model should act as. This primes the model's training weights toward a specific domain, expertise level, and communication style. A 'senior security auditor' produces fundamentally different analysis than a 'helpful assistant.'",
              example: '"You are a principal backend engineer with 10+ years of experience in distributed systems."',
            },
            {
              pillar: "Task",
              description: "States exactly what needs to be accomplished. It must be specific, actionable, and scoped. Good tasks use active verbs and describe a concrete deliverable that can be evaluated for completeness.",
              example: '"Design a rate-limiting middleware that tracks requests per IP using a sliding window algorithm."',
            },
            {
              pillar: "Constraints",
              description: "Bound the solution space by specifying technology, architecture, performance requirements, coding standards, and any rules the model must follow. Constraints prevent the model from choosing suboptimal or unexpected approaches.",
              example: '"Use Redis for state storage. Must handle 50,000 req/s. Follow SOLID principles. No third-party rate-limiting libraries."',
            },
            {
              pillar: "Output Format",
              description: "Specifies exactly how the response should be structured. This is critical for programmatic consumption and ensures the output can be parsed, validated, and integrated into automated workflows.",
              example: '"Return only the TypeScript code in a single file. Include JSDoc comments. No explanation, no markdown fencing."',
            },
          ].map((item) => (
            <div
              key={item.pillar}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <h3 className="font-semibold text-[var(--text-primary)]">
                {item.pillar}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.description}
              </p>
              <div className="mt-2 rounded-md bg-[var(--surface-overlay)] p-2 font-mono text-xs text-[var(--accent-text)]">
                {item.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">A Complete Spec in Action</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Let's walk through a real-world spec from start to finish. Imagine you are building an e-commerce platform and need a product search endpoint. Instead of asking the LLM vaguely for "search functionality," you write a spec that leaves no room for ambiguity.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Complete Spec — Product Search API
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior backend engineer specializing in search infrastructure.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Build a full-text product search endpoint that supports fuzzy matching, faceted filtering by category and price range, and relevance-scored results.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Use Python with FastAPI and Elasticsearch 8.x. Implement pagination with cursor-based navigation. Response time must be under 200ms for 95th percentile. Use connection pooling.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return only the Python module with type hints, docstrings, and error handling. Include the Elasticsearch query DSL as a separate constant. No explanation.
              </span>
            </code>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Expected Output
          </p>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            The model returns a single Python file containing a FastAPI router with a <code className="font-mono text-[var(--accent-text)]">GET /search</code> endpoint, an Elasticsearch query builder with fuzzy matching and faceted aggregation, cursor-based pagination logic, and proper error handling for malformed queries and connection failures. The output is immediately usable—no editing required.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage Scenarios</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Spec engineering is not theoretical—it is the backbone of how production teams integrate LLMs into their workflows. Here are three scenarios where spec engineering makes the difference between a prototype and a production system.
        </p>

        <div className="mt-4 space-y-4">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h3 className="font-semibold text-[var(--text-primary)]">
              Scenario 1: Automated Code Generation at Scale
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              A fintech company needs to generate CRUD API endpoints for 47 database tables. Instead of writing 47 individual prompts, the engineering team writes one spec template with variables for table name, primary key type, and relationships. The template generates 47 specs, each producing a complete FastAPI router with validation, pagination, and error handling. The entire set is generated in under 10 minutes and requires minimal manual review.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h3 className="font-semibold text-[var(--text-primary)]">
              Scenario 2: Consistent Code Reviews
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              A distributed team of 25 developers uses a standardized code review spec that instructs the LLM to act as a principal engineer, analyze the provided diff for security vulnerabilities and performance regressions, and return a JSON report with severity ratings and line references. Every pull request gets the same level of scrutiny regardless of which developer submitted it or which reviewer is assigned.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h3 className="font-semibold text-[var(--text-primary)]">
              Scenario 3: Documentation Generation Pipeline
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              A SaaS company generates API documentation from OpenAPI specs using a spec that instructs the LLM to act as a technical writer, extract endpoint descriptions, generate usage examples in three languages (Python, JavaScript, cURL), and flag any endpoints missing required fields. The output is validated against a schema before being published to their documentation site.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Getting Started</h2>
        <div className="mt-4 space-y-3">
          {[
            "Start with one spec. Don't try to template everything at once. Write a single spec for a task you do frequently, refine it through 3-5 iterations until the output is consistently useful, then consider templating it.",
            "Treat your specs as code. Store them in version control, review changes through pull requests, and write tests that validate the output format. Your specs are part of your codebase.",
            "Measure output quality. Define 3-5 criteria for what makes a good output for your spec, and score each generation against those criteria. Use the scores to iteratively improve your spec.",
            "Never skip the output format section. This is the most commonly neglected component and the single biggest cause of unusable LLM output. Always specify exactly how you want the response structured.",
            "Write specs that are model-agnostic. Avoid assumptions about how a specific model behaves. A well-written spec should produce consistent results across GPT-4, Claude, and Llama.",
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
    </TopicLayout>
  );
}
