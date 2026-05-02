import TopicLayout from "@/components/TopicLayout";

export default function DatabaseSpecsPage() {
  return (
    <TopicLayout
      section="Domain-Based Specs"
      lessonNumber="Lesson 14"
      title="Database Specs"
      currentHref="/learn/database-specs"
    >
      <section>
        <h2 className="text-xl font-semibold">What Are Database Specs?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Database specs are structured prompts designed to generate schema definitions, migration scripts, query optimizations, index strategies, stored procedures, data modeling decisions, and database administration configurations. They apply spec engineering discipline to data architecture, where design decisions have long-lasting consequences for performance, scalability, and data integrity.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Database design is one of the hardest aspects of software engineering to get right. A poorly designed schema leads to data redundancy, update anomalies, and query performance degradation that becomes increasingly expensive to fix as data volume grows. Database specs force explicit consideration of normalization levels, indexing strategies, constraints, data types, and access patterns before any DDL is executed.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The spec approach is particularly powerful for database migrations, where the order of operations, data transformation logic, and rollback procedures must be precisely defined. A migration spec specifies the current schema state, the target schema state, the transformation steps (including data backfilling for existing records), and the rollback path if the migration fails partway through.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Database specs also address the often-overlooked operational aspects: backup strategies, replication configurations, connection pooling settings, query performance thresholds, and data retention policies. These operational specifications ensure that the database not only stores data correctly but also performs reliably under production load.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Components of a Database Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A database spec must address six critical dimensions. The database engine and version specification (PostgreSQL 16, MySQL 8.0, MongoDB 7, DynamoDB) determines available features, data types, indexing options, and SQL dialect. A spec targeting the wrong version will generate syntax errors or miss optimization opportunities available in newer versions.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Schema design defines tables/collections, columns/fields, data types with explicit sizes, primary and foreign keys, unique constraints, check constraints, default values, and NOT NULL requirements. The spec should specify the normalization level (3NF for transactional systems, denormalized for analytical workloads) and the rationale for any deliberate denormalization (read performance optimization).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Index strategy is critical for query performance. Database specs must define which columns need indexes, the index type (B-tree for equality and range queries, hash for exact matches, GIN for full-text search, partial indexes for filtered subsets), and the expected query patterns that each index supports. Over-indexing slows writes; under-indexing slows reads. The spec balances these concerns.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Access patterns and query definitions specify the operations the database must support efficiently: the SELECT queries with their WHERE clauses and JOIN conditions, the INSERT/UPDATE/DELETE operations, the aggregation queries, and the expected response time for each. A database optimized for OLTP (online transaction processing) has different requirements than one optimized for OLAP (online analytical processing).
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Database Spec Example — E-Commerce Schema
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior database architect specializing in PostgreSQL schema design for high-traffic e-commerce systems.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Design the core schema for an e-commerce platform: users, products, orders, order_items, inventory, and reviews.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Engine: PostgreSQL 16. Normalization: 3NF for transactional tables. Users: id (UUID PK), email (unique, citext), password_hash, created_at. Products: id (UUID PK), name (varchar 200), description (text), price (numeric 10,2 NOT NULL CHECK {'>'} 0), category_id (FK), stock_quantity (int CHECK {'>='} 0). Orders: id (UUID PK), user_id (FK), status (enum: pending, confirmed, shipped, delivered, cancelled), total_amount (numeric 10,2), created_at, updated_at. Soft deletes: use deleted_at timestamp, not DELETE. Audit: created_at, updated_at on all tables via triggers.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: SQL migration file with CREATE TABLE statements, indexes, constraints, enums, and audit triggers. Include: B-tree index on users.email, products.category_id, orders.user_id + created_at, orders.status. Composite index on order_items (order_id, product_id). Generated column for order total. Include EXPLAIN ANALYZE for the top 5 query patterns with expected row counts.
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The e-commerce schema spec produces a normalized database design with proper referential integrity. The UUID primary keys prevent ID enumeration attacks (unlike auto-increment integers) and enable horizontal sharding if needed in the future. The citext type for email ensures case-insensitive comparison without requiring LOWER() function calls on every query.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The CHECK constraints enforce business rules at the database level: price must be positive, stock quantity cannot be negative. These constraints catch invalid data before it reaches the application layer, providing a final safety net even if application validation fails. The enum type for order status prevents invalid status values and enables efficient filtering.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The index strategy is carefully designed to support the most common query patterns: looking up users by email (login), finding products by category (browsing), retrieving a user's order history (orders.user_id + created_at composite index), and filtering orders by status (admin dashboard). The composite index on order_items supports the frequent JOIN between orders and their line items. Each index is justified by a specific query pattern in the EXPLAIN ANALYZE section.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 2: Migration Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Database migrations require careful planning to avoid data loss and downtime. A migration spec defines the transformation from the current schema to the target schema with all intermediate steps.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Migration Spec Example — Split Name Column
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Split users.full_name into users.first_name and users.last_name columns.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Current: users table has full_name (varchar 200, NOT NULL). Target: first_name (varchar 100, NOT NULL), last_name (varchar 100, NOT NULL). Strategy: expand-then-contract. Step 1: Add first_name and last_name as nullable. Step 2: Backfill from full_name (split on last space; if no space, first_name = full_name, last_name = ''). Step 3: Add NOT NULL constraints. Step 4: Drop full_name column. Lock time target: {'<'} 30 seconds for each ALTER TABLE. For table with 10M+ rows: backfill in batches of 10,000 with 100ms sleep between batches.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Migration file with up() and down() functions. up(): execute Steps 1-4. down(): Add full_name back, concatenate first_name + ' ' + last_name, drop first_name/last_name. Include batched backfill function with progress logging (every 100,000 rows). Include verification query: count rows where full_name {'!='} first_name {'||'} ' ' {'||'} last_name.
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          This migration spec uses the expand-then-contract pattern, which is the safest approach for schema changes on live databases. New columns are added first (expanding the schema), data is backfilled while both old and new columns exist, constraints are applied once all data is valid, and finally the old column is removed (contracting). This approach allows the application to be deployed before or after the migration without breaking.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Bad vs. Good: Database Specs</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Database design decisions are expensive to reverse. A good spec prevents costly mistakes before they happen.
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: User-Product Relationship
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Create a users table and a products table"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No relationships, no constraints, no indexes, no data types specified. Uses INT for IDs (enumerable), TEXT for everything (no validation), no timestamps.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Users: UUID PK, email (unique, citext, NOT NULL), password_hash (varchar 255, NOT NULL), role (enum: customer, admin, vendor), created_at (timestamptz), updated_at. Products: UUID PK, name (varchar 200, NOT NULL), price (numeric 10,2 CHECK {'>'} 0), category_id (FK to categories), stock (int CHECK {'>='} 0), created_at. Indexes: users.email (unique), products.category_id, products.price (for range queries).
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Proper types, constraints, indexes, and audit fields all specified.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Query Optimization
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Optimize this slow query"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No table schema provided, no EXPLAIN plan, no data volume context, no index information. The LLM cannot diagnose the problem.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Query: SELECT o.* FROM orders o JOIN users u ON o.user_id = u.id WHERE u.email = {'?'} ORDER BY o.created_at DESC LIMIT 20. Schema: orders (10M rows, index on user_id), users (1M rows, unique index on email). EXPLAIN shows sequential scan on orders (cost: 50000). Target: {'<'} 50ms. Provide: index recommendation, query rewrite if needed, EXPLAIN ANALYZE comparison.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Full context: query, schema, data volume, current plan, and performance target.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A logistics company used database specs to redesign their shipment tracking system. The existing schema used a single shipments table with 50+ columns and 200M rows, causing query times to exceed 30 seconds. The spec defined a partitioned schema: shipments partitioned by month (using PostgreSQL declarative partitioning), with frequently queried columns (tracking_number, status, current_location) in the parent table and infrequently accessed columns (full_address_history, customs_details) in a separate extension table. The spec also defined materialized views for dashboard queries (daily shipment volume, on-time delivery rate by region) that refreshed hourly. After migration, dashboard queries dropped from 30 seconds to under 200 milliseconds.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A social media startup used database specs for their activity feed system. The spec defined a denormalized feed_items table optimized for append-heavy workloads (INSERT rate: 10,000/second, read rate: 100,000/second). The spec specified: append-only design (no UPDATE/DELETE on feed_items), time-series partitioning by day, pre-computed user feed snapshots (materialized per user with 100 most recent items), and a fan-out-on-write strategy where each post is asynchronously distributed to followers' feed tables. The spec also defined the data retention policy: raw feed items archived to cold storage after 30 days, user feed snapshots retained for 7 days.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Database Specs</h2>
        <div className="mt-4 space-y-3">
          {[
            "Always specify data types with explicit sizes. VARCHAR(200) is better than TEXT for columns with known maximum lengths—it provides documentation and enables storage optimizations.",
            "Define constraints at the database level, not just in application code. Database constraints are the last line of defense against corrupt data and work regardless of which application accesses the database.",
            "Design indexes based on actual query patterns, not theoretical possibilities. Every index slows down writes. Only create indexes that support specific, frequently executed queries.",
            "Use the expand-then-contract pattern for migrations. Add new columns first, backfill data, then remove old columns. This allows zero-downtime deployments.",
            "Specify soft deletes for critical data. Use deleted_at timestamps instead of DELETE to enable data recovery, audit trails, and cascade-aware deletions.",
            "Include data retention and archival policies in every schema spec. Define how long data is kept, when it is archived, and when it is permanently deleted.",
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
