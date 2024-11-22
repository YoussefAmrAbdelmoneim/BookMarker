var productNameInput = document.getElementById("name");
var productUrlInput = document.getElementById("url");
var products = [];
if (localStorage.getItem("productContainer") !== null) {
  products = JSON.parse(localStorage.getItem("productContainer"));
  display();
}
function productSum() {
  if (nameValidation() && urlValidation()) {
    var product = {
      name: productNameInput.value,
      url: productUrlInput.value,
    };
    products.push(product);
    localStorage.setItem("productContainer", JSON.stringify(products));
    display();
    clearForm();
  } else {
    Swal.fire({
      icon: "error",
      title: "Site Name or URL is not valid, Please follow the rules below:",
      html: ` <p>Site name must contain at least 3 characters.</p> <p>Site URL must be a valid one.</p> `,
    });
  }
}
function display() {
  var cartona = "";
  for (var i = 1; i < products.length; i++) {
    cartona += `<tr>
        <td>${i}</td>
        <td>${products[i].name}</td>
        <td><button class="btn btn-lemon" onclick="visit(${i})"><i class="fa-solid fa-eye me-2"></i>Visit</button></td>
        <td><button class="btn btn-del" onclick="Delete(${i})"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
       </tr>`;
  }
  document.getElementById("content").innerHTML = cartona;
}
function clearForm() {
  productNameInput.value = null;
  productUrlInput.value = null;
  productNameInput.classList.remove("is-valid");
  productUrlInput.classList.remove("is-valid");
}
function Delete(index) {
  products.splice(index, 1);
  localStorage.setItem("productContainer", JSON.stringify(products));
  display();
}
function nameValidation() {
  var item = productNameInput.value;
  var regex = /^[a-z]{3,}$/i;
  if (regex.test(item)) {
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
    return true;
  } else {
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
    return false;
  }
}
function urlValidation() {
  var item = productUrlInput.value;
  var regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm;
  if (regex.test(item)) {
    productUrlInput.classList.add("is-valid");
    productUrlInput.classList.remove("is-invalid");
    return true;
  } else {
    productUrlInput.classList.add("is-invalid");
    productUrlInput.classList.remove("is-valid");
    return false;
  }
}
function visit(index) {
  var URL = products[index].url;
  open(URL);
}
