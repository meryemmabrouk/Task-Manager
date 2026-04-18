const enterBox = document.getElementById("enterBox")
const addTaskBtn = document.getElementById("addTaskBtn")
const taskList = document.getElementById("taskList")
const taskCounter = document.getElementById("taskCounter")
const filterButtons = document.querySelectorAll(".threeButtons button")
const allBtn = document.getElementById(".allBtn button")
const completedBtn = document.getElementById(".completedBtn button")
const pendingBtn = document.getElementById(".pendingBtn button")

let tasks = []

// task= change colour of 3 buttons

function displayTasks (filteredTasks = tasks){
taskList.innerHTML = ""

if(filteredTasks.length === 0){
    taskList.innerHTML = "<p>No tasks available</p>"
}

filteredTasks.forEach(
    (task) => {
        const li = document.createElement("li")
        li.textContent = task.title
        
        if(task.completed){
            li.classList.add("completed")
        }
        
        const toggleBtn = document.createElement("button")
        toggleBtn.textContent = "Toggle"
        toggleBtn.addEventListener("click" , function(){
            task.completed != task.completed
            displayTasks()
        })


        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete"
        deleteBtn.classList.add("deleteBtn")
        deleteBtn.addEventListener("click" , function(){
        deleteTask(task.id)
        })
        li.appendChild(toggleBtn)
        li.appendChild(deleteBtn)
        taskList.appendChild(li)
    }
)
taskCounter.textContent= `${tasks.length} tasks`
}

function toggleCompleted(id){
    tasks = tasks.map((t) => {
        if(t.id === id){
           return{
            ...t,completed: !t.completed
           }
        }
        return t
    })
    displayTasks()
}

function deleteTask(id){
     tasks= tasks.filter((t)=> t.id !== id) 
     displayTasks()
}

addTaskBtn.addEventListener("click" , function(){
     const task = enterBox.value.trim()
     if(task===""){
        return
     }

    const doubleTitle = task.toLowerCase()

     const isDuplicate = tasks.some(
        (task) => task.title.toLowerCase() === doubleTitle
     )

     if(isDuplicate){
        alert("task already exists")
        return
    }

     const newTask={
        id: Date.now(),
        title: task,
        completed: false
     }
     tasks.push(newTask)
     console.log (tasks)
     displayTasks()
     enterBox.value = ""
})

filterButtons.forEach(
    (button) => {button.addEventListener("click" , function(){
        const filterType = button.dataset.filter
        if(filterType === "all"){
            displayTasks(tasks)
        }
        if (filterType === "completed"){
            const completedTasks = tasks.filter( (task) => {task.completed} )
            displayTasks(completedTasks)
        }

        if (filterType === "pending"){
            const pendingTasks = tasks.filter( (task) => !task.completed )
            displayTasks(pendingTasks)
        }
        
        

    }
)}
)


console.log ("meryem")




//    DOM MANIPULATION DOCUMENT OBJECT MANIPULATION 

// let name = "Meryem"
// const age = 15

// // array is [] object is {}
// const tasks =[
//     {
//     id: 1,
//     title: "wash clothes",
//     completed: false
// },

// {
//     id: 2,
//     title: "eat dinner",
//     completed: false
// },

// ]

// let task = {
//     id: 1,
//     title: "wash clothes",
//     completed: false
// }

// // console logs

// // console.log("my name is meryem")
// // console.log(tasks[0])
// // console.log(tasks[1].title)
 
// //  function greets(){
// //     console.log("Hello, this is my task manager app" )
// //  }

//  function titlePrint(task){
//     console.log(tasks[0].title)
//  }

//  titlePrint()

//  console.log(new Date().toLocaleString("en-GB", {
//         timeZone: "Europe/London",
//     }),)

// let task3 = {
//     id: 3,
//     title: "eat breakfast",
//     completed:false,
// }
 
// function addTask(){
//     tasks.push(task3)
//     console.log(tasks)
// } 

// addTask()

// let title = ""






// Primitive Types 
// Number – let age = 25; python
// BigInt – let bigNumber = 123456789012345678901234567890n;
// String – let name = "Alice"; python
// Boolean – let isActive = true; p
// Undefined – let value;
// Null – let result = null;
// Symbol – let id = Symbol('id');

// Reference Types (Objects)
// Object – let person = { name: "Alice", age: 25 }; p
// Array – let numbers = [1, 2, 3];
// Function – function greet() { return "Hello"; }
// Date – let today = new Date();
// Set – let uniqueValues = new Set([1, 2, 3]);

 