import * as model from "./model.js";
import * as view from "./Views/view.js";

const newHabitForm = document.querySelector(".add-goal-box");
const titleH1 = document.querySelector(".title-h1");

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
  let habitForm = document.querySelector(".goal-box");

  if (e.target.closest(".circle")) {
    model.editHabit(e.target.closest(".circle"));
    view.renderObjects(model.state, "circle");
  }

  if (e.target.closest(".add-new-habit")) {
    view.createForm();
    habitForm = document.querySelector(".goal-box");
    view.clearForm(habitForm);
    view.showBackgroundDiv(habitForm);
  }

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
  }

  if (e.target.closest(".close-window-x")) {
    view.deleteForm(habitForm);
    view.hideBackgroundDiv();
    view.hideEditIcons("all");
  }

  if (e.target.closest(".habit-edit")) {
    // const habit =
    const habit =
      model.state.habits[model.findHabitIndex(e.target.closest(".habit-name"))];

    model.changeCurrentHabit(e.target.closest(".habit-name"));
    view.hideEditIcons("all");
    view.showEditIcons(e.target.closest(".habit-name"));
  }
  if (e.target.closest(".hide-edit")) {
    view.hideEditIcons("all");
  }

  if (e.target.closest(".habit-rename")) {
    const habit =
      model.state.habits[model.findHabitIndex(e.target.closest(".habit-name"))];

    view.createForm(habit);
    habitForm = document.querySelector(".goal-box");
    view.showBackgroundDiv();
  }

  if (e.target.closest(".habit-archive")) {
    model.archiveHabit(e.target.closest(".habit-name"));
    view.renderHabits(model.state);
  }

  if (e.target.closest(".habit-unarchive")) {
    model.unarchiveHabit(e.target.closest(".habit-name"));
    view.renderHabits(model.state, model.state.showingArchived);
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
  }
});
