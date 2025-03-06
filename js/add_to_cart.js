document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});

// Function to add an item to the cart (Used for both Wishlist & Product Page)
function addToCart(event) {
    let productElement = event.target.closest(".product");
    let productName = productElement.querySelector("h3").textContent;
    let productPrice = productElement.querySelector(".price").textContent;
    let productImage = productElement.querySelector("img").src;

    let product = {
        name: productName,
        price: extractNewPrice(productPrice), // Clean price format
        image: productImage,
        quantity: 1
    };

    addProductToCart(product);
}

// Function to handle adding products from the wishlist
function addToCartFromWishlist(item) {
    let product = {
        name: item.name,
        price: extractNewPrice(item.price), // Ensure price is clean
        image: item.image,
        quantity: 1
    };

    addProductToCart(product);

    // Remove from Wishlist after adding to cart
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(wishItem => wishItem.name !== item.name);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    renderWishlist(); // Refresh Wishlist UI
}

// Function to add a product to the cart (handles both cases)
function addProductToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        showPopup("Already in cart!"); // Show message but do nothing
        return;
    } else {
        cart.push(product);
        showPopup("Item added to cart!");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}


// Function to update the cart count in the UI
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    let cartCounterElement = document.getElementById("cart-count");
    if (cartCounterElement) {
        cartCounterElement.textContent = cartCount;
    }
}

// Function to show a popup with dynamic message
function showPopup(message) {
    let popup = document.getElementById("cart-popup");
    popup.textContent = message; // Change text inside popup dynamically
    popup.classList.add("show");

    // Hide the popup after 3 seconds
    setTimeout(() => {
        popup.classList.remove("show");
    }, 3000);
}

// Function to clean up price format (removes ₹ and commas)
function extractNewPrice(priceString) {
    if (!priceString) return "0"; 

    // Match the first valid price using regex (₹ followed by numbers)
    let match = priceString.match(/₹([\d,]+(\.\d{1,2})?)/);
    
    if (match) {
        return match[1].replace(/,/g, ""); // Remove commas and return clean number
    }

    return "0"; // Default if no valid price found
}


// Attach event listeners to all "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", addToCart);
});
