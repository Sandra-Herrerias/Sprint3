window.onload = function() {
    document.getElementById('count_product').innerHTML = 0;
};

// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [{
        id: 1,
        name: "cooking oil",
        price: 10.5,
        type: "grocery",
        offer: {
            number: 3,
            percent: 20,
        },
    },
    {
        id: 2,
        name: "Pasta",
        price: 6.25,
        type: "grocery",
    },
    {
        id: 3,
        name: "Instant cupcake mixture",
        price: 5,
        type: "grocery",
        offer: {
            number: 10,
            percent: 30,
        },
    },
    {
        id: 4,
        name: "All-in-one",
        price: 260,
        type: "beauty",
    },
    {
        id: 5,
        name: "Zero Make-up Kit",
        price: 20.5,
        type: "beauty",
    },
    {
        id: 6,
        name: "Lip Tints",
        price: 12.75,
        type: "beauty",
    },
    {
        id: 7,
        name: "Lawn Dress",
        price: 15,
        type: "clothes",
    },
    {
        id: 8,
        name: "Lawn-Chiffon Combo",
        price: 19.99,
        type: "clothes",
    },
    {
        id: 9,
        name: "Toddler Frock",
        price: 9.99,
        type: "clothes",
    },
];
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;
var totalQuantity = 0;

const oilId = 1;
const cupcakeId = 3;
var tableRef;
// Exercise 1
/*function buy(id) {
    let product;

    // 1. Loop for to the array products to get the item to add to cart
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            product = products[i];
        }
    }

    // 2. Add found product to the cartList array
    cartList.push(product);
}*/

// Exercise 2
function cleanCart() {
    cartList.splice(0, cartList.length);
    cart.splice(0, cart.length);
    document.getElementById("total_price").innerHTML = 0;
    tableRef = document.getElementById('tableCart').getElementsByTagName('tbody')[0];
    tableRef.innerHTML = "";
    document.getElementById('count_product').innerHTML = 0;
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    total = 0;
    totalQuantity = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
        totalQuantity += cart[i].quantity;
    }
    var totalDecimal = parseFloat(total).toFixed(2);
    document.getElementById("total_price").innerHTML = totalDecimal;
}

// Exercise 4
/*function generateCart(cartList) {
    // Using the "cartlist" array that contains all the items in the shopping cart,
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    cart.splice(0, cart.length);

    for (let i = 0; i < cartList.length; i++) {
        if (!cart.includes(cartList[i])) { //doesn't exist
            cartList[i].quantity = 1;
            cart.push(cartList[i]);
        } else { //exists
            cartList[i].quantity += 1;
        }
    }
    applyPromotionsCart(cart);
}*/

// Exercise 5
function applyPromotionsCart(cart) {
    // Apply promotions to each item in the array "cart"
    let discount;

    for (let i = 0; i < cart.length; i++) {

        //original values
        if (cart[i].id == oilId) {
            cart[i].price = 10.5;
            cart[i].subtotal = cart[i].quantity * cart[i].price;
            if (cart[i].quantity >= 3) {
                cart[i].price = 10;
                cart[i].subtotalWithDiscount = cart[i].quantity * cart[i].price;
            }
        } else if (cart[i].id == cupcakeId) {
            cart[i].price = 5;
            cart[i].subtotal = cart[i].quantity * cart[i].price;
            if (cart[i].quantity >= 10) {
                //calculate 2/3 from price discount
                discount = cart[i].price / 3 * 2;
                //round decimal numbers
                cart[i].price = discount.toFixed(2);
                cart[i].subtotalWithDiscount = cart[i].quantity * cart[i].price;
            }
        } else { //No promotions
            cart[i].subtotal = cart[i].quantity * cart[i].price;
        }
    }
}

// Exercise 6
function printCart() {
    var icon;
    // Fill the shopping cart modal manipulating the shopping cart dom
    tableRef = document.getElementById('tableCart').getElementsByTagName('tbody')[0];
    tableRef.innerHTML = ""; //empty cart
    for (let i = 0; i < cart.length; i++) {
        if ((cart[i].id == oilId && cart[i].quantity >= 3) || (cart[i].id == cupcakeId && cart[i].quantity >= 10)) {

            tableRef.insertRow().innerHTML =
                "<th>" + cart[i].name + "</th>" +
                "<td>" + cart[i].price + "</td>" +
                "<td>" + cart[i].quantity + "</td>" +
                "<td>" + cart[i].subtotalWithDiscount + "</td>" +
                "<td><i id='icon" + cart[i].name + "' class='fas fa-solid fa-trash'></i></td>";
            icon = document.getElementById("icon" + cart[i].name);
            icon.onclick = function() {
                removeFromCart(cart[i].id);
            };
        } else {
            tableRef.insertRow().innerHTML =
                "<th>" + cart[i].name + "</th>" +
                "<td>" + cart[i].price + "</td>" +
                "<td>" + cart[i].quantity + "</td>" +
                "<td>" + cart[i].subtotal + "</td>" +
                "<td><i id='icon" + cart[i].name + "' class='fas fa-solid fa-trash'></i></td>";
            icon = document.getElementById("icon" + cart[i].name);
            icon.onclick = function() {
                removeFromCart(cart[i].id);
            };
        }
    }
}

// ** Nivell II **

// Exercise 7
function addToCart(id) {
    let product;

    // Refactor previous code in order to simplify it
    // 1. Loop for to the array products to get the item to add to cart
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            product = products[i];
        }
    }

    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
    cartList.push(product);
    cart.splice(0, cart.length);

    for (let i = 0; i < cartList.length; i++) {

        if (!cart.includes(cartList[i])) { //doesn't exist
            cartList[i].quantity = 1;
            cart.push(cartList[i]);
        } else if (cart.includes(cartList[i]) && cartList[i].quantity == 0) {
            cartList[i].quantity = 1;
        } else { //exists
            cartList[i].quantity += 1;
        }
    }

    applyPromotionsCart(cart);
    calculateTotal();
    //insert item number added to cart
    document.getElementById('count_product').innerHTML = totalQuantity;
    printCart();
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array

    for (let i = 0; i < cart.length; i++) {

        if (cart[i].id == id && cart[i].quantity >= 1) { //remove item from cart

            cart[i].quantity--;
            applyPromotionsCart(cart);

            if (cart[i].id == id && cart[i].quantity == 0) {
                cart.splice(i, 1);
                tableRef.deleteRow(i);
            }
        }
    }

    calculateTotal();

    for (let i = 0; i < cartList.length; i++) { //remove item from cartList
        if (cartList[i].id == id) {
            cartList.splice(i, 1);
        }
    }

    //insert item number added to cart
    document.getElementById('count_product').innerHTML = totalQuantity;
    printCart();
}


function open_modal() {
    console.log("Open Modal");
}