// window.addEventListener("load", () => {
  let LoggedName = localStorage.getItem("userName");
  console.log(LoggedName);
  let signedInName = document.getElementById("username");

  signedInName.innerText = `Welcome ${LoggedName}`

  let logoutBtn = document.getElementById("logoutBtn")

  if(LoggedName){
    logoutBtn.innerHTML = `
    <span>
    <a href="#" onClick="Logout()" class="p-0 text-dark">Logout</a>
 </span>
    `
}else if(LoggedName==null){
    signedInName.innerText = `Welcome To HealCare`
}
function Logout(){
    localStorage.clear()
    // window.location.href("./index.html")
    location.reload();
}
// })
//   let signupBtn = document.getElementById("signUpBtn");
//   let logout = document.getElementById("logOutBtn");

//   const urlParams = new URLSearchParams(window.location.search);
//   const room = urlParams.get("name");
//   console.log(room);

//   if (room !== null) {
//     signedInName.textContent = `${room}`;

//     logout.style.display = "inline-block";
//   } else if (LoggedName) {
//     signedInName.textContent = `${LoggedName}`;

//     logout.style.display = "inline-block";
//   } else {
//     window.location.href = "./login.html";
//     signedInName.textContent = "";

//     logout.style.display = "none";
//   }

//   logout.addEventListener("click", () => {
//     // localStorage.removeItem("LoggedName")
//     localStorage.clear();
//     window.location.href = "./login.html";

//     room = null;
//     signedInName.textContent = "";

//     logout.style.display = "none";
//     logout();

//     logout.style.display = "none";
//   });
// });

// async function logout(){
//     let result = await fetch("https://prickly-dove-knickers.cyclic.app/user/logout")
//     alert(result.msg)
//     console.log(result.msg)
// }

// function logout() {
//   fetch("https://beige-swordfish-wear.cyclic.app/user/logout")
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res);
//       alert(res.msg);
//       console.log(res.msg);
//     });
// }
