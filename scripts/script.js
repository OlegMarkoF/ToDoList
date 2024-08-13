// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks
function renderTasks(filter = "all") {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let filteredTasks = tasks;
  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  } else if (filter === "incomplete") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  filteredTasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.className = `task ${task.completed ? "completed" : ""}`;
    taskElement.innerHTML = `
      <div class="task-name">
        <input type="checkbox" ${
          task.completed ? "checked" : ""
        } onchange="toggleTask(${index})">
        <span>${task.text}</span>
      </div>
      <button class="delete-btn" onclick="deleteTask(${index})">-</button>
    `;
    taskList.appendChild(taskElement);
  });
}

// Add a new task
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
addTaskButton.addEventListener("click", () => {
  addTask();
});
document.addEventListener("keydown", (evt) => {
  if (evt.code === "Enter") {
    addTask();
  }
});

// Add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    saveTasksToLocalStorage();
    renderTasks();
  }
}

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasksToLocalStorage();
  renderTasks();
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasksToLocalStorage();
  renderTasks();
}

// Save tasks to localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filter tasks
const showAllButton = document.getElementById("showAll");
const showCompletedButton = document.getElementById("showCompleted");
const showIncompleteButton = document.getElementById("showIncomplete");

showAllButton.addEventListener("click", () => renderTasks());
showCompletedButton.addEventListener("click", () => renderTasks("completed"));
showIncompleteButton.addEventListener("click", () => renderTasks("incomplete"));

// Render initial tasks
renderTasks();
