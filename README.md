
<p align="center">
  <h1 align="center">Spec Engineering Platform</h1>
  <p align="center">A modern open-source platform to learn, generate, and apply structured AI specifications.</p>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-modules">Modules</a> •
  <a href="#-learning-structure">Learning</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-contribution">Contribute</a> •
  <a href="#-license">License</a>
</p>

---

## 📖 Overview

**Spec Engineering** is the discipline of writing precise, structured, and repeatable specifications that guide AI systems to produce consistent, high-quality outputs. As LLMs become central to software development, the ability to craft well-structured specs is no longer optional — it's a core engineering skill.

This platform solves three critical problems:

- **Learning Gap** — Most developers learn prompting through trial and error. This platform provides a structured curriculum with 50+ topics, examples, and best practices.
- **Spec Generation** — Writing specs from scratch is time-consuming. The built-in combinatorial engine generates hundreds of spec variations from reusable templates.
- **Practical Application** — The interactive Playground lets users experiment with specs, context, and expected outputs in a safe, mock environment.

---

## 🚀 Features

- **50+ Structured Learning Topics** — Comprehensive curriculum covering foundations to advanced enterprise patterns
- **Spec Generator** — Combinatorial engine that produces hundreds of spec variations from base templates
- **Template System** — Pre-built spec templates for common AI use cases, ready to customize
- **Interactive Playground** — Experiment with specs, add context, and simulate AI outputs in real-time
- **Dark/Light Mode** — Seamless theme switching with system preference detection
- **Copy & Download** — One-click copy to clipboard and spec download as `.txt` files

---

## 🧩 Modules

### 📚 Learn
A structured curriculum with 50+ topics organized into 5 progressive levels. Each lesson follows a consistent format: introduction, core concepts, practical examples, bad vs good comparisons, real-world applications, and actionable tips.

### ⚡ Generator
A combinatorial spec engine powered by `baseSpecs.json`. It lazily expands template variables using a Cartesian product algorithm, generating unique, production-ready specs on demand with early-exit optimization and in-memory caching.

### 📋 Templates
A curated collection of pre-built spec templates covering common AI interaction patterns. Users can browse, preview, copy, and download templates instantly.

### 🎮 Playground
An interactive sandbox where users write specs, provide context inputs, and simulate AI outputs. Includes quick-start templates and real-time spec analysis for rapid experimentation.

### 🤝 Contribute
An open contribution page where users can submit new topics, suggest improvements, or report issues. Built-in form validation and toast notifications for a smooth contributor experience.

---

## 🧠 Learning Structure

### 🔰 Foundations
The building blocks of spec engineering. Covers introduction, basics, structure, roles, tasks, constraints, output formats, templates, examples, and common mistakes.

### 🛠️ Core Engineering
Deep-dive into advanced techniques. Includes context engineering, spec vs context boundaries, prompt patterns, chaining, debugging, optimization, evaluation, best practices, prompt tuning, and error handling.

### 🤖 AI Systems
Building intelligent systems with specs. Covers AI agents, multi-agent systems, RAG basics, tool usage, memory systems, workflow design, LLM pipelines, automation, orchestration, and scaling AI.

### 🌐 Domain-Based Specs
Applying specs to real-world domains. Includes backend, frontend, DevOps, database, API, resume, testing, security, analytics, and mobile specifications.

### 🏗️ Advanced Topics
Production-grade patterns and enterprise usage. Covers production systems, scaling prompts, cost optimization, latency handling, monitoring, logging, versioning, prompt version control, case studies, and enterprise usage.

---

## ⚙️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | App Router, SSR/SSG, routing |
| **React 19** | UI components, state management |
| **TypeScript** | Type safety, developer experience |
| **Tailwind CSS v4** | Utility-first styling, dark mode |

---

## 📁 Project Structure

```
spec-learning-platform/
├── src/
│   ├── app/
│   │   ├── learn/              # 50+ lesson pages
│   │   │   ├── introduction/
│   │   │   ├── basics/
│   │   │   ├── structure/
│   │   │   ├── ...             # All 50 topics
│   │   ├── generator/          # Spec Generator module
│   │   ├── templates/          # Template browser
│   │   ├── playground/         # Interactive sandbox
│   │   ├── contribute/         # Contribution page
│   │   ├── layout.tsx          # Root layout + metadata
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Global styles + theme vars
│   ├── components/
│   │   ├── Navbar.tsx          # Top navigation
│   │   ├── Sidebar.tsx         # Curriculum sidebar
│   │   ├── TopicLayout.tsx     # Lesson page wrapper
│   │   ├── ThemeProvider.tsx   # Dark/light theme
│   │   ├── ToastProvider.tsx   # Toast notifications
│   │   └── ThemeToggle.tsx     # Theme switcher
│   ├── data/
│   │   ├── sidebar-links.ts    # Curriculum structure
│   │   └── baseSpecs.json      # Generator templates
│   └── lib/
│       └── generator.ts        # Combinatorial engine
├── public/                     # Static assets
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/ajayduraisamy/spec-learning-platform.git
cd spec-learning-platform

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Contribution

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create a branch** for your feature (`git checkout -b feature/amazing-feature`)
3. **Make your changes** — add topics, improve templates, fix bugs
4. **Test locally** — run `npm run dev` and verify your changes
5. **Commit** your changes (`git commit -m 'Add amazing feature'`)
6. **Push** to your branch (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

Whether it's a typo fix, a new lesson, or a feature enhancement — every contribution matters.

---

## 🔮 Future Scope

- **AI Integration** — Connect to real LLM APIs for live spec testing in the Playground
- **API System** — Expose the generator as a REST API for programmatic spec creation
- **User Dashboard** — Personal accounts with saved specs, favorites, and progress tracking
- **Community Specs** — User-submitted spec marketplace with ratings and reviews
- **Export Formats** — Support for JSON, YAML, and Markdown spec exports
- **Analytics** — Track usage patterns and popular spec templates

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  ⭐ If you find this project useful, please consider starring it!
</p>


<p align="center">
  Built with Next.js, React, and a lot of ☕
</p>


