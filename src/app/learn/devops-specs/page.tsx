import TopicLayout from "@/components/TopicLayout";

export default function DevOpsSpecsPage() {
  return (
    <TopicLayout
      section="Domain-Based Specs"
      lessonNumber="Lesson 13"
      title="DevOps Specs"
      currentHref="/learn/devops-specs"
    >
      <section>
        <h2 className="text-xl font-semibold">What Are DevOps Specs?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          DevOps specs are structured prompts designed to generate CI/CD pipeline configurations, infrastructure as code (IaC), deployment scripts, monitoring setups, container configurations, and automation workflows. They bring the discipline of spec engineering to the operational side of software development, where mistakes can cause outages, data loss, or security breaches.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          DevOps configurations are notoriously complex. A single deployment pipeline may involve building Docker images, running tests, scanning for vulnerabilities, pushing to registries, provisioning infrastructure, executing database migrations, deploying containers, running health checks, and configuring traffic routing. A spec that addresses each of these steps explicitly produces reliable, auditable infrastructure code.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The stakes in DevOps are higher than in application code because failures affect the entire system, not just a single feature. A misconfigured firewall rule can expose internal services. A broken health check can cause unnecessary failovers. An incorrect rollback script can destroy data. DevOps specs mitigate these risks by requiring explicit definitions of every operational parameter.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          DevOps specs are particularly valuable for teams adopting Infrastructure as Code. When every infrastructure resource—VPCs, load balancers, databases, Kubernetes deployments, CloudFront distributions—is defined through specs, the resulting configurations are consistent, version-controlled, and reviewable through pull requests. This eliminates configuration drift and makes infrastructure changes predictable and reversible.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Components of a DevOps Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A DevOps spec must address six critical dimensions. The platform and tool definition specifies the target environment (AWS, GCP, Azure, on-premise), orchestration system (Kubernetes, ECS, Docker Compose), CI/CD platform (GitHub Actions, GitLab CI, Jenkins), and IaC tool (Terraform, Pulumi, CloudFormation). This ensures generated configurations are compatible with the existing infrastructure.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Security requirements in DevOps specs are paramount. They define network isolation (private subnets, security groups, NACLs), secret management (AWS Secrets Manager, HashiCorp Vault, Kubernetes secrets), least-privilege IAM policies, container image scanning, and compliance certifications (SOC 2, HIPAA, PCI-DSS). A DevOps spec without security requirements will produce configurations that pass tests but fail audits.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Deployment strategy defines how new versions are released: blue-green, canary, rolling update, or recreate. Each strategy has different requirements for load balancer configuration, health check endpoints, rollback triggers, and traffic shifting. The spec must specify the strategy, the health check path and response criteria, the rollout percentage increments (for canary), and the automatic rollback conditions.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Monitoring and alerting requirements ensure the deployed system is observable. DevOps specs define the metrics to collect (CPU, memory, request rate, error rate, latency percentiles), the logging format and destination (structured JSON logs to CloudWatch/ELK), the alerting thresholds (error rate {'>'} 1% for 5 minutes triggers PagerDuty), and the dashboard configuration (Grafana panels for key metrics).
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              DevOps Spec Example — CI/CD Pipeline
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior DevOps engineer specializing in secure, automated deployment pipelines.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Create a GitHub Actions CI/CD pipeline for a Node.js microservice deployed to EKS.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                CI: On push to main, run lint (ESLint), test (Jest with 80% coverage threshold), build (Docker multi-stage build), scan (Trivy for CVEs, fail on HIGH+), push to ECR (tag with SHA + 'latest'). CD: On push to production branch, deploy to EKS with rolling update (max surge 25%, max unavailable 0). Health check: GET /healthz returns 200 within 5s. Rollback: if error rate {'>'} 2% for 3 minutes, auto-rollback to previous image. Notify Slack on deploy start/success/failure.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: .github/workflows/ci-cd.yml with separate jobs for CI and CD. Dockerfile with multi-stage build (builder + runtime). Kubernetes deployment manifest with resource limits (CPU: 500m, Memory: 512Mi), readiness/liveness probes, pod disruption budget (minAvailable: 1). Include OIDC config for passwordless AWS authentication.
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The CI/CD pipeline spec produces a complete workflow with separate jobs for continuous integration and continuous deployment, connected by artifact passing. The CI job runs on every push to main and enforces quality gates: linting must pass, tests must achieve 80% coverage, the Docker build must succeed, and the vulnerability scan must find no HIGH or CRITICAL CVEs. Any gate failure stops the pipeline and notifies the team.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The CD job deploys only when code is pushed to the production branch (typically via a pull request merge), providing a manual approval gate through the code review process. The rolling update strategy (25% max surge, 0 max unavailable) ensures zero-downtime deployments: new pods are created before old ones are terminated, and the readiness probe prevents traffic from reaching pods that are not yet ready.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The auto-rollback mechanism monitors the error rate after deployment and reverts to the previous image version if the error rate exceeds 2% for 3 consecutive minutes. This provides automatic recovery from bad deployments without requiring manual intervention. The Slack notifications keep the team informed of deployment status at each stage.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 2: Infrastructure as Code Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          DevOps specs are equally powerful for generating infrastructure configurations. Here is a spec for provisioning a production-ready VPC with associated networking resources.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              IaC Spec Example — Production VPC
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-m6 leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Create Terraform configuration for a production VPC across 3 availability zones.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                VPC: 10.0.0.0/16 CIDR. Public subnets (3 AZs): 10.0.1.0/24, 10.0.2.0/24, 10.0.3.0/24. Private app subnets (3 AZs): 10.0.10.0/24, 10.0.11.0/24, 10.0.12.0/24. Private DB subnets (3 AZs): 10.0.20.0/24, 10.0.21.0/24, 10.0.22.0/24. NAT Gateway: 1 per public subnet. Route tables: public (0.0.0.0/0 to IGW), private app (0.0.0.0/0 to NAT), private DB (no internet route). Security: VPC flow logs enabled, S3 VPC endpoint, no default security group rules.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Modular Terraform with variables file (vars.tf), main configuration (main.tf), outputs (outputs.tf). Use aws_vpc, aws_subnet, aws_internet_gateway, aws_nat_gateway, aws_route_table, aws_route, aws_security_group resources. Tag all resources with Environment, Project, ManagedBy. Include terraform.backend config for S3 state with DynamoDB locking.
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          This IaC spec defines the complete network topology with three-tier subnet isolation: public subnets for load balancers and NAT gateways, private application subnets for compute resources, and private database subnets with no internet access. The security group defaults are removed (no inbound or outbound rules) to enforce explicit allow-listing. VPC flow logs provide network traffic auditing for compliance requirements.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Bad vs. Good: DevOps Specs</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          In DevOps, the difference between a good spec and a bad one can be the difference between a smooth deployment and a production outage.
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Database Migration in Pipeline
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Add a database migration step to the deployment"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No backup before migration, no rollback plan, no dry-run, no timeout, no locking mechanism. A failed migration corrupts the database.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-accent)]">
                  Pre-migration: create automated snapshot (RDS), verify snapshot completion. Run migration with --dry-run first. Execute with 10-minute timeout. Lock: advisory lock via pg_advisory_lock to prevent concurrent migrations. Post-migration: run smoke test query, verify row counts within 5% of pre-migration. Rollback: if smoke test fails, restore from snapshot, notify on-call.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Backup, locking, timeout, validation, and rollback all specified.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Kubernetes Deployment
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Write a Kubernetes deployment manifest"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No resource limits (can starve other pods), no probes (unhealthy pods receive traffic), no PDB (all pods can be evicted simultaneously), no security context.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Deployment: 3 replicas, strategy RollingUpdate (maxSurge: 1, maxUnavailable: 0). Resources: requests (CPU: 100m, Memory: 128Mi), limits (CPU: 500m, Memory: 512Mi). Probes: readiness (GET /healthz, initialDelay: 10s, period: 5s), liveness (GET /healthz, initialDelay: 30s, failureThreshold: 3). PDB: minAvailable: 2. Security: runAsNonRoot: true, readOnlyRootFilesystem: true, drop ALL capabilities.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Resource management, health checks, availability, and security all specified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A SaaS company used DevOps specs to standardize their microservice deployment across 40+ services. They created 5 spec templates: CI/CD pipeline (GitHub Actions + EKS), Terraform module (VPC + RDS + ElastiCache), Kubernetes deployment manifest (with standard probes, limits, and security contexts), monitoring configuration (Prometheus + Grafana dashboards), and alerting rules (PagerDuty integration). Every new service was onboarded by instantiating these templates with service-specific parameters (name, port, resource requirements). This reduced service onboarding time from 3 days to 2 hours and eliminated configuration drift between services.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A financial services firm used DevOps specs for their PCI-DSS compliant infrastructure. Specs defined: network segmentation (cardholder data environment isolated from corporate network), encryption at rest (AWS KMS with customer-managed keys), encryption in transit (TLS 1.2+ for all internal communication), audit logging (CloudTrail + VPC Flow Logs + RDS audit logs to immutable S3 bucket with Object Lock), and access controls (MFA required, least-privilege IAM roles, session recording). The spec-driven approach ensured every infrastructure change maintained compliance and could be demonstrated to auditors through version-controlled configurations.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for DevOps Specs</h2>
        <div className="mt-4 space-y-3">
          {[
            "Always define rollback procedures. Every deployment spec must include the steps to revert to the previous version, including data rollback if migrations are involved.",
            "Specify resource limits explicitly. Containers without CPU and memory limits can consume all node resources, causing cascading failures across all services on that node.",
            "Include health checks in every deployment spec. Readiness probes prevent traffic to unhealthy pods; liveness probes restart stuck containers. Without probes, failures go undetected.",
            "Define security contexts for all workloads. Run as non-root, read-only filesystem, drop unnecessary capabilities. These are not optional hardening measures—they are baseline security requirements.",
            "Use infrastructure state management. Terraform state must be stored remotely (S3 + DynamoDB locking) with access controls. Local state files are lost, unversioned, and unsafe.",
            "Include monitoring in every infrastructure spec. A resource without metrics is invisible. Specify which metrics to collect, which alerts to create, and which dashboards to build.",
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
