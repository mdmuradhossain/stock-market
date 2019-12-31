//Display Time
var timeDisplay = document.getElementById("time");

function displayTime() {
  var dateString = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Dhaka"
  });
  var formattedString = dateString.replace(", ", " - ");
  timeDisplay.innerHTML = formattedString;
}

setInterval(displayTime, 1000);

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["10.30", "11.30", "12.30", "1.30", "3.30", "5.30"],
    datasets: [{
      label: "Market",
      data: [5467, 1967, 3465, 87567, 53678, 30976],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(153, 102, 255, 0.2)"
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(153, 102, 255, 0.2)"
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

function filterSearch() {
  var input = document.getElementById("scom");
  var filter = input.value.toUpperCase();
  var table = document.getElementById("myTable");
  var tr = table.getElementsByTagName("tr");

  for (var i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      var txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// Retrieve Data from json
document.getElementById("getCompanies").addEventListener("click", getCompanies);

function getCompanies() {
  fetch("../resources/company.json")
    .then(res => res.json())
    .then(data => {
      let output = "";
      data.forEach(company => {
        output += `
         <tr class="table-primary">
           <td>${company.code}</td>
           <td>${company.name}</td>
           <td>${company.price}</td>
           <td>${company.change}</td>
         </tr>
           `;
        // console.log(company);
      });
      document.getElementById("output").innerHTML = output;
    });
}

//Sort the Table
let companies;
let asc1 = 1;
let asc2 = 1;
let asc3 = 1;

window.onload = function () {
  companies = document.getElementById("companies");
};

function sortTable(tbody, col, asc) {
  let rows = tbody.rows,
    rlen = rows.length,
    arr = new Array(),
    i,
    j,
    cells,
    clen;

  for (i = 0; i < rlen; i++) {
    cells = rows[i].cells;
    clen = cells.length;
    arr[i] = new Array();
    for (j = 0; j < clen; j++) {
      arr[i][j] = cells[j].innerHTML;
    }
  }

  arr.sort(function (a, b, c) {
    return a[col] == b[col] ? 0 : a[col] > b[col] ? asc : -1 * asc;
  });

  for (i = 0; i < rlen; i++) {
    rows[i].innerHTML = "<td>" + arr[i].join("</td> <td>") + "</td>";
  }
}


// Get the modal
var modal = document.getElementById("myModal");

var btn = document.getElementById("btnOne");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let btnTwo = document.getElementById("btnTwo").addEventListener("click", function () {
  modal.style.display = "block";
})
//Form validation
const userName = document.getElementById("inputUser");
const password = document.getElementById("inputPassword");
const alertUser = document.getElementById("validateUser");
const alertPassword = document.getElementById("validatePassword");

const formSubmit = document.getElementById("formSubmit");

formSubmit.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault(e);
  validateForUser();
  validateForPassword();

  setTimeout(function () {
    alertUser.style.display = 'none';
    alertPassword.style.display = 'none';
  }, 2000);
}

function validateForUser() {

  if (userName.value == "" || userName.value == null) {
    alertUser.style.display = 'block';
    alertUser.innerHTML = "Name should not be blank";
    return false;
  }
  if (userName.value.length < 3) {
    alertUser.style.display = 'block';
    alertUser.innerHTML = "Name should be at least 3 characters long";
    return false;
  }
  if (userName.value.charAt(0) !== userName.value.charAt(0).toUpperCase()) {

    alertUser.style.display = 'block';
    alertUser.innerHTML = "Name should start with Capital letter";

    return false;
  } else {

    console.log("Your Name is: " + userName.value);

  }
}

function validateForPassword() {
  const validate = new RegExp("^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]);{2,}).{8,}$");
  if (password.value == "" || password.value == null) {
    alertPassword.style.display = 'block';
    alertPassword.innerText = "Password should not be blank";
    return false;
  } else if (!validate.test(password.value)) {
    alertPassword.style.display = 'block';
    alertPassword.innerText = "Password at least 8 characters long & should have at least 2 numbers"
  } else {
    console.log("Your password is: " + password.value);

  }

}


document.getElementById('getEmployee').addEventListener('click', getEmployees);

function getEmployees() {
  fetch('http://localhost:8080/api/employees')
    .then((res) => res.json())
    .then((data) => {
      let output = '';
      data.forEach((employee) => {
        output += `
           <tr>
            <td>${employee.id}</td>
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.email}</td>
           </tr>`;
      });
      document.getElementById('outputtt').innerHTML = output;
    })
}