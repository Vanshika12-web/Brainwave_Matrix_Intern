document.addEventListener("DOMContentLoaded", function () {
    renderWishlist();
    updateCartCount();
});

function renderWishlist() {
    const wishlistContainer = document.getElementById("wishlist-items");
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlistContainer.innerHTML = ""; // Clear previous content

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
        return;
    }

    wishlist.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("wishlist-item");
        itemElement.dataset.name = item.name; // Set unique identifier

        let newPrice = extractNewPrice(item.price);

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name} - ${newPrice}</span>
            <button class="remove-btn" data-name="${item.name}">&times;</button>
            <button class="add-to-cart" data-name="${item.name}">Add to Cart</button>
        `;

        wishlistContainer.appendChild(itemElement);
    });

    // Attach event listeners using event delegation
    wishlistContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-btn")) {
            let productName = event.target.dataset.name;
            removeFromWishlist(productName);
        }

        if (event.target.classList.contains("add-to-cart")) {
            let productName = event.target.dataset.name;
            handleWishlistAddToCart(productName);
        }
    });
}

function extractNewPrice(priceString) {
    if (!priceString) return "0"; 

    // Match the first valid price using regex (₹ followed by numbers)
    let match = priceString.match(/₹([\d,]+(\.\d{1,2})?)/);
    
    if (match) {
        return match[1].replace(/,/g, ""); // Remove commas and return clean number
    }

    return "0"; // Default if no valid price found
}

// Function to handle "Add to Cart" from Wishlist
function handleWishlistAddToCart(productName) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let item = wishlist.find(item => item.name === productName);
    if (!item) return; // Prevent errors if item is missing

    // Call the `addToCart` function from `addToCart.js`
    if (typeof addToCart === "function") {
        addToCartFromWishlist(item);
    } else {
        console.error("addToCart function is not available!");
    }
}

// Function to remove item from Wishlist
function removeFromWishlist(productName) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(item => item.name !== productName);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // Re-render the wishlist
    renderWishlist();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    let cartCounterElement = document.getElementById("cart-count");
    if (cartCounterElement) {
        cartCounterElement.textContent = cartCount;
    }
}
