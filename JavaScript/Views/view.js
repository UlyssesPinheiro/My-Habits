const circle = `<div class="circle view-icon"></div>`;
// const note = `<div class="note"><img class="view-icon" src="Icons/noteBlank.svg" alt="notes image" /></div>`;
const note = `<img class="note view-icon" src="Icons/noteBlank.svg" alt="notes image" />`;
const day = `
<div class="day">
  <span class="day-h1">17</span>
    <div class="divider-days-weeks"></div>
  <span class="day-h1 weekday">M</span>
</div>`;

export function renderObjects(state) {
  createObjects(day, `.days`, state, true);
  createObjects(circle, `.habit-progress`, state);
  createObjects(note, `.notes`, state);
}

export function createObjects(object = "", targetElement, state, weekdays) {
  const { amountOfDays, displayedDays } = state;
  // console.log(displayedDays[0].getDate());

  const habitProgress = document.querySelectorAll(targetElement);
  [...habitProgress].forEach((element) => {
    let markup = "";
    for (let i = 0; i < amountOfDays; i++) {
      if (weekdays === true) {
        object = `
        <div class="day">
          <h1 class="day-h1">${displayedDays[i].getDate()}</h1>
            <div class="divider-days-weeks"></div>
          <h1 class="day-h1 weekday">${displayedDays[i]
            .toLocaleTimeString("en-us", {
              weekday: "short",
            })
            .at(0)}</h1>
        </div>`;
      }
      markup = markup + `${object}`;
    }
    element.innerHTML = markup;
  });
  document.querySelector(".habit-progress:last-child").innerHTML = "";
  console.log(document.querySelector(".habit-progress:last-child"));
}

export function createNewHabit(state) {
  const element = document.querySelector(".habits-div");

  const markup = `
  <div class="habit-name">
    <h2 class="habit-h2">Goal 1</h2>
    <i class="fas fa-pen icon icon-h2"></i>
  </div>
  <div class="habit-progress">Habit Progress</div>`;

  element.insertAdjacentHTML("afterbegin", markup);
  renderObjects(state);
}
