document.addEventListener("DOMContentLoaded", function () {
    fetch("../templates/header.html")  // Path to header file
        .then(response => response.text())  
        .then(data => document.getElementById("header-placeholder").innerHTML = data)
        .catch(error => console.error("Error loading header:", error));
});


function toggleMenu() {
    document.getElementById("sidebar-menu").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

function closeMenu() {
    document.getElementById("sidebar-menu").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}
function toggleSearch() {
    const searchContainer = document.getElementById("search-container");
    const searchInput = document.getElementById("search-input");

    if (searchContainer.style.display === "flex") {
        searchContainer.style.display = "none"; // Hide if already visible
    } else {
        searchContainer.style.display = "flex"; // Show when clicked
        searchInput.focus(); // Auto-focus input field
    }
}

// Sample product list (update or extend as needed)
const products = [
    { name: "Rings", url: "rings.html" },
    { name: "Diamond Rings", url: "diamond-rings.html" },
    { name: "Bracelets", url: "bracelets.html" },
    { name: "Necklaces", url: "necklaces.html" },
    { name: "Earrings", url: "earrings.html" },
    { name: "New In", url: "newin.html" }
];

function performSearch() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    const resultsContainer = document.getElementById("search-results");
    
    // Clear previous results.
    resultsContainer.innerHTML = "";

    if (!query) {
        alert("Please enter a search term.");
        return;
    }

    // Filter products based on the search query.
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );

    if (filteredProducts.length === 0) {
        resultsContainer.innerHTML = "<p>No results found. Try searching for 'rings', 'bracelets', etc.</p>";
        return;
    }

    // Create a clickable element for each matching product.
    filteredProducts.forEach(product => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        resultItem.textContent = product.name;
        resultItem.addEventListener("click", () => {
            window.location.href = product.url;
        });
        resultsContainer.appendChild(resultItem);
    });
}

// Trigger search when "Enter" is pressed in the search input.
document.getElementById("search-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        performSearch();
    }
});