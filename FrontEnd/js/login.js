// Function to handle registration form submission
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
       console.error('Invalid password');
       alert('Invalid password Type');
       return;
    }
 
    // Create the request body
    const requestBody = {
       name: name,
       Gender: gender,
       email: email,
       Phone: mobileNumber,
       password: password
    };
 
    // Make a POST request to the signup API
    fetch('http://localhost:3000/RegisterUser', {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json'
       },
       body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
       // Handle the response from the API
       if (data.msg === 'Registration successful') {
          // Registration successful, display success alert
          alert('Registration successful');
          // Redirect to a success page or perform any other action
       } else if (data.msg === 'User already exists') {
          // User already exists, display already exist alert
          alert('User already exists');
          // Perform any alternative action or show an error message to the user
       } else {
          // Handle other response scenarios as needed
       }
    })
    .catch(error => {
        // Handle any errors that occurred during the API request
        console.error('Registration Error:', error);
     });
 }
 
 // Add event listener to register button
 const registerButton = document.querySelector('#registration-form button[type="submit"]');
 registerButton.addEventListener('click', registerUser);
 



 //Login Logic

 // Function to handle login form submission
// Function to handle login form submission
function loginUser(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Get the form values
    const form = document.getElementById("login-form");
    const email = form[0].value;
    const password = form[1].value;
    
    // Create the request body
    const requestBody = {
       email: email,
       password: password
    };
    
    // Make a POST request to the login API
    fetch('http://localhost:3000/login', {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json'
       },
       body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
       // Handle the response from the API
       if (data.msg === 'login successful') {
          const token = data.token;
          // Store the token in localStorage or session storage
          localStorage.setItem('token', token);
          // Redirect to the authenticated page or perform any other action
          console.log('Login successful');
       } else {
          console.log('Wrong credentials');
       }
    })
    .catch(error => {
       // Handle any errors that occurred during the API request
       console.error('Login error:', error);
    });
 }
 
 // Function to handle logout
 function logoutUser() {
    // Get the token from localStorage or session storage
    const token = localStorage.getItem('token');
    
    // Make a POST request to the logout API
    fetch('http://localhost:3000/logout', {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json'
       },
       body: JSON.stringify({ token: token })
    })
    .then(response => response.json())
    .then(data => {
       // Handle the response from the API
       if (data.msg === 'Logout successful') {
          // Remove the token from localStorage or session storage
          localStorage.removeItem('token');
          // Redirect to the login page or perform any other action
          console.log('Logout successful');
       } else {
          console.log('Invalid token');
       }
    })
    .catch(error => {
       // Handle any errors that occurred during the API request
       console.error('Logout error:', error);
    });
 }
 
 // Add event listener to login button
 const loginButton = document.querySelector('#login-form button[type="submit"]');
 loginButton.addEventListener('click', loginUser);
 
 // Call logout function when the logout button is clicked
 const logoutButton = document.querySelector('#logout-button');
 logoutButton.addEventListener('click', logoutUser);
 