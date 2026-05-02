"use client";

import { useState } from "react";
import Link from "next/link";

export default function PlaygroundPage() {
  const [spec, setSpec] = useState("");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRunSpec = () => {
    if (!spec.trim()) return;

    setIsLoading(true);
    setOutput(null);

    // Simulate LLM processing delay
    setTimeout(() => {
      const mockOutput = generateMockOutput(spec, context);
      setOutput(mockOutput);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setSpec("");
    setContext("");
    setOutput(null);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] transition-colors group-hover:bg-[var(--accent-text)]">
              <svg
                className="h-5 w-5 text-[var(--background)]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
              Spec<span className="text-[var(--accent)]">Engine</span>
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/learn"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Learn
            </Link>
            <Link
              href="/generator"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Generator
            </Link>
            <Link
              href="/"
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--background)] transition-colors hover:bg-[var(--accent-text)]"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-screen-2xl px-4 sm:px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Spec Playground
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Test your specs with mock AI output. Enter your spec and context below to see how the AI would respond.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Panel */}
          <div className="space-y-4">
            {/* Spec Input */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
              <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                    Spec Input
                  </h2>
                </div>
                <span className="text-xs text-[var(--text-tertiary)]">
                  {spec.length} characters
                </span>
              </div>
              <textarea
                value={spec}
                onChange={(e) => setSpec(e.target.value)}
                placeholder={`// Define your spec here\n// Example:\n// Role: You are a senior React developer\n// Task: Create a responsive navbar component\n// Constraints: Use TypeScript, Tailwind CSS, mobile-first\n// Output: Return only the component code`}
                className="w-full h-64 p-4 bg-[var(--surface-overlay)] text-[var(--text-primary)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 placeholder:text-[var(--text-tertiary)]"
              />
            </div>

            {/* Context Input */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
              <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                    Context
                  </h2>
                </div>
                <span className="text-xs text-[var(--text-tertiary)]">
                  {context.length} characters
                </span>
              </div>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="// Optional: Add context like existing code, API schemas, or project requirements..."
                className="w-full h-40 p-4 bg-[var(--surface-overlay)] text-[var(--text-primary)] font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 placeholder:text-[var(--text-tertiary)]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleRunSpec}
                disabled={!spec.trim() || isLoading}
                className="flex-1 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--background)] transition-all hover:bg-[var(--accent-text)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    </svg>
                    Run Spec
                  </>
                )}
              </button>
              <button
                onClick={handleClear}
                className="rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-raised)] hover:text-[var(--text-primary)] transition-colors"
              >
                Clear
              </button>
            </div>

            {/* Quick Templates */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                Quick Templates
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "API Endpoint", spec: "Role: Senior backend engineer\nTask: Create a REST API endpoint\nConstraints: Express.js, TypeScript, Zod validation\nOutput: Router module with error handling" },
                  { label: "React Component", spec: "Role: Senior React developer\nTask: Create a responsive component\nConstraints: TypeScript, Tailwind CSS, accessibility\nOutput: Component code with props interface" },
                  { label: "Database Schema", spec: "Role: Database architect\nTask: Design a database schema\nConstraints: PostgreSQL, normalized, indexed\nOutput: SQL migration with constraints" },
                  { label: "Test Suite", spec: "Role: QA engineer\nTask: Write unit tests\nConstraints: Jest, TypeScript, Arrange-Act-Assert\nOutput: Test file with happy path and edge cases" },
                ].map((template) => (
                  <button
                    key={template.label}
                    onClick={() => {
                      setSpec(template.spec);
                      setOutput(null);
                    }}
                    className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-raised)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/50 transition-colors"
                  >
                    {template.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden min-h-[500px]">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                  Mock Output
                </h2>
              </div>
              {output && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {copied ? (
                    <>
                      <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full border-4 border-[var(--border)] border-t-[var(--accent)] animate-spin" />
                  </div>
                  <p className="mt-4 text-sm text-[var(--text-secondary)]">
                    Processing your spec...
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                    Analyzing role, task, constraints, and output format
                  </p>
                </div>
              ) : output ? (
                <div className="space-y-4">
                  {/* Spec Analysis */}
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-overlay)] p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-3">
                      Spec Analysis
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {analyzeSpec(spec).map((item) => (
                        <div key={item.label} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                          <div>
                            <p className="text-xs text-[var(--text-tertiary)]">
                              {item.label}
                            </p>
                            <p className="text-sm text-[var(--text-primary)]">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Generated Output */}
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-overlay)] p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-3">
                      Generated Output
                    </h3>
                    <pre className="whitespace-pre-wrap font-mono text-sm text-[var(--text-primary)] leading-relaxed">
                      {output}
                    </pre>
                  </div>

                  {/* Disclaimer */}
                  <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3">
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      This is a mock output for demonstration purposes. Connect to a real LLM API to get actual generated content.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <svg className="h-16 w-16 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <p className="mt-4 text-sm text-[var(--text-secondary)]">
                    Enter a spec and click &quot;Run Spec&quot; to see the mock output
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                    Or use one of the quick templates above
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function analyzeSpec(spec: string) {
  const results = [
    { label: "Role", value: "Not specified" },
    { label: "Task", value: "Not specified" },
    { label: "Constraints", value: "Not specified" },
    { label: "Output Format", value: "Not specified" },
  ];

  const lines = spec.split("\n");
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (lower.startsWith("role") || lower.startsWith("// role") || lower.includes("you are a")) {
      results[0].value = line.replace(/^(role:?\s*|\/\/\s*role\s*[-:]?\s*)/i, "").substring(0, 60);
    }
    if (lower.startsWith("task") || lower.startsWith("// task")) {
      results[1].value = line.replace(/^(task:?\s*|\/\/\s*task\s*[-:]?\s*)/i, "").substring(0, 60);
    }
    if (lower.startsWith("constraint") || lower.startsWith("// constraint")) {
      results[2].value = line.replace(/^(constraints?:?\s*|\/\/\s*constraints?\s*[-:]?\s*)/i, "").substring(0, 60);
    }
    if (lower.startsWith("output") || lower.startsWith("// output")) {
      results[3].value = line.replace(/^(output format:?\s*|\/\/\s*output format\s*[-:]?\s*)/i, "").substring(0, 60);
    }
  }

  return results;
}

function generateMockOutput(spec: string, context: string): string {
  const lowerSpec = spec.toLowerCase();

  if (lowerSpec.includes("api") || lowerSpec.includes("endpoint") || lowerSpec.includes("backend")) {
    return `// Generated API Endpoint\nimport { Router } from "express";\nimport { z } from "zod";\n\nconst router = Router();\n\n// Validation schema\nconst requestSchema = z.object({\n  name: z.string().min(1).max(100),\n  email: z.string().email(),\n});\n\n// POST /api/resource\nrouter.post("/resource", async (req, res) => {\n  try {\n    const data = requestSchema.parse(req.body);\n\n    // Process request\n    const result = await createResource(data);\n\n    return res.status(201).json({\n      success: true,\n      data: result,\n    });\n  } catch (error) {\n    if (error instanceof z.ZodError) {\n      return res.status(400).json({\n        success: false,\n        error: "Validation failed",\n        details: error.errors,\n      });\n    }\n\n    return res.status(500).json({\n      success: false,\n      error: "Internal server error",\n    });\n  }\n});\n\nexport default router;`;
  }

  if (lowerSpec.includes("react") || lowerSpec.includes("component") || lowerSpec.includes("frontend")) {
    return `// Generated React Component\nimport React from "react";\n\ninterface Props {\n  title: string;\n  description?: string;\n  onAction?: () => void;\n}\n\nexport const Card: React.FC<Props> = ({\n  title,\n  description,\n  onAction,\n}) => {\n  return (\n    <div className="rounded-xl border border-gray-200 p-6">\n      <h3 className="text-lg font-semibold">{title}</h3>\n      {description && (\n        <p className="mt-2 text-gray-600">{description}</p>\n      )}\n      {onAction && (\n        <button\n          onClick={onAction}\n          className="mt-4 rounded-lg bg-blue-600 px-4 py-2\n            text-white hover:bg-blue-700"\n        >\n          Action\n        </button>\n      )}\n    </div>\n  );\n};`;
  }

  if (lowerSpec.includes("database") || lowerSpec.includes("schema") || lowerSpec.includes("sql")) {
    return `-- Generated Database Schema\nCREATE TABLE IF NOT EXISTS users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email VARCHAR(255) UNIQUE NOT NULL,\n  name VARCHAR(100) NOT NULL,\n  created_at TIMESTAMPTZ DEFAULT NOW(),\n  updated_at TIMESTAMPTZ DEFAULT NOW()\n);\n\nCREATE TABLE IF NOT EXISTS items (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  user_id UUID NOT NULL REFERENCES users(id),\n  title VARCHAR(200) NOT NULL,\n  status VARCHAR(20) DEFAULT 'active',\n  created_at TIMESTAMPTZ DEFAULT NOW()\n);\n\n-- Indexes\nCREATE INDEX idx_items_user_id ON items(user_id);\nCREATE INDEX idx_items_status ON items(status);`;
  }

  if (lowerSpec.includes("test") || lowerSpec.includes("jest") || lowerSpec.includes("unit")) {
    return `// Generated Test Suite\nimport { describe, it, expect } from "@jest/globals";\nimport { processPayment } from "./payment";\n\ndescribe("processPayment", () => {\n  it("should process valid payment successfully", async () => {\n    const result = await processPayment({\n      orderId: "ord_123",\n      amount: 99.99,\n      currency: "USD",\n    });\n\n    expect(result.status).toBe("success");\n    expect(result.transactionId).toBeDefined();\n  });\n\n  it("should reject invalid amount", async () => {\n    await expect(\n      processPayment({\n        orderId: "ord_123",\n        amount: -10,\n        currency: "USD",\n      })\n    ).rejects.toThrow("Invalid amount");\n  });\n\n  it("should handle gateway timeout", async () => {\n    // Mock gateway timeout\n    await expect(\n      processPayment({\n        orderId: "ord_timeout",\n        amount: 50,\n        currency: "USD",\n      })\n    ).rejects.toThrow("Gateway timeout");\n  });\n});`;
  }

  return `// Generated Output based on your spec\n\n// Spec Analysis:\n// - Role: Detected from your spec\n// - Task: Detected from your spec\n// - Constraints: Applied to generation\n// - Output Format: Followed as specified\n\n// This is a mock response. In a production environment,\n// this would be generated by an LLM based on your spec.\n\n// To get real AI-generated output:\n// 1. Connect to an LLM API (OpenAI, Anthropic, etc.)\n// 2. Send your spec as the system prompt\n// 3. Add context as the user message\n// 4. Receive and display the generated response\n\n// Example integration:\n// const response = await openai.chat.completions.create({\n//   model: "gpt-4o",\n//   messages: [\n//     { role: "system", content: spec },\n//     { role: "user", content: context }\n//   ]\n// });\n\nconsole.log("Spec processed successfully!");`;
}
