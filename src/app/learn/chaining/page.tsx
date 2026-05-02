import TopicLayout from "@/components/TopicLayout";

export default function ChainingPage() {
  return (
    <TopicLayout
      section="Core Engineering"
      lessonNumber="Lesson 4 of 10"
      title="Chaining"
      currentHref="/learn/chaining"
    >
      <section>
        <h2 className="text-2xl font-bold mb-4">Principles of Prompt Chaining</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Prompt chaining is the practice of decomposing complex tasks into sequences of smaller, focused prompts where each step's output becomes part of the next step's context. Rather than asking a model to "analyze this contract, extract key terms, assess risks, and generate a summary report" in a single prompt, chaining breaks this into discrete steps: document classification, clause extraction, risk assessment, and report generation. Each step can use a specialized prompt optimized for that specific sub-task.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The fundamental advantage of chaining is fault isolation and optimization. When a single monolithic prompt fails, diagnosing which part failed requires reading the entire output. With chaining, each step produces intermediate outputs that can be validated independently. If the risk assessment step produces garbage, you know exactly where to debug. This also enables step-level optimization—improving the extraction prompt without touching the summarization prompt.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Chains introduce latency (sequential API calls) and token costs (each step consumes tokens, and later steps often include outputs from earlier steps in their context). However, they typically produce higher-quality outputs for complex tasks because each prompt can be shorter, more focused, and include task-specific examples that wouldn't fit in a single context window. The key engineering decision is determining the optimal decomposition granularity.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Effective chains follow the single-responsibility principle: each prompt should do one thing well. A document processing chain might have steps for: format detection, content extraction, entity recognition, relationship mapping, and output formatting. Over-chaining (creating 20+ step chains) introduces error propagation risks—if step 3 produces slightly wrong output, steps 4-20 may compound the error. Most production chains have 3-7 steps.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Sequential vs Parallel Chains</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Sequential chains execute steps in order, where step N cannot begin until step N-1 completes. This is necessary when later steps depend on earlier outputs. A legal document analyzer might run: classify document type → extract relevant clauses → assess clause compliance → generate report. Each step requires the previous step's output as context, making parallel execution impossible.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Parallel chains execute independent prompts simultaneously, then merge results. A content moderation system might run sentiment analysis, toxicity detection, and topic classification in parallel since these analyses don't depend on each other. The results are then merged in a final synthesis step. Parallel chains reduce latency (wall-clock time equals the slowest parallel branch) but increase token throughput since all branches consume tokens simultaneously.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Sequential Chain</div>
          <pre className="whitespace-pre-wrap">
{`STEP 1 - Extract Entities:
Prompt: "Extract all company names, dates, and monetary values from: {{contract_text}}"
Output: { "companies": ["Acme Corp"], "dates": ["2026-01-15"], "amounts": ["$50000"] }

STEP 2 - Classify Clauses (uses Step 1 output):
Prompt: "Given companies {{step1.companies}} and dates {{step1.dates}}, identify which clauses are termination-related."
Output: { "termination_clauses": ["Section 7.2", "Section 9.1"] }

STEP 3 - Assess Risk (uses Step 2 output):
Prompt: "Analyze these termination clauses: {{step2.termination_clauses}}. Rate risk 1-10."
Output: { "risk_score": 7, "rationale": "..." }`}
          </pre>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Parallel Chain</div>
          <pre className="whitespace-pre-wrap">
{`PARALLEL BRANCH A - Sentiment:
Prompt: "Classify sentiment of: {{user_review}}"
Output A: { "sentiment": "negative", "score": -0.7 }

PARALLEL BRANCH B - Category:
Prompt: "Classify category of: {{user_review}}"
Output B: { "category": "billing", "confidence": 0.92 }

PARALLEL BRANCH C - Urgency:
Prompt: "Rate urgency 1-5 of: {{user_review}}"
Output C: { "urgency": 4, "reason": "threat to cancel" }

MERGE STEP:
Prompt: "Given sentiment={{outputA}}, category={{outputB}}, urgency={{outputC}}, suggest response priority."`}
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Conditional and Dynamic Chains</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Conditional chains use decision nodes to route execution based on intermediate outputs. A support ticket processor might: classify intent → if billing, route to billing chain; if technical, route to technical chain; if escalation-worthy, route to human handoff chain. This pattern prevents using expensive prompts for simple cases and ensures each request type gets specialized handling.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Dynamic chains adjust their structure at runtime based on content analysis. A document summarizer might check document length: under 1000 words uses a single-shot summary prompt; over 1000 words triggers a map-reduce chain where each section is summarized individually, then section summaries are combined. The routing logic itself is typically a fast, cheap prompt that only needs to make a classification decision.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Error-triggered rechain patterns detect failures and automatically retry with modified prompts. If a JSON output parser fails because the model produced markdown instead, the system can re-run with stronger formatting constraints: "Output ONLY valid JSON, no markdown, no explanation." Implementing exponential backoff with prompt variations prevents infinite retry loops while giving the model multiple chances to produce valid output.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Chain State Management</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          State management tracks accumulated context, intermediate outputs, and execution metadata across chain steps. Each step typically appends its output to a shared state object that later steps can reference. Without proper state design, later steps may lack critical context from earlier steps, or may receive redundant information that wastes tokens. A well-designed state schema defines exactly what each step produces and what subsequent steps consume.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          State compression becomes necessary in long chains where context windows would overflow. After 5+ steps, the accumulated outputs may exceed token limits for subsequent prompts. Engineers implement state summarization: after every N steps, a compression prompt summarizes the accumulated state into a dense representation. This prevents token overflow but risks losing detail—the compression prompt must be tuned to preserve information critical for remaining steps.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: State Management Pattern</div>
          <pre className="whitespace-pre-wrap">
{`Chain State Schema:
{
  "document_id": string,
  "steps_completed": string[],
  "extracted_entities": {...},     // from step 1
  "classified_sections": {...},    // from step 2
  "risk_assessment": {...},        // from step 3
  "summary": string,               // compressed after step 3
  "metadata": {
    "token_usage": number,
    "execution_time_ms": number,
    "retry_count": number
  }
}

Each step reads state, adds its output, passes forward.`}
          </pre>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Observability into chain execution requires logging each step's input, output, token usage, and latency. Production chain systems emit structured logs that enable replay debugging—when a chain produces wrong output, engineers can replay from any intermediate step with modified prompts. This is impossible with monolithic prompts where the entire execution is a black box. Chain observability is a prerequisite for iterative improvement.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Real-World Chain Architectures</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          A production RAG (Retrieval-Augmented Generation) system implements a 5-step chain: query rewriting (optimize user query for retrieval) → document retrieval (vector search) → relevance filtering (remove low-score results) → context assembly (format docs for prompt) → answer generation. Each step is independently tunable—improving the query rewriter boosts retrieval precision without touching the generator prompt. This modularity enables A/B testing at each stage.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Code review automation chains: static analysis (run linters) → diff summarization (LLM summarizes changes) → security scan (LLM checks for vuln patterns) → style check (LLM compares to team standards) → synthesis (combine all findings into review comment). Parallel branches handle independent checks (security and style can run simultaneously), while synthesis depends on all branches completing. This architecture processes PRs 3x faster than sequential human review.
        </p>
        <div className="border-l-4 border-[var(--accent)] pl-4 mb-4">
          <p className="text-[var(--accent-text)] font-medium">Chaining Tips:</p>
          <ul className="list-disc list-inside text-[var(--text-secondary)] mt-2 space-y-1">
            <li>Start with 3-5 steps; add more only when you can measure why it helps</li>
            <li>Log intermediate outputs even in production—debugging chains without logs is painful</li>
            <li>Use conditional routing to avoid running expensive prompts on simple cases</li>
            <li>Implement step-level timeouts; a stuck step shouldn't hang the entire chain</li>
            <li>Design state schemas before writing prompts; data contracts between steps prevent integration bugs</li>
          </ul>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Anti-patterns include: the "chain of prompts" where each step merely reformats the previous output without adding value; over-parallelization where everything runs in parallel but coordination overhead exceeds latency savings; and missing idempotency—steps that produce different outputs when re-run with the same input break replay debugging and make chains non-deterministic in production deployments.
        </p>
      </section>
    </TopicLayout>
  );
}
