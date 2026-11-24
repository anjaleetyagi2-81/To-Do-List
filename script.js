
let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTaskBtn");

let pendingList = document.getElementById("pendingList");
let completedList = document.getElementById("completedList");

// Save Tasks in Local Storage
function saveTasks() {
    let tasks = [];

    // Get Pending Tasks
    pendingList.querySelectorAll("li").forEach(function(li) {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: false
        });
    });

    // Get Completed Tasks
    completedList.querySelectorAll("li").forEach(function(li) {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: true
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Create Task
function createTask(taskValue, isCompleted = false) {

    let li = document.createElement("li");

    // Create Checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;

    // Create Task Text
    let taskText = document.createElement("span");
    taskText.innerText = taskValue;

    // Create Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    // Add Elements inside li
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);

    // Add Task to Pending or Completed List
    if (isCompleted) {
        completedList.appendChild(li);
    } else {
        pendingList.appendChild(li);
    }

    // Checkbox Functionality
    checkbox.addEventListener("change", function() {

        if (checkbox.checked) {
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }

        saveTasks();
    });

    // Delete Functionality
    deleteBtn.addEventListener("click", function() {
        li.remove();
        saveTasks();
    });
}

// Add Task Functionality
addTaskBtn.addEventListener("click", function() {

    let taskValue = taskInput.value;

    // Check Empty Input
    if (taskValue.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    createTask(taskValue);

    // Save Tasks
    saveTasks();

    // Clear Input
    taskInput.value = "";
});

// Load Tasks from Local Storage
let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

savedTasks.forEach(function(task) {
    createTask(task.text, task.completed);
});
