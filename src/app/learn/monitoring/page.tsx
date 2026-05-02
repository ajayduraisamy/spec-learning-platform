import TopicLayout from "@/components/TopicLayout";

export default function MonitoringPage() {
  return (
    <TopicLayout
      section="Advanced + Real World"
      lessonNumber="Lesson 25"
      title="Monitoring"
      currentHref="/learn/monitoring"
    >
      <section>
        <h2 className="text-xl font-semibold">What Is AI System Monitoring?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          AI system monitoring is the continuous observation and measurement of LLM-powered applications to ensure they are performing correctly, efficiently, and safely. Unlike traditional application monitoring, which focuses on infrastructure metrics (CPU, memory, error rates), AI monitoring must also measure output quality, prompt effectiveness, model behavior drift, cost efficiency, and safety compliance. These additional dimensions make AI monitoring significantly more complex and more critical.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The fundamental challenge of AI monitoring is that LLMs are non-deterministic. The same prompt can produce different outputs across runs, and model updates from the provider can change output behavior without any changes to your code. This means that a system that was working correctly yesterday may produce degraded output today, even though nothing in your infrastructure has changed. Continuous monitoring is the only way to detect these degradations before they impact users.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          AI monitoring encompasses four layers: infrastructure monitoring (server health, network latency, API availability), application monitoring (request rates, error rates, response times), LLM-specific monitoring (token usage, cost per request, model version, output quality scores), and business monitoring (user satisfaction, conversion rates, task completion rates). Each layer provides different signals about system health, and alerts should be configured across all layers.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The monitoring strategy must define what to measure, how to measure it, what thresholds trigger alerts, and what actions to take when alerts fire. A monitoring system that generates too many alerts creates alert fatigue (engineers ignore all alerts); one that generates too few misses critical issues. The balance is achieved by defining alert severity levels (P0: immediate action required, P1: action within 1 hour, P2: action within 1 day, P3: investigate during normal hours) and ensuring each alert level has a clear response procedure.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Monitoring Dimensions</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Output quality monitoring measures whether the LLM is producing correct, relevant, and complete outputs. Quality metrics include: accuracy (percentage of outputs that are factually correct), relevance (percentage of outputs that address the user's query), completeness (percentage of outputs that include all required information), and format compliance (percentage of outputs that match the expected format). Quality monitoring requires either automated evaluation (using a separate LLM as a judge, or rule-based validators) or human review (sampling outputs for manual assessment).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Model drift detection identifies when the LLM's behavior changes due to model updates from the provider. Providers occasionally update their models without changing the version number (silent updates), which can cause output quality to degrade. Drift detection compares current output quality against a baseline established before the suspected update. A significant drop in quality metrics (accuracy, relevance, completeness) indicates drift and triggers investigation.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Cost monitoring tracks the financial impact of LLM usage in real-time. Metrics include: total spend (daily, weekly, monthly), cost per request (by use case, by model, by team), token usage (input vs. output, by model), and cost per unit of business value (cost per resolved support ticket, cost per generated report). Cost monitoring enables budget management, anomaly detection (sudden cost spikes), and optimization opportunities (use cases with unusually high cost per request).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Safety monitoring ensures the LLM is not producing harmful, biased, or policy-violating outputs. Metrics include: toxicity score (percentage of outputs containing harmful content), bias score (percentage of outputs showing demographic bias), policy violation rate (percentage of outputs that violate company policy), and user report rate (percentage of outputs flagged by users as problematic). Safety monitoring requires automated content filters and human review of flagged outputs.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Monitoring Spec Example — AI Support Agent
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior SRE specializing in AI system observability and incident response.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Design the monitoring system for an AI customer support agent.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Infrastructure: server CPU, memory, disk, network, LLM API availability (health check every 30s). Application: request rate (req/min), error rate (%), response time (p50/p95/p99), queue depth. LLM: tokens per request (input/output), cost per request, model version, output quality score (auto-eval on 10% sample), cache hit rate. Business: resolution rate (%), customer satisfaction (CSAT score), escalation rate (% to human agent), response helpfulness (user rating 1-5).
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Dashboard specification (Grafana: infrastructure health, application metrics, LLM metrics, business metrics panels), alerting rules (P0: LLM API unavailable {'>'} 2 min, error rate {'>'} 20% for 5 min; P1: response time p95 {'>'} 10s for 10 min, cost {'>'} 150% of daily budget; P2: quality score drop {'>'} 10% week-over-week, CSAT drop {'>'} 0.5 points; P3: token usage increase {'>'} 20% month-over-month), data collection (per-request logging to ELK stack, metrics to Prometheus, traces to Jaeger), sampling strategy (100% logging for errors, 10% for quality evaluation, 1% for human review), retention (raw logs: 30 days, aggregated metrics: 1 year, quality evaluations: 6 months).
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The monitoring system covers all four layers of AI observability. Infrastructure monitoring ensures the underlying servers and LLM API are healthy. Application monitoring tracks the operational health of the support agent. LLM-specific monitoring measures the efficiency and quality of LLM interactions. Business monitoring connects AI performance to customer outcomes.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The alerting rules are tiered by severity to prevent alert fatigue. P0 alerts indicate system outages that require immediate action. P1 alerts indicate significant degradation that requires action within an hour. P2 alerts indicate quality concerns that require investigation within a day. P3 alerts indicate trends that should be reviewed during normal operations. Each alert level has a defined response time and escalation path.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The sampling strategy balances monitoring coverage with cost. Every error is logged (100% sampling) because errors are rare and each one needs investigation. Quality evaluation runs on 10% of requests (using an automated LLM-as-a-judge) to provide a statistically significant quality score without evaluating every request. Human review covers 1% of requests to validate the automated quality scores and catch issues the automated evaluator misses.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A financial advice AI used monitoring to detect model drift within 2 hours of an OpenAPI model update. The automated quality evaluation (running on 10% of requests) detected a 15% drop in accuracy for financial regulation questions. The P2 alert triggered an investigation that revealed the model update had changed how it interpreted "fiduciary duty" in the context of investment advice. The team switched to the previous model version within 4 hours, before any incorrect advice reached customers. Without monitoring, this drift would have gone undetected for weeks.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A code generation tool used monitoring to optimize their cost structure. The cost dashboard revealed that 30% of their LLM spend was on requests that could be served from cache but were not being cached due to overly strict matching criteria. By relaxing the semantic similarity threshold from 0.99 to 0.95, they increased the cache hit rate from 15% to 35%, reducing monthly costs by $18,000. The quality evaluation confirmed that the relaxed threshold did not degrade output quality (cached responses were still accurate for 99.2% of queries).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for AI Monitoring</h2>
        <div className="mt-4 space-y-3">
          {[
            "Monitor output quality continuously. LLM behavior can change without any code changes on your side. Automated quality evaluation on a sample of requests is the only way to detect degradation.",
            "Define alert thresholds based on user impact, not technical metrics. An alert should fire when users are affected, not when a metric crosses an arbitrary number.",
            "Use tiered alerting (P0-P3) to prevent alert fatigue. Not every issue requires immediate attention. Route P0/P1 to PagerDuty, P2/P3 to email or Slack.",
            "Sample strategically. Log 100% of errors, 10% for quality evaluation, 1% for human review. This provides comprehensive coverage without prohibitive cost.",
            "Track model version with every request. When a provider updates their model, you need to know which requests were affected and whether quality changed.",
            "Connect AI metrics to business outcomes. Monitor resolution rate, customer satisfaction, and task completion alongside technical metrics. Technical health without business health is incomplete.",
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
