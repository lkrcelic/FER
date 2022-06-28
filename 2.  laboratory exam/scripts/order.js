////LABOS
let filterInput = document.querySelector(".order-filter-input");
let searchButton = document.querySelector(".order-filter-apply");
filterInput.value = localStorage.getItem("filter");

searchButton.addEventListener("click", (event) => {
  localStorage.setItem("filter", filterInput.value);
  filterItems();
});
filterInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchButton.click();
  }
});

async function filterItems() {
  let response = await fetch("data/lab2.json");
  let data = await response.json();
  let products = data.products;
  let items = document.querySelectorAll(".photo-box");

  filterValue = localStorage.getItem("filter");

  for (let index = 0; index < products.length; index++) {
    if (
      products[index].name.toUpperCase().includes(filterValue.toUpperCase())
    ) {
      items[index].style.display = "initial";
    } else {
      items[index].style.display = "none";
    }
  }
}

////LABOS

function addToCart(id) {
  // INSERT CODE HERE --> PRIPREMA
  if (localStorage.getItem("cart") == null) {
    let cart = {};
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  let tmp = JSON.parse(localStorage.cart);
  if (tmp[id] == null) {
    tmp[id] = 1;
  } else {
    tmp[id]++;
  }
  localStorage.cart = JSON.stringify(tmp);

  if (localStorage.getItem("count") == null) {
    let count = 1;
    localStorage.setItem("count", JSON.stringify(count));
  } else {
    let count = localStorage.count;
    count++;
    localStorage.setItem("count", JSON.stringify(count));
  }
  // END INSERT --> PRIPREMA
  refreshCartItems();
}

let getData = async function () {
  let response = await fetch("data/lab2.json");
  let data = await response.json();

  addCategories(data);
};

let addCategories = async function (data) {
  let categories = data.categories;
  let main = document.querySelector("main");
  let categoryTemplate = document.querySelector("#category-template");

  for (let index = 0; index < categories.length; index++) {
    let category = categoryTemplate.content.cloneNode(true);
    let categoryTitleElement = category.querySelector(
      ".decorated-title > span"
    );
    categoryTitleElement.textContent = categories[index].name;

    let products = data.products.filter(
      (p) => p.categoryId == categories[index].id
    );

    // INSERT CODE HERE --> PRIPREMA
    let gallery = category.querySelector(".gallery");
    let productTemplate = document.querySelector("#product-template");

    for (let x of products) {
      let product = productTemplate.content.cloneNode(true);
      let productContainer = product.querySelector(".photo-box");
      let productImageElement = product.querySelector(".photo-box-image");
      let productTitleElement = product.querySelector(".photo-box-title");
      let productCartElement = product.querySelector(".cart-btn");

      productContainer.dataset.id = x.id;
      productTitleElement.textContent = x.name;
      productImageElement.src = x.imageUrl;
      productCartElement.onclick = (event) => addToCart(x.id);

      gallery.appendChild(product);
    }
    // END INSERT --> PRIPREMA
    main.appendChild(category);
  }

  filterItems();
};

//poziv funkcija
getData();
