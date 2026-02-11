

// //var
// const workouts = [];

// //DOM 
// //Form inputs
// const dateInput = document.getElementById("date");
// const dayInput = document.getElementById("day");
// const exerciseInput = document.getElementById("exercise");
// const setsInput = document.getElementById("sets");
// const repsInput = document.getElementById("reps");
// const weightInput = document.getElementById("weight");
// const unitInput = document.getElementById("unit");


// //bottons
// const addWorkoutBtn = document.getElementById("add-workout-btn");
// const showProgressBtn = document.getElementById("show-progress-btn");


// const workoutList = document.getElementById("workout-list");
// const progressExerciseInput = document.getElementById("progress-exercise-input");
// const progressOutput = document.getElementById("progress-output");

// //Eventlistener
// addWorkoutBtn.addEventListener('click', function () {
//     const date = dateInput.value;
//     const day = dayInput.value;
//     const exercise = exerciseInput.value;
//     const sets = Number(setsInput.value);
//     const reps = Number(repsInput.value);
//     const weight = Number(weightInput.value);
//     const unit = unitInput.value;

//   // very simple check so we don't push empty things
//   if (exercise === "") {
//     alert("Please enter an exercise name.");
//     return;
//   }


// /// object:
//   const workout = {
//     date: date,
//     day: day,
//     exercise: exercise,
//     sets: sets,
//     reps: reps,
//     weight: weight,
//     unit: unit
//   };

// //array push() method:
// workouts.push(workout);
// renderWorkouts();

// exerciseInput.value = "";
// setsInput.value = "";
// repsInput.value = "";
// weightInput.value = "";
// });

// function renderWorkouts(){
//     workoutList.innerHTML = '';

//     if ( workouts.length === 0){
//         workoutList.textContent = 'No workouts yet. ';
//         return;
//     }

//     for ( let i = 0; i < workouts.length; i++){
//         const w = workouts[i];

//         const item = document.createElement('div');
//         item.className = 'workout-item';

//         const text = 
//         w.date + '(' + w.day +') - '+
//         w.exercise + ': ' +
//         w.sets + ' sets,' +
//         w.reps + ' reps, ' +
//         'Weight: ' + w.weight + '' + w.unit;


//         const span = document.createElement('span');
//         span.textContent = text;

//         const deleteBtn = document.createElement('button');
//         deleteBtn.textContent = 'Delete';

//        deleteBtn.addEventListener("click", function () {
//        workouts.splice(i, 1); 
//        renderWorkouts(); 
//     });

//         item.appendChild(span);
//         item.appendChild(deleteBtn);

//         workoutList.appendChild(item);
//     }
// }

//     showProgressBtn.addEventListener('click', function() {
//     const name = progressExerciseInput.value;

//     if (name === ''){
//         progressOutput.textContent = 'Please type an exercise name.';
//         return;

//     }
//     let totalSets = 0;
//     let maxWeight = 0;
//     let count = 0;

//     for(let i = 0; i < workouts.length; i++){
//         const w = workouts[i];

//         if (w.exercise.toLowerCase() === name.toLowerCase()){
//             totalSets = totalSets + w.sets;

//             if (w.weight > maxWeight) {
//                 maxWeight = w.weight;
//             }

//             count = count +1;

//         }
//     }

//     if (count === 0) {
//         progressOutput.textContent = 'No workouts found for that exercise.';
//     } else {
//         progressOutput.innerHTML = 
//         '<p>Exercise: ' + name + '</p>' +
//         '<p>Total sets: ' + totalSets + '</p>' +
//         '<p>Heaviest weight: ' + maxWeight + '</p>';
        
//     }

// });


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
