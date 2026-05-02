import TopicLayout from "@/components/TopicLayout";

export default function FrontendSpecsPage() {
  return (
    <TopicLayout
      section="Domain-Based Specs"
      lessonNumber="Lesson 12"
      title="Frontend Specs"
      currentHref="/learn/frontend-specs"
    >
      <section>
        <h2 className="text-xl font-semibold">What Are Frontend Specs?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Frontend specs are structured prompts designed to generate UI components, page layouts, state management logic, form handling, API integration, and styling configurations. They apply the spec engineering discipline to the unique challenges of frontend development: responsive design, accessibility, component composition, state synchronization, and cross-browser compatibility.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Frontend development has evolved from simple HTML/CSS/JavaScript to complex component ecosystems with state management, routing, data fetching, and build tooling. A frontend spec must account for this complexity by specifying the framework version, component architecture pattern, styling approach, state management strategy, and accessibility requirements before any code is generated.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The value of frontend specs becomes apparent when building component libraries or design systems. Without specs, different developers create components with inconsistent APIs, styling approaches, and accessibility implementations. With specs, every component follows the same patterns for props interfaces, styling tokens, error boundaries, loading states, and ARIA attributes—creating a cohesive user experience across the entire application.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Frontend specs also address the performance considerations that are unique to the browser environment. Bundle size constraints, lazy loading strategies, image optimization requirements, and critical CSS extraction rules must be specified to ensure generated components do not degrade the user experience with excessive resource loading or render-blocking behavior.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Components of a Frontend Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A frontend spec must address seven critical dimensions. The framework and tooling definition specifies React/Vue/Svelte version, TypeScript configuration, build tool (Vite, Next.js, webpack), and testing framework. This ensures generated code is compatible with the existing project infrastructure.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The component API design defines the props interface with exact types, default values, required vs. optional props, and the component's public interface (what it exposes vs. what it keeps internal). A well-designed props API follows the single responsibility principle and avoids prop drilling by accepting only the data the component directly needs.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Styling and theming requirements specify the CSS approach (Tailwind, CSS Modules, styled-components, CSS-in-JS), design token usage (colors, spacing, typography), responsive breakpoints, and dark mode support. This ensures components integrate seamlessly with the existing design system.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Accessibility requirements are non-negotiable for production frontend code. Frontend specs must specify ARIA attributes, keyboard navigation support, focus management, screen reader compatibility, color contrast ratios (WCAG AA minimum), and semantic HTML element usage. Without explicit accessibility requirements, generated components will fail accessibility audits and exclude users with disabilities.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Frontend Spec Example — Data Table Component
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior React developer specializing in accessible, performant UI components.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Create a reusable DataTable component with sorting, filtering, and pagination.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                React 18 with TypeScript. Props: {`<DataTable<T> columns: Column<T>[], data: T[], loading: boolean, onSort: (column: string, direction: 'asc' | 'desc') => void, onFilter: (filters: FilterMap) => void, onPageChange: (page: number) => void>`}. Styling: Tailwind CSS with design tokens from tailwind.config.js. Responsive: collapse to card layout below 768px. Accessibility: role="table", aria-sort, keyboard navigation for sortable columns, screen reader announcements for sort/filter changes.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Default export DataTable component. Separate Column and Filter interfaces. Loading skeleton state. Empty state message. Error boundary wrapper. Unit tests with React Testing Library covering: rendering, sorting click, filter application, pagination, keyboard navigation, and screen reader output.
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The DataTable spec produces a generic component that works with any data type through TypeScript generics. The Column interface defines how each column renders (cell renderer, header label, sort key, filter type), while the data array provides the actual rows. The component delegates sorting, filtering, and pagination to parent components via callback props, following the controlled component pattern.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The accessibility implementation uses semantic HTML (table, thead, tbody, th with scope, td) rather than div-based layouts. Sortable columns have aria-sort attributes that update when the user clicks, and an aria-live region announces sort changes to screen readers. Keyboard navigation allows users to tab through sortable column headers and activate them with Enter or Space.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The responsive design collapses the table to a card layout below 768px, where each row becomes a card with field labels and values stacked vertically. This ensures usability on mobile devices without horizontal scrolling. The loading state uses a skeleton pattern (animated placeholder rows) rather than a spinner, giving users a clear indication of the expected content structure.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 2: Form Component Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Forms are one of the most complex frontend patterns, involving validation, submission state, error display, and often multi-step workflows. A frontend spec for form generation must address all of these concerns.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Form Spec Example — Multi-Step Registration Form
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Create a 3-step registration form: Personal Info, Account Setup, Preferences.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                React Hook Form + Zod validation. Step 1: firstName, lastName, email (unique check via API debounced 500ms), phone. Step 2: password (strength meter: min 8, upper, lower, number, special), confirmPassword, TOS checkbox. Step 3: notification preferences (email, SMS, push), timezone select, language select. State: persist form data to sessionStorage on each field change, restore on page reload. Submission: disable submit button during API call, show loading indicator, handle 409 (duplicate email) with inline error, redirect to /dashboard on 200.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: FormWizard component with StepIndicator. Each step as a separate component file. Zod schemas per step. Custom hook useFormWizard for state management. Error display: inline field errors + step-level error banner. Accessibility: aria-current="step" on active step indicator, focus trap within each step, error announcements via aria-live.
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          This form spec addresses the full lifecycle of a multi-step form: input validation with Zod schemas tailored to each step's fields, API integration with debounced email uniqueness checking, state persistence to sessionStorage (so users don't lose progress on accidental refresh), and comprehensive error handling for both validation failures and API errors.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Bad vs. Good: Frontend Specs</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The gap between a generic frontend prompt and a proper frontend spec is the gap between a component that looks right and a component that works right for all users.
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Modal Dialog
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Create a modal popup component"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No focus trap, no escape key handling, no backdrop click, no ARIA attributes, no animation, no z-index management. Inaccessible and buggy.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Modal: role="dialog", aria-modal="true", aria-labelledby=titleId. Focus trap (tab cycles within modal), Escape closes, backdrop click closes. Animation: fade-in 150ms, scale-up from 0.95. Z-index: 1000 (configurable via theme). Portal to document.body. Props: isOpen, onClose, title, children, size (sm | md | lg | full). Return focus to trigger element on close.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Accessibility, keyboard, animation, focus management, and API all specified.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Infinite Scroll List
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Make an infinite scroll list"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No virtualization (renders all items), no debouncing (fires on every scroll event), no loading state, no error recovery, no end-of-list detection.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  InfiniteList: IntersectionObserver-based (scroll threshold 200px from bottom), virtualized with react-window (render only visible + 5 buffer items). Props: {`items: T[], renderItem: (item: T) => ReactNode, onLoadMore: () => Promise<{items, hasNextPage}>, loading: boolean, error: string | null`}. Skeleton items during load. Retry button on error. "No more items" message at end.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Performance (virtualization), UX (loading/error/empty states), and API design all specified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A healthcare company used frontend specs to build their patient portal component library. They created 15 specs covering: data tables with HIPAA-compliant data masking, medication lists with interaction warning badges, appointment scheduling forms with timezone handling, lab results viewers with chart visualizations, and secure messaging components with encryption indicators. Each spec explicitly defined WCAG 2.1 AA compliance requirements, ensuring the portal was accessible to patients with disabilities. The spec-driven approach allowed their team of 6 frontend developers to work in parallel without creating inconsistent or inaccessible components.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          An EdTech platform used frontend specs for their interactive quiz system. Specs defined: question rendering (multiple choice, drag-and-drop, fill-in-blank, code editor), timer components with visual countdown warnings, progress indicators, submission confirmation dialogs, and results dashboards with performance analytics. Each spec included keyboard navigation requirements, screen reader support for question content, and focus management between question transitions. The resulting components achieved a 100% Lighthouse accessibility score across all quiz types.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Frontend Specs</h2>
        <div className="mt-4 space-y-3">
          {[
            "Always specify accessibility requirements. Include ARIA attributes, keyboard navigation, focus management, and screen reader support. Accessibility is not optional—it is a legal and ethical requirement.",
            "Define the component's public API before implementation. What props does it accept? What events does it emit? What is its return type? A well-designed API makes the component reusable.",
            "Include loading, error, and empty states. Every data-fetching component needs all three. A component that only handles the happy path is incomplete.",
            "Specify responsive behavior explicitly. How does the component adapt to mobile, tablet, and desktop? Does it collapse, hide elements, or change layout?",
            "Include performance constraints. Virtualize long lists, lazy load images, memoize expensive computations, and debounce user input handlers.",
            "Write tests as part of the spec output. Specify which interactions to test: rendering, user events, state changes, error scenarios, and accessibility assertions.",
          ].map((tip, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </section>
    </TopicLayout>
  );
}
