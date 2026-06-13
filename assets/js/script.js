const taskInputEl = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const errorMessageEl = document.getElementById("error-message");
const taskListEl = document.getElementById("task-list");

addBtn.addEventListener("click", onClickBtn);

function onClickBtn() {
  const cleanTaskInput = taskInputEl.value.trim();
  if (cleanTaskInput === "") {
    errorMessageEl.textContent = "That's an empty task, browski!";
    errorMessageEl.classList.remove("hidden");
  } else {
    errorMessageEl.classList.add("hidden");
    const newTaskEl = document.createElement("li");
    newTaskEl.classList.add("task-item");

    const newTaskText = document.createElement("span");
    newTaskText.classList.add("task-text");
    newTaskText.textContent = cleanTaskInput;

    newTaskEl.appendChild(newTaskText);
    taskListEl.appendChild(newTaskEl);

    taskInputEl.value = "";
  }
}
