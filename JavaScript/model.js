export const state = {
  amountOfDays: 0,
  displayedDays: [],
  currentDate: "",
  currentPageDate: 0,
  daySizePixels: 0,
  daySizeGap: 20,
  habitEditOptionsShown: false,

  currentHabit: "",
  newHabitFormInput: {},
  newNoteFormInput: {},
  habits: [],
  archivedHabits: [],
  notes: [],

  showingArchived: false,
};
// Note format:
// {
//   text: "this is a note text",
//   date: "Wed Feb 23 2022",
// },

export function init() {
  currentDate();
  calculateAmountOfDays();
  displayedDays();
  if (JSON.parse(localStorage.getItem("habits"))) {
    state.habits = JSON.parse(localStorage.getItem("habits"));
  }
  if (JSON.parse(localStorage.getItem("archivedHabits"))) {
    state.archivedHabits = JSON.parse(localStorage.getItem("archivedHabits"));
  }
  if (JSON.parse(localStorage.getItem("notes"))) {
    state.notes = JSON.parse(localStorage.getItem("notes"));
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
    width / (state.daySizePixels + state.daySizeGap) - 0.5
  );
}

export function currentDate() {
  state.currentDate = new Date();
}

export function displayedDays(changeDays = false) {
  let displaceNumber;
  if (changeDays === "forward") {
    displaceNumber = state.amountOfDays / 3;
  }
  if (changeDays === "backward") {
    displaceNumber = -1 * (state.amountOfDays / 3);
  }
  displaceNumber = Math.floor(displaceNumber);
  state.currentPageDate += displaceNumber ? displaceNumber : 0;
  console.log(state.currentPageDate);

  state.displayedDays = [];

  for (let i = 0; i < state.amountOfDays; i++) {
    let calcDate = new Date(
      new Date().setDate(
        state.currentDate.getDate() - i + state.currentPageDate
      )
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

export function getNoteFormInput() {
  state.newNoteFormInput.text = document.querySelector(
    ".note-form-description"
  ).value;

  state.newNoteFormInput.date = document
    .querySelector(".form-main-header")
    .innerHTML.slice(-15);
}

export function pushNewNoteToList() {
  const newObj = { ...state.newNoteFormInput };
  state.notes.unshift(newObj);

  setStorage();
}

export function saveNote() {
  const index = findNoteIndex(state.newNoteFormInput.date);

  state.notes[index].text = `${state.newNoteFormInput.text}`;
  state.notes[index].date = `${state.newNoteFormInput.date}`;

  setStorage();
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
  let habitList;
  if (!state.showingArchived) {
    habitList = state.habits;
  }
  if (state.showingArchived) {
    habitList = state.archivedHabits;
  }

  const currentTime = findCurrentDate(e);

  //find which habit is the target
  const habit = e
    .closest(".habit-progress")
    .previousElementSibling.querySelector("h2").innerHTML;

  const currentHabit = habitList[habitList.findIndex((e) => e.title === habit)];

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

export function findCurrentDate(e) {
  const index = Array.from(e.parentNode.children).indexOf(e);
  const days = document.querySelector(".days");
  const currentDay = Array.from(days.children)[index + 1];
  // plus 1 because of the navication arrow (counts as a child)

  return currentDay.getAttribute("date");
}

export function findNote(e) {
  const currentTime = findCurrentDate(e);
  //find which Note is the target
  const noteIndex = state.notes.findIndex((note) => note.date === currentTime);

  return state.notes[noteIndex];
}

export function setStorage() {
  localStorage.setItem("habits", JSON.stringify(state.habits));
  localStorage.setItem("archivedHabits", JSON.stringify(state.archivedHabits));
  localStorage.setItem("notes", JSON.stringify(state.notes));
}

export function deleteHabit(target, habitList = state.habits) {
  const index = findHabitIndex(target);
  habitList.splice(index, 1);

  changeCurrentHabit("");
  setStorage();
}

export function archiveHabit(target) {
  const index = findHabitIndex(target);
  state.archivedHabits.push(state.habits[index]);
  state.habits.splice(index, 1);
  changeCurrentHabit("");
  setStorage();
}

export function unarchiveHabit(target) {
  const index = findHabitIndex(target, state.archivedHabits);
  state.habits.push(state.archivedHabits[index]);
  state.archivedHabits.splice(index, 1);
  changeCurrentHabit("");
  setStorage();
}

export function changeCurrentHabit(habit) {
  state.currentHabit = habit;
}

export function findHabitIndex(target, habitList = state.habits) {
  const nameFound = `${target?.querySelector(".habit-h2").innerHTML}`;
  return habitList.findIndex((e) => e.title === nameFound);
}

export function findNoteIndex(date) {
  return state.notes.findIndex((e) => {
    return e.date === date;
  });
}
