// Exercise 6
const formCheckOut = document.getElementById("formCheckOut");
const inputs = document.querySelectorAll('#formCheckOut input');

var errorsFlag = false;
// Get the input fields
var fName = document.getElementById("fName");
var fEmail = document.getElementById("fEmail");
var fAddress = document.getElementById("fAddress");
var fLastN = document.getElementById("fLastN");
var fPassword = document.getElementById("fPassword");
var fPhone = document.getElementById("fPhone");

//Get the input groups
var fNameGroup = document.getElementById("fNameGroup");
var fEmailGroup = document.getElementById("fEmailGroup");
var fAddressGroup = document.getElementById("fAddressGroup");
var fLastNGroup = document.getElementById("fLastNGroup");
var fPasswordGroup = document.getElementById("fPasswordGroup");
var fPhoneGroup = document.getElementById("fPhoneGroup");

// Get the error elements
var errorName = document.getElementById("errorName");
var errorEmail = document.getElementById("errorEmail");
var errorAddress = document.getElementById("errorAddress");
var errorLastN = document.getElementById("errorLastN");
var errorPassword = document.getElementById("errorPassword");
var errorPhone = document.getElementById("errorPhone");

const regex = {
    nameRegex: /^[a-zA-ZÀ-ÿ\s]{3,}$/,
    emailRegex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    addressRegex: /^.{3,}$/,
    lastNameRegex: /^[a-zA-ZÀ-ÿ\s]{3,}$/,
    passwordRegex: /^[0-9a-zA-Z]{3,}$/,
    phoneRegex: /^\d{3,9}$/
}

// Validate fields entered by the user: name, phone, password, and email
const validate = (e) => {
    switch (e.target.name) {

        case "fName":
            showValidationInput(fName, regex.nameRegex, fNameGroup, errorName, e);
            break;

        case "fEmail":
            showValidationInput(fEmail, regex.emailRegex, fEmailGroup, errorEmail, e);
            break;

        case "fAddress":
            showValidationInput(fAddress, regex.addressRegex, fAddressGroup, errorAddress, e);
            break;

        case "fLastN":
            showValidationInput(fLastN, regex.lastNameRegex, fLastNGroup, errorLastN, e);
            break;

        case "fPassword":
            showValidationInput(fPassword, regex.passwordRegex, fPasswordGroup, errorPassword, e);
            break;

        case "fPhone":
            showValidationInput(fPhone, regex.phoneRegex, fPhoneGroup, errorPhone, e);
            break;
    }
}

function showValidationInput(field, regexPattern, fieldGroup, errorText, e) {

    if (regexPattern.test(e.target.value) && field.value.trim() != "") {//valid
        fieldGroup.classList.remove('invalidInput');
        document.querySelector('#' + fieldGroup.id + ' i').classList.remove('fa-times-circle');
        fieldGroup.classList.add('validInput');
        document.querySelector('#' + fieldGroup.id + ' i').classList.add('fa-check-circle');
        errorText.style.display = 'none';
        //custom error variable depending on the group input that has been touched
        window['errorsFlag' + fieldGroup.id] = false;
    } else {//invalid
        fieldGroup.classList.remove('validInput');
        document.querySelector('#' + fieldGroup.id + ' i').classList.remove('fa-check-circle');
        fieldGroup.classList.add('invalidInput');
        document.querySelector('#' + fieldGroup.id + ' i').classList.add('fa-times-circle');
        errorText.style.display = 'block';
      
        window['errorsFlag' + fieldGroup.id] = true;
    }
}


//In order to validate each time user changes values from input
inputs.forEach((input) => {
    input.addEventListener('keyup', validate);
    input.addEventListener('blur', validate);
});

//Form that listens until submit
formCheckOut.addEventListener('submit', (e) => {

    if (fName.value.trim() != "" &&
        fEmail.value.trim() != "" &&
        fAddress.value.trim() != "" &&
        fLastN.value.trim() != "" &&
        fPassword.value.trim() != "" &&
        fPhone.value.trim() != "" &&
        window['errorsFlagfNameGroup'] == false &&
        window['errorsFlagfEmailGroup'] == false &&
        window['errorsFlagfAddressGroup'] == false && 
        window['errorsFlagfLastNGroup'] == false &&
        window['errorsFlagfPasswordGroup'] == false &&
        window['errorsFlagfPhoneGroup'] == false) {
           
      
        alert("OK");
        formCheckOut.reset();
    } else {
    
        alert("Error");
        e.preventDefault(); //avoid page reload
    }
});