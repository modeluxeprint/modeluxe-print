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
// RAZORPAY PAYMENT
// ==============================

// यहाँ बाद में अपनी Razorpay Key ID डालनी है
const RAZORPAY_KEY_ID = "rzp_live_Ti7WZmhd4OhCRO";

function openRazorpay() {

  if (totalAmount <= 0) {
    alert("Invalid payment amount.");
    return;
  }

  const options = {

    key: RAZORPAY_KEY_ID,

    // Razorpay amount paise में लेता है
    amount: totalAmount * 100,

    currency: "INR",

    name: "Vaishu ModeLuxe",

    description: "ModeLuxe Print Payment",

    handler: function (response) {

      console.log(
        "Payment ID:",
        response.razorpay_payment_id
      );

      alert(
        "Payment Successful\nPayment ID: " +
        response.razorpay_payment_id
      );
    },

    theme: {}
  };

  const razorpay = new Razorpay(options);

  razorpay.open();
}


// ==============================
// PAYMENT BUTTONS
// ==============================

gpay.onclick = openRazorpay;
phonepe.onclick = openRazorpay;
paytm.onclick = openRazorpay;
sbi.onclick = openRazorpay;


// Initial price
updatePrice();
