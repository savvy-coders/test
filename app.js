const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");

let tasks = [];

async function fetchTasks() {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error('API error');
    tasks = await response.json();
    renderTasks();
  } catch (error) {
    errorMessage.classList.remove('hidden');
  }
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""}>
      <span>${task.name}</span>
      <button class="delete-btn">Delete</button>
    `;
    li.querySelector("input").addEventListener("change", () => toggleComplete(task.id));
    li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));
    taskList.appendChild(li);
  });
}

function addTask(taskName) {
  const newTask = { id: Date.now(), name: taskName, completed: false };
  tasks.push(newTask);
  renderTasks();
}

function toggleComplete(id) {
  const task = tasks.find((t) => t.id === id);
  task.completed = !task.completed;
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  renderTasks();
}

addTaskBtn.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  if (taskName) {
    addTask(taskName);
    taskInput.value = '';
  }
});


fetchTasks();
