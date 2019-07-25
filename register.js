const createUserURL = "http://localhost:8080/TodoApp/api/user/create";
const regData = {};

function handleSubmit(form) {
    console.log(form);

    for (let element of form.elements) {
        if (element.id) {
            regData[element.id] = element.value;
        }
    }

    const dataString = JSON.stringify(regData);

    makeRequest('POST', createUserURL, dataString).then(value => {
        console.log(value.message);
        if(value.message == "Success") {
            changeLogin();
        } else {
            notify(value.message);
        }

    });

    return false;
}

function changeLogin() {
    window.location = "login.html";
}

function notify(message) {
    window.alert(message);
}