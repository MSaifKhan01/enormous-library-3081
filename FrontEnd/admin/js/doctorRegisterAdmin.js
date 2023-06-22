// Get the form element
const form = document.querySelector('form');

// Add an event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from submitting

  // Get the input values
  const doctorName = document.querySelector('input[name="doctorName"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const gender = document.querySelector('input[name="gender"]').value;
  const city = document.querySelector('input[name="city"]').value;
  const state = document.querySelector('input[name="state"]').value;
  const language = document.querySelector('input[name="language"]').value;
  const totalExperience = document.querySelector('input[name="totalExperience"]').value;
  const degree = document.querySelector('input[name="degree"]').value;
  const speciality = document.querySelector('input[name="speciality"]').value;
  const imageLink = document.querySelector('input[name="imageLink"]').value;
  const about = document.querySelector('input[name="about"]').value;
  const password = document.querySelector('input[name="password"]').value;

  // Create a requestBody object with the doctor details
  const requestBody = {
    name: doctorName,
    email: email,
    Gender: gender,
    City: city,
    State: state,
    Language: language,
    Experience: totalExperience,
    Degree: degree,
    Specialty: speciality,
    Image: imageLink,
    password: password,
    About : about,
    approved : true
  };



  // Send a POST request to the API
  fetch('http://localhost:3000/doctorRegister', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response from the API
    console.log(data); // You can customize this part to handle the API response as needed
    // Display a success message (you can customize this)
    alert('Doctor added successfully!');
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  });

  // Clear the form inputs
//   form.reset();
});
