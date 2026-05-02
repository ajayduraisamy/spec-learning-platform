import TopicLayout from "@/components/TopicLayout";

export default function MemorySystemsPage() {
  return (
    <TopicLayout
      section="AI Systems"
      lessonNumber="Lesson 5 of 10"
      title="Memory Systems"
      currentHref="/learn/memory-systems"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Are Memory Systems in AI?</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Memory systems give AI agents the ability to retain, recall, and reason over information across interactions, sessions, and evolving contexts. Without memory, every agent interaction is stateless—the agent forgets everything from the previous turn, including user preferences, prior decisions, discovered facts, and intermediate work products. Memory transforms agents from transactional tools into persistent assistants that accumulate knowledge, learn from past mistakes, and maintain continuity across days or weeks of interaction. Spec engineering for memory systems defines what to store, how to store it, when to retrieve it, and when to forget it.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          AI memory systems draw from three paradigms: short-term (working) memory, long-term episodic memory, and semantic memory. Short-term memory holds the current conversation context and active task state—typically stored in the LLM's context window or a temporary state object. Episodic memory stores specific past events: user conversations, task executions, and tool call results, indexed by timestamp and retrievable via semantic search. Semantic memory stores extracted facts, user preferences, and domain knowledge in a structured format (key-value, graph, or vector store) that persists indefinitely. Each memory type serves different retrieval needs and requires different spec definitions.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The core challenge in memory system design is relevance filtering—retrieving the right memories without overwhelming the context window. A customer support agent with 6 months of interaction history cannot load all past conversations into a single prompt. Instead, the memory system must index past interactions, extract salient facts (user is a premium customer, prefers email contact, has a recurring billing issue), and retrieve only relevant memories for each interaction. Spec engineering defines extraction rules (what facts to persist), retrieval triggers (which user queries should trigger memory lookup), and context injection limits (max N memories per interaction).
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Memory systems also require expiration and privacy policies. Sensitive information like credit card numbers or health data should have auto-expiration (e.g., delete after 30 days) or never be stored in long-term memory. Specs must define data classification rules: "never store strings matching credit card regex in long-term memory", "expire session memory after 30 minutes of inactivity", "anonymize user emails before storing episodic memories". These policies protect user privacy while preserving useful context for the agent's work.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Memory Architecture Patterns</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          The most common memory architecture is the buffered context window approach: recent N messages are kept in full, older messages are summarized or discarded. Specs define buffer size (e.g., "keep last 20 messages, summarize older messages into a 500-token summary refreshed every 10 messages"). This approach is simple but loses detail over time. For agents needing precise recall of past facts, a hybrid approach combines the buffer with a vector search over episodic memories—the agent retrieves relevant past interactions when the current query relates to past topics.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Structured memory stores facts as key-value pairs or graph relationships. For example, a user memory store might contain {"user_id": "123", "tier": "premium", "preferred_language": "es", "open_tickets": 2}. Specs define fact extraction prompts: "From the conversation, extract user preferences, account details, and open issues in JSON format". The structured format enables precise retrieval (fetch user tier without semantic search) and easy updates (update preferred_language without rewriting the entire memory). Graph memories add relationship tracking: "user 123 reported issue with order ORD-789" creates a relationship useful for later queries about that order.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Memory consolidation is the process of moving information from short-term to long-term storage. Not all short-term information should be consolidated—transient information like "user asked about today's weather" has no long-term value. Specs define consolidation triggers: "after task completion, extract: user preferences, new facts about the user, unresolved issues". A consolidation prompt might read: "Review the conversation. Extract any new user preferences, account details, or ongoing issues. Return JSON with only new/changed facts." This keeps long-term memory focused on durable, actionable information.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Memory retrieval must balance recall and precision. Over-retrieval fills the context with irrelevant memories, wasting tokens and confusing the LLM. Under-retrieval causes the agent to ask redundant questions or repeat past mistakes. Specs define retrieval strategies: "for billing queries, retrieve memories tagged 'billing' or 'payment'; for technical support, retrieve memories tagged 'technical' and the last 3 tool call results". Tagging memories at write time enables targeted retrieval at read time without expensive semantic search for every interaction.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Spec Example: Customer Memory System</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Production spec for a support agent's memory system with three memory tiers:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">MEMORY SYSTEM:</div>
          <div className="mb-2">Support Agent Memory v2.3</div>
          <div className="text-[var(--accent-text)]">SHORT-TERM (Context Window):</div>
          <div className="mb-1">Buffer: last 15 messages in full. Older messages: rolling summary (max 400 tokens), updated every 5 messages.</div>
          <div className="text-[var(--accent-text)]">EPISODIC (Vector Store):</div>
          <div className="mb-1">Store: Full conversation transcripts, tagged by topic (billing, technical, shipping). Index embedding: text-embedding-3-small.</div>
          <div className="mb-1">Retrieval: On conversation start, retrieve top 3 past conversations with &gt;0.7 similarity to current query topic.</div>
          <div className="text-[var(--accent-text)]">SEMANTIC (Structured Store):</div>
          <div className="mb-1">Store: {"{user_id, tier, language, issues: [], preferences: {}}"}</div>
          <div className="mb-1">Extraction: After each conversation, run extraction prompt. Update only changed fields.</div>
          <div className="mb-1">Expiration: Sensitive fields (payment_method) expire after 90 days. Tier updates immediately replace old value.</div>
          <div className="text-[var(--accent-text)]">PRIVACY RULES:</div>
          <div>Never store: credit card numbers (regex: \d{4}-\d{4}-\d{4}-\d{4}), passwords, or health data. Anonymize emails before episodic storage.</div>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">Poor spec:</p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">BAD MEMORY SPEC:</div>
          <div className="mb-2">Remember conversations. Use memory for context. Don't forget the user.</div>
          <div className="text-[var(--text-secondary)] text-xs mt-2">// No memory tiers, no retrieval rules, no privacy rules, no expiration. Will store sensitive data and retrieve irrelevant conversations.</div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Code Example: Three-Tier Memory System</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Implementation of a memory system with short-term buffer, episodic vector store, and structured semantic store:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          {`type MemoryTier = 'short' | 'episodic' | 'semantic';

class MemorySystem {
  private shortTerm: Message[] = [];
  private episodicStore: VectorDB;
  private semanticStore: Record<string, any>;

  async addToShortTerm(message: Message) {
    this.shortTerm.push(message);
    if (this.shortTerm.length > 15) {
      const old = this.shortTerm.splice(0, this.shortTerm.length - 15);
      const summary = await llm.summarize(old); // spec: max 400 tokens
      this.shortTerm.unshift({ role: 'system', content: summary });
    }
  }

  async addToEpisodic(conversation: Message[], tags: string[]) {
    const embedding = await embedModel.embed(conversation.map(m => m.content).join(' '));
    await this.episodicStore.upsert({
      vector: embedding,
      metadata: { tags, timestamp: Date.now(), content: JSON.stringify(conversation) }
    });
  }

  async getRelevantMemories(query: string, tags?: string[]): Promise<string> {
    const embedding = await embedModel.embed(query);
    const results = await this.episodicStore.search(embedding, { topK: 3, minScore: 0.7, filters: { tags: { $in: tags } } });
    return results.map(r => r.metadata.content).join('\\n---\\n');
  }
}`}
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          This implementation follows the spec: short-term maintains a 15-message buffer with rolling summaries, episodic stores conversations with topic tags and retrieves by semantic similarity with a 0.7 threshold, and semantic uses a simple key-value store. The spec would define the summarization prompt ("summarize to max 400 tokens, preserve user preferences and unresolved issues"), extraction prompt for semantic facts, and tag taxonomy for episodic storage.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Real-World Use Cases</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Personal AI assistants: Memory systems track user calendar preferences (meeting times, buffer between meetings), communication style (formal vs casual), and recurring tasks (weekly reports every Monday). Episodic memory stores past decision rationales ("user rejected vendor X due to late deliveries in March 2025"), preventing repeated bad recommendations. Semantic memory stores structured facts like "user's manager is Sarah Chen, budget approval limit is $10,000".
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Medical diagnosis agents: Episodic memory stores patient visit transcripts, lab results, and prescribed treatments. Semantic memory stores extracted facts: allergies, chronic conditions, current medications, and family history. Retrieval rules prioritize recent lab results and active prescriptions. Privacy specs enforce "delete visit transcripts after 7 years per HIPAA; never store SSN in episodic memory; encrypt semantic facts at rest".
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Code review agents: Memory systems track developer-specific patterns: "developer A frequently forgets null checks", "developer B prefers functional patterns". Episodic memory stores past review comments and whether the developer addressed them. Semantic memory stores team coding standards and the developer's past adherence score. Retrieval triggers: "on new PR from developer A, retrieve last 5 reviews to check for recurring null check issues".
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tips for Memory System Specs</h2>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 mb-6">
          <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-3">
            <li>Define what NOT to store: sensitive data, transient information, and redundant facts. Memory bloat degrades retrieval quality and increases costs.</li>
            <li>Set explicit context window budgets: "short-term memory max 30% of context; retrieved episodic memories max 40%; leave 30% for prompt and response".</li>
            <li>Use tagging at write time: tag episodic memories by topic, priority, and data type to enable targeted retrieval without expensive filtering.</li>
            <li>Specify consolidation frequency: "consolidate to semantic memory after task completion, not after every message" to avoid excessive LLM calls for extraction.</li>
            <li>Include expiration policies: "episodic memories older than 1 year marked inactive; semantic facts contradicted by newer information are overwritten with timestamp".</li>
            <li>Test retrieval with edge cases: queries with no relevant memories, queries matching many memories, and queries containing PII that should trigger privacy filters.</li>
          </ul>
        </div>
      </section>
    </TopicLayout>
  );
}