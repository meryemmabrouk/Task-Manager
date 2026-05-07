const enterBox = document.getElementById("enterBox");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const filterButtons = document.querySelectorAll(".threeButtons button");
const allBtn = document.getElementById("allBtn");
const completedBtn = document.getElementById("completedBtn");
const pendingBtn = document.getElementById("pendingBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

let tasks = [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

function displayTasks(filteredTasks = tasks) {
    taskList.innerHTML = "";

    if (filteredTasks.length === 0) {
        taskList.innerHTML = "<p>No tasks available</p>";
    }

    filteredTasks.forEach((task) => {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.title;
        taskText.classList.add("task-text");

        if (task.completed) {
            li.classList.add("completed");
        }

        const btnGroup = document.createElement("div");
        btnGroup.classList.add("btn-group");

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = task.completed ? "Undo" : "Complete";

        toggleBtn.addEventListener("click", function () {
            toggleCompleted(task.id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("deleteBtn");

        deleteBtn.addEventListener("click", function () {
            deleteTask(task.id);
        });

        btnGroup.appendChild(toggleBtn);
        btnGroup.appendChild(deleteBtn);

        li.appendChild(taskText);
        li.appendChild(btnGroup);

        taskList.appendChild(li);
    });

    taskCounter.textContent = `${tasks.length} tasks`;
}

function toggleCompleted(id) {
    tasks = tasks.map((t) => {
        if (t.id === id) {
            return {
                ...t,
                completed: !t.completed,
            };
        }

        return t;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);

    saveTasks();
    displayTasks();
}

addTaskBtn.addEventListener("click", function () {
    const task = enterBox.value.trim();

    if (task === "") {
        return;
    }

    const doubleTitle = task.toLowerCase();

    const isDuplicate = tasks.some(
        (task) => task.title.toLowerCase() === doubleTitle,
    );

    if (isDuplicate) {
        alert("Task already exists");
        return;
    }

    const newTask = {
        id: Date.now(),
        title: task,
        completed: false,
    };

    tasks.push(newTask);

    saveTasks();

    displayTasks();

    enterBox.value = "";
});

filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const filterType = button.dataset.filter;

        if (filterType === "all") {
            displayTasks(tasks);
        }

        if (filterType === "completed") {
            const completedTasks = tasks.filter((task) => task.completed);
            displayTasks(completedTasks);
        }

        if (filterType === "pending") {
            const pendingTasks = tasks.filter((task) => !task.completed);
            displayTasks(pendingTasks);
        }
    });
});

clearAllBtn.addEventListener("click", function () {
    tasks = [];

    localStorage.removeItem("tasks");

    displayTasks();
});

loadTasks();
displayTasks();
 