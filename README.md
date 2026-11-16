ModeLuxe Print – Android/Chrome connection fix

What changed:
- MainActivity-CONNECTION-FIX.kt adds the Access-Control-Allow-Private-Network: true response header to the OPTIONS preflight response.
- This addresses Chrome's Private Network Access preflight when the HTTPS GitHub Pages website calls the Android app's loopback HTTP server at 127.0.0.1:8765.

Files:
1. MainActivity-CONNECTION-FIX.kt — replace the app module's MainActivity.kt with this file.
2. ModeLuxe-Print-Station-UPDATED.html — unchanged website file; it already targets http://127.0.0.1:8765 and includes deluxeprint.github.io in the Android allowed origins.

Steps:
1. In Android Studio, replace app/src/main/java/com/modeluxe/printservice/MainActivity.kt with MainActivity-CONNECTION-FIX.kt (keep the filename MainActivity.kt).
2. Build and install a new APK on the same Android phone.
3. Open ModeLuxe Print Service and keep it running.
4. Open https://deluxeprint.github.io on that same phone in Chrome.
5. Do not make another payment for the already-paid jobs. First verify connection using the health endpoint in Chrome: http://127.0.0.1:8765/health . Then retry only the already-paid document if the page still has its pending retry option.

Note:
- This is a targeted source change; it has not been compiled in Android Studio here.
- Keep the existing Razorpay Worker and secret key configuration unchanged. Never put the Razorpay secret key in HTML.
