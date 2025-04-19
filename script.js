const taskInput =document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filters = document.querySelector('.filters');

let tasks = [];

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}); 

function renderTasks(filter='all'){
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => 
        filter === 'all' || 
        (filter === 'completed' && task.completed) || 
        (filter === 'pending' && !task.completed)
    );

filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.className = task.completed ? 'completed' : '';
    taskItem.innerHTML = `
        <span>${task.text}</span>
        <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="deleteTask(${index})">Trash</button>
    `;
    taskList.appendChild(taskItem);
});
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

filters.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        renderTasks(event.target.getAttribute('data-filter'));
    }
});
