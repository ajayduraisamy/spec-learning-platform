import TopicLayout from "@/components/TopicLayout";

export default function MultiAgentSystemsPage() {
  return (
    <TopicLayout
      section="AI Systems"
      lessonNumber="Lesson 2 of 10"
      title="Multi-agent Systems"
      currentHref="/learn/multi-agent-systems"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Are Multi-agent Systems?</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Multi-agent systems (MAS) consist of multiple autonomous AI agents that interact, collaborate, and coordinate to solve problems beyond the capability of any single agent. Unlike single-agent systems that handle end-to-end tasks sequentially, MAS distributes workload across specialized agents, each with narrow, well-defined responsibilities. This division of labor mirrors human team structures: a content creation MAS might include a researcher agent, a writer agent, and an editor agent, each contributing unique expertise to the final output. The system gains scalability, fault tolerance, and domain specialization that a generalist single agent cannot match.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The core advantage of MAS is parallel processing and risk isolation. If one agent fails or produces low-quality output, the system can reassign tasks or trigger a review process without collapsing the entire workflow. Spec engineering for MAS focuses on three critical areas: role definition (what each agent does), communication protocols (how agents share information), and coordination logic (how the system decides task allocation and conflict resolution). Vague role definitions lead to overlapping work, while poor communication specs cause agents to work in silos or pass incompatible data formats.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          MAS introduces unique challenges not present in single-agent systems: inter-agent consistency, shared state management, and deadlock prevention. For example, if two agents try to modify the same shared resource (like a draft document) simultaneously, the system needs locking or versioning rules defined explicitly in the spec. Spec engineers must define which agents have write access to shared resources, how updates are merged, and what happens when agents disagree on a decision. Without these rules, MAS can produce conflicting outputs, duplicate work, or infinite wait cycles if agents block each other waiting for unavailable resources.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Modern MAS implementations range from small, in-process teams of 3-5 agents to large distributed systems with hundreds of agents handling enterprise workflows. The key design principle is loose coupling: agents should interact only through defined communication channels, not direct function calls, to maintain modularity and testability. This aligns with spec engineering best practices, where each agent's contract (inputs, outputs, constraints) is defined independently of other agents' implementations.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Core Components of a Multi-agent System</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Every functional MAS has four mandatory components: a coordinator agent (or orchestrator), worker agents, a communication bus, and a shared state store. The coordinator is responsible for task decomposition, agent selection, and workflow progression. It does not perform domain-specific work itself; instead, it breaks a high-level goal into subtasks, assigns each to the most suitable worker agent, and aggregates results. Specifying the coordinator's decision-making criteria is critical: for example, "assign research tasks to the agent with access to academic databases, assign writing tasks to the agent with brand voice training" ensures optimal task allocation.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Worker agents are specialized, narrow-scoped agents that perform specific subtasks. A worker agent for data extraction might have access to SQL databases and PDF parsers, while a worker agent for sentiment analysis might have access to social media APIs and NLP tools. Specs for worker agents must define their input/output formats, tool access, success criteria, and constraints. For example, a sentiment analysis worker might be spec'd to "return a score between 0 (negative) and 1 (positive), include raw text snippets supporting the score, and flag results with confidence below 70% for human review".
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The communication bus handles message passing between agents. For local systems, this can be an in-memory queue; for distributed systems, it may use message brokers like RabbitMQ or cloud-native pub/sub services. Spec engineering for the communication bus defines message schemas, delivery guarantees (at-least-once, exactly-once), and error handling for undeliverable messages. A standard message schema for task assignment might include taskId, assigneeAgentId, inputData, deadline, and priority fields—all agents must adhere to this schema to ensure interoperability.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The shared state store persists data that multiple agents need to access, such as intermediate results, task status, and shared documents. Specs for shared state define access controls (which agents can read/write which keys), expiration policies (how long to keep intermediate results), and conflict resolution rules. For example, "only the coordinator and assigned worker can modify task status; all other agents have read-only access" prevents unauthorized state mutations that can corrupt workflow progress.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Spec Example: Content Creation Multi-agent System</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Below is a production-ready spec for a 4-agent content creation pipeline used by a tech media company:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">AGENT SYSTEM:</div>
          <div className="mb-2">Content Creation Pipeline v2.1</div>
          <div className="text-[var(--accent-text)]">COORDINATOR ROLE:</div>
          <div className="mb-2">Decompose "create 1000-word blog post on {topic}" into subtasks: [Research recent papers, Draft outline, Write full post, Edit for clarity, Run SEO check]. Assign subtasks sequentially, wait for completion before proceeding.</div>
          <div className="text-[var(--accent-text)]">WORKER AGENTS:</div>
          <div className="mb-1">- Researcher: Access to arXiv API, Google Scholar. Output: List of 5+ recent papers with key findings, citations in APA format.</div>
          <div className="mb-1">- Writer: Access to brand voice guidelines, outline, researcher output. Output: 1000-word draft following outline, brand voice score ≥ 90%.</div>
          <div className="mb-1">- Editor: Access to Grammarly API, style guides. Output: Edited draft with change log, readability score ≥ 60 (Flesch scale).</div>
          <div className="mb-1">- SEO Specialist: Access to Google Keyword Planner. Output: SEO score ≥ 85, list of 3+ high-volume keywords to include.</div>
          <div className="text-[var(--accent-text)]">COMMUNICATION RULES:</div>
          <div className="mb-2">Agents pass outputs via shared state at key "tasks/{taskId}/output". Coordinator polls state every 30s for completion. All messages use JSON schema v1.3.</div>
          <div className="text-[var(--accent-text)]">CONSTRAINTS:</div>
          <div className="mb-2">No agent can modify another agent's output directly; all changes must go through coordinator. Max 2 retries per subtask before escalation to human editor.</div>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">Compare to a failing spec:</p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">BAD MAS SPEC:</div>
          <div className="mb-2">Make blog posts. Have some agents do research, writing, editing. Talk to each other. Get it done.</div>
          <div className="text-[var(--text-secondary)] text-xs mt-2">// Missing role definitions, communication rules, output formats, constraints, and escalation logic. Agents will duplicate work, pass incompatible data, and never complete tasks.</div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Code Example: Minimal Multi-agent Coordinator</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          This implementation shows a coordinator managing three worker agents with dependency ordering and shared state:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          {`type AgentRole = 'researcher' | 'writer' | 'editor';
type Task = {
  id: string;
  role: AgentRole;
  input: any;
  status: 'pending' | 'in-progress' | 'complete';
  output?: any;
};

class MultiAgentSystem {
  private tasks: Task[] = [];
  private sharedState: Record<string, any> = {};

  constructor(private workers: Record<AgentRole, (input: any) => Promise<any>>) {}

  async decomposeAndAssign(goal: string) {
    const subtasks: Task[] = [
      { id: '1', role: 'researcher', input: goal, status: 'pending' },
      { id: '2', role: 'writer', input: null, status: 'pending' },
      { id: '3', role: 'editor', input: null, status: 'pending' },
    ];
    this.tasks.push(...subtasks);

    for (const task of this.tasks) {
      if (task.role === 'writer') task.input = this.sharedState['1/output'];
      if (task.role === 'editor') task.input = this.sharedState['2/output'];
      if (!task.input) throw new Error(\`Missing dependency for task \${task.id}\`);

      task.status = 'in-progress';
      const output = await this.workers[task.role](task.input);
      this.sharedState[\`\${task.id}/output\`] = output;
      task.output = output;
      task.status = 'complete';
    }
  }
}`}
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          This coordinator enforces task dependencies: the writer waits for researcher output, the editor waits for writer output. The shared state acts as the communication bus, with keys namespaced by task ID to avoid collisions. A spec for this system would define worker function signatures, shared state key naming conventions, and error handling for missing dependencies (e.g., retry researcher once before escalating).
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Real-World Use Cases</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Software development MAS: An architect agent designs system components, a coder agent writes modules, a tester agent runs unit tests, and a security agent checks for vulnerabilities. Each agent has specialized tools: the architect uses UML diagramming APIs, the coder uses IDE integration tools, the tester uses Jest/Pytest runners, and the security agent uses Snyk or OWASP scanners. Specs define handoff criteria: the coder cannot start until the architect produces an approved design document with 100% requirement coverage.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          E-commerce customer support tiers: Tier 1 agents handle basic queries (order status, return eligibility), Tier 2 agents handle complex issues (billing disputes, technical product problems), and Tier 3 agents handle legal escalations. A coordinator agent routes tickets based on a complexity score from Tier 1's initial analysis. Specs define routing rules: "Tier 1 escalates immediately if the query mentions 'lawsuit', 'refund over $500', or 'regulatory complaint'".
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Supply chain MAS: An inventory agent tracks real-time stock levels via RFID APIs, a procurement agent places orders with suppliers, a logistics agent schedules shipments, and a demand agent forecasts sales using historical data. Shared state includes live inventory counts, order statuses, and shipping delays. Specs define trigger rules: "Procurement agent places emergency order when inventory drops below 15% of forecasted 7-day demand".
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tips for Multi-agent Specs</h2>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 mb-6">
          <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-3">
            <li>Define strict role boundaries: No overlapping responsibilities. Each agent should have a single, measurable job to prevent duplicate work and conflicting outputs.</li>
            <li>Standardize message schemas: All inter-agent communication must use the same JSON/Protobuf schema to avoid parsing errors and data incompatibility.</li>
            <li>Specify dependency ordering: Explicitly define which tasks must complete before others can start to prevent race conditions and null dependency errors.</li>
            <li>Include deadlock resolution: Define timeout rules (e.g., "if task is pending for >10 minutes, reassign to backup agent") to handle agents that crash or hang.</li>
            <li>Test with agent failures: Include scenarios where worker agents return errors or crash in your spec validation to ensure retry and escalation logic works.</li>
            <li>Limit shared state scope: Only persist data that multiple agents need to access. Excess shared state increases latency and conflict risk.</li>
          </ul>
        </div>
      </section>
    </TopicLayout>
  );
}