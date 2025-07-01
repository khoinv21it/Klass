setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const greeting = hours < 12 ? "Good morning!" : hours >= 18 ? "Good evening!" : "Good afternoon!";
    document.getElementById("greeting").textContent = greeting;
    document.getElementById("clock").textContent = now.toLocaleTimeString();
}, 1000);

// to do
const taskInput = document.getElementById('taskInput');
const addTask = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const taskError = document.getElementById('taskError');
const filterButtons = document.querySelectorAll('.filter-btn');

addTask.addEventListener('click', () => {
    console.log('Add Task button clicked');
    const taskText = taskInput.value.trim();
    if (!taskText) {
        taskError.classList.remove('hidden', false);
        taskError.textContent = "Please enter a task.";
        return;
    }
    taskError.classList.toggle('hidden', true);
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `<input type="checkbox"> <span>${taskText}</span> <button class="delete-btn">Delete</button>`;
    taskList.appendChild(li);
    taskInput.value = '';
    li.querySelector('input[type="checkbox"]').onchange = (e) => {
        li.classList.toggle('completed', e.target.checked);
        filterTasks();
    }
    li.querySelector('.delete-btn').onclick = () => li.remove();
});

filterButtons.forEach(button => {
    button.onclick = () => {
      filterTasks(button.dataset.filter);
    };
});

function filterTasks(filter = 'all') {
    const tasks = taskList.getElementsByTagName('li');
    for (let task of tasks) {
      if (filter === 'completed') {
        task.style.display = task.classList.contains('completed') ? '' : 'none';
      } else if (filter === 'incomplete') {
        task.style.display = !task.classList.contains('completed') ? '' : 'none';
      } else {
        task.style.display = '';
      }
    }
}

// sticky

const noteInput = document.getElementById('noteInput');
const addNote = document.getElementById('addNote');
const noteContainer = document.getElementById('noteContainer');
const noteError = document.getElementById('noteError');
const colors = [
    '#c8e6c9', '#ffccbc', '#bbdefb', 
    '#f8bbd0', '#d1c4e9', '#b2dfdb',
    '#ffe082', '#ffab91', '#80cbc4', 
    '#a5d6a7', '#90caf9', '#ce93d8', 
    '#ff8a65', '#ffd54f', '#e57373', 
    '#4db6ac', '#64b5f6', '#ba68c8',
    '#f06292', '#81c784', '#fff176', 
    '#aed581', '#9575cd', '#7986cb'
];

addNote.addEventListener('click', () => {
  const noteText = noteInput.value.trim();
  if (!noteText) {
    noteError.classList.toggle('hidden', false);
    noteError.textContent = "Note cannot be empty!";
    return;
  }
  noteError.classList.toggle('hidden', true);
  const div = document.createElement('div');
  div.className = 'note';
  div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  div.innerHTML = `${noteText} <span class="delete-btn text-red-500">×</span>`;
  noteContainer.appendChild(div);
  noteInput.value = '';
  div.querySelector('.delete-btn').onclick = () => div.remove();
});