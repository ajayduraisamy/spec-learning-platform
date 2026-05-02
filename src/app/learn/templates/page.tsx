import TopicLayout from "@/components/TopicLayout";

export default function TemplatesPage() {
  return (
    <TopicLayout
      section="Foundations"
      lessonNumber="Lesson 8 of 10"
      title="Templates"
      currentHref="/learn/templates"
    >
      <section>
        <h2 className="text-xl font-semibold">The Power of Reusable Spec Templates</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Templates are the force multiplier of spec engineering. A template is a spec where concrete values are replaced with variable placeholders enclosed in curly braces. When you define a template and populate its variables with arrays of possible values, a single template can generate hundreds or thousands of unique, consistent specs through combinatorial substitution. This is how teams scale spec engineering from individual experimentation to production-grade systems.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Consider a team that needs to generate API specifications for 200 database tables. Writing 200 individual specs would take days and produce inconsistent output. Writing one template—{"\"You are a {role}. Design a RESTful API for a {resource} table with {operations} operations. Use {tech}. Return OpenAPI 3.0 YAML.\""}—and populating it with arrays of roles, resources, operations, and technologies produces 200 specs in seconds, all following the same structure and quality bar.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The template approach transforms spec writing from a manual, one-off activity into a systematic, repeatable process. Instead of asking "how do I write a spec for this task?" the question becomes "which template applies to this task, and what variable values should I use?" This shift in perspective is what separates ad-hoc prompting from engineered systems.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Templates also enable quality improvement at scale. When you discover that a particular constraint produces better output, you update the template—not 200 individual specs. When you add a new technology to your stack, you add it to the variable array—not to every spec that uses that technology. The template becomes a single point of truth for an entire family of related specs.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">The Template Formula</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Every template follows the same formula: a spec string with variable placeholders mapped to arrays of possible values. The combinatorial engine computes the Cartesian product of all variable arrays and substitutes each combination into the template, producing one spec per combination.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Template Definition
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Template string"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                {"\"You are a "}
                <span className="rounded bg-[var(--accent)]/20 px-1">{"{role}"}</span>
                {". "}
                <span className="rounded bg-[var(--accent)]/20 px-1">{"{task}"}</span>
                {" using "}
                <span className="rounded bg-[var(--accent)]/20 px-1">{"{tech}"}</span>
                {". Return output in "}
                <span className="rounded bg-[var(--accent)]/20 px-1">{"{format}"}</span>
                {". No explanation.\""}
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Variable arrays"}
              </span>
              <br />
              <span className="text-[var(--accent)]">{"\"role\""}</span>
              <span className="text-[var(--text-tertiary)]">: [</span>
              <br />
              <span className="text-[var(--text-secondary)] ml-4">{"\"Senior Backend Engineer\","}</span>
              <br />
              <span className="text-[var(--text-secondary)] ml-4">{"\"API Architect\","}</span>
              <br />
              <span className="text-[var(--text-secondary)] ml-4">{"\"Microservices Specialist\","}</span>
              <br />
              <span className="text-[var(--text-secondary)] ml-4">{"\"Platform Engineer\","}</span>
              <br />
              <span className="text-[var(--text-secondary)] ml-4">{"\"Systems Integration Expert\""}</span>
              <br />
              <span className="text-[var(--text-tertiary)]">]</span>
              <br />
              <br />
              <span className="text-[var(--accent)]">{"\"task\""}</span>
              <span className="text-[var(--text-tertiary)]">: [</span>
              <br />
              <span className="text-[var(--text-secondary)] ml-4">{"\"Design a RESTful API for user authentication\","}</span>
              <br />
              <span className="text-[var(--text-secondary)] ml-4">{"\"Design a RESTful API for product catalog management\","}</span>
              <br />
              <span className="text-[var(--text-secondary)] ml-4">{"\"Design a RESTful API for order processing\","}</span>
              <br />
              <span className="text-[var(--text-secondary)] ml-4">{"\"Design a RESTful API for payment processing\","}</span>
              <br />
              <span className="text-[var(--text-secondary)] ml-4">{"\"Design a RESTful API for notification delivery\""}</span>
              <br />
              <span className="text-[var(--text-tertiary)]">]</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Result: 5 roles x 5 tasks = 25 unique specs from one template"}
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          With 5 roles, 5 tasks, 5 technologies, and 4 output formats, this single template generates 5 x 5 x 5 x 4 = 500 unique specs. Each spec is complete, consistent, and follows the same structural pattern. The time investment is writing one template versus writing 500 individual specs.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Production Templates by Domain</h2>

        <div className="mt-4 space-y-6">
          {[
            {
              name: "API Development Template",
              template:
                "You are a {role}. Design a RESTful API for {resource} with {operations} operations. Use {tech}. Include {features}. Return output in {format}. No explanation.",
              variables: {
                role: ["Senior Backend Engineer", "API Architect", "Microservices Specialist", "Platform Engineer"],
                resource: ["user authentication", "product catalog", "order management", "payment processing", "notification delivery"],
                operations: ["CRUD", "search and filter", "batch operations", "CRUD and webhook"],
                tech: ["Node.js and Express", "Python FastAPI", "Go with Gin", "Java Spring Boot"],
                features: ["pagination, rate limiting, and input validation", "authentication, authorization, and audit logging", "caching, retry logic, and circuit breakers"],
                format: ["OpenAPI 3.0 YAML", "complete router code with tests", "API contract with example requests/responses"],
              },
            },
            {
              name: "Code Review Template",
              template:
                "You are a {role}. Review the provided code for {criteria}. Focus on {focusArea}. Return your analysis in {format}.",
              variables: {
                role: ["Principal Engineer", "Security Auditor", "Performance Expert", "Accessibility Specialist"],
                criteria: ["security vulnerabilities", "performance issues", "code smells and anti-patterns", "accessibility compliance"],
                focusArea: ["OWASP Top 10 vulnerabilities", "N+1 queries and memory leaks", "SOLID principle violations", "WCAG 2.1 AA compliance"],
                format: ["JSON with severity ratings and line references", "Markdown report with findings ranked by severity", "Annotated code with inline comments"],
              },
            },
            {
              name: "Database Migration Template",
              template:
                "You are a {role}. Write a {dbEngine} migration that {operation}. Use {tool}. Include {requirements}. Return only the migration code.",
              variables: {
                role: ["Database Engineer", "Backend Engineer", "Data Architect"],
                dbEngine: ["PostgreSQL", "MySQL 8.0", "SQLite"],
                operation: ["adds a {table} table with {columns}", "modifies the {table} table to {change}", "creates an index on {table} for {columns}"],
                tool: ["Knex.js", "Prisma Migrate", "Flyway", "Alembic"],
                requirements: ["up and down functions, foreign key constraints, and indexes", "seed data, constraints, and triggers"],
              },
            },
          ].map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
            >
              <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {t.name}
                </h3>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                  Template
                </p>
                <code className="block rounded-md bg-[var(--surface-overlay)] p-3 text-sm font-mono text-[var(--accent-text)]">
                  {t.template}
                </code>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mt-4 mb-2">
                  Variables
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {Object.entries(t.variables).map(([key, values]) => (
                    <div
                      key={key}
                      className="rounded-md bg-[var(--surface-overlay)] p-3"
                    >
                      <span className="text-xs font-medium text-[var(--accent)]">
                        {"{"}
                        {key}
                        {"}"}
                      </span>
                      <p className="mt-1 text-xs text-[var(--text-secondary)]">
                        {(values as string[]).join(" / ")}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-md bg-[var(--accent-dim)] p-3">
                  <p className="text-xs font-medium text-[var(--accent)]">
                    Generated Specs: {
                      Object.values(t.variables).reduce(
                        (acc, arr) => acc * (arr as string[]).length,
                        1
                      )
                    }
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Generated Spec Example</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Here is what happens when you substitute specific variable values into the API Development Template:
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Generated Spec — Order Processing API
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Variables: role=API Architect, resource=order management, operations=CRUD and webhook, tech=Python FastAPI, features=authentication + audit logging, format=OpenAPI 3.0 YAML"}
              </span>
              <br />
              <br />
              <span className="text-[var(--accent-text)]">You are an API Architect.</span>
              {"\n"}
              <span className="text-[var(--accent-text)]">Design a RESTful API for order management with CRUD and webhook operations.</span>
              {"\n"}
              <span className="text-[var(--accent-text)]">Use Python FastAPI.</span>
              {"\n"}
              <span className="text-[var(--accent-text)]">Include authentication, authorization, and audit logging.</span>
              {"\n"}
              <span className="text-[var(--accent-text)]">Return output in OpenAPI 3.0 YAML.</span>
              {"\n"}
              <span className="text-[var(--accent-text)]">No explanation.</span>
            </code>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Output Explanation
          </p>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            The generated spec produces an OpenAPI 3.0 YAML specification for an order management API built with FastAPI. The output includes all CRUD endpoints (GET, POST, PUT, DELETE for orders), webhook endpoints for order status notifications, authentication middleware, authorization rules (users can only access their own orders), and audit logging configuration. The YAML output is immediately usable as an API specification document and can be fed into code generators, documentation tools, or API testing frameworks.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Template Best Practices</h2>
        <div className="mt-4 space-y-3">
          {[
            "Keep variable names descriptive and lowercase: {tech}, not {Technology}. Consistent naming makes templates easier to read and maintain.",
            "Use 4+ values per variable to maximize combinatorial output. With 4 variables and 4 values each, you get 256 specs from one template.",
            "Ensure variable values are compatible. Do not mix incompatible technology stacks (e.g., React Native in a backend API template). Validate combinations before generating.",
            "Test a few generated specs manually before scaling to thousands. Run 5-10 substitutions and verify the output quality. Fix any template issues before full generation.",
            "Document each template's intended use case, scope, and known limitations. Templates are code—they need documentation.",
            "Version your templates. When you update a template, track what changed and why. Use semantic versioning (v1.0.0, v1.1.0, v2.0.0).",
            "Store templates alongside the specs they generate. This makes it easy to trace a spec back to its template and update the template when needed.",
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
        <h2 className="text-xl font-semibold">Real-World Usage: Template-Driven Development</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A mid-stage SaaS company uses a library of 15 templates covering their most common development tasks: API endpoints, database migrations, React components, test suites, deployment scripts, monitoring configurations, and documentation. Each template has 4-6 variables with 4-8 values each, generating 256-15,000 specs per template. The engineering team uses these templates daily—selecting a template, specifying variable values, generating the spec, and running it against the target LLM. New templates are added when a new type of task emerges (e.g., "we need specs for GraphQL resolvers"). Existing templates are updated when output quality improves (e.g., "adding rate limiting to all API templates"). The template library is version-controlled in Git, reviewed through pull requests, and treated as a core engineering asset. The result is a development process where spec writing is no longer a bottleneck—it is a configuration step that takes seconds instead of hours.
        </p>
      </section>
    </TopicLayout>
  );
}
