import TopicLayout from "@/components/TopicLayout";

export default function EnterpriseUsagePage() {
  return (
    <TopicLayout
      section="Advanced + Real World"
      lessonNumber="Lesson 30"
      title="Enterprise Usage"
      currentHref="/learn/enterprise-usage"
    >
      <section>
        <h2 className="text-xl font-semibold">What Does Enterprise AI Adoption Require?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Enterprise usage of AI systems involves deploying LLM-powered applications at organizational scale, with hundreds or thousands of users, multiple teams, diverse use cases, strict compliance requirements, and integration with existing enterprise systems (ERP, CRM, HRIS, ITSM). Enterprise AI adoption is fundamentally different from startup or individual usage because it must address organizational complexity, regulatory compliance, data governance, change management, and return on investment at scale.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The enterprise AI adoption journey typically follows four phases: experimentation (individual teams exploring AI capabilities, building prototypes), standardization (establishing governance frameworks, shared infrastructure, and best practices), scaling (deploying AI systems across the organization, integrating with enterprise systems), and optimization (continuous improvement of AI systems, cost management, quality monitoring, and ROI measurement). Each phase has different requirements, challenges, and success metrics.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Enterprise spec engineering addresses the unique challenges of organizational-scale AI by providing: standardized spec templates that ensure consistency across teams, governance frameworks that ensure compliance with organizational policies and external regulations, shared infrastructure that reduces duplication of effort, and measurement frameworks that demonstrate ROI to executive leadership. The goal is to enable every team in the organization to use AI effectively while maintaining centralized control over quality, security, and cost.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The organizational change management aspect of enterprise AI adoption is often underestimated. Employees need training on how to use AI tools effectively, managers need to understand how to integrate AI into workflows, IT teams need to manage the infrastructure, and leadership needs to understand the capabilities and limitations of AI systems. Spec engineering supports change management by providing clear, documented specifications that serve as training materials, quality standards, and operational procedures.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Enterprise Requirements</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Governance and compliance define the rules for how AI systems can be used within the organization. This includes: data handling policies (what data can be sent to LLMs, what must be anonymized), model usage policies (which models are approved, which are prohibited), output validation requirements (which use cases require human review before outputs are used), audit requirements (what must be logged, how long logs are retained, who can access them), and regulatory compliance requirements (GDPR, HIPAA, SOX, PCI-DSS, industry-specific regulations).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Shared infrastructure provides the platform that all teams use to build and deploy AI systems. This includes: the LLM API gateway (routing requests to approved models, enforcing rate limits, tracking costs), the prompt registry (storing and versioning prompts, providing access control), the evaluation platform (running automated quality tests, maintaining golden datasets), the monitoring dashboard (tracking usage, quality, and cost across all teams), and the deployment pipeline (canary rollouts, automated rollback, audit logging).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Team enablement provides the tools, training, and support that teams need to use AI effectively. This includes: spec templates (pre-built templates for common use cases), best practice documentation (guides for writing effective specs, avoiding common pitfalls), training programs (workshops, tutorials, certification programs), technical support (dedicated AI engineering team that helps other teams build and debug AI systems), and community of practice (regular meetings where teams share experiences, lessons learned, and new techniques).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          ROI measurement demonstrates the value of AI investments to executive leadership. This includes: cost tracking (total LLM spend, cost per use case, cost per user), productivity metrics (time saved, tasks automated, output quality improvement), business impact metrics (revenue generated, costs avoided, customer satisfaction improvement), and efficiency metrics (development velocity, time-to-deployment, defect reduction). ROI measurement requires baseline metrics (before AI adoption) and continuous tracking (after AI adoption) to demonstrate the impact.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Enterprise Spec Example — AI Governance Framework
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a chief AI officer designing the enterprise AI governance framework for a Fortune 500 company.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Design the AI governance framework for enterprise-wide AI adoption across 20 business units.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Organization: 50,000 employees, 20 business units, operating in 30 countries. Regulatory: GDPR (EU), CCPA (California), HIPAA (healthcare division), SOX (financial reporting). Data policy: no PII/PHI sent to external LLMs without anonymization, no proprietary code sent to public models, all AI outputs reviewed before external communication. Model policy: approved models list (gpt-4o, claude-3-sonnet, internal fine-tuned model), prohibited models (any model not on approved list, any model with data retention policy that conflicts with company policy). Approval process: new use cases require AI governance board review (security assessment, compliance check, ROI justification, risk assessment), approval within 10 business days.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Governance framework document with: AI usage policy (what is allowed, what is prohibited, what requires approval), approval workflow (submission {'->'} assessment {'->'} review {'->'} approval {'->'} deployment {'->'} monitoring), compliance checklist (GDPR, CCPA, HIPAA, SOX requirements mapped to specific controls), risk assessment framework (data sensitivity classification, use case risk level, mitigation requirements), shared infrastructure specification (API gateway, prompt registry, evaluation platform, monitoring dashboard, deployment pipeline), team enablement program (training curriculum, certification levels, community of practice structure), ROI measurement framework (baseline metrics, KPIs, reporting cadence, executive dashboard).
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The enterprise AI governance framework provides a comprehensive structure for managing AI adoption across a large, complex organization. The AI usage policy clearly defines what is allowed (using approved models for approved use cases), what is prohibited (using unapproved models, sending sensitive data to external LLMs), and what requires approval (new use cases, new models, changes to existing systems). This clarity prevents unauthorized AI usage while enabling authorized teams to move quickly within the defined boundaries.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The approval workflow balances governance with agility: new use cases are assessed within 10 business days, which is fast enough to not block innovation but thorough enough to ensure security and compliance. The assessment covers four dimensions: security (does the use case introduce security risks?), compliance (does it meet regulatory requirements?), ROI (does the expected benefit justify the cost?), and risk (what is the worst-case scenario and how is it mitigated?).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The shared infrastructure specification ensures that all teams build on a common foundation rather than creating their own infrastructure. This reduces duplication of effort, ensures consistent security and compliance controls, enables centralized cost management, and provides a platform for cross-team collaboration and knowledge sharing. The team enablement program ensures that teams have the skills and support they need to use AI effectively.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A global financial services firm with 100,000 employees implemented an enterprise AI governance framework that enabled 500+ AI use cases across 40 business units while maintaining compliance with financial regulations (SOX, Basel III, MiFID II) and data privacy laws (GDPR, CCPA). The framework provided: a centralized AI platform (API gateway, prompt registry, evaluation platform) used by all business units, an approval process that reviewed new use cases within 10 business days, compliance controls that automatically redacted PII and financial data from prompts sent to external LLMs, and an ROI dashboard that demonstrated $150M in annual value from AI adoption (cost savings + revenue generation). The firm's approach became an industry case study for responsible AI adoption in regulated industries.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A global manufacturing company used spec engineering to standardize AI adoption across their 200 factories in 30 countries. They created spec templates for common manufacturing use cases: quality inspection (visual defect detection), predictive maintenance (equipment failure prediction), supply chain optimization (demand forecasting, inventory management), and safety monitoring (hazard detection, incident reporting). Each spec template was localized for regional requirements (language, regulations, cultural considerations) while maintaining the core structure and quality standards. The standardized approach enabled them to deploy AI systems 3x faster than the previous ad-hoc approach, with consistent quality across all factories and centralized monitoring of all AI systems from their global operations center.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Enterprise AI Adoption</h2>
        <div className="mt-4 space-y-3">
          {[
            "Start with governance, not technology. Define the rules for AI usage before teams start building. Without governance, teams will build systems that are insecure, non-compliant, or economically unsustainable.",
            "Build shared infrastructure early. Teams that build their own AI infrastructure duplicate effort, create inconsistent security controls, and make centralized cost management impossible.",
            "Invest in team enablement. Technology alone does not drive adoption. Teams need training, support, and community to use AI effectively.",
            "Measure ROI from day one. Establish baseline metrics before AI adoption begins. Track cost savings, productivity gains, and business impact continuously.",
            "Balance governance with agility. Overly restrictive governance stifles innovation; overly permissive governance creates risk. Find the balance that enables rapid experimentation within safe boundaries.",
            "Plan for change management. AI adoption changes how people work. Provide training, support, and clear communication to help employees adapt to new workflows.",
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
