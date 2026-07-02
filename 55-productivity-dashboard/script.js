// --- TIMER LOGIC ---
let timeLeft = 25 * 60;
let timerId = null;
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
    if (timerId === null) {
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerId);
                timerId = null;
                startBtn.innerHTML = '<i class="bi bi-play-fill"></i> Start';
                alert('Focus time is up! Take a short break.');
                timeLeft = 25 * 60;
                updateTimerDisplay();
            }
        }, 1000);
        startBtn.innerHTML = '<i class="bi bi-pause-fill"></i> Pause';
    } else {
        clearInterval(timerId);
        timerId = null;
        startBtn.innerHTML = '<i class="bi bi-play-fill"></i> Resume';
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25 * 60;
    updateTimerDisplay();
    startBtn.innerHTML = '<i class="bi bi-play-fill"></i> Start';
});


// --- TASK LIST LOGIC ---
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    
    // Prevent scrolling by limiting to 4 items max
    if (taskList.children.length >= 4) {
        alert("Maximum 4 tasks allowed to keep the interface compact!");
        return;
    }

    if (taskText !== "") {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-task-btn"><i class="bi bi-trash"></i></button>
        `;
        
        // Toggle completed status on click
        li.querySelector('span').addEventListener('click', function() {
            li.classList.toggle('completed');
        });
        
        // Delete button logic
        li.querySelector('.delete-task-btn').addEventListener('click', function() {
            li.remove();
        });

        taskList.appendChild(li);
        taskInput.value = "";
    }
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTaskBtn.click();
});


// --- LOCALSTORAGE (Saves notes automatically) ---
const quickNote = document.getElementById('quickNote');

if(localStorage.getItem('quick_dashboard_note')) {
    quickNote.value = localStorage.getItem('quick_dashboard_note');
}

quickNote.addEventListener('input', () => {
    localStorage.setItem('quick_dashboard_note', quickNote.value);
});