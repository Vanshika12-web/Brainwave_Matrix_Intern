document.addEventListener("DOMContentLoaded", function () {
    updateCartSummary();
});

// Function to get cart items from localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Function to update the checkout summary
function updateCartSummary() {
    let cartItems = getCartItems();
    let cartContainer = document.querySelector(".cart-items");
    cartContainer.innerHTML = ""; // Clear existing items

    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        document.querySelector(".subtotal-amount").innerText = "₹0.00";
        document.querySelector(".shipping-amount").innerText = "₹0.00";
        document.querySelector(".total-amount").innerText = "₹0.00";
        return;
    }

    let subtotal = 0;

    cartItems.forEach(item => {
        let itemTotal = parseFloat(item.price) * item.quantity;
        subtotal += itemTotal;

        // Create HTML for each cart item
        let cartItemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <p><strong>${item.name}</strong></p>
                    <p>₹${parseFloat(item.price).toFixed(2)} x ${item.quantity} = <strong>₹${itemTotal.toFixed(2)}</strong></p>
                </div>
            </div>
        `;
        cartContainer.innerHTML += cartItemHTML;
    });

    // Calculate shipping fee (₹50 if subtotal is below ₹1000)
    let shippingFee = subtotal > 1000 ? 0 : 100;
    let total = subtotal + shippingFee;

    // Update HTML
    document.querySelector(".subtotal-amount").innerText = `₹${subtotal.toFixed(2)}`;
    document.querySelector(".shipping-amount").innerText = `₹${shippingFee.toFixed(2)}`;
    document.querySelector(".total-amount").innerText = `₹${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function(){
    const deliveryDateSelect = document.getElementById('deliveryDateSelect');
    if (deliveryDateSelect) {
      // Generate available dates: Next 7 days starting from tomorrow
      const availableDates = [];
      const today = new Date();
      for (let i = 2; i <= 7; i++) {
        let d = new Date();
        d.setDate(today.getDate() + i);
        const optionValue = d.toISOString().split('T')[0]; // YYYY-MM-DD
        const displayDate = d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
        availableDates.push({ value: optionValue, display: displayDate });
      }
  
      // Populate the select element with these dates
      availableDates.forEach(date => {
        let option = document.createElement('option');
        option.value = date.value;
        option.textContent = date.display;
        deliveryDateSelect.appendChild(option);
      });
      
      // Set initial display
      document.getElementById('selectedDeliveryDate').textContent = availableDates[0].display;
      
      // Update the display on change
      deliveryDateSelect.addEventListener('change', function() {
        const displayText = this.options[this.selectedIndex].textContent;
        document.getElementById('selectedDeliveryDate').textContent = displayText;
      });
    }
  });
  
  // Function to show the popup modal with a message and optional callback on OK
function showPopup(message, callback) {
    const popupModal = document.getElementById("popupModal");
    const popupMessage = document.getElementById("popupMessage");
    popupMessage.textContent = message;
    popupModal.style.display = "flex";
    
    // When user clicks OK, close modal and run callback if provided
    document.getElementById("popupOkBtn").onclick = function() {
      closePopup();
      if (callback) {
        callback();
      }
    };
  }
  
  // Function to close the popup modal
  function closePopup() {
    document.getElementById("popupModal").style.display = "none";
  }
  
  function confirmOrder() {
    const deliveryDateSelect = document.getElementById('deliveryDateSelect');
    const selectedDate = deliveryDateSelect.value;
    
    if (!selectedDate) {
      showPopup('Please select a delivery date.');
      return;
    }
    
    const displayDate = deliveryDateSelect.options[deliveryDateSelect.selectedIndex].textContent;
    showPopup(`Your order has been placed successfully!\nDelivery Date: ${displayDate}`, function() {
      localStorage.removeItem("cart"); // Clear cart after order
      window.location.href = "order-confirmation.html"; // Redirect to confirmation page
    });
  }
  
  
let currentStep = 1;

function nextStep(step) {
    if (!validateStep(currentStep)) {
        return; // Stop if validation fails
    }

    document.querySelector(`.step-${currentStep}`).classList.remove("active");
    document.querySelector(`.step-${step}`).classList.add("active");
    currentStep = step;
    updateProgressBar(step);
}

function prevStep(step) {
    document.querySelector(`.step-${currentStep}`).classList.remove("active");
    document.querySelector(`.step-${step}`).classList.add("active");
    currentStep = step;
    updateProgressBar(step);
}

// Function to validate fields before moving to the next step
// function validateStep(step) {
//     if (step === 1) {
//         let name = document.querySelector('input[placeholder="Full Name"]').value.trim();
//         let address = document.querySelector('input[placeholder="Address"]').value.trim();
//         let contact = document.querySelector('input[placeholder="Contact Number"]').value.trim();

//         if (name === "" || address === "" || contact === "") {
//             alert("Please fill in all required fields before proceeding.");
//             return false;
//         }

//         // Simple contact number validation (optional)
//         if (!/^\d{10}$/.test(contact)) {
//             alert("Please enter a valid 10-digit contact number.");
//             return false;
//         }
//     }

//     return true; // Proceed to next step if validation passes
// }

// Function to update the progress bar
function updateProgressBar(step) {
    const progressBar = document.querySelector(".progress-bar");
    const progressSteps = document.querySelectorAll(".progress-step");

    progressSteps.forEach((stepElement, index) => {
        if (index + 1 <= step) {
            stepElement.classList.add("active");
        } else {
            stepElement.classList.remove("active");
        }
    });

    // Update the width of the progress bar
    progressBar.style.width = `${(step - 1) * 50}%`;
}


function validateStep(step) {
    if (step === 1) {
      let name    = document.getElementById('fullName').value.trim();
      let address = document.getElementById('address').value.trim();
      let contact = document.getElementById('contact').value.trim();
      // New fields
      let email   = document.getElementById('email').value.trim();
      let city    = document.getElementById('city').value.trim();
      let state   = document.getElementById('state').value.trim();
      let postal  = document.getElementById('postal').value.trim();
      let country = document.getElementById('country').value.trim();
  
      // Simple "all fields required" check
      if (!name || !address || !contact || !email || !city || !state || !postal || !country) {
        alert("Please fill in all required fields before proceeding.");
        return false;
      }
  
      // Example phone check
      if (!/^\d{10}$/.test(contact)) {
        alert("Please enter a valid 10-digit contact number.");
        return false;
      }
  
      // Optional: Email regex, postal code check, etc. if you like
    }
  
    return true; // Step is valid
  }
  
  function nextStep(step) {
    if (!validateStep(currentStep)) {
      return; // Stop if validation fails
    }
  
    // If we're moving from Step 2 -> Step 3, fill shipping details
    if (step === 3) {
      fillShippingInfo();
    }
  
    document.querySelector(`.step-${currentStep}`).classList.remove("active");
    document.querySelector(`.step-${step}`).classList.add("active");
    currentStep = step;
    updateProgressBar(step);
  }

  document.addEventListener('DOMContentLoaded', function(){
    const deliveryDateInput = document.getElementById('deliveryDateInput');
    if (deliveryDateInput) {
      deliveryDateInput.addEventListener('change', function() {
        document.getElementById('selectedDeliveryDate').textContent = this.value;
      });
    }
  });
  
  
  function fillShippingInfo() {
    let name    = document.getElementById('fullName').value;
    let address = document.getElementById('address').value;
    let contact = document.getElementById('contact').value;
    let email   = document.getElementById('email').value;
    let city    = document.getElementById('city').value;
    let state   = document.getElementById('state').value;
    let postal  = document.getElementById('postal').value;
    let country = document.getElementById('country').value;
  
    document.getElementById('confirm-name').textContent    = name;
    document.getElementById('confirm-address').textContent = address;
    document.getElementById('confirm-contact').textContent = contact;
    document.getElementById('confirm-email').textContent   = email;
    document.getElementById('confirm-city').textContent    = city;
    document.getElementById('confirm-state').textContent   = state;
    document.getElementById('confirm-postal').textContent  = postal;
    document.getElementById('confirm-country').textContent = country;
  }
  
