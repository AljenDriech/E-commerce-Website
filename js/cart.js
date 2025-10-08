const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartIcon = document.querySelector(".cart");
const closeCartBtn = document.querySelector(".close-cart");
const cartItemsContainer = document.querySelector(".cart-items");
const subtotalElement = document.querySelector(".cart-subtotal");
const cartCountElement = document.querySelector(".cart_count");

cartIcon.addEventListener("click", () => {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
});

closeCartBtn.addEventListener("click", () => {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", () => {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

renderCart();

const addToCartBtn = document.querySelector(".add-to-cart");

if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    const title = document.querySelector(".product-title").textContent;
    const price = document.querySelector(".product-price").textContent;
    const img = document.querySelector(".product-image img").src;
    const qty = parseInt(document.querySelector(".product-qty").value) || 1;

    const item = { title, price, img, qty };

    const existing = cart.find(i => i.title === item.title);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
  });
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
    subtotalElement.textContent = "Subtotal: ₱0.00";
    updateCartCount();
    return;
  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += parseFloat(item.price.replace(/[^\d.]/g, "")) * item.qty;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="cart-img">
      <div class="cart-info">
        <p class="cart-title">${item.title}</p>
        <p class="cart-price">${item.price}</p>
        <p>Qty: ${item.qty}</p>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">&times;</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  subtotalElement.textContent = `Subtotal: ₱${subtotal.toLocaleString()}.00`;
  updateCartCount();
}

function updateCartCount() {
  if (!cartCountElement) return;
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountElement.textContent = totalItems;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
