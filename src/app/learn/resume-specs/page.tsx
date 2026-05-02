import TopicLayout from "@/components/TopicLayout";

export default function ResumeSpecsPage() {
  return (
    <TopicLayout
      section="Domain-Based Specs"
      lessonNumber="Lesson 16"
      title="Resume Specs"
      currentHref="/learn/resume-specs"
    >
      <section>
        <h2 className="text-xl font-semibold">What Are Resume Specs?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Resume specs are structured prompts designed to generate professional resumes, cover letters, CV summaries, and career documentation tailored to specific roles, industries, and experience levels. They apply the spec engineering discipline to personal branding, ensuring that generated documents highlight the right skills, quantify achievements effectively, and align with applicant tracking system (ATS) requirements.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The job application process is highly competitive, and generic resumes rarely pass the initial screening. A resume spec defines the target role, industry, required skills, years of experience, key achievements, and the specific tone and format expected by the target company. This precision transforms a resume from a generic career summary into a targeted marketing document.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Resume specs are particularly valuable for professionals applying to multiple positions. Instead of rewriting their resume from scratch for each application, they maintain a master resume with all experiences and achievements, then use specs to generate tailored versions optimized for each role. The spec defines which experiences to emphasize, which skills to highlight, and which keywords to include based on the job description.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          ATS compatibility is a critical concern that resume specs address explicitly. Over 90% of large companies use ATS software to filter resumes before human review. A resume spec must define ATS-friendly formatting: standard section headings, keyword density targets, avoidance of tables and graphics, appropriate file format (PDF vs. DOCX), and the inclusion of exact keyword matches from the job description.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Components of a Resume Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A resume spec must address six critical dimensions. The target role definition specifies the exact job title, seniority level (entry, mid, senior, lead, principal), industry, and company type (startup, enterprise, agency, non-profit). This determines the tone, level of detail, and focus areas of the generated resume.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Skills and keywords mapping extracts the required and preferred skills from the job description and maps them to the candidate's actual experience. The spec defines which skills are primary (must appear in summary and experience bullets), which are secondary (should appear in the skills section), and which are bonus (nice to include if space permits).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Achievement quantification transforms vague responsibilities into measurable accomplishments. Instead of "managed a team," the spec instructs: "quantify team size, project outcomes, budget impact, and timeline improvements." Every bullet point should include a metric: percentage improvement, dollar amount, team size, time reduction, or quality metric.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Format and structure define the resume layout: chronological (most common, shows career progression), functional (emphasizes skills over timeline, useful for career changers), or hybrid (combines both). The spec specifies section order (summary, experience, education, skills, certifications), bullet point length (1-2 lines each), and the total page count (1 page for under 10 years experience, 2 pages for 10+ years).
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Resume Spec Example — Senior Frontend Engineer
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are an expert career consultant specializing in technical resumes for senior engineering roles at FAANG companies.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Generate a tailored resume for a Senior Frontend Engineer position at a large tech company.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Candidate: 8 years experience, currently at mid-size SaaS company. Tech stack: React, TypeScript, Next.js, GraphQL, Tailwind CSS, Jest, Cypress. Key achievements: led migration from Angular to React (reduced bundle size 40%, improved LCP from 4.2s to 1.8s), built component library adopted by 5 teams (reduced UI development time 35%), mentored 4 junior developers (3 promoted within 18 months). Target role: Senior Frontend Engineer, emphasis on technical leadership, performance optimization, and cross-team collaboration. Format: 1 page, chronological, ATS-friendly.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Markdown resume with sections: Name + Contact, Professional Summary (3 lines max), Technical Skills (categorized: Languages, Frameworks, Tools), Professional Experience (3 positions, 3-4 bullets each with metrics), Education, Certifications. Each bullet: action verb + specific achievement + quantified impact. Include keywords: React, TypeScript, performance optimization, component architecture, code review, mentoring, CI/CD, accessibility, testing.
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The resume spec produces a tightly focused document that emphasizes the candidate's most relevant achievements for a senior frontend role. The professional summary (3 lines maximum) immediately communicates the candidate's value proposition: years of experience, core expertise, and the type of impact they deliver. This replaces the outdated objective statement with a compelling introduction.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Each experience bullet follows the formula: action verb + specific action + quantified result. For example: "Led migration from Angular to React, reducing JavaScript bundle size by 40% and improving Largest Contentful Paint from 4.2s to 1.8s, resulting in 15% improvement in user engagement metrics." This format ensures every bullet demonstrates both technical capability and business impact.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The technical skills section is categorized (Languages, Frameworks, Tools, Practices) rather than a flat list, making it easier for both ATS software and human recruiters to quickly assess the candidate's capabilities. The categories align with the job description's requirements, ensuring keyword matching for ATS filters while remaining readable for humans.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 2: Career Changer Resume Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Career changers face unique challenges: their previous job titles may not align with their target role, and their relevant experience may be hidden within unrelated positions. A resume spec for career changers must address these challenges explicitly.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Resume Spec Example — Teacher to Software Engineer
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Generate a functional resume for a high school teacher transitioning to a junior software engineering role.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Candidate: 5 years high school math teacher, completed 6-month coding bootcamp (full-stack JavaScript). Projects: built student grade tracking app (React, Node.js, PostgreSQL, deployed on Heroku), contributed to open-source educational tool (5 PRs merged). Skills: JavaScript, React, Node.js, SQL, Git, agile methodologies. Transferable skills: curriculum design (analogous to system design), classroom management (team coordination), data analysis (student performance tracking). Target: Junior Software Engineer at EdTech companies. Format: functional/hybrid, emphasize projects and transferable skills over job title.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Hybrid resume. Sections: Summary (highlight transition and motivation), Technical Skills, Projects (2 detailed project descriptions with tech stack, challenges, outcomes), Professional Experience (teaching role reframed to highlight transferable skills: "Designed and implemented curriculum for 150+ students" as analogous to "Designed and delivered software for end users"), Education (degree + bootcamp), Certifications. Tone: professional, enthusiastic about technology, focused on continuous learning.
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          This resume spec reframes the candidate's teaching experience as evidence of skills relevant to software engineering: curriculum design demonstrates systematic thinking, classroom management demonstrates leadership and communication, and student performance analysis demonstrates data-driven decision making. The projects section is elevated above professional experience to highlight the candidate's technical capabilities.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Bad vs. Good: Resume Specs</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The difference between a generic resume and a spec-generated resume is the difference between a document that lists duties and one that demonstrates impact.
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Experience Bullet
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Write my work experience section"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Produces generic duty descriptions: "Responsible for developing web applications." No metrics, no impact, no differentiation from any other developer.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  "Write experience bullets for a backend developer who: reduced API response times 60% by implementing Redis caching, designed microservices architecture handling 50K req/min, reduced production incidents 80% by adding comprehensive monitoring. Each bullet: action verb + technical approach + quantified result."
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Specific achievements with metrics that demonstrate measurable impact.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Skills Section
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "List my skills"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Unorganized dump: JavaScript, Python, Java, React, Angular, Vue, Docker, Kubernetes, AWS, GCP, Azure, SQL, MongoDB, Redis. No categorization, no proficiency indication, includes outdated or irrelevant skills.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  "Categorize skills: Languages (TypeScript, Python, SQL), Frameworks (React, Next.js, Express), Infrastructure (Docker, AWS ECS, Terraform), Practices (TDD, CI/CD, code review). Include only skills used in production in the last 3 years. Match keywords from target job description. Order by relevance to target role."
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Categorized, curated, targeted, and ATS-optimized.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A career transition program for military veterans used resume specs to help veterans translate military experience into civilian job applications. The spec defined a translation layer: military occupational specialties mapped to civilian job titles, military projects described in business terms (budget, team size, outcomes), and leadership experience quantified (personnel managed, equipment valued, mission success rates). Veterans who used the spec-driven approach received 3x more interviews than those who wrote their own resumes, with 70% landing positions within 90 days of separation.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A tech recruiting agency used resume specs to standardize the resumes of their candidates before submitting them to clients. Each spec was tailored to the specific client's requirements: the company's tech stack, the role's seniority level, the industry domain, and the preferred resume format. Candidates submitted their master resume and the agency generated 5-10 tailored versions for different opportunities. The spec-driven approach increased their candidate placement rate by 45% because each submitted resume was precisely aligned with the client's needs.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Resume Specs</h2>
        <div className="mt-4 space-y-3">
          {[
            "Always include the job description as context for the spec. The LLM needs the exact keywords, required skills, and preferred qualifications from the posting to optimize the resume for ATS matching.",
            "Quantify every achievement. Use numbers: percentage improvements, dollar amounts, team sizes, time reductions, user counts, revenue impact. If you don't have exact numbers, estimate conservatively.",
            "Tailor the professional summary for each application. It should mention the target role, your years of relevant experience, and your top 2-3 achievements that directly relate to the job requirements.",
            "Use active voice and strong action verbs: Led, Designed, Built, Optimized, Reduced, Increased, Implemented, Mentored. Avoid passive phrases like 'Responsible for' or 'Assisted with.'",
            "Keep the resume to 1 page for under 10 years of experience, 2 pages for 10+ years. Recruiters spend an average of 6 seconds on initial resume review—brevity is essential.",
            "Include a technical skills section that is easily scannable by both ATS and humans. Categorize skills and include only those you can confidently discuss in an interview.",
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
