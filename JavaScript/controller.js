import * as model from "./model.js";
import * as view from "./Views/view.js";

const addGoalButton = document.querySelector(".add-goal-button");

function init() {
  model.init();
  view.renderObjects(model.state);
  window.addEventListener("resize", function () {
    model.init();
    view.renderObjects(model.state);
  });
}

init();

const addHabitHandler = function () {
  view.showNewHabitForm();
};

document
  .querySelector(".add-habit-icon")
  .addEventListener("click", addHabitHandler);

const addGoalButtonHandler = function (e) {
  e.preventDefault();
  const state = model.getAddNewHabitFormInput();
  view.createNewHabit(state);
};

addGoalButton.addEventListener("click", addGoalButtonHandler);
