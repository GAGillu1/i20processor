// GLOBAL VARIABLES
var allTabs = ["loginT", "i20T", "adminT", "dsoT", "profileT"];
var adminTabs = ["i20T", "adminT", "dsoT", "profileT"];
var staffTabs = ["i20T", "dsoT", "profileT"];
var userTabs = ["profileT"];
var bannerArr = [
  "Add Sign:",
  "Split Failure:",
  "Total Files:",
  "Total Pages:",
  "Total Signatures:",
  "Index Error:",
  "Index Size:",
  "Index Msg:",
  "Missing Records:",
  "Sign Message:", 
  "Split Message",
  "Zip Message:",
];
// ----------------------------
// SESSION MANAGEMENT
// ----------------------------
window.onload = () => {
  let token = sessionStorage.getItem("token");
  let time = sessionStorage.getItem("time");
  if (token) {
    let tName = sessionStorage.getItem("tName");
    document.getElementById(tName).click();
    activeTabs();
  }
  if (time && (Date.now() - time >= (45 * 1000 * 60))) {
    prompt("Session Expired! Logging out.",true);
    setTimeout(() => logout(), 2000);    
  }
};
// ----------------------------
// LOGOUT USER
function logout() {
  sessionStorage.clear();
  window.location.reload();
}
// ----------------------------
// NAV BAR FUNCTIONALITY
function openTab(evt, tName, x = "") {
  var i, tabC, tabL;

  sessionStorage.setItem("tName", `${tName}T`);

  tabC = document.getElementsByClassName("tabC");
  for (i = 0; i < tabC.length; i++) {
    tabC[i].style.display = "none";
  }

  tabL = document.getElementsByClassName("tabL");
  for (i = 0; i < tabL.length; i++) {
    tabL[i].className =
      "tabL w-64 rounded bg-white p-3 hover:bg-blue-100 hover:transition hover:duration-500 disabled:opacity-70 disabled:hover:bg-white disabled:hover:text-black";
  }

  document.getElementById(tName).style.display = "block";
  evt.currentTarget.className =
    "tabL w-64 rounded-md bg-unhBlue p-3 text-white shadow-lg hover:text-yellow-300 hover:transition hover:duration-500 disabled:opacity-70 disabled:hover:bg-white disabled:hover:text-black";

  x !== "" ? getNames(x) : "";
}
// ----------------------------
// SESSION EXPIRED
function sessionexpired() {
  prompt("Session Expired, Logging out!");
  setTimeout(() => logout() , 3000);
}
// ----------------------------
// ----------------------------
// NAV HELPERS
// ----------------------------
// ----------------------------
// NAV BAR TOGGLE
function toggleNav() {
  document.getElementById("i20T").style.display === "none"
    ? activeTabs()
    : hideAllTabs();
}
// ----------------------------
// ROLE BASED TABS
function activeTabs() {
  document.getElementById("nav").classList.remove("invisible");
  document.getElementById("menuIconDiv").classList.remove("invisible");
  let role = sessionStorage.getItem("role");
  hideAllTabs();
  let x = [];
  switch (role) {
    case "ADMIN":
      x = adminTabs;
      break;
    case "STAFF":
      x = staffTabs;
      break;
    case "GA":
      document.getElementById("menuIconDiv").classList.toggle("invisible");
      x = userTabs;
      break;
  }
  for (let i of x) {
    document.getElementById(i).style.display = "block";
  }
}
// ----------------------------
// HIDE ALL TABS
function hideAllTabs() {
  for (let i of allTabs) document.getElementById(i).style.display = "none";
  let pOptions = document.getElementById("pOptionsDiv");
  if (!pOptions.classList.contains("hidden")) pOptions.classList.replace('flex', 'hidden');
}
// ----------------------------
// PROFILE OPTIONS
function profileOptions(id) {
  let divId = document.getElementById(id);
  if (divId.classList.contains('hidden'))
    divId.classList.replace("hidden", "flex");
  else
    divId.classList.replace("flex", "hidden");
}
// ----------------------------
// ----------------------------
// API REQUESTS - USER INFO
// ----------------------------
// ----------------------------
// POST - LOGIN
async function login(evt) {
  evt.preventDefault();
  const fD = new FormData(document.getElementById("loginForm"));
  let xhr = new XMLHttpRequest();
  let usr = fD.get("usr");
  let pwd = fD.get("pwd");
  let creds = `${usr}:${pwd}`;
  xhr.open("POST", "/login", true);
  xhr.setRequestHeader("Authorization", "Basic " + btoa(creds));
  xhr.send(null);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let role = xhr.getResponseHeader("role");
      let auth = xhr.getResponseHeader("authorization");
      let res = JSON.parse(xhr.response);
      prompt(res.message);
      sessionStorage.setItem("usr", usr);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("token", auth);
      sessionStorage.setItem("time", Date.now());
      setTimeout(() => sessionexpired(), 45*1000*60 );
      activeTabs();
      document.getElementById("i20T").click();
    } else if (xhr.readyState == 4 && xhr.status != 200) {
      prompt(xhr.responseText, true);
    }
  };
}
// ----------------------------
// POST - FORGOT PASSWORD
async function forgot() {
  const fD = new FormData(document.getElementById("loginForm"));
  let usrObj = { usr: fD.get("usr") };
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/forgot", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  if (usrObj.usr == "") {
    prompt("Please, enter your username!", true);
  } else {
    xhr.send(JSON.stringify(usrObj));
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) prompt(xhr.responseText);
        else if (xhr.status == 404) prompt(`Something went wrong!`, true);
        else prompt(`${xhr.responseText}`, true);
      }
    };
  }
}
// ----------------------------
// POST - SIGN UP
async function postAddUser(formId, apiurl) {
  const fD = new FormData(document.getElementById(formId));
  let xhr = new XMLHttpRequest();
  xhr.open("POST", apiurl, true);
  xhr.setRequestHeader("Authorization", sessionStorage.getItem("token"));
  xhr.send(fD);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        prompt(xhr.responseText);
        setTimeout(() => closeModal(), 2000);
      } else if (xhr.status == 404) prompt(`Something went wrong!`, true);
      else prompt(`${xhr.responseText}`, true);
    }
  };
}
// ----------------------------
// PUT - CHANGE PASSWORD
async function putChangePwd(formId, apiurl) {
  const fD = new FormData(document.getElementById(formId));
  let xhr = new XMLHttpRequest();
  xhr.open("PUT", apiurl, true);
  xhr.setRequestHeader("Authorization", sessionStorage.getItem("token"));
  xhr.send(fD);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        prompt(xhr.responseText);
        setTimeout(() => logout(), 2000);
      } else if (xhr.status == 404) prompt(`Something went wrong!`, true);
      else prompt(`${xhr.responseText}`, true);
    }
  };
}
// ----------------------------
// PUT - UPDATE USER
async function putUpdateUser(formId, apiurl) {
  const fD = new FormData(document.getElementById(formId));
  let xhr = new XMLHttpRequest();
  xhr.open("PUT", apiurl, true);
  xhr.setRequestHeader("Authorization", sessionStorage.getItem("token"));
  xhr.send(fD);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        prompt(xhr.responseText);
        setTimeout(() => closeModal(), 2000);
      } else if (xhr.status == 404) prompt(`Something went wrong!`, true);
      else prompt(`${xhr.responseText}`, true);
    }
  };
}
// ----------------------------
// DELETE - DELETE USER
async function deleteUser(usr) {
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", `/deleteuser/${usr}`);
  xhr.setRequestHeader("Authorization", sessionStorage.getItem("token"));
  xhr.send();
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      prompt(xhr.responseText);
      setTimeout(() => reload(), 2000);
    } else if (xhr.readyState == 4 && xhr.status != 200)
      prompt(`${xhr.status} Something went wrong!`, true);
  };
}
// ----------------------------
// ----------------------------
// API REQUESTS - GENERAL
// ----------------------------
// ----------------------------
// GET - DSO NAMES
async function getNames(id) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/getNames");
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let { names } = xhr.response;
      let drop = document.getElementById(id);
      drop.innerHTML = `<option value="">Select DSO</option>`;
      names.forEach((item) => {
        let opt = document.createElement("option");
        opt.value = `${item}`;
        opt.innerHTML = `${item}`;
        drop.appendChild(opt);
      });
    }
  };
}
// ----------------------------
// POST - SEND USER FILLED DATA
async function postFile(formName, apiUrl) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", apiUrl);
  xhr.responseType = "blob";
  xhr.setRequestHeader("Authorization", sessionStorage.getItem("token"));
  const fD = new FormData(document.getElementById(formName));
  xhr.send(fD);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      downloadFile(xhr.response, "i20's.zip");
      getResponse();
    } else if (xhr.readyState == 4 && xhr.status != 200) {
      prompt(`${xhr.status} Something went wrong!`, true);
    }
  };
}
// ----------------------------
// GET - RESPONSE FOR DATA
async function getResponse() {
  document.getElementById("modal").classList.replace("hidden", "flex");
  await fetch("/getResponse")
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      resDiv = document.getElementById("bData");
      let i = 0;
      for (const key in res) {
        let val = res[key];
        resDiv.innerHTML +=
          val == null || (Array.isArray(val) && val.length == 0)
            ? ""
            : `<p>${bannerArr[i]}</p><p>${res[key]}</p>`;
        i++;
      }
      resDiv.classList =
        "absolute z-20 grid w-1/2 grid-cols-2 gap-5 rounded-lg bg-gray-300 p-16 shadow";
      resDiv.innerHTML += `<div class="col-span-2 flex justify-center"><button onclick="closeModal()"
            class="bg-unhBlue text-center px-4 py-2 rounded m-1 text-white hover:text-yellow-300 hover:transition hover:duration-500 font-bold "
          >
            Close
          </button></div>`;
    })
    .catch((err) => console.log(err));
}
// ----------------------------
// GET - ALL USERS
async function getAllUsers() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/getallusers");
  xhr.setRequestHeader("Authorization", sessionStorage.getItem("token"));
  xhr.send();
  xhr.responseType = "json";
  let ulist = document.getElementById("ulist");
  ulist.innerHTML = "";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) allUsers(xhr.response.usr);
    else if (xhr.readyState == 4 && xhr.status != 200)
      prompt(`${xhr.status} Something went wrong!`, true);
  };
}
// ----------------------------
// GET - USER INFO
async function getUser(usr) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `/getUser/${usr}`);
  xhr.setRequestHeader("Authorization", sessionStorage.getItem("token"));
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) userModal(xhr.response);
    else if (xhr.readyState == 4 && xhr.status != 200)
      prompt(`${xhr.staus} Something went wrong!`, true);
  };
}
// ----------------------------
// POST - SIGN FORM
async function postSign(formId, apiurl) {
  const fD = new FormData(document.getElementById(formId));
  let xhr = new XMLHttpRequest();
  xhr.open("POST", apiurl, true);
  xhr.responseType = "blob";
  xhr.setRequestHeader("Authorization", sessionStorage.getItem("token"));
  xhr.send(fD);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        downloadFile(xhr.response, "i20.pdf");
        getResponse();
      } else if (xhr.status === 201) {
        downloadFile(xhr.response, "i20.zip");
        getResponse();
      } else if (xhr.status == 404) prompt(`Something went wrong!`, true);
      else prompt(`${xhr.status} Something went Wrong!`, true);
    }
  };
}
// ----------------------------
// ----------------------------
// FORM HANDLERS
// ----------------------------
// ----------------------------
// i20 FORM
function i20Form(evt, formId, apiurl, btn, drop, prog) {
  evt.preventDefault();
  signVal(drop, "DSO") &&
    signVal(prog, "Program") &&
    btDisable(btn) && prompt('Download starts soon!') &&
    postFile(formId, apiurl);
}
// ----------------------------
// DSO FORM
function dsoForm(evt, formId, apiurl, btn, dsoDrop) {
  evt.preventDefault();
  signVal(dsoDrop, "DSO") &&
    btDisable(btn) &&
    prompt("Download starts soon!") &&
    postSign(formId, apiurl);
}
// ----------------------------
// SIGNUP FORM
function addUserForm(evt, formId, apiUrl) {
  evt.preventDefault();
  pwdCheck()
    ? postAddUser(formId, apiUrl)
    : prompt("Please, Check your password!", true);
}
// ----------------------------
// UPDATE USER FORM
function updateUserForm(evt, formId, apiUrl, btn) {
  evt.preventDefault();
  btDisable(btn) && putUpdateUser(formId, apiUrl);
}
// ----------------------------
// SIGN FORM
function signForm(evt, formId, btn) {
  evt.preventDefault();
  let usr = sessionStorage.getItem('usr');
  btDisable(btn) && postSign(formId, `/addSign/${usr}`);
}
// ----------------------------
// CHANGE PASSWORD FORM
function changePwdForm(evt, formId, apiUrl, btn ) {
  evt.preventDefault();
  btDisable(btn) && putChangePwd(formId, apiUrl);
}
// ----------------------------
// ----------------------------
// FORM HELPERS
// ----------------------------
// ----------------------------
// PROMPT MESSAGE
function prompt(txt, isBad = false) {
  let id = document.getElementById("modal").classList.contains("hidden")
    ? "msg"
    : "msg2";
  let msg = document.getElementById(id);
  msg.classList.toggle("hidden");
  msg.textContent = txt;
  isBad
    ? msg.classList.replace("bg-green-500/70", "bg-red-500/70")
    : msg.classList.replace("bg-red-500/70", "bg-green-500/70");
  setTimeout(() => {
    msg.classList.toggle("hidden");
  }, 5000);
  return true;
}
// ----------------------------
// CHECK - DATA TO SLATE
function check() {
  let checked = document.getElementById(`i20toSlate`).value;
  let prog = document.getElementById(`i20progDiv`);
  if (checked == "y") {
    prog.style.display = "block";
    prog.innerHTML = `<div class="grid grid-cols-3 gap-4"><label for="program" id="i20progL"> Program</label>
    <select
    name="program"
    id="i20prog"
    class="border border-black rounded col-span-2"
  >
    <option value="">Select Program</option>
    <option value="ug">Under Graduate</option>
    <option value="g">Graduate</option>
    </select></div>`;
  } else {
    prog.style.display = "none";
    prog.innerHTML = "";
  }
}
// ----------------------------
// VALIDATES FILE FORMAT
function valFile(e, format) {
  let fileExt = e.value.split(".").pop();
  if (format !== fileExt) {
    e.value = "";
    alert(`Please, upload .${format} type files`);
  }
}
// ----------------------------
// DOWNLOAD THE ZIP FILE
function downloadFile(file, fName) {
  let a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);
  let url = window.URL.createObjectURL(file);
  a.href = url;
  a.download = fName;
  a.click();
  window.URL.revokeObjectURL(url);
}
// ----------------------------
// PROGRESS BAR FOR REQUEST
function pgBar() {
  let pgBar = document.getElementById("pgBar");
  pgBar.classList.replace("hidden", "grid");
  let child = pgBar.children;
  let sec = 3000;
  for (let i = 1; i < child.length; i++) {
    setTimeout(() => {
      child[i - 1].classList.toggle("rounded-r-full");
      child[i].classList.toggle("rounded-r-full");
      child[i].classList.toggle("invisible");
    }, sec);
    sec += 3000;
  }
}
// ----------------------------
// SIGN CHECK TOGGLE - DSO SIGN
function signCheck() {
  let sign = document.getElementById("dsoSign").checked;
  let div = document.getElementById("dsoSignDiv");
  if (sign) {
    div.innerHTML = `<label for="dsoName" >Select DSO:</label>
            <select
              id="dsoName"
              name="dsoName"
              class="dsoSign col-span-2 rounded border border-slate-900"
            >
              <option value="">Select Name</option>
            </select>`;
    getNames("dsoName");
  } else {
    div.innerHTML = "";
  }
}
// ----------------------------
// SIGN VALIDATION
function signVal(id, value) {
  let obj = document.getElementById(id);
  if (!obj) return true;
  if (obj.value == "") {
    alert(`Please, select a ${value}!`);
    return false;
  }
  return true;
}
// ----------------------------
// ALL USERS 
function allUsers(users) {
  users.forEach((user) => {
    ulist.innerHTML += `<div
        class="flex items-center justify-between gap-4 border-b border-b-slate-300 px-4 py-2"
        id='${user.username}'
      >
        <p>${user.fullname}</p>
        <div class="flex gap-4 items-center">
    ${
      user.role === "STAFF" || user.role === "ADMIN"
        ? `  <span class="group flex justify-center">
        <button
          class="rounded bg-unhBlue px-4 py-2 text-white shadow-lg hover:text-yellow-300 hover:transition hover:duration-500"
          onclick="addSign('${user.username}')"
          aria-label="Add signature"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            stroke-width="7"
            class="h-8 w-8"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M246.14551,154.87842c-1.24219-1.49072-22.92774-27.03711-59.82129-41.3501C184.21387,95.708,177.43262,79.4668,166.709,66.91113,151.6709,49.30566,129.98633,40,104,40,52.47559,40,18.89453,86.18408,17.49023,88.1499A8.00013,8.00013,0,0,0,30.50293,97.46C30.80078,97.04541,60.8125,56,104,56c21.16113,0,38.63867,7.36621,50.542,21.30273a69.15627,69.15627,0,0,1,14.69629,30.792A136.9288,136.9288,0,0,0,136,104c-26.06055,0-47.93848,6.80957-63.26758,19.69189-13.55957,11.39551-21.33691,27.27149-21.33691,43.55665a47.58841,47.58841,0,0,0,13.87207,34.05468C74.92871,210.918,88.32227,216,104,216c25.22266,0,46.68848-9.97607,62.0752-28.84961,12.21484-14.98291,19.65136-35.09668,20.79882-55.90185,29.38184,13.26708,46.73145,33.57617,46.98047,33.873a7.99987,7.99987,0,1,0,12.291-10.24316ZM104,200c-25.28613,0-36.60449-16.44922-36.60449-32.75146C67.39551,144.49219,88.86426,120,136,120a120.00113,120.00113,0,0,1,35.0293,5.27344c0,.10937.001.22021.001.32959C171.03027,162.57373,148.00586,200,104,200Z"
              ></path>
            </g>
          </svg>
        </button>
        <span
          class="pointer-events-none absolute mt-14 h-4 w-4 rounded-t-full bg-black opacity-0 duration-100 group-hover:opacity-100"
        ></span>
        <span
          class="pointer-events-none absolute mt-16 rounded-lg bg-black px-4 py-2 text-white opacity-0 duration-100 group-hover:opacity-100"
        >
          Add Signature
        </span>
      </span>`
        : ""
    }
            <span class="group flex justify-center">
        <button
          class="rounded bg-unhBlue px-4 py-2 text-white shadow-lg hover:text-yellow-300 hover:transition hover:duration-500"
          onclick="getUser('${user.username}')"
          aria-label="Update user"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="h-8 w-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
        <span
          class="pointer-events-none absolute mt-14 h-4 w-4 rounded-t-full bg-black opacity-0 duration-100 group-hover:opacity-100"
        ></span>
        <span
          class="pointer-events-none absolute mt-16 rounded-lg bg-black px-4 py-2 text-white opacity-0 duration-100 group-hover:opacity-100"
        >
          Update user
        </span>
      </span>
          <span class="group flex justify-center">
        <button
          class="flex items-end rounded bg-unhBlue px-4 py-2 font-bold text-white shadow-lg hover:text-yellow-300 hover:transition hover:duration-500"
          onclick="deleteUser('${user.username}')"
          aria-label="Delete user"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="h-8 w-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
        <span
          class="pointer-events-none absolute mt-14 h-4 w-4 rounded-t-full bg-black opacity-0 duration-100 group-hover:opacity-100"
        ></span>
        <span
          class="pointer-events-none absolute mt-16 rounded-lg bg-black px-4 py-2 text-white opacity-0 duration-100 group-hover:opacity-100"
        >
          Delete user
        </span>
      </span>
        </div>
      </div>`;
  });
}
// ----------------------------
// PASSWORD CHECK
function pwdCheck() {
  pwd = document.getElementById("npwd");
  cPwd = document.getElementById("ncPwd");
  return pwd.value == cPwd.value;
}
// ----------------------------
// DISABLE BUTTON
function btDisable(id = "") {
  id !== "" ? (document.getElementById(id).disabled = true) : "";
  return true;
}
// ----------------------------
// RELOAD
function reload() {
  let activeTab = sessionStorage.getItem("tName");
  let signWin = document.getElementById("newSign");
  if (signWin.style.display === "block") closeSignWindow(signWin);
  activeTab === "AdminT"
    ? document.getElementById(activeTab).click()
    : window.location.reload();
}
// ----------------------------
// ADD SIGNATURE
function addSign(usr) { 
  hideAllContent();
  document.getElementById('newSign').style.display = "block";
  document.getElementById('susr').value = usr;
  
}
// ----------------------------
// HIDE ALL CONTENT OF MAIN
function hideAllContent() {
  let tName = sessionStorage.getItem('tName');
  tName = tName.slice(0, tName.length - 1);
  document.getElementById('nav').style.display = "none";
  document.getElementById(tName).style.display = "none";
}
// ----------------------------
// CLOSES THE NEW PAGE OF SIGN
function closeSignWindow(signWin) {
  signWin.style.display = "none";
  document.getElementById("nav").style.display = "flex";
  document.getElementById('signFile').value = "";
  document.getElementById("aType").value = "";
  document.getElementById("signBt").disabled = false;
}
// ----------------------------
// ----------------------------
// MODAL HANDLERS
// ----------------------------
// ----------------------------
// MODAL DATA VARIABLES
let addUserMD = `
<button class="absolute -right-72 py-6" onclick="closeModal()">
<svg viewPort="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <line x1="1" y1="16" x2="16" y2="1" stroke="black" stroke-width="2" />
  <line x1="1" y1="1" x2="16" y2="16" stroke="black" stroke-width="2" />
</svg>
</button>
<h2 class="text-center text-5xl font-semibold text-unhBlue">Add New User</h2>
<form
id="signUpForm"
onsubmit="addUserForm(event,'signUpForm', '/signup')"
class="flex flex-col items-center gap-4 py-8"
>
<div class="">
  <label for="nusr">Username</label> <br />
  <input
    id="nusr"
    type="text"
    name="usr"
    class="focus:unhBlue rounded border border-black p-1 focus:outline-none focus:ring"
    required
  />
</div>
<div class="">
  <label for="nfName">Full Name</label> <br />
  <input
    id="nfName"
    type="text"
    name="fName"
    class="focus:unhBlue rounded border border-black p-1 focus:outline-none focus:ring"
    required
  />
</div>
<div class="">
  <label for="npwd">Password</label> <br />
  <input
    id="npwd"
    type="password"
    name="pwd"
    class="focus:unhBlue rounded border border-black p-1 focus:outline-none focus:ring"
    required
  />
</div>
<div class="">
  <label for="ncPwd">Confirm Password</label> <br />
  <input
    id="ncPwd"
    type="password"
    name="cPwd"
    class="focus:unhBlue rounded border border-black p-1 focus:outline-none focus:ring"
    required
  />
</div>
<div class="">
  <label for="email">Email</label> <br />
  <input
    id="email"
    type="email"
    name="email"
    class="focus:unhBlue rounded border border-black p-1 focus:outline-none focus:ring"
    required
  />
</div>
<div class="flex-none px-4">
  <label for="usrrole" class="mx-2">Role: </label>
  <select name="role" id="usrrole" class="rounded border border-black">
    <option value="GA">User</option>
    <option value="STAFF">Staff</option>
    <option value="ADMIN">Admin</option>
  </select>
</div>
<div class="flex-none">
  <button
    type="submit"
    class="m-1 mt-4 rounded bg-unhBlue px-4 py-2 text-center font-bold text-white hover:text-yellow-300 hover:transition hover:duration-500"
  >
    Register
  </button>
</div>
<section class="z-auto flex justify-center">
<div id="msg2" class="absolute hidden rounded bg-green-500/70 p-4 text-center text-black/80">
  <!-- JS -->
</div>
</section>
</form>`;
// ----------------------------
// ADD USER
function modalAddUser() {
  openModal();
  let div = document.getElementById("bData");
  div.classList = "absolute z-20 w-1/3 rounded-lg bg-slate-100 p-16 shadow ";
  div.innerHTML = addUserMD;
}
// ----------------------------
// USER INFO MODAL
function userModal(res) {
  console.log(res);
  let { email, name, fullName, role } = res;
  openModal();
  let div = document.getElementById("bData");
  div.classList = "absolute z-20 w-1/2 rounded-lg bg-slate-100 p-16 shadow";
  div.innerHTML = `
  <button class="absolute -right-72 py-6" onclick="closeModal()">
  <svg viewPort="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <line x1="1" y1="16" x2="16" y2="1" stroke="black" stroke-width="2" />
    <line x1="1" y1="1" x2="16" y2="16" stroke="black" stroke-width="2" />
  </svg>
  </button>
  <h2
          class="col-span-2 pb-6 text-center text-5xl font-semibold text-unhBlue"
        >
          Update User
        </h2>
  
        <form
          id="updateUserForm"
          onsubmit="updateUserForm(event, 'updateUserForm','/updateUser/${name}')"
          class="flex flex-col items-center gap-4 py-8"
        >
        <div class="">
        <label for="uusr">Username</label> <br />
        <input
          id="uusr"
          type="text"
          name="usr"
          value='${name}'
          class="focus:unhBlue rounded border border-black p-1 focus:outline-none focus:ring disabled:opacity-70"
          required
          disabled
        />
      </div>
      <div class="">
        <label for="ufName">Full Name</label> <br />
        <input
          id="ufName"
          type="text"
          name="fName"
          value='${fullName}'
          class="focus:unhBlue rounded border border-black p-1 focus:outline-none focus:ring"
          required
        />
      </div>
      <div class="">
        <label for="uemail">Email</label> <br />
        <input
          id="uemail"
          type="email"
          name="email"
          value='${email}'
          class="focus:unhBlue rounded border border-black p-1 focus:outline-none focus:ring"
          required
        />
      </div>
      <div class="flex-none px-4">
      <label for="usrrole" class="mx-2">Role: </label>
      <select name="role" id="usrrole" class="rounded border border-black">
        <option ${role === "GA" ? "selected" : ""} value="GA">User</option>
        <option ${
          role === "STAFF" ? "selected" : ""
        } value="STAFF">Staff</option>
        <option ${
          role === "ADMIN" ? "selected" : ""
        } value="ADMIN">Admin</option>
      </select>
    </div>
            <button
              type="submit"
              class="m-1 mt-4 rounded bg-unhBlue px-4 py-2 text-center font-bold text-white hover:text-yellow-300 hover:transition hover:duration-500"
            >
              Update
            </button>
          </div>
          <section class="z-auto flex justify-center">
          <div id="msg2" class="absolute hidden rounded bg-green-500/70 p-4 text-center text-black/80">
            <!-- JS -->
          </div>
        </section>
        </form>
  `;
}
// ----------------------------
// CHANGE PASSWORD
function changePwd() {
  let usr = sessionStorage.getItem("usr");
  openModal();
  let div = document.getElementById("bData");
  div.classList = "absolute z-20 w-1/2 rounded-lg bg-slate-100 p-16 shadow";
  div.innerHTML = `
  <button class="absolute -right-72 py-6" onclick="closeModal()">
  <svg viewPort="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <line x1="1" y1="16" x2="16" y2="1" stroke="black" stroke-width="2" />
    <line x1="1" y1="1" x2="16" y2="16" stroke="black" stroke-width="2" />
  </svg>
</button>
<h2 class="text-center text-5xl font-semibold text-unhBlue">Change Password</h2>
<form
  id="changePwdForm"
  onsubmit="changePwdForm(event,'changePwdForm', '/changePwd/${usr}', 'changePwdBt')"
  class="flex flex-col items-center gap-4 py-8"
>
  <div class="">
    <label for="nusr">Username</label> <br />
    <input
      id="nusr"
      type="text"
      name="usr"
      value="${usr}"
      class="focus:unhBlue rounded border border-black p-1 focus:outline-none focus:ring disabled:opacity-70"
      disabled
      required
    />
  </div>
  <div class="">
    <label for="cpwd">New Password</label> <br />
    <input
      id="cpwd"
      type="password"
      name="pwd"
      class="focus:unhBlue rounded border border-black p-1 focus:outline-none focus:ring"
      required
    />
  </div>
  <div class="">
    <label for="ccPwd">Confirm Password</label> <br />
    <input
      id="ccPwd"
      type="password"
      name="cPwd"
      class="focus:unhBlue rounded border border-black p-1 focus:outline-none focus:ring"
      required
    />
  </div>
  <div class="flex-none">
    <button
    id='changePwdBt'
      type="submit"
      class="m-1 mt-4 rounded bg-unhBlue px-4 py-2 text-center font-bold text-white hover:text-yellow-300 hover:transition hover:duration-500"
    >
      Change
    </button>
    <section class="z-auto flex justify-center">
    <div id="msg2" class="absolute hidden rounded bg-green-500/70 p-4 text-center text-black/80">
      <!-- JS -->
    </div>
  </section>
  </div>
</form>`;
}
// ----------------------------
// ----------------------------
// MODAL HELPERS
// ----------------------------
// ----------------------------
// OPEN MODAL
function openModal() {
  document.getElementById("modal").classList.replace("hidden", "flex");
}
// ----------------------------
// CLOSE MODAL
function closeModal() {
  document.getElementById("modal").classList.replace("flex", "hidden");
  document.getElementById("bData").classList = "";
  document.getElementById("bData").innerHTML = "";
  reload();
}
