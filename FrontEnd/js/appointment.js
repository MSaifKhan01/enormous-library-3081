document.querySelector(".button-btn").addEventListener("click", function (e) {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  if (!userId && !token) {
    alert("You Are Not Login, Please Login First");
    window.location.href = "./login.html";
  }
  e.preventDefault();
  const date = document.querySelector('input[placeholder="MM/DD/YYYY"]').value;
  const time = document.querySelector('input[type="time"]').value;

  const doctorId = localStorage.getItem("AppointmentByDoctorID");

  fetch("http://localhost:3000/appointment/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token, // Pass the token here
    },
    body: JSON.stringify({
      UserID: userId,
      DoctorID: doctorId,
      AppointmentDate: date,
      AppointmentTime: time,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error:", error);
    });
});
