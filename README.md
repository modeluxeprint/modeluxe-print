ModeLuxe Print – Payment and Print Experience Update

Files:
1. ModeLuxe-Print-Station-UPDATED.html
2. MainActivity-UPDATED.kt

Website behavior:
- After Razorpay verification AND Android service confirms the document is received, a popup appears:
  “Payment Received Successfully!” / “Order Placed”.
- If payment is verified but document transfer fails, the website shows a retry option that resends the same paid document without asking for payment again.

Android behavior:
- Received PDF and image documents are saved in the app's private print_queue folder.
- For PDF and image files, Android Print Framework is opened. Select an available printer and confirm printing in the Android print screen.
- The app monitors the Android print job. It shows queued/printing/blocked/failed states and only shows “Print Completed! Please take your documents” when Android reports the print job completed.
- DOCX and TXT are received and queued, but automatic Android printing is not yet implemented for these formats. Convert them to PDF before sending if they need to print in this version.

Important:
- Android Print Framework requires a compatible print service/driver for Epson L130. This update does not itself install an Epson USB driver or guarantee that L130 appears in Android's printer list.
- Keep ModeLuxe Print Service app open while testing. Ensure the Android print screen has a compatible printer selected.
- Replace the website's deployed index.html with the updated HTML.
- Replace MainActivity.kt with the updated Kotlin file and build/install a new APK.
- Test with a low-value/test payment only after verifying the local /health endpoint and printer availability. Do not repeat a previous successful payment.
