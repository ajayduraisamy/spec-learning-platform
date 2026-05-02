import TopicLayout from "@/components/TopicLayout";

export default function SecuritySpecsPage() {
  return (
    <TopicLayout
      section="Domain-Based Specs"
      lessonNumber="Lesson 18"
      title="Security Specs"
      currentHref="/learn/security-specs"
    >
      <section>
        <h2 className="text-xl font-semibold">What Are Security Specs?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Security specs are structured prompts designed to generate security policies, threat models, secure code implementations, vulnerability assessments, access control configurations, encryption setups, and compliance documentation. They apply the rigor of spec engineering to security-critical domains where mistakes can lead to data breaches, regulatory fines, and reputational damage.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Security is not a feature you add at the end of development—it is a set of requirements that must be designed into every layer of the system from the beginning. Security specs force explicit consideration of threat vectors, attack surfaces, authentication mechanisms, authorization models, data encryption, input validation, output encoding, and audit logging before any code is written.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The value of security specs becomes apparent during code reviews and security audits. When every component was generated from a spec that explicitly defined its security requirements, reviewers can verify that the implementation matches the spec and that the spec covers all relevant threats. This transforms security from a subjective judgment ("this looks secure") into an objective verification ("the spec requires X, the implementation provides X").
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Security specs are essential for compliance-driven industries (healthcare, finance, government) where regulatory frameworks (HIPAA, PCI-DSS, SOC 2, GDPR, FedRAMP) mandate specific security controls. A security spec maps each regulatory requirement to a concrete implementation specification, ensuring that compliance is built into the system rather than bolted on as an afterthought.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Components of a Security Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A security spec must address seven critical dimensions. The threat model identifies potential attackers (external hackers, malicious insiders, compromised accounts), attack vectors (SQL injection, XSS, CSRF, SSRF, privilege escalation, credential stuffing), and the assets to protect (user data, payment information, intellectual property, system availability). This threat model drives every subsequent security decision.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Authentication requirements define how users and services prove their identity: password policies (minimum length, complexity, breach detection), multi-factor authentication (TOTP, WebAuthn, SMS), session management (secure cookies, token rotation, idle timeout), and service-to-service authentication (mutual TLS, API keys, JWT with short expiry). The spec must specify the authentication mechanism for every access point.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Authorization models define what authenticated users and services are allowed to do. The spec should specify the authorization model (role-based access control, attribute-based access control, policy-based access control), the permission granularity (resource-level, action-level, field-level), the policy definition format, and the enforcement point (application layer, database layer, API gateway). The principle of least privilege must be explicitly stated: every actor gets the minimum permissions needed to perform their function.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Data protection requirements define how data is secured at rest and in transit: encryption algorithms (AES-256-GCM for data at rest, TLS 1.3 for data in transit), key management (AWS KMS, HashiCorp Vault, key rotation schedule), data classification (public, internal, confidential, restricted), and data handling rules for each classification level. The spec must also address data masking for logs, secure deletion procedures, and breach notification timelines.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Security Spec Example — User Authentication System
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior security engineer specializing in authentication systems for web applications handling sensitive user data.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Design a secure user authentication system with registration, login, password reset, and session management.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Password: min 8 chars, check against HaveIBeenPwned API (k-anonymity), bcrypt with cost factor 12, no password hints (use email-based reset). Login: rate limit 5 attempts per 15 min per account, account lockout after 10 failed attempts (30-min cooldown), log all login attempts (success and failure) with IP, user-agent, timestamp. Session: HTTP-only, Secure, SameSite=Strict cookies, access token (JWT, 15-min expiry), refresh token (7-day expiry, rotating, one-time use), session revocation on password change. MFA: TOTP (RFC 6238), 30-second window, backup codes (10 one-time codes, securely stored).
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Implementation code + security checklist. Code: registration handler, login handler, password reset flow, session middleware, MFA setup/verify, token refresh endpoint. Checklist: CSRF protection implemented, CORS configured (allowlist, not wildcard), security headers (CSP, X-Frame-Options, X-Content-Type-Options, HSTS), input validation on all endpoints, SQL injection prevention (parameterized queries), XSS prevention (output encoding), error messages do not leak information (generic "invalid credentials" vs. "user not found").
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The authentication spec produces a defense-in-depth security implementation. Each layer addresses a different threat: password strength requirements and breach checking prevent credential-based attacks; rate limiting and account lockout prevent brute-force attacks; secure cookie attributes prevent session hijacking; token rotation prevents refresh token theft; MFA adds a second factor that survives password compromise.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The login attempt logging requirement serves both security monitoring and forensic investigation purposes. By logging all attempts (successful and failed) with IP address, user-agent, and timestamp, the system enables detection of credential stuffing attacks (many failed attempts from different IPs for the same account) and provides an audit trail for incident response.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The security checklist at the end of the spec output ensures that security controls beyond authentication are also verified. CSRF protection prevents cross-site request forgery attacks; CORS configuration prevents unauthorized cross-origin access; security headers provide browser-level protections; input validation and output encoding prevent injection attacks; generic error messages prevent user enumeration attacks.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 2: API Security Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          API security requires a different set of controls focused on request validation, rate limiting, access tokens, and data exposure prevention.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Security Spec Example — API Security Controls
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Define security controls for a public-facing REST API.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Authentication: OAuth 2.0 Authorization Code with PKCE for public clients, Client Credentials for service-to-service. Token validation: verify signature (RS256), check expiry, validate audience and issuer, check revocation list. Rate limiting: 100 req/min per user for standard endpoints, 10 req/min for sensitive endpoints (password change, email update), 1000 req/min for public read-only endpoints. Request validation: max body size 1MB, strict content-type checking, JSON schema validation for all request bodies. Response security: no sensitive data in responses (passwords, tokens, internal IDs), consistent error format (no stack traces), Cache-Control headers on all responses.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Express middleware chain implementing all controls. Include: token validation middleware, rate limiter (Redis-backed, sliding window), request body validator (Ajv with JSON schemas), response sanitizer (removes sensitive fields), security headers middleware (Helmet), CORS middleware (origin allowlist). Each middleware: documented purpose, configuration options, error response format. Include security test suite: test token validation (valid, expired, revoked, wrong audience), test rate limiting (exceed limit, verify 429), test request validation (invalid JSON, oversized body, missing required fields).
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          This API security spec creates a layered defense: tokens are validated before any business logic executes, rate limits prevent abuse, request validation prevents injection attacks, response sanitization prevents data leakage, and security headers provide browser-level protections. Each middleware is independently testable, and the security test suite verifies that each control functions correctly.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Bad vs. Good: Security Specs</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Security is binary: either the controls are properly specified and implemented, or the system is vulnerable.
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Password Reset
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Implement password reset"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No token expiry, no single-use enforcement, no rate limiting, no secure token generation, sends user's current password hint. Vulnerable to token theft, brute force, and user enumeration.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Reset token: crypto.randomBytes(32), hex-encoded, stored as bcrypt hash, 1-hour expiry, single-use (deleted after use). Request: POST /reset-request with email (always returns 200, never reveal if email exists). Reset: POST /reset with token + new password. Rate limit: 3 reset requests per email per hour. New password: same rules as registration. Invalidate all existing sessions after password change. Log: password change event with timestamp, IP.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Secure token generation, expiry, single-use, rate limiting, and session invalidation all specified.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: File Upload Security
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Allow users to upload files"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No file type validation, no size limit, no virus scanning, files served with executable content-type, no access control. Vulnerable to XSS, code execution, and unauthorized access.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Upload: max 10MB, whitelist content-types (image/jpeg, image/png, application/pdf), virus scan (ClamAV), rename to UUID (strip original filename), store in private S3 bucket. Serve: pre-signed URLs (15-min expiry), Content-Disposition: attachment, correct Content-Type from whitelist (never from file), no JavaScript content-type allowed. Access control: only file owner and authorized roles can access. Log: upload event (user, filename, size, scan result).
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Type validation, size limits, virus scanning, secure storage, controlled access all specified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A financial technology startup used security specs to build their PCI-DSS compliant payment processing system from scratch. They created 12 security specs covering: card data handling (never store PAN, use tokenization), network segmentation (cardholder data environment isolated), access control (role-based with MFA, least privilege), encryption (AES-256 for data at rest, TLS 1.3 for data in transit), key management (HSM-backed, quarterly rotation), logging and monitoring (all access to cardholder data logged, real-time alerting for anomalies), vulnerability management (quarterly penetration testing, monthly dependency scanning), and incident response (breach notification within 24 hours). The spec-driven approach enabled them to achieve PCI-DSS Level 1 certification in 4 months, compared to the industry average of 9-12 months.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A government contractor used security specs to meet FedRAMP Moderate requirements for their cloud-hosted application. Security specs defined: continuous monitoring (automated vulnerability scanning, configuration drift detection), access management (PIV/CAC card authentication, role-based access with quarterly review), data protection (FIPS 140-2 validated encryption, data loss prevention controls), and incident response (security incident reporting within 1 hour, forensic data retention for 90 days). Each spec was mapped to specific FedRAMP control IDs, enabling automated compliance reporting. The system achieved FedRAMP authorization on their first attempt.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Security Specs</h2>
        <div className="mt-4 space-y-3">
          {[
            "Start with a threat model. Identify what you are protecting, who might attack it, and how they might attack it. Every security control should trace back to a specific threat.",
            "Apply defense in depth. No single security control is perfect. Layer multiple controls so that if one fails, others still provide protection.",
            "Follow the principle of least privilege. Every user, service, and process should have the minimum permissions needed to perform its function. Default to deny, explicitly allow.",
            "Never trust user input. Validate on the server side (client-side validation is for UX, not security), use parameterized queries, encode output, and sanitize file uploads.",
            "Log security events but never log sensitive data. Log authentication attempts, authorization failures, and data access. Never log passwords, tokens, credit card numbers, or PII.",
            "Specify security requirements in machine-readable formats. Use JSON Schema for request validation, OpenAPI for API security definitions, and OPA/Rego for authorization policies.",
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
