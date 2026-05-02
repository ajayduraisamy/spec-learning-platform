import TopicLayout from "@/components/TopicLayout";

export default function BestPracticesPage() {
  return (
    <TopicLayout
      section="Core Engineering"
      lessonNumber="Lesson 8 of 10"
      title="Best Practices"
      currentHref="/learn/best-practices"
    >
      <section>
        <h2 className="text-2xl font-bold mb-4">Core Principles of Spec Engineering</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Reproducibility is the foundational best practice: a spec must produce identical outputs given identical inputs and model parameters. This requires fixing temperature to 0 for deterministic tasks (data extraction, classification) and documenting temperature settings for creative tasks. A spec that produces different outputs every run cannot be debugged, evaluated, or trusted in production. Always include parameter documentation in spec headers or configuration files.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Clarity over cleverness ensures specs remain maintainable by the entire team, not just the author. Avoid obscure prompting tricks, undocumented abbreviations, or over-engineered patterns that require deep context to understand. A new team member should read a spec and immediately understand its purpose, inputs, expected outputs, and constraints. If you need a comment to explain your prompt, rewrite the prompt to be self-documenting.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Modularity enables reuse and testing. Break complex specs into composable components: a persona component, a task component, an output format component, and a constraints component. These can be mixed and matched like Lego blocks. A "senior engineer persona" component can be reused across code review, architecture analysis, and debugging specs. Modularity also enables independent testing—you can test the output format component without the full task context.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Explicit is better than implicit. Never rely on the model to "figure out" what you mean. Instead of "handle errors appropriately," specify "if the input is invalid, output JSON with error field and stop processing." Implicit instructions create unpredictable outputs across model versions and inputs. The model's training data contains millions of conflicting examples of "appropriate" behavior—explicit constraints eliminate this ambiguity.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Spec Structure Standards</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Consistent structure across specs reduces cognitive load for teams. A standard spec template includes: header (purpose, author, version), system instructions (persona, constraints), task definition, input placeholders, output format, examples (few-shot), and footer (final reminders). Teams that adopt standard templates reduce onboarding time for new engineers and make cross-spec debugging faster because everyone knows where to find each component.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Input validation instructions protect against malformed data. Every spec should specify how to handle edge cases: empty inputs ("if user_message is empty, output error"), invalid formats ("if date is not YYYY-MM-DD, output null for that field"), and missing context ("if no documents are retrieved, state 'insufficient information'"). Without these, models hallucinate defaults or produce malformed outputs when inputs deviate from happy paths.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Good Spec Structure</div>
          <pre className="whitespace-pre-wrap">
{`---
spec: invoice-extractor-v3
purpose: Extract structured data from invoice OCR text
model: gpt-4o (temp: 0)
---

SYSTEM: You are an invoice processing specialist.

TASK: Extract fields from the OCR text below.

INPUT: {{ocr_text}}

OUTPUT FORMAT (JSON only):
{
  "vendor": string,
  "invoice_number": string,
  "total": number,
  "line_items": array
}

CONSTRAINTS:
- If a field is missing, use null (not empty string)
- Output ONLY JSON, no markdown or explanation
- Validate total = sum(line_items.quantity * unit_price)

FEW-SHOT EXAMPLE:
Input: "INV-001 Acme Corp $500..."
Output: { "vendor": "Acme Corp", ... }`}
          </pre>
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Bad Spec Structure (avoid)</div>
          <pre className="whitespace-pre-wrap">
{`You are a helpful assistant. Please look at this invoice and get the info. 
Make sure to include everything. Oh and if something is missing just skip it.
Also output JSON but maybe add some notes if needed. The invoice is: {{text}}
Try your best!`}
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Context Management Best Practices</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Context should be injected using the same structured approach as specs. Define context schemas that specify what data is included, its format, and its priority. A customer support context schema might define: conversation_summary (max 300 tokens, compressed), user_tier (string, always included), retrieved_docs (max 3 items, sorted by relevance score). Schemas prevent context bloat and ensure consistent information availability across requests.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Relevance thresholds prevent noise injection. Set minimum similarity scores for retrieved documents (typically 0.7+) and maximum token budgets for each context category. A document with 0.4 similarity to the query adds noise, not value. Implement fallback logic: if no documents meet the threshold, inject a "no relevant documents found" marker rather than low-quality matches. This trains the model to handle information gaps gracefully.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Context versioning tracks which knowledge base versions produced which outputs. When a document is updated, its version ID should be included in the context metadata. If outputs degrade after a document update, you can trace whether the new document version caused the issue. This is critical for regulated industries where audit trails must show exactly what information informed each model output.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Testing and Validation Discipline</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Every spec needs a test suite with minimum 20 cases covering happy paths, edge cases, and adversarial inputs. Run the test suite before every spec change and after every model update. A spec that passes 100% of tests today may drop to 85% after a model version update—continuous testing catches these regressions before they reach users. Automate test execution in CI/CD pipelines to prevent deploying broken specs.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Regression testing compares new spec versions against baselines. When updating a spec, run both old and new versions on the test suite and compare pass rates. If the new version fails cases that the old version passed, analyze why before deploying. Regression matrices (table showing pass/fail per test case per version) make it easy to spot patterns: "version 3 broke all Japanese language cases" is immediately visible in a regression matrix.
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-[var(--accent-text)] mb-4">
          <div className="text-[var(--text-secondary)] text-sm mb-2">Spec Example: Test Case Definition</div>
          <pre className="whitespace-pre-wrap">
{`TEST CASE: invoice-missing-total
Input: "INV-002 Beta LLC\n2x Widget @ $50\n[no total shown]"
Expected:
{
  "vendor": "Beta LLC",
  "invoice_number": "INV-002",
  "total": null,
  "line_items": [{"description": "Widget", "quantity": 2, "unit_price": 50}]
}
Pass Condition: total is null (not 0, not missing key)
Fail Condition: total is 100 (hallucinated calculation) or total key missing`}
          </pre>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Canary deployments release spec changes to 5-10% of traffic first, monitoring error rates before full rollout. This catches issues that test suites miss—real user inputs are more diverse than test cases. If error rates spike in the canary group, automatically roll back. Canary deployments require traffic splitting infrastructure and real-time monitoring dashboards showing spec performance metrics per version.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Team Collaboration and Documentation</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Shared pattern libraries prevent teams from reinventing solutions. Document proven patterns (few-shot templates, output format schemas, persona definitions) in a central registry with usage examples and performance benchmarks. When a team member needs a "code review spec," they should start from the library's vetted template rather than writing from scratch. Pattern libraries reduce duplication and enforce consistency across team outputs.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Spec documentation should include: purpose, inputs/outputs (with schemas), constraints, known limitations, and performance characteristics (pass rate, avg tokens, latency). This documentation lives alongside the spec code, not in a separate wiki that becomes outdated. Use a standard documentation header format so all specs are self-describing. New team members should be able to understand any spec from its documentation alone.
        </p>
        <div className="border-l-4 border-[var(--accent)] pl-4 mb-4">
          <p className="text-[var(--accent-text)] font-medium">Best Practices Tips:</p>
          <ul className="list-disc list-inside text-[var(--text-secondary)] mt-2 space-y-1">
            <li>Write specs that your future self (or a new teammate) can understand in 6 months</li>
            <li>Never deploy a spec change on Friday afternoon—you don't want to debug production on weekends</li>
            <li>Keep spec files under 500 lines; refactor into components if they grow beyond this</li>
            <li>Document not just what the spec does, but WHY it does it that way (design decisions)</li>
            <li>Use semantic versioning for specs: v1.2.3 means major.feature.fix—never deploy unversioned specs</li>
          </ul>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Code review for specs is as important as code review for software. A second pair of eyes catches ambiguous instructions, missing edge cases, and unclear output formats. Spec review checklists should include: "Is the output format unambiguous?", "Are edge cases handled?", "Is the token count justified?", and "Would this spec pass our test suite?" Teams that review specs catch 40-60% more issues before production than teams that skip spec review.
        </p>
      </section>
    </TopicLayout>
  );
}
