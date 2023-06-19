const SingleContainer = document.getElementById("Single-Container");

const doctorId = sessionStorage.getItem("selectedDoctorId");

console.log(doctorId);
let SingleGlobel = [];
function GetSingleDoc() {
  fetch(`http://localhost:3000/doctor/GetSingleDoctor/${doctorId}`)
    .then((res) => res.json())
    .then((data) => {
      SingleGlobel.push(data.doctor);
      console.log(SingleGlobel);
      displaySingleDoc(SingleGlobel);
      console.log(data.doctor);
    })
    .catch((error) => console.log(error));
}

GetSingleDoc();

function displaySingleDoc(data) {
  let displaydata = data.map((item) => {
    return `
        <div class="col-lg-8 col-md-12 col-sm-12 col-12">
               <div class="blog-single-main-page">
                  <div class="blog-box p-0">
                     <div class="img-icon">
                        <img src=${item.Image} alt="img">
                     </div>
                     <div class="blog-content">
                        <h3 class="p-0">${item.name}
                        </h3>
                        <span>${item.Specialty}</span>
                        <p>${item.About}</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                           been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                           galley of type and scrambled it to make a type specimen book.</p>
                        <p>It has survived not only five centuries, but also the leap into electronic typesetting,
                           remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and
                           typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                           c1500s. When an unknown printer took a galley of type and scrambled it to make a type
                           specimen book. It has survived not only five centuries, but also the leap into electronic
                           typesetting, remaining essentially unchanged.</p>
                        <div class="quote-sec">
                           <p>" The Education of Tomorrow, Rooted in Tradition Invite You
                              Learning Management System"
                           </p>
                           <h6>- by ${item.name}</h6>
                           <img src="images/quote.png" alt="img">
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-lg-4 col-md-12 col-sm-12 col-12">
               <div class="right-section2">
                  <div class="form-section m-0">
                     <h6>Open Hour</h6>
                     <ul class="d-flex justify-content-between">
                        <li>
                           <ul>
                              <li>Monday :</li>
                              <li>Tuesday :</li>
                              <li>Wednesday :</li>
                              <li>Tuesday :</li>
                              <li>Thursday :</li>
                              <li>Friday :</li>
                              <li>Saturday :</li>
                           </ul>
                        </li>
                        <li>
                           <ul>
                              <li>08.00 - 10.00</li>
                              <li>08.00 - 10.00</li>
                              <li>08.00 - 10.00</li>
                              <li>08.00 - 10.00</li>
                              <li>08.00 - 10.00</li>
                              <li>08.00 - 10.00</li>
                              <li>08.00 - 10.00</li>
                           </ul>
                        </li>
                     </ul>
                  </div>
                  <div class="mt-25 form-section">
                     <h6>Consult</h6>
                     <div class="consult-wrap">
                        <div class="consult">
                           <div>
                              <i class="fas fa-phone"></i>
                           </div>
                           <div>
                              <h5>Call Us 24/7</h5>
                              <span>+80 (234) 123 567 12</span>
                           </div>
                        </div>
                        <div class="consult">
                           <div>
                              <i class="fas fa-envelope"></i>
                           </div>
                           <div>
                              <h5>Email</h5>
                              <span>aimee@gmail.com</span>
                           </div>
                        </div>
                        <div>
                        <a onclick="storeAppointmentByDoctorID(event, '${item.id}')" href="appoinment.html" class="button-btn mt-4">Book an Appointment
                        <span><i class="fas fa-angle-double-right"></i></span>
                        </a>
                        </div>
                     </div>
                  </div>          
                  <div class="form-section mt-25">
                     <h6>Location</h6>
                     <div style="width: 100%"><iframe height="350"
                           src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><a
                           href="https://www.maps.ie/draw-radius-circle-map/"></a></div>
                     </div>
                  <div class="form-section social">
                     <h6>Social Media</h6>
                     <ul class="d-flex justfiy-content-start align-items-center p-4">
                        <li><a href="javascript:;"><i class="fab fa-facebook-f icon-color"></i></a></li>
                        <li><a href="javascript:;"><i class="fab fa-twitter icon-color"></i></a></li>
                        <li><a href="javascript:;"><i class="fab fa-instagram icon-color"></i></a></li>
                        <li><a href="javascript:;"><i class="fab fa-pinterest-p icon-color"></i></a></li>
                     </ul>
                  </div>
               </div>
            </div>

        `;
  });
  SingleContainer.innerHTML = displaydata.join("");
}

function storeAppointmentByDoctorID(event, id) {
  event.preventDefault();

  // Store the id in sessionStorage as "AppointmentByDoctorID"
  localStorage.setItem("AppointmentByDoctorID", id);
  console.log(id);
  // Redirect to the appoinment.html page
  window.location.href = "appoinment.html";
}
