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

function updatePrice() {
  pages = fileInput.files.length ? 1 : 0;

  const copies = Number(copiesInput.value) || 1;
  const rate = colorSelect.value === "Color" ? 20 : 3;
  const total = pages * copies * rate;

  totalText.innerText = "Total ₹" + total;
}

fileInput.addEventListener("change", updatePrice);
copiesInput.addEventListener("input", updatePrice);
colorSelect.addEventListener("change", updatePrice);

continueBtn.addEventListener("click", () => {

  const copies = Number(copiesInput.value) || 1;
  const rate = colorSelect.value === "Color" ? 20 : 3;
  const total = pages * copies * rate;

  payAmount.innerText = "₹" + total;

  page1.style.display = "none";
  page2.style.display = "block";

});

const UPI_ID = "Q186454114@ybl";
const NAME = "Vaishu ModeLuxe";

function pay() {

  const amount = payAmount.innerText.replace("₹","");

  const url =
  `upi://pay?pa=${UPI_ID}&pn=${NAME}&am=${amount}&cu=INR`;

  window.location.href = url;
}

gpay.onclick = pay;
phonepe.onclick = pay;
paytm.onclick = pay;
sbi.onclick = pay;

updatePrice();

function openUPI() {
  const amount = payAmount.innerText.replace("₹","");

  const url =
    `upi://pay?pa=Q186454114@ybl&pn=Vaishu%20ModeLuxe&am=${amount}&cu=INR`;

  window.open(url, "_system");
}

gpay.onclick = openUPI;
phonepe.onclick = openUPI;
paytm.onclick = openUPI;
sbi.onclick = openUPI;
