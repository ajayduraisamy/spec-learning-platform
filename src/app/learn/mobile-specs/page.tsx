import TopicLayout from "@/components/TopicLayout";

export default function MobileSpecsPage() {
  return (
    <TopicLayout
      section="Domain-Based Specs"
      lessonNumber="Lesson 20"
      title="Mobile Specs"
      currentHref="/learn/mobile-specs"
    >
      <section>
        <h2 className="text-xl font-semibold">What Are Mobile Specs?</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Mobile specs are structured prompts designed to generate mobile application components, navigation flows, offline storage strategies, push notification handling, platform-specific adaptations, and app store optimization configurations. They apply spec engineering discipline to the unique constraints of mobile development: limited screen real estate, varying device capabilities, intermittent connectivity, battery consumption, platform guidelines (Human Interface Guidelines for iOS, Material Design for Android), and app store review requirements.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Mobile development introduces challenges that web development does not face: the app must work offline, handle incoming interruptions (calls, notifications), manage limited memory, adapt to different screen sizes and orientations, and comply with platform-specific design patterns. A mobile spec must address each of these constraints explicitly to produce code that feels native, performs well, and passes app store review.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Cross-platform frameworks (React Native, Flutter, Kotlin Multiplatform) add another layer of complexity: the spec must define which parts of the code are shared across platforms and which are platform-specific. Platform-specific adaptations include navigation patterns (tab bars on iOS vs. navigation drawers on Android), gesture handling (swipe-to-go-back on iOS), and system UI integration (status bar styling, notch handling, dynamic island support).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Mobile specs are particularly valuable for teams building apps that must work in low-connectivity environments. Offline-first architecture requires explicit specifications for data synchronization, conflict resolution, local storage encryption, and background sync scheduling. A spec that addresses these concerns upfront prevents the common mobile app failure mode of showing empty screens or errors when the network is unavailable.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Core Components of a Mobile Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A mobile spec must address seven critical dimensions. The platform and framework definition specifies the target platforms (iOS, Android, both), the framework (React Native, Flutter, native Swift/Kotlin), minimum OS versions (iOS 15+, Android 12+), and supported device types (phone, tablet, foldable). This determines the available APIs, UI components, and performance characteristics.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Navigation architecture defines how users move through the app: stack navigation (push/pop screens), tab navigation (bottom tabs for main sections), drawer navigation (side menu for secondary sections), and deep linking (URLs that open specific screens). The spec must specify the navigation library (React Navigation, Flutter Navigator 2.0, SwiftUI NavigationStack), the navigation hierarchy, and the deep link mapping (URL patterns to screen routes).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          State management and offline strategy define how app state is managed (local component state, global state management with Redux/Zustand/Riverpod), what data is cached locally (SQLite, Realm, AsyncStorage), how offline changes are synchronized with the server (optimistic updates, conflict resolution strategy, background sync), and how the UI reflects connectivity state (online indicator, retry buttons, offline banners).
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Performance requirements address the constraints of mobile devices: app launch time (cold start under 2 seconds), screen rendering time (under 16ms per frame for 60fps), memory usage (under 200MB for mid-range devices), battery impact (background tasks limited to essential operations), and bundle size (under 50MB for initial download). These requirements drive architectural decisions like lazy loading, image optimization, and code splitting.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              Mobile Spec Example — Offline-First Task Management App
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Role"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                You are a senior mobile engineer specializing in React Native offline-first architecture.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Build the task list screen with offline support, push notifications, and cross-platform native feel.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Framework: React Native (Expo), TypeScript, iOS 15+, Android 12+. Navigation: React Navigation (stack + bottom tabs). Storage: WatermelonDB (SQLite wrapper with offline-first sync). State: Zustand for UI state, WatermelonDB for persistent data. Connectivity: detect online/offline via NetInfo, show banner when offline, queue mutations locally, auto-sync when online. Conflict resolution: last-write-wins with server timestamp. Push notifications: Expo Push Notifications, handle foreground/background/closed states, tap notification navigates to specific task. Performance: FlatList with getItemLayout, image caching, lazy load task details screen.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: TaskListScreen component (FlatList with pull-to-refresh, swipe-to-delete, checkbox toggle), WatermelonDB schema (tasks table: id, title, description, completed, due_date, project_id, created_at, updated_at), sync configuration (conflict resolution, sync triggers), push notification handler (registration, foreground display, tap navigation), offline banner component, pull-to-refresh with sync indicator, error toast for failed sync. Platform-specific: iOS swipe-to-go-back gesture, Android hardware back button handling, safe area insets for notched devices.
              </span>
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Output Explanation</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The mobile spec produces an offline-first task management screen that works seamlessly regardless of network connectivity. WatermelonDB provides the local database with automatic synchronization: when the user creates, updates, or deletes a task while offline, the change is stored locally and synced to the server when connectivity is restored. The sync configuration uses last-write-wins conflict resolution, which is appropriate for a task management app where the most recent edit represents the user's intent.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The push notification handler addresses all three app states: when the app is in the foreground, the notification is displayed as an in-app banner; when the app is in the background, the system notification is shown; when the app is closed, tapping the notification launches the app and navigates directly to the referenced task screen. This deep linking behavior is critical for notification-driven engagement.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          The performance optimizations ensure smooth scrolling and responsive interactions: FlatList with getItemLayout enables the list to skip rendering calculations for off-screen items, image caching prevents redundant network requests for task avatars and attachments, and lazy loading of the task details screen reduces initial bundle size. The platform-specific adaptations (iOS swipe-to-go-back, Android hardware back button handling, safe area insets) ensure the app feels native on each platform.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Example 2: App Store Submission Spec</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Mobile specs also cover the non-code aspects of app development, including app store submission requirements, privacy manifests, and review compliance.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2">
            <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
              App Store Spec Example — iOS Submission Checklist
            </span>
          </div>
          <div className="bg-[var(--surface-overlay)] p-6">
            <code className="text-sm font-mono leading-loose text-[var(--text-primary)]">
              <span className="text-[var(--text-tertiary)]">
                {"// Task"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Define the iOS App Store submission requirements for a health tracking app.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Constraints"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                App category: Health & Fitness. Data collected: health metrics (heart rate, steps, sleep), location (for workout tracking), camera (for profile photo), contacts (for sharing). Privacy: App Privacy Nutrition Label required, HealthKit permission justification required, location permission with 'when in use' (not 'always'), camera permission with usage description string. Accessibility: Dynamic Type support, VoiceOver labels for all interactive elements, sufficient color contrast (WCAG AA). App review: demo account credentials provided, IPv6 network compatibility verified, no placeholder content, all links functional, crash-free rate {'>='} 99%.
              </span>
              <br />
              <br />
              <span className="text-[var(--text-tertiary)]">
                {"// Output Format"}
              </span>
              <br />
              <span className="text-[var(--accent-text)]">
                Return: Submission checklist with: App Store Connect metadata (app name, subtitle, description, keywords, screenshots for all device sizes, app preview video), privacy configuration (privacy manifest file, App Privacy labels, HealthKit usage description, location usage description), technical requirements (IPv6 support, bitcode disabled for Xcode 14+, app thinning enabled, app slicing configured), review compliance items (demo account, crash-free rate verification, broken link check, content rating questionnaire), and rejection prevention notes (common HealthKit app rejection reasons: insufficient justification, requesting unnecessary permissions, not using HealthKit data within the app).
              </span>
            </code>
          </div>
        </div>

        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
          This app store spec addresses the most common reasons for App Store rejection: insufficient privacy descriptions, requesting permissions that the app does not use, placeholder content in the submitted build, and broken links in the app description. For HealthKit apps specifically, the spec notes the additional scrutiny applied by Apple reviewers: the app must clearly justify why it needs each HealthKit data type, must not request data types it does not use, and must demonstrate that HealthKit data is actually used within the app (not just collected and sent to a server).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Bad vs. Good: Mobile Specs</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          Mobile development has zero margin for poor user experience. Users expect apps to be fast, responsive, and reliable—even on slow networks and low-end devices.
        </p>

        <div className="mt-4 space-y-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Image Loading
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Show user profile images in a list"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No caching (downloads every image on every scroll), no placeholder, no error state, no image resizing (full-resolution images waste bandwidth and memory), no lazy loading. App becomes sluggish and crashes on low-memory devices.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Image loading: cached (max 100MB cache, LRU eviction), placeholder (colored circle with user initials), error state (retry icon), resize to display size (max 200x200 for list, 400x400 for detail), lazy load (only load images within 2 screen heights), WebP format preferred (fall back to JPEG/PNG), progressive loading (blur-to-sharp for large images). Offline: show cached images, never show broken image icon.
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Caching, placeholders, error handling, resizing, lazy loading, and offline support all specified.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <div className="border-b border-[var(--border)] bg-[var(--surface-raised)] px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Example: Form Input
              </h3>
            </div>
            <div className="p-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                  Bad Prompt
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--text-secondary)]">
                  "Create a form with text inputs"
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  No keyboard type configuration (numeric keyboard for phone number), no auto-capitalization control, no input masking, no validation feedback, no keyboard dismissal handling. Poor user experience on mobile.
                </p>
              </div>
              <div className="rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-dim)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                  Good Spec
                </p>
                <p className="mt-2 text-sm font-mono text-[var(--accent-text)]">
                  Form inputs: keyboardType per field (email-address for email, phone-pad for phone, decimal-pad for amount), autoCapitalize (none for email, sentences for notes, words for name), autoComplete per field (email, tel, name). Validation: real-time feedback (green check / red X), error messages below field, submit button disabled until all required fields valid. Keyboard: next/done button navigation between fields, tap outside dismisses keyboard, keyboard-aware scroll view (inputs not hidden by keyboard).
                </p>
                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                  Keyboard types, validation, navigation, and keyboard-aware layout all specified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Real-World Usage</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A field service management company used mobile specs to build their technician app for use in areas with unreliable cellular coverage. The spec defined offline-first architecture: all work orders, customer information, and inventory data cached locally with SQLite, mutations queued for sync when connectivity is restored, conflict resolution using operational transforms (for concurrent edits of the same work order), and background sync triggered by connectivity changes and app foregrounding. The spec also defined battery optimization: GPS only active during navigation mode, background sync limited to Wi-Fi connections, and image uploads deferred until charging. The resulting app worked reliably in remote locations with no cellular coverage, and technicians reported a 90% reduction in data entry errors compared to their previous paper-based process.
        </p>
        <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">
          A fitness app startup used mobile specs to build their cross-platform workout tracking app. The spec defined: sensor integration (accelerometer for rep counting, heart rate monitor via Bluetooth LE, GPS for outdoor run tracking), real-time feedback (audio cues for pace, haptic feedback for interval transitions, screen always-on during active workout), and workout data visualization (pace chart, heart rate zones, elevation profile, split times). The spec explicitly defined the data collection frequency (accelerometer at 50Hz, GPS at 1Hz, heart rate at 1Hz), the battery budget (max 15% battery drain per hour of active workout), and the offline storage requirements (store workout data locally, sync to cloud within 1 hour of workout completion). The spec-driven approach enabled them to deliver a polished app in 4 months that achieved a 4.8-star rating on both app stores.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips for Mobile Specs</h2>
        <div className="mt-4 space-y-3">
          {[
            "Always design for offline first. Assume the network will be unavailable and design the app to provide a complete experience without it. Sync is a bonus, not a requirement.",
            "Specify keyboard types for every text input. The right keyboard (email, phone, numeric, URL) reduces typing errors and improves the user experience significantly.",
            "Define performance budgets: app launch time, screen render time, memory usage, and battery impact. Without budgets, apps gradually become slower with each feature addition.",
            "Include platform-specific adaptations in every spec. iOS and Android users expect different navigation patterns, gesture behaviors, and visual styles. One-size-fits-all feels wrong on both platforms.",
            "Specify error states for every network-dependent feature. Show meaningful error messages with retry actions, not generic 'something went wrong' messages.",
            "Test on low-end devices. If your app works on a flagship phone, it does not mean it works on the devices your actual users have. Specify minimum device requirements and test against them.",
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
