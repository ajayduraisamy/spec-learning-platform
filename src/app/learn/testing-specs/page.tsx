import TopicLayout from "@/components/TopicLayout";

export default function TestingSpecsPage() {
  return (
    <TopicLayout
      section="Domain-Based Specs"
      lessonNumber="Lesson 17"
      title="Testing Specs"
      currentHref="/learn/testing-specs"
    >
      <section>
        <h2 className="text-xl font-semibold">What Are Testing Specs?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Testing specs are structured prompts designed to generate unit tests, integration tests, end-to-end tests, performance tests, and test configurations. They apply the discipline of spec engineering to test creation, ensuring that tests are comprehensive, maintainable, properly isolated, and cover both happy paths and edge cases that developers often overlook.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Writing good tests is one of the most undervalued skills in software engineering. Tests that are poorly structured, over-mocked, or test implementation details rather than behavior become maintenance liabilities that slow down development rather than enabling confident refactoring. Testing specs address this by defining exactly what behavior to test, what to mock, what assertions to make, and how to structure the test for readability.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The spec-driven approach to test generation is particularly powerful because it forces consideration of edge cases before they cause production bugs. When a spec requires the LLM to generate tests for null inputs, boundary conditions, concurrent access, network failures, and invalid states, the resulting test suite is far more robust than tests written ad-hoc based on the developer's immediate understanding of the code.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Testing specs also standardize test patterns across a codebase. When every test file follows the same structure (Arrange-Act-Assert or Given-When-Then), uses the same mocking strategy, and asserts on behavior rather than implementation, the entire test suite becomes easier to read, maintain, and extend. New team members can quickly understand the testing conventions by reading any test file.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Components of a Testing Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A testing spec must address six critical dimensions. The testing framework and tool definition specifies the test runner (Jest, Vitest, pytest, JUnit), assertion library (expect, assert, should), mocking library (jest.mock, unittest.mock, Mockito), and test utilities (Testing Library, Supertest). This ensures generated tests are compatible with the existing test infrastructure.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Test scope and type defines what level of testing is being generated: unit tests (isolated function/class testing with mocked dependencies), integration tests (testing interactions between components or services), end-to-end tests (testing complete user flows through the UI or API), or performance tests (testing response times, throughput, and resource usage under load). Each test type has different requirements for setup, teardown, and assertions.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Test case definition specifies the exact scenarios to cover: happy path (expected inputs producing expected outputs), edge cases (empty inputs, maximum values, null/undefined), error cases (invalid inputs, network failures, timeout scenarios), and boundary conditions (values at the edges of valid ranges). A good testing spec explicitly lists the scenarios to ensure comprehensive coverage.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Mocking and isolation strategy defines what external dependencies to mock (databases, APIs, file systems, clock, random number generators), how to mock them (stub return values, spy on calls, simulate errors), and what to leave unmocked (pure functions, in-memory data structures). Over-mocking creates brittle tests that pass even when the code is broken; under-mocking creates flaky tests that fail due to external factors.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Testing Spec Example — Payment Service Unit Tests
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior QA engineer specializing in test-driven development and comprehensive test coverage for financial systems.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Write unit tests for a PaymentService.processPayment() method.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Framework: Jest with TypeScript. Method signature: processPayment(params: PaymentParams): Promise{`<PaymentResult>`}. Dependencies to mock: PaymentGateway (charge method), OrderRepository (findById, updateStatus), EventPublisher (publish), Logger. Test structure: describe blocks by behavior, it blocks by scenario. Pattern: Arrange-Act-Assert.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Test file with 12 test cases: success flow (valid payment, correct amount charged, order status updated to 'paid', payment_completed event published), invalid amount (zero, negative, exceeds max), order not found, order already paid, payment gateway timeout (retry once, then fail), payment gateway declined (specific error message), insufficient funds, currency mismatch, idempotency (same orderId returns same result). Each test: isolated setup, explicit assertions on all side effects, cleanup in afterEach.
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The testing spec produces a comprehensive test suite that covers not just the happy path but the full spectrum of behaviors the payment service must handle. The 12 test cases include 1 success scenario, 3 input validation scenarios, 3 business logic scenarios, 3 external failure scenarios, 1 idempotency scenario, and 1 edge case (currency mismatch).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Each test follows the Arrange-Act-Assert pattern: the Arrange section sets up mocks and input data, the Act section calls the method under test, and the Assert section verifies all expected outcomes. This structure makes tests readable and makes failures easy to diagnose—the failed assertion tells you exactly which outcome was not produced.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The mocking strategy is carefully designed: PaymentGateway is mocked to return success, timeout, or decline responses; OrderRepository is mocked to return valid orders, null (not found), or already-paid orders; EventPublisher and Logger are spied on to verify they were called with correct arguments. The database itself is not mocked—instead, the repository interface is mocked, testing the service's interaction with the repository without depending on an actual database.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 2: E2E Test Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          End-to-end tests require a different spec approach, focusing on user flows, page interactions, and real system behavior rather than isolated function calls.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              E2E Test Spec Example — User Registration Flow
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Write end-to-end tests for the user registration flow.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Tool: Playwright with TypeScript. Base URL: staging environment. Test database: seeded with test data, cleaned between tests. Test isolation: each test creates a unique user (email + timestamp) to avoid conflicts. Browser: Chromium, viewport 1280x720.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: 5 test cases: successful registration (fill form, submit, verify confirmation email received, verify redirect to dashboard), validation errors (empty fields, invalid email format, password too weak, password mismatch), duplicate email (register with existing email, verify inline error message), password strength meter (test weak/medium/strong indicators update correctly), accessibility (tab through form, verify focus order, verify error announcements to screen reader). Each test: explicit selectors (data-testid attributes, not CSS classes), wait for network responses, assert on final page state.
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          This E2E spec addresses the most common pitfalls of end-to-end testing: test data conflicts (solved by unique user creation per test), flaky selectors (solved by data-testid attributes), network timing issues (solved by waiting for responses), and accessibility regressions (solved by explicit a11y assertions). The spec requires tests to assert on the final page state rather than intermediate steps, ensuring that the user's end goal is achieved.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Bad vs. Good: Testing Specs</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The difference between good tests and bad tests is the difference between a safety net and a false sense of security.
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Error Handling Test
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Write tests for this function"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Produces only the happy path test. No edge cases, no error scenarios, no boundary conditions. Code coverage looks good but bugs slip through.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  "Write tests for this function covering: valid input (happy path), null/undefined input, empty string, maximum length input, special characters, concurrent calls, dependency failure (mock throws), dependency timeout, and retry behavior. Each test: explicit assertion on return value AND side effects (DB state, emitted events, logged messages)."
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Comprehensive coverage of inputs, failures, and side effects.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Test Structure
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Test the API endpoint"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  One massive test that checks everything: status code, response body, headers, database state. When it fails, you don't know which assertion broke. Tests share state and depend on execution order.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  "Write separate tests for each behavior: returns 201 on success, returns 400 on validation error, returns 409 on duplicate, response body matches schema, database record is created, event is published. Each test: isolated setup (no shared state), single concept under test, descriptive name ('should return 409 when email already exists')."
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Isolated, focused, descriptive tests with clear failure signals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A healthcare software company used testing specs to achieve and maintain HIPAA compliance through their test suite. They created spec templates for: data access tests (verifying that users can only access patient data they are authorized to see), audit log tests (verifying that every data access is logged with user ID, timestamp, and accessed resource), data encryption tests (verifying that PHI is encrypted at rest and in transit), and data deletion tests (verifying that patient data is completely removed upon request, including backups). The spec-driven approach ensured that every new feature included the required compliance tests, and their automated test suite became the primary evidence for their annual HIPAA audit.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          An e-commerce company used testing specs for their checkout flow, which handled $2M in daily transactions. The spec defined 25 test scenarios covering: normal checkout, guest checkout, coupon application, gift card usage, split payments, address validation, inventory check during checkout, payment gateway failures, timeout recovery, and order confirmation email delivery. The tests ran on every deployment to production as smoke tests, catching 3 checkout-breaking bugs in 6 months that would have resulted in an estimated $400K in lost revenue.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Testing Specs</h2>
        <div className="mt-4 space-y-3">
          {[
            "Test behavior, not implementation. Assert on what the code does (outputs, side effects), not how it does it (internal method calls, private state). Implementation tests break during refactoring; behavior tests survive.",
            "Use the Arrange-Act-Assert pattern consistently. It makes tests readable and makes failures easy to diagnose. Each section should be clearly separated (blank lines or comments).",
            "Mock only external dependencies (databases, APIs, file systems). Do not mock the code you are testing or pure functions. Over-mocking creates tests that pass even when the code is broken.",
            "Write one assertion per test when possible. If a test has multiple assertions and the first one fails, the remaining assertions are never evaluated. Split into separate tests for clearer failure messages.",
            "Include edge cases in every test spec: null, undefined, empty, maximum values, negative values, special characters, concurrent access. These are the inputs that cause production bugs.",
            "Make tests deterministic. Do not rely on real time (use fake timers), random values (seed the RNG), or external services (mock them). Flaky tests that pass sometimes and fail others erode trust in the entire test suite.",
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
