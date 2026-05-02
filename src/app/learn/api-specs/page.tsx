import TopicLayout from "@/components/TopicLayout";

export default function ApiSpecsPage() {
  return (
    <TopicLayout
      section="Domain-Based Specs"
      lessonNumber="Lesson 15"
      title="API Specs"
      currentHref="/learn/api-specs"
    >
      <section>
        <h2 className="text-xl font-semibold">What Are API Specs?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          API specs are structured prompts designed to generate RESTful API definitions, GraphQL schemas, webhook configurations, API documentation, client SDKs, and API gateway rules. They bring precision to API design, ensuring that endpoints are consistent, well-documented, versioned correctly, and follow industry standards like OpenAPI, JSON:API, or GraphQL best practices.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          APIs are contracts between services, and poorly designed contracts lead to integration failures, breaking changes, and developer frustration. An API spec defines the resource model, HTTP methods, request/response schemas, error codes, authentication mechanism, rate limiting rules, and versioning strategy before any implementation begins. This upfront specification enables parallel development: frontend teams can mock the API, backend teams can implement it, and QA teams can write integration tests—all from the same specification.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The spec-driven approach to API design aligns with the API-First methodology, where the API contract is treated as the primary artifact and implementation is derived from it. Tools like OpenAPI Generator can produce server stubs, client libraries, and documentation directly from the specification, ensuring that the implementation matches the contract and the documentation stays synchronized.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          API specs are especially critical for public-facing APIs where external developers depend on your interface. A well-specified API reduces integration time for consumers, minimizes support tickets caused by unclear documentation, and enables automated contract testing that catches breaking changes before they reach production.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Components of an API Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          An API spec must address seven critical dimensions. The API style and version definition specifies whether the API is REST, GraphQL, gRPC, or WebSocket, along with the versioning strategy (URL path /v1/, header Accept: application/vnd.api.v1+json, or query parameter). This establishes the architectural foundation for all endpoint definitions.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Resource modeling defines the entities exposed by the API, their relationships, and the operations available on each resource. For REST APIs, this means identifying resources (users, orders, products), their URLs (/users, /users/:id/orders, etc.), and the HTTP methods that operate on them (GET, POST, PUT, PATCH, DELETE). Each resource must have a clearly defined representation (JSON schema) and lifecycle (creation, modification, deletion).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Request and response schemas specify the exact structure of data sent to and received from each endpoint. Request schemas define required fields, optional fields, data types, validation rules, and default values. Response schemas define success responses (200, 201), error responses (400, 401, 403, 404, 409, 422, 500), pagination format, and field selection options. Consistent schemas across all endpoints enable consumers to build generic client logic.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Authentication and authorization define how clients authenticate (API keys, OAuth 2.0, JWT Bearer tokens, mutual TLS) and what permissions are required for each endpoint. The spec should specify the token format, expiration policy, refresh mechanism, and the exact HTTP headers used for credential transmission. Authorization rules define which roles can access which resources and operations.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              API Spec Example — Order Management REST API
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior API architect specializing in RESTful design with OpenAPI 3.1 specifications.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Design the Order Management API v2 with endpoints for order CRUD, status tracking, and payment integration.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Style: RESTful, JSON:API compatible. Versioning: URL path /api/v2/. Auth: Bearer JWT with OAuth 2.0 scopes (orders:read, orders:write, orders:admin). Pagination: cursor-based (after, limit, default limit=20, max=100). Filtering: status, date_range, customer_id. Sorting: -created_at default. Idempotency: POST /orders supports Idempotency-Key header. Rate limit: 100 req/min per user.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: OpenAPI 3.1 YAML with paths: GET /orders (list), POST /orders (create), GET /orders/:id (detail), PATCH /orders/:id (update), POST /orders/:id/cancel (cancel action), GET /orders/:id/payments (list payments). Each endpoint: request schema, response schema (200/201/400/401/403/404/409/429), security requirements, rate limit headers. Include reusable components: Order schema, Error schema (RFC 7807), Pagination schema, common parameters.
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The API spec produces a complete OpenAPI 3.1 document that serves as the single source of truth for the Order Management API. The document defines six endpoints covering the full order lifecycle: listing orders with cursor-based pagination, creating new orders with idempotency support, retrieving individual order details, updating order fields (partial update via PATCH), canceling orders (action endpoint), and viewing payment history.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Cursor-based pagination is specified instead of offset-based pagination because it provides consistent results for frequently changing datasets. With offset pagination, inserting new records between page requests causes duplicates or skipped items. Cursor pagination uses a stable reference point (the last item's ID or timestamp) to fetch the next page, guaranteeing no duplicates or gaps.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The idempotency support for POST /orders is critical for payment-related operations. If a client sends the same order creation request twice (due to network timeout and retry), the Idempotency-Key header ensures the server returns the same response without creating a duplicate order. This is a fundamental requirement for any API that processes financial transactions.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 2: GraphQL API Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          GraphQL APIs require a different spec approach, focusing on the type system, query complexity, and resolvers rather than HTTP methods and URL paths.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              GraphQL Spec Example — Content Platform Schema
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Design a GraphQL schema for a content platform with articles, authors, comments, and categories.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Types: Article (id, title, slug, body, status, publishedAt, author, category, comments, viewCount), Author (id, name, bio, articles), Comment (id, body, author, createdAt, article), Category (id, name, slug, articles). Queries: article(id, slug), articles(first, after, status, category), author(id), search(query, type). Mutations: createArticle, updateArticle, deleteArticle, addComment. Pagination: Relay-style connection (edges, nodes, pageInfo) for all list fields. Authorization: @auth directive on mutations (require: admin, editor). Rate limiting: max query complexity 1000, max depth 10.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: GraphQL SDL (Schema Definition Language) file with all types, inputs, enums, queries, mutations, custom directives. Include DataLoader configuration to prevent N+1 queries (batch load authors by IDs, comments by article IDs). Include query complexity analysis rules: each field has a cost (1 for scalars, 10 for connections), total cost must not exceed 1000.
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          This GraphQL spec addresses the N+1 query problem by specifying DataLoader configuration for batching. Without DataLoader, fetching 100 articles would trigger 100 separate queries to load their authors (one per article). DataLoader collects all author IDs, executes a single SELECT WHERE id IN (...) query, and distributes the results to the appropriate article resolvers.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Bad vs. Good: API Specs</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The quality of an API spec directly determines the developer experience of consumers and the maintainability of the implementation.
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Search Endpoint
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Create a search endpoint"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No query parameters defined, no result format, no pagination, no relevance scoring, no error handling for empty results. Consumers cannot know how to use it.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  GET /api/v2/search. Query params: q (required, min 2 chars), type (enum: articles, authors, categories), sort (relevance|date, default: relevance), page (cursor). Response: data array with type/id/attributes/links, meta with total/took_ms, links with next/prev. Empty results: 200 with empty data array and meta.total = 0. No results found message in meta. Timeout: 5 seconds, return partial results if search backend times out.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Full contract: inputs, outputs, pagination, error handling, timeout behavior.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Webhook Configuration
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Add webhook notifications"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No payload format, no retry policy, no signature verification, no event types, no delivery status tracking. Webhooks fail silently and consumers cannot verify authenticity.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Webhook: POST to consumer URL. Payload: id (string), type (enum: order.created, order.updated, order.cancelled), data (object), timestamp (ISO8601). Signature: HMAC-SHA256 of payload body with shared secret, header X-Webhook-Signature. Retry: 5 attempts with exponential backoff (1s, 5s, 30s, 2m, 10m). Timeout: 10s per attempt. Status tracking: delivery log with attempt count, last status, next retry. Consumer management: subscribe/unsubscribe endpoints, event type filtering.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Payload format, security, reliability, and consumer management all specified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A payment processing company used API specs to design their merchant-facing API. The spec defined 40+ endpoints covering payment initiation, refund processing, dispute management, settlement reporting, and webhook notifications. Each endpoint was specified with OpenAPI 3.1, including request/response schemas, error codes, authentication requirements, and rate limits. The spec was published as interactive documentation (using Swagger UI) before any implementation began, allowing merchant developers to start integrating immediately. When the API launched, 80% of merchants reported zero integration issues because the implementation matched the specification exactly.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A healthcare platform used API specs for their FHIR-compliant patient data API. The spec mapped FHIR resources (Patient, Observation, Condition, MedicationRequest) to GraphQL types, defining queries for patient search, clinical data retrieval, and medication reconciliation. The spec explicitly defined authorization rules: patients can only access their own data, providers can access data for patients under their care, and administrators have read-only access to aggregated statistics. The spec-driven approach enabled them to pass a HIPAA compliance audit by demonstrating that every API endpoint had documented authorization controls.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for API Specs</h2>
        <div className="mt-4 space-y-3">
          {[
            "Use OpenAPI/GraphQL SDL as the specification format, not prose. Machine-readable specs enable code generation, validation, and automated testing.",
            "Define error responses consistently across all endpoints. Use RFC 7807 Problem Details format with type, title, status, detail, and instance fields.",
            "Specify pagination strategy upfront and apply it uniformly. Cursor-based pagination is preferred for APIs with frequently changing data; offset-based is acceptable for static datasets.",
            "Include idempotency support for all mutating operations (POST, PATCH). Idempotency keys prevent duplicate operations from network retries—a critical requirement for financial APIs.",
            "Define rate limiting at the spec level, not as an afterthought. Specify limits per endpoint, per user, and globally. Include rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset) in responses.",
            "Version your API from day one. Even if you only have one version, structure the API so that v2 can be introduced without breaking v1 clients.",
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
