let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
      <div class="cart-item">
        <img width="100" src=${search.img} alt="" />
        <div class="details">

          <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price">RM ${search.price}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>

          <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>

          <h3>RM ${item * search.price}</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="homepage.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let totalItems = basket.reduce((acc, x) => acc + x.item, 0); // Calculate total number of items
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || {};

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);

    let amountDiscount = amount;
    let discountHTML = ''; // Variable to hold the discount HTML

    if (totalItems >= 5 && totalItems <= 10) {
      amountDiscount = amount * 0.95; // Apply 5% discount
      discountHTML = `<del>RM ${amount.toFixed(2)}</del> `;
    } else if (totalItems > 10) {
      amountDiscount = amount * 0.85; // Apply 15% discount
      discountHTML = `<del>RM ${amount.toFixed(2)}</del> `;
    }

    // Update the label's inner HTML with the appropriate content
    label.innerHTML = `
      <h2>Total Bill: ${discountHTML}RM ${amountDiscount.toFixed(2)}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};


TotalAmount();
