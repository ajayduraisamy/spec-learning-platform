import TopicLayout from "@/components/TopicLayout";

export default function OrchestrationPage() {
  return (
    <TopicLayout
      section="AI Systems"
      lessonNumber="Lesson 9 of 10"
      title="Orchestration"
      currentHref="/learn/orchestration"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Is Orchestration?</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Orchestration in AI systems is the practice of coordinating multiple independent AI components—including agents, workflows, LLM pipelines, RAG systems, and third-party APIs—to execute complex, cross-functional business processes. Unlike multi-agent systems that coordinate homogeneous agent teams, orchestration manages heterogeneous systems with different capabilities, latency profiles, and failure modes. For example, an e-commerce orchestration layer might route a customer query to a RAG system for policy questions, a workflow for refund processing, or an agent for complex billing disputes based on the query's content and priority.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The primary goal of orchestration is to abstract system complexity behind a unified interface, enabling business users to define end-to-end processes without understanding individual system internals. Spec engineering for orchestration focuses on three areas: system capability definitions (what each system can do), routing policies (which system handles which task), and cross-system state management (how systems share context). A well-specified orchestration layer ensures tasks are routed to the most suitable system, failures in one system don't cascade to others, and state is shared securely between systems that need it.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Orchestration also handles system lifecycle management: starting, stopping, and scaling individual systems based on demand. For example, if the refund workflow experiences a 300% increase in volume, the orchestrator might auto-scale the workflow instances and temporarily route low-priority tasks to a backup batch processing system. Specs define scaling triggers (queue depth > 50 for 2 minutes), system health checks (ping workflow API every 30 seconds), and fallback systems for when primary systems are unavailable.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Key differentiators from workflow design: workflows manage linear/conditional sequences of steps within a single process, while orchestration manages multiple independent processes and systems. A workflow might define the steps to process a refund; orchestration decides whether to use that workflow, an agent, or a manual process based on refund amount, customer tier, and system availability.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Core Components of an Orchestration Layer</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          The system registry is a catalog of all available AI systems, their capabilities, input/output schemas, latency profiles, and availability status. Specs for the registry define capability tags (e.g., "rag", "refund-processing", "sentiment-analysis"), required input schemas, and SLA commitments (e.g., "refund workflow processes tasks in < 5 minutes"). The orchestrator queries the registry to find systems that match task requirements.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The policy engine enforces routing rules, access control, and priority logic. Routing rules might specify: "refund requests under $500 go to automated workflow; over $500 go to human-reviewed agent". Access control rules: "only the support orchestrator can invoke the refund workflow; marketing systems cannot". Priority logic: "VIP customer tasks take precedence over standard customers, with max wait time 2 minutes". Specs define policy syntax (JSON-based rules engine) and evaluation order.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The shared state manager enables secure context sharing between systems. For example, a RAG system might store retrieved sources in shared state so the downstream agent doesn't have to re-retrieve them. Specs define state access rules (which systems can read/write which state keys), encryption requirements for sensitive state, and expiration policies (state expires after 1 hour of inactivity). State is namespaced by task ID to prevent collisions between concurrent tasks.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The execution monitor tracks task progress across systems, handles timeouts, and triggers retries or escalations. Specs define monitor poll intervals (every 10 seconds), timeout rules (max 15 minutes for any task across systems), and escalation paths (notify on-call engineer if task fails 3 times). The monitor also collects metrics: task success rate per system, average latency, and escalation rate for reporting and tuning.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Spec Example: Enterprise AI Orchestration</h2>
        <p className="text-[var(--text-secondary)] mb-6">Production spec for an enterprise orchestration layer managing 5+ AI systems:</p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">ORCHESTRATION SYSTEM: Enterprise AI Platform v1.0</div>
          <div className="text-[var(--accent-text)]">SYSTEM REGISTRY:</div>
          <div className="mb-1">- RAG-Policy: Capabilities [policy-qa], Latency &lt; 2s, SLA 99.9%</div>
          <div className="mb-1">- Workflow-Refund: Capabilities [refund-processing], Latency &lt; 5m, SLA 99.5%</div>
          <div className="mb-1">- Agent-Billing: Capabilities [billing-disputes], Latency &lt; 10m, SLA 99%</div>
          <div className="text-[var(--accent-text)]">ROUTING POLICY:</div>
          <div className="mb-1">- IF query contains "policy" → RAG-Policy</div>
          <div className="mb-1">- IF query contains "refund" AND amount &lt; $500 → Workflow-Refund</div>
          <div className="mb-1">- IF query contains "refund" AND amount ≥ $500 → Agent-Billing</div>
          <div className="text-[var(--accent-text)]">SHARED STATE:</div>
          <div className="mb-1">- Namespace: task_{"{id}"}, Keys: [user_context, retrieved_sources, intermediate_results]</div>
          <div className="mb-1">- Access: RAG-Policy can write retrieved_sources; Agent-Billing can read it</div>
          <div className="text-[var(--accent-text)]">ERROR HANDLING:</div>
          <div>System timeout → retry 1x; retry fails → escalate to human queue with task context</div>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">Poor spec comparison:</p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">BAD ORCHESTRATION SPEC:</div>
          <div className="mb-2">Use the right system for the job. Route tasks. Handle errors.</div>
          <div className="text-[var(--text-secondary)] text-xs mt-2">// No system registry, no routing rules, no state management, no error handling. Tasks will be misrouted and errors uncaught.</div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Code Example 1: Simple Orchestration Engine</h2>
        <p className="text-[var(--text-secondary)] mb-6">Implementation of an orchestrator that routes tasks to systems based on policy:</p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          {`type AISystem = {
  name: string;
  capabilities: string[];
  execute: (input: any, state: Record<string, any>) => Promise<any>;
  slaMs: number;
};

class Orchestrator {
  constructor(private systems: AISystem[], private policyEngine: PolicyEngine) {}

  async routeTask(task: { query: string; amount?: number; userId: string }) {
    const systemName = this.policyEngine.evaluate(task, this.systems);
    const system = this.systems.find(s => s.name === systemName);
    if (!system) throw new Error('No suitable system found');

    const stateKey = \`task_\${Date.now()}\`;
    const state = { user_id: task.userId };

    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('System timeout')), system.slaMs));
    try {
      return await Promise.race([system.execute(task, state), timeout]);
    } catch (e) {
      return await system.execute(task, state); // Retry once
    }
  }
}`}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Code Example 2: Shared State Manager</h2>
        <p className="text-[var(--text-secondary)] mb-6">Implementation of a shared state manager with access control:</p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          {`class SharedStateManager {
  private state: Record<string, { value: any; expiresAt: number; acl: { read: string[]; write: string[] } }> = {};

  write(key: string, value: any, systemName: string, ttlMs: number = 3600000) {
    const entry = this.state[key];
    if (entry && !entry.acl.write.includes(systemName)) {
      throw new Error(\`\${systemName} does not have write access to \${key}\`);
    }
    this.state[key] = {
      value,
      expiresAt: Date.now() + ttlMs,
      acl: entry?.acl || { read: [systemName], write: [systemName] }
    };
  }

  read(key: string, systemName: string) {
    const entry = this.state[key];
    if (!entry || entry.expiresAt < Date.now()) return null;
    if (!entry.acl.read.includes(systemName)) {
      throw new Error(\`\${systemName} does not have read access to \${key}\`);
    }
    return entry.value;
  }
}`}
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          This state manager enforces the spec's access control rules and TTL policies. Systems can only access state they have explicit permission for, preventing unauthorized data sharing between isolated systems.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Real-World Use Cases</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Enterprise customer journey orchestration: A telecom company uses orchestration to manage customer interactions across chat (agent), billing (workflow), and technical support (RAG). A customer calling about a bill dispute is routed to the billing workflow; if the workflow can't resolve it, the orchestrator hands off to a billing agent with full context from the workflow. Specs define handoff rules: "transfer all workflow state to agent; notify agent of attempted resolutions".
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          DevOps incident response orchestration: An alert from Datadog triggers the orchestrator, which routes to a diagnostics workflow (collect logs, check metrics), then to a remediation agent (restart service, rollback deploy), then to a notification system (Slack alert). Specs define escalation: "if remediation fails 2 times, page on-call engineer with all collected diagnostics".
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Healthcare patient journey orchestration: A patient portal uses orchestration to route symptom checks to a triage agent, appointment requests to a scheduling workflow, and prescription refills to an automated RAG system. Specs define HIPAA compliance: "all state shared between systems must be encrypted at rest; only systems with HIPAA certification can access patient data".
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tips for Orchestration Specs</h2>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 mb-6">
          <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-3">
            <li>Define explicit capability tags for all systems: use a standardized taxonomy (e.g., "qa", "processing", "triage") to make routing rules clear and enforceable.</li>
            <li>Set SLA commitments per system: define max latency, success rate, and availability targets. The orchestrator uses these to select healthy systems and trigger escalations.</li>
            <li>Namespaced shared state: use task ID or user ID prefixes for state keys to prevent collisions and enforce access control between concurrent tasks.</li>
            <li>Test routing policies with edge cases: tasks matching multiple policies, tasks with no matching system, and tasks with conflicting policy rules.</li>
            <li>Include fallback systems: define backup systems for each primary system (e.g., "if RAG-Policy is down, use RAG-Backup with 2x latency SLA").</li>
            <li>Monitor cross-system metrics: track task handoff success rate, state transfer errors, and cross-system latency to identify bottlenecks.</li>
          </ul>
        </div>
      </section>
    </TopicLayout>
  );
}