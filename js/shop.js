// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [{
            id: 1,
            name: 'cooking oil',
            price: 10.5,
            type: 'grocery',
            offer: {
                number: 3,
                percent: 20
            }
        },
        {
            id: 2,
            name: 'Pasta',
            price: 6.25,
            type: 'grocery'
        },
        {
            id: 3,
            name: 'Instant cupcake mixture',
            price: 5,
            type: 'grocery',
            offer: {
                number: 10,
                percent: 30
            }
        },
        {
            id: 4,
            name: 'All-in-one',
            price: 260,
            type: 'beauty'
        },
        {
            id: 5,
            name: 'Zero Make-up Kit',
            price: 20.5,
            type: 'beauty'
        },
        {
            id: 6,
            name: 'Lip Tints',
            price: 12.75,
            type: 'beauty'
        },
        {
            id: 7,
            name: 'Lawn Dress',
            price: 15,
            type: 'clothes'
        },
        {
            id: 8,
            name: 'Lawn-Chiffon Combo',
            price: 19.99,
            type: 'clothes'
        },
        {
            id: 9,
            name: 'Toddler Frock',
            price: 9.99,
            type: 'clothes'
        }
    ]
    // Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    let product;

    // 1. Loop for to the array products to get the item to add to cart
    for (var i = 1; i < products.length + 1; i++) {
        if (id == i) {
            product = products[i - 1];
        }
    }

    // 2. Add found product to the cartList array
    cartList.push(product);
    console.log(cartList);
}


// Exercise 2
function cleanCart() {
    cartList.splice(0, cartList.length);
    console.log(cartList);
}

// Exercise 3
function calculateTotal() {

    // Calculate total price of the cart using the "cartList" array
    total = 0;
    for (var i = 0; i < cartList.length; i++) {
        total += cartList[i].price;
    }
    console.log(total);

    document.getElementById("total_price").innerHTML = total;
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    let quantit = 0;
    let aux = [];
    let num;

    console.log("cartNew" + JSON.stringify(cartList[0]));

    for (var i = 0; i < cartList.length; i++) {

        num = cartList[0].id;

        if () {

            aux.push(cartList[i]);
        }


        if (cartList[i].id == num) {
            quantit++;
        }
    }

    console.log(quantit);

    cart = cartList.slice();

    cart.forEach(prod => {
        prod.quantity = 0;
    });

    console.log("cartQuantity" + JSON.stringify(cart[0]));




}

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom

    for (var i = 0; i < cartList.length; i++) {

        console.log(document.getElementById("cart_list").rows[i].cells[i + 1]);
        console.log(cartList[i].name);


        document.getElementById("cart_list").rows[i].cells[0].innerHTML = cartList[i].name;
        document.getElementById("cart_list").rows[i].cells[1].innerHTML = cartList[i].price;
        //document.getElementById("cart_list").rows[i].cells[2].innerHTML = cart[i].quantity;
        //document.getElementById("cart_list").rows[i].cells[3].innerHTML = cartList[i].offer;

    }

}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
}

function open_modal() {
    console.log("Open Modal");
    generateCart();
    printCart();
    calculateTotal();

}