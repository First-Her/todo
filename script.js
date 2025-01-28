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
  const newCard = document.createElement("div");
  const date = new Date();
  newCard.className = "green-card";

  const textDate = date
    .toLocaleString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(",", "");

  const parts = textDate.split(" ");
  const dateParts = parts[0].split(".");
  const timeParts = parts[1].split(":");

  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]} ${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`;

  if (selectCard === "qa" || selectCard === "developer") {
    newCard.className = "green-card";
  } else if (selectCard === "admin") {
    newCard.className = "red-card";
  } else if (selectCard === "devops") {
    newCard.className = "yellow-card";
  }

  const textName = document.createElement("p");
  textName.innerText = `Имя: ${nameCard}`;
  newCard.appendChild(textName);
  const textPhone = document.createElement("p");
  textPhone.innerText = `Телефон: ${phoneСard}`;
  newCard.appendChild(textPhone);
  const textSelect = document.createElement("p");
  textSelect.innerText = `Должность: ${selectCard}`;
  newCard.appendChild(textSelect);
  const extensionDate = document.createElement("p");
  extensionDate.innerText = `Дата: ${formattedDate}`;
  newCard.appendChild(extensionDate);

  blockMainContainer.appendChild(newCard);
});
