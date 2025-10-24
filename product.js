// GET SELECTED PRODUCT
let selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

if (!selectedProduct) {
    alert("No product selected!");
    window.location.href = "index.html";
}

// SET PRODUCT INFO
document.getElementById("product-img").src = selectedProduct.img;
document.getElementById("product-name").textContent = selectedProduct.name;
document.getElementById("product-price").textContent = selectedProduct.price;

// BACK BUTTON
document.querySelector(".back-btn").addEventListener("click", () => {
    window.history.back();
});

// WISHLIST BUTTON
const wishlistHeart = document.getElementById("wishlist-heart");

function updateWishlistHeart() {
    if (wishlist.find(p => p.id === selectedProduct.id)) {
        wishlistHeart.classList.replace("fa-regular","fa-solid");
        wishlistHeart.style.color = "red";
    } else {
        wishlistHeart.classList.replace("fa-solid","fa-regular");
        wishlistHeart.style.color = "black";
    }
}

updateWishlistHeart();

document.querySelector(".wishlist-btn").addEventListener("click", () => {
    if (wishlist.find(p => p.id === selectedProduct.id)) {
        if (confirm("Remove from wishlist?")) {
            wishlist = wishlist.filter(p => p.id !== selectedProduct.id);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            updateWishlistHeart();
        }
    } else {
        if (confirm("Add to wishlist?")) {
            wishlist.push(selectedProduct);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            updateWishlistHeart();
        }
    }
});


document.querySelector(".add-to-cart").addEventListener("click", () => {
    alert(`${selectedProduct.name} added to cart!`);
});

document.querySelector(".buy-now").addEventListener("click", () => {
    alert(`Proceed to buy ${selectedProduct.name}!`);
});

// DISPLAY OTHER PRODUCTS
const otherProductsContainer = document.getElementById("other-products");
allProducts.forEach(p => {
    if(p.id !== selectedProduct.id){
        const div = document.createElement("div");
        div.className = "product-item";
        div.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <p>${p.name}</p>
            <h5>${p.price}</h5>
        `;
        div.addEventListener("click", () => {
            localStorage.setItem("selectedProduct", JSON.stringify(p));
            window.location.reload();
        });
        otherProductsContainer.appendChild(div);
    }
});
