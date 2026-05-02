import TopicLayout from "@/components/TopicLayout";

export default function ScalingPromptsPage() {
  return (
    <TopicLayout
      section="Advanced + Real World"
      lessonNumber="Lesson 22"
      title="Scaling Prompts"
      currentHref="/learn/scaling-prompts"
    >
      <section>
        <h2 className="text-xl font-semibold">What Is Prompt Scaling?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Prompt scaling is the practice of designing prompt systems that maintain quality, consistency, and cost-efficiency as they are applied across thousands of use cases, millions of requests, and dozens of team members. It transforms prompt engineering from an artisanal craft into a systematic engineering discipline with version control, testing frameworks, performance monitoring, and automated optimization.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The challenge of scaling prompts is fundamentally different from scaling traditional code. Code is deterministic: the same input always produces the same output. Prompts are probabilistic: the same prompt can produce different outputs across runs, models, and model versions. Scaling prompts requires managing this variability through rigorous testing, evaluation metrics, and continuous monitoring to ensure that quality does not degrade as the system grows.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Prompt scaling also involves organizational challenges. When multiple teams are creating prompts for different use cases, inconsistencies emerge: different formatting conventions, conflicting system prompts, duplicated effort, and varying quality standards. A prompt scaling framework addresses these challenges by providing templates, style guides, review processes, and shared libraries of reusable prompt components.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The economic impact of prompt scaling is significant. A well-optimized prompt can reduce token usage by 30-50% while maintaining or improving output quality. At scale, this translates to millions of dollars in savings. Additionally, prompt scaling enables model switching: when a new model becomes available or costs change, the prompts can be evaluated against the new model and deployed if they meet quality thresholds, without manual rewriting.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Components of Prompt Scaling</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A prompt scaling system must address six critical dimensions. The prompt template library provides reusable prompt structures with placeholder variables ({'{role}'}, {'{task}'}, {'{constraints}'}, {'{output_format}'}) that can be instantiated for specific use cases. Templates encode best practices learned from prompt engineering experience, ensuring that every prompt follows proven patterns rather than being written from scratch.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The evaluation framework defines how prompt quality is measured: automated metrics (output format compliance, token usage, latency), human evaluation (accuracy, relevance, completeness ratings), and regression testing (comparing new prompt versions against golden examples). The evaluation framework runs on every prompt change, ensuring that quality does not degrade when prompts are modified.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The model abstraction layer decouples prompts from specific model implementations. A prompt written for the abstraction layer can be executed against any compatible model (gpt-4, claude-3, llama-3) through a unified interface. This enables A/B testing of models, cost optimization (routing to cheaper models when quality is acceptable), and resilience (automatic failover to alternative models when the primary is unavailable).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The performance monitoring system tracks prompt execution metrics in production: token usage per prompt, cost per request, latency per prompt, output quality scores, and user satisfaction ratings. These metrics enable identification of underperforming prompts, cost optimization opportunities, and quality degradation trends. Alerts trigger when metrics exceed defined thresholds, prompting investigation and remediation.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Scaling Spec Example — Enterprise Prompt Platform
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior ML engineer specializing in prompt infrastructure for enterprise-scale LLM applications.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Design a prompt scaling platform for an organization with 200+ prompts across 15 teams.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Template system: YAML-based templates with Jinja2 variable substitution, shared component library (system prompts, output format templates, constraint libraries), version control (Git-based, branch-per-team, PR review required). Evaluation: automated tests (format compliance, JSON schema validation, toxicity filter), golden dataset (100 curated input-output pairs per prompt category), human review panel (3 reviewers per prompt, majority vote). Model routing: primary model (gpt-4o), fallback (gpt-3.5-turbo), cost-optimized (claude-3-haiku for simple tasks). Monitoring: per-prompt metrics (token usage, cost, latency, quality score), team dashboards, alerting on quality regression {'>'} 5%, cost increase {'>'} 20%.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Platform architecture (prompt registry, template engine, evaluation pipeline, model router, monitoring dashboard), template examples (classification, extraction, generation, summarization templates with variable slots), evaluation workflow (CI/CD pipeline: lint {'->'} automated tests {'->'} golden dataset evaluation {'->'} human review {'->'} staging deployment {'->'} canary production rollout), model routing configuration (routing rules based on task complexity, cost, and quality requirements), monitoring setup (Prometheus metrics, Grafana dashboards, PagerDuty alerts).
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The prompt scaling platform produces a complete infrastructure for managing prompts at enterprise scale. The prompt registry stores all prompts with metadata (owner, team, use case, model compatibility, performance metrics). The template engine instantiates templates with variable substitution, producing concrete prompts ready for execution. The evaluation pipeline runs automated and human tests on every prompt change, ensuring quality before deployment.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The model routing configuration enables intelligent model selection based on task requirements. Simple classification tasks are routed to claude-3-haiku (lowest cost, sufficient quality), complex reasoning tasks to gpt-4o (highest quality, higher cost), and everything else to gpt-3.5-turbo (balanced cost and quality). The routing rules are configurable and can be adjusted based on real-time performance data.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The CI/CD pipeline for prompts mirrors the software development lifecycle: linting catches syntax errors in templates, automated tests verify format compliance, golden dataset evaluation measures output quality against known good examples, human review catches nuance issues that automated tests miss, staging deployment allows testing in a production-like environment, and canary rollout gradually increases traffic to the new prompt version while monitoring for quality regression.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 2: Prompt Optimization Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Prompt optimization is the process of improving prompts to reduce token usage, improve output quality, or both. A prompt optimization spec defines the optimization goals, the evaluation methodology, and the deployment process.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Optimization Spec Example — Token Reduction Campaign
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Optimize the top 20 prompts by token usage to reduce costs by 30% without degrading quality.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Target: 30% reduction in total tokens (input + output) per prompt. Quality threshold: no more than 2% degradation in evaluation score. Techniques: remove redundant instructions, consolidate overlapping constraints, use concise examples (1-shot instead of 3-shot), replace verbose descriptions with structured formats, leverage system message for persistent instructions (not repeated in user message), use XML tags for structure instead of prose descriptions. Evaluation: compare optimized vs. original on golden dataset (100 examples per prompt), measure: token count reduction, output quality score (human rating), format compliance rate, latency improvement.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: For each of the 20 prompts: original prompt, optimized prompt, diff showing changes, token count comparison (before/after/percentage), quality comparison (before/after/difference), deployment recommendation (ship if quality degradation {'<'} 2%, investigate if 2-5%, reject if {'>'} 5%). Include optimization playbook documenting the techniques used, their effectiveness, and guidelines for applying them to future prompts.
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          This optimization spec applies a systematic approach to prompt cost reduction. Each technique (removing redundancy, consolidating constraints, using fewer examples) is applied and its impact measured. The quality threshold (no more than 2% degradation) ensures that cost savings do not come at the expense of output quality. The deployment recommendation provides a clear decision framework based on the measured impact.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Bad vs. Good: Prompt Scaling</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Scaling prompts without a framework leads to chaos: inconsistent quality, spiraling costs, and unpredictable outputs.
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Prompt Management
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Approach
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  Prompts stored as hardcoded strings in application code. No versioning, no testing, no monitoring. When output quality degrades, nobody knows which prompt changed or why.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Approach
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Prompts in version-controlled registry with metadata, evaluation pipeline, and monitoring. Every change is tracked, tested, and deployed through CI/CD. Quality degradation triggers automatic alerts and canary rollback.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Cost Management
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Approach
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  All prompts use the most expensive model. No token optimization, no caching, no routing. Monthly bill: $50,000 with no visibility into which prompts drive costs.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Approach
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Model routing (simple tasks to cheap models), semantic caching (reuse similar responses), prompt optimization (30% token reduction), per-prompt cost tracking. Monthly bill: $18,000 with full cost attribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A customer service platform with 500+ prompts across 30 use cases implemented a prompt scaling platform that reduced their monthly LLM costs from $120,000 to $35,000 (71% reduction) while maintaining output quality. The platform provided: a centralized prompt registry with version control, automated evaluation against golden datasets, model routing that directed 60% of requests to cheaper models, and semantic caching that eliminated 25% of LLM calls. The per-prompt monitoring dashboard identified 15 underperforming prompts that were consuming disproportionate costs, and the optimization playbook enabled the team to systematically improve them.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A legal document analysis company used prompt scaling to manage their library of 200+ prompts covering contract review, clause extraction, risk assessment, and compliance checking. The prompt registry enabled them to track which prompts were used by which clients, measure output quality per client, and identify prompts that needed updating when regulations changed. The evaluation framework ran regression tests on every prompt change, ensuring that improvements to one prompt did not degrade performance on related prompts. When OpenAI released GPT-4o, they evaluated all 200 prompts against the new model and deployed 150 of them (the 50 that did not meet quality thresholds remained on GPT-4).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Scaling Prompts</h2>
        <div className="mt-4 space-y-3">
          {[
            "Store prompts externally, not in code. Use a prompt registry or configuration system that enables versioning, rollback, and hot-swapping without code deployment.",
            "Evaluate every prompt change. Run automated tests and human evaluation before deploying. Regression testing catches quality degradation before it reaches users.",
            "Route to the cheapest model that meets quality requirements. Not every task needs GPT-4. Use model benchmarks and A/B testing to find the right model for each prompt.",
            "Cache aggressively. Semantic caching can eliminate 20-40% of LLM calls for repetitive queries. Set TTLs based on data freshness requirements.",
            "Optimize for tokens, not just quality. Redundant instructions, verbose examples, and repeated context waste tokens and money. Every token has a cost.",
            "Monitor continuously. Track token usage, cost, latency, and quality per prompt. Set alerts for anomalies. What you measure, you can improve.",
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
