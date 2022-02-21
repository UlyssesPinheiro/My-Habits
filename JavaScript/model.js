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
}

export function currentDate() {
  state.currentDate = new Date();
}

export function displayedDays() {
  state.displayedDays = [];

  for (let i = 0; i < state.amountOfDays; i++) {
    let calcDate = new Date(
      new Date().setDate(state.currentDate.getDate() - i)
    );
    state.displayedDays.unshift(calcDate);
  }
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

  pushNewHabitToList();
}

export function pushNewHabitToList() {
  const newObj = { ...state.newHabitFormInput };
  state.habits.unshift(newObj);

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
}

export function editHabitName(habit) {
  const index = findHabitIndex(habit); //must be object in DOM, not the title

  state.habits[index].title = state.newHabitFormInput.title;
  state.habits[index].description = state.newHabitFormInput.description;
  state.habits[index].partial = state.newHabitFormInput.partial;

  //   typeof state.newHabitFormInput.title,
  //   typeof state.newHabitFormInput.description,
  //   typeof state.newHabitFormInput.partial
  // );

  return state;
}

export function editHabit(e) {
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

  changeCurrentHabit("");
  setStorage();
}
export function changeCurrentHabit(habit) {
  state.currentHabit = habit;
}

export function findHabitIndex(target) {
  const nameFound = `${target?.querySelector(".habit-h2").innerHTML}`;

  return state.habits.findIndex((e) => e.title === nameFound);
}
