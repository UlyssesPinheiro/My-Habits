const circle = `<div class="circle view-icon"></div>`;
// const note = `<div class="note"><img class="view-icon" src="Icons/noteBlank.svg" alt="notes image" /></div>`;
const note = `<img class="note view-icon" src="Icons/noteBlank.svg" alt="notes image" />`;
const day = `
<div class="day">
  <span class="day-h1">17</span>
    <div class="divider-days-weeks"></div>
  <span class="day-h1 weekday">M</span>
</div>`;
const newHabitForm = document.querySelector(".add-goal-box");

function init() {
  clearForm(newHabitForm);
  hideForm(newHabitForm);
}
init();

export function renderObjects(state) {
  createObjects(day, `.days`, state, true);
  createObjects(circle, `.habit-progress`, state);
  createObjects(note, `.notes`, state);
}

export function createObjects(object = "", targetElement, state, weekdays) {
  const { amountOfDays, displayedDays } = state;
  // console.log(displayedDays[0].getDate());

  const habitProgress = document.querySelectorAll(targetElement);
  [...habitProgress].forEach((element) => {
    let markup = "";
    for (let i = 0; i < amountOfDays; i++) {
      if (weekdays === true) {
        object = `
        <div class="day">
          <h1 class="day-h1">${displayedDays[i].getDate()}</h1>
            <div class="divider-days-weeks"></div>
          <h1 class="day-h1 weekday">${displayedDays[i]
            .toLocaleTimeString("en-us", {
              weekday: "short",
            })
            .at(0)}</h1>
        </div>`;
      }
      markup = markup + `${object}`;
    }
    element.innerHTML = markup;
  });
  document.querySelector(".habit-progress:last-child").innerHTML = "";
  // console.log(document.querySelector(".habit-progress:last-child"));
}

export function createNewHabit(state) {
  hideForm(newHabitForm);
  const element = document.querySelector(".habits-div");

  // <i class="fas fa-pen icon icon-h2"></i>
  const markup = `
  <div class="habit-name">
    <h2 class="habit-h2">${state.newHabitFormInput.title}</h2>
    <i class="fas fa-pen icon icon-h2"></i>
  </div>
  <div class="habit-progress">Habit Progress</div>`;

  element.insertAdjacentHTML("afterbegin", markup);
  renderObjects(state);
}

export function showForm(form) {
  form.style.display = "grid";
}

export function hideForm(form) {
  form = idForm(form);
  form.style.display = "none";
  clearForm(form);
}

export function clearForm(form) {
  //removes the required warnings
  form
    .querySelectorAll(".form-required")
    .forEach((e) => e.classList.remove("form-required"));

  //removes the previus input values
  form.querySelectorAll("input").forEach((e) => {
    if (e.getAttribute("type") === "submit") return;
    return (e.value = "");
  });
  form.querySelectorAll("textarea").forEach((e) => {
    return (e.value = "");
  });
}

export function idForm(e) {
  if (e.target) {
    return e.target.closest("form");
  }
  return e.closest("form");
}

export function checkNewHabitFormInput() {
  const title = document.querySelector(".add-goal-title");
  const goalAmountValue = document.querySelector("#goal-amount-value");
  const partialGoalAmountValue = document.querySelector(
    "#partial-goal-amount-value"
  );

  if (title.value && goalAmountValue.value && partialGoalAmountValue.value) {
    // Correct
    return true;
  } else {
    // Incorrect
    if (!title.value) title.classList.add("form-required");
    if (!goalAmountValue.value) goalAmountValue.classList.add("form-required");
    if (!partialGoalAmountValue.value)
      partialGoalAmountValue.classList.add("form-required");
    return false;
  }
}
