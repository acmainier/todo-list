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
    <span class="task-error hidden"></span>
    <button class="delete-btn">Delete</button><button class="edit-btn">Edit</button>`;

    newTaskEl.innerHTML = newTaskHTML;

    // Task deletion
    const deleteBtn = newTaskEl.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", onClickDelete);

    function onClickDelete() {
      newTaskEl.remove();
    }

    // Task edition
    const editBtn = newTaskEl.querySelector(".edit-btn");
    editBtn.addEventListener("click", onClickEdit);

    function onClickEdit() {
      const currentTaskTextEl = newTaskEl.querySelector(".task-text");
      if (editBtn.textContent === "Edit") {
        const currentTaskText = currentTaskTextEl.textContent;
        const editInputEl = document.createElement("input");
        editInputEl.classList.add("edit-input");
        editInputEl.value = currentTaskText;

        currentTaskTextEl.insertAdjacentElement("afterend", editInputEl);
        currentTaskTextEl.style.display = "none";
        editBtn.textContent = "Save";
      } else {
        const editTaskTextEl = newTaskEl.querySelector(".edit-input");
        const editTaskText = editTaskTextEl.value.trim();
        const taskErrorMessageEl = newTaskEl.querySelector(".task-error");
        if (editTaskText === "") {
          taskErrorMessageEl.textContent = "Empty task makes me sad, dude!";
          taskErrorMessageEl.classList.remove("hidden");
          return;
        }
        taskErrorMessageEl.classList.add("hidden");
        currentTaskTextEl.textContent = editTaskText;
        editTaskTextEl.remove();
        currentTaskTextEl.style.display = "";
        editBtn.textContent = "Edit";
      }
    }

    taskListEl.appendChild(newTaskEl);

    taskInputEl.value = "";
  }
}
