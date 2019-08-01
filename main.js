const userID = JSON.parse(sessionStorage.getItem("userData")).USERID;
const sessionUsername = sessionStorage.getItem("username");
const deleteTaskUrl = "http://35.189.89.61:8081/TodoApp/api/task/delete/";
const createTaskURL = "http://35.189.89.61:8081/TodoApp/api/task/create/"
    + userID;
const getUserTasksURL = "http://35.189.89.61:8081/TodoApp/api/task/getUserTasks/"
    + userID;
const userTasksArray = [];

function handleAddTask() {
    const textBox = document.getElementById("taskName");
    const userInput = textBox.value;
    // The database has a character limit of 255
    // Might be worth adding a check
    createTask(userInput);

    textBox.value = "";
    return false;
}

function createLi(taskID, input) {
    const ul = document.getElementById("taskPointer");
    const li = document.createElement("li");
    ul.append(li);

    const checkBox = document.createElement("input");
    checkBox.setAttribute("id", taskID);
    checkBox.type = "checkbox";
    checkBox.setAttribute("onchange", "deleteTask(this.id)");

    li.append(checkBox);

    const p = document.createElement("p");
    p.classList.add("marginLeft");
    p.innerText = input;
    li.append(p);
}

function createTask(taskName) {
    const taskObj = {}
    taskObj.taskName = taskName;
    const dataString = JSON.stringify(taskObj);
    makeRequest("POST", createTaskURL, dataString).then((value) => {
        console.log(value.message);
        getUserTasks();
    });
}

function deleteTask(taskID) {
    makeRequest("DELETE", deleteTaskUrl + taskID).then(value => {
        console.log(value.message);
        getUserTasks();
    })
}

function getUserTasks() {
    userTasksArray.length = 0;

    makeRequest("GET", getUserTasksURL).then((value) => {

        for (let element of value) {
            userTasksArray.push(element);
        }
        document.getElementById("taskPointer").innerText = ""; // Clears the list
        populatePage();

    })
}

function populatePage() {

    for (let element of userTasksArray) {
        createLi(element.taskID, element.taskName);
    }

}

function displayUsername() {
    const userH3 = document.getElementById("userTagPointer");
    userH3.innerText = sessionUsername;
}

function handleAddList(form) {
    const textBox = document.getElementById("addList");

    notifyFeatureMissing();

    textBox.value = "";
    return false;
}

function notifyFeatureMissing() {
    window.alert("Feature not implemented");
} 

displayUsername();
getUserTasks();