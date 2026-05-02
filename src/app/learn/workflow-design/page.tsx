import TopicLayout from "@/components/TopicLayout";

export default function WorkflowDesignPage() {
  return (
    <TopicLayout
      section="AI Systems"
      lessonNumber="Lesson 6 of 10"
      title="Workflow Design"
      currentHref="/learn/workflow-design"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Is Workflow Design?</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Workflow design in AI systems is the practice of defining structured, repeatable sequences of tasks that agents or automated systems execute to achieve a specific, measurable outcome. Unlike ad-hoc agent interactions where the LLM dynamically decides each next step, workflows predefine the order of operations, decision points, data flow between steps, and error handling protocols. This structure reduces variability, ensures compliance with business rules, and makes system behavior predictable, debuggable, and auditable. Spec engineering for workflows focuses on defining atomic step contracts, deterministic transition logic, data schemas, and recovery procedures for failures.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          A well-designed workflow breaks complex, multi-step processes into atomic, testable steps with clear input/output contracts. For example, a medical claims processing workflow might include steps: intake → eligibility check → medical review → approval/denial → notification. Each step has defined inputs (e.g., intake step receives claim form PDF), outputs (e.g., eligibility step outputs boolean is_eligible and denial_reason if false), success criteria, and timeout rules. Specs define what happens when a step fails: retry 3 times with exponential backoff, then escalate to human review, or roll back to the previous step. Without these rules, workflows hang indefinitely or produce partial outputs that corrupt downstream steps.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Workflows differ from multi-agent systems in that workflows are primarily deterministic (predefined execution order) while MAS can be dynamic (agents negotiate task allocation). However, modern workflows often integrate agent steps—for example, a "draft response" step that invokes a customer support agent, followed by a "compliance check" step that invokes a policy enforcement agent. Spec engineering for hybrid workflows defines which steps are deterministic (fixed logic, no LLM), which use agents (LLM-driven with tool access), and how agent outputs are validated before proceeding to the next step. This hybrid approach combines the reliability of deterministic logic with the flexibility of AI agents.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The primary benefit of workflow design is auditability and reproducibility. Every step execution, input, output, error, and decision point is logged, creating a complete trace of the process. This is mandatory for regulated industries like finance (SOX compliance), healthcare (HIPAA audit trails), and government contracting. Specs define logging requirements: "log step start/end times, anonymized inputs, outputs, and error codes to audit_log table with retention period 7 years". Workflows also enable A/B testing of process changes: you can run two versions of a workflow in parallel to measure which produces better outcomes (faster processing, higher approval rates, fewer errors).
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Core Components of a Workflow</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Every functional workflow consists of five mandatory components: steps, transitions, triggers, data schemas, and error handlers. Steps are atomic units of work with single responsibilities—each step has a defined tool or agent, input schema, output schema, and timeout. Transitions define the execution order: linear (Step A → Step B → Step C), conditional (if Step A output.status = "approved", go to Step B; else go to Step C), or parallel (Steps B and C run simultaneously after Step A completes). Specs for transitions use explicit, deterministic conditions rather than LLM-driven decisions to maintain workflow predictability.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Triggers define what initiates a workflow instance: user actions (clicking "submit claim"), scheduled times (every Friday at 5 PM for payroll processing), or external events (webhook from Stripe on successful payment). Specs define trigger validation rules: "on payment_webhook, validate Stripe signature, extract order_id and amount, reject if amount {'<'} 0.01". Data schemas define the shape of data passed between steps: {`"Step A outputs { order_id: string, total: number, currency: enum['USD','EUR'] }, Step B requires order_id and total as inputs"`}. Mismatched schemas are a leading cause of workflow failures, so specs include JSON Schema validation rules for every inter-step data transfer.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Error handlers define behavior when a step fails: retry with backoff, skip to a fallback step, roll back previous steps, or escalate to human oversight. Specs define retry limits (max 3 retries, 5s initial delay with 2x backoff), escalation thresholds (escalate if step fails 3 consecutive times or timeout exceeds 30 minutes), and rollback logic (if publish step fails, revert document status to "draft"). Without explicit error handlers, a single failed API call or LLM timeout can break the entire workflow and leave the system in an inconsistent state.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Workflow state management tracks the current step, completed steps, intermediate data, and execution metadata. Specs define state persistence rules: "save workflow state to PostgreSQL after each step completion; resume from last completed step on system restart". State should only include necessary data—storing full LLM response logs or large binary objects (PDFs, images) in workflow state increases latency and storage costs. For large data, specs define reference passing: store the data in object storage (S3/GCS) and pass the object key between steps.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Spec Example: Content Publishing Workflow</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Production spec for a content publishing workflow used by a digital media company:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">WORKFLOW: Content Publishing v2.0</div>
          <div className="mb-2">TRIGGER: User clicks "Submit for Review" in CMS</div>
          <div className="text-[var(--accent-text)]">STEPS:</div>
          <div className="mb-1">1. Draft Review: Input {'{'}draft_id{'}'}, Tool: writer agent. Output {'{'}approved: bool, edit_log{'}'}. Timeout: 15m. Max 2 revisions.</div>
          <div className="mb-1">2. Legal Check: Input {'{'}draft_content{'}'}, Tool: legal API. Output {'{'}compliant: bool, issues: []{'}'}. Timeout: 30m.</div>
          <div className="mb-1">3. Manager Approval: Input {'{'}draft_content, legal_report{'}'}, Human step. Output {'{'}approved: bool, feedback{'}'}. Timeout: 24h.</div>
          <div className="mb-1">4. Publish: Input {'{'}approved_draft{'}'}, Tool: CMS API. Output {'{'}url: string, publish_time{'}'}.</div>
          <div className="text-[var(--accent-text)]">TRANSITIONS:</div>
          <div className="mb-1">Draft Review → Legal Check (approved=true)</div>
          <div className="mb-1">Draft Review → Draft Review (approved=false, revision_count {'<'} 2)</div>
          <div className="mb-1">Legal Check → Manager Approval (compliant=true)</div>
          <div className="mb-1">Legal Check → Draft Review (compliant=false, auto-fix possible)</div>
          <div className="mb-1">Manager Approval → Publish (approved=true)</div>
          <div className="mb-1">Manager Approval → Draft Review (approved=false, revision_count {'<'} 1)</div>
          <div className="text-[var(--accent-text)]">ERROR HANDLING:</div>
          <div>Any step: retry 2x on timeout/API error, then escalate to content-ops@company.com</div>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">Poor workflow spec:</p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">BAD WORKFLOW SPEC:</div>
          <div className="mb-2">Write content, check legal, get manager sign-off, publish. Fix issues if they come up.</div>
          <div className="text-[var(--text-secondary)] text-xs mt-2">// No step definitions, no transitions, no timeouts, no error handling, no retry logic. Workflow will hang on human delays and fail silently on API errors.</div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Code Example: Workflow Engine Implementation</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Minimal workflow engine with step execution, conditional transitions, and retry logic:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          {`type StepStatus = 'pending' | 'running' | 'completed' | 'failed';
type Step = {
  name: string;
  execute: (input: any) => Promise<any>;
  maxRetries: number;
  timeoutMs: number;
};

class WorkflowEngine {
  constructor(private steps: Step[], private transitions: Record<string, string[]>) {}

  async run(initialInput: any) {
    let currentStep = this.steps[0];
    let input = initialInput;
    const state: Record<string, any> = {};

    while (currentStep) {
      let retries = 0;
      let result: any;
      currentStep.status = 'running';

      while (retries <= currentStep.maxRetries) {
        try {
          const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), currentStep.timeoutMs));
          result = await Promise.race([currentStep.execute(input), timeout]);
          break;
        } catch (e) {
          retries++;
          if (retries > currentStep.maxRetries) {
            currentStep.status = 'failed';
            throw new Error(\`Step \${currentStep.name} failed after \${retries} retries\`);
          }
        }
      }

      state[currentStep.name] = result;
      currentStep.status = 'completed';

      const nextStepNames = this.transitions[currentStep.name] || [];
      const nextStepName = nextStepNames.find(name => this.evaluateTransition(name, result, state));
      currentStep = nextStepName ? this.steps.find(s => s.name === nextStepName) : undefined;
      input = result;
    }
    return state;
  }

  private evaluateTransition(stepName: string, lastResult: any, state: any) {
    return true; // spec defines actual transition conditions
  }
}`}
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          This engine enforces the spec's timeout and retry rules, tracks state between steps, and follows transition logic to determine the next step. A spec for this engine would define the transition evaluation function, state persistence method, and error escalation logic. The separation of step execution and transition logic makes the workflow testable: you can unit test individual steps and validate transition conditions independently of the engine.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Real-World Use Cases</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Software release workflow: code commit → CI test run → security scan → staging deploy → integration tests → manager approval → production deploy. Each step has defined tools (GitHub Actions, Snyk, Kubernetes), timeouts (CI tests max 10 minutes), and rollback triggers (if staging tests fail, auto-rollback and notify team). Specs define approval thresholds: "production deploy requires 2/3 senior engineer approvals for major versions".
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Customer onboarding workflow: signup form → email verification → KYC document upload → KYC review (agent) → assign account manager → send welcome kit. Triggers on signup form submission, transitions based on KYC status (approved/rejected/incomplete). Specs define KYC retry limits: "max 3 document resubmissions; escalate to compliance team after 3rd rejection". Welcome kit step only triggers after all previous steps complete successfully.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Invoice processing workflow: receive invoice PDF → OCR extraction → PO match → manager approval (if amount {'>'} $1000) → payment API call → send confirmation email. Error handling: "if PO match fails, send email to vendor for corrected invoice; if payment API fails, retry 2x then alert finance team". Specs define data retention: "store invoice PDFs for 7 years per tax regulations; delete intermediate OCR data after 90 days".
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tips for Workflow Specs</h2>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 mb-6">
          <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-3">
            <li>Use atomic steps: each step should perform exactly one responsibility. This makes steps independently testable and easier to replace without rewriting the entire workflow.</li>
            <li>Define deterministic transitions: avoid "let the agent decide next step" in workflows. Use explicit conditions (if/else, switch) based on step outputs to maintain predictability.</li>
            <li>Set timeouts for every step: human steps (24-48h), API steps (30s-15m), agent steps (5-30m). Timed-out steps trigger retry or escalation rather than hanging indefinitely.</li>
            <li>Validate inter-step data schemas: use JSON Schema or TypeScript types to ensure step B receives exactly the data shape step A outputs. Catch mismatches early with validation before step execution.</li>
            <li>Test with step failures: simulate API errors, timeouts, human rejections, and invalid inputs to verify retry logic and escalation paths work as specified.</li>
            <li>Log every step execution: record step name, start/end times, input (anonymized), output, and error details. This trace is invaluable for debugging and compliance audits.</li>
          </ul>
        </div>
      </section>
    </TopicLayout>
  );
}