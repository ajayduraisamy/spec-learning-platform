import TopicLayout from "@/components/TopicLayout";

export default function ScalingAIPage() {
  return (
    <TopicLayout
      section="AI Systems"
      lessonNumber="Lesson 10 of 10"
      title="Scaling AI"
      currentHref="/learn/scaling-ai"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Is Scaling AI Systems?</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Scaling AI systems means designing architectures that maintain performance, reliability, and cost-efficiency as workload increases across three dimensions: request volume (more users), task complexity (more sophisticated agent workflows), and data scale (larger knowledge bases and context windows). A system that works flawlessly with 10 requests per hour may fail catastrophically at 10,000 requests per hour due to rate limits, context window overflow, memory leaks, or cascading timeouts. Spec engineering for scaling defines throughput targets, latency budgets, cost caps, and degradation strategies that activate under load.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The three primary scaling dimensions each require different spec strategies. Horizontal scaling adds more instances of a service (more API keys, more container replicas) to handle increased request volume—specs define auto-scaling triggers (CPU > 70%, queue depth > 50) and instance limits (max 20 replicas to control costs). Vertical scaling increases resources per instance (more memory for larger context windows, faster GPUs for lower latency)—specs define resource requirements per workload type and max resource allocations. Data scaling manages growing vector databases, conversation histories, and cached embeddings—specs define partitioning strategies, index optimization rules, and archival policies for stale data.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          A critical but often overlooked aspect of scaling is prompt and context window management. As agents accumulate memory and retrieve more documents via RAG, context windows can exceed model limits, causing truncation or errors. Specs for scaling must define context budget allocation: "max 30% for system prompt, 40% for retrieved documents, 20% for conversation history, 10% for current query". When the budget is exceeded, specs define eviction policies: "drop oldest conversation messages first, then summarize remaining history to fit budget". Without these rules, scaled systems degrade unpredictably under load.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Cost scaling is equally important: a system processing 100 requests/day at $0.50/request costs $50/day; at 100,000 requests/day, the same per-request cost becomes $50,000/day, which is unsustainable. Specs for cost scaling define tiered model usage: "use gpt-3.5-turbo for 80% of classification tasks, gpt-4o only for complex reasoning tasks (20%)", caching strategies ("cache embedding results for 24 hours to avoid re-computation"), and circuit breakers ("if daily spend exceeds $500, switch to fallback rule-based system until midnight reset"). These specs ensure the system remains economically viable at scale.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Scaling Patterns and Strategies</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Request batching groups multiple inputs into a single LLM call to amortize API overhead. For embedding workloads (converting 1000 documents to vectors), batching 100 documents per call reduces API round-trips from 1000 to 10. Specs define batch size limits (max 100 per call for OpenAI embeddings API), timeout per batch, and error handling for partial batch failures ("if 3/100 documents fail, retry only the failed documents, not the entire batch").
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Caching prevents redundant LLM calls for identical or semantically similar inputs. Prompt caching stores recent LLM responses keyed by (model, prompt_hash) with a TTL of 5-60 minutes. Semantic caching uses vector similarity to detect near-duplicate queries: "if new query has > 0.95 cosine similarity to a cached query from the last 10 minutes, return cached response". Specs define cache key generation (include model, temperature, and prompt), TTL values per cache tier, and invalidation rules (invalidate all caches when knowledge base updates).
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Async processing decouples request intake from response generation for long-running tasks. A user submits a document for analysis, receives a task ID immediately, and the system processes the task in the background using a queue (Redis, SQS, RabbitMQ). Specs define queue priorities (high-value customers get priority queue), max queue wait time (2 hours before timeout and fallback), and result delivery (webhook notification, polling endpoint, or email). This pattern scales to thousands of concurrent requests without blocking the API gateway.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Model distillation and routing uses smaller, cheaper models for simple tasks and reserves expensive models for complex cases. A two-tier routing spec might state: "first pass with gpt-3.5-turbo; if confidence < 80% or classification is 'complex', escalate to gpt-4o". Confidence scoring requires the LLM to output a confidence value alongside its response: "Output JSON: {answer, confidence: 0.0-1.0}". This pattern reduces average cost per request by 60-80% while maintaining quality for complex cases that need the larger model.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Spec Example: Scalable Document Processing System</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Production spec for a document processing system scaling to 100,000+ documents/month:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">SCALING SPEC: Doc Processor v2.5</div>
          <div className="text-[var(--accent-text)]">THROUGHPUT TARGET:</div>
          <div className="mb-1">100,000 docs/month, peak 500 docs/hour. Auto-scale workers: min 2, max 50, scale-up at queue &gt; 100.</div>
          <div className="text-[var(--accent-text)]">MODEL TIERS:</div>
          <div className="mb-1">Tier 1 (80% traffic): gpt-3.5-turbo, $0.50/M tokens, confidence threshold 80%</div>
          <div className="mb-1">Tier 2 (20% traffic): gpt-4o, $5/M tokens, used when Tier 1 confidence &lt; 80%</div>
          <div className="text-[var(--accent-text)]">CACHING:</div>
          <div className="mb-1">- Embedding cache: 24h TTL, key = SHA256(text), store in Redis</div>
          <div className="mb-1">- Classification cache: 60m TTL, key = (model, prompt_hash), store in Redis</div>
          <div className="text-[var(--accent-text)]">CONTEXT BUDGET (4096 tokens max):</div>
          <div className="mb-1">- System prompt: 800 tokens (20%), Docs: 2400 tokens (60%), History: 800 tokens (20%)</div>
          <div className="text-[var(--accent-text)]">COST CAPS:</div>
          <div>Daily: $500 max. If exceeded, pause new tasks, complete in-progress, notify ops team.</div>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">Poor scaling spec:</p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">BAD SCALING SPEC:</div>
          <div className="mb-2">Handle more documents. Use more instances. Cache stuff. Don't spend too much.</div>
          <div className="text-[var(--text-secondary)] text-xs mt-2">// No throughput targets, no model tiers, no cache TTL, no cost caps. System will hit rate limits, blow cost budgets, and provide no scaling visibility.</div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Code Example: Scalable Embedding Pipeline</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Implementation of a batched, cached, and rate-limited embedding pipeline:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          {`class ScalableEmbeddingPipeline {
  private cache = new RedisCache({ ttlSec: 86400 }); // 24h TTL
  private rateLimiter = new RateLimiter({ requestsPerMinute: 3000 });

  async embedDocuments(texts: string[]): Promise<number[][]> {
    const results: number[][] = [];
    const uncached: { text: string; index: number }[] = [];

    // Check cache first
    for (let i = 0; i < texts.length; i++) {
      const key = sha256(texts[i]);
      const cached = await this.cache.get(key);
      if (cached) { results[i] = JSON.parse(cached); continue; }
      uncached.push({ text: texts[i], index: i });
    }

    // Batch uncached texts, respecting rate limits
    const batches = chunk(uncached, 100); // max 100 per API call
    for (const batch of batches) {
      await this.rateLimiter.acquire(batch.length);
      const embeddings = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: batch.map(b => b.text)
      });

      for (let j = 0; j < batch.length; j++) {
        const key = sha256(batch[j].text);
        await this.cache.set(key, JSON.stringify(embeddings.data[j].embedding));
        results[batch[j].index] = embeddings.data[j].embedding;
      }
    }
    return results.filter(r => r !== undefined);
  }
}`}
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          This pipeline follows the scaling spec: caches embeddings for 24 hours to avoid redundant API calls, batches requests in groups of 100 to respect API limits, and uses a rate limiter to prevent hitting the 3000 requests/minute cap. The spec would define cache TTL, batch size, rate limit values, and error handling for partial batch failures (retry only failed items).
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Real-World Use Cases</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Customer support at scale: A telecom handles 500,000 support interactions/month. Specs define: Tier 1 (75% of queries) handled by RAG + gpt-3.5-turbo ($0.50/M tokens), Tier 2 (20%) escalated to gpt-4o ($5/M tokens), Tier 3 (5%) routed to human agents. Caching stores common query embeddings for 12 hours. Auto-scaling adds RAG instances when queue depth exceeds 200, up to 100 instances during peak hours.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Content moderation at scale: A social platform processes 10M posts/day. Specs define: first pass with distilled BERT model ($0.01/M tokens, 50ms latency), second pass with gpt-3.5-turbo for flagged content ($0.50/M tokens), third pass with gpt-4o for appeals ($5/M tokens). Async processing queues posts for moderation with 30-second SLA for high-priority content. Cost cap: $20,000/day, with automatic downgrade to keyword filtering if exceeded.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Enterprise search at scale: A company indexes 1M documents in a RAG system. Specs define: vector index partitioned by department (Engineering, Sales, HR), hybrid search (keyword + semantic) with 50% weight each, embedding cache with 7-day TTL. Autoscaling adds vector DB read replicas when QPS exceeds 500. Context budget: 60% for retrieved docs, 30% for conversation history, 10% for system prompt. Max latency: 2 seconds per query at p95.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tips for Scaling Specs</h2>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 mb-6">
          <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-3">
            <li>Define explicit throughput and latency targets: "handle 1000 requests/hour with p95 latency < 2s" gives concrete goals for scaling decisions.</li>
            <li>Use tiered model strategies: route 70-80% of requests to cheap models, reserve expensive models for complex cases. This cuts costs by 60%+ at scale.</li>
            <li>Set cache TTLs based on data freshness: embeddings for static docs can cache for days; dynamic content should cache for minutes or not at all.</li>
            <li>Specify context budget allocations: define exact token budgets per component (system prompt, docs, history) to prevent context overflow at scale.</li>
            <li>Include cost caps with degradation strategies: "if daily spend > $500, switch to fallback rule-based system" prevents runaway costs.</li>
            <li>Test with load simulations: simulate 10x, 100x normal traffic to identify bottlenecks (rate limits, DB connection pools, memory leaks) before they hit production.</li>
          </ul>
        </div>
      </section>
    </TopicLayout>
  );
}