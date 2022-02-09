function check() {
  let jwt = localStorage.getItem("jwt");
  console.log(jwt);

  if (jwt == null) {
    location.href = "loginPage.html";
  }
}

check();

function init() {
  // collapsible section

  let coll = document.getElementsByClassName("collapsible");
  let i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      var content = this.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }

  // toggleMenu

  let navBtn = document.getElementById("navBtn");
  let menu = document.getElementById("menu");

  navBtn.addEventListener("click", function () {
    toggleMenu();
  });

  function toggleMenu() {
    menu.classList.toggle("nav-active");
  }

  // tabLinks
  let tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].addEventListener("click", function () {
      openCity(event);
    });
  }

  function openCity(evt) {
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";
  }

  /******** refreshWithFetch *************/
  /*
  const poemList = document.getElementsByClassName("tablinks")[0];
  const tabContent = document.getElementsByClassName("tabcontent")[0];

  poemList.onclick = showPoemList;

  function showPoemList() {
    fetch("../index2.html")
      .then(res => res.text())
      .then(data => (tabContent.innerHTML = data));
    //.catch( err => console.error(err));
  }
  */
}

init();
