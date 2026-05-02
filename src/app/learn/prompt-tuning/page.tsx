import TopicLayout from "@/components/TopicLayout";

export default function PromptTuningPage() {
  return (
    <TopicLayout
      section="Core Engineering"
      lessonNumber="Lesson 9 of 10"
      title="Prompt Tuning"
      currentHref="/learn/prompt-tuning"
    >
      <section>
        <h2 className="text-2xl font-bold mb-4">Understanding Prompt Tuning</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Prompt tuning is the systematic optimization of prompt content to maximize output quality against a defined metric. Unlike ad-hoc prompt editing ("let me try adding this phrase"), tuning follows a structured methodology: define an objective function (e.g., format compliance rate), establish a baseline, generate candidate variations, evaluate them against test cases, and select the best performer. This transforms prompt engineering from art to science.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The tuning loop follows: baseline measurement → hypothesis generation → candidate creation → evaluation → selection → repeat. Start by measuring current performance on your test suite. Generate 5-10 variations of your prompt, each testing a specific hypothesis ("adding 'think step by step' improves reasoning", "explicit JSON schema improves format compliance"). Evaluate all candidates, keep the winner, and iterate.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Effective tuning requires a held-out test set that wasn't used during tuning. If you tune against your entire test suite, you risk overfitting—the tuned prompt works perfectly on known cases but fails on new inputs. Use a train/validation/test split: tune on the training set, select candidates using the validation set, and measure final performance on the held-out test set. This methodology comes directly from machine learning best practices.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The exploration vs exploitation tradeoff determines how aggressively you modify prompts. Early tuning phases should explore widely: test different personas, output formats, instruction phrasings, and example selections. Later phases exploit the best-performing structure by making fine-grained adjustments (wording tweaks, example ordering). Spending 80% of effort on exploration yields better final performance than premature exploitation of a suboptimal structure.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Parameter-Efficient Tuning Techniques</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Instruction phrasing experiments test how different wordings affect model behavior. "You MUST output JSON" vs "Output JSON only" vs "The response must be valid JSON" can produce dramatically different compliance rates. Systematically test imperative vs declarative phrasings, positive vs negative constraints ("do X" vs "never do Y"), and varying levels of explicitness. Document which phrasings work best for each model family.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Few-shot example optimization tunes which examples to include and in what order. Test: example count (1, 3, 5 shots), example ordering (most relevant first vs diverse coverage), and example similarity to test cases (close matches vs broader coverage). A counterintuitive finding: examples too similar to test cases can cause overfitting, where the model mimics example wording rather than learning the underlying pattern.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Tuning Experiment</div>
          <pre className="whitespace-pre-wrap">
{`BASELINE (current prompt):
"You are a helpful assistant. Extract invoice data from the text."

CANDIDATE A (added schema):
"You are an invoice specialist. Extract data. Output JSON: {vendor, number, total}"

CANDIDATE B (added constraints):
"You are an invoice specialist. Output ONLY JSON. No text before/after. Schema: {vendor, number, total}"

CANDIDATE C (added few-shot):
[Same as B + 2 example extractions]

EVALUATE ALL ON TEST SET:
Baseline: 72% format compliance
Candidate A: 84% format compliance
Candidate B: 96% format compliance  ← WINNER
Candidate C: 95% format compliance (not worth extra tokens)`}
          </pre>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Output format tuning experiments with different schema representations. JSON schema can be represented as: inline objects (<code className="text-[var(--accent-text)]">{"{field: type}"}</code>), JSON Schema (formal specification), or natural language descriptions ("include a vendor field with the company name"). Test each representation—some models respond better to formal schemas, others to natural language descriptions. The difference can be 10-20% in format compliance.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Automated Tuning with DSPy and Similar Frameworks</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          DSPy is a framework that automates prompt tuning through compilation. You define modules (task components), provide training examples, and the framework automatically searches for optimal prompts using techniques like random search, bootstrap fine-tuning, and label-guided generation. DSPy can discover prompt patterns that humans wouldn't think to try, often achieving 5-15% accuracy improvements over hand-tuned prompts.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The DSPy workflow: define a signature (input/output specification), create a module (predictor with prompt template), provide a small training set (10-50 examples), and compile with a metric function. The compiler tries different prompt variations, few-shot selections, and reasoning strategies, keeping the best configuration. This shifts human effort from prompt writing to metric design—defining what "good output" means becomes the critical task.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Limitations of automated tuning include: computational cost (evaluating many candidates requires many API calls), metric gaming (optimizing for the metric rather than true quality), and lack of interpretability (the best prompt may use obscure patterns). Human review of tuned prompts remains essential—automated tuning finds what works, but humans must verify why it works and whether it's safe for production deployment.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Hyperparameter Tuning for Prompts</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Temperature tuning affects output determinism and creativity. For classification and extraction tasks, temperature=0 gives reproducible outputs. For creative tasks, temperature=0.7 introduces beneficial variation. Systematically test temperature values (0, 0.3, 0.7, 1.0) on your test suite and measure both accuracy and output diversity. Some tasks benefit from "ensemble temperature": run 3 times at temp=0.7 and take majority vote.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Few-shot count tuning finds the optimal number of examples. Test with 0, 1, 2, 3, 5, and 8 examples on a validation set. Plot accuracy vs example count—most tasks show rapid improvement from 0→2 examples, plateau at 3-5, and may degrade at 8+ due to context dilution. The optimal count depends on task complexity: simple classification needs 1-2 shots, complex reasoning needs 3-5 shots.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Hyperparameter Sweep</div>
          <pre className="whitespace-pre-wrap">
{`TUNING EXPERIMENT: Invoice Extraction

Parameter: Temperature
Values: [0, 0.3, 0.7]
Metric: Format compliance + accuracy

Results:
temp=0.0: 98% format, 94% accuracy (consistent)
temp=0.3: 96% format, 95% accuracy (good balance)
temp=0.7: 82% format, 93% accuracy (too creative)

SELECTED: temp=0.3 (highest accuracy while maintaining compliance)`}
          </pre>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Model version tuning compares performance across model versions. GPT-4o might outperform GPT-4-turbo on reasoning tasks but underperform on code generation. Claude Sonnet might excel at following complex instructions while Haiku is sufficient for simple classification. Systematic A/B tests across model versions, combined with cost/latency analysis, identify the optimal model for each spec in your system.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Real-World Tuning Workflows</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          A production sentiment analysis system used structured tuning: they tested 20 prompt variations across 3 models (GPT-3.5, GPT-4, Claude Haiku) with 5 temperature settings, evaluating on 500 labeled examples. The winning configuration (GPT-4, temp=0, 2-shot examples with diverse sentiment labels) achieved 94% accuracy at $0.03 per 1K requests. The runner-up (Claude Haiku, temp=0, 1-shot, 92% accuracy) cost $0.005—they chose Haiku for 80% cost savings with minimal quality loss.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          A code review automation platform implemented continuous tuning: every week, they retune their prompts against the previous week's human-reviewed PRs. As coding patterns evolve and new team members join, the optimal prompt drifts. Continuous tuning catches this drift automatically and updates prompts when improvements exceed a 2% accuracy threshold. This keeps their system aligned with changing team practices without manual intervention.
        </p>
        <div className="border-l-4 border-[var(--accent)] pl-4 mb-4">
          <p className="text-[var(--accent-text)] font-medium">Prompt Tuning Tips:</p>
          <ul className="list-disc list-inside text-[var(--text-secondary)] mt-2 space-y-1">
            <li>Always tune against a held-out test set—tuning on your training set guarantees overfitting</li>
            <li>Start with 10-20 diverse training examples; more isn't always better</li>
            <li>Test at least 3 phrasing variations for every instruction you write</li>
            <li>Use temperature=0 for tuning experiments to eliminate stochasticity from results</li>
            <li>Document your tuning experiments so future team members don't repeat failed approaches</li>
          </ul>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Anti-patterns in tuning include: tuning to perfection on 5 test cases (massive overfit), changing multiple variables simultaneously (impossible to know what caused improvement), and ignoring token costs (the "best" prompt might use 5000 tokens per request). Good tuning optimizes for the Pareto frontier of quality, cost, and latency—the prompt that maximizes quality per dollar spent, not just raw accuracy.
        </p>
      </section>
    </TopicLayout>
  );
}
