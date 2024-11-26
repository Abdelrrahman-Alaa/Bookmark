var sweetAlert = document.getElementById("sweetAlert");
var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkSiteInput = document.getElementById("bookmarkSite");
var updateBookmarkIndex;
var bookmarks = [];

if (localStorage.getItem("bookmarks") != null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmark(bookmarks);
}

function addBookmark() {
  if (checkValidity()) {
    var bookmark = {
      name: bookmarkNameInput.value,
      url: bookmarkSiteInput.value,
    };

    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmark(bookmarks);
    removeValidity();
    clearForm();
  } else {
    Swal.fire({
      title: "Site Name or Url is not valid, Please follow the rules below :",
      html: "<p>Site name must contain at least 3 characters</p><p>Site URL must be a valid one</p>",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

function displayBookmark(array) {
  var cartoona = ``;
  if (array.length === 0) {
    document.getElementById(
      "cartoona"
    ).innerHTML = `<p >No Bookmarks found.</p>`;
    return;
  } else {
    for (let index = 0; index < array.length; index++) {
      cartoona += `
     <tr>
       <td>${index}</td>
       <td>${array[index].name}</td>
       <td>
       <a
         href="http://${array[index].url}"
         target="_blank"
         rel="noopener noreferrer"
        >
         <button class="btn btn-visit btn-warning" data-index="${index}">
           <i class="fa-solid fa-eye pe-2"></i>Visit
         </button>
        </a>
       </td>
       <td>
         <button onclick="removeBookmark(${index})" class="btn btn-delete pe-2 btn-danger" data-index="${index}">
           <i class="fa-solid fa-trash-can"></i>
           Delete
         </button>
       </td>
     </tr>`;
    }
  }
  document.getElementById("cartoona").innerHTML = cartoona;
}

function clearForm() {
  bookmarkNameInput.value = "";
  bookmarkSiteInput.value = "";
}

function removeBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmark(bookmarks);
}

function validateForm(element) {
  var regex = {
    bookmarkName: /^[a-zA-Z0-9]{3,}$/,
    bookmarkSite: /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,}(\/[^\s]*)?$/,
  };

  if (element.value.trim() === "") {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return;
  }

  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

function checkValidity() {
  if (
    bookmarkNameInput.classList.contains("is-valid") &&
    bookmarkSiteInput.classList.contains("is-valid")
  ) {
    return true;
  } else {
    return false;
  }
}

function removeValidity() {
  bookmarkNameInput.classList.remove("is-valid");
  bookmarkSiteInput.classList.remove("is-valid");
}

function visitBookmark(index) {
  updateBookmarkIndex = index;

  bookmarks[index].name = productNameInput.value;
  bookmarks[index].price = productPriceInput.value;
}
