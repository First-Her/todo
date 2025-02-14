const inputTextName = document.getElementById("inputName");
const inputTelephone = document.getElementById("inputTelephone");
const selectJob = document.getElementById("mySelect");
const btnCreate = document.getElementById("createBtn");
const blockMainContainer = document.getElementById("main-container");
let nameCard = "";
let phoneСard = "";
let selectCard = "";
let editIndex = null;

const dataStringLs = localStorage.getItem("users");
const dataLs = JSON.parse(dataStringLs);

let dataCard = [];
if (dataLs) {
  dataCard = dataLs;
}

function render() {
  blockMainContainer.innerHTML = "";
  let id = 0;
  dataCard.forEach((item) => {
    const newCard = document.createElement("div");
    newCard.id = id++;
    switch (item.job) {
      case "qa":
        newCard.className = "green-card";
        break;
      case "developer":
        newCard.className = "green-card";
        break;
      case "admin":
        newCard.className = "red-card";
        break;
      case "devops":
        newCard.className = "yellow-card";
        break;
    }

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const editingButton = document.createElement("img");
    editingButton.src = "images/icons8-редактировать.svg";
    editingButton.className = "editor";
    editingButton.addEventListener("click", () => {
      const inputName = document.createElement("input");
      inputName.value = item.name;
      const inputPhone = document.createElement("input");
      inputPhone.type = "tel";
      inputPhone.value = item.phone;
      inputPhone.addEventListener("input", (event) => {
        inputPhone.value = inputPhone.value.replace(/\D/g, "");
      });

      const selectJobEdit = document.createElement("select");
      ["qa", "developer", "admin", "devops"].forEach((job) => {
        const option = document.createElement("option");
        option.value = job;
        option.textContent = job.charAt(0).toUpperCase() + job.slice(1);
        if (job === item.job) option.selected = true;
        selectJobEdit.appendChild(option);
      });

      const saveButton = document.createElement("button");
      saveButton.innerText = "Сохранить";
      saveButton.addEventListener("click", () => {
        item.name = inputName.value;
        item.phone = inputPhone.value;
        item.job = selectJobEdit.value;
        localStorage.setItem("users", JSON.stringify(dataCard));
        render();
      });

      newCard.innerHTML = "";
      newCard.appendChild(inputName);
      newCard.appendChild(inputPhone);
      newCard.appendChild(selectJobEdit);
      newCard.appendChild(saveButton);

      const deleteButton = document.createElement("img");
      deleteButton.src = "images/icons8-удалить.svg";
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", () => {
        dataCard.splice(newCard.id, 1);
        localStorage.setItem("users", JSON.stringify(dataCard));
        render();
      });
      buttonContainer.appendChild(deleteButton);
      newCard.appendChild(buttonContainer);
    });

    buttonContainer.appendChild(editingButton);
    newCard.appendChild(buttonContainer);

    const textName = document.createElement("p");
    textName.innerText = `Имя: ${item.name}`;
    newCard.appendChild(textName);
    const textPhone = document.createElement("p");
    textPhone.innerText = `Телефон: ${item.phone}`;
    newCard.appendChild(textPhone);
    const textSelect = document.createElement("p");
    textSelect.innerText = `Должность: ${item.job}`;
    newCard.appendChild(textSelect);
    const extensionDate = document.createElement("p");
    extensionDate.innerText = `Дата: ${item.date}`;
    newCard.appendChild(extensionDate);

    const deleteButton = document.createElement("img");
    deleteButton.src = "images/icons8-удалить.svg";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => {
      dataCard.splice(newCard.id, 1);
      localStorage.setItem("users", JSON.stringify(dataCard));
      render();
    });
    buttonContainer.appendChild(deleteButton);
    newCard.appendChild(buttonContainer);

    blockMainContainer.appendChild(newCard);
  });
}
render();

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
  const date = new Date();
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

  const user = {
    name: nameCard,
    phone: phoneСard,
    job: selectCard,
    date: formattedDate,
  };
  if (editIndex !== null) {
    dataCard[editIndex] = user;
    editIndex = null;
  } else {
    dataCard.push(user);
  }

  localStorage.setItem("users", JSON.stringify(dataCard));
  render();
});
