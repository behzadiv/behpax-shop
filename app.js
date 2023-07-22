import { productsData } from "./products.js";

const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const cartBtn = document.querySelector(".cart");
const modalCloseBtn = document.querySelector(".modal-close");
let productList = document.querySelector(".products-list");
let cartQty = document.querySelector(".cart-qty");
let cartTotal = document.querySelector(".cart-total");
let cartList = document.querySelector(".cart-list");
let clearCart = document.querySelector(".clear-cart");

let cart = [];
// 1.get products

class Products {
  getProducts() {
    return productsData;
  }
}

// 2.display products

class Ui {
  displayProducts(productsData) {
    let result = "";
    productsData.forEach((product) => {
      result += `
        <div class="product-container" id="productId">
          <img class="product-img" src="${product.imageUrl}" alt="" />
          <div class="product-description">
            <h5 class="product-title">${product.title}</h5>
            <span class="product-price">${product.price} تومان </span>
          </div>
            <button class="productAdd-btn" data-id=${product.id}>
            <i class="fa fa-cart-plus fa-lg"></i>
             افزودن به سبد خرید
             </button>
        </div>`;
    });
    productList.innerHTML = result;
  }
  getAddToCartBtns() {
    const addToCartBtns = document.querySelectorAll(".productAdd-btn");
    const buttons = [...addToCartBtns]; /// change nodelist to array
    buttons.map((btn) => {
      const btnId = parseInt(btn.dataset.id);
      const isInCart = cart.find((p) => p.id === btnId);
      if (isInCart) {
        btn.innerHTML = "موجود در سبد خرید";
        btn.disabled = true;
      } else {
        btn.addEventListener("click", () => {
          btn.innerHTML = "موجود در سبد خرید";
          btn.disabled = true;
          const addedProduct = { ...Storage.getProduct(btnId), qty: 1 };
          cart = [...cart, addedProduct];
          this.addCartItem(addedProduct);
          this.setCartValue(cart);
          localStorage.setItem("cart", JSON.stringify(cart));
        });
      }
    });
  }
  addCartItem(cart) {
    let result = "";
    const div = document.createElement("div");
    div.classList.add("cart-row");
    div.innerHTML = `
            <img class="cart-img" src="${cart.imageUrl}" alt="" />
            <div class="cart-desc">
            <h3>${cart.title}</h3>
            <span>${cart.price} تومان</span>
            </div>
            <div class="cart-qty-control">
              <span class="increment"><i class="fa fa-chevron-up"></i></span>
              <span class="cart-row-qty">${cart.qty}</span>
              <span class="decrement"><i class="fa fa-chevron-down"></i></span>
            </div>
            <span class="item-delete"><i class="fa fa-trash-alt"></i></span>
            `;
    cartList.appendChild(div);
  }
  setCartValue(cart) {
    let tempCartQty = 0;
    const totalPrice = cart.reduce((acc, curr) => {
      tempCartQty += parseInt(curr.qty);
      return parseInt(acc) + parseInt(curr.price) * curr.qty;
    }, 0);
    cartTotal.innerHTML = ` مجموع : ${totalPrice} تومان`;
    cartQty.innerHTML = tempCartQty;
  }
  setupApp() {
    cart = Storage.getCart();
    cart.forEach((item) => this.addCartItem(item));
    cartQty.innerHTML = cart.length;
  }
  cartLogic() {
    clearCart.addEventListener("click", () => {
      cart.forEach((cartItem) => this.removeItem(cartItem.id));
    });
  }
  removeItem(id) {
    cart = cart.filter((item) => item.id !== parseInt(id));
    this.setCartValue(cart);
    Storage.saveCart(cart);
  }
}

// 3.storage

class Storage {
  static saveProducts(productsData) {
    return localStorage.setItem("products", JSON.stringify(productsData));
  }
  static getProduct(id) {
    const _products = JSON.parse(localStorage.getItem("products"));
    return _products.find((p) => p.id === id);
  }
  static getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  static saveCart(cart) {
    return localStorage.setItem("cart", JSON.stringify(cart));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = products.getProducts();
  const ui = new Ui();
  ui.setupApp();
  ui.displayProducts(productsData);
  ui.getAddToCartBtns();
  ui.cartLogic();
  Storage.saveProducts(productsData);
});

// modal

function closeModal() {
  modal.classList.add("hidden");
  backdrop.classList.add("hidden");
}
function showModal() {
  modal.classList.remove("hidden");
  backdrop.classList.remove("hidden");
}

cartBtn.addEventListener("click", showModal);
modalCloseBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

// end modal
