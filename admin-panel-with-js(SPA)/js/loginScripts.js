function init() {
  let btn = document.getElementById("btn");

  btn.addEventListener("click", function(event) {
    document.body.className = "loading";
    validationUsername();
    validationPassword();

    event.preventDefault();

    fetch("http://185.120.220.213/auth/loginwithuserpass", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
      })
    })
      .then(res => {
        console.log(res.status);

        if (!res.ok) {
          // consol.log(res.status);
          document.body.className = "";
          return;
        }
        res.json().then(data => {
          console.log(data);
          localStorage.setItem(
            "jwt",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkY…DE5fQ.rIwdoP0m1p6SSozwoasa9M8VYS-rLiOrA1VWPLAeSWo"
          );
          document.body.className = "";
          location.href = "index.html";
        });
      })
      .catch(err => console.log(err));
  });

  function validationUsername() {
    let username = document.getElementById("username").value;

    if (username == "" || username != "mohsen") {
      document.getElementById("demo1").innerHTML =
        ".نام کاربری به درستی وارد نشده است";
      document.getElementById("demo1").style.color = "red";
      document.querySelectorAll(".material-icons")[0].style.color = "red";
      document.querySelectorAll("span")[0].style.top = "20%";
    } else {
      document.getElementById("demo1").innerHTML = "";
      document.getElementById("demo1").style.color = "transparent";
      document.querySelectorAll(".material-icons")[0].style.color = "#008900";
    }
  }

  function validationPassword() {
    let password = document.getElementById("password").value;

    if (password == "" || password != "mohsen") {
      document.getElementById("demo2").innerHTML =
        ".رمز عبور به درستی وارد نشده است";
      document.getElementById("demo2").style.color = "red";
      document.querySelectorAll(".material-icons")[1].style.color = "#FF1A10";
      document.querySelectorAll("span")[1].style.top = "20%";
    } else {
      document.getElementById("demo2").innerHTML = "";
      document.getElementById("demo2").style.color = "transparent";
      document.querySelectorAll(".material-icons")[1].style.color = "#008900";
    }
  }
}

init();
