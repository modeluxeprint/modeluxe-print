const fileInput = document.querySelector('input[type="file"]');
const colorSelect = document.querySelectorAll("select")[0];
const copiesInput = document.querySelector('input[type="number"]');
const totalText = document.querySelector("#priceBox h2");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const payAmount = document.getElementById("payAmount");

const gpay = document.getElementById("gpay");
const phonepe = document.getElementById("phonepe");
const paytm = document.getElementById("paytm");
const sbi = document.getElementById("sbi");

const continueBtn = document.getElementById("continueBtn");

let pages = 0;
let totalAmount = 0;


// ==============================
// PRICE CALCULATION
// ==============================

function updatePrice() {
  // फिलहाल PDF select होने पर 1 page
  pages = fileInput.files.length ? 1 : 0;

  const copies = Number(copiesInput.value) || 1;

  // B/W ₹3, Colour ₹20
  const rate = colorSelect.value === "Color" ? 20 : 3;

  totalAmount = pages * copies * rate;

  totalText.innerText = "Total ₹" + totalAmount;
}


// ==============================
// INPUT EVENTS
// ==============================

fileInput.addEventListener("change", updatePrice);
copiesInput.addEventListener("input", updatePrice);
colorSelect.addEventListener("change", updatePrice);


// ==============================
// CONTINUE BUTTON
// ==============================

continueBtn.addEventListener("click", () => {

  if (!fileInput.files.length) {
    alert("Please select a PDF file first.");
    return;
  }

  updatePrice();

  payAmount.innerText = "₹" + totalAmount;

  page1.style.display = "none";
  page2.style.display = "block";
});


// ==============================
// DIRECT UPI INTENT PAYMENT
// ==============================

function openDirectUPI() {

  if (totalAmount <= 0) {
    alert("Invalid payment amount.");
    return;
  }

  // यहाँ अपनी असली UPI ID डालें जिस पर पैसे मंगाने हैं
  const upiID = "q186454114@ybl"; 
  const payeeName = "Vaishu ModeLuxe";
  
  // UPI Deep Link URL (डायनेमिक अमाउंट के साथ)
  const upiUrl = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(payeeName)}&am=${totalAmount}&cu=INR&tn=PrintStationPayment`;

  console.log("Opening UPI URL:", upiUrl);

  // यूजर के फोन में UPI पेमेंट ऐप खोलने की कोशिश करें
  window.location.href = upiUrl;
}


// ==============================
// PAYMENT BUTTONS
// ==============================

gpay.onclick = openDirectUPI;
phonepe.onclick = openDirectUPI;
paytm.onclick = openDirectUPI;
sbi.onclick = openDirectUPI;

// Initial price update
updatePrice();
