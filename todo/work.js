const taskInput = document.getElementById("taskInput");
const descriptionInput = document.getElementById("description");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

function addTask() {
    const taskText = taskInput.value.trim();
    const descriptionText = descriptionInput.value.trim();

    if (!taskText) {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <strong>${taskText}</strong>
        ${descriptionText ? `<div>${descriptionText}</div>` : ""}
        <button class="delete-btn">Delete</button>
    `;

    li.querySelector(".delete-btn").addEventListener("click", () => li.remove());
    taskList.appendChild(li);

    taskInput.value = "";
    descriptionInput.value = "";
    taskInput.focus();
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

descriptionInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
