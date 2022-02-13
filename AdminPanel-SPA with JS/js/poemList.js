// Poems list

/*function init() {
  
  for (i = 0; i < status.length; i++) {
    status[i].style.fontSize = "11px";

    if (status[i].innerHTML.trim() === "????? ???") {
      status[i].style.backgroundColor = "#3ac47d";
    } else {
      status[i].style.backgroundColor = "#d92550";
    }
  }
  //Pagination
  let pageLink = document.getElementsByClassName("page-link");

  for (i = 0; i < pageLink.length; i++) {
    pageLink[i].addEventListener("click", function() {
      activeLink(this);
    });
  }


  
}*/

// init();
/************************/
let totalCount;
let pageNo = 1;
function getUrl(page = 1) {
  return (
    "http://management.montaghem.com/manage/api/v1/poem?page=" +
    (page - 1) +
    "&size=14&sortBy=_id&order=asc"
  );
}

function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      totalCount = data.totalCount;
      loadDataIntoTable(data);
    })
    .catch((err) => console.log(err));
}

function loadDataIntoTable(data) {
  const settings =
    '<a href="#" style="margin-right: 5px;"><i class="flaticon-pencil-black-tool-interface-symbol"></i></a><a href="#"><i class="flaticon-dustbin"></i></a>';
  let poems = [];

  data["items"].forEach((item) => {
    poems.push({
      publishState: item.isPublished,
      book: item.book,
      poets: item.poets,
      title: item.title,
      image: item.imageId,
    });
  });
  let tableBody = document.querySelectorAll(".poem-list")[0];

  let result = poems
    .map(
      (poem) => `<tr class="poems-data">
      <td>${settings}</td>
      <td>${poem.publishState ? poem.publishState : "-"}</td>
      <td>${poem.book ? poem.book.name : "-"}</td>
      <td>${poem.poets ? poem.poets[0].name : "-"}</td>
      <td>${poem.title}</td>
      <td><img src=${poem.image ? poem.image : "images/photo.png"}></td></tr>`
    )
    .join("\n");

  tableBody.innerHTML = result;

  /************* Pagination ***********/

  let paginator = pagination.create("search", {
    prelink: "/",
    rowsPerPage: 14,
    current: pageNo,
    totalResult: data.totalCount,
  });

  let html = paginator.render();
  let temp = document.getElementById("pagination");

  temp.innerHTML = html;

  //console.log(temp);
  //console.log(paginator);

  let pageNumber = document.querySelectorAll(".paginator a");

  const click = function (btn) {
    //console.log(pageNumber);

    event.preventDefault();
    if (Number.isInteger(+btn.target.text)) {
      pageNo = +btn.target.text;
    } else if (btn.target.text === "Next") {
      pageNo++;
    } else {
      pageNo--;
    }

    url = getUrl(pageNo);
    getData(url);
  };

  for (i = 0; i < pageNumber.length; i++) {
    pageNumber[i].href = "";
    pageNumber[i].onclick = click;
  }
}

function init() {
  const url = getUrl();
  getData(url);
}

init();
