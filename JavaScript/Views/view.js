const circle = `<div class="circle view-icon"></div>`;
const note = `<div class="note"><img class="view-icon" src="/Icons/noteBlank.svg" alt="notes image" /></div>`;
const day = `
<div class="day">
  <h1 class="day-h1">17</h1>
    <div class="divider-days-weeks"></div>
  <h1 class="day-h1 weekday">M</h1>
</div>`;

export function renderObjects(state) {
  createObjects(day, `.days`, state, true);
  createObjects(circle, `.habit-progress`, state);
  createObjects(note, `.notes`, state);
}

export function createObjects(object = "", targetElement, state, weekdays) {
  const { amountOfDays, displayedDays } = state;
  console.log(displayedDays[0].getDate());

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
}
