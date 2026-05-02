import TopicLayout from "@/components/TopicLayout";

export default function ToolUsagePage() {
  return (
    <TopicLayout
      section="AI Systems"
      lessonNumber="Lesson 4 of 10"
      title="Tool Usage"
      currentHref="/learn/tool-usage"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Is Tool Usage in AI Systems?</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Tool usage enables AI agents and LLM-powered systems to interact with external systems, APIs, databases, and computation environments to extend their capabilities beyond text generation. Without tools, an LLM is limited to reasoning over its training data and static context. With tools, the same model can query live weather APIs, execute SQL queries against production databases, run Python code for mathematical computations, search the web for real-time information, and modify files in a code repository. Tool usage transforms LLMs from knowledge retrievers into action-driven systems that can observe, act, and verify outcomes in external environments.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The tool usage cycle follows a structured pattern: the LLM receives a user query, decides which tool (if any) is needed, generates the tool call parameters in a structured format (typically JSON), the system executes the tool, and the result is fed back to the LLM to continue reasoning. This cycle can repeat multiple times within a single interaction—for example, a data analysis agent might query a database, discover missing data, query a second data source, then compute summary statistics before generating its final response. Spec engineering for tool usage defines not just what tools exist, but the decision criteria for when to use each tool, how to construct valid parameters, and how to interpret tool outputs.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Modern LLMs support tool usage through function calling APIs (OpenAI's tools parameter, Anthropic's tool_use blocks, or open-source models fine-tuned on tool use datasets like Gorilla or Toolformer). These APIs allow developers to define tool schemas as JSON Schema objects that the model reads to understand available capabilities. The model then generates tool call requests that conform to the schema. Spec engineering here involves writing clear tool descriptions, defining strict parameter schemas with constraints (enums, regex patterns, min/max values), and providing examples of correct tool invocations for few-shot guidance.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          A common failure mode in tool-using systems is parameter hallucination—the model generates plausible-looking but invalid parameters (wrong date formats, non-existent user IDs, malformed SQL). Robust specs include parameter validation rules, retry logic with corrected parameters, and fallback tools when primary tools fail. For instance, if a geocoding API returns no results for a location, the spec might instruct the LLM to "retry with the broader city name, then the state/province, before concluding the location is invalid".
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Defining Tool Schemas and Descriptions</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Tool descriptions are the primary interface between the LLM's reasoning and external system capabilities. A well-written tool description includes: what the tool does, when to use it, required vs optional parameters, output format, and common error conditions. Vague descriptions like "gets weather data" lead to misuse; detailed descriptions like "Fetches current weather conditions for a US zip code or city,state pair. Returns temperature (F), humidity (%), and conditions string. Use for real-time weather queries only—not historical data" guide the LLM toward correct usage patterns.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Parameter schemas must be strict and self-documenting. Use enums instead of free-text strings whenever possible (e.g., "units" parameter with enum ["celsius", "fahrenheit"] rather than a string description). Add regex patterns for structured inputs like email addresses, phone numbers, or ISO date strings. Include min/max constraints for numeric parameters (e.g., "temperature must be between -50 and 50 when units are celsius"). These constraints reduce parameter hallucinations and make validation failures more informative for retry logic.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Tool output formatting is equally important. If a tool returns raw JSON, the LLM must understand how to interpret it. Specs should define standard output wrappers: successful calls return {`{"status": "success", "data": ...}`}, errors return {`{"status": "error", "code": "...", "message": "..."}`}. The LLM can then branch on status rather than attempting to parse heterogeneous output formats. For tools returning large datasets, specs should define truncation rules (e.g., "return max 10 results; include total_count field indicating if more exist") to prevent context window overflow.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Multi-tool workflows require dependency specs: tool B might require output from tool A. The LLM needs to know these dependencies explicitly. For example, "the get_order_details tool requires a valid order_id from a previous list_recent_orders call" prevents the LLM from attempting to call get_order_details with a user-provided string that hasn't been validated against the system's order database.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Spec Example: E-commerce Tool Suite</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Production spec for a tool-using customer support agent with four tools:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">TOOL: list_recent_orders</div>
          <div className="mb-1">Description: Returns orders from the last 90 days for a given customer email. Use this FIRST to get valid order IDs before calling other order tools.</div>
          <div className="mb-1">Parameters: email (string, required, format: email), limit (int, optional, default: 10, max: 50)</div>
          <div className="mb-1">Output: {"{status, orders: [{order_id, date, total, status}]}"}</div>
          <div className="text-[var(--accent-text)]">TOOL: get_order_details</div>
          <div className="mb-1">Description: Returns full order details including items, shipping address, and refund eligibility. Requires order_id from list_recent_orders.</div>
          <div className="mb-1">Parameters: order_id (string, required, pattern: "^ORD-[0-9]{6}$")</div>
          <div className="text-[var(--accent-text)]">TOOL: initiate_refund</div>
          <div className="mb-1">Description: Initiates a refund for eligible orders. Max $500 without manager approval. Use ONLY after verifying eligibility via get_order_details.</div>
          <div className="mb-1">Parameters: order_id (string), amount (number, min: 0.01, max: 500), reason (enum: ["damaged","not-as-described","late-delivery"])</div>
          <div className="text-[var(--accent-text)]">TOOL: check_shipping_status</div>
          <div className="mb-1">Description: Returns real-time shipping status from carrier API. Use for orders with status "shipped".</div>
          <div className="mb-1">Parameters: tracking_number (string, required)</div>
          <div className="mb-2">Note: Never call initiate_refund without first checking eligibility. Never refund more than $500.</div>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">Poor tool spec:</p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">BAD TOOL SPEC:</div>
          <div className="mb-2">Tools: getOrders, getDetails, refund stuff, check shipping. Use them when needed.</div>
          <div className="text-[var(--text-secondary)] text-xs mt-2">// No parameter schemas, no constraints, no ordering rules, no output format. LLM will hallucinate order IDs and attempt unauthorized refunds.</div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Code Example: Tool Execution Loop</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Implementation of an LLM tool execution loop with validation and retry logic:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          {`async function runWithTools(userQuery: string, tools: Tool[], llm: LLM) {
  const messages: Message[] = [{ role: 'user', content: userQuery }];

  for (let i = 0; i < 10; i++) {
    const response = await llm.generate(messages, { tools });

    // LLM returned a text response - we're done
    if (response.content) return response.content;

    // LLM wants to call a tool
    if (response.toolCalls) {
      for (const call of response.toolCalls) {
        const tool = tools.find(t => t.name === call.name);
        if (!tool) {
          messages.push({ role: 'tool_result', tool: call.name, content: JSON.stringify({status: 'error', message: 'Tool not found'}) });
          continue;
        }

        // Validate parameters against schema
        const validation = validateParams(call.params, tool.schema);
        if (!validation.valid) {
          messages.push({ role: 'tool_result', tool: call.name, content: JSON.stringify({status: 'error', message: validation.error}) });
          continue;
        }

        const result = await tool.execute(call.params);
        messages.push({ role: 'tool_result', tool: call.name, content: JSON.stringify(result) });
      }
    }
  }
  return "Max tool call iterations reached.";
}`}
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          This loop enforces the spec by validating tool parameters before execution and limiting iterations to prevent infinite tool call loops. The tool result is wrapped in a standard format (status + data/error) that the LLM can consistently parse. A spec would define the max iteration count (10), validation rules, and error message format to ensure the LLM understands why a tool call failed and can correct its next attempt.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Real-World Use Cases</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          DevOps troubleshooting agents: Tools include kubectl (Kubernetes CLI wrapper), log aggregation API (Datadog/Splunk), and metrics API (Prometheus). The agent receives an alert, queries recent logs for error patterns, checks pod health via kubectl, and proposes remediation steps. Specs define tool ordering: "always check pod status before checking logs; always check logs before proposing fixes". This prevents the agent from analyzing logs for pods that are already healthy.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Financial data agents: Tools include SEC filing API, stock price API, and financial ratio calculator. An analyst agent might retrieve a company's 10-K filing, extract revenue figures, then calculate year-over-year growth rates using the calculator tool. Specs define data freshness rules: "use SEC API for filings older than 24 hours; use company investor relations API for recent filings". This ensures the agent uses the most authoritative source available.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Travel booking agents: Tools include flight search API, hotel booking API, and currency conversion API. The agent searches flights, checks hotel availability for the travel dates, converts prices to the user's preferred currency, and presents a bundled itinerary. Specs define constraints: "total price must not exceed user's stated budget; all times must be displayed in user's local timezone". These constraints prevent the agent from booking options the user cannot afford or will misunderstand due to timezone confusion.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tips for Tool Usage Specs</h2>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 mb-6">
          <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-3">
            <li>Write tool descriptions as instructions to the LLM: include "Use this tool when...", "Do not use for...", and "Requires {'{'}prerequisite tool{'}'} output" to guide correct invocation timing.</li>
            <li>Use strict parameter schemas with enums, regex patterns, and numeric ranges. Free-text parameters should have max length limits to prevent context overflow.</li>
            <li>Define standard output formats across all tools: {"{status: 'success'|'error', data?, message?}"} so the LLM can branch on status without parsing heterogeneous formats.</li>
            <li>Specify tool ordering dependencies explicitly: "Tool B requires output from Tool A" prevents the LLM from calling tools with unvalidated parameters.</li>
            <li>Include retry logic with parameter correction: when a tool returns an error, instruct the LLM to "adjust {`{parameter}`}" and retry once before escalating to the user.</li>
            <li>Set maximum tool call iterations (typically 5-10) to prevent infinite loops and runaway API costs from agents that continuously call tools without progressing.</li>
          </ul>
        </div>
      </section>
    </TopicLayout>
  );
}