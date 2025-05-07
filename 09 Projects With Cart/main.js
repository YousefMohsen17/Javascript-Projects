const categoriesContainer = document.querySelector(".nav-categories");
const productsContainer = document.querySelector(".products");
const cartContainer = document.querySelector(".cart-products");
const setToStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

// *******************
// Fetch Products.Json
const productsJson = async function () {
  try {
    const res = await fetch("products.json");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to load products.json", err);
    return [];
  }
};
// Add Products To Cart Container
const insertProducts = async function (cat) {
  const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
  const products = await productsJson();
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    // Add New Key (Quantity)
    const savedProduct = savedProducts.find((p) => p.id === product.id);
    product.quantity = savedProduct ? savedProduct.quantity : 0;
    savedProducts.push(product);
    // Add Products To Cart Container According to Category
    if (product.category === cat || cat === "All Products") {
      const html = `<div class="product" data-cat="${
        product.category
      }" data-id="${product.id}">
         <img src="imgs/${product.image}" alt="" />
         <span class="name">${product.title}</span>
         <p class="info">
         ${product.description}
         </p>
         <div class="product-quantity">
         <span class="money">$${product.price}</span>
         ${
           product.quantity > 0
             ? ` <p><span class="number">[${product.quantity}]</span> In Cart </p>`
             : ""
         }
         </div>
         <button type="button">Add To Cart</button>
         <span class="id">#${product.id}</span>
         </div>`;
      productsContainer.insertAdjacentHTML("beforeend", html);
    }
  });
  setToStorage("products", savedProducts);
};
const countNumberOfProductInCart = function (e) {
  const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
  const productQuantity =
    e.target.parentElement.querySelector(".product-quantity");
  const targetProduct = savedProducts.find(
    (product) => product.id === +e.target.parentElement.dataset.id
  );
  targetProduct.quantity++;
  setToStorage("products", savedProducts);
  productQuantity.querySelector("p")?.remove();
  productQuantity.insertAdjacentHTML(
    "beforeend",
    `<p><span class="number">[${targetProduct.quantity}]</span> In Cart </p>`
  );
};
const addProductToCart = function (e) {
  const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
  cartContainer.innerHTML = "";
  const targetProduct = savedProducts.find(
    (product) => product.id === +e.target.parentElement.dataset.id
  );
  const cartProduct = {
    title: targetProduct.title,
    quantity: targetProduct.quantity,
    price: targetProduct.price,
  };
  const savedCarts = JSON.parse(localStorage.getItem("cart")) || [];
  const targetCartProduct = savedCarts.find(
    (c) => c.title === cartProduct.title
  );
  if (targetCartProduct === undefined) savedCarts.push(cartProduct);
  else {
    targetCartProduct.quantity++;
  }
  setToStorage("cart", savedCarts);

  insertCartFromLocalStorage();
};
const insertCartFromLocalStorage = function () {
  const savedCarts = JSON.parse(localStorage.getItem("cart")) || [];

  savedCarts.forEach((s) => {
    const html = `   <div> 
    <div>
              <h2>${s.title}</h2>
              <span class="count">${s.price} x ${s.quantity}</span>
            </div>
            <button class="delete">Delete</button>
            </div>
            `;
    cartContainer.insertAdjacentHTML("beforeend", html);
  });
};
const calcTotalMoney = function () {
  const savedCarts = JSON.parse(localStorage.getItem("cart")) || [];
  const totalMoney = document.querySelector(".total-cart-money");
  totalMoney.innerHTML = "";
  let sum = 0;
  savedCarts.forEach((cart) => {
    const cartPrice = cart.quantity * cart.price;
    sum += cartPrice;
  });
  totalMoney.innerHTML = `$${sum.toFixed(2)}`;
};
const handleDeleteButton = function (e) {
  const savedCarts = JSON.parse(localStorage.getItem("cart")) || [];
  const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
  if (e.target.closest(".delete")) {
    const targetIndex = savedCarts.findIndex(
      (c) => c.title === e.target.parentElement.querySelector("h2").innerHTML
    );
    const targetProduct = savedProducts.find(
      (p) => p.title === e.target.parentElement.querySelector("h2").innerHTML
    );
    targetProduct.quantity = 0;
    setToStorage("products", savedProducts);
    insertProducts("All Products");

    savedCarts.splice(targetIndex, 1);
    setToStorage("cart", savedCarts);
    e.target.parentElement.remove();
  }
};
// Call functions on reload
document.addEventListener("DOMContentLoaded", () => {
  insertProducts("All Products");
  insertCartFromLocalStorage();
  calcTotalMoney();
});

productsContainer.addEventListener("click", (e) => {
  if (e.target.closest("button")) {
    countNumberOfProductInCart(e);
    addProductToCart(e);
    calcTotalMoney();
  }
});
cartContainer.addEventListener("click", (e) => {
  handleDeleteButton(e);
  calcTotalMoney();
});
categoriesContainer.addEventListener("click", (e) => {
  const activeCategory = document.querySelector("ul .active");
  if (e.target.closest(".nav-category")) {
    activeCategory.classList.remove("active");
    e.target.classList.add("active");
    insertProducts(e.target.textContent);
  }
});
