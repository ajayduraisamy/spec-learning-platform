import TopicLayout from "@/components/TopicLayout";

export default function BackendSpecsPage() {
  return (
    <TopicLayout
      section="Domain-Based Specs"
      lessonNumber="Lesson 11"
      title="Backend Specs"
      currentHref="/learn/backend-specs"
    >
      <section>
        <h2 className="text-xl font-semibold">What Are Backend Specs?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Backend specs are structured prompts designed to generate server-side code, API endpoints, middleware, authentication flows, database integrations, and infrastructure configurations. They follow the same role-task-constraints-output format as all specs, but are optimized for the unique requirements of backend development: type safety, error handling, security considerations, and performance optimization.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Backend development demands precision. A poorly specified endpoint can introduce security vulnerabilities, data corruption, or performance bottlenecks that are expensive to fix in production. Backend specs eliminate ambiguity by explicitly defining the framework, language version, architectural patterns, security requirements, error handling strategy, and response format before any code is generated.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The most effective backend specs incorporate domain-specific knowledge that the LLM might not infer from a generic task description. For example, specifying "use parameterized queries to prevent SQL injection" is not just a constraint—it is a security requirement that fundamentally changes how the generated code handles user input. Similarly, "implement circuit breaker pattern with 5-second timeout" dictates the resilience strategy for external service calls.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Backend specs are particularly valuable in team environments where code consistency matters. When every developer uses the same spec templates for generating endpoints, the resulting codebase follows uniform patterns for error handling, logging, validation, and response formatting. This consistency reduces code review time and makes the system easier to maintain and debug.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Components of a Backend Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A backend spec must address six critical dimensions that distinguish it from generic code generation specs. The framework and runtime definition establishes the exact technology stack: Node.js 20 with Express 4, Python 3.12 with FastAPI, Go 1.22 with Gin, etc. This eliminates the guesswork that leads to incompatible dependencies and deprecated API usage.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The authentication and authorization requirements define who can access the endpoint and what operations they can perform. Specs should specify the auth mechanism (JWT, OAuth2, API keys, session cookies), token validation logic, role-based access control rules, and the exact error response for unauthorized requests. This prevents the common mistake of generating endpoints without proper access controls.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Input validation is the first line of defense against malformed data and injection attacks. Backend specs define the validation library (Zod, Joi, Pydantic, etc.), the exact schema for request bodies, query parameters, and path variables, and the error response format for validation failures. A spec that omits validation requirements will produce code that trusts user input—a critical security flaw.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Error handling strategy is perhaps the most important dimension. Backend specs define the error classification system (client errors vs. server errors vs. external service errors), the error response format (RFC 7807 Problem Details is a good standard), logging requirements (what to log at each error level), and retry/fallback behavior for transient failures. Without explicit error handling specs, generated code will either swallow errors or expose stack traces to clients.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Backend Spec Example — User Registration Endpoint
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior backend engineer specializing in secure authentication systems.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Create a POST /api/v1/users/register endpoint for user registration.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Framework: Express.js 4 with TypeScript. Validation: Zod schema requiring email (RFC 5322), password (min 8 chars, 1 uppercase, 1 number, 1 special). Hash: bcrypt with 12 salt rounds. DB: Prisma ORM with PostgreSQL. Rate limit: 5 requests per IP per minute. Check email uniqueness before creation.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Express router module. Success: 201 with {`{ id, email, created_at }`}. Validation error: 400 with RFC 7807 format. Duplicate email: 409 with {`{ type, title, detail }`}. Server error: 500 with generic message, log full error internally. Include comprehensive JSDoc comments.
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The output of a well-specified backend spec is a complete, production-ready module that can be integrated directly into an existing codebase. The Express router includes the endpoint handler with proper async error handling (using express-async-errors or explicit try/catch), Zod validation middleware that rejects invalid requests before they reach the handler, Prisma client calls with proper error type checking, and RFC 7807 compliant error responses.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The success response (201) returns only the fields the client needs—id, email, and created_at—not the full user object with password hash or internal metadata. This is a security best practice that the spec enforces through its output format definition. The validation error response (400) follows RFC 7807 Problem Details, providing machine-readable error information that frontend applications can parse and display to users.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The duplicate email handling (409) is a specific error case that generic prompts often miss. The spec explicitly requires checking email uniqueness before creation, which prevents a database constraint violation and produces a clean, informative error response. The rate limiting requirement (5 requests per IP per minute) protects against brute-force registration attacks.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 2: Middleware Chain Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Backend specs are not limited to endpoint handlers. They are equally powerful for generating middleware chains that handle cross-cutting concerns like authentication, logging, request transformation, and response formatting.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Middleware Chain Spec — API Request Pipeline
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Create a middleware chain for authenticated API routes.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Order: 1) CORS preflight handler, 2) Request ID generator (uuid v4, header: X-Request-ID), 3) JSON body parser (max 1MB), 4) JWT validator (verify, decode, attach user to req.user), 5) Rate limiter (100 req/min per user_id), 6) Request logger (method, path, user_id, request_id). Each middleware must call next() or return an error response.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return a composeMiddleware() function that returns the configured Express middleware chain. Each middleware as a separate exported function with unit tests. Include error types for each failure mode.
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          This middleware spec defines the exact order of execution, which is critical because middleware order determines behavior. The CORS handler must run first to handle preflight requests. The request ID must be generated before any logging occurs. The body parser must run before JWT validation (which may need the request body). The rate limiter needs the decoded user_id, so it runs after JWT validation.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Bad vs. Good: Backend Specs</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The difference between a generic backend prompt and a proper backend spec is the difference between code that works in development and code that survives in production.
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: File Upload Endpoint
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Create a file upload endpoint"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No file size limit, no type validation, no storage location, no authentication, no error handling. This endpoint is a security liability.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  POST /api/files/upload. Auth: JWT required. Validation: multipart/form-data, max 10MB, allow only image/png, image/jpeg, application/pdf. Storage: S3 bucket with unique key {`{userId}/{timestamp}-{originalName}`}. Return: 201 with {`{ fileUrl, fileId, contentType, size }`}. Error: 413 for size, 415 for type, 401 for auth.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Every security, validation, and operational concern is addressed.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Database Query Handler
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Write a function to get users from the database"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No pagination, no filtering, no sorting, no connection pooling consideration, no error handling for connection failures.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  getUsers({`{ page, limit, filter, sort }`}): Prisma query with pagination (default page=1, limit=20, max limit=100). Filter: name (ILIKE), status (enum), created_at (range). Sort: created_at DESC default. Return: {`{ users, total, page, totalPages }`}. Handle: Prisma.P2025 (not found), connection timeout (5s), retry once on transient error.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Pagination, filtering, sorting, error handling, and retry logic all specified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A fintech startup used backend specs to generate their entire payment processing API. They created 8 spec templates covering: payment initiation, webhook handling, refund processing, balance inquiry, transaction history, KYC verification, dispute management, and reconciliation. Each spec explicitly defined PCI-DSS compliance requirements, idempotency key handling, webhook retry logic with exponential backoff, and audit logging. The specs produced code that passed their security audit on the first attempt, saving an estimated 3 weeks of remediation work that would have been needed with ad-hoc prompt-generated code.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          An e-commerce platform used backend specs for their inventory management system. Specs defined stock level checks with optimistic locking (preventing overselling), batch update operations with transaction rollback, cache invalidation strategies (Redis TTL matching database update frequency), and event publishing for downstream systems (order fulfillment, analytics). The spec-driven approach ensured that every inventory endpoint followed the same consistency model, preventing the race conditions that had plagued their previous implementation.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Backend Specs</h2>
        <div className="mt-4 space-y-3">
          {[
            "Always specify the error response format. RFC 7807 Problem Details is a widely adopted standard that provides machine-readable error information with type, title, status, detail, and instance fields.",
            "Define input validation explicitly. Never assume the LLM will choose the right validation library or schema. Specify Zod/Joi/Pydantic and include the exact validation rules.",
            "Include security requirements in every spec. Authentication mechanism, authorization rules, rate limiting, input sanitization, and output encoding should be explicit constraints.",
            "Specify pagination for list endpoints. Default page size, maximum page size, cursor vs. offset pagination, and total count inclusion prevent performance issues with large datasets.",
            "Define idempotency for mutating operations. POST and PATCH endpoints should support idempotency keys to prevent duplicate operations from network retries.",
            "Include database transaction boundaries. Specify which operations must be atomic and what isolation level to use (read committed, repeatable read, serializable).",
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
