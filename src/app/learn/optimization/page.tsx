import TopicLayout from "@/components/TopicLayout";

export default function OptimizationPage() {
  return (
    <TopicLayout
      section="Core Engineering"
      lessonNumber="Lesson 6 of 10"
      title="Optimization"
      currentHref="/learn/optimization"
    >
      <section>
        <h2 className="text-2xl font-bold mb-4">Token Economy and Cost Optimization</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Token optimization is the practice of achieving equal or better model outputs while consuming fewer tokens. Since LLM API costs scale linearly with token usage, a spec that uses 2000 tokens per request costs 10x more than one using 200 tokens, assuming identical output quality. The optimization mindset treats tokens as a finite budget that must be allocated strategically—every token must earn its place by contributing to output quality.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The first optimization target is redundant phrasing. Specs often accumulate phrases like "please provide," "I would like you to," and "if it's not too much trouble" that consume tokens without affecting outputs. Models respond identically to "Summarize this" and "I would really appreciate it if you could please summarize this document for me when you have a moment." Aggressive editing removes these filler tokens without impacting performance.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Semantic compression replaces verbose natural language with dense, structured formats. Instead of "The user is a premium subscriber who has been with us for three years and has opened five support tickets in the last month," use structured metadata: <code className="text-[var(--accent-text)]">{'{tier: "premium", tenure: 3y, tickets_30d: 5}'}</code>. The model parses structured data more reliably than narrative descriptions, while using 60-80% fewer tokens.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Few-shot example optimization requires balancing example count against token budget. Research shows 2-3 high-quality examples often match 5-10 mediocre examples for output quality. Each example should demonstrate a distinct pattern or edge case—redundant examples that show the same pattern waste tokens. A/B test example counts to find the quality plateau point where adding more examples yields diminishing returns.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Latency Optimization</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Latency directly impacts user experience—a spec that takes 8 seconds to generate feels broken compared to one that responds in 2 seconds. Time-to-first-token (TTFT) depends primarily on prompt length: longer prompts require more processing before the model starts generating. Optimizing TTFT means minimizing the tokens the model must process before beginning generation, which often means moving detailed instructions after the key task definition.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Output token optimization targets the generation phase. Instructing the model to "be concise" or "limit to 100 words" reduces both latency and cost. For structured outputs, specifying exact field counts prevents verbose explanations. A spec asking for "a JSON object with fields a, b, c" produces tighter output than "provide a detailed analysis in JSON format with comprehensive coverage," even though both request JSON.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Latency-Optimized Prompt</div>
          <pre className="whitespace-pre-wrap">
{`SLOW VERSION (high latency):
"Please provide a comprehensive and detailed analysis of the following code changes, including a thorough discussion of potential security implications, performance considerations, maintainability assessment, and detailed recommendations for improvement with extensive justification for each point..."

FAST VERSION (low latency):
"Review this diff. Output JSON: {security: bool, perf: bool, issues: string[], fixes: string[]}"`}
          </pre>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Caching strategies can dramatically reduce latency for repeated prompts. Many LLM APIs offer prompt caching that stores processed prompt prefixes, eliminating re-computation. To leverage caching, structure specs so static content (system instructions, examples, context documents) appears at the start, followed by dynamic content (user query). When the static prefix exceeds the caching threshold (often 1024 tokens), subsequent requests skip reprocessing that prefix.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Model Selection and Right-Sizing</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Model right-sizing matches task complexity to model capability. Using GPT-4 for simple classification tasks wastes money—a smaller model like GPT-3.5 or Claude Haiku can achieve 99% of the accuracy at 10% of the cost. The optimization strategy: prototype with the most capable model to establish quality baselines, then systematically test cheaper models to find the capability cliff where quality drops below acceptable thresholds.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Hybrid architectures use different models for different chain steps. A document processing pipeline might use a cheap model for initial classification ("is this a contract or invoice?"), a mid-tier model for extraction ("get all dates and amounts"), and a premium model only for complex reasoning ("assess termination risk"). This tiering can reduce total costs by 60-80% compared to using the premium model for all steps.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Self-consistency optimization runs multiple cheaper model instances instead of one expensive one. Three GPT-3.5 calls with temperature=0.7 (cost: ~$0.003) can outperform one GPT-4 call (cost: ~$0.06) for tasks like classification where majority voting improves accuracy. This "ensemble of cheap models" pattern works well for high-volume, low-complexity tasks where marginal accuracy gains justify the slight latency increase.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Prompt Compression Techniques</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Instruction compression rewrites verbose directives into minimal forms that preserve meaning. "You are an assistant that always thinks carefully about the user's question, considers multiple perspectives, and provides a well-reasoned response" compresses to "Be a thoughtful, multi-perspective analyst." The compressed version uses 40% of the tokens while triggering the same model behaviors through more precise keyword activation.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Context summarization compresses retrieved documents before injection. Instead of injecting 3000 tokens of search results, a small model summarizes them into 300 tokens of key facts. This pre-summarization step adds latency but reduces main prompt token count. For long conversations, summary chains compress message history: "Summarize the conversation so far in 200 words" runs periodically, replacing the raw message history with the evolving summary.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Compressed Context Injection</div>
          <pre className="whitespace-pre-wrap">
{`Instead of injecting raw docs (3000 tokens):
---
DOCUMENT 1: (800 tokens of policy text)
DOCUMENT 2: (700 tokens of policy text)
DOCUMENT 3: (600 tokens of policy text)
...

Inject summarized context (400 tokens):
---
KEY POLICY FACTS:
- Refunds: 7-day window, pro-rated
- Cancellation: 30-day notice required
- Data export: available on Pro+ tiers
- SLA: 99.9% uptime, credits for downtime`}
          </pre>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Dynamic truncation removes low-value context when approaching token limits. Implement relevance scoring that ranks context chunks and drops the lowest-scoring chunks when the token budget is exceeded. This is superior to naive truncation (which cuts from the middle or end) because it preserves the most relevant information. The scoring function should be tuned to your specific domain—what's "relevant" varies by application.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Measuring Optimization Impact</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Optimization without measurement is guesswork. Track three metrics: token count (input + output), latency (p50, p95, p99), and quality score (task-specific accuracy, format compliance, user satisfaction). Plot these as you iterate on prompts. The goal is moving the Pareto frontier—reducing tokens and latency while maintaining or improving quality. If optimization reduces tokens by 50% but drops quality by 30%, it's a net loss.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          A/B testing validates optimization decisions with real traffic. Route 5% of requests to the optimized spec and compare metrics against the control group. Statistical significance requires sufficient sample size—typically 1000+ requests per variant for stable metrics. Roll out only when the optimized version shows equal or better quality at lower cost/latency. Premature rollout of "optimizations" that haven't been validated is a common source of production incidents.
        </p>
        <div className="border-l-4 border-[var(--accent)] pl-4 mb-4">
          <p className="text-[var(--accent-text)] font-medium">Optimization Tips:</p>
          <ul className="list-disc list-inside text-[var(--text-secondary)] mt-2 space-y-1">
            <li>Measure before optimizing—optimizing the wrong metric wastes effort</li>
            <li>Set token budgets per task type and refuse to exceed them during development</li>
            <li>Use structured formats (JSON, tables) instead of prose for information-dense context</li>
            <li>Test optimization impact on edge cases—compressed prompts often fail on rare inputs</li>
            <li>Remember: the cheapest token is the one you don't use—can you solve the task without LLMs?</li>
          </ul>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          The ultimate optimization is task elimination: many LLM use cases can be replaced with deterministic code, cached responses, or simpler ML models. A "sentiment analysis" task using a $0.03/1K-token GPT-4 call might be solvable with a $0.0001/1K-token BERT classifier or even keyword matching. Before optimizing a spec, ask whether the task needs an LLM at all—that's the highest-leverage optimization of all.
        </p>
      </section>
    </TopicLayout>
  );
}
