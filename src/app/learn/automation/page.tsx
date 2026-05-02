import TopicLayout from "@/components/TopicLayout";

export default function AutomationPage() {
  return (
    <TopicLayout
      section="AI Systems"
      lessonNumber="Lesson 8 of 10"
      title="Automation"
      currentHref="/learn/automation"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What Is Automation in AI Systems?</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Automation in AI systems refers to the design and implementation of processes that execute with minimal or no human intervention, triggered by events, schedules, or system conditions. Unlike agentic systems that dynamically reason about each step, automation focuses on reliability, repeatability, and hands-off execution of well-defined procedures. Spec engineering for automation defines triggers (what starts the process), actions (what happens), conditions (when to proceed or stop), and monitoring (how to detect and handle failures). The goal is to create systems that run continuously and correctly without requiring human oversight for routine decisions.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          AI-powered automation differs from traditional RPA (Robotic Process Automation) by incorporating reasoning, adaptability, and unstructured data processing. Traditional RPA follows rigid, rule-based scripts: "if cell A1 equals 'Approved', copy to Sheet2". AI automation can handle ambiguity: "if the email expresses frustration about billing, classify as priority support ticket and draft a response acknowledging the billing concern". The spec for AI automation must define the reasoning boundaries: what the AI can decide autonomously vs. what requires human approval. For example, "auto-approve refunds under $50 with confidence > 90%; escalate all others to finance team".
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          The automation lifecycle has four phases: trigger detection, data gathering, AI processing, and action execution. Trigger detection monitors for events: new emails in a support inbox, files uploaded to an S3 bucket, database records with status "pending", or a cron schedule (every Monday at 9 AM). Data gathering collects all inputs needed for the automation: the email body, the uploaded file contents, the database record details. AI processing applies LLMs or agents to analyze, classify, or generate content. Action execution performs the resulting operations: send an email reply, move a file to a processed folder, update the database record, or call an external API.
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Spec engineering for automation prioritizes reliability over flexibility. Automated systems often run 24/7 and handle hundreds or thousands of executions per day. A spec that allows too much AI flexibility ("handle the request in the best way possible") will produce inconsistent results and require frequent human correction. Instead, automation specs use constrained prompts, deterministic decision trees where possible, and clear escalation rules: "if confidence < 85%, route to human queue; do not attempt autonomous resolution". This constraint ensures predictable, auditable outcomes at scale.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Automation Patterns and Triggers</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Event-driven automation triggers on specific occurrences: a webhook from Stripe on successful payment, a file drop in a monitored folder, or a database change stream. Specs define event filters to avoid processing irrelevant events: "on Stripe webhook, only process 'invoice.payment_succeeded' events; ignore 'invoice.created' and 'invoice.updated'". Event payloads should be validated against a schema before processing: "reject webhooks with missing 'amount_paid' or 'customer_email' fields; log rejection to monitoring dashboard".
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Schedule-driven automation runs at specified intervals using cron expressions or recurring schedules. Common patterns include daily report generation (every weekday at 8 AM), weekly data cleanup (every Sunday at 2 AM), and monthly invoice processing (1st of each month). Specs define schedule expressions, timezone handling (always use UTC for internal scheduling; convert to user timezone only for notifications), and concurrency rules: "only one instance of the monthly invoice processor may run at a time; skip if previous run is still active".
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Condition-driven automation monitors system state and triggers when conditions are met: "if support ticket queue exceeds 50 pending tickets, trigger additional agent capacity", or "if server CPU > 90% for 5 minutes, trigger auto-scaling". Specs define condition evaluation frequency (poll every 60 seconds), threshold values, duration requirements (must exceed threshold for N consecutive checks to avoid flapping), and cooldown periods (don't re-trigger within 30 minutes of last execution to prevent thrashing).
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          AI-enhanced automation adds intelligence to traditional automation patterns. A scheduled data export might use an LLM to detect anomalies in the exported data ("flag any rows where 'revenue' dropped > 20% from previous period") and only send alerts when anomalies are detected. An event-driven invoice processor might use an LLM to categorize expenses before recording them in the accounting system. Specs for AI-enhanced steps define model selection, prompt templates, output validation, and fallback behavior when the LLM fails or produces low-confidence results.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Spec Example: Automated Support Ticket Triage</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Production spec for an automated support ticket triage system processing 500+ daily tickets:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">AUTOMATION: Support Ticket Triage v3.0</div>
          <div className="text-[var(--accent-text)]">TRIGGER:</div>
          <div className="mb-1">Webhook from Zendesk on ticket.created event. Filter: only process tickets with type "email" and priority "normal" or "low".</div>
          <div className="text-[var(--accent-text)]">DATA GATHERING:</div>
          <div className="mb-1">Fetch ticket body, subject, requester email, and last 3 tickets from same requester via Zendesk API.</div>
          <div className="text-[var(--accent-text)]">AI PROCESSING (Model: gpt-4o, temp: 0.1):</div>
          <div className="mb-1">Prompt: "Classify ticket into: [billing, technical, shipping, account, spam]. Extract: urgency (1-5), sentiment (positive/neutral/negative), suggested_team. IF urgency >= 4, set priority = 'high'."</div>
          <div className="text-[var(--accent-text)]">ACTION EXECUTION:</div>
          <div className="mb-1">- Update Zendesk ticket: tags = [classification], priority = (AI-determined), assignee = suggested_team</div>
          <div className="mb-1">- If spam: close ticket, send auto-reply "Spam detected"</div>
          <div className="mb-1">- If urgency >= 4: notify team lead via Slack webhook</div>
          <div className="text-[var(--accent-text)]">ERROR HANDLING:</div>
          <div>LLM timeout/error: retry 1x with gpt-3.5-turbo. If still fails: assign to "unclassified" queue, alert ops team.</div>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">Poor automation spec:</p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          <div className="text-[var(--accent-text)]">BAD AUTOMATION SPEC:</div>
          <div className="mb-2">When tickets come in, use AI to sort them. Send them to the right team. Alert someone if it's urgent.</div>
          <div className="text-[var(--text-secondary)] text-xs mt-2">// No trigger definition, no event filtering, no model spec, no error handling, no priority thresholds. Will process all tickets including spam, crash on API errors, and miss urgent tickets.</div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Code Example: Event-Driven Automation Handler</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Implementation of an event-driven automation handler with validation, AI processing, and action execution:
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm mb-6 overflow-x-auto">
          {`async function handleTicketWebhook(event: WebhookEvent) {
  // 1. Validate event schema
  if (event.type !== 'ticket.created' || !event.data.requester_email) {
    console.log('Skipping event:', event.type);
    return;
  }

  // 2. Gather data
  const [ticket, recentTickets] = await Promise.all([
    zendesk.getTicket(event.data.id),
    zendesk.listTickets({ requester_email: event.data.requester_email, limit: 3 })
  ]);

  // 3. AI Processing
  let classification;
  try {
    classification = await llm.generate(\`Classify: \${ticket.subject} \${ticket.body}. Output JSON: {category, urgency: 1-5, sentiment}\`, {
      model: 'gpt-4o',
      temperature: 0.1,
      response_format: { type: 'json_object' }
    });
  } catch (e) {
    // Fallback to gpt-3.5-turbo
    classification = await llm.generate(\`Classify: \${ticket.subject}\`, { model: 'gpt-3.5-turbo' });
  }

  // 4. Action execution
  const updates: any = { tags: [classification.category] };
  if (classification.urgency >= 4) {
    updates.priority = 'high';
    await slack.notify(\`Urgent ticket: \${ticket.id}, urgency: \${classification.urgency}\`);
  }
  if (classification.category === 'spam') {
    updates.status = 'closed';
    await zendesk.sendReply(ticket.id, 'Spam detected. Ticket closed.');
  }

  await zendesk.updateTicket(ticket.id, updates);
}`}
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          This handler follows the spec: validates the event type and required fields, gathers ticket data via API, processes with LLM (with fallback model on failure), and executes actions based on classification results. The spec would define the exact prompt template, JSON schema for the response, fallback model, and action rules (urgency thresholds, spam handling). Without these specs, the handler might misclassify tickets or take incorrect actions.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Real-World Use Cases</h2>
        <p className="text-[var(--text-secondary)] mb-4">
          Invoice processing automation: Monitors an email inbox for invoices from approved vendors, extracts vendor name, amount, and due date using an LLM, matches to purchase orders in the ERP system, and auto-approves payments under $2,000. Specs define approval thresholds by vendor tier: "Tier 1 vendors (AWS, Microsoft): auto-approve up to $10,000; Tier 2 vendors: auto-approve up to $2,000; all others require manager approval".
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Social media monitoring automation: Polls Twitter/X and Reddit APIs every 15 minutes for brand mentions, uses an LLM to classify sentiment and extract product mentions, and auto-replies to negative mentions with a template acknowledgment while routing to support team. Specs define response rules: "reply to negative mentions only if sentiment score < 0.3 and mention includes specific product name; do not reply to general complaints about industry".
        </p>
        <p className="text-[var(--text-secondary)] mb-4">
          Infrastructure auto-remediation: Monitors Datadog alerts, uses an LLM to parse alert messages and identify the affected service and likely cause, then executes predefined remediation runbooks (restart service, clear cache, rollback deployment). Specs define safe auto-remediation actions: "allow auto-restart for stateless services; require human approval for database or stateful service changes". This prevents automation from causing secondary outages.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Tips for Automation Specs</h2>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 mb-6">
          <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-3">
            <li>Define explicit trigger filters: don't process every event. Filter by event type, payload fields, or source to avoid wasting resources on irrelevant events.</li>
            <li>Set confidence thresholds for AI decisions: "only auto-execute actions with AI confidence >= 85%; below that, queue for human review". This prevents incorrect automated actions.</li>
            <li>Include idempotency keys: automation may receive duplicate events (webhook retries). Use event IDs or content hashes to ensure the same event isn't processed twice.</li>
            <li>Specify concurrency and rate limits: "max 5 concurrent executions; rate limit external API calls to 10/second" to avoid overwhelming downstream systems.</li>
            <li>Add dead-letter queues: when automation fails after all retries, send to a DLQ (Dead Letter Queue) for manual inspection rather than silently dropping the event.</li>
            <li>Monitor execution metrics: spec logging for "execution_count, success_rate, avg_latency_ms, escalation_count" to detect degradation and tune thresholds over time.</li>
          </ul>
        </div>
      </section>
    </TopicLayout>
  );
}