const inputTextName = document.getElementById("inputName");
const inputTelephone = document.getElementById("inputTelephone");
const selectJob = document.getElementById("mySelect");
const btnCreate = document.getElementById("createBtn");
const blockMainContainer = document.getElementById("main-container");
let nameCard = "";
let phoneСard = "";
let selectCard = "";
let editIndex = null;
let editJob = ["qa", "developer", "admin", "devops"];
btnCreate.disabled = true;

function fieldChecking() {
  if (nameCard.length > 0 && phoneСard.length === 11 && selectCard.length > 0) {
    btnCreate.disabled = false;
  } else {
    btnCreate.disabled = true;
  }
};

let dataCard = [];

async function getData() {
  fetch("http://localhost:8080/task/all", {
    method: "Get"
  }).then((response) => response.json()).then((res) => {
    dataCard = res;
    render()
    console.log(res, "res")
  }).catch((error) => console.log(error, "error"))
}
getData();


async function postData(user) {
  fetch("http://localhost:8080/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => getData())
    .catch((e) => console.log(e));
}

async function deleteData(id) {
  console.log(id)
  fetch(`http://localhost:8080/task/${id}`, {
    method: "DELETE",
  })
    .then((res) => getData())
    .catch((e) => console.log(e));
};



function render() {
  blockMainContainer.innerHTML = "";
  let id = 0;
  dataCard.forEach((item) => {
    console.log(item)
    const newCard = document.createElement("div");
    newCard.id = id++;
    switch (item.jobPosition) {
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
      const originalItem = { ...item };
      const inputName = document.createElement("input");
      inputName.value = item.name;
      const inputPhone = document.createElement("input");
      inputPhone.type = "number";
      inputPhone.value = item.phone;
      inputPhone.addEventListener("keydown", (event) => {
        if (event.key === "e" || event.key === "E") {
          event.preventDefault();
        }
      });

      const nameContainer = document.createElement("div");
      const labelName = document.createElement("label");
      labelName.textContent = "Имя:";
      labelName.htmlFor = "inputName";
      nameContainer.className = "input-name";
      nameContainer.appendChild(labelName);
      nameContainer.appendChild(inputName);

      const phoneContainer = document.createElement("div");
      const labelPhone = document.createElement("label");
      labelPhone.textContent = "Телефон:";
      labelPhone.htmlFor = "inputPhone";
      phoneContainer.className = "input-phone";
      phoneContainer.appendChild(labelPhone);
      phoneContainer.appendChild(inputPhone);

      const selectJobEdit = document.createElement("select");
      editJob.forEach((jobPosition) => {
        const option = document.createElement("option");
        option.value = jobPosition;
        option.textContent = jobPosition.charAt(0).toUpperCase() + jobPosition.slice(1);
        if (jobPosition === item.jobPosition) option.selected = true;
        selectJobEdit.appendChild(option);
      });

      const selectContainer = document.createElement("div");
      const labelSelectJobEdit = document.createElement("label");
      labelSelectJobEdit.textContent = "Должность:";
      labelSelectJobEdit.htmlFor = "inputSelectJobEdit";
      selectContainer.className = "input-select";
      selectContainer.appendChild(labelSelectJobEdit);
      selectContainer.appendChild(selectJobEdit);

      const cancellation = document.createElement("img");
      cancellation.src = "images/icons8-отмена.svg";
      cancellation.className = "cancellation-button";
      cancellation.addEventListener("click", () => {
        item.name = originalItem.name;
        item.phone = originalItem.phone;
        item.jobPosition = originalItem.jobPosition;
        localStorage.setItem("users", JSON.stringify(dataCard));
        render();
      });

      const saveButton = document.createElement("img");
      saveButton.src = "images/icons8-ок.svg";
      saveButton.className = "save-button";
      saveButton.addEventListener("click", () => {
        item.name = inputName.value;
        item.phone = inputPhone.value;
        item.jobPosition = selectJobEdit.value;
        localStorage.setItem("users", JSON.stringify(dataCard));
        render();
      });

      newCard.innerHTML = "";
      newCard.appendChild(nameContainer);
      newCard.appendChild(phoneContainer);
      newCard.appendChild(selectContainer);
      newCard.appendChild(saveButton);
      newCard.appendChild(cancellation);
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
    textSelect.innerText = `Должность: ${item.jobPosition}`;
    newCard.appendChild(textSelect);
    const extensionDate = document.createElement("p");
    extensionDate.innerText = `Дата: ${item.createDate}`;
    newCard.appendChild(extensionDate);

    const deleteButton = document.createElement("img");
    deleteButton.src = "images/icons8-удалить.svg";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => {
      deleteData(item.id);
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
  fieldChecking();
});


inputTelephone.addEventListener("input", (event) => {
  phoneСard = event.target.value;
  fieldChecking();
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
  fieldChecking();
});


btnCreate.addEventListener("click", () => {
  btnCreate.disabled = true;

  const user = {
    name: nameCard,
    phone: phoneСard,
    jobPosition: selectCard,
  };

  render();
  postData(user);

  inputTextName.value = "";
  inputTelephone.value = "";
  selectJob.value = "Должность";
});





// URL - http://localhost:8080/task/${1}
// method: "DELETE"
// headres: вроде ниче нет
// body - нет

// В пост запросе ты передавал данные через body, тут ты познакомишься с передачей данных через query
// тут еще проще, они формируются в самом урле
// То есть по урлу если кликнул по карточке с id = 1, то урл должен выглядеть так http://localhost:8080/task/1