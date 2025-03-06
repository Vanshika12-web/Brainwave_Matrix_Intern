document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        checkoutBtn.style.display = "none"; // Hide checkout button if cart is empty
    } else {
        let total = 0;
        cart.forEach((item, index) => {
            let newPrice = extractNewPrice(item.price); // Ensure only new price is taken
            let priceValue = parseFloat(newPrice); // Convert to number

            if (!isNaN(priceValue)) {
                total += priceValue;
            } else {
                console.warn("Invalid price detected:", item.price); // Debugging
            }

            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");

            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name} - ₹${newPrice}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;

            cartContainer.appendChild(itemElement);
        });

        totalPriceElement.textContent = `₹${total.toFixed(2)}`;

        // Remove Item from Cart
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                location.reload(); // Refresh page to update cart
            });
        });

        // Checkout Button Functionality
checkoutBtn.addEventListener("click", function () {
    window.location.href = "checkout.html"; // Redirect to the checkout page
});

    }
});

/**
 * Extract only the new price from a given price string.
 * Removes ₹ symbol and commas, ensuring clean numeric data.
 */
function extractNewPrice(priceString) {
    if (!priceString) return "0"; // Prevent errors if price is missing
    let cleanedPrice = priceString.split(" ")[0].replace(/[^0-9.]/g, ""); // Remove ₹ and commas
    return cleanedPrice || "0"; // Ensure no empty result
}
