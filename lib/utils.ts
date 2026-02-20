import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSiteUrl(request?: Request) {
  let url = "";

  // 1. Client-side detection (Highest Priority for browser actions)
  if (typeof window !== "undefined") {
    url = window.location.origin;
  }
  // 2. Request-based detection (Server-side priority)
  else if (request) {
    const requestUrl = new URL(request.url);
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || requestUrl.host;
    const proto = request.headers.get("x-forwarded-proto") || (requestUrl.protocol === 'https:' || host.includes('netlify.app') ? 'https' : 'http');
    url = `${proto}://${host}`;
  }
  // 3. Platform Envs (Netlify/Vercel)
  else if (process?.env?.URL) {
    url = process.env.URL;
  }
  // 4. Explicit Env Override (Fallback)
  else if (process?.env?.NEXT_PUBLIC_SITE_URL) {
    url = process.env.NEXT_PUBLIC_SITE_URL;
  }
  // 5. Hardcoded fallback
  else {
    url = "http://localhost:3000";
  }

  // Cleanup
  url = url.replace(/\/$/, "");

  // Fix 0.0.0.0 to localhost for dev ergonomics and cookie security
  // We handle both exact match and with port
  if (url.includes("0.0.0.0")) {
    url = url.replace(/0\.0\.0\.0/g, "localhost");
  }

  // Final validation: Ensure protocol is present and forced to https in production
  if (!url.startsWith("http")) {
    url = `https://${url}`;
  } else if (!url.includes("localhost") && url.startsWith("http://")) {
    url = url.replace("http://", "https://");
  }

  return url;
}
