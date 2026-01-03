// DOM elements
const form = document.getElementById("contactForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const charCounter = document.getElementById("charCounter");
const successMessage = document.getElementById("successMessage");
const resetBtn = document.getElementById("resetBtn");

// Validation helpers
function showError(input, message) {
    const error = input.nextElementSibling; // Sellects the <small> element for error message
    error.textContent = message;
    error.style.display = "block"; //Ensure the error message is visible
    input.classList.add("error");
    input.classList.remove("valid");
}

function clearError(input) {
    const error = input.nextElementSibling;
    error.textContent = "";
    error.style.display = "none"; // Hide the error message
    input.classList.remove("error");
    input.classList.add("valid");
}

function validateName(input) {
    const regex = /^[A-Za-z/s]+$/; // Alows letters and spaces
    if (!regex.test(input.value.trim())) {
        showError(input, "Only letters are allowed.");
        return false;
    }
    clearError(input);
    return true;
}

function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    if (!regex.test(email.value.trim())) {
        showError(email, "Please enter a valid email address.");
        return false;
    }
    clearError(email);
    return true;
}

function validateMessage() {
    if (message.value.trim().length < 20) {
        showError(message, "Message must be at least 20 characters long.");
        return false;
    }
    clearError(message);
    return true;
}