let purchasedProductsDiv = document.querySelector(".purchased-products");
let totalPriceSpan = document.querySelector(".total-price-span");
let totalPriceBox = document.getElementById("total-price-label");
let favProductsRow = document.getElementById("favorite-products-row");

window.onload = function () {
    if (localStorage.getItem("Cart Products Count") == "0") {
        purchasedProductsDiv.innerHTML = "<h4 class='text-center' style='color:#888'>Oops, your cart is <span class='text-danger'>Empty</span> now</h4>";
        totalPriceBox.style.display = "none";
    }
    else {
        showCartProducts();
        totalPriceBox.style.display = "block";
    }
}

calcTotalPrice();

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

let badge = document.querySelector(".badge");
let cartItemsCount = localStorage.getItem("Cart Products Count");
badge.innerHTML = cartItemsCount;

// Show Cart Products
function showCartProducts() {
    totalPriceBox.style.display = "block";
    let cartProducts = JSON.parse(localStorage.getItem("Products In Cart")) || [];
    let X = cartProducts.map(function (cartProduct) {
        let [title, price, quantity, imageURL, category] = cartProduct.split("---");
        return `
        <div class="col-12 col-md-6">
                    <div class="card p-2 d-flex flex-row align-items-center">
                        <div>
                            <img src="${imageURL}" class="card-img-top" style="width: 110px;"
                                alt="${title}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title text-capitalize mb-3">${title}</h5>
                            <ul class="card-text ps-0">
                                <li class="product-price"><span class="fw-medium">Price: </span><span class="price">$${price * quantity}</span></li>
                                <li class="product-category"><span class="fw-medium">Category: </span>${category}
                                </li>
                            </ul>
                            <div class="bottom-part d-flex align-items-center">
                                <div
                                    class="decrement border rounded-1 d-flex justify-content-center align-items-center"  data-title="${title}">
                                    -</div>
                                <div class="quantity mx-3">${quantity}</div>
                                <div
                                    class="increment border rounded-1 d-flex justify-content-center align-items-center" data-title="${title}">
                                    +</div>
                                <button class="btn btn-sm btn-danger ms-4 remove-btn" data-title="${title}">Remove</button>
                            </div>

                        </div>
                    </div>
                </div>`
    }).join("");

    purchasedProductsDiv.innerHTML = X;

    let incrementBtns = document.querySelectorAll(".increment");
    let decrementBtns = document.querySelectorAll(".decrement");

    // Increment
    incrementBtns.forEach(function (incrementBtn) {
        incrementBtn.onclick = function () {
            let cartProductTitle = incrementBtn.dataset.title;
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
                incrementBtn.parentElement.querySelector(".quantity").textContent = quantity;

                let card = incrementBtn.closest(".card");
                let priceSpan = card.querySelector(".card-body .card-text .product-price .price");
                let priceBeforeIncrementing = parseFloat(priceSpan.textContent.replace(/[^0-9.]/g, ""));
                priceSpan.textContent = `$${(priceBeforeIncrementing + +unitPrice).toFixed(2)}`;
                updateCartBadge();
                calcTotalPrice();
            }
        };
    });

    // Decrement
    decrementBtns.forEach(function (decrementBtn) {
        decrementBtn.onclick = function () {
            let cartProductTitle = decrementBtn.dataset.title;
            let productsInCart = JSON.parse(localStorage.getItem("Products In Cart")) || [];
            let productIndex = productsInCart.findIndex(function (product) {
                return product.split("---")[0] === cartProductTitle;
            });

            if (productIndex !== -1) {
                let [title, unitPrice, quantity, imageURL, category] = productsInCart[productIndex].split("---");
                quantity = +quantity;

                if (quantity > 1) {
                    // Decrementing is Allowed
                    quantity -= 1;
                    let updatedProduct = [title, unitPrice, quantity, imageURL, category].join("---");
                    productsInCart[productIndex] = updatedProduct;
                    localStorage.setItem("Products In Cart", JSON.stringify(productsInCart));
                    decrementBtn.parentElement.querySelector(".quantity").textContent = quantity;

                    let card = decrementBtn.closest(".card");
                    totalPriceBox.style.display = "block";
                    let priceSpan = card.querySelector(".card-body .card-text .product-price .price");
                    priceSpan.textContent = `$${(unitPrice * quantity).toFixed(2)}`;
                } else {
                    // Decrementing is NOT Allowed, Remove the product from the cart
                    productsInCart.splice(productIndex, 1);
                    localStorage.setItem("Products In Cart", JSON.stringify(productsInCart));
                    decrementBtn.closest(".card").style.display = "none";
                    showCartProducts();
                    purchasedProductsDiv.innerHTML = "<h4 class='text-center' style='color:#888'>Oops, your cart is <span class='text-danger'>Empty</span> now</h4>";
                    totalPriceBox.style.display = "none";
                }
                updateCartBadge();
                calcTotalPrice();
            }
        };
    });

    // REMOVE
    let removeBtns = document.querySelectorAll(".remove-btn");

    removeBtns.forEach(function (removeBtn) {
        removeBtn.onclick = function () {

            let cartProductTitle = removeBtn.dataset.title;
            let productsInCart = JSON.parse(localStorage.getItem("Products In Cart")) || [];
            let productIndex = productsInCart.findIndex(function (product) {
                return product.split("---")[0] === cartProductTitle;
            });
            productsInCart.splice(productIndex, 1);
            localStorage.setItem("Products In Cart", JSON.stringify(productsInCart));
            removeBtn.closest(".card").style.display = "none";
            showCartProducts();
            updateCartBadge();
            calcTotalPrice();
        }
    });
}

showCartProducts();

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

function calcTotalPrice() {
    let totalPrice = 0;
    let cartProducts = JSON.parse(localStorage.getItem("Products In Cart")) || [];
    cartProducts.map(function (cartProduct) {
        let [, unitPrice, quantity, ,] = cartProduct.split("---");
        totalPrice += Number(unitPrice * quantity);
    });
    totalPriceSpan.textContent = totalPrice.toFixed(2);
    if (totalPrice === 0) {
        purchasedProductsDiv.innerHTML = "<h4 class='text-center'>Oops, your cart is <span class='text-danger'>Empty</span> now</h4>";
    }
    else {
        showCartProducts();
    }
}

// Show Favorite Products 
function showFavoriteProducts() {
    let favProducts = JSON.parse(localStorage.getItem("Favorite Products")) || [];
    let M = favProducts.map(function (favProduct) {
        return `
         <div class="card mt-3 pb-3" style="width: 18rem; margin-right: 10px;">
                    <div class="image">
                        <img class="d-block mx-auto" style="width: 60%;" src="${favProduct.imageURL}"
                            alt="${favProduct.title}">
                    </div>
                    <div class="details">
                        <p class="fav-product-title text-capitalize text-center mt-1">${favProduct.title}
                        </p>
                        <p class="fav-product-category text-capitalize text-center mt-1"><span
                                class="fw-medium">Category:</span> ${favProduct.category}
                        </p>
                    </div>
                    <div class="action text-center">
                        <i class="fa-solid fa-heart me-3 favoriteIcon" style="color:#dc3545" data-id="${favProduct.id}" onClick="removeFromFavorites(${favProduct.id})"></i>
                    </div>
                </div>`;
    }).join("");
    if (favProducts.length === 0) {
        favProductsRow.innerHTML = "<h4 class='text-center mt-3' style='color:#888'>Oops, you <span class='text-danger'>don't have</span> favorites right now</h4>";
    }
    else {
        favProductsRow.innerHTML = `<div class="favorite-products-container d-flex w-100">${M}</div>`;
    }
}
showFavoriteProducts();

// Remove From Favorites
function removeFromFavorites(id) {
    let favProducts = JSON.parse(localStorage.getItem("Favorite Products"));
    console.log(favProducts);
    // Removing the favProduct whose id matches with the tapped (clicked) product
    favProducts = favProducts.filter(function (favProduct) {
        return favProduct.id !== id;
    });
    // Updating Favorite Products In local storage
    localStorage.setItem("Favorite Products", JSON.stringify(favProducts));
    // Updating UI
    showFavoriteProducts();
}