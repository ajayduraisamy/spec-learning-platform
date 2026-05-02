import TopicLayout from "@/components/TopicLayout";

export default function DebuggingPage() {
  return (
    <TopicLayout
      section="Core Engineering"
      lessonNumber="Lesson 5 of 10"
      title="Debugging Specs"
      currentHref="/learn/debugging"
    >
      <section>
        <h2 className="text-2xl font-bold mb-4">The Debugging Mindset</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Debugging specs requires a fundamentally different approach than debugging traditional code. When a Python function fails, you get stack traces, type errors, and clear failure modes. When a spec fails, the model silently produces wrong outputs, hallucinates explanations, or ignores instructions—all while appearing confident. Effective spec debugging treats the model as a black-box system where inputs and outputs are observable, but internal reasoning is not.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The scientific method is the foundation of spec debugging: form a hypothesis about why the output is wrong, design an experiment to test it, run the experiment, and iterate. "The model ignores the output format" is a hypothesis. The experiment: simplify the prompt to only contain the format instruction, test with a known input, and observe if format compliance improves. This isolate-and-test approach prevents shotgun debugging (randomly changing things hoping something works).
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Reproducibility is the biggest challenge in spec debugging. Models have temperature settings, sampling randomness, and non-deterministic behaviors that make bugs intermittent. A spec that fails 10% of the time is harder to debug than one that fails 100% of the time. Effective debugging requires running each test case multiple times (typically 5-10) to distinguish consistent failures from stochastic ones. Log the seed value when possible to enable exact replay.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Debugging specs also requires maintaining a test harness: a set of fixed inputs with expected outputs that can be re-run after every spec change. Without this, you fix one bug but break three other behaviors that you're no longer testing. Professional spec engineers maintain test suites of 20-100 cases covering edge cases, happy paths, and known failure modes. Each debug session starts with running the full suite to establish a baseline.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Common Failure Modes</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Instruction ignoring is the most common failure: the model produces outputs that contradict explicit instructions. "Output JSON only" results in outputs with explanatory text before the JSON. Root causes include: instruction buried in the middle of a long prompt (lost-in-the-middle), instruction phrased as suggestion rather than command ("you should" vs "you must"), or instruction competing with contradictory context that overrides it.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Hallucination failures occur when models invent facts not present in the context. This is particularly dangerous in retrieval-augmented systems where users assume outputs are grounded in provided documents. Hallucination debugging requires checking if the output references information not in the context, then adding constraints like "Only use information from the provided documents. If unsure, output 'insufficient information'."
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Failure Mode: Ignoring Output Format</div>
          <pre className="whitespace-pre-wrap">
{`SPEC (problematic):
"Please provide the analysis in JSON format if possible."

MODEL OUTPUT:
Here's the analysis you requested:
{
  "score": 7
}
Hope this helps!

SPEC (fixed):
"You MUST output valid JSON only. No text before or after the JSON block."

MODEL OUTPUT (now compliant):
{ "score": 7 }`}
          </pre>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Failure Mode: Hallucinated Constraints</div>
          <pre className="whitespace-pre-wrap">
{`SPEC (problematic):
"Summarize the contract terms."

MODEL OUTPUT:
"The contract has a 30-day termination clause, a $5000 penalty for breach, and requires annual audits."
[None of these are in the actual contract - pure hallucination]

SPEC (fixed):
"Summarize ONLY facts explicitly stated in the contract text. If a term is not mentioned, do not include it. Output 'Not specified' for missing terms."`}
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Systematic Debugging Techniques</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Binary search debugging isolates the failing component by systematically removing parts of the prompt. Start with a minimal working prompt (just the task instruction), verify it works, then add components one at a time: add context, test; add examples, test; add output format, test. When the output degrades after adding a component, you've found the problematic section. This is slower than guessing but finds root causes reliably.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Contrastive debugging runs the same task with two different prompts: one that works and one that fails. By comparing inputs token-by-token, you identify the specific change that caused the failure. This is particularly effective for regressions: when a spec update breaks behavior, compare the old and new versions. The diff reveals exactly what changed, and you can test each change independently to find the culprit.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Token-level debugging examines how the model "sees" the prompt by counting tokens and checking for truncation. A prompt that works in development might fail in production because the context is longer, pushing critical instructions beyond the context window. Debugging requires logging the full prompt (with token counts) for failing cases and checking if instructions land in the attention "dead zone" (middle of very long contexts).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Debugging Tools and Instrumentation</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Prompt versioning is the most critical debugging tool. Every spec change should be committed with a meaningful message, enabling rollback when regressions occur. Tag each version with performance metrics (format compliance rate, accuracy score) so you can correlate changes with performance shifts. Teams that don't version prompts are indistinguishable from teams that don't use source control—debugging becomes impossible guesswork.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Output logging with full context enables post-hoc debugging. Store the complete prompt, model parameters (temperature, top-p, etc.), raw output, and parsed result for every inference. When a user reports a bad output, you can replay the exact scenario. This requires careful PII handling—scrub personal data before logging. Structured logging (JSON lines) enables querying: "show all outputs where format_valid=false for the billing spec."
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Debugging Instrumentation</div>
          <pre className="whitespace-pre-wrap">
{`DEBUG MODE PROMPT:
You are debugging a spec failure. 

ORIGINAL SPEC:
{{original_spec}}

TASK: Analyze why this spec might fail for input: "{{test_input}}"

Check these:
1. Is the output format instruction clear and at the start/end?
2. Are there contradictory instructions?
3. Is the context relevant and not misleading?
4. Would a human understand exactly what to do?

OUTPUT:
{ "issues_found": [...], "suggested_fixes": [...] }`}
          </pre>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          A/B testing infrastructure lets you debug by comparison. Route 10% of traffic to a new spec version while keeping 90% on the old version. Compare error rates, format compliance, and user satisfaction scores. If the new version performs worse, you have quantified evidence before rolling back. This is especially important for customer-facing specs where broken outputs directly impact user trust.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Real-World Debugging Scenarios</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          A customer support bot suddenly started giving refunds without authorization. Debugging revealed that a new few-shot example (showing a refund scenario) accidentally taught the model that refunds are the default response to billing complaints. Removing that example and adding an explicit "Never issue refunds without manager approval" constraint fixed the issue. The root cause: few-shot examples carry more weight than instructions.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          A code generation spec worked for Python but failed for JavaScript. Debugging showed the spec said "use type hints" which Python supports but JavaScript doesn't (without TypeScript). The fix: detect the target language from context and conditionally include language-specific instructions. This type of context-dependent failure is common and requires conditional spec patterns rather than one-size-fits-all approaches.
        </p>
        <div className="border-l-4 border-[var(--accent)] pl-4 mb-4">
          <p className="text-[var(--accent-text)] font-medium">Debugging Tips:</p>
          <ul className="list-disc list-inside text-[var(--text-secondary)] mt-2 space-y-1">
            <li>Always reproduce the bug 3+ times before attempting a fix—stochastic failures need different approaches</li>
            <li>Start debugging with the simplest possible version of your spec, then add complexity incrementally</li>
            <li>Log the full prompt (with token count) for every failure—truncation is a silent killer</li>
            <li>Test with adversarial inputs: empty strings, extremely long inputs, special characters, contradictory context</li>
            <li>When stuck, ask the model itself: "Why might this spec fail?" with the spec as input</li>
          </ul>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          The most elusive bugs are performance regressions that aren't binary failures but gradual degradations. A spec that was 95% accurate drifts to 88% over several updates. Debugging this requires a regression test suite with known-good outputs and automated diff checking. Without this, the "boiling frog" problem hides slow degradation until users complain—by then, multiple changes have piled up and finding the culprit requires bisecting through versions.
        </p>
      </section>
    </TopicLayout>
  );
}
