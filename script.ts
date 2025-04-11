const nameTextInput = document.getElementById(
  "inputName"
) as HTMLInputElement | null;
const telephoneInput = document.getElementById(
  "inputTelephone"
) as HTMLInputElement | null;
const jobSelect = document.getElementById(
  "mySelect"
) as HTMLSelectElement | null;
const btnCreate = document.getElementById(
  "createBtn"
) as HTMLButtonElement | null;
const containerMainBlock = document.getElementById(
  "main-container"
) as HTMLButtonElement | null;

interface ICardData {
  id: number;
  name: string;
  phone: string;
  jobPosition: string;
  createDate: string;
}

interface IUser {
  name: string;
  phone: string;
  jobPosition: string;
}

let cardName = "";
let cardPhone = "";
let cardSelect = "";
let indexEdit = null;
let jobEdit = ["qa", "developer", "admin", "devops"];
let cardData: ICardData[] = [];

if (btnCreate instanceof HTMLButtonElement) {
  btnCreate.disabled = true;
} else {
  console.error("btnCreate не является кнопкой или не найден.");
}

cardsGet();

function checkingField() {
  if (btnCreate instanceof HTMLButtonElement) {
    btnCreate.disabled = !(
      cardName.length > 0 &&
      cardPhone.length === 11 &&
      cardSelect.length > 0
    );
  } else {
    console.error("btnCreate не найден или не является кнопкой.");
  }
}

nameTextInput?.addEventListener("input", (event) => {
  cardName = (event.target as HTMLInputElement).value;
  checkingField();
});

telephoneInput?.addEventListener("input", (event) => {
  cardPhone = (event.target as HTMLInputElement).value;
  checkingField();
});

jobSelect?.addEventListener("change", (event) => {
  cardSelect = (event.target as HTMLSelectElement).value;
  checkingField();
});

async function cardsGet() {
  try {
    const response = await fetch("http://localhost:8080/task/all", {
      method: "GET",
    });

    if (response) {
      const data: ICardData[] = await response.json();
      cardData = data;
      renders();
    }
  } catch (error) {
    console.log(error);
  }
}

async function cardCreate(user: IUser) {
  try {
    const response = await fetch("http://localhost:8080/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response) {
      cardsGet();
    }
  } catch (error) {
    console.log(error);
  }
}

async function cardDelete(id: string) {
  try {
    const response = await fetch(`http://localhost:8080/task/${id}`, {
      method: "DELETE",
    });
    if (response) {
      cardsGet();
    }
  } catch (error) {
    console.log(error);
  }
}

async function cardChange(id: string, user: IUser) {
  try {
    const response = await fetch(`http://localhost:8080/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response) {
      cardsGet();
    }
  } catch (error) {
    console.log(error);
  }
}

function renders() {
  if (!containerMainBlock) {
    console.error("blockMainContainer не инициализирован.");
    return;
  }
  containerMainBlock.innerHTML = "";
  let id = 0;
  cardData.forEach((item: ICardData) => {
    const card = document.createElement("div");
    card.id = id.toString();
    id++;

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
            event.preventDefault();
          }
        });
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
      jobEdit.forEach((jobPosition) => {
        const option = document.createElement("option");
        option.value = jobPosition;
        option.textContent =
          jobPosition.charAt(0).toUpperCase() + jobPosition.slice(1);
        if (jobPosition === item.jobPosition) {
          option.selected = true;
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
        renders();
      });

      const saveButton = document.createElement("img");
      saveButton.src = "static/icons8-ок.svg";
      saveButton.className = "save-button";
      saveButton.addEventListener("click", () => {
        cardChange(item.id.toString(), {
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
      cardDelete(item.id.toString());
    });
    buttonContainer.appendChild(deleteButton);
    card.appendChild(buttonContainer);

    containerMainBlock.appendChild(card);
  });
}
renders();

if (btnCreate) {
  btnCreate.addEventListener("click", async () => {
    (btnCreate as HTMLButtonElement).disabled = true;

    const user: IUser = {
      name: nameTextInput?.value || "",
      phone: telephoneInput?.value || "",
      jobPosition: jobSelect?.value || "",
    };

    try {
      await cardCreate(user);
      if (nameTextInput) {
        nameTextInput.value = "";
      }
      if (telephoneInput) {
        telephoneInput.value = "";
      }
      if (jobSelect) {
        jobSelect.value = "Должность";
      }
    } catch (error) {
      console.log(error);
    } finally {
      btnCreate.disabled = false;
    }
  });
} else {
  console.error("btnCreate не является кнопкой или не найден.");
}
