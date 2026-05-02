import TopicLayout from "@/components/TopicLayout";

export default function ErrorHandlingPage() {
  return (
    <TopicLayout
      section="Core Engineering"
      lessonNumber="Lesson 10 of 10"
      title="Error Handling"
      currentHref="/learn/error-handling"
    >
      <section>
        <h2 className="text-2xl font-bold mb-4">Taxonomy of Spec Errors</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Spec errors fall into three categories: output validation failures (format incorrect, fields missing, types wrong), semantic errors (factually incorrect content, hallucinations, contradictions), and system errors (API timeouts, rate limits, context overflow). Each category requires different handling strategies. Output validation failures can often be fixed by re-prompting with stronger constraints. Semantic errors require prompt redesign. System errors need retry logic and fallback strategies.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Format errors are the most common and easiest to detect. A spec requesting JSON that returns markdown, or requesting a number that returns a string, indicates format validation failure. Detection requires parsing outputs against expected schemas: try JSON.parse(), validate field types, check enum values. When format errors exceed 5% of requests, the spec needs stronger output constraints or the model is misconfigured (wrong temperature, wrong system message).
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Semantic errors are harder to detect automatically. A spec extracting invoice totals might return $500 when the invoice shows $5000—the output is valid JSON with a number type, but the value is wrong. Detection requires ground truth data (known-correct outputs) or cross-validation (run the same task with multiple model instances and compare). Semantic error rates above 2-3% indicate fundamental spec problems requiring redesign.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          System errors originate from the LLM provider, not the spec itself. Rate limit errors (429), context window exceeded (400 with token limit message), server errors (500), and timeouts all require different handling. Rate limits need exponential backoff with jitter. Context overflow needs input truncation or context summarization. Server errors need retry with circuit breaker patterns to avoid hammering failing services. Timeouts may need prompt simplification.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Retry and Fallback Strategies</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Exponential backoff with jitter is the standard retry pattern for transient errors. On first failure, wait 1 second; second failure, wait 2 seconds; third failure, wait 4 seconds, up to a maximum (typically 30-60 seconds). Adding jitter (random 0-30% of wait time) prevents thundering herd problems when many requests fail simultaneously and all retry at the same time.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Fallback models provide resilience when the primary model fails persistently. If GPT-4 returns errors for 3 consecutive requests, fall back to GPT-3.5 or Claude Haiku. Fallback specs may be simplified versions that sacrifice some quality for availability. A complex extraction spec might fall back to a simpler "extract key fields only" version. Document fallback behavior so users understand why outputs may vary during outages.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Self-Correction Pattern</div>
          <pre className="whitespace-pre-wrap">
{`ATTEMPT 1:
Spec: "Extract invoice data as JSON."

IF output is not valid JSON:
ATTEMPT 2:
Spec: "Extract invoice data. OUTPUT REQUIREMENTS: Valid JSON only. 
Schema: {vendor: string, total: number}. 
Your previous output was invalid. Fix the format."

IF still invalid:
ATTEMPT 3:
Spec: "Output ONLY this JSON, nothing else: 
{\"vendor\": \"...\", \"total\": 0}"`}
          </pre>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Circuit breaker patterns prevent cascading failures. After 5 consecutive failures, "open" the circuit and return cached responses or error messages for subsequent requests without calling the LLM API. After a cooldown period (e.g., 60 seconds), allow one test request—if it succeeds, close the circuit and resume normal operation. This protects your application and the LLM provider during outages.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Graceful Degradation</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Graceful degradation ensures your application remains functional even when LLM services fail or produce poor outputs. A support chatbot with degraded LLM access might return templated responses for common issues ("billing," "login," "refunds") using keyword matching, falling back to LLM only for complex queries. Users get slower but correct responses rather than errors or timeouts.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Partial output handling manages cases where the model produces incomplete responses. If a spec requests 5 fields but only 3 are returned, the system can: prompt the model to complete missing fields ("You missed 'total' and 'date'. Add them."), use default values for missing fields (with a warning), or return the partial output with an "incomplete" flag. The choice depends on whether downstream systems can handle partial data.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Context overflow handling prevents errors when inputs exceed model context limits. Implement input truncation with summarization: if the input document exceeds 8000 tokens, summarize it to 2000 tokens before sending to the model. Alternatively, split large inputs into chunks, process each chunk independently, then merge results. Chunking works well for long document analysis where each section can be processed separately.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Error Monitoring and Alerting</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Error rate monitoring tracks the percentage of requests resulting in failures. Set alerts at 5% error rate (warning) and 15% error rate (critical). Break down error rates by error type: format errors indicate spec problems, rate limit errors indicate capacity issues, timeout errors indicate prompt complexity issues. Each error type requires different remediation actions, so granular monitoring enables faster diagnosis.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Output quality monitoring samples successful requests and checks for quality indicators: JSON validity, required field presence, sentiment scores within expected ranges, or embedding similarity to expected outputs. A sudden drop in quality (even with 100% format compliance) indicates model drift, prompt regression, or context quality degradation. Quality monitoring catches "silent failures" that error rate monitoring misses.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Error Handling in Spec</div>
          <pre className="whitespace-pre-wrap">
{`You are processing a support ticket. 

CRITICAL INSTRUCTIONS:
- If the user message is empty, output: {"error": "empty_input", "response": null}
- If the query is unclear, output: {"error": "ambiguous_input", "needs_clarification": true}
- If you cannot answer from context, output: {"error": "insufficient_context", "response": null}
- Otherwise, output: {"response": "...", "confidence": 0.0-1.0}

Never guess. Always use error codes for exceptional cases.`}
          </pre>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Dead letter queuing captures failed requests for later analysis and reprocessing. When a request fails after all retries, store the input, error details, and timestamp in a dead letter queue (database table, message queue, or log file). Review these periodically to identify patterns: "all failures are for Japanese text" or "failures spike every day at 2 PM." Reprocessing from the DLQ after fixes validates that the issue is resolved.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Real-World Error Handling Architectures</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          A production invoice processing system implements three-layer error handling: Layer 1 retries failed JSON parsing by re-prompting with "OUTPUT VALID JSON ONLY" (fixes 70% of format errors). Layer 2 falls back to a simpler extraction spec that only gets vendor and total (fixes 20% of remaining). Layer 3 returns a human review task in the queue (handles 100% of cases). This cascading approach achieves 99.8% automation while ensuring no invoices are lost.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          A multi-model content moderation system routes requests to 3 models in parallel and uses majority voting. If all 3 disagree or all 3 return errors, the system flags for human review. If 1 model fails but 2 agree, the system uses the consensus answer and logs the failure for monitoring. This architecture achieves 99.95% uptime even when individual models experience partial outages.
        </p>
        <div className="border-l-4 border-[var(--accent)] pl-4 mb-4">
          <p className="text-[var(--accent-text)] font-medium">Error Handling Tips:</p>
          <ul className="list-disc list-inside text-[var(--text-secondary)] mt-2 space-y-1">
            <li>Always implement exponential backoff with jitter—retrying immediately after rate limits makes things worse</li>
            <li>Design specs to return structured errors ({'{'}"error": "reason"{'}'}) rather than silently failing or hallucinating</li>
            <li>Set up alerts BEFORE you need them—debugging production errors without monitoring is painful</li>
            <li>Test your error handling by intentionally breaking things: disconnect network, send malformed inputs, exceed rate limits</li>
            <li>Cache successful responses when possible—serving from cache during outages is the ultimate fallback</li>
          </ul>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          The ultimate goal of error handling is not zero errors (impossible with external LLM APIs) but predictable behavior under failure. Users and downstream systems should know exactly what to expect when things go wrong: an error code, a fallback response, or a clear indication that human review is needed. Specs that handle errors gracefully inspire confidence; specs that fail mysteriously erode trust in the entire system.
        </p>
      </section>
    </TopicLayout>
  );
}
