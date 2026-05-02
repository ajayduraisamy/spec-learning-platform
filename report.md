# SpecEngine — Project Report

## Overview

**SpecEngine** is an open-source learning platform built with Next.js 16 for teaching **Spec Engineering** — a disciplined approach to writing precise, structured prompts (specs) for LLM applications instead of free-form conversational prompts.

- **Name:** spec-learning-platform
- **Version:** 0.1.0
- **License:** Open Source
- **Repository:** Not yet linked to a specific GitHub repo

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16.2.4 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19.2.4 |
| Styling | Tailwind CSS v4 |
| Linting | ESLint v9 |
| Fonts | Geist Sans + Geist Mono |

---

## Project Structure

```
spec-learning-platform/
├── public/                          # Static assets (Next.js, Vercel SVGs)
├── src/
│   ├── app/                         # Next.js App Router pages
│   │   ├── layout.tsx               # Root layout (Navbar, Sidebar, Theme, Toast)
│   │   ├── page.tsx                 # Landing/Home page
│   │   ├── globals.css              # Global styles, CSS variables, animations
│   │   ├── favicon.ico
│   │   ├── contribute/
│   │   │   └── page.tsx             # Open-source contribution guide page
│   │   ├── generator/
│   │   │   └── page.tsx             # Spec Generator tool page
│   │   ├── templates/
│   │   │   └── page.tsx             # Template library hub (Coming Soon)
│   │   └── learn/
│   │       ├── page.tsx             # Learn overview / module listing page
│   │       ├── introduction/        # 31 lesson topic pages (see below)
│   │       ├── basics/
│   │       ├── structure/
│   │       ├── roles/
│   │       ├── tasks/
│   │       ├── constraints/
│   │       ├── output-format/
│   │       ├── templates/
│   │       ├── examples/
│   │       ├── mistakes/
│   │       ├── context-engineering/
│   │       ├── spec-vs-context/
│   │       ├── prompt-patterns/
│   │       ├── chaining/
│   │       ├── debugging/
│   │       ├── optimization/
│   │       ├── evaluation/
│   │       ├── best-practices/
│   │       ├── prompt-tuning/
│   │       ├── error-handling/
│   │       ├── ai-agents/
│   │       ├── multi-agent-systems/
│   │       ├── rag-basics/
│   │       ├── tool-usage/
│   │       ├── memory-systems/
│   │       ├── workflow-design/
│   │       ├── llm-pipelines/
│   │       ├── automation/
│   │       ├── orchestration/
│   │       ├── advanced/
│   │       └── scaling-ai/
│   ├── components/                  # React components (8 files)
│   │   ├── Navbar.tsx               # Top navigation bar with mobile menu
│   │   ├── Sidebar.tsx              # Left sidebar with topic navigation
│   │   ├── GeneratorForm.tsx        # Spec generator configuration form
│   │   ├── SpecCard.tsx             # Display card for generated specs
│   │   ├── ThemeProvider.tsx        # Dark/light theme context provider
│   │   ├── ThemeToggle.tsx          # Theme switch toggle button
│   │   ├── ToastProvider.tsx        # Toast notification system
│   │   └── TopicLayout.tsx          # Reusable lesson page layout with prev/next nav
│   ├── data/                        # Data layer
│   │   ├── sidebar-links.ts         # Sidebar navigation structure (5 sections, 50 topics)
│   │   └── baseSpecs.json           # Template data for spec generator (5 categories)
│   └── lib/
│       └── generator.ts             # Combinatorial spec generation engine
├── next.config.ts                   # Next.js configuration
├── tsconfig.json                    # TypeScript configuration
├── eslint.config.mjs                # ESLint configuration
├── postcss.config.mjs               # PostCSS/Tailwind configuration
└── package.json                     # Dependencies and scripts
```

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page — Hero, "What is Spec Engineering", "Why It Matters", CTA |
| `/learn` | Learn overview — 5 core modules with lesson cards |
| `/learn/[topic]` | 31 individual lesson pages covering foundations, core engineering, AI systems |
| `/generator` | Spec Generator — Combinatorial template expansion tool |
| `/templates` | Template Library hub (Coming Soon placeholder) |
| `/contribute` | Contribution guide — Fork, change, PR workflow |

---

## Learning Curriculum (5 Sections, 50 Topics Defined)

### 1. Foundations (10 topics)
Introduction, Basics, Structure, Roles, Tasks, Constraints, Output Format, Templates, Examples, Common Mistakes

### 2. Core Engineering (10 topics)
Context Engineering, Spec vs Context, Prompt Patterns, Chaining, Debugging Specs, Optimization, Evaluation, Best Practices, Prompt Tuning, Error Handling

### 3. AI Systems (10 topics)
AI Agents, Multi-agent Systems, RAG Basics, Tool Usage, Memory Systems, Workflow Design, LLM Pipelines, Automation, Orchestration, Scaling AI

### 4. Domain-Based Specs (10 topics) — *Defined in sidebar but NO pages exist yet*
Backend Specs, Frontend Specs, DevOps Specs, Database Specs, API Specs, Resume Specs, Testing Specs, Security Specs, Analytics Specs, Mobile Specs

### 5. Advanced + Real World (10 topics) — *Defined in sidebar but NO pages exist yet*
Production Systems, Scaling Prompts, Cost Optimization, Latency Handling, Monitoring, Logging, Versioning, Prompt Version Control, Case Studies, Enterprise Usage

---

## Detailed Lesson Topics Covered (31 Implemented Lessons)

### 1. Foundations (10/10 Implemented)

#### Lesson 1: Introduction (`/learn/introduction`)
- What is Spec Engineering — treating prompts as structured specifications, not conversations
- The problem spec engineering solves — eliminates iterative prompting, enables composability, testability
- How specs differ from prompts — architectural distinction with side-by-side comparisons
- The Four Pillars — Role, Task, Constraints, Output Format (with examples for each)
- Complete spec walkthrough — product search API spec from start to finish
- Real-world usage scenarios — automated code generation, consistent code reviews, documentation pipelines
- Tips for getting started — start with one spec, treat specs as code, measure quality, never skip output format

#### Lesson 2: Basics (`/learn/basics`)
- What is a spec — structured prompt with 4 dimensions (role, task, constraints, output format)
- Anatomy of a spec — component ordering and why it matters
- Why specs work better — reduced ambiguity, deterministic behavior, composability, testability
- Good vs. bad comparisons — database migration, React component, shell script examples
- Tips for writing first spec — write task first, add constraints incrementally, test 3+ runs

#### Lesson 3: Structure (`/learn/structure`)
- Architecture of a well-structured spec — four-component sequence and its cognitive basis
- Component 1: Role — persona priming mechanism, effective role patterns
- Component 2: Task — specificity, actionability, scope; vague vs. specific task comparison
- Component 3: Constraints — 6 categories (Technology, Architecture, Performance, Security, Style, Testing)
- Component 4: Output Format — patterns for code, JSON, docs, analysis, step-by-step outputs
- Complete spec example — Kubernetes deployment runbook
- Team structure conventions — shared spec structure as team coordination tool

#### Lesson 4: Roles (`/learn/roles`)
- Power of persona priming — how roles activate specific training distributions
- Crafting effective role descriptions — formula: Expertise Level + Base Role + Domain Specialization
- Role impact on output quality — 3-level comparison (assistant vs reviewer vs security engineer)
- Role-specific output patterns — Junior Dev, Senior Dev, Principal Engineer, Security Auditor patterns
- Multi-role specs — combining multiple personas for cross-functional analysis
- Tips for writing effective roles — include expertise level, be domain-specific, match complexity, test different roles

#### Lesson 5: Tasks (`/learn/tasks`)
- Defining the deliverable — specificity, actionability, scope; scope creep problem
- Task construction pattern — Active Verb + Deliverable + Key Features
- Task decomposition strategy — breaking large tasks into focused sub-tasks (e-commerce API example)
- Good vs. bad task examples — API endpoints, data analysis, testing scenarios
- Action verbs mapping — Implement, Design, Analyze, Review, Refactor, Optimize, Document, Generate
- Tips for effective tasks — start with active verb, define "done", keep focused, avoid subjective language

#### Lesson 6: Constraints (`/learn/constraints`)
- Why constraints are most powerful — how LLM token probability works with constraints
- 6 constraint categories with real examples:
  - Technology (language, framework, version)
  - Architecture (patterns, organization)
  - Performance (throughput, latency, memory)
  - Security (validation, data handling)
  - Style (standards, naming, formatting)
  - Negative (what NOT to do)
- Before/after comparison — minimal vs. comprehensive constraints on auth endpoint
- Balancing constraint specificity — over-constrained vs. well-constrained vs. under-constrained
- Negative constraints — power of "do not" statements (7 high-impact negative constraints)
- Tips — start with technology, add negatives liberally, specify versions, include error handling

#### Lesson 7: Output Format (`/learn/output-format`)
- Controlling response shape — why output format is most neglected yet most impactful component
- 5 output format patterns:
  - Code-Only Output — for automated pipelines
  - Structured Data Output — JSON/YAML for programmatic consumption
  - Documentation Output — markdown with sections
  - Analysis Output — findings with severity ratings
  - Step-by-Step Output — runbooks and deployment guides
- JSON Schema output — most powerful format for programmatic validation
- Common mistakes — omitting format, ambiguous instructions, forgetting to suppress conversational text
- Consumption modes — Machine, Human+Machine, Human Only with format strategies
- Tips — always specify format, include "no explanation, no markdown", test with multiple runs

#### Lesson 8: Templates (`/learn/templates`)
- Power of reusable templates — variable placeholders, combinatorial substitution
- Template formula — template string + variable arrays → Cartesian product
- 3 production templates with full variables:
  - API Development Template (576 generated specs)
  - Code Review Template (192 generated specs)
  - Database Migration Template (108 generated specs)
- Generated spec example — order processing API with variable substitution walkthrough
- Template best practices — naming, 4+ values per variable, compatibility testing, versioning

#### Lesson 9: Examples (`/learn/examples`)
- 5 complete spec-to-output examples with component breakdowns:
  - Example 1: REST API endpoint (user profile with UUID validation, Prisma, error handling)
  - Example 2: React component (dashboard metrics card with Tailwind, accessibility, dark mode)
  - Example 3: Database schema (e-commerce PostgreSQL with UUIDs, foreign keys, CHECK constraints)
  - Example 4: Security analysis (authentication code review with OWASP mapping, JSON output)
  - Example 5: Deployment pipeline (GitHub Actions CI/CD for Next.js with Lighthouse audit)
- Key patterns across all examples — four-component structure, specific constraints, negative constraints, expertise-level roles

#### Lesson 10: Common Mistakes (`/learn/mistakes`)
- Mistake 1: Omitting output format — most common and most costly error
- Mistake 2: Vague role definitions — "expert" vs. "principal security engineer specializing in OWASP"
- Mistake 3: Overly broad tasks — scope creep, decomposition fix
- Mistake 4: Under-specified constraints — "modern JavaScript" vs. specific TypeScript version + style guide
- Mistake 5: Mixing components — blended paragraph vs. clearly separated sections
- Mistake 6: Not iterating on specs — 4-iteration process from 40% → 100% usable output
- Mistake 7: Writing model-specific specs — testing across models, avoiding model-specific patterns
- Mistake 8: Ignoring negative constraints — 8 essential negative constraints
- Spec Engineering Checklist — 9-item verification before running any spec

### 2. Core Engineering (10/10 Implemented)

#### Lesson 1: Context Engineering (`/learn/context-engineering`)
- Foundations — designing, structuring, managing information payload around prompts
- Context window architecture — priority zones (system, active, recall), token allocation budgets
- Context injection patterns — direct, conditional, compressed injection with spec examples
- Context prioritization — recency weighting, relevance scoring, "lost in the middle" phenomenon
- Real-world implementation — code review assistant, e-commerce recommendations

#### Lesson 2: Spec vs Context (`/learn/spec-vs-context`)
- Defining spec vs context — explicit instructions vs. informational substrate
- Architectural separation — templates with insertion points vs. dynamic data payloads
- Token economics — specs amortized across requests, contexts variable per query
- Debugging spec vs context issues — diagnostic test patterns (minimal, expanded, contradictory context)
- Real-world patterns — legal document analysis, code generation tools with clean separation

#### Lesson 3: Prompt Patterns (`/learn/prompt-patterns`)
- Taxonomy — structural, behavioral, and output patterns
- Few-shot prompting — example input-output pairs for in-context learning
- Chain-of-Thought (CoT) — forcing intermediate reasoning steps for complex tasks
- Persona and role patterns — specific identity, expertise, multi-persona patterns
- Output format and validation patterns — JSON schemas, validation wrappers, markdown templates
- Real-world pattern combinations — composite templates, anti-patterns to avoid

#### Lesson 4: Chaining (`/learn/chaining`)
- Principles of prompt chaining — decomposing complex tasks into sequential focused prompts
- Sequential vs. Parallel chains — dependency-based vs. independent execution with spec examples
- Conditional and dynamic chains — routing based on intermediate outputs, error-triggered rechains
- Chain state management — shared state objects, state compression, observability/logging
- Real-world architectures — RAG 5-step chains, code review automation chains

#### Lesson 5: Debugging Specs (`/learn/debugging`)
- Debugging mindset — scientific method, reproducibility challenges, test harnesses
- Common failure modes — instruction ignoring, hallucination, with before/after fixes
- Systematic techniques — binary search debugging, contrastive debugging, token-level debugging
- Tools and instrumentation — prompt versioning, output logging, A/B testing infrastructure
- Real-world scenarios — support bot unauthorized refunds, language-specific failures

#### Lesson 6: Optimization (`/learn/optimization`)
- Token economy — redundant phrasing removal, semantic compression, few-shot optimization
- Latency optimization — TTFT, output token limits, caching strategies
- Model selection and right-sizing — matching task complexity to model capability, hybrid architectures
- Prompt compression — instruction compression, context summarization, dynamic truncation
- Measuring impact — token count, latency, quality score tracking; A/B testing validation

#### Lesson 7: Evaluation (`/learn/evaluation`)
- Fundamentals — development, staging, production evaluation stages; golden rule of held-out test sets
- Metrics — format compliance, semantic accuracy, operational metrics (token efficiency, latency)
- Building test suites — happy paths, edge cases, adversarial cases; diversity over quantity
- Automated vs human evaluation — objective vs subjective tasks, LLM-as-judge hybrid approach
- Real-world production — 500-case nightly test suites, shadow evaluation, continuous monitoring

#### Lesson 8: Best Practices (`/learn/best-practices`)
- Core principles — reproducibility, clarity over cleverness, modularity, explicit over implicit
- Spec structure standards — consistent templates, input validation instructions
- Context management — structured injection, relevance thresholds, context versioning
- Testing discipline — 20+ case test suites, regression testing, canary deployments
- Team collaboration — shared pattern libraries, spec documentation, code review for specs

#### Lesson 9: Prompt Tuning (`/learn/prompt-tuning`)
- Understanding prompt tuning — structured methodology with objective functions, exploration vs exploitation
- Parameter-efficient techniques — instruction phrasing experiments, few-shot example optimization, output format tuning
- Automated tuning — DSPy framework, compilation workflow, limitations
- Hyperparameter tuning — temperature, few-shot count, model version comparison
- Real-world workflows — 20 prompt variations × 3 models × 5 temperatures on 500 examples

#### Lesson 10: Error Handling (`/learn/error-handling`)
- Taxonomy of spec errors — output validation failures, semantic errors, system errors
- Retry and fallback strategies — exponential backoff with jitter, fallback models, circuit breakers, self-correction pattern
- Graceful degradation — templated responses, partial output handling, context overflow handling
- Error monitoring — error rate alerts, output quality monitoring, dead letter queuing
- Real-world architectures — 3-layer invoice processing (99.8% automation), multi-model content moderation (99.95% uptime)

### 3. AI Systems (10/10 Implemented)

#### Lesson 1: AI Agents (`/learn/ai-agents`)
- What are AI agents — autonomous systems with perception, reasoning, action, feedback loops
- Core components — goal specification, reasoning engine, tool registry, state manager
- Basic agent specification — customer support triage agent with full spec (role, goal, tools, constraints, success criteria)
- Code example — research agent with search → summarize → validate loop
- Real-world use cases — healthcare diagnostics, code review, supply chain monitoring
- Tips — termination conditions, tool usage rules, error recovery, escalation boundaries

#### Lesson 2: Multi-agent Systems (`/learn/multi-agent-systems`)
- What are MAS — multiple autonomous agents collaborating with division of labor
- Core components — coordinator agent, worker agents, communication bus, shared state store
- Content creation pipeline spec — 4-agent system (researcher, writer, editor, SEO specialist)
- Code example — minimal coordinator with dependency ordering and shared state
- Real-world use cases — software dev MAS, e-commerce support tiers, supply chain MAS
- Tips — strict role boundaries, standardized message schemas, dependency ordering, deadlock resolution

#### Lesson 3: RAG Basics (`/learn/rag-basics`)
- What is RAG — combining information retrieval with text generation
- Pipeline components — indexing (chunking, embeddings), retrieval (similarity search, hybrid), generation (prompt template)
- Technical documentation RAG spec — indexing config, retrieval config, generation prompt, fallback
- Code example — complete RAG pipeline with chunking, embedding, retrieval, generation
- Real-world use cases — legal research, healthcare, customer support
- Tips — chunk size testing, similarity thresholds, citation requirements, metadata filtering, fallback behavior

#### Lesson 4: Tool Usage (`/learn/tool-usage`)
- What is tool usage — extending LLM capabilities beyond text generation to external systems
- Tool schemas and descriptions — detailed descriptions, strict parameter schemas, output formatting, multi-tool dependencies
- E-commerce tool suite spec — 4 tools (list orders, get details, initiate refund, check shipping)
- Code example — tool execution loop with validation and retry logic
- Real-world use cases — DevOps troubleshooting, financial data agents, travel booking
- Tips — tool descriptions as instructions, strict schemas, standard output formats, ordering dependencies, retry logic

#### Lesson 5: Memory Systems (`/learn/memory-systems`)
- What are memory systems — short-term, episodic, semantic memory paradigms
- Architecture patterns — buffered context window, structured memory (KV/graph), memory consolidation, retrieval strategies
- Customer memory system spec — 3 tiers (short-term buffer, episodic vector store, semantic structured store)
- Code example — three-tier memory system with short-term, episodic, semantic stores
- Real-world use cases — personal AI assistants, medical diagnosis agents, code review agents
- Tips — define what NOT to store, context window budgets, tagging at write time, consolidation frequency, expiration policies

#### Lesson 6: Workflow Design (`/learn/workflow-design`)
- What is workflow design — structured, repeatable task sequences with predefined order
- Core components — steps, transitions, triggers, data schemas, error handlers
- Content publishing workflow spec — 4 steps (draft review, legal check, manager approval, publish) with transitions
- Code example — workflow engine with step execution, conditional transitions, retry logic
- Real-world use cases — software release, customer onboarding, invoice processing
- Tips — atomic steps, deterministic transitions, timeouts per step, inter-step data validation, logging

#### Lesson 7: LLM Pipelines (`/learn/llm-pipelines`)
- What are LLM pipelines — structured sequences of LLM invocations, data transformations, validation stages
- Core components — stage definitions, inter-stage schemas, validation gates, error handlers
- Customer feedback analysis pipeline spec — 4 stages (sentiment extraction, topic tagging, response drafting, compliance check) with model selection per stage
- Code example — multi-stage summarization pipeline with per-stage schema validation and retry logic
- Real-world use cases — legal document review, content moderation, medical report summarization pipelines
- Tips — stage-specific models, strict inter-stage schemas, validation gates between stages, limited retries, fallback paths, per-stage logging

#### Lesson 8: Automation (`/learn/automation`)
- What is automation in AI — event/schedule/condition-driven processes with minimal human intervention
- Automation patterns — event-driven (webhooks), schedule-driven (cron), condition-driven (threshold monitoring), AI-enhanced
- Automated support ticket triage spec — Zendesk webhook trigger, data gathering, AI classification, action execution (tags, priority, spam handling)
- Code example — event-driven automation handler with validation, AI processing (with fallback model), action execution
- Real-world use cases — invoice processing automation, social media monitoring, infrastructure auto-remediation
- Tips — explicit trigger filters, confidence thresholds for AI decisions, idempotency keys, concurrency/rate limits, dead-letter queues, execution metrics monitoring

#### Lesson 9: Orchestration (`/learn/orchestration`)
- What is orchestration — coordinating heterogeneous AI components (agents, workflows, RAG, APIs) across cross-functional processes
- Core components — system registry (capabilities, SLAs), policy engine (routing, access control, priority), shared state manager, execution monitor
- Enterprise AI orchestration spec — 3-system registry (RAG-Policy, Workflow-Refund, Agent-Billing) with routing policies and shared state access rules
- Code examples — simple orchestration engine with policy-based routing + shared state manager with ACL and TTL
- Real-world use cases — enterprise customer journey, DevOps incident response, healthcare patient journey orchestration
- Tips — explicit capability tags, SLA commitments per system, namespaced shared state, test routing edge cases, fallback systems, cross-system metrics

#### Lesson 10: Scaling AI (`/learn/scaling-ai`)
- What is scaling AI — maintaining performance, reliability, cost-efficiency across request volume, task complexity, and data scale
- Scaling patterns — request batching, caching (prompt + semantic), async processing with queues, model distillation and routing
- Scalable document processing spec — 100K docs/month with auto-scaling workers, 2-tier model strategy, embedding/classification caching, context budget, $500/day cost cap
- Code example — scalable embedding pipeline with Redis cache (24h TTL), batched API calls (max 100), rate limiting (3000 req/min)
- Real-world use cases — customer support at scale (500K interactions/month), content moderation (10M posts/day), enterprise search (1M documents)
- Tips — explicit throughput/latency targets, tiered model strategies (60%+ cost savings), cache TTLs based on data freshness, context budget allocations, cost caps with degradation, load simulation testing

---

## Spec Generator

The generator uses **combinatorial template expansion** to produce unique specs. It works by:

1. Loading templates from `baseSpecs.json` with 5 categories
2. Each category has a template with `{role}`, `{task}`, `{tech}`, `{format}` placeholders
3. Variables arrays are cross-producted lazily (capped at user-defined limit, max 1000)
4. Results are cached in a `Map` for performance
5. Output can be copied or downloaded as JSON

### Generator Categories (5)

| Category | Roles | Tasks | Technologies | Formats |
|----------|-------|-------|--------------|---------|
| Backend Engineering | 5 | 7 | 6 | 5 |
| Frontend Engineering | 6 | 7 | 6 | 5 |
| AI Agent Engineering | 6 | 7 | 6 | 5 |
| DevOps Engineering | 6 | 7 | 6 | 5 |
| Database Engineering | 6 | 7 | 6 | 5 |

**Maximum possible unique specs per category:** roles × tasks × tech × formats = ~10,000+ per category

---

## Key Features

- **Dark/Light Theme** — Respects system preference, persists to localStorage
- **Responsive Sidebar** — Desktop-only (lg+), auto-highlights active topic
- **Toast Notifications** — Success/error/info toasts with auto-dismiss (2.5s)
- **Search & Filter** — Generator page supports text search across generated specs
- **Pagination** — Loads 100 specs at a time with "Load More" button
- **Copy & Download** — Individual spec copy or bulk JSON export
- **Lesson Navigation** — Prev/Next topic links at bottom of every lesson page
- **Shimmer Animations** — Gradient shimmer on hero, fade-in/slide-up animations

---

## Design System

### CSS Variables (Dark Theme Default)
- `--background`: #050505
- `--accent`: #a3e635 (lime green)
- `--text-primary`: #fafafa
- `--text-secondary`: #a1a1aa
- `--surface`: #0a0a0a, raised: #111111, overlay: #161616
- `--border`: #1f1f1f, hover: #2a2a2a

### Light Theme
- Accent shifts to #4d7c0f (dark green)
- Background: #ffffff, surfaces: #f8f8f8 → #e8e8e8

### Animations
- `fade-in` — opacity 0→1, translateY(8px)→0
- `slide-up` — opacity 0→1, translateY(16px)→0
- `toast-in` — bottom-up slide with scale
- `shimmer` — horizontal gradient sweep

---

## NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Missing Pages (Defined in Sidebar but Not Implemented)

The following 20 topics are listed in `sidebar-links.ts` but have no `page.tsx` files:

**Domain-Based Specs:**
- `/learn/backend-specs`
- `/learn/frontend-specs`
- `/learn/devops-specs`
- `/learn/database-specs`
- `/learn/api-specs`
- `/learn/resume-specs`
- `/learn/testing-specs`
- `/learn/security-specs`
- `/learn/analytics-specs`
- `/learn/mobile-specs`

**Advanced + Real World:**
- `/learn/production-systems`
- `/learn/scaling-prompts`
- `/learn/cost-optimization`
- `/learn/latency-handling`
- `/learn/monitoring`
- `/learn/logging`
- `/learn/versioning`
- `/learn/prompt-version-control`
- `/learn/case-studies`
- `/learn/enterprise-usage`

---

## File Count Summary

| Type | Count |
|------|-------|
| Page files (page.tsx) | 36 |
| Components | 8 |
| Data files | 2 (1 JSON, 1 TS) |
| Library files | 1 |
| Config files | 5 |
| CSS files | 1 |
| **Total source files** | **53** |
