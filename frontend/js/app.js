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

const API_URL = "/tasks"
~

async function loadTasks(){
    try{
        const response = await fetch(API_URL)
        tasks = await response.json()
    }catch(error){
        console.log("could not connect to server", error)
        tasks= []
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

        deleteBtn.addEventListener("click", async function () {
            await fetch(`${API_URL}/${task.id}`, {method:"DELETE"})
            await loadTasks()
            displayTasks() 
        });

        btnGroup.appendChild(toggleBtn);
        btnGroup.appendChild(deleteBtn);

        li.appendChild(taskText);
        li.appendChild(btnGroup);

        taskList.appendChild(li);
    });

    taskCounter.textContent = `${filteredTasks.length} tasks`; 
    
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

addTaskBtn.addEventListener("click", async function () {
    const task = enterBox.value.trim();

    if (task === "") return;

    const doubleTitle = task.toLowerCase();
    try{
        const response = await fetch(API_URL, {
            method : "POST", 
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({title: task})
        })
        if(!response.ok){
            const errorData = await response.json()
            alert(errorData.error)
            return
        }

    await loadTasks()

    displayTasks();

    enterBox.value = "";

    }catch(error){
        console.log("could not add your task ", error)
    }
   
    
});

filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const filterType = button.dataset.filter;

        filterButtons.forEach((btn) => btn.classList.remove("active") )
        button.classList.add("active")

        if (filterType === "all") {
            displayTasks(tasks);
        }

        if (filterType === "completed") {
            const completedTasks = tasks.filter((t) => t.completed);
            displayTasks(completedTasks);
        }

        if (filterType === "pending") {
            const pendingTasks = tasks.filter((t) => !t.completed);
            displayTasks(pendingTasks);
        }
    });
});

clearAllBtn.addEventListener("click", function () {
    tasks = [];
    localStorage.removeItem("tasks");
    displayTasks();
});

async function init (){
    await loadTasks()
    displayTasks()
}
init()
