const taskList = document.getElementById("taskList");
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText == ``) return;
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.innerText = taskText;
  span.onclick = () => toggleTask(span);

  const button = document.createElement("button");
  button.innerText = "Done!!";
  button.className = "del";
  button.onclick = () => deleteTask(button);

  const dateInput = document.getElementById("taskDate");
  const taskDate = dateInput.value || null;

  li.appendChild(span);
  li.appendChild(button);
  taskList.appendChild(li);
  input.value = "";
  saveTasks();
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function toggleTask(span) {
  span.classList.toggle("completed");
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach((task) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = task.text;
    if (task.completed) span.classList.add("completed");
    span.onclick = () => toggleTask(span);

    const button = document.createElement("button");
    button.innerText = "Done!!";
    button.className = "del";
    button.onclick = () => deleteTask(button);

    li.appendChild(span);
    li.appendChild(button);
    taskList.appendChild(li);
  });
}
loadTasks();

let currentDate = new Date();

function renderCalendar() {
  const monthYear = document.getElementById("monthYear");
  const grid = document.getElementById("calendarGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.innerText = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    grid.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const div = document.createElement("div");
    div.className = "day";
    div.innerText = day;
    grid.appendChild(div);
  }
}
function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}
function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}
