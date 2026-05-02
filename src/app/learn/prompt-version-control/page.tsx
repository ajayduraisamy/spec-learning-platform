import TopicLayout from "@/components/TopicLayout";

export default function PromptVersionControlPage() {
  return (
    <TopicLayout
      section="Advanced + Real World"
      lessonNumber="Lesson 28"
      title="Prompt Version Control"
      currentHref="/learn/prompt-version-control"
    >
      <section>
        <h2 className="text-xl font-semibold">What Is Prompt Version Control?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Prompt version control is the systematic management of prompt changes over time using version control systems (Git), branching strategies, review processes, and automated testing. It treats prompts as first-class code artifacts that require the same rigor as software code: version tracking, code review, testing before deployment, and the ability to roll back to previous versions when issues are discovered.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The analogy to software version control is intentional and productive. Just as Git tracks every change to a codebase, prompt version control tracks every change to a prompt template. Just as code review catches bugs before they reach production, prompt review catches quality issues before they affect users. Just as CI/CD pipelines test and deploy code automatically, prompt pipelines evaluate and deploy prompt changes through automated quality checks.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Prompt version control becomes essential when multiple team members are working on prompts simultaneously. Without version control, team members overwrite each other's changes, lose track of which version is in production, and cannot reproduce outputs from previous versions. With version control, every change is tracked, every version is accessible, and the path from development to production is clear and auditable.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The unique aspect of prompt version control (compared to code version control) is the evaluation component. When code changes, unit tests verify correctness. When prompts change, evaluation against a golden dataset verifies quality. The evaluation is probabilistic rather than deterministic: a prompt may produce correct output 95% of the time rather than 100%. The version control system must handle this probabilistic nature by defining quality thresholds rather than binary pass/fail criteria.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Version Control Practices</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The repository structure organizes prompts by category, use case, or team, with each prompt stored as a YAML or JSON file containing the prompt template, metadata (author, created date, last modified date, version), evaluation results, and deployment status. The repository also contains the golden datasets (curated input-output pairs for evaluation), evaluation scripts, and deployment configurations. A typical structure: prompts/ (organized by category), datasets/ (golden datasets for evaluation), eval/ (evaluation scripts and configuration), deploy/ (deployment configurations and CI/CD pipelines).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The branching strategy defines how changes are developed and integrated. Feature branches are created for each prompt change (fix/classification-prompt, improve/extraction-prompt), merged to the main branch after review and evaluation, and tagged with semantic versions (v1.2.0) when deployed to production. Hotfix branches are used for urgent fixes that need to bypass the normal review process (but still require post-deployment review). Release branches are used to prepare a set of prompt changes for production deployment.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The review process ensures that prompt changes are evaluated by at least one other team member before being merged. The reviewer assesses: the change description (is the reason for the change clear?), the evaluation results (does the new version meet quality thresholds?), the impact analysis (which use cases are affected by this change?), and the rollback plan (what happens if this change causes issues in production?). The review is documented in the pull request, creating an auditable record of the decision-making process.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The CI/CD pipeline automates the evaluation and deployment process. On every push to a feature branch: linting checks the prompt syntax, automated evaluation runs the new version against the golden dataset, and a comparison report is generated showing the quality difference between the new and current versions. On merge to main: the prompt is deployed to staging for manual review, then to production through a canary rollout with automatic rollback if quality drops.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Version Control Spec Example — Git-Based Prompt Workflow
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Define the Git-based version control workflow for a team of 10 prompt engineers.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Repository: GitHub, private organization repo. Branch protection: main branch requires PR review (1+ approvals), all CI checks must pass, no force pushes. Prompt format: YAML with fields: id, name, version, description, template (Jinja2), variables, model, parameters, tags, created_at, updated_at, author, status (draft, review, staging, production, deprecated). Evaluation: GitHub Actions workflow on every PR: lint prompt YAML, run evaluation against golden dataset, generate comparison report (accuracy, format_compliance, token_usage before/after), post report as PR comment. Deployment: on merge to main, deploy to staging; after 24h staging with no issues, promote to production via canary (5% {'->'} 25% {'->'} 50% {'->'} 100%).
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Repository structure (prompts/, datasets/, eval/, deploy/, docs/), GitHub Actions workflow files (lint.yml, eval.yml, deploy.yml), PR template (change description, evaluation summary, impact analysis, rollback plan), branching strategy documentation (feature branches, hotfix branches, release branches), version tagging convention (semantic versioning, tag format: prompt-id/v1.2.3), deployment automation (GitHub Actions for canary rollout, Slack notifications for deployment events, automatic rollback on quality regression). Include: conflict resolution procedures (when two team members modify the same prompt), deprecation process (marking prompts as deprecated, migrating users to new versions), and audit reporting (monthly report of all prompt changes, evaluation results, and deployment outcomes).
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A customer service platform with 15 prompt engineers used Git-based version control to manage their library of 300+ prompts. The CI/CD pipeline evaluated every prompt change against the golden dataset before allowing a merge, preventing 23 quality-degrading changes from reaching production in the first 6 months. The PR review process caught 45 prompts that had syntax errors or incorrect variable references, saving an estimated 200 hours of debugging time. The audit trail provided complete documentation of every prompt change for their SOC 2 compliance audit, which passed with zero findings related to prompt management.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A healthcare AI company used prompt version control to manage their HIPAA-regulated prompt library. The version control system provided: immutable history of all prompt changes (required for compliance audits), role-based access control (only authorized personnel could modify prompts), approval workflow (every change required review by a compliance officer), and automated evaluation against clinical accuracy benchmarks. When a new clinical guideline required updates to 20 prompts, the version control system enabled parallel development (each prompt engineer worked on a feature branch), coordinated evaluation (all 20 prompts were evaluated together to ensure consistency), and staged deployment (prompts were deployed in groups by clinical domain to minimize risk).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Prompt Version Control</h2>
        <div className="mt-4 space-y-3">
          {[
            "Treat prompts like code. Store them in version control, review changes, test before deployment, and track versions. The same practices that make code reliable make prompts reliable.",
            "Automate evaluation in CI/CD. Every prompt change should be automatically tested against the golden dataset. Manual evaluation is too slow and inconsistent for production workflows.",
            "Use PR templates that force evaluation documentation. The template should require: what changed, why it changed, evaluation results, and impact analysis. This ensures every change is properly justified.",
            "Deploy through canary rollouts. Gradually increase traffic to the new version while monitoring quality. Roll back automatically if quality drops below the threshold.",
            "Maintain a deprecation process. Old prompt versions should not be deleted immediately; they should be marked as deprecated and retained until all consumers have migrated to the new version.",
            "Generate monthly audit reports. Document all prompt changes, evaluation results, and deployment outcomes. This provides visibility into the evolution of your prompt library and supports compliance audits.",
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
