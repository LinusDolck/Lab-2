// DOM elements
// Select all the necessary elements and store them in variables
const form = document.getElementById("contactForm"); // The form element
const firstName = document.getElementById("firstName"); // First name input field
const lastName = document.getElementById("lastName"); // Last name input field
const email = document.getElementById("email"); // Email input field
const subject = document.getElementById("subject"); // Subject select field
const message = document.getElementById("message"); // Message textarea field
const charCounter = document.getElementById("charCounter"); // Character counter for message
const successMessage = document.getElementById("successMessage"); // Success message display
const resetBtn = document.getElementById("resetBtn"); // Reset button

// Validation helpers

// Function to show error message
function showError(input, message) {
    const error = input.nextElementSibling; // Sellects the <small> element for error message
    error.textContent = message; // Sets the error message text
    error.style.display = "block"; //Ensure the error message is visible
    input.classList.add("error"); // Add error class to input
    input.classList.remove("valid"); // Remove valid class from input
}

// Function to clear error message
function clearError(input) {
    const error = input.nextElementSibling; // Selects the <small> element for error message
    error.textContent = ""; // Clear the error message text
    error.style.display = "none"; // Hide the error message
    input.classList.remove("error"); // Remove error class from input
    input.classList.add("valid"); // Add valid class to input
}

// Function to validate name fields
function validateName(input) {
    const regex = /^[A-Za-z/s]+$/; // Alows letters and spaces
    if (!regex.test(input.value.trim())) { // Checks if the input matches the regex
        showError(input, "Only letters are allowed."); // Displays an error message if invalid
        return false; // Returns false if invalid
    }
    clearError(input); // Clears any previous error messages
    return true; // Returns true if valid
}

// Function to validate email field
function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    if (!regex.test(email.value.trim())) { // Checks if the email matches the regex
        showError(email, "Please enter a valid email address."); // Displays an error message if invalid
        return false; // Returns false if invalid
    }
    clearError(email); // Clears any previous error messages
    return true; // Returns true if valid
}

// Function to validate message field and checks for minimum length
function validateMessage() {
    if (message.value.trim().length < 20) { // Checks if the message is at least 20 characters long
        showError(message, "Message must be at least 20 characters long."); // Displays an error message if invalid
        return false; // Returns false if invalid
    }
    clearError(message); // Clears any previous error messages
    return true; // Returns true if valid
}

// Character counter for message
// Updates character counter and color based on length
message.addEventListener("input", ()=> {
    const length = message.value.length; // Gets the current length of the message
    charCounter.textContent = `${length} / 20 characters`; // Updates the character counter text

    // Change color based on length
    if (length < 20) {
        charCounter.style.color = "red";
    }
    else {
        charCounter.style.color = "green";
    }
} );

// Form submit handler
// Validates the form on submission
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Validate all fields
    const valid =
        validateName(firstName) && // Validates first name
        validateName(lastName) && // Validates last name 
        validateEmail() && // Validates email
        validateMessage() && // Validates message
        subject.value.trim() !== ""; // Checks if subject is selected

    // Subject validation
    if (!subject.value) {
        showError(subject, "Please select a subject."); // Displays an error message if no subject is selected
    } else {
        clearError(subject); // Clears any previous error messages
    }

    // If all fields are valid, show success message
    if (valid) {
        successMessage.textContent = `Thank you ${firstName.value}! I will contact you soon!`; // Sets the success message text
        successMessage.style.display = "block"; // Displays the success message

        // Hide the success message after 3 seconds
        setTimeout(() => {
            successMessage.style.display = "none"; // Hides the success message
        }, 5000);

        // Reset the from and the character counter
        form.reset();
        charCounter.textContent = "0 / 20 characters"; // Reset character counter text
        charCounter.className = ""; // Reset character counter color
    }
} );

// Reset button handler
// Resets the form and clears all messages and styles
resetBtn.addEventListener("click", () => {
    form.reset(); // Resets the form fields
    successMessage.textContent = ""; // Clear success message text
    successMessage.style.display = "none"; // Hide success message

    // Reset character counter
    charCounter.textContent = "0 / 20 characters"; // Reset character counter text
    charCounter.className = ""; // Reset character counter color

    // Clear all error messages and styles
    document.querySelectorAll(".error-message").forEach((el) => { 
        el.style.display = "none" // Hide all error messages
    });
    document.querySelectorAll("input, textarea").forEach((el) => {
        el.classList.remove("error", "valid"); // Remove error and valid classes from all inputs and textareas
    });
});
