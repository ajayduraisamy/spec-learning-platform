import TopicLayout from "@/components/TopicLayout";

export default function LatencyHandlingPage() {
  return (
    <TopicLayout
      section="Advanced + Real World"
      lessonNumber="Lesson 24"
      title="Latency Handling"
      currentHref="/learn/latency-handling"
    >
      <section>
        <h2 className="text-xl font-semibold">What Is Latency Handling in AI Systems?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Latency handling in AI systems encompasses the strategies, architectures, and optimizations that ensure LLM-powered applications meet user experience expectations for response time. LLM API calls are inherently slow compared to traditional API calls: a typical GPT-4 response takes 2-8 seconds, compared to under 100 milliseconds for a database query. This latency gap requires specialized techniques to maintain a responsive user experience.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The challenge is not just reducing raw latency—it is managing user perception of latency. A 5-second wait with a progress indicator and partial results feels faster than a 3-second wait with a blank screen. Streaming responses, optimistic UI updates, progressive disclosure, and background processing are all techniques that improve perceived latency even when actual processing time remains unchanged.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Latency handling also involves architectural decisions about when to use synchronous vs. asynchronous processing. For real-time interactions (chat, autocomplete), responses must be delivered within 2 seconds to maintain conversational flow. For batch operations (document analysis, report generation), responses can be delivered asynchronously with notification upon completion. The spec must define which operations are synchronous and which are asynchronous, with clear user communication about expected wait times.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The economic dimension of latency handling is significant: faster models cost more, and optimizing for latency often increases cost. The spec must balance latency targets against cost budgets, finding the configuration that meets both constraints. Sometimes this means accepting higher latency to stay within budget; other times it means accepting higher cost to meet latency SLAs.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Latency Handling Strategies</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Streaming responses deliver output token-by-token as the LLM generates them, rather than waiting for the complete response. This reduces perceived latency from the full generation time (5-10 seconds) to the time to first token (0.5-2 seconds). Streaming is essential for chat interfaces and any application where the user is waiting for a response. The spec must define the streaming protocol (Server-Sent Events, WebSockets), the token delivery rate, and the fallback behavior when streaming is interrupted.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Speculative execution predicts what the user will request and pre-generates the response before the request is made. For example, in a chat application, the system might pre-generate responses to the most likely follow-up questions while the user reads the current response. If the user asks a predicted question, the response is already available. The spec must define the prediction accuracy threshold (speculative execution is wasteful if prediction accuracy is below 30%) and the cost budget for speculative computations.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Parallel processing decomposes complex tasks into independent sub-tasks that can be executed concurrently. For example, a document analysis task that requires summarization, entity extraction, and sentiment analysis can execute all three operations in parallel rather than sequentially, reducing total latency from the sum of individual latencies to the maximum of individual latencies. The spec must define which tasks can be parallelized and how results are combined.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Caching is the most effective latency reduction technique: a cached response is delivered in milliseconds rather than seconds. The spec must define the caching strategy (exact match, semantic similarity, TTL), the cache invalidation rules, and the fallback behavior for cache misses. For latency-critical applications, the spec should define the minimum cache hit rate required to meet latency SLAs.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Latency Spec Example — Real-Time Chat Application
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior platform engineer specializing in real-time AI applications with strict latency requirements.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Design the latency handling architecture for a real-time AI chat application.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Latency targets: time to first token {'<'} 500ms (p95), full response streaming start {'<'} 1s (p95), complete response {'<'} 5s (p95). Streaming: Server-Sent Events (SSE), token delivery every 50-100ms, reconnect on disconnect with resume from last received token. Caching: exact match (TTL 5 min), semantic similarity (cosine {'>'} 0.98, TTL 1 hour). Timeout: 10s max response time, if exceeded return partial response with "response may be incomplete" notice. Model: primary gpt-4o (streaming enabled), fallback gpt-3.5-turbo if gpt-4o response time {'>'} 3s. Parallel: pre-generate follow-up suggestions while streaming main response.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Architecture description (client-side: SSE connection manager, token renderer with streaming animation, reconnect handler; server-side: request queue, cache layer, model router, streaming response handler, timeout monitor), SSE protocol specification (event types: token, complete, error, reconnect; data format: {`{ type, token, index, total_tokens }`}), timeout handling procedure (partial response return, notification to user, background completion for follow-up), latency monitoring (per-request: time_to_first_token, time_to_complete, tokens_per_second; aggregate: p50/p95/p99 by endpoint), optimization triggers (if time_to_first_token {'>'} 500ms for 10% of requests, switch to fallback model).
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The latency handling architecture uses multiple techniques in combination to meet the aggressive latency targets. Streaming ensures that the user sees the first token within 500ms (time to first token is determined by the LLM's initial processing, not the full generation time). The SSE protocol provides reliable, low-overhead token delivery with automatic reconnection support.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The two-tier caching strategy (exact match + semantic similarity) serves a significant fraction of requests without calling the LLM at all. Exact match caching handles repeated queries (the same question asked by different users), while semantic similarity caching handles variations of previously answered questions. The strict similarity threshold (0.98) ensures that cached responses are truly applicable to the current query.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The model fallback mechanism provides a safety net when the primary model is slow: if gpt-4o takes more than 3 seconds to start streaming, the request is switched to gpt-3.5-turbo, which typically responds faster but with slightly lower quality. This trade-off is acceptable for real-time chat, where response speed is more important than perfect output quality. The parallel pre-generation of follow-up suggestions provides the user with quick options while the main response is still streaming.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 2: Async Processing Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Not all AI operations need to be synchronous. A spec for async processing defines when to use background processing, how to notify users of completion, and how to handle failures.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Async Processing Spec — Document Analysis Pipeline
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Design async processing for batch document analysis (100+ documents).
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Trigger: user uploads batch of documents. Processing: extract text, classify type, extract entities, generate summary, check compliance. Estimated duration: 30 seconds per document, 50 minutes for 100 documents. User experience: synchronous wait is unacceptable. Async flow: upload {'->'} receive job_id {'->'} poll status or receive webhook notification {'->'} view results. Progress tracking: estimated time remaining, documents processed / total, current document being processed. Retry: failed documents retried 2x with exponential backoff, then marked as failed with error details. Notification: email and in-app notification on completion, summary of results (documents processed, failures, key findings).
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Job management API (create_job, get_job_status, get_job_results, cancel_job), queue configuration (Redis Streams, priority queue: paid users first, max concurrent jobs: 10, max documents per job: 500), worker configuration (auto-scaling: 1-20 workers based on queue depth, 5 documents/worker/minute), progress tracking API (websocket or SSE for real-time progress updates), failure handling (per-document error tracking, partial results available even if some documents fail, retry mechanism with configurable backoff), notification service (email template, in-app notification format, webhook callback for API consumers). Include: cost estimate per job (documents {'*'} cost_per_document), SLA definition (95% of jobs complete within estimated time + 20%).
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          This async processing spec transforms a 50-minute operation into a background task that does not block the user interface. The user receives a job_id immediately after upload and can check progress at any time. The progress tracking API provides real-time updates via WebSocket or SSE, showing the user exactly how many documents have been processed and how many remain.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Bad vs. Good: Latency Handling</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Poor latency handling drives users away. Good latency handling makes slow operations feel fast.
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Chat Response
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Approach
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  User sends message, waits 8 seconds with blank screen, then full response appears. No feedback during wait. User thinks the app is broken and leaves.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Approach
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  User sends message, sees "thinking..." indicator at 500ms, first token streams at 1s, full response streams over next 4 seconds. Typing animation during wait. If response takes {'>'} 5s, show "this is taking longer than usual" message with option to cancel.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Timeout Handling
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Approach
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  No timeout configured. LLM API hangs for 60 seconds, connection times out, user gets generic 500 error. No retry, no fallback, no explanation.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Approach
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Timeout: 10s. On timeout: return partial response if any tokens received, with notice. If no response: return cached response or default response. Log timeout event with request details. Retry with fallback model. User sees meaningful message: "Response is taking longer than expected. Here is a preliminary answer while we complete the full analysis."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A real-time translation service used latency handling to achieve sub-1-second translation for 95% of requests. They implemented: streaming translation (output tokens delivered as generated, not after full translation), model selection (lighter model for short text {'<'} 50 words, full model for longer text), caching (frequently translated phrases cached with 24-hour TTL), and progressive translation (translate the first sentence immediately while the rest is being processed). The result was a translation experience that felt instantaneous for short phrases and progressively revealed results for longer text, with p95 latency of 800ms compared to the baseline of 4.2 seconds.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A code review AI tool used async processing to handle large pull requests (10,000+ lines of code). Instead of blocking the user while the entire PR was analyzed, the tool processed files in parallel (up to 20 concurrent file analyses), streamed results as each file was completed, and provided a real-time progress indicator. Users could start reviewing feedback on the first files while later files were still being analyzed. For a typical 50-file PR, the first review comments appeared within 3 seconds (vs. 5 minutes for the full analysis), and the complete review was available within 8 minutes.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Latency Handling</h2>
        <div className="mt-4 space-y-3">
          {[
            "Stream whenever possible. Streaming reduces perceived latency from the full generation time to the time-to-first-token, which is typically 5-10x faster.",
            "Set explicit timeouts for every LLM call. A timeout with a fallback is better than an indefinite wait. Define the timeout based on your user experience requirements.",
            "Cache aggressively. A cached response is delivered in milliseconds. For latency-critical applications, caching is not optional—it is essential.",
            "Use parallel processing for independent tasks. If a task can be decomposed into independent sub-tasks, run them in parallel to reduce total latency to the maximum sub-task latency.",
            "Communicate progress to users. A progress indicator with estimated time remaining reduces user frustration even when the actual wait time is unchanged.",
            "Design for the p95, not the average. Your slowest 5% of requests define the user experience for users with those requests. Optimize for the tail, not the mean.",
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
