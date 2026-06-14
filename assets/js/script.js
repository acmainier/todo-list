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
    taskInputEl.value = "";
  } else {
    errorMessageEl.classList.add("hidden");
    const newTaskEl = document.createElement("li");
    newTaskEl.classList.add("task-item");

    const newTaskHTML = `<span class="task-text">${cleanTaskInput}</span>
    <button class="delete-btn">Delete</button>`;

    newTaskEl.innerHTML = newTaskHTML;

    const deleteBtn = newTaskEl.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", onClickDelete);

    function onClickDelete() {
      newTaskEl.remove();
    }

    taskListEl.appendChild(newTaskEl);

    taskInputEl.value = "";
  }
}
