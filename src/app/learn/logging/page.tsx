import TopicLayout from "@/components/TopicLayout";

export default function LoggingPage() {
  return (
    <TopicLayout
      section="Advanced + Real World"
      lessonNumber="Lesson 26"
      title="Logging"
      currentHref="/learn/logging"
    >
      <section>
        <h2 className="text-xl font-semibold">What Is AI System Logging?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          AI system logging is the structured recording of every interaction with LLMs, including the input prompt, the model used, the parameters (temperature, max_tokens), the output response, the token usage, the cost, the latency, and any errors encountered. These logs serve multiple purposes: debugging failures, analyzing output quality, auditing for compliance, optimizing costs, and training evaluation datasets. Effective logging is the foundation of all other AI observability practices.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The logging requirements for AI systems are significantly more complex than for traditional applications. A traditional application log records: timestamp, request ID, endpoint, status code, response time, and error message. An AI system log must additionally record: the full prompt (input tokens), the model and version, the parameters used, the full response (output tokens), the token count, the cost, the quality evaluation score, the cache status, the model version hash, and a hash of the input for privacy-sensitive environments where the raw prompt cannot be stored.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Privacy and compliance considerations add another layer of complexity. In regulated industries (healthcare, finance, government), logs may contain sensitive information (PHI, PII, financial data) that must be redacted, encrypted, or excluded from logs entirely. The logging spec must define what data can be logged, what must be redacted, how long logs are retained, and who has access to them. In some cases, logs must be stored in encrypted form with access controlled through role-based permissions.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Log volume is a practical concern: a high-traffic AI system may generate millions of log entries per day, each containing hundreds or thousands of tokens. The logging spec must define the log format (structured JSON), the storage backend (ELK stack, CloudWatch, Datadog), the retention policy (raw logs: 30 days, aggregated metrics: 1 year), and the sampling strategy (log all errors, sample successful requests based on traffic volume).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Logging Components</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The request log captures every interaction with the LLM. Each log entry includes: request_id (unique identifier for tracing), timestamp, user_id (or session_id for anonymous users), endpoint/use_case, model_name, model_version, input_prompt (or input_prompt_hash for privacy), input_token_count, parameters (temperature, top_p, max_tokens, stop_sequences), output_response (or output_response_hash), output_token_count, cost (calculated from token counts and model pricing), latency (total and time-to-first-token for streaming), status (success, error, timeout), error_message (if applicable), cache_status (hit, miss, bypass), and quality_score (if evaluated).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The error log captures detailed information about every failed LLM interaction. Each error log entry includes: all fields from the request log plus error_type (timeout, rate_limit, invalid_response, authentication_failure, internal_error), error_message (from the LLM API or internal system), retry_count (number of retry attempts), retry_delays (time between retries), fallback_action_taken (what happened after the error: fallback model used, cached response served, error returned to user), and stack_trace (for internal errors).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The quality log captures the results of output quality evaluation. Each quality log entry includes: request_id, evaluator_type (automated, human), evaluation_timestamp, quality_metrics (accuracy, relevance, completeness, format_compliance, toxicity_score), evaluator_confidence, gold_standard_comparison (if a reference answer exists), and reviewer_notes (for human evaluations). Quality logs enable trend analysis (is quality improving or degrading over time?) and model comparison (which model produces higher quality output for this use case?).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The audit log captures compliance-relevant events: who accessed which data, when, and what actions were taken. Audit logs are immutable (append-only, no deletions), tamper-evident (cryptographic signatures), and retained for the legally required period (typically 7 years for financial data, 6 years for healthcare data). Each audit log entry includes: actor_id, action_type, resource_id, timestamp, outcome, and ip_address.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Logging Spec Example — Structured AI Request Logs
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Define the structured logging format for an AI-powered document analysis system.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Format: JSON, one entry per line (JSON Lines). Required fields: request_id (UUID v4), timestamp (ISO8601 UTC), user_id, use_case, model_name, model_version, input_tokens, output_tokens, cost_usd, latency_ms, status, cache_hit (boolean). Conditional fields: error_type + error_message (if status = 'error'), quality_score (if evaluated), prompt_hash (SHA-256 of input prompt, always logged), response_hash (SHA-256 of output response, always logged). Redaction: remove PII from prompt/response before logging (replace emails, phone numbers, SSNs with {'{REDACTED}'}). Privacy: if user opts out of data collection, log only prompt_hash, response_hash, token counts, cost, latency (no content).
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: JSON Schema for log entry, logging middleware code (intercepts every LLM call, constructs log entry, applies redaction, writes to stdout for collection by Fluentd), redaction rules (regex patterns for PII: email, phone, SSN, credit card, address), sampling configuration (100% for errors, 50% for successful requests, configurable per use case), retention policy (raw logs in S3: 30 days with lifecycle to Glacier at 7 days, aggregated metrics in CloudWatch: 1 year), access controls (engineering: read all logs, data science: read quality-evaluated logs, compliance: read audit logs, no direct production log access without approval). Include: log search examples (find all errors for a use case, find all requests with quality_score {'<'} 0.7, find all requests by a user, find cost breakdown by model).
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The logging spec produces a comprehensive, privacy-aware logging system that captures all necessary information for debugging, quality analysis, and compliance while respecting user privacy preferences. The use of prompt_hash and response_hash (SHA-256) enables request deduplication and integrity verification without storing the full content for users who have opted out of data collection.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The PII redaction rules apply regex patterns to detect and replace sensitive information before it is written to logs. This prevents accidental exposure of personal data in log files, which are often accessible to a broader set of engineers than the production database. The redaction patterns cover the most common PII types: email addresses, phone numbers, Social Security numbers, credit card numbers, and physical addresses.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The sampling configuration balances logging completeness with storage cost. Every error is logged (100% sampling) because errors are rare and each one needs investigation. Successful requests are sampled at 50% to reduce storage volume while maintaining a statistically significant sample for quality analysis. The sampling rate is configurable per use case, allowing high-volume, low-risk use cases to be sampled more aggressively while low-volume, high-risk use cases are logged more completely.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A healthcare AI company used structured logging to achieve HIPAA compliance for their clinical documentation assistant. The logging spec defined: complete PII/PHI redaction from all log entries (patient names, medical record numbers, diagnoses, treatments replaced with {'{REDACTED}'}), encrypted log storage (AES-256 at rest, TLS 1.3 in transit), role-based log access (only the compliance team and designated engineers with HIPAA training), immutable audit trails (append-only logs with cryptographic hash chain), and 6-year retention (matching HIPAA requirements). The logging system was a key component of their HIPAA audit, demonstrating that patient data was protected even in operational logs.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          An AI code review platform used structured logging to debug a quality regression that appeared after a model update. The logs revealed that the new model was producing shorter code reviews (average 200 tokens vs. 500 tokens previously) and was missing security-related issues that the previous model consistently caught. By querying the quality logs (quality_score {'<'} 0.7), the team identified 150 affected reviews and manually re-reviewed them. The log data also provided evidence for their discussion with the model provider, who subsequently adjusted the model to restore the previous behavior.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for AI Logging</h2>
        <div className="mt-4 space-y-3">
          {[
            "Use structured JSON logging, not free-text. Structured logs enable efficient searching, filtering, and aggregation. Every log field should have a defined type and purpose.",
            "Always log request_id and propagate it through the entire request chain. Request IDs enable you to trace a single request across all components (API gateway, cache, LLM, database).",
            "Redact PII before writing to logs. Logs are often less protected than databases. Assume anyone with log access can see everything in the logs.",
            "Log token counts and cost with every request. Without per-request cost tracking, you cannot identify cost anomalies or optimize spending.",
            "Store prompt and response hashes even when you cannot store the content. Hashes enable deduplication, integrity verification, and audit trail construction without exposing sensitive data.",
            "Define retention policies and enforce them automatically. Logs accumulate quickly. Set lifecycle rules to move old logs to cheaper storage and delete them when no longer needed.",
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
