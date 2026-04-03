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

function displayTasks (){
taskList.innerHTML = ""
tasks.forEach(
    (task) => {
        const li = document.createElement("li")
        li.textContent = task.title
        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete"
        deleteBtn.classList.add("deleteBtn")
        deleteBtn.addEventListener("click" , function(){
        deleteTask(task.id)
        })
        li.appendChild(deleteBtn)
        taskList.appendChild(li)


    }
)

taskCounter.textContent= `${tasks.length} tasks`
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
     const newTask={
        id: Date.now(),
        title: task,
        completed: false
     }
     tasks.push(newTask)

     displayTasks()
     enterBox.value = ""
})

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

 