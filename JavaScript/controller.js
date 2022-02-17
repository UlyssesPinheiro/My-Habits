import * as model from "./model.js";
import * as view from "./Views/view.js";

const addGoalButton = document.querySelector(".add-goal-button");
const closeWindowX = document.querySelector(".close-window-x");
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

addGoalButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (view.checkNewHabitFormInput()) {
    model.getAddNewHabitFormInput();

    view.renderHabits(model.state);
  }
});

closeWindowX.addEventListener("click", view.hideForm.bind(newHabitForm));

document.addEventListener("click", (e) => {
  if (e.target.closest(".circle")) {
    model.editHabit(e.target.closest(".circle"));
    view.renderObjects(model.state, "circle");
  }

  if (e.target.closest(".add-habit-icon")) {
    view.clearForm(newHabitForm);
    view.showForm(newHabitForm);
  }
});

document.querySelector(".fa-archive").addEventListener("click", () => {
  view.renderObjects(model.state, "circle");
});
