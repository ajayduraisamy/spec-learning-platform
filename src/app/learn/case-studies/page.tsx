import TopicLayout from "@/components/TopicLayout";

export default function CaseStudiesPage() {
  return (
    <TopicLayout
      section="Advanced + Real World"
      lessonNumber="Lesson 29"
      title="Case Studies"
      currentHref="/learn/case-studies"
    >
      <section>
        <h2 className="text-xl font-semibold">What Can We Learn from Real-World Spec Engineering?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Case studies provide concrete evidence of how spec engineering principles are applied in production systems across industries. They document the challenges faced, the solutions implemented, the results achieved, and the lessons learned. Studying these case studies helps teams avoid common pitfalls, adopt proven patterns, and understand the practical tradeoffs involved in building AI-powered systems at scale.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The case studies presented here span multiple industries and use cases: customer service automation, code generation, document analysis, healthcare diagnostics, and financial analysis. Each case study demonstrates how spec engineering transformed an ad-hoc, unreliable AI implementation into a production-grade system that delivers consistent, measurable value. The common thread across all case studies is the systematic application of spec principles: explicit requirements, structured formats, evaluation frameworks, and continuous monitoring.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The most valuable insights from case studies are the negative results—the things that did not work and why. Teams that skipped evaluation frameworks deployed low-quality outputs to production. Teams that did not version their prompts struggled to reproduce results and debug issues. Teams that did not monitor output quality missed model drift for weeks. These failures are as instructive as the successes, and they are documented alongside the positive outcomes.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Each case study includes quantifiable results: cost reduction percentages, quality improvement metrics, time-to-deployment reductions, and user satisfaction improvements. These numbers provide benchmarks that other teams can use to set realistic expectations for their own spec engineering initiatives. While every organization's context is different, the patterns and principles are universally applicable.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Case Study 1: Customer Service Automation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A SaaS company with 50,000 customers was spending $2M annually on customer support. They implemented an AI-powered support agent using spec engineering to handle tier-1 support tickets (password resets, billing inquiries, feature questions). The spec defined: the agent's role (friendly, knowledgeable, empathetic support representative), task (resolve tier-1 tickets without human escalation), constraints (never share confidential information, always verify account ownership before discussing account details, escalate to human if confidence {'<'} 80%), and output format (structured response with: greeting, answer, follow-up question, escalation option if applicable).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Results after 6 months: the AI agent resolved 65% of tier-1 tickets without human intervention, reducing support costs by $800,000 annually (40% reduction). Customer satisfaction for AI-handled tickets was 4.2/5.0 (compared to 4.5/5.0 for human-handled tickets). The key success factors were: explicit escalation rules (the agent knew exactly when to hand off to a human), structured output format (consistent responses that were easy to parse and display), and continuous quality monitoring (the evaluation framework caught quality regressions within 24 hours).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Lessons learned: the initial spec did not include sufficient constraints on information sharing, resulting in two incidents where the agent shared account details without proper verification. The spec was updated to require explicit account ownership verification before any account-specific information could be shared, and this constraint was added to the evaluation framework to ensure compliance. The incident demonstrated the importance of explicit security constraints in every spec, not just those perceived as security-critical.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Case Study 2: Code Generation Platform</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A developer tools company built an AI code generation platform that produced boilerplate code, API endpoints, database schemas, and test suites from natural language descriptions. The platform used spec engineering to ensure generated code met their quality standards: it compiled, passed tests, followed the project's coding conventions, and included proper error handling and documentation. The spec defined: the role (senior engineer in the target language), task (generate code matching the description), constraints (follow the project's style guide, include error handling, add docstrings, use existing libraries not deprecated ones), and output format (code block with language identifier, followed by usage example).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Results after 12 months: the platform generated 10,000+ code artifacts per month with a 92% acceptance rate (code that was used without modification or with minor edits). Developer productivity increased by 35% (measured by features delivered per developer per sprint). The key success factors were: language-specific specs (separate specs for Python, TypeScript, Go, and Java, each encoding the idioms and conventions of that language), automated testing (every generated code artifact was compiled and tested before being presented to the user), and style guide enforcement (the spec included the project's exact coding conventions, ensuring generated code matched the existing codebase).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Lessons learned: the initial approach used a single spec for all languages, which produced code that was syntactically correct but idiomatically wrong (Python code that looked like Java, TypeScript code that did not use modern patterns). Switching to language-specific specs improved the acceptance rate from 75% to 92%. The lesson: specs must be tailored to the target context, not generic across all contexts.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Case Study 3: Document Analysis Pipeline</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A legal services firm processed 10,000+ contracts per month, each requiring review for compliance with 50+ regulatory requirements. The manual review process took 4-6 hours per contract, costing $500-750 per contract. They implemented an AI-powered document analysis pipeline using spec engineering to automate the initial review, flagging potential compliance issues for human review. The spec defined: the role (senior compliance attorney), task (review contract against regulatory requirements), constraints (cite specific contract clauses that violate requirements, rate severity (critical, major, minor, informational), do not provide legal advice), and output format (JSON with: requirement_id, status (compliant, non-compliant, needs-review), severity, clause_reference, explanation).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Results after 9 months: the AI pipeline reviewed contracts in 15 minutes each (vs. 4-6 hours manually), reducing the initial review cost from $500 to $50 per contract (90% reduction). The AI correctly identified 94% of compliance issues (compared to 97% for human reviewers), with the remaining 6% caught in the human review of AI-flagged items. The key success factors were: requirement-specific specs (separate specs for each of the 50 regulatory requirements, each encoding the specific criteria and clause patterns to look for), structured output format (JSON output enabled automated aggregation and reporting), and human-in-the-loop design (the AI flagged items for human review rather than making final determinations).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Lessons learned: the AI initially produced false positives at a rate of 30% (flagging compliant clauses as non-compliant), which overwhelmed the human reviewers. The spec was updated to include confidence scores and a higher threshold for flagging items (only flag if confidence {'>'} 70%), reducing the false positive rate to 8%. The lesson: precision (minimizing false positives) is often more important than recall (catching all issues) in human-in-the-loop systems, because false positives create unnecessary work for human reviewers.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Common Patterns Across Case Studies</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Across all case studies, several patterns emerged consistently. First, the most successful implementations used structured output formats (JSON, XML, or well-defined text templates) that enabled automated processing of LLM outputs. Second, explicit constraints in specs prevented the most common failure modes: sharing confidential information, producing incorrect code, and making final decisions without human review. Third, continuous monitoring and evaluation caught quality degradations before they impacted users, enabling rapid remediation.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The case studies also revealed common anti-patterns to avoid. Using a single spec for multiple contexts (languages, document types, use cases) produced mediocre results across all contexts; context-specific specs produced excellent results in each context. Deploying specs without evaluation frameworks led to quality regressions that went undetected for weeks. Omitting security constraints from specs resulted in data leakage incidents that damaged customer trust. These anti-patterns are preventable with disciplined spec engineering practices.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Key Takeaways</h2>
        <div className="mt-4 space-y-3">
          {[
            "Spec engineering consistently delivers 40-90% cost reduction while maintaining or improving quality. The ROI is highest for high-volume, repetitive tasks that benefit from automation.",
            "Structured output formats are essential. Every case study that used structured outputs (JSON, XML) achieved better results than those that used free-text outputs.",
            "Explicit constraints prevent the most common failure modes. Every spec should include constraints that address the specific risks of the use case.",
            "Context-specific specs outperform generic specs. Tailor specs to the target context (language, document type, industry) rather than using one-size-fits-all approaches.",
            "Human-in-the-loop design is critical for high-stakes use cases. The AI should augment human decision-making, not replace it entirely, especially in regulated industries.",
            "Continuous monitoring catches quality regressions early. Teams that monitored output quality detected and resolved issues within 24 hours; teams that did not monitor discovered issues through customer complaints, weeks or months later.",
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
