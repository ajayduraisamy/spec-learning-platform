import TopicLayout from "@/components/TopicLayout";

export default function VersioningPage() {
  return (
    <TopicLayout
      section="Advanced + Real World"
      lessonNumber="Lesson 27"
      title="Versioning"
      currentHref="/learn/versioning"
    >
      <section>
        <h2 className="text-xl font-semibold">What Is AI System Versioning?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          AI system versioning is the practice of tracking and managing changes to prompts, models, configurations, and evaluation criteria over time. Unlike traditional software versioning, which tracks code changes, AI versioning must track changes to non-deterministic components (prompts that produce different outputs for the same input) and external dependencies (LLM APIs that change behavior with model updates). This makes AI versioning more complex and more critical than traditional versioning.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The need for versioning arises from several realities of AI systems: prompts are iteratively refined based on output quality feedback, models are switched based on cost-performance tradeoffs, configurations are adjusted to optimize latency and throughput, and evaluation criteria evolve as the system's requirements change. Without versioning, it is impossible to determine which combination of prompt, model, and configuration produced a given output, making it impossible to reproduce results, debug issues, or roll back to a previous working state.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          AI versioning operates at multiple levels: prompt versioning (tracking changes to prompt templates and their instantiated versions), model versioning (tracking which model and model version was used for each request), configuration versioning (tracking system parameters like temperature, max_tokens, retry settings), and evaluation versioning (tracking the evaluation criteria and golden datasets used to assess quality). Each level must be versioned independently and the versions must be correlated in request logs.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The deployment strategy for versioned AI systems typically follows a canary rollout pattern: the new version is deployed to a small percentage of traffic (5-10%), its performance is compared against the current version using the evaluation framework, and if it meets quality and performance thresholds, the traffic percentage is gradually increased until the new version serves 100% of traffic. If the new version underperforms, it is rolled back to the previous version.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Versioning Components</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Prompt versioning tracks every change to prompt templates, including the content change, the author, the timestamp, the reason for the change, and the evaluation results that justified the change. Each prompt version has a unique identifier (semantic version: v1.2.3, or commit hash) and is stored in a version control system (Git). When a prompt is deployed, the version identifier is recorded in the request log, enabling correlation between the prompt version and the output quality.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Model versioning tracks which LLM and which specific version was used for each request. This is critical because model providers frequently update their models, sometimes without changing the model name (silent updates). By recording the model version hash (a unique identifier for the specific model snapshot) with each request, you can correlate output quality with the model version and detect when a model update causes quality regression.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Configuration versioning tracks the system parameters that affect LLM behavior: temperature, top_p, max_tokens, frequency_penalty, presence_penalty, stop_sequences, and retry settings. These parameters can significantly impact output quality and cost. By versioning configurations and recording the configuration version with each request, you can reproduce any output by replaying the request with the same prompt version, model version, and configuration version.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The deployment pipeline for versioned AI systems includes: version creation (new prompt, model, or configuration version is created), evaluation (new version is tested against the golden dataset and compared to the current version), staging deployment (new version is deployed to a staging environment for manual review), canary deployment (new version is deployed to 5-10% of production traffic), gradual rollout (traffic percentage is increased based on performance metrics), and full deployment (new version serves 100% of traffic). At any point, the pipeline can be rolled back to the previous version.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Versioning Spec Example — Prompt Version Management
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior ML engineer specializing in prompt versioning and deployment strategies for production AI systems.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Design the versioning and deployment system for a prompt library with 50+ prompts.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Versioning: semantic versioning (MAJOR.MINOR.PATCH) for prompts. MAJOR: breaking change (output format changed, quality impact {'>'} 5%). MINOR: non-breaking improvement (quality improvement {'>'} 2%, new constraint added). PATCH: minor fix (typo, formatting). Storage: Git repository with branch-per-prompt, PR review required for all changes. Evaluation: every new version tested against golden dataset (100 examples), must meet quality threshold (accuracy {'>='} 95%, format_compliance {'>='} 99%). Deployment: canary rollout (5% {'->'} 25% {'->'} 50% {'->'} 100% over 24 hours), automatic rollback if quality drops {'>'} 3% at any stage. Rollback: revert to previous version within 5 minutes, notify team of rollback reason.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Versioning workflow (create branch {'->'} modify prompt {'->'} run evaluation {'->'} open PR {'->'} review {'->'} merge {'->'} deploy canary {'->'} monitor {'->'} promote or rollback), version metadata schema (version_id, prompt_id, author, timestamp, change_description, evaluation_results, deployment_status), canary deployment configuration (traffic percentages, monitoring duration at each stage, quality comparison metrics, automatic promotion/rollback rules), rollback procedure (commands, notification, post-rollback evaluation). Include: version comparison tool (side-by-side diff of prompt versions, quality comparison, cost comparison), audit trail (complete history of all prompt changes with evaluation results and deployment outcomes).
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The versioning system applies software engineering best practices to prompt management. Semantic versioning communicates the significance of each change: MAJOR versions indicate breaking changes that may require downstream updates, MINOR versions indicate improvements that are backward-compatible, and PATCH versions indicate minor fixes that have no functional impact. This enables consumers of the prompt library to understand the risk of upgrading to a new version.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The canary deployment pattern ensures that new prompt versions are validated in production before being fully deployed. At each stage (5%, 25%, 50%, 100%), the quality metrics of the new version are compared against the current version. If the new version's quality drops more than 3% below the current version at any stage, the deployment is automatically rolled back. This prevents quality regressions from reaching all users.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The rollback procedure is designed for speed: the previous version can be restored within 5 minutes, minimizing the duration of any quality regression. The rollback notification ensures the team is aware of the issue and can investigate the root cause. The post-rollback evaluation compares the rolled-back version against the golden dataset to confirm that the previous version is still performing as expected.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A legal document analysis company used versioning to manage their library of 200+ prompts covering contract review, clause extraction, and risk assessment. When a new regulation required updates to 30 prompts, the versioning system enabled them to: create new versions for all 30 prompts in parallel, evaluate each new version against the golden dataset, deploy the updates through canary rollouts, and monitor quality at each stage. The entire update process took 3 days (compared to the previous manual process which took 2 weeks), and zero quality regressions occurred because the automated evaluation caught two prompts that had not been updated correctly before they reached production.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A customer service AI used versioning to manage the transition from GPT-3.5-turbo to GPT-4o. They created new configuration versions that specified the new model, evaluated them against the golden dataset, and discovered that 15 of their 50 prompts performed worse on GPT-4o than on GPT-3.5-turbo (due to the different response style). They updated those 15 prompts to work better with GPT-4o, re-evaluated, and then deployed the combined prompt+model update through canary rollouts. The versioning system provided a complete audit trail of which prompts were changed, why they were changed, and how the changes affected quality.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for AI Versioning</h2>
        <div className="mt-4 space-y-3">
          {[
            "Version everything: prompts, models, configurations, evaluation criteria, and golden datasets. Without comprehensive versioning, you cannot reproduce results or debug issues.",
            "Use semantic versioning for prompts. MAJOR for breaking changes, MINOR for improvements, PATCH for fixes. This communicates the risk of upgrading to consumers.",
            "Always evaluate new versions before deployment. Run the new version against the golden dataset and compare quality metrics to the current version. Never deploy untested versions.",
            "Use canary rollouts, not big-bang deployments. Gradually increase traffic to the new version while monitoring quality. Roll back automatically if quality drops.",
            "Record the version of every component with each request. The request log should include prompt_version, model_version, and config_version for full reproducibility.",
            "Maintain an audit trail of all changes. Every version change should document: what changed, why it changed, who changed it, and what the evaluation results were.",
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
