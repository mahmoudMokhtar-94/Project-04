let productsRow = document.querySelector(".all-products");
let searchBox = document.getElementById("searchBox");
let filterCriteria = document.getElementById("filterCriteria");
let matchingProducts = []; // Array to be populated with products that match value of searchBox
let filterFlag = "N"; // N: to filter by Name (The Default Option)  -------- C: to filter by Category 
let searchBtn = document.getElementById("searchBtn");

let barsIcon = document.getElementById("barsIcon");
let navButtons = document.getElementById("navButtons");
let userInfo = document.getElementById("userInfo");
let profileName = document.getElementById("profileName");
let logoutBtn = document.getElementById("logoutBtn");
let badge = document.querySelector(".badge");

let productsInCart = [];
let favoriteProducts = [];

let cartIcon = document.querySelector(".cart-icon");
let cartProductsDiv = document.querySelector(".cart-products-div");
let cartProductsList = document.querySelector(".cart-products-list");

// Utility Function That Capitalizes a String 
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function decideFilter() {
  let selectedValue = filterCriteria.value;
  if (selectedValue === "by-name") {
    filterFlag = "N";
  }
  else if (selectedValue === "by-category") {
    filterFlag = "C";
  }
}

let products = [
  {
    id: 1,
    imageURL: 'images/uniheadphone.webp',
    title: 'white solo 2 wireless',
    price: 248.99,
    category: 'Headphones',
    quantity: 1,
  },
  {
    id: 2,
    imageURL: 'images/WirelessSound.webp',
    title: 'wireless audio system',
    price: 2299.00,
    category: 'Audio Speakers',
    quantity: 1,
  },
  {
    id: 3,
    imageURL: 'images/apptablet.webp',
    title: 'tablet red eliteBook',
    price: 2100.00,
    category: 'Tablets',
    quantity: 1,
  },
  {
    id: 4,
    imageURL: 'images/widetv.webp',
    title: 'wide screen 4K TV',
    price: 3299.00,
    category: 'Entertainment',
    quantity: 1,
  },
  {
    id: 5,
    imageURL: 'images/consal.webp',
    title: 'game console controller',
    price: 80.00,
    category: 'Video Games',
    quantity: 1,
  },
  {
    id: 6,
    imageURL: 'images/printer.webp',
    title: 'full color laserJet pro  m452dn',
    price: 1050.00,
    category: 'Printers & Ink',
    quantity: 1,
  },
  {
    id: 7,
    imageURL: 'images/usbheadphone.webp',
    title: 'headphones USB wires',
    price: 50.00,
    category: 'Accessories',
    quantity: 1,
  },
  {
    id: 8,
    imageURL: 'images/Ultrabooks.webp',
    title: 'tablet white eliteBook revolve',
    price: 1300.00,
    category: 'Tablets',
    quantity: 1,
  },
  {
    id: 9,
    imageURL: 'images/asus-lap.webp',
    title: 'notebook widescreen y700',
    price: 1299.00,
    category: 'Laptops',
    quantity: 1,
  },
];

function showAllProducts() {
  let x = products.map(function (product) {
    const isInCart = productsInCart.some(item => item.split("---")[0] === product.title);
    return `
      <div class="col-sm-12 col-md-6 col-lg-4">
        <div class="card p-2">
          <img src="${product.imageURL}" class="card-img-top" alt="${product.title}">
          <div class="card-body text-center">
            <h5 class="card-title text-capitalize mb-3">${product.title}</h5>
            <ul class="card-text">
              <li class="product-price"><span class="fw-bold">Price:</span> $${product.price}</li>
              <li class="product-category"><span class="fw-bold">Category:</span> ${product.category}</li>
            </ul>
            <div class="product-actions d-flex justify-content-center align-items-center mt-4">
              <i class="fa-solid fa-heart me-3 favoriteIcon" style="color: ${favoriteProducts.some(favoriteProduct => favoriteProduct.id == product.id) ? '#dc3545' : '#c7c4c4ff'};" onClick ="addToFavorites(${product.id})" data-id="${product.id}"></i>
              <a href="javascript:void(0)" class="btn btn-sm ${isInCart ? 'btn-danger' : 'btn-primary'} text-capitalize addToCartBtn" data-id="${product.id}" data-title="${product.title}" onclick="addToCart(${product.id})">${isInCart ? 'Remove From Cart' : 'Add To Cart'}</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  productsRow.innerHTML = x;
  rebindEventListeners(); // Rebind events after updating DOM
}

function showFilteredProducts() {
  if (searchBox.value === "") {
    matchingProducts = products; // It is blank, so show all products
  } else {
    if (filterFlag === "N") {
      // Filter By Product Name
      matchingProducts = products.filter(function (item) {
        return item.title.toLowerCase().startsWith(searchBox.value.toLowerCase());
      });
    } else if (filterFlag === "C") {
      // Filter By Product Category
      matchingProducts = products.filter(function (item) {
        return item.category.toLowerCase().startsWith(capitalize(searchBox.value).toLowerCase());
      });
    }
  }

  let y = matchingProducts.map(function (product) {
    const isInCart = productsInCart.some(item => item.split("---")[0] === product.title);
    return `
      <div class="col-sm-12 col-md-6 col-lg-4">
        <div class="card p-2">
          <img src="${product.imageURL}" class="card-img-top" alt="${product.title}">
          <div class="card-body text-center">
            <h5 class="card-title text-capitalize mb-3">${product.title}</h5>
            <ul class="card-text">
              <li class="product-price"><span class="fw-bold">Price:</span> $${product.price}</li>
              <li class="product-category"><span class="fw-bold">Category:</span> ${product.category}</li>
            </ul>
            <div class="product-actions d-flex justify-content-center align-items-center mt-4">
              <i class="fa-solid fa-heart me-3 favoriteIcon" style="color: ${favoriteProducts.some(favoriteProduct => favoriteProduct.id == product.id) ? '#dc3545' : '#c7c4c4ff'};" onClick ="addToFavorites(${product.id})" data-id="${product.id}"></i>
              <a href="javascript:void(0)" class="btn btn-sm ${isInCart ? 'btn-danger' : 'btn-primary'} text-capitalize addToCartBtn" data-id="${product.id}" data-title="${product.title}" onclick="addToCart(${product.id})">${isInCart ? 'Remove From Cart' : 'Add To Cart'}</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  productsRow.innerHTML = y;
  rebindEventListeners(); // Rebind events after updating DOM
}

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  showFilteredProducts();
});

if (localStorage.getItem("firstName")) {
  barsIcon.style.display = "none";
  navButtons.style.setProperty("display", "none", "important");
  userInfo.style.display = "flex";
  profileName.innerHTML = `Hi, ${localStorage.getItem("firstName")}`;
}

logoutBtn.addEventListener("click", function () {
  localStorage.clear();
  setTimeout(() => {
    window.location = "register.html";
  }, 1500);
});

function rebindEventListeners() {
  let addToCartButtons = document.querySelectorAll(".addToCartBtn");
  let favoriteIcons = document.querySelectorAll(".favoriteIcon");

  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      if (!localStorage.getItem("firstName")) {
        window.location = "login.html";
      }
    });
  });

  favoriteIcons.forEach(function (favoriteIcon) {
    favoriteIcon.addEventListener("click", function () {
      if (!localStorage.getItem("firstName")) {
        window.location = "login.html";
      }
    });
  });
}

function addToCart(id) {
  let tappedAddToCartBtn = document.querySelector(`.addToCartBtn[data-id="${id}"]`);
  let choosenItem = products.find(function (product) {
    return product.id === id;
  });

  const isInCart = productsInCart.some(item => item.split("---")[0] === choosenItem.title);

  if (!isInCart) {
    // Add with initial quantity 1 and include imageURL and category
    const productSignature = `${choosenItem.title}---${choosenItem.price}---1---${choosenItem.imageURL}---${choosenItem.category}`;
    productsInCart.push(productSignature);
    localStorage.setItem("Products In Cart", JSON.stringify(productsInCart));
    tappedAddToCartBtn.innerHTML = "Remove From Cart";
    tappedAddToCartBtn.classList.remove("btn-primary");
    tappedAddToCartBtn.classList.add("btn-danger");
  } else {
    // Remove by title, ignoring quantity
    productsInCart = productsInCart.filter(item => item.split("---")[0] !== choosenItem.title);
    localStorage.setItem("Products In Cart", JSON.stringify(productsInCart));
    tappedAddToCartBtn.innerHTML = "Add To Cart";
    tappedAddToCartBtn.classList.remove("btn-danger");
    tappedAddToCartBtn.classList.add("btn-primary");
  }
  addCartProductsToList();
  updateCartBadge();
  showAllProducts(); // Refresh product list to update button states
}

function addToFavorites(id) {
  let tappedFavoriteIcon = document.querySelector(`.favoriteIcon[data-id="${id}"]`);
  let favoriteItem = products.find(function (product) {
    return product.id === id;
  });

  if (!favoriteProducts.some(function (favoriteProduct) {
    return favoriteProduct.id === id;
  })) {
    // add it to favorites
    favoriteProducts.push(favoriteItem);
    localStorage.setItem("Favorite Products", JSON.stringify(favoriteProducts));
    tappedFavoriteIcon.style.setProperty("color", "#dc3545", "important");
  } else {
    // it already exists in favorites, hence remove it 
    favoriteProducts = favoriteProducts.filter((favoriteProduct) => favoriteProduct.id !== favoriteItem.id);
    localStorage.setItem("Favorite Products", JSON.stringify(favoriteProducts));
    tappedFavoriteIcon.style.setProperty("color", "#c7c4c4ff", "important");
  }
  showAllProducts(); // Refresh product list to update favorite icon states
}

function showHideList() {
  if (localStorage.getItem("Products In Cart") && localStorage.getItem("Products In Cart") !== "[]") {
    cartProductsDiv.style.display = "block";
    document.addEventListener("click", closeListOnOutside);
  } else {
    cartProductsDiv.style.display = "none";
  }
}

function closeListOnOutside(myEvent) {
  if ((myEvent.target !== cartIcon) && (myEvent.target !== badge) && (!cartProductsDiv.contains(myEvent.target)) && (!Array.from(document.querySelectorAll(".addToCartBtn")).some(btn => btn === myEvent.target))) {
    cartProductsDiv.style.display = "none";
  }
}

function addCartProductsToList() {
  if (!localStorage.getItem("Products In Cart") || localStorage.getItem("Products In Cart") === "[]") {
    cartProductsList.innerHTML = "<p class='text-center' style='cursor:auto'><span class=\"text-danger\">Empty</span> Cart</p>";
  } else {
    let z = productsInCart.map(function (cartProduct) {
      let [pTitle, pPrice, pQuantity, pImageURL, pCategory] = cartProduct.split("---");
      return `
       <li class="p-2 cart-product-item border rounded-2 mb-2" data-title="${pTitle}" data-price="${pPrice}" data-quantity="${pQuantity}">
         <div class="top-part d-flex align-items-center">
           <div>
             <p class="product-name fw-medium">${pTitle}</p>
             <p class="product-price">Price: $${(+pPrice * +pQuantity).toFixed(2)}</p>
           </div>
         </div>
         <div class="bottom-part d-flex align-items-center">
           <div class="decrement border rounded-1 d-flex justify-content-center align-items-center">-</div>
           <div class="quantity mx-3">${pQuantity}</div>
           <div class="increment border rounded-1 d-flex justify-content-center align-items-center">+</div>
         </div>
       </li>
      `;
    }).join("");
    cartProductsList.innerHTML = z;
  }

  // Rebind increment and decrement buttons
  let incrementBtns = document.querySelectorAll(".increment");
  let decrementBtns = document.querySelectorAll(".decrement");

  incrementBtns.forEach(function (incrementBtn) {
    incrementBtn.onclick = function () {
      let li = incrementBtn.closest("li");
      let cartProductTitle = li.dataset.title;
      let productsInCart = JSON.parse(localStorage.getItem("Products In Cart"));
      let productIndex = productsInCart.findIndex(function (product) {
        return product.split("---")[0] === cartProductTitle;
      });

      if (productIndex !== -1) {
        let [title, unitPrice, quantity, imageURL, category] = productsInCart[productIndex].split("---");
        quantity = +quantity + 1;
        let updatedProduct = [title, unitPrice, quantity, imageURL, category].join("---");
        productsInCart[productIndex] = updatedProduct;
        localStorage.setItem("Products In Cart", JSON.stringify(productsInCart));
        li.querySelector(".quantity").textContent = quantity;
        li.querySelector(".product-price").textContent = `Price: $${(+unitPrice * quantity).toFixed(2)}`;
        updateCartBadge();
      }
    };
  });

  decrementBtns.forEach(function (decrementBtn) {
    decrementBtn.onclick = function () {
      let li = decrementBtn.closest("li");
      let cartProductTitle = li.dataset.title;
      let productsInCart = JSON.parse(localStorage.getItem("Products In Cart"));
      let productIndex = productsInCart.findIndex(function (product) {
        return product.split("---")[0] === cartProductTitle;
      });

      if (productIndex !== -1) {
        let [title, unitPrice, quantity, imageURL, category] = productsInCart[productIndex].split("---");
        if (+quantity > 1) {
          quantity = +quantity - 1;
          let updatedProduct = [title, unitPrice, quantity, imageURL, category].join("---");
          productsInCart[productIndex] = updatedProduct;
          localStorage.setItem("Products In Cart", JSON.stringify(productsInCart));
          li.querySelector(".quantity").textContent = quantity;
          li.querySelector(".product-price").textContent = `Price: $${(+unitPrice * quantity).toFixed(2)}`;
          updateCartBadge();
        }
      }
    };
  });
}

function updateCartBadge() {
  if (localStorage.getItem("Products In Cart")) {
    let productsInCart = JSON.parse(localStorage.getItem("Products In Cart"));
    let quantities = productsInCart.map(function (product) {
      return +product.split("---")[2];
    });
    let totalQuantity = quantities.reduce(function (acc, current) {
      return acc + current;
    }, 0);
    badge.innerHTML = totalQuantity;
    localStorage.setItem("Cart Products Count", totalQuantity);
  } else {
    badge.innerHTML = 0;
  }
}

window.onload = function () {
  if (localStorage.getItem("Products In Cart")) {
    productsInCart = JSON.parse(localStorage.getItem("Products In Cart"));
    addCartProductsToList();
    updateCartBadge();
  } else {
    productsInCart = [];
  }
  if (localStorage.getItem("Favorite Products")) {
    favoriteProducts = JSON.parse(localStorage.getItem("Favorite Products"));
    console.log(favoriteProducts);
  }
  showAllProducts(); // Ensure initial product display reflects cart state
}