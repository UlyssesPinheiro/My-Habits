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
  const habitForm = document.querySelector(".goal-box");

  if (e.target.closest(".circle")) {
    model.editHabit(e.target.closest(".circle"));
    view.renderObjects(model.state, "circle");
  }

  if (e.target.closest(".add-new-habit")) {
    view.clearForm(habitForm);
    view.showForm(habitForm);
  }

  if (e.target.closest(".habit-edit")) {
    handleHabitEditOptions(e.target.closest(".habit-name"));
  }
  if (e.target.closest(".habit-delete")) {
    console.log(e.target.closest(".habit-name"));
    model.deleteHabit(e.target.closest(".habit-name"));
    view.renderHabits(model.state);
  }

  if (e.target.closest(".save-habit")) {
    e.preventDefault();
    if (view.checkNewHabitFormInput()) {
      model.getAddNewHabitFormInput();
      view.hideForm(habitForm);
      view.renderHabits(model.state);
    }
  }

  if (e.target.closest(".close-window-x")) {
    view.hideForm(habitForm);
  }
});

export function handleHabitEditOptions(target) {
  if (!model.state.habitEditOptionsShown) {
    view.showEditIcons(target);
    model.state.habitEditOptionsShown = true;
  } else {
    view.hideEditIcons(target);
    model.state.habitEditOptionsShown = false;
  }
}

document.querySelector(".fa-archive").addEventListener("click", () => {
  view.renderObjects(model.state, "circle");
});
