
// DOM Elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todosList = document.getElementById("todos-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const emptyState = document.querySelector(".empty-state");
const dateElement = document.getElementById("date");
const filters = document.querySelectorAll(".filter");
const themeToggle = document.getElementById("theme-toggle");
const paletteToggle = document.getElementById("palette-toggle"); // New Palette button

let todos = [];
let currentFilter = "all";

// Event Listeners
addTaskBtn.addEventListener("click", () => addTodo(taskInput.value));
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo(taskInput.value);
});
clearCompletedBtn.addEventListener("click", clearCompleted);

// Light/Dark Mode Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const icon = themeToggle.querySelector("i");
  if (document.body.classList.contains("light-mode")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }
});

// Synthwave Palette Toggle
paletteToggle.addEventListener("click", () => {
  document.body.classList.toggle("theme-synthwave");
});

function addTodo(text) {
  if (text.trim() === "") return;
  const todo = {
    id: Date.now(),
    text,
    completed: false,
  };
  todos.push(todo);
  saveTodos();
  renderTodos();
  taskInput.value = "";
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
  updateItemsCount();
  checkEmptyState();
}

function updateItemsCount() {
  const uncompletedTodos = todos.filter((todo) => !todo.completed);
  itemsLeft.textContent = `${uncompletedTodos.length} XP LEFT`;
}

function checkEmptyState() {
  const filteredTodos = filterTodos(currentFilter);
  if (filteredTodos.length === 0) emptyState.classList.remove("hidden");
  else emptyState.classList.add("hidden");
}

function filterTodos(filter) {
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}

function renderTodos() {
  todosList.innerHTML = "";
  const filteredTodos = filterTodos(currentFilter);

  filteredTodos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    if (todo.completed) todoItem.classList.add("completed");
    
    // Setup for Drag and Drop Tile
    todoItem.draggable = true;
    todoItem.dataset.id = todo.id;

    todoItem.addEventListener("dragstart", handleDragStart);
    todoItem.addEventListener("dragend", handleDragEnd);

    const checkboxContainer = document.createElement("label");
    checkboxContainer.classList.add("checkbox-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const checkmark = document.createElement("span");
    checkmark.classList.add("checkmark");

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkmark);

    const todoText = document.createElement("span");
    todoText.classList.add("todo-item-text");
    todoText.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    todoItem.appendChild(checkboxContainer);
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteBtn);

    todosList.appendChild(todoItem);
  });
}

// --- Fully Jitter-Free Drag and Drop Math ---

todosList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const draggingItem = document.querySelector(".dragging");
  if (!draggingItem) return;

  // Use robust math to find exactly which element we are hovering over
  const afterElement = getDragAfterElement(todosList, e.clientY);
  
  if (afterElement == null) {
    todosList.appendChild(draggingItem);
  } else {
    todosList.insertBefore(draggingItem, afterElement);
  }
});

// This specific function calculates the exact bounding box centers 
// to prevent elements from rapidly swapping back and forth (the "gitter").
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.todo-item:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function handleDragStart(e) {
  // Use setTimeout to ensure the visual element doesn't disappear before dragging starts
  setTimeout(() => e.target.classList.add("dragging"), 0);
  e.dataTransfer.effectAllowed = "move";
}

function handleDragEnd(e) {
  e.target.classList.remove("dragging");
  
  // Re-sync the `todos` array based on the new visual DOM order
  const newOrderIds = [...todosList.querySelectorAll(".todo-item")].map(item => Number(item.dataset.id));
  
  const reorderedTodos = [];
  newOrderIds.forEach(id => {
    const foundTodo = todos.find(t => t.id === id);
    if(foundTodo) reorderedTodos.push(foundTodo);
  });
  
  // Only override if we are in 'all' view
  if (currentFilter === "all" && reorderedTodos.length === todos.length) {
    todos = reorderedTodos;
    saveTodos();
  }
}

// ----------------------------------

function clearCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

function loadTodos() {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) todos = JSON.parse(storedTodos);
  
  // Optional: Save preferred theme state to local storage if desired in future
  renderTodos();
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    setActiveFilter(filter.getAttribute("data-filter"));
  });
});

function setActiveFilter(filter) {
  currentFilter = filter;
  filters.forEach((item) => {
    if (item.getAttribute("data-filter") === filter) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
  renderTodos();
}

function setDate() {
  const options = { weekday: "long", month: "short", day: "numeric" };
  const today = new Date();
  dateElement.textContent = today.toLocaleDateString("en-US", options).toUpperCase();
}

window.addEventListener("DOMContentLoaded", () => {
  loadTodos();
  updateItemsCount();
  setDate();
});