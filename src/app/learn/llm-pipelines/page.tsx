import TopicLayout from "@/components/TopicLayout";

export default function LLMPipelinesPage() {
  return (
    <TopicLayout
      section="AI Systems"
      lessonNumber="Lesson 7 of 10"
      title="LLM Pipelines"
      currentHref="/learn/llm-pipelines"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Are LLM Pipelines?</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          LLM pipelines are structured sequences of large language model invocations, data transformations, and validation steps designed to process inputs through multiple stages and produce reliable, consistent outputs. Unlike single-turn LLM prompts that generate one-off responses, pipelines chain together multiple specialized prompts, each handling a narrow sub-task: extraction, classification, summarization, validation, or formatting. This modular approach improves output quality by breaking complex tasks into simpler, more controllable steps, reduces hallucination by adding validation gates between stages, and enables reusability of individual pipeline stages across different workflows.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          A typical LLM pipeline for document processing might include: (1) a preprocessing step that cleans raw text and extracts structured metadata, (2) a classification step that tags the document by topic and priority, (3) a summarization step that generates a 200-word abstract, (4) a validation step that checks the summary for factual consistency with the original text, and (5) a formatting step that outputs the result in the required JSON schema. Each stage has its own prompt spec, input/output contracts, and error handling rules. If the validation step fails, the pipeline can route the output back to the summarization step for revision, or flag it for human review.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The key advantage of pipelines over single complex prompts is controllability and debuggability. When a single 500-token prompt fails to produce the correct output, it is difficult to pinpoint which part of the instruction was misunderstood. In a pipeline, if the classification stage produces incorrect tags, you can isolate and fix that specific prompt without affecting other stages. Spec engineering for pipelines focuses on defining stage-specific prompts, inter-stage data schemas, validation rules, and retry/fallback logic for each stage independently.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Pipelines also enable cost optimization by using smaller, cheaper models for simple stages and reserving larger, more expensive models for complex reasoning stages. For example, a preprocessing stage might use GPT-3.5-turbo ($0.50/1M input tokens) to clean text, while a summarization stage uses GPT-4o ($5/1M input tokens) for high-quality output. Specs define model selection per stage: "use gpt-3.5-turbo for classification tasks with {'>'}90% accuracy on test set; use gpt-4o only for tasks requiring nuanced reasoning". This tiered approach reduces overall pipeline costs by 40-60% compared to using a single large model for all stages.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Core Components of an LLM Pipeline</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Every production LLM pipeline includes four mandatory components: stage definitions, inter-stage schemas, validation gates, and error handlers. Stage definitions specify the LLM model, prompt template, temperature, max tokens, and stop sequences for each step. Prompts should be stage-specific: a classification prompt does not need instructions about summarization, and vice versa. Specs for stages include few-shot examples relevant to the stage's task—for a sentiment classification stage, include 3-5 examples of positive, negative, and neutral texts with correct labels.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Inter-stage schemas define the shape of data passed between pipeline stages. For example, Stage 1 (extraction) outputs {"{text: string, metadata: {source: string, date: string}}"}, which Stage 2 (classification) accepts as input. Using JSON Schema validation at each transition catches mismatches early: if Stage 1 forgets to include the metadata field, the pipeline throws an error before invoking the more expensive Stage 2 LLM call. Specs for schemas include required fields, data types, enums for categorical values, and regex patterns for formatted strings like dates or IDs.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Validation gates are checkpoints between stages that verify output quality before proceeding. A validation gate might use a separate LLM call with a "critic" prompt: "Evaluate this summary for factual consistency with the source text. Rate 1-5, where 5 is fully consistent. If score {'<'} 4, return 'revise'". Other validation methods include regex pattern matching (for structured outputs), schema validation (for JSON outputs), and statistical checks (summary length must be between 150-250 words). Specs define validation logic per stage, retry limits (max 2 revisions per stage), and escalation rules (send to human if validation fails 3 times).
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Error handlers manage failures at each stage: LLM timeouts, API errors, invalid outputs, and validation failures. Specs define retry strategies: "retry LLM calls once on rate limit errors, twice on timeout, then use fallback model". For validation failures, specs define fallback paths: "if summarization fails validation 2 times, use extractive summarization (first 3 sentences) as fallback". Without explicit error handlers, a single failed stage crashes the entire pipeline and loses all progress from previous stages.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Spec Example: Customer Feedback Analysis Pipeline</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Production spec for a 4-stage pipeline processing customer feedback from surveys:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">PIPELINE: Customer Feedback Analyzer v1.5</div>
          <div className="text-[var(--accent-text)]">STAGE 1: Sentiment Extraction</div>
          <div className="mb-1">Model: gpt-3.5-turbo, temp: 0.1, max_tokens: 200</div>
          <div className="mb-1">Prompt: "Classify sentiment as positive, negative, neutral. Output JSON: {`{sentiment: string, confidence: number}`}"</div>
          <div className="mb-1">Output Schema: {`{sentiment: enum["positive","negative","neutral"], confidence: number 0-1}`}</div>
          <div className="text-[var(--accent-text)]">STAGE 2: Topic Tagging</div>
          <div className="mb-1">Model: gpt-3.5-turbo, temp: 0.0, max_tokens: 150</div>
          <div className="mb-1">Prompt: "Tag feedback with up to 3 topics from: [billing, shipping, product_quality, support, usability]. Output JSON: {`{tags: string[]}`}"</div>
          <div className="text-[var(--accent-text)]">STAGE 3: Response Drafting</div>
          <div className="mb-1">Model: gpt-4o, temp: 0.3, max_tokens: 300</div>
          <div className="mb-1">Input: sentiment + tags + original feedback. Output: 150-word draft response acknowledging issue.</div>
          <div className="text-[var(--accent-text)]">STAGE 4: Compliance Check</div>
          <div className="mb-1">Model: gpt-4o, temp: 0.0, max_tokens: 100</div>
          <div className="mb-1">Prompt: "Check response for policy violations: no refunds promised, no PII shared. Output: {`{compliant: bool, issues: []}`}"</div>
          <div className="text-[var(--accent-text)]">ERROR HANDLING:</div>
          <div>Any stage: retry 2x on API error, fallback to gpt-3.5-turbo if gpt-4o unavailable. Compliance failure → re-route to Stage 3 with issues list.</div>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">Poor pipeline spec:</p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">BAD PIPELINE SPEC:</div>
          <div className="mb-2">Process feedback. Figure out if they like it. Write a response. Check it's okay.</div>
          <div className="text-[var(--text-secondary)] text-xs mt-2">// No stage definitions, no models, no prompts, no schemas, no error handling. Pipeline will produce inconsistent outputs and crash on API errors.</div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Code Example: Multi-Stage Summarization Pipeline</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Implementation of a pipeline with extraction, summarization, validation, and formatting stages:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          {`type PipelineStage = {
  name: string;
  model: string;
  prompt: string;
  outputSchema: object;
  maxRetries: number;
};

async function runPipeline(input: string, stages: PipelineStage[]) {
  let currentInput = input;
  const results: Record<string, any> = {};

  for (const stage of stages) {
    let retries = 0;
    let output: any;

    while (retries <= stage.maxRetries) {
      try {
        const response = await llm.call(stage.model, stage.prompt.replace('{input}', currentInput), { temperature: 0.1 });
        output = JSON.parse(response);
        // Validate against schema
        if (validate(output, stage.outputSchema)) break;
        throw new Error('Schema validation failed');
      } catch (e) {
        retries++;
        if (retries > stage.maxRetries) throw new Error(\`Stage \${stage.name} failed after \${retries} retries\`);
      }
    }

    results[stage.name] = output;
    currentInput = JSON.stringify(output); // Pass output to next stage
  }

  return results;
}`}
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          This pipeline enforces per-stage models, prompts, and schema validation. Retries are scoped to each stage, so a failure in Stage 3 does not re-run Stages 1 and 2, saving cost and latency. A spec for this pipeline would define the output schema for each stage, validation logic, and retry limits. The final results object contains outputs from all stages, enabling end-to-end debugging.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Real-World Use Cases</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Legal document review pipelines: Stage 1 extracts key clauses (liability, termination, payment terms), Stage 2 classifies clauses as favorable/standard/risky, Stage 3 generates a plain-English summary for non-lawyers, Stage 4 validates that no clauses were misclassified. Specs define clause taxonomy (20+ clause types) and validation rules: "if risk score {'>'} 7, flag for senior counsel review".
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Content moderation pipelines: Stage 1 detects toxic language (using a fine-tuned BERT model for speed), Stage 2 classifies violation type (hate speech, harassment, spam), Stage 3 generates a moderation decision (remove, warn, allow), Stage 4 validates decision against community guidelines. Specs define escalation rules: "hate speech classifications require 2-stage validation with different models to reduce false positives".
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Medical report summarization pipelines: Stage 1 extracts patient demographics and test results, Stage 2 summarizes abnormal results, Stage 3 generates a patient-friendly explanation, Stage 4 validates medical accuracy against source data. Specs include privacy rules: "strip all PII from Stage 3 output before sending to patient-facing systems".
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tips for LLM Pipeline Specs</h2>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 mb-6">
          <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-3">
            <li>Use stage-specific models: small/fast models for simple tasks (classification, extraction), large models only for complex reasoning (summarization, drafting). This reduces cost by 40-60%.</li>
            <li>Define strict inter-stage schemas: use JSON Schema with required fields, enums, and type constraints. Validate at every transition to catch errors early.</li>
            <li>Add validation gates between stages: use separate "critic" LLM calls or rule-based checks to verify output quality before proceeding to the next stage.</li>
            <li>Limit retries per stage: max 2 retries for LLM calls, 1 retry for validation failures. Excessive retries increase latency and cost without improving quality.</li>
            <li>Include fallback paths: if a stage fails repeatedly, define a fallback (extractive summary instead of generative, rule-based classification instead of LLM) to avoid pipeline crashes.</li>
            <li>Log each stage's input/output: store stage inputs, outputs, model used, tokens consumed, and latency for cost tracking and debugging.</li>
          </ul>
        </div>
      </section>
    </TopicLayout>
  );
}