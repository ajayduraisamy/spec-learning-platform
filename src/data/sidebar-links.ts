export interface Topic {
  title: string;
  href: string;
}

export interface Section {
  name: string;
  topics: Topic[];
}

export const sidebarSections: Section[] = [
  {
    name: "Foundations",
    topics: [
      { title: "Introduction", href: "/learn/introduction" },
      { title: "Basics", href: "/learn/basics" },
      { title: "Structure", href: "/learn/structure" },
      { title: "Roles", href: "/learn/roles" },
      { title: "Tasks", href: "/learn/tasks" },
      { title: "Constraints", href: "/learn/constraints" },
      { title: "Output Format", href: "/learn/output-format" },
      { title: "Templates", href: "/learn/templates" },
      { title: "Examples", href: "/learn/examples" },
      { title: "Common Mistakes", href: "/learn/mistakes" },
    ],
  },
  {
    name: "Core Engineering",
    topics: [
      { title: "Context Engineering", href: "/learn/context-engineering" },
      { title: "Spec vs Context", href: "/learn/spec-vs-context" },
      { title: "Prompt Patterns", href: "/learn/prompt-patterns" },
      { title: "Chaining", href: "/learn/chaining" },
      { title: "Debugging Specs", href: "/learn/debugging" },
      { title: "Optimization", href: "/learn/optimization" },
      { title: "Evaluation", href: "/learn/evaluation" },
      { title: "Best Practices", href: "/learn/best-practices" },
      { title: "Prompt Tuning", href: "/learn/prompt-tuning" },
      { title: "Error Handling", href: "/learn/error-handling" },
    ],
  },
  {
    name: "AI Systems",
    topics: [
      { title: "AI Agents", href: "/learn/ai-agents" },
      { title: "Multi-agent Systems", href: "/learn/multi-agent-systems" },
      { title: "RAG Basics", href: "/learn/rag-basics" },
      { title: "Tool Usage", href: "/learn/tool-usage" },
      { title: "Memory Systems", href: "/learn/memory-systems" },
      { title: "Workflow Design", href: "/learn/workflow-design" },
      { title: "LLM Pipelines", href: "/learn/llm-pipelines" },
      { title: "Automation", href: "/learn/automation" },
      { title: "Orchestration", href: "/learn/orchestration" },
      { title: "Scaling AI", href: "/learn/scaling-ai" },
    ],
  },
  {
    name: "Domain-Based Specs",
    topics: [
      { title: "Backend Specs", href: "/learn/backend-specs" },
      { title: "Frontend Specs", href: "/learn/frontend-specs" },
      { title: "DevOps Specs", href: "/learn/devops-specs" },
      { title: "Database Specs", href: "/learn/database-specs" },
      { title: "API Specs", href: "/learn/api-specs" },
      { title: "Resume Specs", href: "/learn/resume-specs" },
      { title: "Testing Specs", href: "/learn/testing-specs" },
      { title: "Security Specs", href: "/learn/security-specs" },
      { title: "Analytics Specs", href: "/learn/analytics-specs" },
      { title: "Mobile Specs", href: "/learn/mobile-specs" },
    ],
  },
  {
    name: "Advanced + Real World",
    topics: [
      { title: "Production Systems", href: "/learn/production-systems" },
      { title: "Scaling Prompts", href: "/learn/scaling-prompts" },
      { title: "Cost Optimization", href: "/learn/cost-optimization" },
      { title: "Latency Handling", href: "/learn/latency-handling" },
      { title: "Monitoring", href: "/learn/monitoring" },
      { title: "Logging", href: "/learn/logging" },
      { title: "Versioning", href: "/learn/versioning" },
      { title: "Prompt Version Control", href: "/learn/prompt-version-control" },
      { title: "Case Studies", href: "/learn/case-studies" },
      { title: "Enterprise Usage", href: "/learn/enterprise-usage" },
    ],
  },
];

export function getAllTopics() {
  return sidebarSections.flatMap((s) => s.topics);
}

export function findNextTopic(currentHref: string): { title: string; href: string } | null {
  const topics = getAllTopics();
  const index = topics.findIndex((t) => t.href === currentHref);
  if (index >= 0 && index < topics.length - 1) {
    return topics[index + 1];
  }
  return null;
}

export function findPrevTopic(currentHref: string): { title: string; href: string } | null {
  const topics = getAllTopics();
  const index = topics.findIndex((t) => t.href === currentHref);
  if (index > 0) {
    return topics[index - 1];
  }
  return null;
}
