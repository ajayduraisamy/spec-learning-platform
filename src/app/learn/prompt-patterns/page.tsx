import TopicLayout from "@/components/TopicLayout";

export default function PromptPatternsPage() {
  return (
    <TopicLayout
      section="Core Engineering"
      lessonNumber="Lesson 3 of 10"
      title="Prompt Patterns"
      currentHref="/learn/prompt-patterns"
    >
      <section>
        <h2 className="text-2xl font-bold mb-4">Taxonomy of Prompt Patterns</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Prompt patterns are reusable structural templates that encode proven strategies for interacting with language models. Unlike ad-hoc prompts written for single tasks, patterns represent generalized approaches that work across domains and model versions. They emerge from systematic observation of what consistently produces high-quality outputs: clear role assignment, explicit output formatting, step-by-step reasoning, and constraint enforcement.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The pattern taxonomy divides into structural patterns (how information is organized), behavioral patterns (how the model should act), and output patterns (how results are formatted). Structural patterns include few-shot examples, chain-of-thought scaffolding, and context separation. Behavioral patterns include persona adoption, expert consultation, and constraint enforcement. Output patterns include structured data formats, markdown templates, and validation wrappers.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Effective pattern use requires matching pattern type to task requirements. Analytical tasks benefit from chain-of-thought patterns that force explicit reasoning. Creative tasks benefit from free-form persona patterns with stylistic constraints. Data extraction tasks require structured output patterns with validation rules. Using the wrong pattern leads to outputs that are either over-constrained (losing creativity) or under-constrained (lacking reliability).
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Patterns also encode model-specific optimizations. Some patterns leverage attention mechanisms (placing critical instructions at start/end), others exploit instruction-following training (explicit "you must" directives), and others use token-level guidance (providing exact output prefixes). Experienced engineers maintain pattern libraries tagged by model family, as patterns that work on GPT-4 may fail on Claude or open-source models due to different training distributions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Few-Shot and Chain-of-Thought Patterns</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Few-shot prompting provides 2-5 example input-output pairs before the actual task, demonstrating the desired behavior through analogy rather than explicit instruction. This pattern works because transformer models are powerful in-context learners that can internalize patterns from examples faster than from descriptions. The examples must be highly relevant, diverse enough to show variation, and consistent in format to avoid confusing the model.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Chain-of-Thought (CoT) prompting forces the model to generate intermediate reasoning steps before producing a final answer. This pattern dramatically improves performance on mathematical, logical, and multi-step tasks by giving the model "scratch space" to work through complexity. The pattern can be implemented with explicit instructions ("think step by step") or by providing few-shot examples that include reasoning traces.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Few-Shot Pattern</div>
          <pre className="whitespace-pre-wrap">
{`Classify the sentiment of these support tickets:

Ticket: "The app crashes every time I try to export."
Classification: BUG

Ticket: "Love the new dark mode, works perfectly!"
Classification: PRAISE

Ticket: "Can I export data to CSV? Need this for reporting."
Classification: FEATURE_REQUEST

Ticket: "{{user_ticket}}"
Classification:`}
          </pre>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Chain-of-Thought Pattern</div>
          <pre className="whitespace-pre-wrap">
{`Solve this pricing calculation step by step:

Query: "Customer on Pro plan ($99/mo) upgrades to Enterprise ($299/mo) on the 15th. Prorated charge?"

Step 1: Calculate days remaining in month (31 - 15 + 1 = 17 days)
Step 2: Pro plan daily rate = $99 / 31 = $3.19/day
Step 3: Enterprise daily rate = $299 / 31 = $9.65/day
Step 4: Pro used for 14 days = 14 × $3.19 = $44.66
Step 5: Enterprise for 17 days = 17 × $9.65 = $164.05
Step 6: Prorated charge = $164.05 - $44.66 = $119.39

Now solve: "{{user_query}}"
Step 1:`}
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Persona and Role Patterns</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Persona patterns assign the model a specific identity, expertise level, and communication style. "You are a senior Rust compiler engineer" triggers different knowledge retrieval and tone than "You are a programming tutor explaining to beginners." The persona must be specific enough to activate relevant model weights—"expert" is too vague, "expert in PostgreSQL query optimization with 10 years experience" activates precise knowledge domains.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Role patterns extend personas with behavioral constraints and responsibilities. A "code reviewer" role might include: "Flag security vulnerabilities, suggest performance improvements, check style guide compliance, and assign severity levels." The role definition should include both what to do and what not to do—"Do not suggest architectural changes unless security-critical" prevents scope creep in outputs.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Multi-persona patterns simulate dialogue between experts to solve complex problems. A system might prompt one instance as "security auditor" and another as "API designer" to review a specification from both perspectives. This pattern leverages the model's ability to adopt different viewpoints but requires careful output merging to avoid contradictory recommendations. The orchestration layer must resolve conflicts when personas disagree.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Output Format and Validation Patterns</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Structured output patterns enforce machine-readable formats like JSON, YAML, or XML. These patterns include explicit schema definitions, example outputs, and validation instructions. JSON patterns are most common for data extraction: {`"Output valid JSON matching this schema: { 'items': [{ 'name': string, 'price': number }] }."`} Including the schema in the prompt reduces malformed output rates from ~15% to under 2% for most models.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Validation wrapper patterns instruct the model to self-check outputs before returning them. "Generate the response, then verify it meets all constraints. If not, regenerate." This two-pass approach catches missing fields, format violations, and constraint breaches. More advanced patterns use separate validation prompts: generate output with one prompt, then validate with a second "Does this output meet the schema?" prompt that can trigger regeneration.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Structured Output Pattern</div>
          <pre className="whitespace-pre-wrap">
{`Extract invoice data and output JSON only.

Schema:
{
  "vendor": "string",
  "invoice_number": "string",
  "amount": number,
  "due_date": "YYYY-MM-DD",
  "line_items": [
    { "description": "string", "quantity": number, "unit_price": number }
  ]
}

Invoice Text:
{{invoice_ocr_text}}

Output JSON:`}
          </pre>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Markdown template patterns provide formatted text outputs with consistent structure. "Output a markdown table with columns: Feature, Status, Priority. Use emoji for status: ✅ Complete, 🚧 In Progress, ⏳ Pending." These patterns are common for reports, documentation, and human-readable outputs where structure matters more than machine parsing. They require less strict validation than JSON but benefit from format examples.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Real-World Pattern Combinations</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Production systems combine multiple patterns into composite templates. A customer support bot might use: persona ("empathetic support agent") + few-shot (example responses) + output format (structured ticket update) + chain-of-thought ("explain your reasoning for the priority level"). This composite approach leverages each pattern's strengths while compensating for individual weaknesses.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Code generation tools combine: role ("senior TypeScript engineer"), constraints ("use functional programming patterns, no any types"), few-shot (example functions matching the style), and output format (code block with JSDoc). The pattern combination ensures generated code matches team standards without explicit review. Teams report 60-80% reduction in style-related code review comments when using composite patterns consistently.
        </p>
        <div className="border-l-4 border-[var(--accent)] pl-4 mb-4">
          <p className="text-[var(--accent-text)] font-medium">Prompt Pattern Tips:</p>
          <ul className="list-disc list-inside text-[var(--text-secondary)] mt-2 space-y-1">
            <li>Start with proven patterns before inventing custom ones—most tasks match existing patterns</li>
            <li>Test patterns with multiple model versions; some patterns fail on smaller models</li>
            <li>Keep few-shot examples under 3 total to minimize token usage unless complexity demands more</li>
            <li>Always include negative constraints ("Do not X") for critical behavioral boundaries</li>
            <li>Document which patterns work for which task types in your team's pattern library</li>
          </ul>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Anti-patterns to avoid include: over-stuffing (combining 5+ patterns into an unreadable prompt), pattern cargo-culting (using patterns because they're trendy, not because they help), and pattern rigidity (refusing to adapt patterns when task requirements change). The best engineers treat patterns as tools, not rules—apply the minimum pattern set that achieves reliable outputs for the specific task.
        </p>
      </section>
    </TopicLayout>
  );
}
