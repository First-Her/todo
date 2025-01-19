console.log("привет")

const inputTextName = document.getElementById('inputName');

inputTextName.addEventListener('input', (event) => {
    console.log(event.target.value)
});

const inputPassword = document.getElementById('inputPassword');

inputPassword.addEventListener('input', (event) => {
    console.log(event.target.value)
});