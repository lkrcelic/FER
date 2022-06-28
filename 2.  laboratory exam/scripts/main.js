function refreshCartItems() {
  // INSERT CODE HERE --> PRIPREMA
  if (localStorage.getItem("count") != null) {
    let cartItems = document.querySelector("#cart-items");

    let pom = JSON.parse(localStorage.count);
    let count = pom;

    cartItems.textContent = count;
  }
  // END INSERT --> PRIPREMA
}

refreshCartItems();
