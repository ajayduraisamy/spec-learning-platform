import TopicLayout from "@/components/TopicLayout";

export default function OutputFormatPage() {
  return (
    <TopicLayout
      section="Foundations"
      lessonNumber="Lesson 7 of 10"
      title="Output Format"
      currentHref="/learn/output-format"
    >
      <section>
        <h2 className="text-xl font-semibold">The Output Format Component: Controlling the Response Shape</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The output format component is the final piece of the spec puzzle, and it is the piece that most directly determines whether the model's output is usable. You can have a perfect role, a precise task, and comprehensive constraints, but if you do not specify the output format, the model will wrap its response in conversational text, markdown formatting, introductory remarks, and concluding summaries that render the output useless for programmatic consumption.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          This happens because LLMs are trained primarily on conversational data. When you do not specify a format, the model defaults to its conversational training, which means it produces responses that read like answers to questions—complete with pleasantries, explanations, and caveats. For a chat interface, this is desirable. For a code generation pipeline, it is catastrophic. The output format component overrides this default and forces the model into a structured output mode.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The output format specification serves three purposes. First, it defines the structure of the response (JSON, YAML, code, markdown, plain text). Second, it controls the verbosity (only code, with explanations, with examples). Third, it specifies any formatting requirements (indentation, naming conventions, comment style). Together, these three dimensions determine whether the output can be parsed by a machine, read by a human, or both.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The importance of output format cannot be overstated. In production systems where LLM output is consumed programmatically—fed into code compilers, API validators, database importers, or CI/CD pipelines—the output format is the difference between a system that works and a system that crashes. A JSON response wrapped in "Here's your JSON:" and "Hope this helps!" will fail any JSON parser. A code response wrapped in markdown code fences requires preprocessing before it can be executed. The output format specification eliminates these problems at the source.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Format Patterns</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          There are five primary output format patterns, each suited to a different use case. Understanding these patterns and knowing when to apply each one is essential for writing specs that produce usable output.
        </p>

        <div className="mt-4 space-y-4">
          {[
            {
              pattern: "Code-Only Output",
              description: "The model returns only the code artifact, with no surrounding text. This is the most common pattern for code generation specs and is essential for automated pipelines.",
              example: '"Return only the TypeScript code. No explanation, no markdown fencing, no introductory text."',
              outputExample: `export async function createUser(email: string, password: string): Promise<User> {\n  const hash = await bcrypt.hash(password, 12);\n  return db.users.create({ email, passwordHash: hash });\n}`,
            },
            {
              pattern: "Structured Data Output",
              description: "The model returns data in a structured format (JSON, YAML, XML) that can be parsed programmatically. This pattern is essential when the output will be consumed by another system.",
              example: '"Return JSON with this schema: { endpoints: Array<{ method: string, path: string, description: string }> }. No additional fields, no explanation."',
              outputExample: `{\n  "endpoints": [\n    { "method": "POST", "path": "/users", "description": "Create a new user" },\n    { "method": "GET", "path": "/users/:id", "description": "Get user by ID" }\n  ]\n}`,
            },
            {
              pattern: "Documentation Output",
              description: "The model returns structured documentation with sections, headings, and examples. This pattern is used for API docs, runbooks, and technical specifications.",
              example: '"Return a Markdown document with sections: Overview, Endpoints (with method, path, request/response examples), Error Codes, and Usage Examples."',
              outputExample: `# Authentication API\n\n## Overview\nThe Authentication API provides...\n\n## Endpoints\n### POST /auth/login\n**Request:** { email, password }\n**Response:** { token, expiresIn }`,
            },
            {
              pattern: "Analysis Output",
              description: "The model returns structured analysis with findings, severity ratings, and recommendations. This pattern is used for code reviews, security audits, and performance analysis.",
              example: '"Return a numbered list of findings. Each finding must include: severity (Critical/High/Medium/Low), description, line reference, and remediation step."',
              outputExample: `1. [Critical] SQL Injection (line 23): Raw SQL concatenation...\n2. [High] Weak Hashing (line 45): MD5 used instead of bcrypt...\n3. [Medium] Missing Input Validation (line 12)...`,
            },
            {
              pattern: "Step-by-Step Output",
              description: "The model returns a sequential list of steps, each with a command, expected output, and verification criteria. This pattern is used for runbooks, deployment guides, and tutorials.",
              example: '"Return a numbered list. Each step must include: the exact command to run, the expected output, and the rollback command if verification fails."',
              outputExample: `1. kubectl apply -f deployment.yaml\n   Expected: deployment.apps/my-app created\n   Rollback: kubectl rollout undo deployment/my-app`,
            },
          ].map((item) => (
            <div
              key={item.pattern}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
            >
              <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {item.pattern}
                </h3>
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </p>
                <div className="mt-3 rounded-md bg-[var(--surface-overlay)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                    Spec Instruction
                  </p>
                  <code className="text-sm font-mono text-[var(--accent-text)]">
                    {item.example}
                  </code>
                </div>
                <div className="mt-3 rounded-md bg-[var(--surface-overlay)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                    Example Output
                  </p>
                  <code className="text-xs font-mono text-[var(--text-secondary)] whitespace-pre-wrap">
                    {item.outputExample}
                  </code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">JSON Schema Output: The Most Powerful Format</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          When the output will be consumed programmatically, JSON is the most powerful format because it can be validated against a schema. By specifying the exact JSON structure in your output format instruction, you create a contract that can be enforced automatically. This is the foundation of reliable LLM-powered systems.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              JSON Schema Output Specification
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return JSON with this exact schema:
              </span>
              <br />
              <br />
              <span className="text-[var(--accent-text)]">
                {"{"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                {"  "}"review": {"{"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                {"    "}"file": "string",
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                {"    "}"findings": [
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                {"      "}"{"{"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                {"        "}"severity": "critical" | "high" | "medium" | "low",
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                {"        "}"type": "security" | "performance" | "maintainability",
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                {"        "}"line": number,
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                {"        "}"description": "string",
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                {"        "}"remediation": "string"
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                {"      "}{"}"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                {"    "}]
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                {"  "}{"}"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                {"}"}
              </span>
              <br />
              <br />
              <span className="text-[var(--accent-text)]">
                Return only the JSON. No explanation, no markdown fencing.
              </span>
            </code>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Output Explanation
          </p>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            The model returns a JSON object with a single <code className="font-mono text-[var(--accent-text)]">review</code> key containing the file name and an array of findings. Each finding has a severity level, type, line number, description, and remediation step. This output can be validated against a JSON schema, parsed into a typed object, and rendered in a code review interface—all automatically. The <code className="font-mono text-[var(--accent-text)]">"No explanation, no markdown fencing"</code> instruction ensures the output is pure JSON that can be parsed without preprocessing.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Common Output Format Mistakes</h2>

        <div className="mt-4 space-y-4">
          {[
            {
              mistake: "Omitting the output format entirely",
              consequence: "The model wraps output in conversational text, making it unusable for automated processing. This is the single most common spec error.",
              fix: '"Always include an output format instruction. Even a simple "Return only the code" is better than nothing."',
            },
            {
              mistake: "Using ambiguous format instructions",
              consequence: '"Return the code in a good format" leaves the model to guess what "good" means. Different runs produce different formats.',
              fix: '"Be specific: "Return TypeScript code in a single file with named exports, JSDoc comments, and error handling."',
            },
            {
              mistake: "Forgetting to suppress conversational text",
              consequence: "The model adds introductions, explanations, and conclusions that break JSON parsers and code compilers.",
              fix: '"Always include "No explanation, no markdown fencing, no introductory text" for programmatic output."',
            },
            {
              mistake: "Specifying a format the model struggles with",
              consequence: "Some models have difficulty producing valid XML or complex nested JSON. Test the format with your target model before committing to it.",
              fix: '"Test your output format with 5-10 runs. If the model produces invalid output more than 20% of the time, simplify the format or switch to a different format."',
            },
          ].map((item) => (
            <div
              key={item.mistake}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <h3 className="font-medium text-red-400">
                Mistake: {item.mistake}
              </h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {item.consequence}
              </p>
              <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                Fix: {item.fix}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Format for Different Consumption Modes</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The output format you specify should match how the output will be consumed. There are three consumption modes, each requiring a different format strategy.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            {
              mode: "Machine Consumption",
              description: "Output is parsed by a program (JSON validator, code compiler, API client).",
              format: "Strict JSON/YAML with schema. No surrounding text. No markdown. Pure data.",
              example: '"Return JSON matching this schema. No explanation. No markdown."',
            },
            {
              mode: "Human + Machine",
              description: "Output is reviewed by a human before being integrated into the system.",
              format: "Structured code or documentation with comments. Markdown is acceptable.",
              example: '"Return the complete module with JSDoc comments. Organize with section headers. Include usage examples at the bottom."',
            },
            {
              mode: "Human Only",
              description: "Output is read by a human for understanding or decision-making.",
              format: "Structured prose with headings, lists, and examples. Conversational text is acceptable.",
              example: '"Return a detailed analysis with sections for each finding. Include evidence, impact assessment, and recommendations. Use markdown formatting."',
            },
          ].map((item) => (
            <div
              key={item.mode}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <h3 className="font-medium text-[var(--accent)]">{item.mode}</h3>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                {item.description}
              </p>
              <p className="mt-2 text-xs font-mono text-[var(--accent-text)]">
                {item.format}
              </p>
              <div className="mt-2 rounded-md bg-[var(--surface-overlay)] p-2 font-mono text-xs text-[var(--text-secondary)]">
                {item.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Output Format</h2>
        <div className="mt-4 space-y-3">
          {[
            "Always specify the output format, even if it seems obvious. The model does not share your intuition about appropriate formatting.",
            "For programmatic output, always include 'No explanation, no markdown fencing.' These two phrases eliminate the most common output parsing failures.",
            "When specifying JSON, include the schema inline. 'Return JSON' is not enough—show the exact structure with field names and types.",
            "Test your output format with multiple runs. LLMs are probabilistic. A format that works 90% of the time is not good enough for production.",
            "If the model struggles with a complex format, simplify it. Break a nested JSON structure into flat objects. Replace XML with JSON. Use simpler structures that the model can produce reliably.",
            "Document your output format expectations. When you specify 'Return only the code,' clarify what that means: no imports? no exports? no comments? Be explicit about every dimension.",
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
