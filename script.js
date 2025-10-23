// ====== SLIDER ======
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

// ====== LOGIN ======
document.querySelector(".login").addEventListener("click", () => {
  let email = prompt("Enter your email for sign up/login :");
  if (email === null) return; // Cancel clicked → do nothing
  if (email.trim() === "") {
    alert("Enter email!");
    return;
  }

  let password = prompt("Enter your password:");
  if (password === null) return; // Cancel clicked → do nothing
  if (password.trim() === "") {
    alert("Enter password!");
    return;
  }

  // Both fields filled
  alert(`Welcome, ${email}!`);
  document.querySelector(".login span").textContent = email;
});

// ====== WISHLIST HEART ======
document.querySelectorAll(".product").forEach(product => {
  let heart = document.createElement("i");
  heart.className = "fa-regular fa-heart wishlist-heart";
  heart.style.color = "lightgrey";
  heart.style.position = "absolute";
  heart.style.top = "5px";
  heart.style.right = "5px";
  heart.style.fontSize = "1.3rem";
  heart.style.cursor = "pointer";
  product.style.position = "relative";
  product.appendChild(heart);

  heart.addEventListener("click", () => {
    if (heart.classList.contains("fa-regular")) {
      if (confirm("Are you sure you want to add to wishlist?")) {
        heart.classList.remove("fa-regular");
        heart.classList.add("fa-solid");
        heart.style.color = "red";
        alert("Added to wishlist!");
      }
    } else {
      if (confirm("Are you sure you want to remove from wishlist?")) {
        heart.classList.remove("fa-solid");
        heart.classList.add("fa-regular");
        heart.style.color = "lightgrey";
        alert("Removed from wishlist!");
      }
    }
  });
});
