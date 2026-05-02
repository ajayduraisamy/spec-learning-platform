import TopicLayout from "@/components/TopicLayout";

export default function ProductionSystemsPage() {
  return (
    <TopicLayout
      section="Advanced + Real World"
      lessonNumber="Lesson 21"
      title="Production Systems"
      currentHref="/learn/production-systems"
    >
      <section>
        <h2 className="text-xl font-semibold">What Are Production-Ready AI Systems?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Production-ready AI systems are LLM-powered applications that have been engineered to handle real-world traffic, failure modes, security threats, and operational requirements. They go far beyond the "it works on my machine" stage to address latency budgets, error recovery, cost management, monitoring, versioning, and graceful degradation under load. The gap between a prototype and a production system is typically 5-10x the effort of building the prototype.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The key insight is that production AI systems are not just about the LLM—they are about the entire infrastructure that surrounds it. This includes the API gateway that routes requests, the caching layer that reduces redundant calls, the queueing system that handles traffic spikes, the monitoring dashboard that tracks performance, the alerting system that pages engineers when things go wrong, and the deployment pipeline that rolls out new versions without downtime.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Spec engineering for production systems must address every component of this infrastructure. A production spec defines not only the LLM prompts and parameters but also the retry logic, circuit breakers, fallback models, rate limiting, request queuing, response caching, error logging, performance monitoring, and cost tracking. Each of these concerns is specified with explicit thresholds, configurations, and escalation procedures.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The most common production failure mode for AI systems is the "works until it doesn't" problem. A system that handles 100 requests per hour flawlessly may fail catastrophically at 10,000 requests per hour due to rate limit exhaustion, context window overflow, memory leaks, or cascading timeouts. Production specs prevent this by explicitly defining throughput targets, latency budgets, and degradation strategies that activate when the system approaches its limits.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Components of Production Specs</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A production spec must address eight critical dimensions. The availability and reliability requirements define the target SLA (99.9%, 99.99%), the acceptable downtime per month (43 minutes for 99.9%, 4.3 minutes for 99.99%), the redundancy strategy (multi-AZ deployment, active-active failover), and the disaster recovery plan (RPO of 1 hour, RTO of 15 minutes). These requirements drive architectural decisions like load balancing, health checks, and automated failover.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The latency budget specifies the end-to-end response time targets: p50 under 2 seconds, p95 under 5 seconds, p99 under 10 seconds. The spec breaks down this budget into component allocations: API gateway overhead (50ms), cache lookup (10ms), LLM API call (1-4 seconds), response processing (100ms), and network latency (50ms). When any component exceeds its budget, the spec defines the degradation strategy: switch to a faster model, return cached results, or provide a partial response.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The error handling and recovery strategy defines what happens when each component fails: LLM API timeout (retry with backoff, then fallback model), cache miss (proceed with LLM call), database connection failure (return stale cached data), rate limit exceeded (queue request, notify user of delay). Each failure mode has a specific recovery procedure and an escalation path if the recovery fails.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The cost management strategy defines the budget per request, per day, and per month, with automatic cost reduction measures that activate when spending approaches the budget: switch to cheaper models, increase cache TTL, reduce context window size, or disable non-essential features. The spec also defines the cost tracking mechanism: per-request cost logging, daily spend dashboard, and budget alert thresholds (50%, 80%, 100% of daily budget).
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Production Spec Example — Customer Support AI
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior platform engineer specializing in production AI systems handling customer-facing workloads.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Design the production architecture for an AI customer support agent handling 10,000 requests/day.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                SLA: 99.9% availability (43 min downtime/month). Latency: p50 {'<'} 2s, p95 {'<'} 5s, p99 {'<'} 10s. Cost: max $200/day ($0.02/request average). Throughput: peak 500 req/hour, sustained 417 req/hour. Reliability: circuit breaker on LLM API (open after 5 consecutive failures, half-open after 30s, close after 3 successes). Fallback: if primary model (gpt-4o) unavailable, use gpt-3.5-turbo with degraded but acceptable quality. Caching: semantic cache for similar queries (cosine similarity {'>'} 0.95, 24h TTL), exact match cache (1h TTL). Rate limiting: 10 req/min per user, 500 req/hour global.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Architecture diagram description, component specifications (API gateway, cache layer, LLM router, queue, monitoring), deployment configuration (Kubernetes with HPA, 2 min replicas, 10 max replicas, CPU threshold 70% for scaling), monitoring setup (Prometheus metrics: request_count, latency_p50/p95/p99, error_rate, cost_per_request, cache_hit_rate, circuit_breaker_state), alerting rules (error rate {'>'} 5% for 5 min, latency p95 {'>'} 5s for 10 min, daily cost {'>'} $180), runbook (step-by-step procedures for common incidents: LLM API outage, cache failure, traffic spike, cost overrun).
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The production spec produces a comprehensive architecture that addresses every operational concern. The API gateway handles authentication, rate limiting, and request routing. The cache layer reduces LLM API calls by serving cached responses for identical or semantically similar queries. The LLM router selects the appropriate model based on request complexity and current system load. The queue handles traffic spikes by buffering requests when the system is at capacity.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The circuit breaker pattern prevents cascading failures: when the LLM API fails 5 consecutive times, the circuit opens and all requests are routed to the fallback model (gpt-3.5-turbo) without attempting the primary model. After 30 seconds, the circuit enters half-open state and allows 3 test requests through. If all 3 succeed, the circuit closes and normal operation resumes. If any fail, the circuit reopens.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The monitoring setup provides complete visibility into system health. Prometheus metrics track request volume, latency percentiles, error rates, costs, cache effectiveness, and circuit breaker state. Alerting rules page the on-call engineer when critical thresholds are exceeded, with different severity levels based on the urgency of the issue. The runbook provides step-by-step procedures for common incidents, reducing mean time to recovery.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 2: Deployment Runbook Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A production system is only as good as its operational procedures. A deployment runbook spec defines the step-by-step process for deploying new versions, rolling back failures, and handling incidents.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Runbook Spec Example — Production Incident Response
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Create an incident response runbook for LLM API degradation.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Trigger: error rate {'>'} 10% for 2 minutes OR latency p95 {'>'} 8s for 5 minutes. Severity: P2 (major impact). Response time: on-call acknowledges within 15 minutes. Steps: 1) Verify alert (check dashboard, confirm error rate/latency), 2) Check LLM provider status page (outage, degradation, rate limits), 3) If provider outage: switch all traffic to fallback model, 4) If rate limiting: reduce request rate (lower concurrency, increase queue wait), 5) Monitor for 10 minutes (error rate should drop below 2%), 6) If not resolved: escalate to P1, engage LLM provider support, 7) Post-incident: document timeline, root cause, actions taken, prevention measures. Communication: update status page within 30 minutes of incident start, notify affected customers if degradation exceeds 5 minutes.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Markdown runbook with: trigger conditions, severity classification, response timeline, step-by-step procedures (with commands and dashboard URLs), communication templates (status page update, customer notification), escalation contacts (LLM provider support, engineering lead, VP of engineering), post-incident review template. Include: automated runbook trigger (PagerDuty integration), command shortcuts (kubectl commands for scaling, switching models, draining pods), and dashboard links (Grafana for metrics, Sentry for errors, AWS Console for infrastructure).
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          This runbook spec provides a clear, actionable procedure for responding to LLM API degradation. Each step has specific criteria for progression: verify the alert before acting, check the provider status page before assuming it is your problem, switch to fallback model if it is a provider outage, reduce request rate if it is rate limiting, monitor for 10 minutes to confirm resolution, escalate if the issue persists. The communication requirements ensure that stakeholders are informed throughout the incident.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Bad vs. Good: Production Specs</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The difference between a prototype and a production system is the difference between "it works" and "it works reliably, efficiently, and safely at scale."
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Error Handling
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Handle errors gracefully"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No specific error types defined, no retry logic, no fallback, no logging, no alerting. When errors occur, the system fails silently and nobody knows until users complain.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  "Handle: timeout (retry 2x with 1s, 3s backoff, then fallback model), rate limit (wait and retry, exponential backoff up to 60s, then queue), invalid response (parse error, return cached or default response, log error), provider outage (switch to fallback, alert on-call, update status page). Log every error with: timestamp, request_id, error_type, error_message, retry_count, action_taken. Alert if: error rate {'>'} 5% for 5 min, any P0 error (data loss, security breach)."
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Specific error types, retry logic, fallbacks, logging, and alerting all defined.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Scaling
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Make it scale"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No throughput targets, no latency budgets, no auto-scaling configuration, no load testing plan. The system works until traffic spikes and then crashes unpredictably.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  "Scale to 1000 req/hour with p95 latency {'<'} 5s. Auto-scaling: HPA on CPU (target 70%), min 2 replicas, max 20 replicas, scale-up stabilization 60s, scale-down stabilization 300s. Load test: simulate 2x, 5x, 10x normal traffic, measure: latency, error rate, cost. Degradation strategy: at 80% capacity, increase cache TTL; at 90%, switch to faster model; at 100%, queue requests with user-facing ETA."
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Targets, auto-scaling config, load testing, and degradation strategy all specified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          An AI-powered coding assistant used production specs to handle their Black Friday traffic spike (50x normal volume). The spec defined: auto-scaling to 50 replicas (from baseline 5), request queuing with user-facing wait times, model degradation (gpt-4 to gpt-3.5-turbo for non-critical requests), cache TTL increase (from 1 hour to 6 hours), and cost cap ($5000/day with automatic feature disabling at 80%). The system handled the spike with p95 latency under 4 seconds (target: 5 seconds) and total cost of $3,800 (under the $5,000 cap). Zero downtime during the event.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A healthcare AI diagnostic tool used production specs to meet FDA requirements for software as a medical device (SaMD). The spec defined: model versioning (every model change tracked with performance comparison), input validation (medical image format verification, metadata completeness check), output validation (confidence score threshold, mandatory disclaimers for low-confidence results), audit logging (every prediction logged with input hash, model version, confidence score, timestamp), and incident response (automatic model rollback if accuracy drops below threshold, mandatory reporting of adverse events). The production spec was a key component of their FDA 510(k) submission.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Production Specs</h2>
        <div className="mt-4 space-y-3">
          {[
            "Define explicit SLOs for every service. Without targets, you cannot measure whether your system is meeting expectations. Include latency percentiles, error rates, and throughput targets.",
            "Implement circuit breakers for all external dependencies. When an external service fails, your system should degrade gracefully rather than cascading the failure to your users.",
            "Design degradation strategies before you need them. When traffic spikes or a service fails, you need a pre-planned response, not a panic-driven decision.",
            "Monitor everything: request counts, latency percentiles, error rates, cache hit rates, model costs, queue depths, and circuit breaker states. What you do not measure, you cannot manage.",
            "Write runbooks for every alert. An alert without a runbook creates panic. A runbook provides a clear, tested procedure for responding to each failure mode.",
            "Load test before production. Simulate 2x, 5x, and 10x your expected traffic to identify bottlenecks before they affect real users. Fix issues found in load testing, not in production.",
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
