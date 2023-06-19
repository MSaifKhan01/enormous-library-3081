let doctorid = localStorage.setItem("doctorId", "1");
let id = localStorage.getItem("doctorId");

function FetchSingleDoc() {
  fetch("http://localhost:3000/doctor/getAppointments/" + id)
    .then((res) => res.json())
    .then((data) => displayDataInTable(data))
    .catch((error) => {
      console.error(error);
    });
}

function fetchDoctorInfo() {
  fetch("http://localhost:3000/doctor/GetSingleDoctor/" + id)
    .then((res) => res.json())
    .then((data) => displayDoctorInformation(data.doctor))
    .catch((error) => {
      console.error(error);
    });
}

function displayDoctorInformation(data) {
  let leftdata = document.getElementById("left-contaier-doc");
  let middledata = document.getElementById("middle-contaier-info");
  let date = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dayName = days[date.getDay()];
  let monthName = months[date.getMonth()];
  let day = date.getDate();
  let year = date.getFullYear();

  leftdata.innerHTML = `
        <img class="doc-img" src=${data.Image} alt="doctor" />
        <h3>${data.name}</h3>
        <div class="icon-email">
          <i class="fa-solid fa-envelope"></i>
          <h5 class="email">${data.email}</h5>
        </div>
    `;
  middledata.innerHTML = `
    <h1>${data.name}</h1>
              <p>Today is ${dayName}, ${day} ${monthName} ${year}</p>
    `;
}

function displayDataInTable(data) {
  const appointmentsDiv = document.querySelector("#appointmentsDiv");
  const approvedAppointmentsDiv = document.querySelector("#approved-clint");

  let pendingAppointmentsTable = `
          <table id="appointmentsTable">
              <thead>
                  <tr>
                      <th>Appointment ID</th>
                      <th>User ID</th>
                      <th>User Name</th>
                      <th>User Email</th>
                      <th>Appointment Date</th>
                      <th>Appointment Time</th>
                      <th>Status</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
      `;

  let approvedAppointmentsByDate = {};

  data.appointments.forEach((appointment) => {
    if (appointment.status === "pending") {
      pendingAppointmentsTable += `
              <tr>
                  <td>${appointment.AppointmentID}</td>
                  <td>${appointment.User.id}</td>
                  <td>${appointment.User.name}</td>
                  <td>${appointment.User.email}</td>
                  <td>${appointment.AppointmentDate}</td>
                  <td>${appointment.AppointmentTime}</td>
                  <td>${appointment.status}</td>
                  <td>
                      <i class="fa-solid fa-check" style="color: green;" onclick="updateStatus(${appointment.AppointmentID}, 'approved')"></i>
                      <i class="fa-solid fa-x" style="color: red;" onclick="deleteAppointment(${appointment.AppointmentID})"></i>
                  </td>
              </tr>
          `;
    } else if (appointment.status === "approved") {
      if (!approvedAppointmentsByDate[appointment.AppointmentDate]) {
        approvedAppointmentsByDate[appointment.AppointmentDate] = [];
      }
      approvedAppointmentsByDate[appointment.AppointmentDate].push(appointment);
    }
  });

  pendingAppointmentsTable += `
              </tbody>
          </table>
      `;

  let approvedAppointmentsHtml = "";
  for (let date in approvedAppointmentsByDate) {
    approvedAppointmentsHtml += `
            <div id="Dates">
                <p>${date}</p>
                <i id="toggleIcon" class="fa-solid fa-arrow-right fa-rotate-90"></i>
            </div>
            <table id="patientTable" class="patient-table">
                <tbody>
        `;
    approvedAppointmentsByDate[date].forEach((appointment) => {
      approvedAppointmentsHtml += `
                  <tr>
                      <td>${appointment.AppointmentTime}</td>
                      <td>${appointment.User.name}</td>
                      <td><button class="chat-button">Chat</button></td>
                  </tr>
              `;
    });
    approvedAppointmentsHtml += `
                </tbody>
            </table>
        `;
  }

  appointmentsDiv.innerHTML = pendingAppointmentsTable;
  approvedAppointmentsDiv.innerHTML = approvedAppointmentsHtml;
}

function updateStatus(appointmentID, status) {
  fetch("http://localhost:3000/appointment/" + appointmentID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: status,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      FetchSingleDoc(); // Refresh the data
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function deleteAppointment(appointmentID) {
  fetch("http://localhost:3000/appointment/" + appointmentID, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      FetchSingleDoc(); // Refresh the data
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
fetchDoctorInfo();
FetchSingleDoc();
