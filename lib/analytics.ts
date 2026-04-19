/**
 * Analytics abstraction layer.
 *
 * Di development: events di-log ke console.
 * Di production: kirim ke provider yang dikonfigurasi via NEXT_PUBLIC_ANALYTICS_PROVIDER.
 *
 * Cara swap ke provider nyata:
 * - Plausible: isi NEXT_PUBLIC_PLAUSIBLE_DOMAIN di .env.local, ganti implementasi di bawah
 * - PostHog:   isi NEXT_PUBLIC_POSTHOG_KEY + NEXT_PUBLIC_POSTHOG_HOST
 * - GA4:       isi NEXT_PUBLIC_GA_MEASUREMENT_ID
 *
 * Semua event hanya dipanggil dari client-side (browser).
 * Jangan import file ini di server components atau server actions.
 */

export type AnalyticsEvent =
  | "landing_page_view"
  | "register_attempt"
  | "register_success"
  | "login_success"
  | "dashboard_view"
  | "create_store_attempt"
  | "create_store_success"
  | "add_product_attempt"
  | "add_product_success"
  | "feedback_opened"
  | "feedback_sent";

type EventProperties = Record<string, string | number | boolean | undefined>;

function isDev() {
  return process.env.NODE_ENV === "development";
}

/**
 * Track an analytics event.
 * Safe to call even if no provider is configured — will silently no-op in production.
 */
export function track(event: AnalyticsEvent, properties?: EventProperties) {
  if (isDev()) {
    console.log(`[analytics] ${event}`, properties ?? "");
    return;
  }

  // -- Plausible --
  // Aktifkan jika sudah pasang script Plausible di app/layout.tsx
  // dan isi NEXT_PUBLIC_PLAUSIBLE_DOMAIN di .env.local
  //
  // if (typeof window !== "undefined" && (window as any).plausible) {
  //   (window as any).plausible(event, { props: properties });
  // }

  // -- PostHog --
  // Aktifkan setelah install posthog-js dan init di app/layout.tsx
  //
  // if (typeof window !== "undefined" && (window as any).posthog) {
  //   (window as any).posthog.capture(event, properties);
  // }

  // -- Google Analytics 4 --
  // Aktifkan setelah pasang gtag.js di app/layout.tsx
  //
  // if (typeof window !== "undefined" && (window as any).gtag) {
  //   (window as any).gtag("event", event, properties);
  // }
}
