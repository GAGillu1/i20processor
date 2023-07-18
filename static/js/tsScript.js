// ----------------------------
// NAV BAR FUNCTIONALITY
function openTab(evt, tName) {
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
}

window.onload = () => {
  getNames("empNameDrop");
};
// ----------------------------
// ADD ROWS
var rowCount = 1;
function addRows() {
  let { value } = document.getElementById("rowsDrop");
  for (let i = 0; i < value; i++) {
    rowCount++;
    var table = document.getElementById("hoursTable");
    var row = table.insertRow(-1);
    var empCell = row.insertCell(0);
    var stTimeCell = row.insertCell(1);
    var endTimeCell = row.insertCell(2);
    var hoursCell = row.insertCell(3);
    var commentsCell = row.insertCell(4);
    empCell.innerHTML = `<select name="empName" class="col-span-2 rounded border border-black py-2"  onclick="updateActiveRow(${rowCount})"> ${
      document.getElementById("empNameDrop").innerHTML
    } </select>`;
    stTimeCell.innerHTML = `<input class="rounded-sm border border-black p-1" type="datetime-local" name="startTime" id="startTime${rowCount}"  onclick="updateActiveRow(${rowCount})" onchange="validateEndTime(${rowCount})"/>`;
    endTimeCell.innerHTML = `<input class="rounded-sm border border-black p-1" type="datetime-local" name="endTime" id="endTime${rowCount}" onclick="updateActiveRow(${rowCount})" onchange="validateEndTime(${rowCount})"/>`;
    hoursCell.innerHTML = `<input class="rounded-sm border border-black p-1" type="number" step="0.01" name="hours" id="hours${rowCount}"  style="width: 60px;" onclick="updateActiveRow(${rowCount})"/>`;
    commentsCell.innerHTML =
      `<input class="rounded-sm border border-black p-1" type="text" name="comments" style="width: 400px;" onclick="updateActiveRow(${rowCount})" />`;
      if (i === 0) {
        empCell.focus();
      }
    }
}
// ----------------------------
// DELETE ROW
function deleteRow() {
  var table = document.getElementById("hoursTable");
  if (table.rows.length > 2) {
    table.deleteRow(-1);
  }
}

// ----------------------------
// ----------------------------
// API REQUESTS - GENERAL
// ----------------------------
// ----------------------------
// GET - Name
async function getNames(id) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/getEmpNames");
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let { names } = xhr.response;
      let drop = document.getElementById(id);
      drop.innerHTML = `<option value="">Select Employee</option>`;
      names.forEach((item) => {
        let opt = document.createElement("option");
        opt.value = `${item}`;
        opt.innerHTML = `${item}`;
        drop.appendChild(opt);
      });
      document.getElementById("searchEmp").innerHTML =
        document.getElementById("empNameDrop").innerHTML;
    }
  };
}
// ----------------------------
// GET - STATUS
async function getStatus() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/status");
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let { Log } = xhr.response;
      let ulist = document.getElementById("sHoursBody");
      ulist.innerHTML = "";
      Log.forEach((emp) => {
        ulist.innerHTML += `<div
        class="flex items-center justify-between gap-4 border-b border-b-slate-300 px-4 py-2"
        id='${emp.Name}'
      >
        <p>${emp.Name}</p>
        <p>${emp.Hours}</p>`;
      });
    }
  };
}
// ----------------------------
// GET - LOGS
async function getLogs() {
  let xhr = new XMLHttpRequest();
  let apiUrl = "/log";
  let search = document.getElementById("searchEmp").value;
  if (search != "") apiUrl = apiUrl + "/" + search;
  xhr.open("GET", apiUrl);
  xhr.send();
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let { Log } = xhr.response;
      let ulist = document.getElementById("logsBody");
      ulist.innerHTML = "";
      Log.forEach((emp) => {
        ulist.innerHTML += `<div
        class="grid grid-cols-7 gap-4 border-b border-b-slate-300 px-4 py-2"
        id='${emp.Name}'
      >
        <p class="text-left">${emp.Name}</p>
        <p class="col-span-2">${emp.Stime}</p>
        <p class="col-span-2">${emp.Etime}</p>
        <p>${emp.Hours}</p>
        <p>${emp.Comments}</p>
        `;
      });
    } else if (xhr.readyState == 4 && xhr.status == 201)
      prompt(`No logs found for the employee!`, true);
    else prompt(`${xhr.status} Something went wrong!`, true);
  };
}

// ----------------------------
// POST - SUBMIT UPDATE
async function postUpdate(x) {
  out = outData(x);
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/submit", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(out));
  toggleBt();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      prompt("Timesheet updated Successfully!");
      toggleBt();
    } else {
      console.log("Error: " + xhr.status);
    }
  };
}
// ----------------------------
// SUBMIT UPDATE
function submitUpdate(x) {
  let formD = new FormData(document.getElementById("inputForm"));
  let namesList = formD.getAll("empName");
  let stTimeList = formD.getAll("startTime");
  let endTimeList = formD.getAll("endTime");
  let hoursList = formD.getAll("hours");
  for (i = 0; i < namesList.length; i++) {
    if (namesList[i] == "") {
      alert(`Employee not selected row ${i + 1}!`);
      return;
    } else if (stTimeList[i] == "") {
      alert(`Start Time not selected row ${i + 1}!`);
      return;
    } else if (endTimeList[i] == "") {
      alert(`End Time not selected row ${i + 1}!`);
      return;
    } else if (hoursList[i] == "") {
      alert(`Hours not selected in row ${i + 1}!`);
      return;
    }
  }
  postUpdate(x);
}
// ----------------------------
// RETURN FORM DATA
function outData(x) {
  var jsonData = {};
  let formD = new FormData(document.getElementById("inputForm"));
  let namesList = formD.getAll("empName");
  let stTimeList = formD.getAll("startTime");
  let endTimeList = formD.getAll("endTime");
  let hoursList = formD.getAll("hours");
  let commentsList = formD.getAll("comments");
  if (x == 1) {
    for (let i = 0; i < hoursList.length; i++) hoursList[i] = -hoursList[i];
  }
  jsonData["empNames"] = namesList;
  jsonData["stList"] = stTimeList;
  jsonData["etList"] = endTimeList;
  jsonData["hoursList"] = hoursList;
  jsonData["commentsList"] = commentsList;
  return jsonData;
}
// ----------------------------
// PROMPT
function prompt(txt, isBad = false) {
  let msg = document.getElementById("msg");
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
// VALIDATE TIME
function validateEndTime(x) {
  const sT = document.getElementById(`startTime${x}`);
  const eT = document.getElementById(`endTime${x}`);
  const startTime = new Date(sT.value);
  const endTime = new Date(eT.value);

  if (eT.value === "" || sT.value === "") {
    return;
  } else {
    const diff = (endTime - startTime) / (1000 * 60 * 60);
    if (diff <= 0) {
      alert("End time must be after start time!");
      eT.value = "";
    } else {
      const hours = document.getElementById(`hours${x}`);
      hours.value = diff;
      ``;
    }
  }
}
// ----------------------------
// UPDATE HOURS
function updateHours(x) {
  const date = new Date();
  const sT = document.getElementById(`startTime${activeRow}`);
  const eT = document.getElementById(`endTime${activeRow}`);
  const hours = document.getElementById(`hours${activeRow}`);
  sT.value = date.toISOString().slice(0, 10) + "T08:30";
  eT.value =
    date.toISOString().slice(0, 10) + "T" + `${8 + Math.abs(x)}` + ":30";
  hours.value = x;
}
// ----------------------------
// UPDATE ACTIVE ROW
var activeRow = 1;
function updateActiveRow(x) {
  console.log("active row:",activeRow);
  activeRow = x;
}

// ----------------------------
// TOGGLE BUTTON
function toggleBt(){
  bt =  document.getElementById('submitBt');
  if (bt.disabled){
    bt.disabled = false;
  }else { bt.disabled = true; }
}

