import * as model from "./model.js";
import * as view from "./Views/view.js";

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
  view.createNewHabit(model.state);
};

document
  .querySelector(".add-habit-icon")
  .addEventListener("click", addHabitHandler);
