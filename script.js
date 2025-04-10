var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var nameTextInput = document.getElementById("inputName");
var telephoneInput = document.getElementById("inputTelephone");
var jobSelect = document.getElementById("mySelect");
var btnCreate = document.getElementById("createBtn");
var containerMainBlock = document.getElementById("main-container");
var cardName = "";
var cardPhone = "";
var cardSelect = "";
var indexEdit = null;
var jobEdit = ["qa", "developer", "admin", "devops"];
var cardData = [];
if (btnCreate instanceof HTMLButtonElement) {
    btnCreate.disabled = true;
}
else {
    console.error("btnCreate не является кнопкой или не найден.");
}
cardsGet();
function checkingField() {
    if (btnCreate instanceof HTMLButtonElement) {
        btnCreate.disabled = !(cardName.length > 0 && cardPhone.length === 11 && cardSelect.length > 0);
    }
    else {
        console.error("btnCreate не найден или не является кнопкой.");
    }
}
nameTextInput === null || nameTextInput === void 0 ? void 0 : nameTextInput.addEventListener('input', function (event) {
    cardName = event.target.value;
    checkingField();
});
telephoneInput === null || telephoneInput === void 0 ? void 0 : telephoneInput.addEventListener('input', function (event) {
    cardPhone = event.target.value;
    checkingField();
});
jobSelect === null || jobSelect === void 0 ? void 0 : jobSelect.addEventListener('change', function (event) {
    cardSelect = event.target.value;
    checkingField();
});
function cardsGet() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fetch("http://localhost:8080/task/all", {
                            method: "GET",
                        })];
                case 1:
                    response = _a.sent();
                    if (!response) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    cardData = data;
                    renders();
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function cardCreate(user) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("http://localhost:8080/task", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(user),
                        })];
                case 1:
                    response = _a.sent();
                    if (response) {
                        cardsGet();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
;
function cardDelete(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("http://localhost:8080/task/".concat(id), {
                            method: "DELETE",
                        })];
                case 1:
                    response = _a.sent();
                    if (response) {
                        cardsGet();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 3];
                case 3:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
;
function cardChange(id, user) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("http://localhost:8080/task/".concat(id), {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(user),
                        })];
                case 1:
                    response = _a.sent();
                    if (response) {
                        cardsGet();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function renders() {
    if (!containerMainBlock) {
        console.error("blockMainContainer не инициализирован.");
        return;
    }
    containerMainBlock.innerHTML = "";
    var id = 0;
    cardData.forEach(function (item) {
        var card = document.createElement("div");
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
        var buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";
        var editingButton = document.createElement("img");
        editingButton.src = "static/icons8-редактировать.svg";
        editingButton.className = "editor";
        editingButton.addEventListener("click", function () {
            var inputName = document.createElement("input");
            inputName.value = item.name;
            var inputPhone = document.createElement("input");
            inputPhone.type = "number";
            inputPhone.value = item.phone;
            inputPhone.addEventListener("keydown", function (event) {
                var listkeys = ["e", "E", "+", "-", "ArrowUp", "ArrowDown", ".", ","];
                listkeys.forEach(function (item) {
                    if (item === event.key) {
                        event.preventDefault();
                    }
                });
            });
            var nameContainer = document.createElement("div");
            var labelName = document.createElement("label");
            labelName.textContent = "Имя:";
            nameContainer.className = "input-name";
            nameContainer.appendChild(labelName);
            nameContainer.appendChild(inputName);
            var phoneContainer = document.createElement("div");
            var labelPhone = document.createElement("label");
            labelPhone.textContent = "Телефон:";
            phoneContainer.className = "input-phone";
            phoneContainer.appendChild(labelPhone);
            phoneContainer.appendChild(inputPhone);
            var selectJobEdit = document.createElement("select");
            jobEdit.forEach(function (jobPosition) {
                var option = document.createElement("option");
                option.value = jobPosition;
                option.textContent =
                    jobPosition.charAt(0).toUpperCase() + jobPosition.slice(1);
                if (jobPosition === item.jobPosition) {
                    option.selected = true;
                }
                selectJobEdit.appendChild(option);
            });
            var selectContainer = document.createElement("div");
            var labelSelectJobEdit = document.createElement("label");
            labelSelectJobEdit.textContent = "Должность:";
            selectContainer.className = "input-select";
            selectContainer.appendChild(labelSelectJobEdit);
            selectContainer.appendChild(selectJobEdit);
            var cancellation = document.createElement("img");
            cancellation.src = "static/icons8-отмена.svg";
            cancellation.className = "cancellation-button";
            cancellation.addEventListener("click", function () {
                renders();
            });
            var saveButton = document.createElement("img");
            saveButton.src = "static/icons8-ок.svg";
            saveButton.className = "save-button";
            saveButton.addEventListener("click", function () {
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
        var textName = document.createElement("p");
        textName.innerText = "\u0418\u043C\u044F: ".concat(item.name);
        card.appendChild(textName);
        var textPhone = document.createElement("p");
        textPhone.innerText = "\u0422\u0435\u043B\u0435\u0444\u043E\u043D: ".concat(item.phone);
        card.appendChild(textPhone);
        var textSelect = document.createElement("p");
        textSelect.innerText = "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C: ".concat(item.jobPosition);
        card.appendChild(textSelect);
        var extensionDate = document.createElement("p");
        extensionDate.innerText = "\u0414\u0430\u0442\u0430: ".concat(item.createDate);
        card.appendChild(extensionDate);
        var deleteButton = document.createElement("img");
        deleteButton.src = "static/icons8-удалить.svg";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", function () {
            cardDelete(item.id);
        });
        buttonContainer.appendChild(deleteButton);
        card.appendChild(buttonContainer);
        containerMainBlock.appendChild(card);
    });
}
renders();
if (btnCreate) {
    btnCreate.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
        var user, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    btnCreate.disabled = true;
                    user = {
                        name: (nameTextInput === null || nameTextInput === void 0 ? void 0 : nameTextInput.value) || "",
                        phone: (telephoneInput === null || telephoneInput === void 0 ? void 0 : telephoneInput.value) || "",
                        jobPosition: (jobSelect === null || jobSelect === void 0 ? void 0 : jobSelect.value) || "",
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, cardCreate(user)];
                case 2:
                    _a.sent();
                    if (nameTextInput) {
                        nameTextInput.value = "";
                    }
                    if (telephoneInput) {
                        telephoneInput.value = "";
                    }
                    if (jobSelect) {
                        jobSelect.value = "Должность";
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_5 = _a.sent();
                    console.log(error_5);
                    return [3 /*break*/, 5];
                case 4:
                    btnCreate.disabled = false;
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); });
}
else {
    console.error("btnCreate не является кнопкой или не найден.");
}
