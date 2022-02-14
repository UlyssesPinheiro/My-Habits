export const state = {
  amountOfDays: 0,
  displayedDays: [],
  currentDate: "",
  daySizePixels: 0,
  daySizeGap: 20,

  newHabitFormInput: {},
  habits: [],
};

export function init() {
  currentDate();
  calculateAmountOfDays();
  displayedDays();
  return state;
}

export function testing() {
  alert("working model.js");
}

export function calculateAmountOfDays() {
  const width = document.querySelector(".habit-progress").offsetWidth;
  const documentWidth = document.querySelector("body").offsetWidth;

  state.daySizePixels = documentWidth <= 700 ? 40 : 60;

  state.amountOfDays = Math.floor(
    width / (state.daySizePixels + state.daySizeGap)
  );
  // console.log("state day size pixels:", state.daySizePixels);
}

export function currentDate() {
  state.currentDate = new Date();
  // console.log(state.currentDate);
}

export function displayedDays() {
  state.displayedDays = [];
  // console.log(state.amountOfDays);
  for (let i = 0; i < state.amountOfDays; i++) {
    let calcDate = new Date(
      new Date().setDate(state.currentDate.getDate() + i)
    );
    state.displayedDays.push(calcDate);
  }
  // console.log(state.displayedDays);
}

export function getAddNewHabitFormInput(e) {
  state.newHabitFormInput.title =
    document.querySelector(".add-goal-title").value;
  state.newHabitFormInput.description = document.querySelector(
    ".add-goal-description"
  ).value;

  state.newHabitFormInput.partial = document.queryCommandIndeterm(
    "#partial-goal-checkbox"
  ).value;
  // state.newHabitFormInput.goalAmountValue =
  //   document.querySelector("#goal-amount-value").value;
  // state.newHabitFormInput.goalAmountUnit =
  //   document.querySelector("#goal-amount-unit").value;

  // state.newHabitFormInput.partialGoalAmountValue = document.querySelector(
  //   "#partial-goal-amount-value"
  // ).value;
  // state.newHabitFormInput.partialGoalAmountUnit = document.querySelector(
  //   "#partial-goal-amount-unit"
  // ).value;

  // console.log(state.newHabitFormInput);
  return state;
}

export function pushNewHabitToList(state) {
  state.habits.push(state.newHabitFormInput);
  console.log(state.habits);
}
