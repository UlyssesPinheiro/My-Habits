export const state = {
  amountOfDays: 0,
  displayedDays: [],
  currentDate: "",
  daySizePixels: 0,
  daySizeGap: 20,
  habitEditOptionsShown: false,

  newHabitFormInput: {},
  habits: [],
};

export function init() {
  currentDate();
  calculateAmountOfDays();
  displayedDays();
  if (JSON.parse(localStorage.getItem("storageHabits"))) {
    state.habits = JSON.parse(localStorage.getItem("storageHabits"));
  }
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

export function getAddNewHabitFormInput() {
  state.newHabitFormInput.title =
    document.querySelector(".add-goal-title").value;
  state.newHabitFormInput.description = document.querySelector(
    ".add-goal-description"
  ).value;

  state.newHabitFormInput.partial = document.querySelector(
    "#partial-goal-checkbox"
  ).checked;

  state.newHabitFormInput.data = [];
  // console.log(state.newHabitFormInput);

  pushNewHabitToList();
}

export function pushNewHabitToList() {
  const newObj = { ...state.newHabitFormInput };
  state.habits.unshift(newObj);
  // console.log(state.newHabitFormInput);
  // console.log(state.habits);
  setStorage();
}

export function editHabit(e) {
  // console.log(e);
  const index = Array.from(e.parentNode.children).indexOf(e);

  const days = document.querySelector(".days");
  const currentDay = Array.from(days.children)[index];

  const currentTime = currentDay.getAttribute("date");

  //find which habit is the target
  const habit = e
    .closest(".habit-progress")
    .previousElementSibling.querySelector("h2").innerHTML;

  const currentHabit =
    state.habits[state.habits.findIndex((e) => e.title === habit)];

  const dayAlreadyExists = currentHabit.data.findIndex((e) => {
    // console.log(e[0]);
    return e[0] === currentTime;
  });

  if (dayAlreadyExists !== -1) {
    currentHabit.data[dayAlreadyExists][1] =
      !currentHabit.data[dayAlreadyExists][1];
  } else {
    currentHabit.data.push([currentTime, true]);
  }

  setStorage();
}

export function setStorage() {
  localStorage.setItem("storageHabits", JSON.stringify(state.habits));
}

export function deleteHabit(target) {
  const name = target.querySelector(".habit-h2").innerHTML;
  console.log(
    name,
    state.habits,
    state.habits.findIndex((e) => e.title === name)
  );
  const index = state.habits.findIndex((e) => e.title === name);
  state.habits.splice(index, 1);
  console.log(state.habits);
  setStorage();
}
