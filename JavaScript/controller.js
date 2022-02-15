import * as model from "./model.js";
import * as view from "./Views/view.js";

const addGoalButton = document.querySelector(".add-goal-button");
const closeWindowX = document.querySelector(".close-window-x");
const newHabitForm = document.querySelector(".add-goal-box");

function init() {
  model.init();
  view.renderObjects(model.state);
  window.addEventListener("resize", function () {
    model.init();
    view.renderObjects(model.state);
  });
}

init();

document
  .querySelector(".add-habit-icon")
  .addEventListener("click", function () {
    view.clearForm(newHabitForm);
    view.showForm(newHabitForm);
  });

addGoalButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (view.checkNewHabitFormInput()) {
    const state = model.getAddNewHabitFormInput();
    view.createNewHabit(state);
    model.pushNewHabitToList(state);

    // const habitsDiv = document.querySelector(".habits-div");
    // addEventListHabit(habitsDiv.querySelectorAll(".icon"));
    // addEventListHabit(habitsDiv.querySelectorAll(".circle"));
  }
});

closeWindowX.addEventListener("click", view.hideForm.bind(newHabitForm));

document.addEventListener("click", (e) => {
  if (e.target.closest(".circle")) {
    const circle = e.target.closest(".circle");
    console.log(circle);
    model.editHabit(circle);
    view.fillCircle(circle);
  }
});
