


const workouts = [];


// DOM Elements

const dateInput = document.getElementById("date");
const dayInput = document.getElementById("day");
const exerciseInput = document.getElementById("exercise");
const setsInput = document.getElementById("sets");
const repsInput = document.getElementById("reps");
const weightInput = document.getElementById("weight");
const unitInput = document.getElementById("unit");

const addWorkoutBtn = document.getElementById("add-workout-btn");
const showProgressBtn = document.getElementById("show-progress-btn");

const workoutList = document.getElementById("workout-list");
const progressExerciseInput = document.getElementById("progress-exercise-input");
const progressOutput = document.getElementById("progress-output");


// Add Workout

addWorkoutBtn.addEventListener("click", function () {
  const workout = {
    date: dateInput.value,
    day: dayInput.value,
    exercise: exerciseInput.value.trim(),
    sets: Number(setsInput.value),
    reps: Number(repsInput.value),
    weight: Number(weightInput.value),
    unit: unitInput.value
  };

  if (workout.exercise === "") {
    showMessage(
      "Please enter an exercise name.",
      "danger"
    );
    return;
  }

  workouts.push(workout);
  renderWorkouts();
  clearForm();
});


// Render Workouts

function renderWorkouts() {
  workoutList.innerHTML = "";

  if (workouts.length === 0) {
    workoutList.innerHTML = `
      <div class="text-muted text-center py-3">
        No workouts added yet.
      </div>
    `;
    return;
  }

  workouts.forEach((w, index) => {
    const item = document.createElement("div");
    item.className = "list-group-item d-flex justify-content-between align-items-center";

    item.innerHTML = `
      <div>
        <strong>${w.exercise}</strong><br>
        <small class="text-muted">
          ${w.date || "No date"} (${w.day || "No day"}) • 
          ${w.sets} sets × ${w.reps} reps • 
          ${w.weight}${w.unit}
        </small>
      </div>

      <button class="btn btn-sm btn-outline-danger">
        🗑
      </button>
    `;

    item.querySelector("button").addEventListener("click", function () {
      workouts.splice(index, 1);
      renderWorkouts();
    });

    workoutList.appendChild(item);
  });
}


// Progress

showProgressBtn.addEventListener("click", function () {
  const name = progressExerciseInput.value.trim().toLowerCase();

  if (name === "") {
    progressOutput.innerHTML = `
      <div class="alert alert-warning">
        Please enter an exercise name.
      </div>
    `;
    return;
  }

  let totalSets = 0;
  let maxWeight = 0;
  let count = 0;

  workouts.forEach(w => {
    if (w.exercise.toLowerCase() === name) {
      totalSets += w.sets;
      maxWeight = Math.max(maxWeight, w.weight);
      count++;
    }
  });

  if (count === 0) {
    progressOutput.innerHTML = `
      <div class="alert alert-info">
        No workouts found for <strong>${name}</strong>.
      </div>
    `;
  } else {
    progressOutput.innerHTML = `
      <div class="alert alert-success">
        <p class="mb-1"><strong>Exercise:</strong> ${name}</p>
        <p class="mb-1"><strong>Total sets:</strong> ${totalSets}</p>
        <p class="mb-0"><strong>Heaviest weight:</strong> ${maxWeight}</p>
      </div>
    `;
  }
});


function clearForm() {
  exerciseInput.value = "";
  setsInput.value = "";
  repsInput.value = "";
  weightInput.value = "";
}

function showMessage(message, type) {
  progressOutput.innerHTML = `
    <div class="alert alert-${type}">
      ${message}
    </div>
  `;
}
