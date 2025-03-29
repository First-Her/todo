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

// async function getData() {
//   fetch("http://localhost:8080/task/all", {
//     method: "GET"
//   }).then((response) => response.json()).then((res) => {
//     if (res) {
//       dataCard = res;
//       render()
//     };
//   }).catch((error) => console.log(error, "error"))
// };
// getData();

async function getData() {
  try {
    const response = await fetch("http://localhost:8080/task/all", {
      method: "GET",
    });
    const data = await response.json();
    if (data) {
      dataCard = data;
      render()
    }
  } catch (error) {
    console.log(error);
  }
}
getData();


// async function postData(user) {
//   fetch("http://localhost:8080/task", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   })
//     .then((res) => { if (res) getData() })
//     .catch((e) => console.log(e));
// };

async function postData(user) {
  try {
    const response = await fetch("http://localhost:8080/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    if (response) {
      await response.json();
      getData()
    }
  } catch (error) {
    console.log(error);
  }
};


async function deleteData(id) {
  try {
    const response = await fetch(`http://localhost:8080/task/${id}`, {
      method: "DELETE",
    })
    if (response) {
      getData()
    }
  } catch (error) {
    console.log(error)
  };
};

// async function putData(id, user) {
//   fetch(`http://localhost:8080/task/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   })
//     .then((res) => { if (res) getData() })
//     .catch((e) => console.log(e));
// }

async function putData(id, user) {
  try {
    const response = await fetch(`http://localhost:8080/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    if (response) {
      await getData()
    }
  } catch (error) {
    console.log(e);
  }
};

function render() {
  blockMainContainer.innerHTML = "";
  let id = 0;
  dataCard.forEach((item) => {
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
        putData(item.id, {
          name: item.name,
          phone: item.phone,
          jobPosition: item.jobPosition,
        });
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


btnCreate.addEventListener("click", async () => {
  btnCreate.disabled = true;

  const user = {
    name: nameCard,
    phone: phoneСard,
    jobPosition: selectCard,
  };

  try {
    await postData(user);
    await getData();
    render()

    inputTextName.value = "";
    inputTelephone.value = "";
    selectJob.value = "Должность";
  } catch (error) {
    console.log(error);
  }
});





