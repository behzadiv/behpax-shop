import { productsData } from "./products.js";

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
}

// 3.storage

class Storage {
  static saveProducts(productsData) {
    return localStorage.setItem("products", JSON.stringify(productsData));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = products.getProducts();
  const ui = new Ui();
  ui.displayProducts(productsData);

  Storage.saveProducts(productsData);
});
