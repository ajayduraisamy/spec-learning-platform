import TopicLayout from "@/components/TopicLayout";

export default function AnalyticsSpecsPage() {
  return (
    <TopicLayout
      section="Domain-Based Specs"
      lessonNumber="Lesson 19"
      title="Analytics Specs"
      currentHref="/learn/analytics-specs"
    >
      <section>
        <h2 className="text-xl font-semibold">What Are Analytics Specs?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Analytics specs are structured prompts designed to generate event tracking schemas, data pipeline configurations, dashboard definitions, metric calculations, A/B test frameworks, and data warehouse models. They bring precision to analytics implementation, ensuring that tracked events are consistent, metrics are calculated correctly, dashboards are actionable, and data quality is maintained across the entire analytics stack.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Analytics implementation is often treated as an afterthought, with tracking code added haphazardly and metrics defined ad-hoc. This leads to inconsistent event naming, missing context properties, incorrect metric calculations, and dashboards that cannot answer the business questions they were designed for. Analytics specs address these problems by defining the tracking schema, event taxonomy, metric definitions, and dashboard requirements before any implementation begins.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The spec-driven approach to analytics ensures that every tracked event has a clear purpose, a defined schema, and a known consumer. When a new event is proposed, the spec requires answers to: what business question does this event answer? who will use this data? what decisions will be informed by it? This prevents tracking bloat—the accumulation of unused events that increase data storage costs and complicate analysis.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Analytics specs are particularly important for organizations that need to comply with privacy regulations (GDPR, CCPA, COPPA). A privacy-aware analytics spec explicitly defines which data can be collected, which data must be anonymized, user consent requirements, data retention periods, and data deletion procedures. This ensures that analytics implementation does not violate privacy laws or user trust.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Components of an Analytics Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          An analytics spec must address six critical dimensions. The event taxonomy defines the naming convention for events (verb-noun format: "page_view", "button_click", "form_submit"), the hierarchy of event categories (user events, content events, commerce events), and the standard properties that accompany every event (user_id, session_id, timestamp, page_url, device_type). Consistent naming enables reliable querying and prevents duplicate events with slightly different names.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Event schema definitions specify the exact properties for each event type, their data types, required vs. optional status, and allowed values for enum properties. For example, a "purchase_completed" event might require: transaction_id (string), amount (number, 2 decimal places), currency (enum: USD, EUR, GBP), item_count (integer), and items (array of product objects containing product_id, name, category, price, quantity). This schema ensures that every purchase event has the data needed for revenue analysis.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Metric definitions specify how business metrics are calculated from raw events. A metric spec defines the numerator, denominator, filters, time window, and aggregation method. For example, "conversion_rate" = (number of "purchase_completed" events / number of "session_started" events) * 100, filtered to exclude internal IPs, calculated daily, aggregated by traffic source. This definition ensures everyone in the organization calculates the metric the same way.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Dashboard requirements define the audience (executives, product managers, engineers), the key questions the dashboard must answer, the visualizations needed (time series, bar charts, funnel charts, cohort tables), the refresh frequency (real-time, hourly, daily), and the alerting thresholds (conversion rate drops below 2%, daily active users decline by 10% week-over-week). A dashboard spec ensures that the resulting visualization is actionable, not just decorative.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Analytics Spec Example — E-Commerce Event Tracking
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior analytics engineer specializing in e-commerce tracking schemas and conversion funnel analysis.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Design the event tracking schema for an e-commerce platform's conversion funnel.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Platform: Segment + Snowflake + Looker. Events: session_started, page_viewed, product_viewed, add_to_cart, cart_viewed, checkout_started, payment_info_entered, purchase_completed, purchase_failed. Common properties: user_id (nullable for anonymous), session_id (UUID), timestamp (ISO8601), page_url, referrer, device_type (mobile, tablet, desktop), browser, os. Privacy: IP anonymization (last octet zeroed), no PII in event properties, consent flag (true/false) on every event.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Event schema definitions (JSON Schema for each event type), tracking implementation code (JavaScript snippet for each event with property extraction), metric definitions (conversion_rate, average_order_value, cart_abandonment_rate, revenue_per_session), funnel visualization config (6-step funnel from session_started to purchase_completed with drop-off percentages), dashboard spec (executive dashboard: daily revenue, conversion rate, AOV, top products; product dashboard: funnel drop-off points, search-to-view rate, view-to-cart rate).
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The analytics spec produces a complete tracking implementation that captures the full customer journey from session start to purchase completion. Each event in the funnel is defined with its specific properties: product_viewed includes product_id, category, price, and position in search results; add_to_cart includes product_id, quantity, and cart_total; purchase_completed includes transaction_id, amount, currency, item_count, and items array.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The privacy controls are built into every event: IP addresses are anonymized before leaving the client (last octet zeroed), no personally identifiable information is included in event properties, and every event carries a consent flag that indicates whether the user has consented to tracking. Events from users who have not consented are either not sent or sent with minimal properties (only session_id and timestamp for aggregate counting).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The metric definitions ensure consistent calculation across the organization. Conversion rate is defined precisely: the number of purchase_completed events divided by session_started events, filtered to exclude internal IPs and test sessions, calculated on a daily basis, and segmented by traffic source. This definition prevents the common problem where different teams report different conversion rates because they use different formulas or filters.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 2: A/B Testing Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A/B testing requires careful experimental design to produce statistically valid results. An A/B testing spec defines the hypothesis, success metrics, sample size, duration, and analysis methodology.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              A/B Test Spec Example — Checkout Flow Optimization
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Design an A/B test for a simplified checkout flow (1-page vs. current 3-page).
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Hypothesis: Reducing checkout from 3 pages to 1 page will increase conversion rate by reducing friction. Primary metric: checkout completion rate (purchase_completed / checkout_started). Secondary metrics: average order value, time to complete checkout, payment error rate, mobile conversion rate. Sample size: 50,000 users per variant (calculated for 80% power, 5% significance level, detecting 5% relative improvement). Duration: 14 days minimum (covers 2 full weekly cycles). Randomization: user_id hash modulo 2. Exclusion: users who have purchased in the last 30 days (existing behavior differs). Analysis: frequentist hypothesis testing (two-proportion z-test), check for novelty effect (exclude first 3 days), segment analysis by device type and traffic source.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Experiment configuration (assignment logic, variant definitions, feature flag setup), event tracking additions (experiment_id and variant properties added to all checkout events), analysis plan (SQL queries for primary and secondary metrics, z-test calculation, confidence interval computation), decision framework (if p {'<'} 0.05 and improvement {'>'} 2%, ship variant; if p {'>='} 0.05, run for 7 more days; if statistically significant negative impact, stop early). Include guardrail metrics: site-wide conversion rate (ensure experiment doesn't affect non-checkout pages), error rate (ensure simplified flow doesn't increase payment errors).
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          This A/B testing spec addresses the common pitfalls of experimentation: insufficient sample size (solved by power analysis), novelty effects (solved by excluding the first 3 days), seasonality (solved by running for at least 2 weekly cycles), and peeking (solved by pre-defining the decision framework and duration). The guardrail metrics ensure that optimizing for checkout completion does not negatively impact other parts of the business.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Bad vs. Good: Analytics Specs</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Poor analytics implementation leads to data that cannot answer business questions. Good analytics implementation produces reliable, actionable insights.
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Event Tracking
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Track when users click the buy button"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No event name convention, no properties tracked, no user identification, no session context. Data is useless for analysis: you know a button was clicked but not by whom, for which product, or in what context.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Event: button_clicked. Properties: button_name ('buy_now'), product_id, product_name, category, price, currency, page_url, position_on_page, user_id, session_id, timestamp, device_type. Context: user must be logged in (anonymous clicks tracked separately with session_id only). Fire on: click event, not page load. Debounce: 1 second (prevent double-counting from rapid clicks).
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Complete context: who, what, where, when, which product, at what price.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Dashboard Design
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Create a sales dashboard"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Random collection of charts: total revenue, number of orders, top products, revenue by region. No time comparison, no trend analysis, no actionable insights, no alerting. A vanity dashboard, not a decision-making tool.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Dashboard: "Daily Sales Performance". Audience: VP of Sales. KPIs: revenue (today vs. yesterday vs. same day last week), conversion rate (trend, 7-day rolling average), AOV (trend), top 10 products by revenue (with % change). Visualizations: revenue time series (30 days, with trend line), conversion funnel (session to purchase), cohort retention table (by signup month). Alerts: revenue {'<'} 80% of 7-day average, conversion rate drop {'>'} 15% day-over-day. Refresh: every 15 minutes.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Audience-specific, actionable, with trends, comparisons, and alerting thresholds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A subscription-based SaaS company used analytics specs to redesign their entire tracking infrastructure. They created specs for: user lifecycle events (signup, activation, engagement, churn), feature adoption tracking (which features are used, how often, by which user segment), revenue metrics (MRR, ARR, expansion revenue, contraction revenue, churn revenue), and cohort analysis (retention by signup month, feature adoption by cohort, revenue growth by cohort). The spec-driven approach eliminated 60% of redundant events, fixed inconsistent metric calculations that had caused disagreements between the product and finance teams, and produced dashboards that directly informed their product roadmap decisions. Within 6 months, they reduced churn by 15% by identifying the specific features that correlated with long-term retention.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A media company used analytics specs to implement GDPR-compliant analytics for their 50M monthly visitors. Specs defined: consent-based tracking (no events collected without explicit consent, except essential analytics), data minimization (only collect events needed for business decisions, no behavioral profiling), data retention (raw events deleted after 13 months, aggregated metrics retained indefinitely), and user data deletion (upon request, all events associated with a user_id are deleted within 30 days). The spec-driven approach ensured that their analytics implementation was compliant with GDPR's data minimization and right-to-erasure requirements, and they passed their annual privacy audit with zero findings.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Analytics Specs</h2>
        <div className="mt-4 space-y-3">
          {[
            "Define the business question before defining the event. Every tracked event should answer a specific business question. If you cannot articulate the question, you do not need the event.",
            "Use a consistent naming convention for events and properties. verb_noun format for events (page_view, button_click), snake_case for properties (user_id, product_name). Consistency enables reliable querying.",
            "Include context properties on every event: user_id, session_id, timestamp, page_url, device_type. These enable segmentation, funnel analysis, and cross-event correlation.",
            "Define metric calculations explicitly. Specify numerator, denominator, filters, time window, and aggregation method. Prevents the 'different teams, different numbers' problem.",
            "Build privacy into the spec, not as an afterthought. Define data minimization rules, anonymization requirements, consent handling, and deletion procedures upfront.",
            "Design dashboards for decisions, not decoration. Each visualization should answer a specific question that leads to an actionable decision. If a chart does not drive action, remove it.",
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
