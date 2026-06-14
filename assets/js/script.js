// DOM element references
const taskInputEl = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const errorMessageEl = document.getElementById("error-message");
const taskListEl = document.getElementById("task-list");

addBtn.addEventListener("click", onClickBtn);

// Validates input and adds a new task to the list
function onClickBtn() {
  const cleanTaskInput = taskInputEl.value.trim();
  if (cleanTaskInput === "") {
    errorMessageEl.textContent = "That's an empty task, browski!";
    errorMessageEl.classList.remove("hidden");
    taskInputEl.value = "";
  } else {
    errorMessageEl.classList.add("hidden");

    // Build the task element with its action buttons and inline error span
    const newTaskEl = document.createElement("li");
    newTaskEl.classList.add("task-item");

    const newTaskHTML = `<span class="task-text">${cleanTaskInput}</span>
    <button class="delete-btn">Delete</button><button class="edit-btn">Edit</button>
    <span class="task-error hidden"></span>`;

    newTaskEl.innerHTML = newTaskHTML;

    // Task deletion
    const deleteBtn = newTaskEl.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", onClickDelete);

    function onClickDelete() {
      newTaskEl.remove();
    }

    // Task edition — same button toggles between Edit and Save mode
    const editBtn = newTaskEl.querySelector(".edit-btn");
    editBtn.addEventListener("click", onClickEdit);

    const currentTaskTextEl = newTaskEl.querySelector(".task-text");
    const taskErrorMessageEl = newTaskEl.querySelector(".task-error");

    function onClickEdit() {
      if (editBtn.textContent === "Edit") {
        // Switch to edit mode: replace text with a pre-filled input field
        const currentTaskText = currentTaskTextEl.textContent;
        const editInputEl = document.createElement("input");
        editInputEl.classList.add("edit-input");
        editInputEl.value = currentTaskText;

        currentTaskTextEl.insertAdjacentElement("afterend", editInputEl);
        currentTaskTextEl.style.display = "none";
        editBtn.textContent = "Save";
      } else {
        // Save mode: validate and commit the edited value
        const editTaskTextEl = newTaskEl.querySelector(".edit-input");
        const editTaskText = editTaskTextEl.value.trim();
        if (editTaskText === "") {
          taskErrorMessageEl.textContent = "Empty task makes me sad, dude!";
          taskErrorMessageEl.classList.remove("hidden");
          editTaskTextEl.value = currentTaskTextEl.textContent; // reset to previous value
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
