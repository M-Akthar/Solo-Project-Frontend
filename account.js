const userID = JSON.parse(sessionStorage.getItem("userData")).USERID;
const sessionUsername = sessionStorage.getItem("username");

const getUserURL = "http://localhost:8080/TodoApp/api/user/getUser/" + userID;
const updateUserURL = "http://localhost:8080/TodoApp/api/user/update/" + userID;
const deleteUserURL = "http://localhost:8080/TodoApp/api/user/delete/" + userID;

const updateData = {};

function handleUpdate(form) {

    for (let element of form.elements) {
        if (element.id) {
            updateData[element.id] = element.value;
        }
    }

    const dataString = JSON.stringify(updateData);

    makeRequest('POST', updateUserURL, dataString).then(value => {

        if (value.message == "Success") {
            document.getElementById("firstName").value = "";
            document.getElementById("lastName").value = "";
            document.getElementById("password").value = "";

            displayInfo();
        } else {
            console.log(value.message);
        }

    });

    return false;
}

function displayInfo() {

    const username = document.getElementById("usernameDisplay");
    username.innerText = sessionUsername;

    makeRequest("GET", getUserURL).then((value) => {
        const userObj = value;

        const firstName = document.getElementById("firstNameDisplay");
        const lastName = document.getElementById("lastNameDisplay");

        firstName.innerText = userObj.firstName;
        lastName.innerText = userObj.lastName;

    })

}

function deleteAccount() {
    makeRequest("DELETE", deleteUserURL).then((value) => {
        if(value.message == "Success"){
            window.location = "login.html";
        } else {
            console.log(value.message);
        }
    })
}

displayInfo();