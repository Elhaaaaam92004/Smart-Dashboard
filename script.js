// ===== Elements =====
const greetingEl = document.getElementById('greeting');
const dateTimeEl = document.getElementById('date-time');
const goalInput = document.getElementById('goalInput');
const addGoalBtn = document.getElementById('addGoalBtn');
const goalList = document.getElementById('goalList');
const toggleThemeBtn = document.getElementById('toggleTheme');
const body = document.body;

// ===== Clock & Greeting =====
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const formattedTime = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    dateTimeEl.textContent = formattedTime;

    // Greeting with Font Awesome icons
    let greetingText = '';
    let iconHTML = '';

    if (hours >= 5 && hours < 12) {
        greetingText = "Good Morning";
        iconHTML = '<i class="fas fa-sun"></i>'; // Sunrise icon alternative
    } else if (hours >= 12 && hours < 18) {
        greetingText = "Good Afternoon";
        iconHTML = '<i class="fas fa-cloud-sun"></i>'; // Sun behind cloud
    } else if (hours >= 18 && hours < 20) {
        greetingText = "Good Evening";
        iconHTML = '<i class="fas fa-sunset"></i>'; // Sunset
    } else {
        greetingText = "Good Night";
        iconHTML = '<i class="fas fa-moon"></i>'; // Moon
    }

    greetingEl.innerHTML = `${greetingText} ${iconHTML}`;
}

setInterval(updateTime, 1000);
updateTime();

// ===== Goals Functionality =====
let goals = JSON.parse(localStorage.getItem('goals')) || [];

// Function to display goals
function displayGoals() {
    goalList.innerHTML = '';
    goals.forEach((goal, index) => {
        const li = document.createElement('li');

        // Add goal text and trash icon
        li.innerHTML = `
            <span class="goal-text">${goal}</span>
            <span class="delete"><i class="fas fa-trash-alt"></i></span>
        `;

        // Delete goal on trash click
        li.querySelector('.delete').addEventListener('click', () => removeGoal(index));

        // Add a small fade-in animation
        li.style.opacity = 0;
        li.style.transform = 'translateY(-10px)';
        goalList.appendChild(li);
        setTimeout(() => {
            li.style.transition = 'all 0.3s ease';
            li.style.opacity = 1;
            li.style.transform = 'translateY(0)';
        }, 10);
    });
}

// Function to add a goal
function addGoal() {
    const goalText = goalInput.value.trim();
    if (goalText !== '') {
        goals.push(goalText);
        localStorage.setItem('goals', JSON.stringify(goals));
        goalInput.value = '';
        displayGoals();
    } else {
        alert("Please type a goal first!");
    }
}

// Function to remove a goal
function removeGoal(index) {
    goals.splice(index, 1);
    localStorage.setItem('goals', JSON.stringify(goals));
    displayGoals();
}

// Add goal on button click
addGoalBtn.addEventListener('click', addGoal);

// Display goals on page load
displayGoals();

// ===== Theme Toggle =====
toggleThemeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
});