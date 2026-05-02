import TopicLayout from "@/components/TopicLayout";

export default function TasksPage() {
  return (
    <TopicLayout
      section="Foundations"
      lessonNumber="Lesson 5 of 10"
      title="Tasks"
      currentHref="/learn/tasks"
    >
      <section>
        <h2 className="text-xl font-semibold">The Task Component: Defining the Deliverable</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The task component is the heart of every spec. It is the single most important sentence because it defines what you actually want the model to produce. Every other component—role, constraints, output format—exists to support and refine the task. If the task is poorly defined, no amount of role specificity or constraint detail can rescue the output.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A well-crafted task has three properties: it is specific, it is actionable, and it is scoped. Specificity means the task describes a concrete deliverable rather than a vague direction. Actionability means the model can understand what steps to take to complete the task. Scope means the task has boundaries—it describes what is included and, by implication, what is not.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The most common task error is scope creep disguised as comprehensiveness. When you write "Build a complete e-commerce platform with user management, product catalog, shopping cart, checkout, payment processing, order tracking, and admin dashboard," you have not written a task—you have written a product requirements document. The model will either produce a shallow overview of each component (because the scope is too large for a single response) or it will focus on one component and ignore the rest. Either way, the output is not useful.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The correct approach is to decompose large tasks into focused sub-tasks, each with its own spec. "Build a product catalog API with CRUD endpoints, pagination, and search" is a proper task because it has a clear boundary (product catalog API), a specific deliverable (CRUD endpoints with pagination and search), and a scope that fits within a single LLM response. The checkout system gets its own spec. The admin dashboard gets its own spec. Each spec produces a complete, focused output that can be integrated with the others.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Task Construction Principles</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Effective tasks follow a consistent pattern: they begin with an active verb, describe the deliverable, and include the key features or requirements that define completeness. The active verb establishes the action. The deliverable defines the output artifact. The features define what "done" looks like.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Task Construction Pattern
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">{"// Pattern: [Active Verb] + [Deliverable] + [Key Features]"}</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Active Verb: Build, Design, Implement, Create, Write, Generate, Analyze, Review"}</span>
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Deliverable: endpoint, component, script, report, schema, pipeline"}</span>
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Key Features: with X, supporting Y, including Z"}</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Example 1"}</span>
              <br />
              <span className="text-[var(--accent-text)]">Implement a paginated GET endpoint that returns user profiles with their associated subscription status, supporting filtering by plan type and sorting by signup date.</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Example 2"}</span>
              <br />
              <span className="text-[var(--accent-text)]">Create a responsive data table component with column sorting, row selection, pagination, and server-side data fetching with loading and error states.</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Example 3"}</span>
              <br />
              <span className="text-[var(--accent-text)]">Write a PostgreSQL migration that adds audit logging to the orders table using a trigger function that captures INSERT, UPDATE, and DELETE operations with before/after values.</span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          Each of these examples follows the same pattern. The active verb (Implement, Create, Write) establishes the action. The deliverable (paginated GET endpoint, responsive data table component, PostgreSQL migration) defines the output artifact. The key features (with filtering and sorting, with column sorting and row selection, that captures CRUD operations) define what completeness looks like. The result is a task that is immediately understandable, unambiguous, and testable.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Task Decomposition Strategy</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          When faced with a large task, the correct approach is decomposition—breaking it into smaller, focused sub-tasks that can each be handled by a single spec. This is analogous to breaking a large function into smaller, single-responsibility functions. Each sub-task should be independently completable, meaning its output is useful even if the other sub-tasks have not yet been completed.
        </p>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Example: Decomposing "Build an E-Commerce API"
          </p>
          <div className="space-y-3">
            {[
              {
                task: "Task 1: User Management API",
                detail: "Implement CRUD endpoints for user registration, login, profile management, and password reset with JWT authentication and email verification.",
              },
              {
                task: "Task 2: Product Catalog API",
                detail: "Build paginated product listing with category filtering, full-text search, and individual product detail endpoints with image URL handling.",
              },
              {
                task: "Task 3: Shopping Cart API",
                detail: "Create cart management endpoints for add/remove/update items, with persistent cart storage tied to user sessions and quantity validation against inventory.",
              },
              {
                task: "Task 4: Checkout & Orders API",
                detail: "Implement checkout flow with cart validation, order creation, payment processing integration, and order status tracking with webhook support.",
              },
              {
                task: "Task 5: Admin Dashboard API",
                detail: "Build admin endpoints for product management, order management, user management, and sales analytics with role-based access control.",
              },
            ].map((item) => (
              <div
                key={item.task}
                className="rounded-md bg-[var(--surface-overlay)] p-3"
              >
                <p className="text-xs font-medium text-[var(--accent)]">
                  {item.task}
                </p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          Each of these five tasks can be written as a complete spec that produces a focused, high-quality output. The outputs are designed to integrate with each other—they share the same authentication model, the same data patterns, and the same architectural conventions. But each task is independently completable and testable, which means you can work on them in any order and validate each one before moving to the next.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Good vs. Bad Task Examples</h2>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example 1: API Endpoint
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Task
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Create some API endpoints for users"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Which endpoints? What operations? What data? No verb, no deliverable, no features.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Task
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Implement a RESTful user management API with endpoints for registration (POST /users), login (POST /auth/login), profile retrieval (GET /users/:id), and profile update (PUT /users/:id) with email validation.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Specific endpoints, HTTP methods, and validation requirement.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example 2: Data Analysis
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Task
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Analyze this data"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  What data? What analysis? What output? This is not a task—it's a gesture.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Task
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Analyze the provided CSV dataset of 10,000 customer transactions to identify purchasing patterns by demographic segment, calculate customer lifetime value, and flag accounts at risk of churn based on 90-day inactivity.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Specific dataset, three concrete analyses, defined churn criteria.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example 3: Testing
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Task
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Write tests for this code"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Which tests? Unit or integration? What coverage? What framework?
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Task
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Write unit tests for the UserService class covering: successful registration, duplicate email rejection, password validation (min 8 chars, must contain number and special char), and account lockout after 5 failed login attempts. Use Vitest with mocking for the database layer.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Specific test cases, validation rules, failure condition, and test framework.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Action Verbs for Effective Tasks</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The verb you choose for your task sets the model's operational mode. Different verbs trigger different reasoning patterns and output structures. Here is a mapping of common task verbs to the type of output they produce.
        </p>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { verb: "Implement", output: "Complete, working code with all necessary imports, error handling, and type definitions" },
              { verb: "Design", output: "Architecture diagrams, interface definitions, and structural decisions without full implementation" },
              { verb: "Analyze", output: "Structured analysis with findings, evidence, and recommendations" },
              { verb: "Review", output: "Critique of existing work with specific issues, severity ratings, and remediation steps" },
              { verb: "Refactor", output: "Improved version of existing code with explanation of changes and rationale" },
              { verb: "Optimize", output: "Performance analysis, bottleneck identification, and optimized code with benchmark comparison" },
              { verb: "Document", output: "Structured documentation with examples, API references, and usage guidelines" },
              { verb: "Generate", output: "Data, code, or content produced according to specified parameters and format" },
            ].map((item) => (
              <div key={item.verb} className="rounded-md bg-[var(--surface-overlay)] p-3">
                <p className="text-xs font-medium text-[var(--accent)]">
                  {item.verb}
                </p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {item.output}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Writing Effective Tasks</h2>
        <div className="mt-4 space-y-3">
          {[
            "Start with an active verb. 'Implement,' 'Design,' 'Analyze,' 'Review'—the verb sets the model's operational mode and output structure.",
            "Define what 'done' looks like. A good task includes enough detail that you can verify whether the output is complete. If you cannot define completion criteria, the task is too vague.",
            "Keep tasks focused on a single deliverable. If your task describes multiple deliverables, decompose it into separate tasks, each with its own spec.",
            "Include the key features that define the scope. These are the non-negotiable requirements that make the output useful. Omitting them produces generic, incomplete results.",
            "Avoid adverbs and subjective language. 'Quickly implement,' 'carefully design,' 'thoroughly analyze'—these add no signal. Replace them with specific, measurable requirements.",
            "Test task clarity by reading it to a colleague. If they can understand what you want without asking clarifying questions, the task is well-written.",
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
