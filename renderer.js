let currentDate = new Date();

const taskList = document.getElementById("taskList");
let selectedDate = null;

function addTask() {
  const input = document.getElementById("taskInput");
  const dateInput = document.getElementById("taskDate");

  const taskText = input.value.trim();
  const taskDate = dateInput.value;

  if (!taskText || !taskDate) return;

  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  tasks.push({
    text: taskText,
    completed: false,
    date: taskDate,
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  dateInput.value = "";

  selectedDate = taskDate;

  renderCalendar();
  showTasksForDates(taskDate);
  updateMonthStats();
}

function deleteTask(button) {
  const li = button.parentElement;
  const text = li.querySelector("span").innerText;
  const date = li.dataset.date;

  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  tasks = tasks.filter((t) => !(t.text === text && t.date === date));

  localStorage.setItem("tasks", JSON.stringify(tasks));

  showTasksForDates(date);
  renderCalendar();
  updateMonthStats();
}

function toggleTask(span) {
  span.classList.toggle("completed");
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.querySelector("span").classList.contains("completed"),
      date: li.dataset.date || null,
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.dataset.date = task.date;

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
  renderCalendar();
}
loadTasks();

function showTasksForDates(dateStr) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  taskList.innerHTML = "";

  const filtered = tasks.filter((t) => t.date === dateStr);

  document.getElementById("selectedDateTitle").innerText =
    "Tasks for" + dateStr;

  document.getElementById("taskCount").innerText = filtered.length;

  filtered.forEach((task) => {
    const li = document.createElement("li");
    li.dataset.date = dateStr;

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

function renderCalendar() {
  const monthYear = document.getElementById("monthYear");
  const grid = document.getElementById("calendarGrid");

  if (!monthYear || !grid) return;

  grid.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.innerText = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const taskDates = tasks.map((t) => t.date);

  for (let i = 0; i < firstDay; i++) {
    grid.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const div = document.createElement("div");
    div.className = "day";
    div.innerText = day;

    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    if (taskDates.includes(dateStr)) {
      div.classList.add("has-task");
    }

    div.onclick = () => {
      document
        .querySelectorAll(".day")
        .forEach((d) => d.classList.remove("active-day"));

      div.classList.add("active-day");
      selectedDate = dateStr;

      const dateInput = document.getElementById("taskDate");
      if (dateInput) dateInput.value = dateStr;

      showTasksForDates(dateStr);
    };

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
renderCalendar();

const toggleBtn = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

toggleBtn.onclick = () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

function updateMonthStats() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");

  const monthTasks = tasks.filter((t) => t.date.startsWith(`${year}-${month}`));

  const completed = monthTasks.filter((t) => t.completed).length;
  const remaining = monthTasks.length - completed;

  document.getElementById("remainingCount").innerText = remaining;
}
