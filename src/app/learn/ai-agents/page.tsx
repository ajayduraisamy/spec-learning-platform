import TopicLayout from "@/components/TopicLayout";

export default function AIAgentsPage() {
  return (
    <TopicLayout
      section="AI Systems"
      lessonNumber="Lesson 1 of 10"
      title="AI Agents"
      currentHref="/learn/ai-agents"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Are AI Agents?</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          AI agents are autonomous software systems that perceive their environment, reason about goals, and execute actions to achieve specific outcomes without continuous human intervention. Unlike static LLM prompts that generate one-off responses, agents maintain state, make decisions based on context, and iterate on their work using feedback loops. The core defining trait of an AI agent is its ability to break down complex goals into sequential steps, select appropriate tools or sub-processes, and adapt its approach when initial attempts fail. This autonomy makes agents suitable for tasks that require multi-step reasoning, such as research, data analysis, customer support triage, and workflow automation.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The evolution from basic prompt engineering to agent design represents a shift from instructing a model what to say to instructing a system how to act. Early LLM applications focused on text generation: summarize this, write that code, answer this question. Agents extend this by adding agency—the capacity to choose what to do next. A customer support agent, for example, doesn't just respond to a query; it reads the user's message, checks order history via a tool, identifies the issue, proposes a solution, and follows up if the user is unsatisfied. This loop of perception, reasoning, action, and feedback is what separates agents from simple prompt-response systems.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Modern AI agents are built on top of large language models but add critical layers: goal management, tool access, memory systems, and error handling. The LLM acts as the reasoning engine, but the agent framework handles orchestration, state persistence, and tool invocation. Spec engineering for agents therefore focuses on defining clear goals, constraints, available tools, success criteria, and error recovery protocols. A well-specified agent knows not just what task to perform, but when to stop, when to ask for human input, and how to handle edge cases like missing data or tool failures.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Core Components of an AI Agent</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Every functional AI agent consists of four foundational components: a goal specification, a reasoning engine, a tool registry, and a state manager. The goal specification defines the agent's primary objective, success criteria, and constraints. This is the most critical part of agent spec engineering—vague goals lead to agents that drift, loop indefinitely, or produce irrelevant outputs. A well-written goal spec includes measurable outcomes, boundaries on scope, and explicit instructions for when to escalate to human oversight.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The reasoning engine is typically an LLM that processes context, evaluates options, and selects next actions. When spec engineering for the reasoning layer, you define the agent's persona, decision-making framework, and output format requirements. For example, a financial analysis agent might be instructed to "prioritize risk mitigation over returns when evaluating investments for retirement portfolios" and "always cite sources for market data". These instructions shape how the LLM interprets tool outputs and user inputs.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The tool registry lists all external capabilities the agent can access: APIs, databases, web search, code execution environments, or internal company systems. Spec engineering for tools requires defining not just what tools are available, but when to use them, what parameters to pass, and how to interpret their outputs. A common failure mode is agents calling tools with malformed inputs or misinterpreting API responses—clear spec guidelines prevent this. For instance, specifying "only use the weather API when the user explicitly mentions a location and time range" avoids unnecessary API calls.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The state manager tracks the agent's progress, conversation history, tool call results, and intermediate reasoning steps. Spec engineering for state management defines what information to persist between steps, when to clear context to avoid bloat, and how to handle session resets. Agents working on long-running tasks like document drafting need to persist outline versions, user feedback, and revision history—while agents handling one-off queries can discard state after task completion.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Spec Example: Basic Agent Specification</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          A well-structured agent spec balances clarity with flexibility. Below is a real-world spec for a customer support triage agent used by an e-commerce platform:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">AGENT ROLE:</div>
          <div className="mb-2">E-commerce Customer Support Triage Agent</div>
          <div className="text-[var(--accent-text)]">GOAL:</div>
          <div className="mb-2">Classify incoming customer tickets into one of four categories: [Refund Request, Shipping Issue, Product Question, Account Problem]. Extract ticket ID, customer email, and issue summary. Escalate to human agent if confidence score is below 85%.</div>
          <div className="text-[var(--accent-text)]">TOOLS AVAILABLE:</div>
          <div className="mb-2">- Order History API: accepts ticket ID, returns order details, shipping status, refund eligibility</div>
          <div className="mb-2">- Customer DB: accepts email, returns account tier, previous tickets, refund history</div>
          <div className="text-[var(--accent-text)]">CONSTRAINTS:</div>
          <div className="mb-2">- Do not issue refunds directly; only classify and escalate</div>
          <div className="mb-2">- Never share customer PII with other users</div>
          <div className="mb-2">- Maximum 3 tool calls per ticket</div>
          <div className="text-[var(--accent-text)]">SUCCESS CRITERIA:</div>
          <div>Correct classification in 92%+ of test cases, escalation rate below 15% for high-tier customers</div>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          Compare this to a poor spec that leads to agent failure:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">BAD AGENT SPEC:</div>
          <div className="mb-2">Help customers with their problems. Use tools if needed. Be nice.</div>
          <div className="text-[var(--text-secondary)] text-xs mt-2">// This spec lacks goals, constraints, tool definitions, and success criteria. Agents built with this spec will drift, make unauthorized actions, or loop indefinitely.</div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Code Example: Building a Simple Research Agent</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Below is a minimal implementation of a research agent that takes a topic, searches for sources, summarizes findings, and validates accuracy. This example uses a simplified agent loop without external frameworks to illustrate core concepts:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          {`type AgentState = {
  goal: string;
  sources: string[];
  summary: string;
  step: 'search' | 'summarize' | 'validate' | 'complete';
};

async function runResearchAgent(topic: string) {
  const state: AgentState = {
    goal: \`Research \${topic} and produce a 500-word summary with 3+ credible sources\`,
    sources: [],
    summary: '',
    step: 'search'
  };

  while (state.step !== 'complete') {
    switch (state.step) {
      case 'search':
        const searchResults = await webSearch(state.goal);
        state.sources = searchResults.filter(r => r.domain.includes('.edu') || r.domain.includes('.gov'));
        state.step = state.sources.length >= 3 ? 'summarize' : 'search';
        break;
      case 'summarize':
        const summary = await llm.generate(\`Summarize these sources into a 500-word overview: \${JSON.stringify(state.sources)}\`);
        state.summary = summary;
        state.step = 'validate';
        break;
      case 'validate':
        const validation = await llm.generate(\`Check this summary for factual errors against sources: \${state.summary}. Sources: \${JSON.stringify(state.sources)}\`);
        if (validation.pass) state.step = 'complete';
        else state.step = 'summarize';
        break;
    }
  }
  return { summary: state.summary, sources: state.sources };
}`}
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          This agent loop demonstrates the core perception-action cycle: the agent searches for sources, summarizes them, validates the output, and repeats if validation fails. The spec for this agent would define the search criteria (prioritize .edu/.gov domains), summary length, validation rules, and termination conditions. Without a spec defining these parameters, the agent might return low-quality sources, overly long summaries, or never reach the completion step.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Real-World Use Cases</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          AI agents are deployed across industries to automate complex, multi-step workflows. In healthcare, diagnostic agents assist doctors by pulling patient history, recent lab results, and the latest medical research to suggest potential diagnoses. These agents are spec'd with strict constraints: only use peer-reviewed sources, never make definitive diagnoses, and escalate to a human physician if confidence is below 90%.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          In software engineering, code review agents analyze pull requests, check for style violations, test coverage gaps, and security vulnerabilities. Specs for these agents define which linters to run, what constitutes a critical vs minor issue, and when to automatically approve low-risk changes. A well-spec'd code review agent can reduce human review time by 40% while catching 85% of common errors.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Another common use case is supply chain monitoring agents that track shipment status, weather delays, and inventory levels. These agents trigger automated reorders when stock falls below thresholds, notify stakeholders of delays, and adjust delivery routes in real time. Specs here define trigger thresholds, notification protocols, and fallback options when primary suppliers are unavailable.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tips for Effective Agent Specs</h2>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 mb-6">
          <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-3">
            <li>Define explicit termination conditions: agents should know when a task is complete to avoid infinite loops. Use measurable criteria like "task is complete when summary length exceeds 400 words and includes 3+ sources".</li>
            <li>Specify tool usage rules: don't just list available tools—define when to use them, what parameters are required, and how to handle errors. For example: "Use the weather API only when the user mentions a specific city and date range".</li>
            <li>Include error recovery protocols: agents will encounter failed tool calls, missing data, and invalid inputs. Your spec should define fallback actions, such as retrying a tool call twice before escalating to human oversight.</li>
            <li>Set clear escalation boundaries: specify which tasks require human approval, such as issuing refunds over $100, deleting user data, or overriding system defaults.</li>
            <li>Test with edge cases: include examples of malformed inputs, missing tools, and conflicting instructions in your spec to ensure the agent handles them gracefully.</li>
          </ul>
        </div>
      </section>
    </TopicLayout>
  );
}