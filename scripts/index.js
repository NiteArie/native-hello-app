const formNode = document.querySelector(".js-form");
const usernameInputNode = document.querySelector(".js-username-input");
const passwordInputNode = document.querySelector(".js-password-input");
const modalNode = document.querySelector(".js-modal");
const logoutButtonNode = document.querySelector(".js-logout-button");

formNode.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const body = Object.fromEntries(formData);
    let isFormError = false;
    
    if (body.username.trim().length == 0) {
        usernameInputNode.classList.add("form__input--error");
        isFormError = true;
    } else {
        usernameInputNode.classList.remove("form__input--error");
    }
    
    if (body.password.trim().length == 0) {
        passwordInputNode.classList.add("form__input--error");
        isFormError = true;
    } else {
        passwordInputNode.classList.remove("form__input--error");
    }
    
    if (isFormError) {
        return;
    }

    modalNode.classList.add("modal--hidden")
    modalNode.querySelector(".js-modal-content").textContent = "";

    fetch("http://ip-api.com/json/")
    .then(response => response.json())
    .then(data => {
        const ipAddress = data.query;

        fetch(`https://fourtonfish.com/hellosalut/?ip=${ipAddress}`)
        .then(response => response.json())
        .then(data => {
            const { hello } = data;
            modalNode.classList.remove("modal--hidden");
            modalNode.querySelector(".js-modal-content").textContent = `${hello}, ${usernameInputNode.value} you have successfully logged in!`;
        })
        .catch(error => {
            modalNode.classList.remove("modal--hidden");
            modalNode.querySelector(".js-modal-content").textContent = "An error happened! Check your internet connection or the connection to the service is being blocked on your machine!";    
        })
    })
    .catch(error => {
        modalNode.classList.remove("modal--hidden");
        modalNode.querySelector(".js-modal-content").textContent = "An error happened! Check your internet connection or the connection to the service is being blocked on your machine!";
    })
})

logoutButtonNode.addEventListener("click", (event) => {
    const username = usernameInputNode.value;
    usernameInputNode.value = "";
    passwordInputNode.value = "";
    modalNode.querySelector(".js-modal-content").textContent = `Have a great day ${username}!`;

    setTimeout(() => {
        modalNode.classList.add("modal--hidden");
        modalNode.querySelector(".js-modal-content").textContent = "";
    }, 1000)
})

