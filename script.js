///select input fields on form 
const nameInput = document.getElementById("cardholder-name");
const numberInput = document.getElementById("card-number");
const monthInput = document.getElementById("exp-month");
const yearInput = document.getElementById("exp-year");
const cvcInput = document.getElementById("cvc");

//display fields on card 
const displayNumber = document.getElementById("display-number");
const displayName = document.getElementById("display-name");
const displayMonth = document.getElementById("display-month");
const displayYear = document.getElementById("display-year");
const displayCvc = document.getElementById("display-cvc");

//card form
const form = document.getElementById("card-form");
const thankYou = document.getElementById("thank-you");
const continueBtn = document.getElementById("continue-btn");    
const confirmBtn = document.getElementById("confirm-btn");

// Error spans
const nameError = document.getElementById("name-error");
const numberError = document.getElementById("number-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");
const cvcError = document.getElementById("cvc-error");

//live updates on card
nameInput.addEventListener("input", () => {
  displayName.textContent = nameInput.value || "Jane Appleseed";
});



numberInput.addEventListener("input", () => {
  // Remove all spaces
  let value = numberInput.value.replace(/\s+/g, "");

  // Allow only numbers
  value = value.replace(/\D/g, "");

  // Insert space every 4 digits
  let formatted = value.match(/.{1,4}/g)?.join(" ") || "";

  numberInput.value = formatted;

  displayNumber.textContent=formatted || "0000 0000 0000 0000";
});


monthInput.addEventListener("input", () => {

  //remove anything that is not NUMBER. 
  let value=monthInput.value.replace(/\D/g,"");
  //limit to 2 digits
  value=value.slice(0,2)
  //put cleanedvalue back to input
  monthInput.value=value;

  displayMonth.textContent = value || "00";
});

yearInput.addEventListener("input", () => {
  displayYear.textContent = yearInput.value || "00";
});

cvcInput.addEventListener("input", () => {
  displayCvc.textContent = cvcInput.value || "000";
});

//validation helper
function showError(input, message, errorSpan) {
  errorSpan.textContent = message;
  input.classList.add("error-input");
}
function clearError(input, errorSpan) {
  errorSpan.textContent = "";
  input.classList.remove("error-input");
}

// ✅ Correct event listener here
confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let isValid = true;

  // Name
  if (nameInput.value.trim() === "") {
    showError(nameInput, "Can't be blank", nameError);
    isValid = false;
  } else {
    clearError(nameInput, nameError);
  }

  // Number
  if (numberInput.value.trim() === "") {
    showError(numberInput, "Can't be blank", numberError);
    isValid = false;
  } else if (isNaN(numberInput.value.replaceAll(" ", ""))) {
    showError(numberInput, "Wrong format, numbers only", numberError);
    isValid = false;
  }
    else if (numberInput.value.replaceAll(" ", "").length !== 16) {
      showError(numberInput, "Must be 16 digits", numberError);
      isValid = false;
  } else {
    clearError(numberInput, numberError);
  }

 // Month
if (monthInput.value.trim() === "") {
  showError(monthInput, "Can't be blank", monthError);
  isValid = false;
} 
else if (isNaN(monthInput.value)) {
  showError(monthInput, "Numbers only", monthError);
  isValid = false;
} 
else if (+monthInput.value < 1 || +monthInput.value > 12) {
  showError(monthInput, "Invalid month (01–12)", monthError);
  isValid = false;
} 
else {
  clearError(monthInput, monthError);
}


  // Year
  if (yearInput.value.trim() === "") {
    showError(yearInput, "Can't be blank", yearError);
    isValid = false;
  } 
    else if(isNaN(yearInput.value)){
      showError(yearInput,"Numbers only",yearError)
    }
    else if (yearInput.value.length !== 2) {
      showError(yearInput, "Must be 2 digits", yearError);
      isValid = false;
    }
  else {
    clearError(yearInput, yearError);
  }

  // CVC
  if (cvcInput.value.trim() === "") {
    showError(cvcInput, "Can't be blank", cvcError);
    isValid = false;
  }
  else if (cvcInput.value.length !== 3) {
    showError(cvcInput, "Must be 3 digits", cvcError);
    isValid = false;
  }
   else {
    clearError(cvcInput, cvcError);
  }

  // Show thank you if valid
  if (isValid) {
    form.classList.add("hidden");
    thankYou.classList.remove("hidden");
  }
});


// Continue button
continueBtn.addEventListener("click", () => {
  form.reset();
  thankYou.classList.add("hidden");
  form.classList.remove("hidden");

  // Reset display
  displayName.textContent = "Jane Appleseed";
  displayNumber.textContent = "0000 0000 0000 0000";
  displayMonth.textContent = "00";
  displayYear.textContent = "00";
  displayCvc.textContent = "000";

  // Clear errors
  [nameError, numberError, monthError, yearError, cvcError].forEach((err) => (err.textContent = ""));
  [nameInput, numberInput, monthInput, yearInput, cvcInput].forEach((input) => input.classList.remove("error-input"));
});
