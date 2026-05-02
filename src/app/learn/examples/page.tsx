import TopicLayout from "@/components/TopicLayout";

export default function ExamplesPage() {
  return (
    <TopicLayout
      section="Foundations"
      lessonNumber="Lesson 9 of 10"
      title="Examples"
      currentHref="/learn/examples"
    >
      <section>
        <h2 className="text-xl font-semibold">Learning from Complete Spec-to-Output Examples</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The most effective way to internalize spec engineering principles is to study complete examples—from spec through output—with detailed explanations of why each component is structured the way it is and how the output reflects those structural choices. This page provides five real-world examples spanning different domains, each demonstrating how a well-constructed spec produces production-ready output.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Each example follows the same pattern: the complete spec (with all four components labeled), the expected output, an explanation of how each spec component influenced the output, and a breakdown of what would have gone wrong with a weaker spec. Study these examples carefully—they represent the gold standard of spec engineering practice.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The examples are ordered by complexity, starting with a straightforward code generation task and progressing to a multi-constraint system design task. By the time you reach the final example, you will see how all the principles from this course—role priming, task precision, constraint specificity, and output format control—work together in a single, cohesive specification.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 1: REST API Endpoint</h2>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Spec — User Profile Endpoint
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">{"// Role"}</span>
              <br />
              <span className="text-[var(--accent-text)]">You are a senior backend engineer specializing in RESTful API design.</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Task"}</span>
              <br />
              <span className="text-[var(--accent-text)]">Implement a GET /users/:id endpoint that returns a user's profile including their name, email, avatar URL, account creation date, and subscription tier.</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Constraints"}</span>
              <br />
              <span className="text-[var(--accent-text)]">Use Node.js with Express and TypeScript in strict mode. Query the database using Prisma ORM. Return 404 if user not found. Include request validation that ensures :id is a valid UUID. Use async/await with try/catch error handling.</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Output Format"}</span>
              <br />
              <span className="text-[var(--accent-text)]">Return only the TypeScript route handler and its dependencies (types, validation schema). No explanation, no markdown fencing.</span>
            </code>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Expected Output
          </p>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-3">
            The model returns a TypeScript module containing a UUID validation schema (using Zod), a type definition for the user profile response, and an async route handler that validates the ID parameter, queries the database with Prisma, and returns the user profile or a 404 error. The error handler catches Prisma errors and maps them to appropriate HTTP status codes.
          </p>
          <div className="rounded-md bg-[var(--surface-overlay)] p-3 font-mono text-xs text-[var(--accent-text)]">
            {"import { z } from 'zod';\nimport { Request, Response } from 'express';\nimport { prisma } from '../lib/prisma';\n\nconst idSchema = z.object({\n  id: z.string().uuid()\n});\n\nexport async function getUserProfile(req: Request, res: Response) {\n  try {\n    const { id } = idSchema.parse({ id: req.params.id });\n    const user = await prisma.user.findUnique({ where: { id } });\n    if (!user) return res.status(404).json({ error: 'User not found' });\n    res.json({\n      name: user.name,\n      email: user.email,\n      avatarUrl: user.avatarUrl,\n      createdAt: user.createdAt,\n      subscriptionTier: user.subscriptionTier\n    });\n  } catch (error) {\n    if (error instanceof z.ZodError) {\n      return res.status(400).json({ error: 'Invalid user ID' });\n    }\n    res.status(500).json({ error: 'Internal server error' });\n  }\n}"}
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Component Breakdown
          </p>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p><span className="font-medium text-[var(--accent)]">Role:</span> "Senior backend engineer specializing in RESTful API design" primes the model for production-quality API patterns (error handling, validation, proper HTTP status codes).</p>
            <p><span className="font-medium text-[var(--accent)]">Task:</span> Specifies the exact endpoint (GET /users/:id), the exact fields to return, and the response shape. No ambiguity about what the endpoint does.</p>
            <p><span className="font-medium text-[var(--accent)]">Constraints:</span> Specifies Node.js/Express/TypeScript, Prisma ORM, 404 behavior, UUID validation, and async/await pattern. Each constraint eliminates a category of unwanted output.</p>
            <p><span className="font-medium text-[var(--accent)]">Output Format:</span> "Return only the TypeScript route handler and its dependencies" ensures clean, parseable output. "No explanation, no markdown fencing" eliminates conversational wrapper.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 2: React Component</h2>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Spec — Dashboard Metrics Card
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">{"// Role"}</span>
              <br />
              <span className="text-[var(--accent-text)]">You are a senior React developer specializing in accessible, responsive dashboard components.</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Task"}</span>
              <br />
              <span className="text-[var(--accent-text)]">Create a metrics card component that displays a KPI value, its label, a trend indicator (up/down arrow with percentage), and a sparkline chart showing the last 7 days of data.</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Constraints"}</span>
              <br />
              <span className="text-[var(--accent-text)]">{"Use TypeScript with Tailwind CSS. Accept a MetricData interface as props (value: number, label: string, trend: { direction: 'up' | 'down', percentage: number }, sparklineData: number[]). Use lucide-react for trend arrows. Implement aria-label for screen readers. Support dark mode via Tailwind's dark: variant."}</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Output Format"}</span>
              <br />
              <span className="text-[var(--accent-text)]">Return only the TSX component file with the MetricData interface, the component function, and the default export. Include PropTypes as JSDoc comments. No explanation.</span>
            </code>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Expected Output
          </p>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            The model returns a single TSX file containing the MetricData interface, the MetricsCard component with Tailwind styling (responsive, dark mode support), lucide-react trend arrows colored green/red based on direction, an inline SVG sparkline rendered from the sparklineData array, and proper aria-label attributes for accessibility. The component is production-ready—importable, testable, and accessible.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 3: Database Schema</h2>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Spec — E-Commerce Database Schema
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">{"// Role"}</span>
              <br />
              <span className="text-[var(--accent-text)]">You are a database architect specializing in e-commerce data models.</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Task"}</span>
              <br />
              <span className="text-[var(--accent-text)]">Design a PostgreSQL database schema for an e-commerce platform supporting users, products, product variants, orders, order items, and reviews.</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Constraints"}</span>
              <br />
              <span className="text-[var(--accent-text)]">{"Use UUIDs for all primary keys. Include created_at and updated_at timestamps on every table. Add foreign key constraints with ON DELETE CASCADE for order items and ON DELETE SET NULL for reviews (when a user is deleted). Index all foreign key columns. Use CHECK constraints for: product price > 0, order status in ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'), and review rating between 1 and 5."}</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Output Format"}</span>
              <br />
              <span className="text-[var(--accent-text)]">Return only the SQL CREATE TABLE statements in order of dependency (tables with no foreign keys first). Include all constraints, indexes, and comments. No explanation.</span>
            </code>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Expected Output
          </p>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            The model returns SQL CREATE TABLE statements in dependency order: users, products, product_variants, orders, order_items, reviews. Each table has a UUID primary key, created_at/updated_at timestamps, appropriate data types, foreign key constraints with the specified ON DELETE behavior, indexes on all foreign keys, and CHECK constraints for business rules. The output is immediately executable against a PostgreSQL database.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 4: Security Analysis</h2>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Spec — Authentication Code Review
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">{"// Role"}</span>
              <br />
              <span className="text-[var(--accent-text)]">You are a senior security engineer specializing in application security and OWASP vulnerability assessment.</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Task"}</span>
              <br />
              <span className="text-[var(--accent-text)]">Analyze the provided authentication code for security vulnerabilities, OWASP Top 10 compliance, and secure coding best practices.</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Constraints"}</span>
              <br />
              <span className="text-[var(--accent-text)]">Check for: SQL injection, XSS, CSRF, weak password hashing, session fixation, brute force susceptibility, and insecure token handling. Map each finding to the corresponding OWASP 2021 category. Rate severity as Critical, High, Medium, or Low.</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Output Format"}</span>
              <br />
              <span className="text-[var(--accent-text)]">Return JSON with this schema: {"{"} "findings": [{"{"} "severity": string, "owasp_category": string, "vulnerability": string, "line": number, "description": string, "remediation": string {"}"}] {"}"}. No explanation.</span>
            </code>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Expected Output
          </p>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            The model returns a JSON array of findings, each with severity rating, OWASP category mapping, vulnerability type, line reference, description, and specific remediation steps. The output can be parsed automatically and fed into a code review dashboard. Each finding is actionable—engineers can go directly to the specified line and apply the recommended fix.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 5: Deployment Pipeline</h2>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Spec — CI/CD Pipeline Configuration
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">{"// Role"}</span>
              <br />
              <span className="text-[var(--accent-text)]">You are a senior DevOps engineer specializing in CI/CD pipeline design and infrastructure automation.</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Task"}</span>
              <br />
              <span className="text-[var(--accent-text)]">Create a GitHub Actions CI/CD pipeline for a Next.js application that runs on Vercel.</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Constraints"}</span>
              <br />
              <span className="text-[var(--accent-text)]">The pipeline must: (1) run on push to main and pull requests, (2) install dependencies with npm ci, (3) run ESLint and TypeScript type checking, (4) run unit tests with Vitest, (5) build the application, (6) run Lighthouse performance audit with a minimum score of 90 for Performance, Accessibility, and SEO, (7) deploy to Vercel preview for PRs and production for main branch. Use matrix strategy to run tests on Node.js 18 and 20. Cache node_modules between runs.</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Output Format"}</span>
              <br />
              <span className="text-[var(--accent-text)]">Return only the .github/workflows/ci.yml file in valid YAML. Include comments explaining each step. No explanation outside the YAML file.</span>
            </code>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Expected Output
          </p>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            The model returns a complete GitHub Actions workflow YAML file with properly configured triggers, job definitions, matrix strategy for Node.js versions, dependency caching, lint/type-check/test/build steps, Lighthouse audit configuration with score thresholds, and conditional deployment steps (Vercel preview for PRs, production for main). The file is immediately usable—commit it to .github/workflows/ and the pipeline is active.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Key Patterns Across All Examples</h2>
        <div className="mt-4 space-y-3">
          {[
            "Every spec follows the four-component structure (Role, Task, Constraints, Output Format) in the same order. This consistency is not accidental—it is the foundation of predictable output.",
            "Every constraint is specific and measurable. No constraint says 'use good practices' or 'follow standards.' Each constraint names a specific technology, pattern, or requirement.",
            "Every output format instruction suppresses conversational text. 'No explanation' appears in every example because it is the single most impactful phrase for ensuring clean output.",
            "Every role specifies both expertise level and domain. 'Senior backend engineer specializing in RESTful API design' is the pattern—not 'engineer' or 'expert.'",
            "Every task describes a concrete deliverable with specific features. No task is vague or open-ended. Each task can be evaluated for completeness.",
          ].map((pattern, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {pattern}
              </p>
            </div>
          ))}
        </div>
      </section>
    </TopicLayout>
  );
}
