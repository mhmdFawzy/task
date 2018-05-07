// select UI variables to minupulate 
const form = document.getElementById("task-form");
const allTasks = document.querySelector(".all-tasks");
const addTaskInput = document.getElementById("add-task");
const clearTasks = document.querySelector(".clear-tasks");
const filterTasks = document.getElementById("task-filter");
let tasks;
if (localStorage.getItem('tasks') === null) {
    tasks = [];
} else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

// make all event listeners in one functions
getEventListeners();

function getEventListeners() {
    document.addEventListener('DOMContentLoaded', loadTasks)
    form.addEventListener('submit', addTask);
    allTasks.addEventListener('click', removeTask);
    clearTasks.addEventListener('click', removeAllTasks);
    filterTasks.addEventListener('keyup', filterAllTasks)
}

// view tasks function
function loadTasks() {
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = "single-task list-group-item";
        li.appendChild(document.createTextNode(task));
        const deleteLink = document.createElement('a');
        deleteLink.className = "delete-item float-right";
        deleteLink.innerHTML = 'Delete <i class="fas fa-times text-danger"></i>';
        li.appendChild(deleteLink);
        allTasks.appendChild(li);
    })
}

// add task function
function addTask(e) {
    if (addTaskInput.value === "") {
        alert('Please eneter a new task');
    } else {
        const li = document.createElement('li');
        li.className = "single-task list-group-item";
        li.appendChild(document.createTextNode(addTaskInput.value));
        const deleteLink = document.createElement('a');
        deleteLink.className = "delete-item float-right";
        deleteLink.innerHTML = 'Delete <i class="fa s fa-times text-danger"></i>';
        li.appendChild(deleteLink);
        allTasks.appendChild(li);
        // store in Local storage
        storeTaskInLocalStorage(addTaskInput.value);

        addTaskInput.value = "";
    }
    // prevent default event from happeinig which here is submit
    e.preventDefault();
}
// store in local storage function
function storeTaskInLocalStorage(task) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// remove from local storage function
function removeLS(taskContent) {
    tasks.forEach(function (task, index) {
        if (taskContent.textContent === task + 'Delete ') {
            tasks.splice(index, 1);
            console.log('yesh');
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
      if(confirm('Are You Sure?')) {
        e.target.parentElement.parentElement.remove();
  
        // Remove from LS
        removeLS(e.target.parentElement.parentElement);
      }
    }
  }
// clear all tasks function
function removeAllTasks(e) {
    while (allTasks.firstElementChild) {
        allTasks.removeChild(allTasks.firstElementChild);
    }
    localStorage.clear();
    tasks = [];

}
// filter the tasks function
function filterAllTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.single-task').forEach(
        function (task) {
            // const item = task.textContent;
            if (task.textContent.toLowerCase().indexOf(text) != -1) {
                task.style.display = "block";
            } else {
                task.style.display = "none";
            }
        }
    );
}