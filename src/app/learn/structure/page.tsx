import TopicLayout from "@/components/TopicLayout";

export default function StructurePage() {
  return (
    <TopicLayout
      section="Foundations"
      lessonNumber="Lesson 3 of 10"
      title="Structure"
      currentHref="/learn/structure"
    >
      <section>
        <h2 className="text-xl font-semibold">The Architecture of a Well-Structured Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The structure of a spec is not merely a formatting preference—it is the architectural foundation that determines whether your specification produces useful output or garbage. Every well-structured spec follows the same four-component sequence: Role, Task, Constraints, and Output Format. This sequence is deliberate. It mirrors the cognitive process of task execution: first you establish who is doing the work, then you define what work needs to be done, then you establish the rules within which the work must be performed, and finally you specify how the completed work should be presented.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Deviating from this structure is one of the most common mistakes in spec engineering. When you mix components—for example, embedding constraints inside the task statement or placing the role after the output format—you create cognitive friction that degrades the model's ability to process and act on your instructions. The model does not "understand" structure in the human sense, but it has been trained on millions of documents that follow conventional organizational patterns. Specs that follow these patterns are processed more effectively because they align with the model's learned expectations.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The physical structure also matters. Each component should be visually distinct, separated by blank lines or section headers. This is not for the model's benefit—it is for yours. When you can visually parse your spec into its four components at a glance, you can more easily identify missing or under-specified components. A spec that reads as a wall of text is a spec that has not been properly structured, regardless of its content quality.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Think of spec structure like function signatures in programming. A well-designed function signature tells you everything you need to know about the function's purpose and behavior: its name (task), its parameters (constraints), its return type (output format), and the module it belongs to (role). When you see a function signature like <code className="font-mono text-[var(--accent-text)]">public User createUser(String email, String password) throws ValidationException</code>, you understand the function's contract immediately. A well-structured spec provides the same clarity for LLM interactions.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Component 1: Role</h2>
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-dim)] text-sm font-bold text-[var(--accent)]">
            1
          </span>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            The role establishes the model's perspective, expertise level, and domain knowledge. It is the first component because it primes the model's context window with the appropriate behavioral patterns before any task-specific instructions are processed.
          </p>
        </div>

        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The role component works through a mechanism that researchers call "persona priming." When you tell the model "You are a senior security engineer," you activate the portions of its training data that relate to security engineering—vulnerability analysis, threat modeling, secure coding patterns, OWASP guidelines, and cryptographic best practices. The model then generates output that reflects this activated knowledge space, producing analysis that is deeper and more accurate than it would be without the role specification.
        </p>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Effective Role Patterns
          </p>
          <div className="space-y-2">
            {[
              '"You are a senior backend engineer with expertise in distributed systems and event-driven architecture."',
              '"You are a security auditor specializing in OWASP Top 10 vulnerabilities and penetration testing."',
              '"You are a database performance tuning expert with deep knowledge of PostgreSQL query optimization and index strategies."',
              '"You are a UX designer and front-end engineer who specializes in accessible, responsive web applications."',
            ].map((role, i) => (
              <div
                key={i}
                className="rounded-md bg-[var(--surface-overlay)] p-3 font-mono text-sm text-[var(--accent-text)]"
              >
                {role}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          Notice that effective roles are specific about both the domain and the expertise level. "You are an engineer" is too broad—it activates general engineering knowledge without focusing on any particular area. "You are a senior backend engineer with expertise in distributed systems" is precise—it activates a narrow, deep knowledge space that produces significantly more relevant output for distributed systems tasks.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Component 2: Task</h2>
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-dim)] text-sm font-bold text-[var(--accent)]">
            2
          </span>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            The task defines what needs to be accomplished. It should be specific, actionable, and scoped appropriately. The best tasks use active verbs and describe a concrete deliverable that can be evaluated for completeness.
          </p>
        </div>

        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The task component is where most spec writers fail—not because they lack technical knowledge, but because they fail to articulate their requirements with sufficient precision. A task like "build an API" is not a task—it is a category. A task like "implement a paginated GET endpoint that returns user profiles with their associated subscription status, supporting filtering by plan type and sorting by signup date" is a real task because it describes a specific, testable deliverable.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
              Vague Task
            </p>
            <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
              "Help me with authentication"
            </p>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">
              No scope, no deliverable, no success criteria. The model will produce generic advice.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Specific Task
            </p>
            <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
              "Implement a JWT-based authentication system with access/refresh token rotation, account lockout after 5 failed attempts, and password reset via email token"
            </p>
            <p className="mt-3 text-xs text-[var(--text-tertiary)]">
              Clear scope, specific features, measurable requirements. The model produces implementation-ready output.
            </p>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          The difference between these two tasks is the difference between asking a contractor to "work on my house" and asking them to "replace the roof with architectural shingles, install new flashing around the chimney, and ensure proper attic ventilation." One produces a conversation; the other produces a quote, a timeline, and a finished roof.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Component 3: Constraints</h2>
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-dim)] text-sm font-bold text-[var(--accent)]">
            3
          </span>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            Constraints bound the solution space by specifying the technology stack, architectural patterns, performance requirements, coding standards, and any rules the model must follow. They prevent the LLM from choosing suboptimal or unexpected approaches.
          </p>
        </div>

        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Constraints are the most powerful tool you have for controlling LLM output quality. Without constraints, the model defaults to its training distribution, which is a statistical average of everything it has seen. With constraints, you override that default and force the model into a specific region of its capability space. This is why two specs with identical roles and tasks but different constraints can produce outputs that differ dramatically in quality and usefulness.
        </p>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Constraint Categories with Real Examples
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Technology", example: "Use TypeScript 5.x with strict mode enabled and the ts-standard linter configuration" },
              { label: "Architecture", example: "Follow the repository pattern with dependency injection. Service layer handles business logic, repository layer handles data access" },
              { label: "Performance", example: "All database queries must use indexes. Response time must be under 100ms for the 95th percentile. No N+1 queries" },
              { label: "Security", example: "All user input must be validated with Zod before processing. Use parameterized queries. Never log sensitive data" },
              { label: "Style", example: "Follow the Google TypeScript Style Guide. Use arrow functions for all callbacks. Prefer const over let. No default exports" },
              { label: "Testing", example: "Include unit tests using Vitest with 90%+ code coverage. Test happy path, edge cases, and error conditions" },
            ].map((item) => (
              <div key={item.label} className="rounded-md bg-[var(--surface-overlay)] p-3">
                <p className="text-xs font-medium text-[var(--accent)]">
                  {item.label}
                </p>
                <p className="mt-1 text-xs font-mono text-[var(--text-secondary)]">
                  {item.example}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          The key to effective constraints is specificity without over-constraint. "Use TypeScript" is a valid constraint but too broad to be useful. "Use TypeScript 5.x with strict mode enabled" is specific enough to eliminate ambiguity without being so narrow that it constrains the model's ability to solve the problem effectively.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Component 4: Output Format</h2>
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-dim)] text-sm font-bold text-[var(--accent)]">
            4
          </span>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            The output format specifies exactly how the response should be structured. This is critical for programmatic consumption and ensures the output can be parsed, validated, and integrated into automated workflows.
          </p>
        </div>

        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The output format component is the most commonly neglected and most commonly impactful. When you omit it, the model defaults to its conversational training, which means it will add introductions, explanations, caveats, and summaries that render the output unusable for automated processing. When you include it, you transform the model from a chatbot into a code generation engine, a data transformation pipeline, or a document generator.
        </p>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Output Format Patterns
          </p>
          <div className="space-y-2">
            {[
              '"Return only the TypeScript code in a single file. Include type definitions, JSDoc comments, and error handling. No explanation, no markdown fencing."',
              '"Return JSON with this schema: { endpoints: Array<{ method: string, path: string, handler: string, auth: boolean }> }. No additional fields."',
              '"Return a step-by-step numbered list. Each step should include a command and a brief explanation of what it does. Format each step as: 1. `command` — explanation."',
              '"Return YAML with comments for each section. Use the OpenAPI 3.0 specification format. Include all response codes and their schemas."',
            ].map((format, i) => (
              <div
                key={i}
                className="rounded-md bg-[var(--surface-overlay)] p-3 font-mono text-sm text-[var(--accent-text)]"
              >
                {format}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Putting It All Together: A Complete Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Now that we have examined each component individually, let's see how they work together in a complete, production-ready spec. This spec generates a zero-downtime deployment runbook for a Kubernetes cluster.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Complete Spec — Kubernetes Deployment Runbook
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono text-[var(--text-primary)]">
              <span className="text-[var(--accent-text)]">You are a senior DevOps engineer with expertise in Kubernetes orchestration and zero-downtime deployment strategies.</span>
              {"\n\n"}
              <span className="text-[var(--accent-text)]">Design a zero-downtime deployment strategy for a Kubernetes cluster running 50 microservices across 3 namespaces. The deployment must support automated rollback when health checks fail within 5 minutes of deployment.</span>
              {"\n\n"}
              <span className="text-[var(--accent-text)]">Use blue-green deployment with Istio traffic shifting. Configure readiness probes with a 30-second initial delay and 10-second period. Use Helm charts for deployment manifests. Include monitoring dashboards for deployment health metrics.</span>
              {"\n\n"}
              <span className="text-[var(--accent-text)]">Return output as a runbook with step-by-step commands. Each step must include the exact kubectl or istioctl command, the expected output, and the rollback command if the step fails. No explanation, no introductory text.</span>
            </code>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Output Explanation
          </p>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            The model returns a structured runbook with numbered steps, each containing the exact command to execute, the expected output for verification, and the rollback command if verification fails. The runbook covers namespace creation, Helm chart deployment, Istio virtual service configuration, traffic shifting, health check verification, and automated rollback procedures. Every step is immediately executable—no interpretation or translation required.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage: Structuring Specs for a Team</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          When multiple engineers write specs, structure becomes a team coordination tool. A team that agrees on a spec structure—where every spec has exactly four sections in the same order, with consistent labeling—can read and review each other's specs as easily as they read and review code. This shared structure enables spec libraries, template sharing, and cross-team collaboration. New team members learn the structure in their first week and can write effective specs within their first month. The structure itself becomes part of the team's engineering culture.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Spec Structure</h2>
        <div className="mt-4 space-y-3">
          {[
            "Always follow the four-component order: Role, Task, Constraints, Output Format. Never reorder them. The order matters for both model processing and human readability.",
            "Use visual separators between components. Blank lines, section headers, or comment-style prefixes (like '// Role') make the structure instantly parseable.",
            "Keep each component focused. The Role section should only define the persona. The Task section should only define the deliverable. Mixing concerns creates confusion.",
            "Review your spec structure before running it. Ask yourself: Can I identify all four components at a glance? If not, restructure.",
            "Document your team's spec structure conventions. Create a style guide that specifies the exact format, labeling conventions, and ordering. Treat it like a coding standard.",
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
