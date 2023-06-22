// // Assuming you have the necessary form fields and their IDs defined
// const form = document.getElementById('doctor-registration-form');
// const submitButton = document.querySelector('button[type="submit"]');

// form.addEventListener('submit', (e) => {
//   e.preventDefault(); // Prevent form submission

//   // Get form field values
//   const name = document.getElementById('name').value;
//   const email = document.getElementById('email').value;
//   const gender = document.getElementById('gender').value;
//   const city = document.getElementById('city').value;
//   const state = document.getElementById('state').value;
//   const language = document.getElementById('language').value;
//   const phone = document.getElementById('phone').value;
//   const experience = document.getElementById('experience').value;
//   const degree = document.getElementById('degree').value;
//   const speciality = document.getElementById('speciality').value;
//   const image = document.getElementById('image').files[0]; // Assuming single file upload
//   const about = document.getElementById('about').value;

//   // Create form data object
//   const formData = new FormData();
//   formData.append('name', name);
//   formData.append('email', email);
//   formData.append('gender', gender);
//   formData.append('city', city);
//   formData.append('state', state);
//   formData.append('language', language);
//   formData.append('phone', phone);
//   formData.append('experience', experience);
//   formData.append('degree', degree);
//   formData.append('speciality', speciality);
//   formData.append('image', image);
//   formData.append('about', about);

//   // Make the POST request
//   fetch('http://localhost:3000/doctorRegister', {
//     method: 'POST',
//     body: formData,
//   })
//     .then(response => response.json())
//     .then(data => {
//       // Handle response data if needed
//       console.log(data);
//     })
//     .catch(error => {
//       // Handle error if needed
//       console.error(error);
//     });
// });

// Assuming you have the necessary form fields and their IDs defined
const form = document.getElementById('doctor-registration-form');
const submitButton = document.querySelector('button[type="submit"]');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission

  // Get form field values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const gender = document.getElementById('gender').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const language = document.getElementById('language').value;
  const phone = document.getElementById('phone').value;
  const experience = document.getElementById('experience').value;
  const degree = document.getElementById('degree').value;
  const speciality = document.getElementById('speciality').value;
  const image = document.getElementById('image').value; // Assuming single file upload
  const about = document.getElementById('about').value;
  const password = document.getElementById('password').value;

  // Create request body object
  const requestBody = {
    name: name,
    email: email,
    Gender: gender,
    City: city,
    State: state,
    Language: language,
    Phone: phone,
    Experience: experience,
    Degree: degree,
    Specialty: speciality,
    Image: image,
    password :password,
    About: about
  };


  console.log(requestBody);
  // Make the POST request
  fetch('http://localhost:3000/doctor/Register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => response.json())
    .then(data => {
      // Handle response data if needed
      console.log(data);
      alert("Doctor registered successfully");
      window.location.href = "./doctorLogin.html";
    })
    .catch(error => {
      // Handle error if needed
      console.error(error);
      alert('An error occurred while registering the doctor. Please try again.');
    });
});
