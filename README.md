MODE LUXE PRINT — KV CLOUD QUEUE UPDATE
======================================

FILES
-----
1) ModeLuxe-Print-Worker-KV-UPDATED.js
   Cloudflare Worker. KV-only; no R2 bucket required.

2) ModeLuxe-Print-Station-CLOUD-UPDATED.html
   Customer website. Payment is verified and the document is sent to
   POST /submit-print-job. It does not call 127.0.0.1 on the customer's phone.

3) MainActivity-CLOUD-UPDATED.kt
   Android station controller. Polls /device/next every 8 seconds, downloads
   the document and opens Android Print Framework. It reports status back.

CLOUDFLARE REQUIREMENTS
-----------------------
Worker: modeluxe-print-api
KV binding:
  Variable name: PRINT_JOBS
  Namespace: MODELUXE_PRINT_JOBS
Secrets:
  RAZORPAY_KEY_ID
  RAZORPAY_KEY_SECRET
  DEVICE_TOKEN

The DEVICE_TOKEN value in this Kotlin file must exactly match the DEVICE_TOKEN
secret in Cloudflare. This package currently uses:
  MLP-Station-7fK9pQ2xV8mR4nT6zW3bH5cD

If you change the Cloudflare secret, change the Kotlin constant too, rebuild
and reinstall the station app. Do not share this token publicly.

ANDROID PROJECT SETUP
---------------------
- Replace your app's existing MainActivity.kt with MainActivity-CLOUD-UPDATED.kt.
- In app/src/main/AndroidManifest.xml, make sure this permission is present
  directly under the <manifest> element:
    <uses-permission android:name="android.permission.INTERNET" />
- Keep the existing package name and Compose/theme dependencies.
- Build and install the APK on the Realme 12 Pro station phone.
- Open the app and keep it running while accepting print jobs. This first
  version polls while the Activity is open; it is not yet a background service.

WEBSITE
-------
Replace the GitHub Pages website HTML with
ModeLuxe-Print-Station-CLOUD-UPDATED.html and publish the site.
Only PDF and image files (JPG/JPEG/PNG/WEBP) are enabled because the current
Android print controller can print those formats.

IMPORTANT PRINT LIMITATIONS
---------------------------
- Android Print Framework opens its print UI. Select the Epson L130 and
  confirm the print there. This is not silent/automatic USB printing.
- The current Kotlin adapter does not automatically enforce the website's
  Copies count; verify/set copies in the Android print UI before confirming.
- Keep the controller app open and the phone online. A true persistent
  foreground service and direct printer-driver automation are later work.
- KV stores the PDF temporarily as base64 and has size/throughput limits.
  Worker caps each uploaded document at 15 MB and expires temporary document
  data after 2 hours (or deletes it after completed status).
- Do not run a paid test until the complete Worker + website + Android app
  have been deployed and checked. Earlier successful payments should not be
  repeated for testing.

DEPLOY ORDER
------------
1. Update Worker code only after confirming the three secrets and KV binding.
2. Deploy Worker.
3. Publish updated website HTML.
4. Build/install updated Android controller and grant required permissions.
5. Test /health in browser; then verify controller shows Cloud queue connected.
6. Use a no-charge/test-mode workflow first. Do not make another live payment
   merely to test connectivity.
