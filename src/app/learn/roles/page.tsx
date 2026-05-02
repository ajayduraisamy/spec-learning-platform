import TopicLayout from "@/components/TopicLayout";

export default function RolesPage() {
  return (
    <TopicLayout
      section="Foundations"
      lessonNumber="Lesson 4 of 10"
      title="Roles"
      currentHref="/learn/roles"
    >
      <section>
        <h2 className="text-xl font-semibold">The Power of Persona Priming</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The role component is the most underleveraged tool in spec engineering. Most practitioners treat it as a formality—"You are an assistant" or "You are an expert"—without recognizing that the role you assign fundamentally reshapes the model's output across every dimension: vocabulary, reasoning depth, architectural decisions, error handling patterns, and even the level of detail in explanations.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          This happens through a mechanism called persona priming. When you assign a role to the model, you activate a specific region of its training distribution. The model has been trained on code written by junior developers and principal engineers, on security audits conducted by novices and seasoned penetration testers, on documentation written by technical writers and by engineers who hate writing docs. Each of these personas produces characteristically different output. Your role specification determines which persona the model embodies.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The difference is not subtle. Consider the role "engineer" versus "principal engineer with 15 years of experience building high-throughput distributed systems." The first produces generic, surface-level responses that could have come from any source in the model's training data. The second produces responses that reflect the depth, nuance, and practical wisdom of senior engineering practice—trade-off analysis, failure mode consideration, and architectural reasoning that accounts for real-world constraints like operational complexity and team velocity.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Research supports this intuition. Studies on persona-based prompting have shown that specifying expert roles can improve output quality by 15-30% across domains like code generation, technical analysis, and creative writing. The improvement is not uniform—it varies by domain, task complexity, and the specificity of the role description. But the direction is consistent: more specific, more expert roles produce better output.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Crafting Effective Role Descriptions</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          An effective role description has three components: the base role, the domain specialization, and the expertise indicator. The base role establishes the general category (engineer, designer, analyst). The domain specialization narrows the focus to a specific area of expertise. The expertise indicator sets the depth and quality bar for the output.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Role Construction Formula
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">{"// Formula: [Expertise Level] + [Base Role] + [Domain Specialization]"}</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Weak: base role only"}</span>
              <br />
              <span className="text-[var(--accent-text)]">"You are an engineer."</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Better: base role + domain"}</span>
              <br />
              <span className="text-[var(--accent-text)]">"You are a backend engineer."</span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">{"// Strong: expertise + base role + domain"}</span>
              <br />
              <span className="text-[var(--accent-text)]">"You are a senior backend engineer specializing in event-driven architectures and message queue systems."</span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          The strongest role descriptions include specific technical markers that signal deep expertise. Phrases like "event-driven architectures," "message queue systems," "distributed consensus protocols," or "zero-trust security models" are not filler—they are activation triggers that focus the model's attention on the relevant subset of its training data. The model has seen these terms millions of times in technical contexts, and their presence in your role description shifts the probability distribution toward expert-level responses.
        </p>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            High-Quality Role Examples by Domain
          </p>
          <div className="space-y-3">
            {[
              {
                domain: "Backend Engineering",
                role: '"You are a principal backend engineer with deep expertise in distributed systems, microservice architecture, and high-throughput API design."',
              },
              {
                domain: "Security",
                role: '"You are a senior security engineer specializing in application security, OWASP Top 10 mitigation, threat modeling, and secure code review."',
              },
              {
                domain: "Frontend",
                role: '"You are a senior frontend engineer specializing in React performance optimization, accessibility (WCAG 2.1 AA), and responsive design systems."',
              },
              {
                domain: "Data Engineering",
                role: '"You are a senior data engineer with expertise in building scalable ETL pipelines, real-time streaming architectures, and data warehouse optimization."',
              },
              {
                domain: "DevOps",
                role: '"You are a senior DevOps engineer specializing in Kubernetes orchestration, infrastructure as code, CI/CD pipeline design, and observability."',
              },
            ].map((item) => (
              <div key={item.domain} className="rounded-md bg-[var(--surface-overlay)] p-3">
                <p className="text-xs font-medium text-[var(--accent)] mb-1">
                  {item.domain}
                </p>
                <p className="text-sm font-mono text-[var(--accent-text)]">
                  {item.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Role Impact on Output Quality</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          To understand the practical impact of role selection, consider the same task given to the model with three different role specifications. The task is to review a piece of code that handles user authentication. The code has three issues: it uses a weak hashing algorithm, it does not validate input before database queries, and it logs passwords in plaintext.
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Role 1: "You are a helpful assistant."
              </h3>
            </div>
            <div className="p-5">
              <div className="rounded-md bg-[var(--surface-overlay)] p-3 font-mono text-sm text-[var(--text-secondary)]">
                The code looks mostly good! I'd suggest using bcrypt instead of MD5 for password hashing, as it's more secure. Also consider adding input validation.
              </div>
              <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                Result: Catches one issue (hashing), mentions another vaguely (validation), misses the plaintext logging entirely. Tone is encouraging but lacks depth.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Role 2: "You are a code reviewer."
              </h3>
            </div>
            <div className="p-5">
              <div className="rounded-md bg-[var(--surface-overlay)] p-3 font-mono text-sm text-[var(--text-secondary)]">
                {"Issues found: 1. MD5 is insecure for password hashing—use bcrypt with salt rounds >= 12. 2. No input validation before SQL query—use parameterized queries. 3. Password logged at line 47—remove this immediately. Severity: Critical (1, 3), High (2)."}
              </div>
              <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                Result: Catches all three issues, assigns severity ratings, provides specific remediation advice. Structured and actionable.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Role 3: "You are a principal security engineer specializing in application security and secure code review."
              </h3>
            </div>
            <div className="p-5">
              <div className="rounded-md bg-[var(--surface-overlay)] p-3 font-mono text-sm text-[var(--text-secondary)]">
                {"CRITICAL: MD5 hashing (line 23) is cryptographically broken. Replace with bcrypt (salt rounds >= 12) or Argon2id. OWASP A02:2021 violation."}
                {"\n\n"}
                CRITICAL: Plaintext password in log (line 47). Violates OWASP A01:2021 and GDPR Article 32. Remove immediately. Consider implementing structured logging with PII redaction.
                {"\n\n"}
                HIGH: Raw SQL concatenation (line 31) enables SQL injection. Use parameterized queries or an ORM. OWASP A03:2021.
                {"\n\n"}
                RECOMMENDATION: Add CSRF protection, implement rate limiting on auth endpoint, and add account lockout after failed attempts.
              </div>
              <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                Result: Catches all issues, provides line references, maps to OWASP framework, includes regulatory context (GDPR), and adds proactive recommendations. This is the output of a security professional, not a code review tool.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          The progression is clear. The generic assistant produces surface-level feedback. The generic code reviewer catches the issues but lacks depth. The specialized security engineer produces analysis that is comprehensive, structured, standards-referenced, and immediately actionable. The difference is entirely attributable to the role specification.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Role-Specific Output Patterns</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Different roles produce characteristically different output patterns. Understanding these patterns helps you select the right role for your task and anticipate the type of output you will receive.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            {
              role: "Junior Developer",
              pattern: "Tends to produce straightforward, copy-pasteable solutions without much architectural consideration. Good for simple tasks, bad for complex systems.",
              bestFor: "Boilerplate code, simple scripts, learning examples",
            },
            {
              role: "Senior Developer",
              pattern: "Produces well-structured solutions with error handling, documentation, and consideration for edge cases. Balances correctness with pragmatism.",
              bestFor: "Production code, API design, system components",
            },
            {
              role: "Principal/Staff Engineer",
              pattern: "Produces architectural analysis, trade-off discussions, and system-level thinking. May over-engineer simple tasks but excels at complex problems.",
              bestFor: "Architecture decisions, technical strategy, complex system design",
            },
            {
              role: "Security Auditor",
              pattern: "Produces threat models, vulnerability assessments, and remediation plans with severity ratings and regulatory references. Security-focused lens on all output.",
              bestFor: "Code review, penetration testing prep, compliance documentation",
            },
          ].map((item) => (
            <div
              key={item.role}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <h3 className="font-medium text-[var(--text-primary)]">
                {item.role}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.pattern}
              </p>
              <p className="mt-2 text-xs font-medium text-[var(--accent)]">
                Best for: {item.bestFor}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Multi-Role Specs</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          For complex tasks that span multiple domains, you can specify multiple roles in a single spec. This is particularly effective for tasks that require cross-functional expertise, such as designing a feature that touches both frontend and backend, or reviewing a system for both security and performance concerns.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Multi-Role Spec Example
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--accent-text)]">You are simultaneously a senior security engineer and a performance optimization expert.</span>
              {"\n\n"}
              <span className="text-[var(--accent-text)]">Review the following API endpoint from both perspectives. First, identify all security vulnerabilities and rate their severity. Then, identify all performance bottlenecks and estimate their impact on throughput.</span>
              {"\n\n"}
              <span className="text-[var(--accent-text)]">Return your analysis in two sections: "Security Review" and "Performance Review". Each section should include findings ranked by severity, with specific line references and remediation steps.</span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          Multi-role specs work because the model can hold multiple personas simultaneously. The key is to structure the task so that each role's perspective is applied to a specific aspect of the analysis, preventing the output from becoming a confused blend of both perspectives.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Writing Effective Roles</h2>
        <div className="mt-4 space-y-3">
          {[
            "Always include an expertise level. 'Senior,' 'principal,' 'staff,' or 'expert' are all effective. Avoid 'helpful' or 'friendly'—these activate conversational training, not technical training.",
            "Be specific about the domain. 'Engineer specializing in distributed systems' is vastly superior to 'engineer.' The domain specification focuses the model's attention on relevant training data.",
            "Match the role to the task complexity. Simple tasks benefit from senior roles (practical, production-ready output). Complex tasks benefit from principal roles (architectural thinking, trade-off analysis).",
            "Test different roles for the same task. Run your spec with three different role specifications and compare the output quality. This empirical approach reveals which role produces the best results for your specific use case.",
            "Avoid stacking too many specializations. 'Senior backend engineer specializing in distributed systems and message queues' is effective. 'Senior backend engineer specializing in distributed systems, message queues, machine learning, and blockchain' dilutes the focus.",
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
