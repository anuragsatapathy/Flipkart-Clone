let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const container = document.querySelector(".wishlist-container");

// Function to render wishlist items
function renderWishlist() {
    container.innerHTML = ""; 

    if (wishlist.length === 0) {
        container.innerHTML = `<p class="empty-message">Your wishlist is empty. <a href="index.html">Go back to Home</a></p>`;
        return;
    }

    wishlist.forEach(item => {
        const div = document.createElement("div");
        div.className = "wishlist-item";

        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>${item.price}</p>
            <div class="btn-group">
                <button class="add-cart"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
                <button class="buy-now"><i class="fa-solid fa-bolt"></i> Buy Now</button>
                <button class="remove-btn"><i class="fa-solid fa-trash"></i> Remove</button>
            </div>
        `;

        // Remove button
        div.querySelector(".remove-btn").addEventListener("click", () => {
            if (confirm("Are you sure you want to remove this product from wishlist?")) {
                wishlist = wishlist.filter(p => p.id !== item.id);
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                renderWishlist();
            }
        });

        // Add to Cart 
        div.querySelector(".add-cart").addEventListener("click", () => {
            alert(`${item.name} added to cart!`);
        });

        // Buy Now 
        div.querySelector(".buy-now").addEventListener("click", () => {
            alert(`Redirecting to purchase ${item.name}...`);
        });

        container.appendChild(div);
    });
}

renderWishlist();


