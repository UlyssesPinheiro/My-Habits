import * as model from "./model.js";
import * as view from "./Views/view.js";

const newHabitForm = document.querySelector(".add-goal-box");
const titleH1 = document.querySelector(".title-h1");
const habitsDiv = document.querySelector(".habits-div");
const daysDiv = document.querySelector(".days");

async function init() {
  model.init();
  view.renderObjects(model.state);
  view.renderHabits(model.state);

  window.addEventListener("resize", function () {
    model.init();
    view.renderObjects(model.state);
  });
}

init();

document.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target.style.display === "none") return;
  let habitForm = document.querySelector(".goal-box");

  if (e.target.closest(".save-habit")) {
    e.preventDefault();

    const button = e.target.closest(".save-habit");
    e.preventDefault();
    if (view.checkNewHabitFormInput()) {
      if (button.value === "Save Goal") {
        model.editHabitFormInput();
        model.editHabitName(model.state.currentHabit);
        view.renderHabits(model.state);
        model.setStorage();
      }
      if (button.value === "Create Goal") {
        model.getAddNewHabitFormInput();
      }
      view.deleteForm(habitForm);
      view.renderHabits(model.state);
      view.hideBackgroundDiv();
    }
    view.deleteForm(habitForm);
    return;
  }

  if (e.target.closest(".close-window-x")) {
    view.deleteForm(habitForm);
    view.hideBackgroundDiv();
    view.hideEditIcons("all");
    return;
  }

  if (e.target.closest(".logo-icon")) {
    console.log("click");
    model.state.showingArchived = !model.state.showingArchived;
    if (model.state.showingArchived) {
      view.renderHabits(model.state, true);
      view.changeHabitIconArchived(true);
      titleH1.textContent = "Archived habits";
    } else {
      view.renderHabits(model.state, false);
      view.changeHabitIconArchived(false);
      titleH1.textContent = "My habits";
    }
    view.hideAddNewHabit(model.state.showingArchived);
    return;
  }
  if (e.target.closest(".delete-confirm")) {
    e.preventDefault();

    if (model.state.showingArchived) {
      model.deleteHabit(
        e.target.closest(".habit-name"),
        model.state.archivedHabits
      );
    } else {
      model.deleteHabit(e.target.closest(".habit-name"));
    }
    view.renderHabits(model.state, model.state.showingArchived);
    view.deleteForm(e.target.closest("form"));
  }
  if (e.target.closest(".note-written")) {
    console.log("note-written");
    const note = model.findNote(e.target.closest(".note-written"));
    console.log(note);
    view.createNoteForm(undefined, note);
  }
  if (e.target.closest(".note-blank")) {
    console.log("note-blank");
    const note = e.target.closest(".note-blank");
    const date = model.findCurrentDate(note);
    view.createNoteForm(date);
  }

  if (e.target.closest(".create-note")) {
    e.preventDefault();
    model.getNoteFormInput();
    model.pushNewNoteToList();
    view.deleteForm(e.target.closest("form"));
    view.renderHabits(model.state, model.state.showingArchived);
    view.renderObjects(model.state, "note", model.state.showingArchived);
  }
  if (e.target.closest(".save-note")) {
    e.preventDefault();
    model.getNoteFormInput();
    model.saveNote();
    view.deleteForm(e.target.closest("form"));
    view.renderObjects(model.state, "note", model.state.showingArchived);
  }

  if (e.target.closest(".info-help-btn")) {
    e.preventDefault();

    view.showAboutPartialGoals();
    view.showBackgroundDiv();
  }
  if (e.target.closest(".go-back")) {
    view.hideAboutPartialGoals();
    view.showBackgroundDiv();
  }
});

habitsDiv.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.style.display === "none") return;
  let habitForm = document.querySelector(".goal-box");

  if (e.target.closest(".circle")) {
    console.log(model.state.habits);
    model.editHabit(e.target.closest(".circle"));
    view.renderHabits(model.state, model.state.showingArchived);
    view.hideAddNewHabit(model.state.showingArchived);
    return;
  }

  if (e.target.closest(".add-new-habit")) {
    console.log("add-new-habit");
    view.createForm();
    habitForm = document.querySelector(".goal-box");
    view.clearForm(habitForm);
    view.showBackgroundDiv(habitForm);
    return;
  }

  if (e.target.closest(".habit-edit")) {
    // const habit =
    const habit =
      model.state.habits[model.findHabitIndex(e.target.closest(".habit-name"))];

    model.changeCurrentHabit(e.target.closest(".habit-name"));
    view.hideEditIcons("all");
    view.showEditIcons(e.target.closest(".habit-name"));
    return;
  }
  if (e.target.closest(".hide-edit")) {
    view.hideEditIcons("all");
    return;
  }

  if (e.target.closest(".habit-rename")) {
    console.log("habit-rename");
    const habit =
      model.state.habits[model.findHabitIndex(e.target.closest(".habit-name"))];

    view.createForm(habit);
    habitForm = document.querySelector(".goal-box");
    view.showBackgroundDiv();
    return;
  }

  if (e.target.closest(".habit-archive")) {
    console.log("archive");
    model.archiveHabit(e.target.closest(".habit-name"));
    view.renderHabits(model.state);
    return;
  }

  if (e.target.closest(".habit-unarchive")) {
    console.log("unarchive");

    model.unarchiveHabit(e.target.closest(".habit-name"));
    view.renderHabits(model.state, model.state.showingArchived);
    return;
  }

  if (e.target.closest(".habit-delete")) {
    const habitList = model.state.showingArchived
      ? model.state.archivedHabits
      : model.state.habits;
    const habit =
      habitList[
        model.findHabitIndex(e.target.closest(".habit-name"), habitList)
      ];
    view.confirmDeletePopUp(habit);
    return;
  }
});

document.querySelector(".credits-link").addEventListener("click", (e) => {
  e.preventDefault();
  view.showCredits();
  view.showBackgroundDiv();
});

daysDiv.addEventListener("click", (e) => {
  if (e.target.closest(".nav-days-right")) {
    model.displayedDays("forward");
    view.renderObjects(model.state);
    view.renderHabits(model.state);
  }
  if (e.target.closest(".nav-days-left")) {
    model.displayedDays("backward");
    view.renderObjects(model.state);
    view.renderHabits(model.state);
  }
});
