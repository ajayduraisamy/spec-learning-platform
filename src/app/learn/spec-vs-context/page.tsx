import TopicLayout from "@/components/TopicLayout";

export default function SpecVsContextPage() {
  return (
    <TopicLayout
      section="Core Engineering"
      lessonNumber="Lesson 2 of 10"
      title="Spec vs Context"
      currentHref="/learn/spec-vs-context"
    >
      <section>
        <h2 className="text-2xl font-bold mb-4">Defining Spec and Context</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          In spec engineering, the "spec" (specification) is the explicit instruction set that tells the model what to do, how to do it, and what constraints to follow. It is the active directive—the commands, task descriptions, output format requirements, and behavioral guidelines that directly control model behavior. The spec is authored by the engineer and remains relatively stable across similar tasks, encoding the intent and methodology for task execution.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Context, by contrast, is the informational substrate that surrounds and supports the spec. It includes retrieved documents, conversation history, user metadata, environmental variables, and any other data that informs the task but isn't the instruction itself. Context is often dynamic, changing with each request based on user input, retrieved knowledge, or session state. While the spec says "analyze this contract," the context provides the actual contract text and relevant legal precedents.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The distinction matters because specs and contexts require different engineering approaches. Specs benefit from clarity, precision, and structural consistency—they should be reusable templates with clear substitution points. Contexts benefit from relevance filtering, semantic compression, and strategic positioning within the token window. Confusing the two leads to specs bloated with data (reducing reusability) or contexts lacking clear directives (causing ambiguous outputs).
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Consider a customer support scenario: the spec defines the bot's persona, escalation rules, and response format. The context provides the customer's ticket history, relevant policy documents, and the current inquiry. When engineers mix these—embedding policy text directly into the spec—they create maintenance burdens where updating a policy requires rewriting the spec. Clean separation enables independent evolution of instructions and information.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Architectural Separation</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Proper architecture treats specs as structured templates with named insertion points, while context is treated as a separate data payload. The spec template might contain placeholders like <code className="text-[var(--accent-text)]">{'{{user_query}}'}</code> or <code className="text-[var(--accent-text)]">{'{{retrieved_docs}}'}</code> that get populated at runtime. This separation allows teams to version specs independently from context sources, run A/B tests on spec variations without touching context pipelines, and maintain a library of reusable spec patterns.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The assembly layer merges spec and context at inference time. This layer handles variable substitution, context truncation, relevance sorting, and token budget enforcement. Well-designed assembly layers support conditional context injection (include billing policies only for billing tickets) and context transformation (summarize long conversations before injection). The spec remains constant while the assembly layer adapts the context to the task.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Good Separation: Spec vs Context</div>
          <pre className="whitespace-pre-wrap">
{`SPEC (static template):
You are a technical support engineer for CloudDB Pro.
Follow this escalation matrix: {{escalation_rules}}
Respond in format: {{output_format}}
Use retrieved docs for accuracy. Never guess product limits.

CONTEXT (dynamic payload):
User Query: {{user_message}}
Conversation History: {{summary}}
Retrieved Docs: {{top_k_docs}}
Account Tier: {{subscription_level}}`}
          </pre>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Bad Mixing: Spec Contaminated with Context</div>
          <pre className="whitespace-pre-wrap">
{`SPEC (bloated):
You are a technical support engineer for CloudDB Pro.
Our Starter tier has 5GB storage, Pro has 100GB, Enterprise has 10TB.
Rate limits: Starter 100 req/min, Pro 1000, Enterprise 10000.
Last week we changed the refund policy to 7 days.
User Query: {{user_message}}
[... 2000 more tokens of product details ...]`}
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Token Economics and Budget Allocation</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Specs should be token-efficient because they consume tokens on every request. A 500-token spec running 10,000 times daily costs 5 million tokens per day. Context costs are variable—retrieval might return 200 tokens for simple queries and 2000 for complex ones. Engineers must budget accordingly: invest heavily in spec clarity (it's amortized across all requests) while implementing aggressive context compression (each token should earn its place for that specific query).
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The 80/20 rule applies: 80% of spec quality comes from 20% of the tokens if you focus on clear task definitions, output formats, and constraint statements. Context quality follows a reverse curve—the first relevant document provides massive value, the tenth document provides diminishing returns. Spec engineering optimizes for clarity per token; context engineering optimizes for relevance per token.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Multi-turn conversations reveal the tension between spec and context. The spec remains constant (system message), but context grows with each turn as conversation history accumulates. Eventually, context must be compressed or truncated, while the spec continues unchanged. Engineers must design specs that remain effective even when context is compressed, avoiding dependencies on full conversation history for basic task execution.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Debugging Spec vs Context Issues</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          When outputs degrade, distinguishing spec failures from context failures is the first debugging step. Spec failures produce consistent errors across different contexts: the model ignores output format, hallucinates facts, or fails to follow instructions. Context failures produce variable errors tied to specific inputs: the model contradicts retrieved documents, misses relevant details, or cites outdated information.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          A systematic diagnosis approach runs the same spec with minimal context, expanded context, and contradictory contexts. If the model follows instructions with minimal context but fails with expanded context, the issue is context engineering (attention dilution, irrelevant retrieval). If the model fails regardless of context, the issue is spec engineering (unclear instructions, missing constraints).
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Diagnostic Test Pattern</div>
          <pre className="whitespace-pre-wrap">
{`TEST 1 - Minimal Context:
SPEC: Summarize the provided text in exactly 3 bullet points.
CONTEXT: "The quick brown fox jumps over the lazy dog."
EXPECTED: Clean 3-bullet summary.

TEST 2 - Expanded Context:
SPEC: (same as above)
CONTEXT: [5000 tokens of related articles] + "The quick..."
EXPECTED: Still 3 bullets, ignoring irrelevant context.

TEST 3 - Contradictory Context:
SPEC: (same as above)
CONTEXT: "The fox is slow." + "The quick brown fox jumps..."
EXPECTED: Uses "quick" from the second source, not "slow".`}
          </pre>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Version control practices differ between specs and contexts. Specs belong in git repositories with code review, unit tests (using static test cases), and staged rollouts. Contexts often live in vector databases, document stores, or external APIs with different versioning needs. Tagging contexts with metadata (source, timestamp, confidence score) enables debugging when outputs change unexpectedly after context updates.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Real-World Patterns</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Legal document analysis systems separate the analytical framework (spec) from case law and statutes (context). The spec defines the output structure: "Extract all parties, effective date, termination clauses, and liability caps. Output JSON." The context provides the actual contract text and relevant precedents. This separation allows lawyers to refine the analysis framework without re-ingesting documents, while document updates don't require spec changes.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Code generation tools separate coding standards and architectural patterns (spec) from existing codebase and API documentation (context). The spec might state: "Generate TypeScript code following our error-handling patterns. Use Result types for operations that can fail. Include JSDoc comments." The context provides the relevant existing modules, type definitions, and API references needed for the specific generation task.
        </p>
        <div className="border-l-4 border-[var(--accent)] pl-4 mb-4">
          <p className="text-[var(--accent-text)] font-medium">Spec vs Context Tips:</p>
          <ul className="list-disc list-inside text-[var(--text-secondary)] mt-2 space-y-1">
            <li>If you update it frequently, it's context—externalize it from your spec</li>
            <li>Specs should read like documentation; contexts should read like data</li>
            <li>Test specs with empty context to verify they stand alone</li>
            <li>Use structured formats (JSON, YAML) for context; use natural language for specs</li>
            <li>Monitor spec token growth—when specs exceed 1000 tokens, look for context that snuck in</li>
          </ul>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          The ultimate test of clean separation is reusability. A well-engineered spec should work with entirely different contexts and still produce correct outputs. If changing the context requires changing the spec, the boundary is incorrectly drawn. Strive for specs that are context-agnostic directives and contexts that are spec-agnostic data—the assembly layer is where they meet.
        </p>
      </section>
    </TopicLayout>
  );
}
