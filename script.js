const inputTextName = document.getElementById("inputName");
const inputTelephone = document.getElementById("inputTelephone");
const selectJob = document.getElementById("mySelect");
const btnCreate = document.getElementById("createBtn");
const blockMainContainer = document.getElementById("main-container");
let nameCard = "";
let phoneСard = "";
let selectCard = "";

inputTextName.addEventListener("input", (event) => {
  nameCard = event.target.value;
});

inputTelephone.addEventListener("input", (event) => {
  phoneСard = event.target.value;
});

inputTelephone.addEventListener("keydown", (event) => {
  if (event.key === "e") {
    event.preventDefault();
  } else if (event.key === "+") {
    event.preventDefault();
  } else if (event.key === "-") {
    event.preventDefault();
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
  } else if (event.key === ".") {
    event.preventDefault();
  } else if (event.key === ",") {
    event.preventDefault();
  }
});

selectJob.addEventListener("input", (event) => {
  selectCard = event.target.value;
});

btnCreate.addEventListener("click", () => {
  console.log(nameCard, phoneСard, selectCard);
  const newCard = document.createElement("div");
  newCard.className = "red-card";

  const textName = document.createElement("p");
  textName.innerText = `Имя: ${nameCard}`;
  newCard.appendChild(textName);
  const textPhone = document.createElement("p");
  textPhone.innerText = `Телефон: ${phoneСard}`;
  newCard.appendChild(textPhone);
  const textSelect = document.createElement("p");
  textSelect.innerText = `Должность: ${selectCard}`;
  newCard.appendChild(textSelect);

  blockMainContainer.appendChild(newCard);
});
