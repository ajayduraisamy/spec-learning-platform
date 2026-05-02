import TopicLayout from "@/components/TopicLayout";

export default function EvaluationPage() {
  return (
    <TopicLayout
      section="Core Engineering"
      lessonNumber="Lesson 7 of 10"
      title="Evaluation"
      currentHref="/learn/evaluation"
    >
      <section>
        <h2 className="text-2xl font-bold mb-4">Fundamentals of Spec Evaluation</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Evaluation is the systematic measurement of how well a spec performs against its intended goals. Without evaluation, spec engineering is guesswork—you might think a prompt works because it produced one good output, but real-world performance requires statistical confidence across diverse inputs. Evaluation answers: Does this spec produce correct outputs? Is it cost-effective? Does it handle edge cases? Can it be deployed safely to production?
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The evaluation mindset requires defining success before writing specs. A spec for extracting invoice data succeeds if 95% of outputs are valid JSON with all required fields present. A creative writing spec succeeds if human raters rate outputs 4+ out of 5 for coherence and style. Without predefined success criteria, you cannot objectively compare two spec versions or know when to stop iterating.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Evaluation happens at three stages: development (quick tests during authoring), staging (comprehensive tests before deployment), and production (ongoing monitoring after deployment). Development evaluation uses small test sets (10-20 cases) for fast iteration. Staging uses large, representative test sets (100-1000 cases) to catch edge case failures. Production evaluation uses sampled real traffic to detect regressions.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The golden rule of evaluation: test on data that differs from your development examples. If you craft a spec using 5 examples, then test it on those same 5 examples, you're measuring memorization, not generalization. Build separate development, validation, and test sets. The test set should be held out completely—never peek at it during development, or you'll overfit your spec to the test cases.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Evaluation Metrics</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Format compliance measures whether outputs match the requested structure. For JSON specs, this is binary: either the output parses as valid JSON or it doesn't. For markdown specs, compliance might check for required headers, table structures, or code block presence. Format compliance is the easiest metric to automate—write a parser that validates outputs and returns pass/fail. Aim for 98%+ compliance on production specs.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Semantic accuracy measures whether the output content is correct. For data extraction, this means checking if extracted values match ground truth. For summarization, this means checking if key facts are preserved and hallucinations are absent. Semantic accuracy requires human evaluation or high-quality automated checks (exact match for structured data, embedding similarity for text). Unlike format compliance, semantic accuracy is rarely 100%—95% is often acceptable.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Operational metrics track cost and latency. Token efficiency measures tokens per successful output—a spec using 500 tokens that achieves 95% accuracy is better than one using 2000 tokens for 96% accuracy. Latency p95 measures the worst-case user experience—a spec averaging 2 seconds but spiking to 15 seconds for complex inputs creates user frustration. Always measure operational metrics alongside quality metrics.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Evaluation Test Case</div>
          <pre className="whitespace-pre-wrap">
{`EVALUATION CASE 42:
Input: "Refund my $99 subscription, cancel immediately."
Expected Output:
{
  "intent": "cancel_subscription",
  "refund_requested": true,
  "amount": 99,
  "urgency": "high"
}
Pass Criteria:
- Valid JSON: true
- intent matches: true
- refund_requested matches: true
- amount within ±0: true
- urgency is "high" or "medium": true
- All fields present: true`}
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Building Test Suites</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          A comprehensive test suite covers happy paths (typical inputs), edge cases (unusual but valid inputs), and adversarial cases (malformed, empty, or malicious inputs). Happy path cases ensure the spec works for common scenarios. Edge cases catch failures on boundary conditions: maximum length inputs, special characters, empty strings, non-Latin scripts. Adversarial cases test robustness: prompt injection attempts, contradictory instructions, gibberish inputs.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Test case diversity matters more than quantity. 50 diverse test cases catch more bugs than 500 similar cases. Ensure your test set covers all input categories, output variations, and edge conditions. For a customer support classifier, include cases for every intent category, cases with mixed intents, cases with typos, cases in different languages (if your spec handles multilingual), and cases with missing information.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Automated test runners execute your test suite against spec versions and report pass/fail rates. A basic runner loads test cases, sends each input to the model with the spec, validates outputs against expected results, and generates a report. Advanced runners support regression detection (compare against previous version's results), flaky test identification (tests that pass/fail intermittently), and cost tracking (total tokens used during testing).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Automated vs Human Evaluation</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Automated evaluation works for objective tasks with clear pass/fail criteria: JSON extraction, format compliance, classification into known categories, and numerical calculations. Automation provides fast feedback (seconds per test run) and consistent scoring. However, automated eval cannot judge subjective quality: writing style, explanation coherence, creative output, or nuanced correctness that requires domain expertise.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Human evaluation is essential for subjective tasks and edge cases where automated checks are insufficient. Structured human eval uses rating rubrics: "Rate output coherence 1-5", "Does this output contain hallucinations? yes/no", "Is the tone appropriate? yes/no". Multiple human raters per output enable inter-rater reliability measurements—if two raters disagree, the case needs clarification or the rubric needs refinement.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: LLM-as-Judge Evaluation</div>
          <pre className="whitespace-pre-wrap">
{`You are evaluating a support response for quality.

RESPONSE TO EVALUATE:
{{candidate_output}}

EVALUATION CRITERIA:
1. Factually accurate (no hallucinations): yes/no
2. Addresses user's specific question: yes/no
3. Appropriate tone (empathetic, professional): yes/no
4. Provides actionable next steps: yes/no

Output JSON: { "accuracy": bool, "relevance": bool, "tone": bool, "actionable": bool, "overall_pass": bool }`}
          </pre>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          LLM-as-judge is a hybrid approach where a powerful model evaluates outputs from a weaker model. This provides human-like judgment at automated speed and cost. However, LLM judges have biases: they prefer verbose outputs, struggle with subtle factual errors, and may disagree with human raters. Calibrate LLM judges by comparing their scores against human ratings on a calibration set, then apply corrections for systematic biases.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Real-World Evaluation in Production</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          A financial data extraction team maintains a 500-case test suite covering 20 document types across 5 languages. They run the full suite nightly against their production spec, plus a 50-case smoke test on every spec change. When a new spec version scores below 95% accuracy on the nightly suite, it triggers an alert. This caught a regression where a spec update broke extraction for Japanese invoices due to an untested character encoding edge case.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          A content moderation system uses shadow evaluation: new spec versions run in parallel with the production version, but outputs aren't shown to users. Evaluators compare the two versions' outputs on real traffic, measuring agreement rates and error rates. When the new version achieves 98%+ agreement with production and fewer errors, it's promoted. This enables safe testing on real data without user impact.
        </p>
        <div className="border-l-4 border-[var(--accent)] pl-4 mb-4">
          <p className="text-[var(--accent-text)] font-medium">Evaluation Tips:</p>
          <ul className="list-disc list-inside text-[var(--text-secondary)] mt-2 space-y-1">
            <li>Never deploy a spec that hasn't passed your full test suite—"quick fixes" bypassing eval cause production incidents</li>
            <li>Include adversarial cases: empty inputs, SQL injection attempts, prompt leaks, contradictory instructions</li>
            <li>Measure both quality AND cost—a 1% accuracy gain that doubles token costs may not be worth it</li>
            <li>Use holdout test sets that your team has never seen—prevents overfitting specs to known cases</li>
            <li>Automate evaluation early—manual testing doesn't scale beyond 20 test cases</li>
          </ul>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Continuous evaluation monitors production outputs for degradation over time. User language evolves, product features change, and model behavior shifts—all can cause spec performance to drift. Set up automated alerts when error rates exceed thresholds, and schedule monthly deep evaluations where human raters assess a sample of production outputs. The best teams treat evaluation as an ongoing process, not a one-time pre-deployment step.
        </p>
      </section>
    </TopicLayout>
  );
}
