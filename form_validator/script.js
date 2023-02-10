const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

/**
 * Check functions
 */

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.remove("success");
  formControl.classList.add("error");
  const small = input.nextElementSibling;
  small.innerText = message;
}

// Show success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.remove("error");
  formControl.classList.add("success");
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${input.previousElementSibling.textContent} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input lenght
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${input.previousElementSibling.textContent} must be at least ${min}`);
  } else if (input.value.length > max) {
    showError(input, `${input.previousElementSibling.textContent} must be less than ${max}`);
  } else {
    showSuccess(input);
  }
}

// check email is valid
function checkEmail(input) {
  const res = String(input.value.trim())
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  if (!res) {
    showError(input, `${input.previousElementSibling.textContent} is not valid`);
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

/**
 * Event listener
 */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);

  checkLength(username, 3, 15);
  checkLength(password, 6, 25);

  checkEmail(email);

  checkPasswordsMatch(password, password2);
});
