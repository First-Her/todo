const inputTextName = document.getElementById("inputName");
let nameCard = "";
const inputTelephone = document.getElementById("inputTelephone");
let phoneСard = "";
const selectJob = document.getElementById("mySelect");
let selectCard = "";
const btnCreate = document.getElementById("createBtn");

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
});
