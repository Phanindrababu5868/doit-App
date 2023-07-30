let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const filterSelect = document.getElementById('filterSelect');
const searchInput = document.getElementById('searchInput');

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'task-completed' : 'task-uncompleted'}`;
        li.innerHTML = `
            <button class="completed-btn" onclick="toggleComplete(${index})">${task.completed ? 'uncompleted' : 'completed'}</button>
            <p  class='${task.completed ? 'completed' : 'un-completed'}'>${task.text}</p>
            <button onclick="deleteTask(${index})" class="delete-icon">&times;</button>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({
            text: taskText,
            completed: false
        });
        saveTasks();
        renderTasks();
        taskInput.value = '';
    } else {
        alert("Enter Valid Text")
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function renderFilteredTasks(filteredTasks) {
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'task-completed' : 'task-uncompleted'}`;
        li.innerHTML = `
            <button class="completed-btn" onclick="toggleComplete(${index})">${task.completed ? 'uncompleted' : 'completed'}</button>
            <p  class='${task.completed ? 'completed' : 'un-completed'}'>${task.text}</p>
            <button onclick="deleteTask(${index})" class="delete-icon">&times;</button>
        `;
        taskList.appendChild(li);
    });
}

function filterTasks() {
    const filterValue = filterSelect.value;
    if (filterValue === 'all') {
        renderTasks();
    } else if (filterValue === 'completed') {
        const completedTasks = tasks.filter(task => task.completed);
        renderFilteredTasks(completedTasks);
    } else if (filterValue === 'uncompleted') {
        const uncompletedTasks = tasks.filter(task => !task.completed);
        renderFilteredTasks(uncompletedTasks);
    }
}



function searchTasks() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchTerm));
    renderFilteredTasks(filteredTasks);
}

// Initial rendering of tasks
renderTasks();