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

  state.newHabitFormInput.partial = document.querySelector(
    "#partial-goal-checkbox"
  ).checked;

  state.newHabitFormInput.data = [];

  return state;
}

export function pushNewHabitToList(state) {
  state.habits.push(state.newHabitFormInput);
  console.log(state.habits);
}

export function editHabit(e) {
  console.log(e);
  const index = Array.from(e.parentNode.children).indexOf(e);

  const days = document.querySelector(".days");
  const currentDay = Array.from(days.children)[index];

  const currentTime = currentDay.getAttribute("date");

  //find which habit is the target
  const habit = e
    .closest(".habit-progress")
    .previousElementSibling.querySelector("h2").innerHTML;

  const stateHabit =
    state.habits[state.habits.findIndex((e) => e.title === habit)];

  const dayAlreadyExists = stateHabit.data.findIndex(
    (e) => e[0] === currentTime
  );

  console.log(dayAlreadyExists);
  if (dayAlreadyExists !== -1) {
    stateHabit.data[dayAlreadyExists][1] =
      !stateHabit.data[dayAlreadyExists][1];
    console.log(stateHabit.data[dayAlreadyExists]);
    console.log(state);
    return;
  }

  stateHabit.data.push([currentTime, true]);
}
