import { productsData } from "./products.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
            <button class="productAdd-btn" id=${product.id}>
            <i class="fa fa-cart-plus fa-lg"></i>
             افزودن به سبد خرید
             </button>
        </div>`;
    });
    document.querySelector(".products-list").innerHTML = result;
  }
  getAddToCartBtns() {
    const addToCartBtns = document.querySelectorAll(".productAdd-btn");
    const buttons = [...addToCartBtns]; /// change nodelist to array
    buttons.map((btn) => {
      const btnId = Number(btn.id);
      const isInCart = cart && cart.find((p) => p.id === btnId);
      if (isInCart) {
        btn.innerHTML = "موجود در سبد خرید";
        btn.disabled = true;
      } else {
        btn.addEventListener("click", () => {
          btn.innerHTML = "موجود در سبد خرید";
          btn.disabled = true;
          const addedProduct = Storage.getProduct(btnId);
          cart = [...cart, { ...addedProduct, qty: 1 }];
          Storage.saveCarts(cart);
        });
      }
    });
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
  static saveCarts(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = products.getProducts();
  const ui = new Ui();
  ui.displayProducts(productsData);
  ui.getAddToCartBtns();
  Storage.saveProducts(productsData);
});

// modal
const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const cartBtn = document.querySelector(".cart");
const modalCloseBtn = document.querySelector(".modal-close");

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
