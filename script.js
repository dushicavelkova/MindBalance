// =======================
// Mood Selection
// =======================

const moodButtons = document.querySelectorAll(".emoji");
const selectedMood = document.getElementById("selectedMood");
const tipBox = document.getElementById("tipBox");

const tips = {
    Amazing: "Fantastic! Keep spreading your positive energy today. 🌞",
    Happy: "You're doing great! Take a moment to appreciate something good today. 😊",
    Okay: "It's okay to have an average day. A short walk or your favorite music can help. 🎵",
    Sad: "Remember that difficult days don't last forever. Talk to someone you trust. 💜",
    Stressed: "Take a deep breath. Try resting for a few minutes and focus on one task at a time. 🌿"
};

moodButtons.forEach(button => {

    button.addEventListener("click", () => {

        const mood = button.dataset.mood;

        selectedMood.textContent = "Today's Mood: " + mood;

        tipBox.textContent = tips[mood];

        localStorage.setItem("selectedMood", mood);

    });

});

// Load saved mood
const savedMood = localStorage.getItem("selectedMood");

if(savedMood){

    selectedMood.textContent = "Today's Mood: " + savedMood;

    tipBox.textContent = tips[savedMood];

}



const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

});
let water = Number(localStorage.getItem("water")) || 0;

const waterCount = document.getElementById("waterCount");

function updateWater(){

    waterCount.textContent = water + " / 8 glasses";

}

updateWater();

document.getElementById("addWater").addEventListener("click",()=>{

    if(water < 8){

        water++;

        localStorage.setItem("water",water);

        updateWater();

    }

});


// =======================
// Journal
// =======================

const journal = document.getElementById("journal");
const saveJournal = document.getElementById("saveJournal");

journal.value = localStorage.getItem("journal") || "";

saveJournal.addEventListener("click", () => {

    localStorage.setItem("journal", journal.value);

    alert("Journal saved successfully!");

});



// =======================
// Habit Tracker
// =======================

const checkboxes = document.querySelectorAll(".habit-check");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

function updateProgress(){

    let checked = 0;

    checkboxes.forEach((checkbox,index)=>{

        if(checkbox.checked){
            checked++;
        }

        localStorage.setItem("habit"+index,checkbox.checked);

    });

    const percent = (checked / checkboxes.length) * 100;

    progressFill.style.width = percent + "%";

    progressText.textContent = Math.round(percent) + "%";

}

const quotes = [
    "Small steps every day lead to big changes.",
    "Your mental health is just as important as your physical health.",
    "Believe in yourself.",
    "Take care of yourself first.",
    "Progress, not perfection.",
    "Every day is a fresh start."
];

const quote = document.getElementById("quote");

quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];

checkboxes.forEach((checkbox,index)=>{

    const saved = localStorage.getItem("habit"+index);

    if(saved === "true"){
        checkbox.checked = true;
    }

    checkbox.addEventListener("change",updateProgress);

});

updateProgress();



// =======================
// Weekly Mood Chart
// =======================

const ctx = document.getElementById("moodChart");

new Chart(ctx,{

    type:"bar",

    data:{

        labels:[
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ],

        datasets:[{

            label:"Mood Score",

            data:[4,5,3,4,2,5,4],

            borderWidth:1

        }]

    },

    options:{

        responsive:true,

        scales:{
            y:{
                beginAtZero:true,
                max:5
            }
        }

    }

});