const firtName = document.getElementById("firtName");
const lastName = document.getElementById("lastName");
const birthDay = document.getElementById("birthDay");
const nationalCode = document.getElementById("nationalCode");
const status = document.getElementById("status");

const btnAdd = document.getElementById("btnAdd");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");
const sortByFirstName = document.getElementById("sortByFirstName");
const sortByNationalCode = document.getElementById("sortByNationalCode");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let editingPerson;

/******** Add person *********/
const add = () => {
  if (
    firstName.value != "" ||
    lastName.value != "" ||
    birthDay.value != "" ||
    nationalCode.value != "" ||
    status.value != ""
  ) {
    let person = document.createElement("tr");
    person.onclick = function () {
      selectRow(this);
    };

    let fNameCell = document.createElement("td");
    fNameCell.innerHTML = firstName.value;

    let lNameCell = document.createElement("td");
    lNameCell.innerHTML = lastName.value;

    let brithDayCell = document.createElement("td");
    brithDayCell.innerHTML = birthDay.value;

    let codeCell = document.createElement("td");
    codeCell.innerHTML = nationalCode.value;

    let statusCell = document.createElement("td");
    statusCell.innerHTML = status.value;

    person.appendChild(fNameCell);
    person.appendChild(lNameCell);
    person.appendChild(brithDayCell);
    person.appendChild(codeCell);
    person.appendChild(statusCell);

    document.getElementById("tablebody").appendChild(person);

    firstName.value = "";
    lastName.value = "";
    birthDay.value = "";
    nationalCode.value = "";
    status.value = "";
  }
};

btnAdd.addEventListener("click", add);

/******** select person ********/
const selectRow = (element) => {
  editingPerson = element;

  let row = document.querySelectorAll("#tablebody tr");
  for (i = 0; i < row.length; i++) {
    row[i].style.backgroundColor = "";
  }

  element.style.backgroundColor = "#888";

  firstName.value = element.childNodes[0].innerHTML;
  lastName.value = element.childNodes[1].innerHTML;
  birthDay.value = element.childNodes[2].innerHTML;
  nationalCode.value = element.childNodes[3].innerHTML;
  status.value = element.childNodes[4].innerHTML;
};

/****** Edit person ******/
const edit = () => {
  editingPerson.childNodes[0].innerHTML = firstName.value;
  editingPerson.childNodes[1].innerHTML = lastName.value;
  editingPerson.childNodes[2].innerHTML = birthDay.value;
  editingPerson.childNodes[3].innerHTML = nationalCode.value;
  editingPerson.childNodes[4].innerHTML = status.value;
};

editBtn.addEventListener("click", edit);

/******* Delete person *******/
const deletePerson = () => {
  editingPerson.remove();
  firstName.value = "";
  lastName.value = "";
  birthDay.value = "";
  nationalCode.value = "";
  status.value = "";
};

deleteBtn.addEventListener("click", deletePerson);

/****** Sort by FirstName ******/
const sortByFName = () => {
  let tbody = document.getElementById("tablebody");
  let table = document.getElementById("personsTable");
  let rows = table.rows;
  let items = [];

  /* Loop through all table rows except the first which contains table headers */
  for (i = 1; i < rows.length; i++) {
    items.push({
      fName: rows[i].childNodes[0].innerHTML,
      lName: rows[i].childNodes[1].innerHTML,
      Age: rows[i].childNodes[2].innerHTML,
      NationalCode: rows[i].childNodes[3].innerHTML,
      Status: rows[i].childNodes[4].innerHTML,
    });
  }

  items.sort((a, b) => {
    let fNameA = a.fName.toUpperCase();
    let fNameB = b.fName.toUpperCase();

    if (fNameA < fNameB) {
      return -1;
    } else if (fNameA > fNameB) {
      return 1;
    } else {
      return 0;
    }
  });

  let result = items
    .map(
      (row) =>
        `<tr><td>${row.fName}</td><td>${row.lName}</td><td>${row.Age}</td><td>${row.NationalCode}</td><td>${row.Status}</td></tr>`
    )
    .join("\n");

  tbody.innerHTML = result;

  let row = document.querySelectorAll("#tablebody tr");
  for (i = 0; i < row.length; i++) {
    row[i].addEventListener("click", function () {
      selectRow(this);
    });
  }
};

sortByFirstName.addEventListener("click", sortByFName);

/*Sort by Age */
const sortByAge = () => {
  let tbody = document.getElementById("tablebody");
  let table = document.getElementById("personsTable");
  let rows = table.rows;
  let items = [];

  for (i = 1; i < rows.length; i++) {
    items.push({
      fName: rows[i].childNodes[0].innerHTML,
      lName: rows[i].childNodes[1].innerHTML,
      Age: rows[i].childNodes[2].innerHTML,
      NationalCode: rows[i].childNodes[3].innerHTML,
      Status: rows[i].childNodes[4].innerHTML,
    });
  }

  items.sort((a, b) => a.Age - b.Age);

  let result = items
    .map(
      (row) =>
        `<tr><td>${row.fName}</td><td>${row.lName}</td><td>${row.Age}</td><td>${row.NationalCode}</td><td>${row.Status}</td></tr>`
    )
    .join("\n");

  tbody.innerHTML = result;

  let row = document.querySelectorAll("#tablebody tr");
  for (i = 0; i < row.length; i++) {
    row[i].addEventListener("click", function () {
      selectRow(this);
    });
  }
};

sortByNationalCode.addEventListener("click", sortByAge);

/* Search Person */

const tableFilter = () => {
  let filter = searchInput.value.toUpperCase();

  let row = document.querySelectorAll("#tablebody tr");
  for (i = 0; i < row.length; i++) {
    let txtValue = row[i].innerText || row[i].textContent;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      row[i].style.display = "";
    } else {
      row[i].style.display = "none";
    }
  }
};

searchBtn.addEventListener("click", tableFilter);
