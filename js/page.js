document.addEventListener("DOMContentLoaded", function () {
    // Function to add items to wishlist
    window.addToWishlist = function (element) {
        let product = element.closest(".product"); // Get the parent product div
        let productName = product.querySelector("h3").innerText;
        let productPrice = product.querySelector(".price").innerText;
        let productImage = product.querySelector("img").src;

        // Create a wishlist item object
        let wishlistItem = {
            name: productName,
            price: productPrice,
            image: productImage
        };

        // Get existing wishlist from localStorage or create a new array
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        // Check if item already exists
        let exists = wishlist.some(item => item.name === wishlistItem.name);
        if (!exists) {
            wishlist.push(wishlistItem);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
        }

        // Redirect to wishlist page
        window.location.href = "wishlist.html";
    };
});
document.addEventListener("DOMContentLoaded", function () {
    window.addToWishlist = function (element) {
        let product = element.closest(".product");
        let productName = product.querySelector("h3").innerText;
        let productPrice = product.querySelector(".price").textContent.trim().replace("", "");
        let productImage = product.querySelector("img").src;

        let wishlistItem = {
            name: productName,
            price: productPrice,
            image: productImage
        };

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        if (!wishlist.some(item => item.name === wishlistItem.name)) {
            wishlist.push(wishlistItem);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            // ✅ Show a small message instead of redirecting
            let message = document.createElement("div");
            message.innerText = "Added to Wishlist";
            message.style.position = "fixed";
            message.style.bottom = "20px";
            message.style.right = "20px";
            message.style.backgroundColor = "#c8b079";
            message.style.color = "#fff";
            message.style.padding = "10px 15px";
            message.style.borderRadius = "5px";
            message.style.zIndex = "1000";
            document.body.appendChild(message);

            // ✅ Remove message after 2 seconds
            setTimeout(() => {
                message.remove();
            }, 2000);
        } else {
            // ✅ If item is already in wishlist, show a different message
            let message = document.createElement("div");
            message.innerText = "Already in Wishlist";
            message.style.position = "fixed";
            message.style.bottom = "20px";
            message.style.right = "20px";
            message.style.backgroundColor = "#c8b077";
            message.style.color = "#fff";
            message.style.padding = "10px 15px";
            message.style.borderRadius = "5px";
            message.style.zIndex = "1000";
            document.body.appendChild(message);

            setTimeout(() => {
                message.remove();
            }, 2000);
        }
    };
});

document.addEventListener("DOMContentLoaded", function () {
    const sortSelect = document.getElementById("sort-options");
    const productGrid = document.querySelector(".product-grid");

    sortSelect.addEventListener("change", function () {
        let products = Array.from(productGrid.getElementsByClassName("product"));

        switch (sortSelect.value) {
            case "price-low-high":
                products.sort((a, b) => {
                    let priceA = parseFloat(a.querySelector(".price").textContent.replace("₹", "").replace(",", ""));
                    let priceB = parseFloat(b.querySelector(".price").textContent.replace("₹", "").replace(",", ""));
                    return priceA - priceB;
                });
                break;

            case "price-high-low":
                products.sort((a, b) => {
                    let priceA = parseFloat(a.querySelector(".price").textContent.replace("₹", "").replace(",", ""));
                    let priceB = parseFloat(b.querySelector(".price").textContent.replace("₹", "").replace(",", ""));
                    return priceB - priceA;
                });
                break;

            case "name-a-z":
                products.sort((a, b) => {
                    let nameA = a.querySelector("h3").textContent.toLowerCase();
                    let nameB = b.querySelector("h3").textContent.toLowerCase();
                    return nameA.localeCompare(nameB);
                });
                break;

            case "name-z-a":
                products.sort((a, b) => {
                    let nameA = a.querySelector("h3").textContent.toLowerCase();
                    let nameB = b.querySelector("h3").textContent.toLowerCase();
                    return nameB.localeCompare(nameA);
                });
                break;
            
            default:
                return;
        }

        // Clear and reappend sorted products
        productGrid.innerHTML = "";
        products.forEach(product => productGrid.appendChild(product));
    });
});
