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

const RAZORPAY_KEY_ID = "rzp_live_Ti7WZmhd4OhCRO";

const WORKER_URL =
  "https://modeluxe-payment.vaishumodeluxe.workers.dev";

async function openRazorpay() {

  if (totalAmount <= 0) {
    alert("Invalid payment amount.");
    return;
  }

  try {

    // ==============================
    // STEP 1: CREATE ORDER
    // ==============================

    const orderResponse = await fetch(
      WORKER_URL + "/create-order",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          amount: totalAmount * 100
        })
      }
    );

    const orderData = await orderResponse.json();

    console.log("Order response:", orderData);

    if (!orderResponse.ok || !orderData.id) {
      console.error(orderData);

      alert(
        "Payment order create nahi ho saka.\n\n" +
        (orderData.error || "Unknown error")
      );

      return;
    }

    // ==============================
    // STEP 2: OPEN RAZORPAY
    // ==============================

    const options = {

      key: RAZORPAY_KEY_ID,

      amount: orderData.amount,

      currency: orderData.currency,

      order_id: orderData.id,

      name: "Vaishu ModeLuxe",

      description: "ModeLuxe Print Payment",

      handler: async function (response) {

        console.log("Razorpay response:", response);

        // ==============================
        // STEP 3: VERIFY PAYMENT
        // ==============================

        try {

          const verifyResponse = await fetch(
            WORKER_URL + "/verify-payment",
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json"
              },

              body: JSON.stringify({

                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature

              })
            }
          );

          const verifyData =
            await verifyResponse.json();

          console.log(
            "Verification response:",
            verifyData
          );

          if (
            verifyResponse.ok &&
            verifyData.success
          ) {

            alert(
              "Payment Successful!\n\n" +
              "Payment ID: " +
              response.razorpay_payment_id
            );

          } else {

            alert(
              "Payment verification failed."
            );

          }

        } catch (error) {

          console.error(
            "Verification error:",
            error
          );

          alert(
            "Payment verification mein problem aa gayi."
          );
        }
      },

      modal: {
        ondismiss: function () {
          console.log("Payment window closed.");
        }
      },

      theme: {
        color: "#08173A"
      }
    };

    const razorpay =
      new Razorpay(options);

    razorpay.open();

  } catch (error) {

    console.error(
      "Payment error:",
      error
    );

    alert(
      "Payment start nahi ho saka.\n\n" +
      error.message
    );
  }
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
