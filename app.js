

//var
const workouts = [];

//DOM 
//Form inputs
const dateInput = document.getElementById("date");
const dayInput = document.getElementById("day");
const exerciseInput = document.getElementById("exercise");
const setsInput = document.getElementById("sets");
const repsInput = document.getElementById("reps");
const weightInput = document.getElementById("weight");
const unitInput = document.getElementById("unit");


//bottons
const addWorkoutBtn = document.getElementById("add-workout-btn");
const showProgressBtn = document.getElementById("show-progress-btn");


const workoutList = document.getElementById("workout-list");
const progressExerciseInput = document.getElementById("progress-exercise-input");
const progressOutput = document.getElementById("progress-output");

//Eventlistener
addWorkoutBtn.addEventListener('click', function () {
    const date = dateInput.value;
    const day = dayInput.value;
    const exercise = exerciseInput.value;
    const sets = Number(setsInput.value);
    const reps = Number(repsInput.value);
    const weight = Number(weightInput.value);
    const unit = unitInput.value;

  // very simple check so we don't push empty things
  if (exercise === "") {
    alert("Please enter an exercise name.");
    return;
  }


/// object:
  const workout = {
    date: date,
    day: day,
    exercise: exercise,
    sets: sets,
    reps: reps,
    weight: weight,
    unit: unit
  };

//array push() method:
workouts.push(workout);
renderWorkouts();

exerciseInput.value = "";
setsInput.value = "";
repsInput.value = "";
weightInput.value = "";
});

function renderWorkouts(){
    workoutList.innerHTML = '';

    if ( workouts.length === 0){
        workoutList.textContent = 'No workouts yet. ';
        return;
    }

    for ( let i = 0; i < workouts.length; i++){
        const w = workouts[i];

        const item = document.createElement('div');
        item.className = 'workout-item';

        const text = 
        w.date + '(' + w.day +') - '+
        w.exercise + ': ' +
        w.sets + ' sets,' +
        w.reps + ' reps, ' +
        'Weight: ' + w.weight + '' + w.unit;


        const span = document.createElement('span');
        span.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

       deleteBtn.addEventListener("click", function () {
       workouts.splice(i, 1); 
       renderWorkouts(); 
    });

        item.appendChild(span);
        item.appendChild(deleteBtn);

        workoutList.appendChild(item);
    }
}

    showProgressBtn.addEventListener('click', function() {
    const name = progressExerciseInput.value;

    if (name === ''){
        progressOutput.textContent = 'Please type an exercise name.';
        return;

    }
    let totalSets = 0;
    let maxWeight = 0;
    let count = 0;

    for(let i = 0; i < workouts.length; i++){
        const w = workouts[i];

        if (w.exercise.toLowerCase() === name.toLowerCase()){
            totalSets = totalSets + w.sets;

            if (w.weight > maxWeight) {
                maxWeight = w.weight;
            }

            count = count +1;

        }
    }

    if (count === 0) {
        progressOutput.textContent = 'No workouts found for that exercise.';
    } else {
        progressOutput.innerHTML = 
        '<p>Exercise: ' + name + '</p>' +
        '<p>Total sets: ' + totalSets + '</p>' +
        '<p>Heaviest weight: ' + maxWeight + '</p>';
        
    }

});
