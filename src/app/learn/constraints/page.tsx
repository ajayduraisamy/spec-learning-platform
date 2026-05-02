import TopicLayout from "@/components/TopicLayout";

export default function ConstraintsPage() {
  return (
    <TopicLayout
      section="Foundations"
      lessonNumber="Lesson 6 of 10"
      title="Constraints"
      currentHref="/learn/constraints"
    >
      <section>
        <h2 className="text-xl font-semibold">Why Constraints Are the Most Powerful Spec Component</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          If the task defines what you want, constraints define what you do not want. This negative definition—specifying the boundaries of acceptable output—is where spec engineering gets its precision. Without constraints, the model operates within its full training distribution, which encompasses everything from beginner tutorials to production-hardened systems. With constraints, you carve out a narrow region of that distribution and force the model to operate exclusively within it.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The power of constraints comes from the way LLMs generate text. At each step of generation, the model computes a probability distribution over its entire vocabulary and samples the next token from that distribution. Constraints work by reducing the probability of tokens that violate your requirements and increasing the probability of tokens that satisfy them. A constraint like "Use TypeScript" dramatically reduces the probability of Python, JavaScript, or Go syntax appearing in the output. A constraint like "No third-party libraries" eliminates entire categories of import statements. Each constraint you add further narrows the output space, concentrating probability mass on the exact type of output you need.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Constraints are also the component that most directly maps to your real-world requirements. In production, you do not just need "a function that sorts"—you need a function that sorts using a specific algorithm, in a specific language, with specific performance characteristics, following specific coding standards. Constraints are how you encode these requirements into your spec. They are the bridge between the model's general capabilities and your specific needs.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The most common constraint mistake is under-specification. Engineers often assume that the model will "figure out" the technology stack, the architectural pattern, or the coding standard because it is the obvious choice for the task. But the model has no concept of "obvious"—it has only probability distributions. What is obvious to you may be a low-probability path for the model. Constraints eliminate this ambiguity by making your requirements explicit.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Constraint Categories</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Constraints fall into six categories, each governing a different dimension of the output. Understanding these categories helps you write comprehensive constraint sections that leave no dimension unspecified.
        </p>

        <div className="mt-4 space-y-4">
          {[
            {
              category: "Technology Constraints",
              description: "Specify the programming language, framework, library, and tool versions. These are the most fundamental constraints because they determine the entire syntax and structure of the output.",
              examples: [
                '"Use TypeScript 5.x with strict mode enabled."',
                '"Build with Next.js 14 App Router, not Pages Router."',
                '"Use Python 3.12 with FastAPI, not Flask or Django."',
                '"PostgreSQL 16 with the pgvector extension for vector similarity search."',
              ],
            },
            {
              category: "Architecture Constraints",
              description: "Specify the architectural pattern, design patterns, and structural organization. These constraints ensure the output fits into your existing codebase and follows your team's architectural conventions.",
              examples: [
                '"Follow the repository pattern with dependency injection."',
                '"Use the CQRS pattern with separate read and write models."',
                '"Organize code by feature, not by layer."',
                '"Implement the Strategy pattern for payment provider selection."',
              ],
            },
            {
              category: "Performance Constraints",
              description: "Specify throughput, latency, memory, and scalability requirements. These constraints force the model to consider performance implications in its design decisions.",
              examples: [
                '"Response time must be under 100ms for the 95th percentile."',
                '"Must handle 50,000 concurrent connections without degradation."',
                '"Use pagination for all list endpoints. Maximum page size: 100."',
                '"Implement connection pooling with a maximum of 20 connections."',
              ],
            },
            {
              category: "Security Constraints",
              description: "Specify security requirements, validation rules, and data handling policies. These constraints are critical for production systems and should never be omitted for any code that handles user data.",
              examples: [
                '"All user input must be validated with Zod before processing."',
                '"Use parameterized queries. No raw SQL concatenation."',
                '"Never log sensitive data: passwords, tokens, PII."',
                '"Implement CSRF protection on all state-changing endpoints."',
              ],
            },
            {
              category: "Style Constraints",
              description: "Specify coding standards, naming conventions, formatting rules, and documentation requirements. These constraints ensure the output integrates seamlessly with your existing codebase.",
              examples: [
                '"Follow the Google TypeScript Style Guide."',
                '"Use snake_case for database columns, camelCase for API fields."',
                '"Include JSDoc comments for all public functions."',
                '"No default exports. Use named exports only."',
              ],
            },
            {
              category: "Negative Constraints",
              description: "Specify what the model must NOT do. These are often the most impactful constraints because they eliminate entire categories of output that would otherwise be generated.",
              examples: [
                '"Do not use any third-party authentication libraries. Implement JWT manually."',
                '"No console.log statements. Use the provided logger utility."',
                '"Do not include placeholder comments like // TODO or // implement this."',
                '"No explanation, no markdown fencing, no introductory text."',
              ],
            },
          ].map((item) => (
            <div
              key={item.category}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <h3 className="font-semibold text-[var(--text-primary)]">
                {item.category}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.description}
              </p>
              <div className="mt-3 space-y-2">
                {item.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-md bg-[var(--surface-overlay)] p-2 font-mono text-xs text-[var(--accent-text)]"
                  >
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Constraints in Action: Before and After</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The impact of constraints is best understood through comparison. Consider the task of building a user authentication endpoint. With minimal constraints, the model produces output that is technically correct but practically useless. With comprehensive constraints, the output is production-ready.
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Minimal Constraints
              </h3>
            </div>
            <div className="p-5">
              <div className="rounded-md bg-[var(--surface-overlay)] p-3 font-mono text-sm text-[var(--text-secondary)] mb-3">
                <span className="text-[var(--text-tertiary)]">{"// Constraints"}</span>
                <br />
                <span className="text-[var(--accent-text)]">Use Node.js and Express. Include authentication.</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                Likely Output Characteristics
              </p>
              <ul className="space-y-1 text-xs text-[var(--text-tertiary)]">
                <li>May use callbacks or promises or async/await (unspecified)</li>
                <li>May use any JWT library or none (unspecified)</li>
                <li>May skip input validation (not constrained)</li>
                <li>May use any password hashing algorithm (unspecified)</li>
                <li>May include or exclude error handling (unspecified)</li>
                <li>Output format unknown (not specified)</li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Comprehensive Constraints
              </h3>
            </div>
            <div className="p-5">
              <div className="rounded-md bg-[var(--surface-overlay)] p-3 font-mono text-sm text-[var(--accent-text)] mb-3">
                <span className="text-[var(--text-tertiary)]">{"// Constraints"}</span>
                <br />
                <span className="text-[var(--accent-text)]">Use Node.js 20 with Express 4.x and TypeScript 5.x in strict mode. Implement JWT authentication with 15-minute access tokens and 7-day refresh tokens using the jsonwebtoken library. Validate all input with Zod schemas. Hash passwords with bcrypt at 12 salt rounds. Use async/await exclusively—no callbacks or .then() chains. Include error handling with a centralized error middleware that returns {`{ error: { code: string, message: string } }`} format. Implement rate limiting at 5 login attempts per IP per minute using express-rate-limit. Do not include placeholder comments or TODO items. Do not use console.log—use the provided appLogger utility.</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                Expected Output Characteristics
              </p>
              <ul className="space-y-1 text-xs text-[var(--text-tertiary)]">
                <li>Node.js 20 + Express 4.x + TypeScript 5.x strict—guaranteed</li>
                <li>JWT with specific token lifetimes and specific library—guaranteed</li>
                <li>Zod validation on all inputs—guaranteed</li>
                <li>bcrypt with 12 salt rounds—guaranteed</li>
                <li>async/await only—guaranteed</li>
                <li>Centralized error handling with specific format—guaranteed</li>
                <li>Rate limiting configured—guaranteed</li>
                <li>No placeholders, no console.log—guaranteed</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          The difference is not incremental—it is categorical. The minimally constrained spec produces output that requires significant manual refinement before it can be used. The comprehensively constrained spec produces output that can be integrated directly into the codebase. The investment in writing detailed constraints pays for itself in reduced iteration time and higher output quality.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Balancing Constraint Specificity</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          There is a trade-off between constraint specificity and model flexibility. Over-constraining can produce output that is technically correct but creatively impoverished—like asking an architect to design a building where every room must be exactly 10x10 feet with white walls and a single window. Under-constraining produces output that is creative but impractical—like asking for a building with no specifications at all.
        </p>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            The Constraint Sweet Spot
          </p>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-3">
            Constrain the dimensions that matter to your project (technology, security, performance, style) and leave open the dimensions where model creativity adds value (algorithm choice, variable naming, internal structure). The goal is not to dictate every detail—it is to eliminate the details that would cause the output to be incompatible with your system.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md bg-[var(--surface-overlay)] p-3">
              <p className="text-xs font-medium text-red-400 mb-1">Over-Constrained</p>
              <p className="text-xs font-mono text-[var(--text-secondary)]">
                "Use a for loop starting at index 0, incrementing by 1, with a variable named 'i', checking if array[i] is greater than the variable 'max' initialized to negative infinity..."
              </p>
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                Dictates implementation details that the model could decide optimally.
              </p>
            </div>
            <div className="rounded-md bg-[var(--surface-overlay)] p-3">
              <p className="text-xs font-medium text-[var(--accent)] mb-1">Well-Constrained</p>
              <p className="text-xs font-mono text-[var(--text-secondary)]">
                "Implement an O(n) algorithm that finds the maximum value in an array. Must handle empty arrays by returning null. Use TypeScript with type annotations."
              </p>
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                Specifies complexity, edge case, and language. Lets the model choose the implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Negative Constraints: The Power of "Do Not"</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Negative constraints—specifications of what the model must NOT do—are disproportionately effective at improving output quality. This is because LLMs have strong biases toward certain output patterns (explanatory text, markdown formatting, example usage, caveats) that are often undesirable in production contexts. Negative constraints directly suppress these biases.
        </p>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            High-Impact Negative Constraints
          </p>
          <div className="space-y-2">
            {[
              '"No explanation, no introductory text, no concluding remarks."',
              '"Do not use markdown code fences. Return raw code only."',
              '"No placeholder comments (// TODO, // implement this, etc.)."',
              '"Do not include example usage or test code unless explicitly requested."',
              '"No console.log, console.warn, or console.error statements."',
              '"Do not use any deprecated APIs or libraries."',
              '"No external dependencies beyond those already specified."',
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

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          The most universally applicable negative constraint is "No explanation." This single phrase eliminates the conversational wrapper that LLMs naturally add to their output, transforming verbose responses into clean, parseable artifacts. For any spec where the output will be consumed programmatically or integrated into a codebase, this constraint is essential.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Writing Effective Constraints</h2>
        <div className="mt-4 space-y-3">
          {[
            "Start with technology constraints. These are the most fundamental because they determine the entire syntax and structure. Language, framework, version, and key libraries should always be specified.",
            "Add negative constraints liberally. Each negative constraint eliminates a category of unwanted output. 'No explanation,' 'no markdown,' 'no TODOs'—these are small phrases with large impact.",
            "Specify version numbers when they matter. 'TypeScript' is ambiguous. 'TypeScript 5.x' eliminates compatibility questions. 'React 18' vs 'React 19' can mean entirely different APIs.",
            "Include constraints for error handling. Specify the error format, the error handling pattern (try/catch, centralized middleware, result types), and what information errors should include.",
            "Test constraints iteratively. Run your spec, examine where the output deviates from your expectations, and add constraints to prevent those deviations. Each iteration makes the spec more precise.",
            `Document why each constraint exists. When you write "Use PostgreSQL," add a comment explaining why (e.g., "because our infrastructure uses RDS"). This helps other engineers understand the constraint's purpose and prevents it from being removed during refactoring.`,
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
