import { alertMsg } from "../js/components/alertmsg.component.js";

function loginUser(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the form values
  const form = document.getElementById("login-form");
  const email = form[0].value;
  const password = form[1].value;

  // Create the request body
  const requestBody = {
    email: email,
    password: password,
  };

  // Make a POST request to the login API
  fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.msg === "login successful") {
        const token = data.token;
        const userName = data.name;
        const userId = data.id;
        console.log(token, userId, userName);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);

        alertMsg(`${userName} ${data.msg}`, "success");

        setTimeout(() => {
          window.location.href = "./index.html";
        }, 1000);
        // Redirect to the authenticated page or perform any other action
        console.log("Login successful");
      } else {
        console.log("Wrong credentials");
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the API request
      console.error("Login error:", error);
    });
}

// Add event listener to login button
const loginButton = document.querySelector('#login-form button[type="submit"]');
loginButton.addEventListener("click", loginUser);

// Function to handle logout
//  function logoutUser() {
//     // Get the token from localStorage or session storage
//     const token = localStorage.getItem('token');

//     // Make a POST request to the logout API
//     fetch('http://localhost:3000/logout', {
//        method: 'POST',
//        headers: {
//           'Content-Type': 'application/json'
//        },
//        body: JSON.stringify({ token: token })
//     })
//     .then(response => response.json())
//     .then(data => {
//        // Handle the response from the API
//        if (data.msg === 'Logout successful') {
//           // Remove the token from localStorage or session storage
//           localStorage.removeItem('token');
//           // Redirect to the login page or perform any other action
//           console.log('Logout successful');
//        } else {
//           console.log('Invalid token');
//        }
//     })
//     .catch(error => {
//        // Handle any errors that occurred during the API request
//        console.error('Logout error:', error);
//     });
//  }

// Call logout function when the logout button is clicked
//  const logoutButton = document.querySelector('#logout-button');
//  logoutButton.addEventListener('click', logoutUser);
