import TopicLayout from "@/components/TopicLayout";

export default function ContextEngineeringPage() {
  return (
    <TopicLayout
      section="Core Engineering"
      lessonNumber="Lesson 1 of 10"
      title="Context Engineering"
      currentHref="/learn/context-engineering"
    >
      <section>
        <h2 className="text-2xl font-bold mb-4">Foundations of Context Engineering</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Context engineering is the systematic practice of designing, structuring, and managing the information payload that surrounds a language model's prompt to maximize output relevance, accuracy, and task completion rates. Unlike basic prompt engineering which focuses on the instruction text itself, context engineering encompasses the entire informational environment: retrieved documents, conversation history, system messages, user metadata, and environmental variables that shape the model's understanding of the current task.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The discipline emerged as LLM context windows expanded from 2,048 tokens to 128,000+ tokens, creating both opportunity and complexity. With larger windows, teams can inject extensive documentation, multiple examples, and rich background information. However, unbounded context growth leads to attention dilution, where models struggle to identify which information is most relevant to the immediate task. Context engineering solves this by treating context as a structured resource requiring active management.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Effective context engineering requires understanding three core dimensions: relevance (is this information useful for the task?), density (how much value per token?), and recency (how does information order affect attention?). Research shows that LLMs exhibit strong positional bias, with information at the beginning and end of context windows receiving disproportionately more attention than middle content. Context engineers must strategically position critical information while pruning low-value tokens.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The practice intersects with information retrieval, UX design, and systems engineering. Context engineers often build pipelines that dynamically fetch relevant documents, compress conversation history, and inject user-specific metadata. They must balance completeness against token costs, as every token in the context window incurs computational expense. This makes context engineering both a technical and economic discipline, requiring optimization for both output quality and operational efficiency.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Context Window Architecture</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Modern LLM context windows operate as ring buffers with positional encoding that degrades for very long sequences. Understanding the architecture helps engineers make informed decisions about information placement. The context window can be conceptually divided into priority zones: the system zone (first 5-10% of tokens) for foundational instructions, the active zone (middle 60-70%) for task-relevant context, and the recall zone (final 10-15%) for immediate task specifications and output formatting instructions.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Token allocation requires careful budgeting. A typical support bot context might allocate 15% to system instructions, 25% to conversation history, 40% to retrieved knowledge base articles, and 20% to user-specific data. Exceeding the context window causes truncation, typically from the middle or oldest content depending on the model's truncation strategy. Engineers must implement sliding window algorithms or semantic compression to maintain critical information within the active context.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Context Budget Allocation Example:</div>
          <pre className="whitespace-pre-wrap">
{`Total Context: 8,192 tokens
├── System Instructions: 1,200 tokens (14.6%)
│   ├── Persona definition
│   ├── Output format rules
│   └── Safety guidelines
├── Conversation History: 2,400 tokens (29.3%)
│   ├── Last 6 user messages
│   └── Last 6 assistant responses
├── Retrieved Documents: 3,200 tokens (39.1%)
│   ├── Top 3 semantic search results
│   └── Metadata and relevance scores
└── User Context: 1,392 tokens (17.0%)
    ├── Account tier and history
    ├── Previous issue summaries
    └── Current query metadata`}
          </pre>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Dynamic context injection uses retrieval-augmented generation (RAG) pipelines to fetch relevant information at query time. This requires maintaining embedding indexes of knowledge bases, implementing semantic search, and ranking results by relevance. The context engineer must tune the number of retrieved documents (k-value), chunk size, and overlap to balance comprehensiveness against token usage. Over-fetching wastes tokens on irrelevant content, while under-fetching leaves the model under-informed.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Context Injection Patterns</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Direct injection places context directly in the prompt template, suitable for static information like system instructions. This pattern works well for persona definitions, output format requirements, and fixed constraints that don't change between requests. The advantage is predictable token usage and zero latency for retrieval, but it wastes tokens on irrelevant information for tasks that don't need all injected content.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Conditional injection uses request parameters to selectively include context blocks. A customer support bot might inject different policy documents based on the detected issue category. This requires a routing layer that classifies the incoming query, then assembles the context from pre-defined blocks. The classification itself consumes tokens, so engineers must ensure the routing logic's token cost is justified by the context savings.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Conditional Context Injection</div>
          <pre className="whitespace-pre-wrap">
{`You are a technical support specialist for CloudHost Pro.

{{#if issue_type === "billing"}}
CONTEXT - BILLING POLICIES:
- Refunds processed within 5-7 business days
- Pro-rated adjustments available for plan downgrades
- Disputed charges require ticket within 60 days
{{/if}}

{{#if issue_type === "technical"}}
CONTEXT - TECHNICAL DOCS:
- API rate limits: 1000 req/hour on Starter, 10000 on Pro
- SSL certificate provisioning takes 15-30 minutes
- Database backups run daily at 02:00 UTC
{{/if}}

User Issue: {{user_message}}
Previous Context: {{conversation_summary}}`}
          </pre>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Compressed injection uses summarization models to condense long context into dense representations. Instead of injecting 3,000 tokens of conversation history, a smaller model summarizes it into 300 tokens preserving key decisions and facts. This pattern is essential for applications with long-running conversations or when incorporating lengthy documents. The compression step adds latency but dramatically reduces token costs and improves model focus on essential information.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Context Prioritization Strategies</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Recency weighting leverages the model's attention patterns by placing the most critical information near the prompt's end. Task instructions, output format requirements, and immediate constraints should occupy the final 10-15% of the context window. This "footer" position ensures the model reads these instructions just before generating, reducing the chance of attention drift during long context processing.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Relevance scoring uses embedding similarity to rank context chunks by their semantic relationship to the current query. Chunks with higher similarity scores receive priority placement in the context window, while low-scoring chunks are truncated first when approaching token limits. This requires computing cosine similarity between query embeddings and context chunk embeddings, adding computational overhead but significantly improving output quality for retrieval-heavy applications.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Prioritized Context Ordering</div>
          <pre className="whitespace-pre-wrap">
{`SYSTEM: You are a legal document analyst.

RETRIEVED CONTEXT (ranked by relevance):
[Score: 0.92] Section 7.3: "Termination for cause requires 30-day written notice..."
[Score: 0.87] Section 12.1: "Liability capped at fees paid in prior 12 months..."
[Score: 0.71] Section 2.4: "Governing law shall be Delaware unless..."
[Score: 0.45] Section 15.8: "Force majeure events include natural disasters..."

TASK (highest priority - place at end):
Analyze the provided contract section for termination clauses.
Output a structured JSON with: clause_found (boolean), section_references (array), summary (string).`}
          </pre>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          The "lost in the middle" phenomenon causes models to ignore information placed in the center of long contexts. Context engineers mitigate this by either keeping contexts short enough to avoid large middle sections, or by repeating critical information at both the start and end of the context window. For contexts exceeding 4,000 tokens, consider splitting into multiple focused prompts rather than relying on a single long context that dilutes attention.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Real-World Implementation</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          A production code review assistant demonstrates context engineering in practice. The system injects the PR diff (500-2000 tokens), relevant repository files (retrieved via semantic search, capped at 3000 tokens), the project's style guide (800 tokens), and recent PR comments (1000 tokens). The context engineer tuned these allocations by measuring review accuracy against token usage, finding that style guide tokens had the highest ROI while repository file retrieval needed strict relevance filtering to avoid noise.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          E-commerce recommendation systems use context engineering to inject user browsing history, purchase patterns, and inventory data. The context window includes the last 20 viewed products (encoded as structured metadata, not raw page text), top-level category preferences, and current seasonal promotions. By compressing user history into structured tokens rather than natural language descriptions, these systems achieve 3x better recommendation relevance per token compared to narrative context formats.
        </p>
        <div className="border-l-4 border-[var(--accent)] pl-4 mb-4">
          <p className="text-[var(--accent-text)] font-medium">Context Engineering Tips:</p>
          <ul className="list-disc list-inside text-[var(--text-secondary)] mt-2 space-y-1">
            <li>Always measure token allocation ROI: which context blocks most improve output quality?</li>
            <li>Use structured formats (JSON, tables) over narrative text for dense information injection</li>
            <li>Implement context versioning to track which context combinations produce optimal results</li>
            <li>Monitor context window utilization rates and set alerts for approaching limits</li>
            <li>Test attention patterns by placing marker tokens and checking if outputs reference them</li>
          </ul>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Context engineering failures often manifest as subtle output degradation rather than obvious errors. A support bot might gradually become less accurate as conversation history grows, or a code assistant might start ignoring newer documentation in favor of older cached context. Regular context audits using controlled test cases help identify when context engineering parameters need adjustment as the application and its knowledge base evolve.
        </p>
      </section>
    </TopicLayout>
  );
}
