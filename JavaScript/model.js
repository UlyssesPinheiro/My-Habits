export const state = {
  amountOfDays: 0,
  displayedDays: [],
  currentDate: "",
  daySizePixels: 0,
  daySizeGap: 20,
  habitEditOptionsShown: false,

  currentHabit: "",
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
      new Date().setDate(state.currentDate.getDate() - i)
    );
    state.displayedDays.unshift(calcDate);
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

export function editHabitFormInput() {
  state.newHabitFormInput.title =
    document.querySelector(".add-goal-title").value;
  state.newHabitFormInput.description = document.querySelector(
    ".add-goal-description"
  ).value;

  state.newHabitFormInput.partial = document.querySelector(
    "#partial-goal-checkbox"
  ).checked;
  console.log(state.newHabitFormInput);
}

export function editHabitName(habit) {
  habit.title = state.newHabitFormInput.title;
  habit.description = state.newHabitFormInput.description;
  habit.partial = state.newHabitFormInput.partial;
  console.log(habit);
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
  const index = findHabitIndex(target);
  state.habits.splice(index, 1);
  console.log(state.habits);
  changeCurrentHabit("");
  setStorage();
}
export function changeCurrentHabit(habit) {
  state.currentHabit = habit;
}

export function findHabitIndex(target) {
  let nameFound;
  // console.log(typeof target);
  if (typeof target === "object") {
    nameFound = target?.querySelector(".habit-h2").innerHTML;
  }
  if (typeof target === "string") nameFound = target;

  // console.log(
  //   nameFound,
  //   state.habits,
  //   state.habits.findIndex((e) => e.title === nameFound)
  // );
  return state.habits.findIndex((e) => e.title === nameFound);
}
