import TopicLayout from "@/components/TopicLayout";

export default function CostOptimizationPage() {
  return (
    <TopicLayout
      section="Advanced + Real World"
      lessonNumber="Lesson 23"
      title="Cost Optimization"
      currentHref="/learn/cost-optimization"
    >
      <section>
        <h2 className="text-xl font-semibold">What Is AI Cost Optimization?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          AI cost optimization is the systematic reduction of LLM expenses while maintaining output quality and system reliability. It encompasses model selection, prompt engineering, caching strategies, token management, request batching, and architectural decisions that collectively determine the cost per request and total monthly spend. For organizations processing millions of requests, cost optimization can mean the difference between a profitable product and a financial liability.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The cost equation for LLM-based systems is straightforward but often misunderstood: cost = (input tokens + output tokens) {'*'} price per token {'*'} number of requests. Each of these three factors can be optimized independently. Input tokens can be reduced through prompt optimization and context window management. Output tokens can be reduced through output format constraints and response truncation. The price per token can be reduced through model selection and volume discounts.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The most effective cost optimization strategies combine multiple techniques. A system that uses model routing (60% of requests to cheaper models), semantic caching (25% of requests served from cache), prompt optimization (30% token reduction), and output constraints (20% output token reduction) achieves a combined cost reduction of approximately 75% compared to the baseline of using the most expensive model for every request with no optimization.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Cost optimization must never compromise output quality below acceptable thresholds. The goal is to find the most cost-effective configuration that meets quality requirements, not the cheapest configuration regardless of output quality. This requires continuous evaluation: measuring output quality alongside cost, and adjusting the optimization strategy when quality falls below the defined threshold.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Cost Optimization Strategies</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Model tiering is the most impactful cost optimization technique. By categorizing requests into tiers based on complexity, you can route simple tasks to cheaper models and reserve expensive models for complex reasoning. A typical tiering scheme: Tier 1 (classification, extraction, formatting) uses claude-3-haiku or gpt-3.5-turbo at $0.25-$0.50 per million tokens; Tier 2 (summarization, analysis, generation) uses gpt-4o-mini or claude-3-sonnet at $1-$3 per million tokens; Tier 3 (complex reasoning, creative writing, multi-step analysis) uses gpt-4o or claude-3-opus at $5-$15 per million tokens. This tiered approach typically reduces average cost per request by 50-70%.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Caching eliminates redundant LLM calls by storing and reusing responses for identical or semantically similar queries. Exact-match caching (keyed by prompt hash) is simple and effective for repetitive queries, with typical hit rates of 10-20%. Semantic caching (keyed by embedding similarity) extends this to similar queries, increasing hit rates to 25-40%. The cache TTL should match the data freshness requirements: static content can cache for days, dynamic content for minutes, and real-time data should not be cached.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Prompt optimization reduces input token count through systematic techniques: removing redundant instructions (often 15-25% of prompt tokens), using concise examples (1-shot instead of 3-shot reduces examples by 66%), replacing verbose descriptions with structured formats (JSON schema instead of prose descriptions), and leveraging system messages for persistent instructions (not repeated in each user message). Combined, these techniques typically reduce input tokens by 20-40%.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Output token management controls the length of LLM responses through explicit constraints: max_tokens parameter limits, output format specifications that constrain response length, and response truncation for overly verbose outputs. For tasks that produce structured output (JSON, classifications), the output token count is predictable and can be optimized by using compact formats (abbreviated field names, minimal whitespace). For free-text generation, output constraints should balance cost with completeness.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Cost Optimization Spec — Support Ticket Classification
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Baseline"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Model: gpt-4o, Input: 500 tokens, Output: 50 tokens, Cost/request: $0.005, Daily requests: 10,000, Daily cost: $50
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Optimization Target"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Reduce daily cost by 60% (to $20/day) while maintaining {'>='} 95% classification accuracy.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Optimization Plan"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                1. Model routing: switch to gpt-3.5-turbo for 80% of requests (simple classifications), keep gpt-4o for 20% (ambiguous cases). Router: confidence score {'>='} 0.8 goes to gpt-3.5-turbo, {'<'} 0.8 goes to gpt-4o. 2. Prompt optimization: reduce input tokens from 500 to 300 (40% reduction) by removing redundant examples, using compact format. 3. Semantic caching: cache similar tickets (cosine similarity {'>'} 0.95, 24h TTL), target 20% cache hit rate. 4. Output constraints: restrict output to single JSON object with category, confidence, reasoning (max 100 tokens instead of 50).
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Expected Cost Breakdown"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                80% requests (8,000): gpt-3.5-turbo, 300+100 tokens = $0.00032/request = $2.56/day. 20% requests (2,000): gpt-4o, 300+100 tokens = $0.002/request = $4.00/day. Cache hits (2,000): $0. Total: $6.56/day (87% reduction). Quality check: evaluate all three models on golden dataset (500 examples), verify accuracy {'>='} 95% before deployment.
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The cost optimization plan achieves an 87% reduction (from $50/day to $6.56/day) through four complementary techniques. Model routing handles the largest savings: by routing 80% of requests to gpt-3.5-turbo (which costs 10x less than gpt-4o for this task), the average cost per request drops dramatically. The confidence score router ensures that only ambiguous cases (where the cheaper model might make errors) are sent to the expensive model.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Prompt optimization reduces the input token count from 500 to 300 by eliminating redundant instructions, using a single concise example instead of three verbose examples, and formatting the classification schema as compact JSON instead of prose descriptions. This 40% reduction applies to all requests, regardless of model, amplifying the savings from model routing.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Semantic caching eliminates 20% of LLM calls entirely by serving cached responses for similar tickets. Support tickets are often repetitive (the same issue reported by multiple users), making them ideal candidates for caching. The 24-hour TTL balances freshness (new issues get fresh classification) with cache hit rate (common issues are cached). The cosine similarity threshold of 0.95 ensures that only truly similar tickets receive cached responses.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 2: Enterprise Cost Dashboard Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Cost optimization requires visibility. A cost dashboard spec defines the metrics, granularity, and alerting thresholds needed to manage LLM spending effectively.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Cost Dashboard Spec — Enterprise LLM Spend Tracking
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Design a cost tracking and alerting system for enterprise LLM usage.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Metrics to track: total spend (daily, weekly, monthly), cost per request (by use case, by team, by model), token usage (input vs. output, by model), cache savings (requests served from cache, tokens saved), model routing distribution (percentage of requests per model tier), quality scores (by use case, by model). Granularity: per-request logging with request_id, user_id, use_case, model, input_tokens, output_tokens, cost, latency, cache_hit, quality_score. Budget: $10,000/month, divided by team (Team A: $3K, Team B: $2K, Team C: $2K, Team D: $1.5K, Reserve: $1.5K). Alerts: team exceeds 80% of monthly budget (warning), team exceeds 100% (critical), cost per request increases by {'>'} 20% week-over-week (investigation), any single request costs {'>'} $0.10 (anomaly detection).
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Dashboard specification (Grafana panels: daily spend trend, cost breakdown by model/team/use-case, top 10 most expensive use cases, cache hit rate trend, model routing distribution), alerting configuration (Slack notifications for warnings, PagerDuty for critical alerts, email for daily summary), cost optimization recommendations engine (automated suggestions: "Use case X has 90% cache misses, consider caching similar requests", "Team Y uses gpt-4o for 80% of requests, evaluate if gpt-3.5-turbo is sufficient"). Include: cost attribution rules (how costs are assigned to teams and use cases), data retention policy (raw request logs: 30 days, aggregated metrics: 1 year), and privacy controls (PII redaction from request logs).
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          This cost dashboard spec provides complete visibility into LLM spending at every level: per-request, per-use-case, per-team, and per-model. The budget allocation ensures that each team has a clear spending limit, and the alerting thresholds provide early warning before budgets are exceeded. The automated recommendations engine identifies cost optimization opportunities that might not be visible in raw metrics, such as use cases with low cache hit rates or teams over-relying on expensive models.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A document processing company used cost optimization to reduce their monthly LLM spend from $250,000 to $45,000 (82% reduction) while maintaining document analysis quality. They implemented: model tiering (simple document classification to gpt-3.5-turbo, complex contract analysis to gpt-4o), batch processing (grouping 50 documents per API call instead of 1 per call, reducing API overhead by 98%), prompt optimization (reducing input tokens by 45% through template compression), and caching (caching analysis results for standard document templates, achieving 35% cache hit rate). The cost dashboard identified that 40% of their spend was on a single use case (invoice extraction) that could be handled by a fine-tuned open-source model, which they subsequently deployed, saving an additional $15,000/month.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A SaaS company with an AI writing assistant used cost optimization to achieve profitability. Their baseline cost was $0.08 per user request (gpt-4o, average 800 input + 400 output tokens), which exceeded their $0.05 revenue per request. They implemented: model routing (80% of requests to gpt-3.5-turbo at $0.008/request, 20% to gpt-4o at $0.06/request, average $0.018/request), caching (25% of requests served from cache at near-zero cost), and output constraints (limiting responses to 200 tokens for simple completions, saving 50% on output tokens). The optimized cost was $0.014 per request, well below the $0.05 revenue, enabling profitability at scale.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Cost Optimization</h2>
        <div className="mt-4 space-y-3">
          {[
            "Start with measurement. You cannot optimize what you do not measure. Implement per-request cost tracking before making any changes. Baseline your current costs by use case, model, and team.",
            "Optimize in order of impact: model routing (50-70% savings), caching (20-40% savings), prompt optimization (20-40% savings), output constraints (10-30% savings), batching (50-90% API overhead reduction).",
            "Never optimize below quality thresholds. Define the minimum acceptable quality for each use case and measure it alongside cost. If optimization degrades quality below the threshold, revert and try a different technique.",
            "Use the cheapest model that meets quality requirements. Benchmark every use case against multiple models. Many tasks that teams assume require GPT-4 perform equally well on GPT-3.5-turbo.",
            "Cache aggressively but intelligently. Set TTLs based on data freshness, not arbitrarily. Static content can cache for days; dynamic content for minutes. Monitor cache hit rates and adjust TTLs.",
            "Review costs weekly, not monthly. Cost anomalies compound over time. Weekly reviews catch issues early, before they become expensive problems.",
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
