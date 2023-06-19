import { alertMsg } from "../js/components/alertmsg.component.js";
function registerUser(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the form values
  const form = document.getElementById("registration-form");
  const name = form[0].value;
  const gender = form[1].value;
  const email = form[2].value;
  const mobileNumber = form[3].value;
  const password = form[4].value;

  // Regex pattern for password validation (at least 8 characters, containing at least one uppercase letter, one lowercase letter, and one digit)
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  // Check if the password matches the regex pattern
  if (!passwordRegex.test(password)) {
    // Password does not meet the required pattern
    console.error("Invalid password");
    alert("invalid Password")
    return;
  }

  // Create the request body
  const requestBody = {
    name: name,
    Gender: gender,
    email: email,
    Phone: mobileNumber,
    password: password,
  };

  // Make a POST request to the signup API
  fetch("http://localhost:3000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the API
      console.log(data);
      if (data.msg === "Registration successful") {
        // Registration successful, display success alert
        alertMsg(`${name} registered successfully`, "success");
        setTimeout(() => {
          window.location.href = "./login.html";
        }, 1000);
        // Redirect to a success page or perform any other action
      } else if (data.msg === "User already exists") {
        // User already exists, display already exist alert
        alert("User already exists");
        // Perform any alternative action or show an error message to the user
      } else {
        // Handle other response scenarios as needed
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the API request
      console.error("Registration Error:", error);
    });
}

// Add event listener to register button
const registerButton = document.querySelector(
  '#registration-form button[type="submit"]'
);
registerButton.addEventListener("click", registerUser);
