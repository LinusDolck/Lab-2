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

// Character counter for message
message.addEventListener("input", ()=> {
    const length = message.value.length;
    charCounter.textContent = `${length} / 20 characters`;

    if (length < 20) {
        charCounter.style.color = "red";
    }
    else {
        charCounter.style.color = "green";
    }
} );

// Form submit handler
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const valid =
        validateName(firstName) &&
        validateName(lastName) &&
        validateEmail() &&
        validateMessage() &&
        subject.value.trim() !== "";

    if (!subject.value) {
        showError(subject, "Please select a subject.");
    } else {
        clearError(subject);
    }

    if (valid) {
        successMessage.textContent = `Thank you ${firstName.value}! I will contact you soon!`;
        successMessage.style.display = "block";

        setTimeout(() => {
            successMessage.style.display = "none";
        }, 3000);

        // Reset the from and the character counter
        form.reset();
        charCounter.textContent = "0 / 20 characters";
        charCounter.className = ""; // Reset character counter color
    }
} );

// Reset button handler
resetBtn.addEventListener("click", () => {
    form.reset();
    successMessage.textContent = "";
    successMessage.style.display = "none";

    // Reset character counter
    charCounter.textContent = "0 / 20 characters"; // Reset character counter text
    charCounter.className = ""; // Reset character counter color

    // Clear all error messages and styles
    document.querySelectorAll(".error-message").forEach((el) => (el.style.display = "none"));
    document.querySelectorAll("input, textarea").forEach((el) => {
        el.classList.remove("error", "valid");
    });
}
);
