MODE LUXE PRINT — CORRECTED PACKAGE
==================================

Files
-----
1. ModeLuxe-Print-Customer-UPDATED.html — customer page (B/W ₹5, Colour ₹10 defaults).
2. ModeLuxe-Print-Worker-OWNER-UPDATED.js — Cloudflare Worker with owner APIs, multi-origin CORS support and stale-download recovery.
3. MainActivity-CLOUD-UPDATED.kt — Android station controller.
4. ModeLuxe-Print-Owner-Master-Panel.html — owner dashboard.

IMPORTANT BEFORE BUILD / DEPLOY
-------------------------------
- Keep your existing Cloudflare DEVICE_TOKEN secret unchanged if you want to retain it.
- The Kotlin file intentionally contains DEVICE_TOKEN = "REPLACE_WITH_EXISTING_DEVICE_TOKEN". Replace this placeholder locally with the exact current DEVICE_TOKEN value from your existing Android project / secure record. Do NOT paste it into chat or publish it. The Cloudflare secret value cannot be read back from the dashboard.
- Keep MASTER_PANEL_TOKEN, RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET as Cloudflare Secrets. Never put Razorpay secret in HTML or Android code.
- Keep KV binding PRINT_JOBS connected to MODELUXE_PRINT_JOBS.
- Set ALLOWED_ORIGIN to https://modeluxeprint.github.io. If the owner page is hosted on another origin, set ALLOWED_ORIGINS to comma-separated exact origins, e.g. https://modeluxeprint.github.io,https://your-owner-host.example. Do not include page paths. If both pages share the same GitHub Pages origin, no extra origin is needed.
- Deploy Worker only after confirming secrets and KV binding. Then publish customer HTML. Host owner panel on the same allowed origin at an unlinked path, or add its exact origin to ALLOWED_ORIGINS.
- Replace the Kotlin placeholder, build APK, install it on station phone, and keep app open.

SAFETY / LIMITATIONS
--------------------
- Worker queue uses Cloudflare KV, which is eventually consistent and not transactional. This update retries jobs left in downloading for over 2 minutes, but cannot guarantee exactly-once printing. Do not retry a paid job until checking its status.
- Android Print Framework may show a print dialog. Silent unattended printing is not guaranteed.
- Heartbeat means the app can contact Worker; it does not prove Epson printer readiness. Ink, paper-out and waste-ink-pad warnings remain manual unless actual Epson status telemetry is implemented.
- Do not run another live payment as a connectivity test. First test /health and Owner Panel login, then verify Android heartbeat.
