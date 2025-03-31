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
let dataCard = [];

btnCreate.disabled = true;

getCards();

function fieldChecking() {
  btnCreate.disabled = !(
    nameCard.length && phoneСard.length === 11 && selectCard.length
  );
}


async function getCards() {
  try {
    const response = await fetch("http://localhost:8080/task/all", {
      method: "GET",
    });
    
    if (response) {
      const data = await response.json();
      dataCard = data;
      render()
    }
  } catch (error) {
    console.log(error);
  }
}

async function createCard(user) {
  try {
    const response = await fetch("http://localhost:8080/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    if (response) {
      getCards()
    }
  } catch (error) {
    console.log(error);
  }
};


async function deleteCard(id) {
  try {
    const response = await fetch(`http://localhost:8080/task/${id}`, {
      method: "DELETE",
    })
    if (response) {
      getCards()
    }
  } catch (error) {
    console.log(error)
  };
};

async function changeCard(id, user) {
  try {
    const response = await fetch(`http://localhost:8080/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    if (response) {
      getCards()
    }
  } catch (error) {
    console.log(e);
  }
}

function render() {
  blockMainContainer.innerHTML = "";
  let id = 0;
  dataCard.forEach((item) => {
    const card = document.createElement("div");
    card.id = id++;
    switch (item.jobPosition) {
      case "qa":
        card.className = "green-card";
        break;
      case "developer":
        card.className = "green-card";
        break;
      case "admin":
        card.className = "red-card";
        break;
      case "devops":
        card.className = "yellow-card";
        break;
    }


    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    const editingButton = document.createElement("img");
    editingButton.src = "static/icons8-редактировать.svg";
    editingButton.className = "editor";
    editingButton.addEventListener("click", () => {
      const inputName = document.createElement("input");
      inputName.value = item.name;
      const inputPhone = document.createElement("input");
      inputPhone.type = "number";
      inputPhone.value = item.phone;
      inputPhone.addEventListener("keydown", (event) => {
        const listkeys = ["e", "E", "+", "-", "ArrowUp", "ArrowDown", ".", ","];
        listkeys.forEach((item) => {
          if (item === event.key) {
            event.preventDefault()
          }
        })
      });

      const nameContainer = document.createElement("div");
      const labelName = document.createElement("label");
      labelName.textContent = "Имя:";
      nameContainer.className = "input-name";
      nameContainer.appendChild(labelName);
      nameContainer.appendChild(inputName);

      const phoneContainer = document.createElement("div");
      const labelPhone = document.createElement("label");
      labelPhone.textContent = "Телефон:";
      phoneContainer.className = "input-phone";
      phoneContainer.appendChild(labelPhone);
      phoneContainer.appendChild(inputPhone);

      const selectJobEdit = document.createElement("select");
      editJob.forEach((jobPosition) => {
        const option = document.createElement("option");
        option.value = jobPosition;
        option.textContent =
          jobPosition.charAt(0).toUpperCase() + jobPosition.slice(1);
        if (jobPosition === item.jobPosition) {
          option.selected = true
        }
        selectJobEdit.appendChild(option);
      });

      const selectContainer = document.createElement("div");
      const labelSelectJobEdit = document.createElement("label");
      labelSelectJobEdit.textContent = "Должность:";
      selectContainer.className = "input-select";
      selectContainer.appendChild(labelSelectJobEdit);
      selectContainer.appendChild(selectJobEdit);

      const cancellation = document.createElement("img");
      cancellation.src = "static/icons8-отмена.svg";
      cancellation.className = "cancellation-button";
      cancellation.addEventListener("click", () => {
        render();
      });

      const saveButton = document.createElement("img");
      saveButton.src = "static/icons8-ок.svg";
      saveButton.className = "save-button";
      saveButton.addEventListener("click", () => {
        changeCard(item.id, {
          name: inputName.value,
          phone: inputPhone.value,
          jobPosition: selectJobEdit.value,
        });
      });

      card.innerHTML = "";
      card.appendChild(nameContainer);
      card.appendChild(phoneContainer);
      card.appendChild(selectContainer);
      card.appendChild(saveButton);
      card.appendChild(cancellation);
    });

    buttonContainer.appendChild(editingButton);
    card.appendChild(buttonContainer);

    const textName = document.createElement("p");
    textName.innerText = `Имя: ${item.name}`;
    card.appendChild(textName);
    const textPhone = document.createElement("p");
    textPhone.innerText = `Телефон: ${item.phone}`;
    card.appendChild(textPhone);
    const textSelect = document.createElement("p");
    textSelect.innerText = `Должность: ${item.jobPosition}`;
    card.appendChild(textSelect);
    const extensionDate = document.createElement("p");
    extensionDate.innerText = `Дата: ${item.createDate}`;
    card.appendChild(extensionDate);

    const deleteButton = document.createElement("img");
    deleteButton.src = "static/icons8-удалить.svg";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => {
      deleteCard(item.id);
    });
    buttonContainer.appendChild(deleteButton);
    card.appendChild(buttonContainer);

    blockMainContainer.appendChild(card);
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



selectJob.addEventListener("input", (event) => {
  selectCard = event.target.value;
  fieldChecking();
});

inputTelephone.addEventListener("keydown", (event) => {
  const listkeys = ["e", "E", "+", "-", "ArrowUp", "ArrowDown", ".", ","];
  listkeys.forEach((item) => {
    if (item === event.key) {
      event.preventDefault()
    }
  })
});


btnCreate.addEventListener("click", async () => {
  btnCreate.disabled = true;

  const user = {
    name: nameCard,
    phone: phoneСard,
    jobPosition: selectCard,
  };

  try {
   createCard(user);


    inputTextName.value = "";
    inputTelephone.value = "";
    selectJob.value = "Должность";
  } catch (error) {
    console.log(error);
  }
});





