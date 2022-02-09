// Add new poem

function init() {
  /*** for init Calender ***/
  kamaDatepicker("test-date-id", {
    buttonsColor: "red",
    forceFarsiDigits: true,
    placeholder: "انتخاب تاریخ انقضا",
    markToday: true,
    highlightSelectedDay: true
  });

  kamaDatepicker("test-date-id2", {
    buttonsColor: "red",
    forceFarsiDigits: true,
    placeholder: "انتخاب تاریخ انتشار",
    markToday: true,
    highlightSelectedDay: true
  });

  /*************** Modal ****************/
  document.getElementById("myBtn").onclick = showModal;

  function showModal() {
    let modal = document.getElementById("myModal");
    let close = document.getElementsByClassName("close")[0];
    let modalDialog = document.getElementsByClassName("modal-dialog")[0];

    modal.style.display = "block";
    modal.classList.add("active-modal");

    close.onclick = closeModal;

    function closeModal() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.srcElement == modal) {
        modal.style.display = "none";
      }
    };
  }

  /****************** Send data *******************/

  let sendBtn = document.getElementById("send");
  sendBtn.addEventListener("click", getData);

  function getData() {
    let poemTitle = document.getElementById("poem-title");
    let poemText = document.getElementById("poem-text");
    let poetName = document.querySelectorAll(
      ".poems-list .select2-selection__choice"
    );
    let poetTitles = [];
    let tagName = document.querySelectorAll(".tag .select2-selection__choice");
    let publishState = document.querySelectorAll(".publish-state #show");
    let viewType = document.querySelectorAll(
      ".viewType .select2-selection__rendered"
    );
    let format = document.querySelectorAll(
      ".format .select2-selection__rendered"
    );
    let book = document.querySelectorAll(".book .select2-selection__rendered");
    let option = document.querySelectorAll(".book option");

    // get selected value in datePicker
    let d = new Date($("#test-date-id").val());
    day = d.getDate();
    month = d.getMonth() + 1;
    year = d.getFullYear();
    let expirationDate = [year, month, day].join("/");

    let now = new Date($("#test-date-id2").val());
    day = now.getDate();
    month = now.getMonth() + 1;
    year = now.getFullYear();
    let releaseDate = [year, month, day].join("/");

    // Convert persian to miladi

    let AD_expirationDate = moment
      .from(expirationDate, "fa", "YYYY/M/D HH:mm")
      .format("YYYY-M-D HH:mm:ss");

    let AD_releaseDate = moment
      .from(releaseDate, "fa", "YYYY/M/D HH:mm")
      .format("YYYY-M-D HH:mm:ss");

    /************************** poets item **************************/
    for (i = 0; i < poetName.length; i++) {
      poetTitles.push(poetName[i].title);
    }

    /************************** tags item **************************/
    let tags = Array.from(tagName);
    let TagTitles = tags.map(item => item.title);

    /************************** _id for book **************************/
    let myBook = Array.from(option);
    let result;
    let id = myBook.map(Book => {
      if (Book.selected) {
        result = Book.dataset["id"];
      }
    });

    /************************** isPublished item **************************/

    console.log(poetTitles);
    console.log(publishState[0].checked);
    console.log(TagTitles);
    console.log(expirationDate);
    console.log(releaseDate);
    console.log(AD_expirationDate);
    console.log(AD_releaseDate);
    console.log(viewType[0].title);
    console.log(format[0].title);
    console.log(book[0].title);
    console.log(result);

    fetch("/manage/api/v1/poem", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        title: poemTitle.value,
        hemistichs: poemText.value.split("\n"),
        poets: poetTitles,
        tags: TagTitles,
        viewType: viewType[0].title,
        format: format[0].title,
        book: {
          _id: result,
          name: book[0].title
        },
        publishOn: AD_releaseDate,
        expireOn: AD_expirationDate,
        isPublished: publishState[0].checked
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));

    /********* Clear input *********/
  }
}

init();
