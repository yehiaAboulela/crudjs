"use strict";
const productName = document.getElementById("productName");
const productCatigory = document.getElementById("productCatigory");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");

const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("search");
const tableBody = document.getElementById("tableBody");

const nameAlert = document.getElementById("nameAlert");
const priceAlert = document.getElementById("priceAlert");
let arr = [];

const pushToArr = function () {
  if (validationName() && validationPrice()) {
    let info = {
      name: productName.value,
      catigory: productCatigory.value,
      price: productPrice.value,
      desc: productDescription.value,
    };
    arr.push(info);

    localStorage.setItem("products", JSON.stringify(arr));
  }
};
const clearInputs = function () {
  productName.value = "";
  productCatigory.value = "";
  productPrice.value = "";
  productDescription.value = "";
};
const display_SearchLogic = function () {
  let cartoona = ``;

  arr.forEach((cur, index) => {
    if (
      Object.values(cur)
        .join()
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      let curProduct = `
          <tr>
          <td>${index}</td>
          <td>${cur.name}</td>
          <td>${cur.catigory}</td>
          <td>${cur.price}</td>
          <td>${cur.desc}</td>
          <td><button class="delete" id="delete">delete</button>
          <button class="update" id="update">update</button></td>
          </tr>
          `;
      cartoona += curProduct;
    }
  });
  tableBody.innerHTML = cartoona;
};
const deleteProduct = function (e) {
  let productIndex = e.target.closest("tr").children[0].innerHTML;
  arr.splice(Number(productIndex), 1);
};

if (localStorage.getItem("products")) {
  arr = JSON.parse(localStorage.getItem("products"));
  display_SearchLogic();
}

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  //create------------
  pushToArr();

  clearInputs();
  display_SearchLogic();
});
tableBody.addEventListener("click", (e) => {
  //delete-----------
  if (e.target.classList.contains("delete")) {
    deleteProduct(e);
    localStorage.setItem("products", JSON.stringify(arr));
    display_SearchLogic();
  }

  //update-----------
  if (e.target.classList.contains("update")) {
    deleteProduct(e);
    productName.value = e.target.closest("tr").children[1].innerHTML;
    productCatigory.value = e.target.closest("tr").children[2].innerHTML;
    productPrice.value = e.target.closest("tr").children[3].innerHTML;
    productDescription.value = e.target.closest("tr").children[4].innerHTML;
    localStorage.setItem("products", JSON.stringify(arr));
    display_SearchLogic();
  }
});

//validation.....
function validationName() {
  let text = productName.value;
  const regexName = /^[A-Z][a-z]{3,8}$/;
  if (regexName.test(text)) {
    productName.classList.remove("is-invalid");
    productName.classList.add("is-valid");
    nameAlert.classList.add("d-none");
    return true;
  } else {
    productName.classList.remove("is-valid");
    productName.classList.add("is-invalid");

    nameAlert.classList.remove("d-none");
    return false;
  }
}

function validationPrice() {
  let price = productPrice.value;
  const regexPrice = /^\d/;
  if (regexPrice.test(price)) {
    productPrice.classList.remove("is-invalid");
    productPrice.classList.add("is-valid");
    priceAlert.classList.add("d-none");
    return true;
  } else {
    productPrice.classList.remove("is-valid");
    productPrice.classList.add("is-invalid");

    priceAlert.classList.remove("d-none");
    return false;
  }
}
