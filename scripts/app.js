//select DOM elements and array declarations
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const submitBtn = document.querySelector('.btn')
const saveBtn = document.querySelector('.save-tasks')
let tasks = []
let savedTasks;

//IIFE to fire up all event listeners on page load
(function init() {
    submitBtn.addEventListener('click', submitTask)
    taskList.addEventListener('click', removeTask)
    clearBtn.addEventListener('click', clearTasks)
    filter.addEventListener('keyup', filterTasks)
    saveBtn.addEventListener('click', saveTasks)
})();

//Add task input to list
function submitTask(e) {
    if (taskInput.value) {
        const list = document.createElement('li');
        const inputValue = document.createTextNode(taskInput.value)
        const link = document.createElement('a')
        list.className = 'collection-item';
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-trash"></i>'
        list.appendChild(inputValue)
        list.appendChild(link)
        taskList.appendChild(list)
        tasks.push(taskInput.value)
        taskInput.value = ''
    }
    e.preventDefault();
}

//Remove selected task from list 
function removeTask(e) {
    if (e.target.classList.contains('fa')) {
        const listElement = e.target.parentElement.parentElement
        listElement.remove()
        for (i = 0; i < tasks.length; i++) {
            if (listElement.textContent == tasks[i]) {
                tasks.splice(i, 1)
            }
        }
    }
}

//clear all tasks in list and local storage
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
        filter.value = ''
    }
    localStorage.clear()
}

//filter task by user input 
function filterTasks(e) {
    const listItem = document.querySelectorAll('.collection-item')
    for (let i = 0; i < listItem.length; i++) {
        if (listItem[i].textContent.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
            listItem[i].style.display = 'block'
        } else {
            listItem[i].style.display = 'none'
        }
    }
}


//save each task stored in array into local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//displays all saved tasks when user re-loads page
window.onLoad = function () {
    savedTasks = (JSON.parse(localStorage.getItem('tasks')))
    if (savedTasks) {
        tasks = savedTasks
        tasks.forEach(function (item) {
            const list = document.createElement('li');
            const inputValue = document.createTextNode(item)
            const link = document.createElement('a')
            list.className = 'collection-item';
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-trash"></i>'
            list.appendChild(inputValue)
            list.appendChild(link)
            taskList.appendChild(list)
        })
    } else {
        savedTasks = []
    }
}

window.onLoad();


