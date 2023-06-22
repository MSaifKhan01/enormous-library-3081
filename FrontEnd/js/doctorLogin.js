document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/doctor/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("login Sucessfull");
        let idString = data.id;
        localStorage.setItem("doctorId",idString);
        window.location.href="./DoctorCheck.html"
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
