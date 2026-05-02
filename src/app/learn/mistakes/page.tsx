import TopicLayout from "@/components/TopicLayout";

export default function MistakesPage() {
  return (
    <TopicLayout
      section="Foundations"
      lessonNumber="Lesson 10 of 10"
      title="Common Mistakes"
      currentHref="/learn/mistakes"
    >
      <section>
        <h2 className="text-xl font-semibold">Learning from the Most Common Spec Errors</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The fastest way to improve your spec engineering skills is to study the mistakes that practitioners make most frequently. These mistakes are not theoretical—they are the errors that real engineers make when writing their first specs, their tenth specs, and even their hundredth specs. Understanding them, recognizing them in your own work, and learning how to fix them will accelerate your progress more than any other single activity.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The mistakes documented here have been observed across thousands of specs written by engineers at companies ranging from startups to Fortune 500 enterprises. They fall into distinct categories: structural mistakes (wrong spec architecture), content mistakes (weak or missing components), process mistakes (how specs are written and iterated), and system mistakes (how specs are used in production). Each mistake includes a description, a concrete example, the consequence, and the fix.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          As you read through these mistakes, pay attention to the ones that resonate with your own experience. Almost every spec engineer has made at least half of these mistakes at some point. The difference between a novice and an expert is not that the expert never makes mistakes—it is that the expert recognizes them quickly and corrects them systematically.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Mistake 1: Omitting the Output Format</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          This is the single most common spec error, and it is also the most costly. When you omit the output format, the model defaults to its conversational training, wrapping the useful output in introductory text, explanations, caveats, and concluding remarks. For human readers, this is annoying but manageable. For automated systems, it is catastrophic—the output cannot be parsed, compiled, or integrated without manual preprocessing.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
              Mistake
            </p>
            <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
              You are a backend engineer. Implement a JWT auth middleware using Node.js and Express.
            </p>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">
              No output format specified. The model will add an introduction ("Here's the middleware..."), explanation ("This works by..."), and conclusion ("Let me know if you need changes!").
            </p>
          </div>
          <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Fix
            </p>
            <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
              You are a backend engineer. Implement a JWT auth middleware using Node.js and Express. Return only the TypeScript code. No explanation, no markdown fencing, no introductory text.
            </p>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">
              The output is pure code—immediately usable without any preprocessing.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Consequence
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            The output requires manual editing before it can be used. In automated pipelines, it causes JSON parse failures, compilation errors, or import failures. Engineers waste time stripping conversational text from every response.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Mistake 2: Vague Role Definitions</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Using a generic role like "You are an assistant" or "You are an expert" fails to prime the model with domain-specific knowledge. The model's training encompasses millions of documents across thousands of domains. A generic role activates a broad, shallow knowledge space that produces generic, surface-level output. A specific role activates a narrow, deep knowledge space that produces expert-level analysis.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
              Mistake
            </p>
            <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
              You are an expert. Review this code for issues.
            </p>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">
              "Expert" at what? The model has no guidance on which domain knowledge to apply. Output is generic and shallow.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Fix
            </p>
            <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
              You are a principal security engineer specializing in OWASP vulnerability assessment and secure code review for Node.js applications.
            </p>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">
              The model activates security-specific training, producing analysis that references OWASP categories, identifies specific vulnerability patterns, and provides remediation steps.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Mistake 3: Overly Broad Tasks</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          When a task describes multiple deliverables or an open-ended objective, the model cannot produce focused, complete output. It either produces a shallow overview of each component or focuses on one component and ignores the rest. Either way, the output is not useful. The fix is decomposition: break the broad task into focused sub-tasks, each with its own spec.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
              Mistake
            </p>
            <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
              Build a complete e-commerce platform with user management, product catalog, shopping cart, checkout, payment processing, and admin dashboard.
            </p>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">
              This is a product roadmap, not a task. The model will produce a shallow overview or focus on one component.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Fix
            </p>
            <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
              Implement a product catalog API with paginated listing (GET /products), product detail (GET /products/:id), category filtering, and full-text search. [Write separate specs for user management, cart, checkout, etc.]
            </p>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">
              Each spec produces a complete, focused output for one component. The outputs integrate cleanly because they share consistent architectural conventions.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Mistake 4: Under-Specified Constraints</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Engineers often assume that the model will "figure out" the technology, the framework, or the coding standard because it is the obvious choice. But the model has no concept of "obvious." Without explicit constraints, it draws from its full training distribution, which includes outdated technologies, anti-patterns, and conventions that do not match your project.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
              Mistake
            </p>
            <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
              Use modern JavaScript best practices.
            </p>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">
              "Modern" is ambiguous. Does it mean ES6? ES2022? TypeScript? Does "best practices" mean functional programming? OOP? The model will guess.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Fix
            </p>
            <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
              Use TypeScript 5.x with strict mode. Use async/await exclusively. Follow the Google TypeScript Style Guide. Use named exports only. Include JSDoc comments for all public functions.
            </p>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">
              Every dimension is specified. No guessing required. The output matches your project's conventions.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Mistake 5: Mixing Components</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          When role, task, constraints, and output format are blended into a single paragraph without clear separation, both the model and the human reader struggle to parse the spec. The model may miss critical instructions, and the human cannot easily identify which components are present and which are missing.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
              Mistake
            </p>
            <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
              You're a developer who should build a login page with React and Tailwind that has email and password fields, make sure it's responsive and accessible, and return the code please.
            </p>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">
              All four components are present but blended. Hard to verify completeness. "Please" is conversational noise.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Fix
            </p>
            <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
              You are a senior React developer specializing in accessible UI components.
              {"\n\n"}
              Create a login page with email and password fields, form validation, and a "forgot password" link.
              {"\n\n"}
              Use React 18, Tailwind CSS, and React Hook Form. Ensure WCAG 2.1 AA compliance and responsive design.
              {"\n\n"}
              Return only the TSX file. No explanation.
            </p>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">
              Four clearly separated components. Each is independently verifiable. No conversational noise.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Mistake 6: Not Iterating on Specs</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Many engineers write a spec once, get suboptimal output, and conclude that "specs don't work." The reality is that spec engineering is an iterative discipline. Your first spec is a hypothesis. The output is the test result. If the output is not what you want, you refine the spec—adding constraints, clarifying the task, or adjusting the output format—and try again. Most specs require 3-5 iterations to reach production quality.
        </p>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            The Iteration Process
          </p>
          <div className="space-y-3">
            {[
              { step: "Iteration 1", action: "Write a minimal spec (role + task + format). Run it. Examine the output for gaps.", result: "Output is 40% usable. Missing error handling, wrong data format." },
              { step: "Iteration 2", action: "Add constraints for the missing pieces: error handling pattern, data format specification.", result: "Output is 70% usable. Correct format and error handling, but wrong library version." },
              { step: "Iteration 3", action: "Add version constraint and negative constraints (no deprecated APIs).", result: "Output is 90% usable. Minor style issues only." },
              { step: "Iteration 4", action: "Add style constraints (naming convention, export format).", result: "Output is 100% usable. Production-ready on first generation." },
            ].map((item) => (
              <div key={item.step} className="rounded-md bg-[var(--surface-overlay)] p-3">
                <p className="text-xs font-medium text-[var(--accent)]">
                  {item.step}
                </p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {item.action}
                </p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                  Result: {item.result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Mistake 7: Writing Model-Specific Specs</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Some engineers write specs that are optimized for a specific model (e.g., GPT-4) and assume the spec will work identically on other models. This is a dangerous assumption. Different models have different strengths, weaknesses, and behavioral quirks. A spec that works perfectly on GPT-4 may produce inferior output on Claude or Llama.
        </p>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            How to Write Model-Agnostic Specs
          </p>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p><span className="font-medium text-[var(--accent)]">Test across models:</span> Run your spec on at least 2-3 different models. If the output quality varies significantly, your spec is over-reliant on a specific model's training.</p>
            <p><span className="font-medium text-[var(--accent)]">Avoid model-specific patterns:</span> Do not use phrases like "as an AI assistant" or "you are trained on"—these activate model-specific behaviors that do not transfer.</p>
            <p><span className="font-medium text-[var(--accent)]">Focus on structure, not personality:</span> Well-structured specs (clear role, task, constraints, format) work across models because they rely on universal LLM processing patterns, not model-specific quirks.</p>
            <p><span className="font-medium text-[var(--accent)]">Document model performance:</span> Track which models produce the best output for each spec category. This information is valuable when selecting the target model for production.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Mistake 8: Ignoring Negative Constraints</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Negative constraints—specifying what the model must NOT do—are the most underutilized tool in spec engineering. LLMs have strong behavioral biases (adding explanations, using markdown formatting, including TODO comments, using console.log) that are often undesirable in production contexts. Without negative constraints, these biases manifest in the output.
        </p>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Essential Negative Constraints
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              '"No explanation"',
              '"No markdown fencing"',
              '"No introductory text"',
              '"No concluding remarks"',
              '"No placeholder comments (// TODO, // implement this)"',
              '"No console.log or console.error"',
              '"No external dependencies beyond those specified"',
              '"No deprecated APIs"',
            ].map((constraint, i) => (
              <div
                key={i}
                className="rounded-md bg-[var(--surface-overlay)] p-2 font-mono text-xs text-[var(--accent-text)]"
              >
                {constraint}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Summary: The Spec Engineering Checklist</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Before running any spec, verify it against this checklist. Each item addresses one of the common mistakes described above.
        </p>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="space-y-3">
            {[
              "Does the spec have all four components (Role, Task, Constraints, Output Format) clearly separated?",
              "Is the role specific about both expertise level and domain?",
              "Does the task describe a single, concrete deliverable with active verbs?",
              "Are constraints specific and measurable? Do they cover technology, architecture, security, and style?",
              "Does the output format specify the exact structure and suppress conversational text?",
              "Are negative constraints included to suppress unwanted model behaviors?",
              "Has the spec been tested across multiple runs to verify consistency?",
              "Has the spec been tested across multiple models to verify portability?",
              "Is the spec stored in version control with documentation of its purpose and iterations?",
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </TopicLayout>
  );
}
