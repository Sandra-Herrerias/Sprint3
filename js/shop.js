window.onload = function(){
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
var totalQuantity=0;

const oilId = 1;
const cupcakeId = 3;

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
    var tableRef = document.getElementById('tableCart').getElementsByTagName('tbody')[0];
    tableRef.innerHTML = "";
    document.getElementById('count_product').innerHTML = 0;
}

// Exercise 3
/*function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    total = 0;
    for (let i = 0; i < cartList.length; i++) {
        total += cartList[i].price;
    }
    var totalDecimal = parseFloat(total).toFixed(2);
    document.getElementById("total_price").innerHTML = totalDecimal;
}*/

// Exercise 4
/*function generateCart(cartList) {
    // Using the "cartlist" array that contains all the items in the shopping cart,
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    cart.splice(0, cart.length);
    console.log("cart cleaned auto: " + JSON.stringify(cart));
    for (let i = 0; i < cartList.length; i++) {
        if (!cart.includes(cartList[i])) { //doesn't exist
            cartList[i].quantity = 1;
            cart.push(cartList[i]);
        } else { //exists
            cartList[i].quantity += 1;
        }
    }
    applyPromotionsCart(cart);
    console.log("cart generated: " + JSON.stringify(cart));
}*/

// Exercise 5
function applyPromotionsCart(cart) {
    // Apply promotions to each item in the array "cart"
    let discount;
    total = 0;
    totalQuantity=0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == oilId && cart[i].quantity >= 3) {
            cart[i].price = 10;
            cart[i].subtotalWithDiscount = cart[i].quantity * cart[i].price;
            //sum total
            total += cart[i].subtotalWithDiscount;
            totalQuantity += cart[i].quantity;
        } else if (cart[i].id == cupcakeId && cart[i].quantity >= 10) {
            //calculate 2/3 from price discount
            discount = cart[i].price / 3 * 2;
            //round decimal numbers
            cart[i].price = discount.toFixed(2);
            cart[i].subtotalWithDiscount = cart[i].quantity * cart[i].price;
            //sum total
            total += cart[i].subtotalWithDiscount;
            totalQuantity += cart[i].quantity;
        } else {
            cart[i].subtotal = cart[i].quantity * cart[i].price;
            //sum total
            total += cart[i].subtotal;
            totalQuantity += cart[i].quantity;
        }
    }

    // Calculate total price of the cart using the "cart" array
    let totalDecimal = parseFloat(total).toFixed(2);
    document.getElementById("total_price").innerHTML = totalDecimal;
}

// Exercise 6
function printCart() {

    // Fill the shopping cart modal manipulating the shopping cart dom
    var tableRef = document.getElementById('tableCart').getElementsByTagName('tbody')[0];
    for (let i = 0; i < cart.length; i++) {
        if ((cart[i].id == oilId && cart[i].quantity >= 3) || (cart[i].id == cupcakeId && cart[i].quantity >= 10)) {
            tableRef.insertRow().innerHTML =
                "<th>" + cart[i].name + "</th>" +
                "<td>" + cart[i].price + "</td>" +
                "<td>" + cart[i].quantity + "</td>" +
                "<td>" + cart[i].subtotalWithDiscount + "</td>" +
                "<td id='targ'><i " +
                this.addEventListener("click",  function getHtml(){
                    removeFromCart(cart[i].id);
                }) +
                " class='fas fa-solid fa-trash'></i></td>";
                console.log("cart WITHDISCOUNT: " + JSON.stringify(cart[i]));
        } else {
            tableRef.insertRow().innerHTML =
                "<th>" + cart[i].name + "</th>" +
                "<td>" + cart[i].price + "</td>" +
                "<td>" + cart[i].quantity + "</td>" +
                "<td>" + cart[i].subtotal + "</td>" +
                "<td id='targ'><i" +
                this.addEventListener("click",  function getHtml(){
                    removeFromCart(cart[i].id);
                }) +
                " class='fas fa-solid fa-trash'></i></td>";
                console.log("cart WITHoutDISCOUNT: " + JSON.stringify(cart[i]));
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
      console.log("cart cleaned auto: " + JSON.stringify(cart));
      for (let i = 0; i < cartList.length; i++) {
          if (!cart.includes(cartList[i])) { //doesn't exist
              cartList[i].quantity = 1;
              cart.push(cartList[i]);
          } else { //exists
              cartList[i].quantity += 1;
          }
      }
      applyPromotionsCart(cart);
      console.log("cart generated: " + JSON.stringify(cart));
     
      //insert item number added to cart
      document.getElementById('count_product').innerHTML = totalQuantity;
}

// Exercise 8
function removeFromCart(id) {
    
    // 1. Loop for to the array products to get the item to add to cart

    // 2. Add found product to the cartList array
    console.log("cart BEFORE to remove: " + JSON.stringify(cart));
 
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id && cart[i].quantity >= 1) { //doesn't exist
            cart[i].quantity--;
           // cart.push(cartList[i]);
        } /*else { //exists
            cartList[i].quantity += 1;
        }*/
    }
   // applyPromotionsCart(cart);
    console.log("cart to remove: " + JSON.stringify(cart));
   
    //insert item number added to cart
   // document.getElementById('count_product').innerHTML = totalQuantity;

}

function open_modal() {
    console.log("Open Modal");
    var tableRef = document.getElementById('tableCart').getElementsByTagName('tbody')[0];
    tableRef.innerHTML = "";
    //generateCart(cartList);
    printCart();
}