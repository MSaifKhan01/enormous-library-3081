const MainDiv = document.getElementById("doctorContainer");

let globel = [];
function getWorkers() {
  fetch("http://localhost:3000/doctor/getDoctors")
    .then((res) => res.json())
    .then((data) => {
      globel = data.doctors;
      DisplayDoctor(data.doctors);
      console.log(globel);
    })
    .catch((error) => {
      console.log(error);
    });
}

getWorkers();

function DisplayDoctor(data) {
  let displayData = data.map((item) => {
    return `
        <div class="col-lg-4 col-md-6 col-sm-12 col-12" data-set="${item.id}">
          <div class="sb-founder-section pt-5">
            <img src="${item.Image}" alt="${item.name}" onclick="storeIdAndRedirect(event, '${item.id}')">
            <section>
              <div class="sb-service-section2 bg-change2">
                <a href="dr-single.html"><h6>${item.name}</h6></a>
                <p>${item.Specialty}</p>
              </div>
              <div class="hover-type">
              <a href="appoinment.html" class="d-inline-block w-100 text-center" onclick="storeAppointmentByDoctorID(event, '${item.id}')">
              Appointment
              </a>
              </div>
            </section>
          </div>
        </div>`;
  });
  MainDiv.innerHTML = displayData.join("");
}

function storeIdAndRedirect(event, id) {
  event.preventDefault();
  sessionStorage.setItem("selectedDoctorId", id);
  window.location.href = "./dr-single.html";
}

function storeAppointmentByDoctorID(event, id) {
  event.preventDefault();

  // Store the id in sessionStorage as "AppointmentByDoctorID"  if user click with dashbord
  localStorage.setItem('AppointmentByDoctorID', id);

  // Redirect to the appoinment.html page
  window.location.href = 'appoinment.html';
}

