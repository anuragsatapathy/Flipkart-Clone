// SLIDER
let sliderIndex = 0;
const slides = ["slider1.webp", "slider2.webp", "slider3.webp"];
const sliderEl = document.querySelector(".slider");

function showSlide(index) {
  sliderEl.style.backgroundImage = `url(${slides[index]})`;
}

let slideInterval = setInterval(() => {
  sliderIndex = (sliderIndex + 1) % slides.length;
  showSlide(sliderIndex);
}, 3000);

document.querySelector(".sileft").addEventListener("click", () => {
  sliderIndex = (sliderIndex - 1 + slides.length) % slides.length;
  showSlide(sliderIndex);
});

document.querySelector(".siright").addEventListener("click", () => {
  sliderIndex = (sliderIndex + 1) % slides.length;
  showSlide(sliderIndex);
});

showSlide(sliderIndex);

// LOGIN
document.querySelector(".login").addEventListener("click", () => {
  let email = prompt("Enter your email for sign up/login :");
  if (!email || email.trim() === "") { alert("Enter email!"); return; }
  let password = prompt("Enter your password:");
  if (!password || password.trim() === "") { alert("Enter password!"); return; }
  alert(`Welcome, ${email}!`);
  document.querySelector(".login span").textContent = email;
});

// WISHLIST
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

document.querySelectorAll(".product").forEach(product => {
  const heart = document.createElement("i");
  heart.className = "fa-regular fa-heart wishlist-heart";
  heart.style.cssText = `color: lightgrey; position: absolute; top: 5px; right: 5px; font-size: 1.3rem; cursor: pointer;`;
  product.style.position = "relative";
  product.appendChild(heart);

  const data = {
    id: product.dataset.id,
    name: product.dataset.name,
    price: product.dataset.price,
    img: product.dataset.img
  };

  // Navigate to product page
  product.addEventListener("click", (e) => {
    if (e.target.classList.contains("wishlist-heart")) return;
    localStorage.setItem("selectedProduct", JSON.stringify(data));
    window.location.href = "product.html";
  });

  // Heart click to add/remove wishlist
  heart.addEventListener("click", (e) => {
    e.stopPropagation();
    if (heart.classList.contains("fa-solid")) {
      if (confirm("Are you sure you want to remove from wishlist?")) {
        heart.classList.replace("fa-solid","fa-regular");
        heart.style.color="lightgrey";
        wishlist = wishlist.filter(p => p.id!==data.id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      }
    } else {
      if (confirm("Are you sure you want to add to wishlist?")) {
        heart.classList.replace("fa-regular","fa-solid");
        heart.style.color="red";
        wishlist.push(data);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      }
    }
  });

  // Initialize heart if already in wishlist
  if(wishlist.find(p=>p.id===data.id)){
    heart.classList.replace("fa-regular","fa-solid");
    heart.style.color="red";
  }
});

// Store all products for product page
let allProducts=[];
document.querySelectorAll(".product").forEach(p=>{
  allProducts.push({
    id:p.dataset.id,
    name:p.dataset.name,
    price:p.dataset.price,
    img:p.dataset.img
  });
});
localStorage.setItem("allProducts", JSON.stringify(allProducts));

