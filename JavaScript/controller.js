import * as model from "./model.js";
import * as view from "./Views/view.js";

const newHabitForm = document.querySelector(".add-goal-box");

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
  if (e.target.closest(".habit-delete")) {
    model.deleteHabit(e.target.closest(".habit-name"));
    view.renderHabits(model.state);
  }
});

document.querySelector(".fa-archive").addEventListener("click", () => {
  view.renderObjects(model.state, "circle");
});
