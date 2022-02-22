import * as model from "./model.js";
import * as view from "./Views/view.js";

const newHabitForm = document.querySelector(".add-goal-box");
const titleH1 = document.querySelector(".title-h1");
const habitsDiv = document.querySelector(".habits-div");

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
  console.log(e.target);
  let habitForm = document.querySelector(".goal-box");

  if (e.target.closest(".save-habit")) {
    const button = e.target.closest(".save-habit");
    e.preventDefault();
    if (view.checkNewHabitFormInput()) {
      if (button.value === "Save Goal") {
        model.editHabitFormInput();

        // O PROBLEMA ESTÁ AQUI
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
    return;
  }
});

habitsDiv.addEventListener("click", (e) => {
  let habitForm = document.querySelector(".goal-box");

  if (e.target.closest(".circle")) {
    console.log("circle");
    model.editHabit(e.target.closest(".circle"));
    view.renderHabits(model.state, model.state.showingArchived);
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
    if (model.state.showingArchived) {
      model.deleteHabit(
        e.target.closest(".habit-name"),
        model.state.archivedHabits
      );
    } else {
      model.deleteHabit(e.target.closest(".habit-name"));
    }
    view.renderHabits(model.state, model.state.showingArchived);
    return;
  }
});
