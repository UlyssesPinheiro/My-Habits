const circle = `<div class="circle view-icon"></div>
`;
const note = `<img class="note view-icon" src="Icons/noteBlank.svg" alt="notes image" />
`;
const day = `
<div class="day">
  <span class="day-h1">17</span>
    <div class="divider-days-weeks"></div>
  <span class="day-h1 weekday">M</span>
</div>`;
const newHabitForm = document.querySelector(".add-goal-box");
const formBackgroungDiv = document.querySelector(".form-backgroung-div");

const habitsDiv = document.querySelector(".habits-div");
const habitProgress = document.querySelectorAll(".habit-progress");

const gridContainer = document.querySelector(".grid-container");

// function init() {
//   clearForm(newHabitForm);
// }
// init();

export function renderObjects(state, renderOnly = "", archived) {
  if (renderOnly === "day") createObjects(day, `.days`, state, archived);
  if (renderOnly === "circle")
    createObjects(circle, `.habit-progress`, state, archived);
  if (renderOnly === "note") createObjects(note, `.notes`, state, archived);

  if (renderOnly === "") {
    createObjects(day, `.days`, state);
    createObjects(circle, `.habit-progress`, state);
    createObjects(note, `.notes`, state);
  }
}

export function createObjects(
  object = "",
  targetElement,
  state,
  archived = false
) {
  let habitList;
  if (archived) {
    habitList = state.archivedHabits;
  } else {
    habitList = state.habits;
  }

  // console.log(habitList);
  const { amountOfDays, displayedDays } = state;

  const habitProgress = document.querySelectorAll(targetElement);
  [...habitProgress].forEach((element, habitProgressIndex) => {
    let markup = "";

    if (object === day) {
      for (let i = 0; i < amountOfDays; i++) {
        object = `
      <div class="day" date="${displayedDays[i].toDateString()}">
        <h1 class="day-h1">${displayedDays[i].getDate()}</h1>
        <div class="divider-days-weeks"></div>
        <h1 class="day-h1 weekday">${displayedDays[i]
          .toLocaleTimeString("en-us", {
            weekday: "short",
          })
          .at(0)}</h1>
      </div>`;

        markup = markup + `${object}`;
      }
    }

    if (object === circle && habitList[habitProgressIndex]) {
      markup = ``;
      // let filledDays = [];
      //generate markup with empty and filled days
      //change the object value to the current circle (filled or unfilled)

      const daysDiv = document.querySelectorAll(".day");

      for (let i = 0; i < amountOfDays; i++) {
        // let currDateIsFilled = false;
        const curDate = daysDiv[i].getAttribute("date");

        //   habitProgressIndex,
        //   habitList[habitProgressIndex].data,
        //   curDate,
        //   habitList
        // );

        if (habitList[habitProgressIndex].data.length) {
          // test if the curDate is on the habitList[habitProgressIndex].data

          const x = habitList[habitProgressIndex].data.findIndex((habit) => {
            if (habit[1]) return habit[0] === curDate; //if habit is set to true
          });

          markup +=
            x !== -1
              ? `<div class="circle view-icon"><img src="Icons/goal-complete.svg" alt="goal complete"></div>`
              : `<div class="circle view-icon"></div>`;
        } else {
          markup += `<div class="circle view-icon"></div>`;
        }
      }
    }

    if (object === note) {
      for (let i = 0; i < amountOfDays; i++) {
        markup = markup + `${object}`;
      }
    }
    element.innerHTML = "";

    // if (object === circle) {

    // }

    element.innerHTML = `${markup}`;
  });
  document.querySelector(".habit-progress:last-child").innerHTML = "";
  alignWidthScrollBar();
  hideEditIcons("all");
}

export function renderHabits(state, archived = false) {
  let habitList;

  console.log(habitList);
  if (archived) {
    habitList = state.archivedHabits;
  } else {
    habitList = state.habits;
  }
  console.log(archived, habitList);

  const element = document.querySelector(".habits-div");

  let markup = ``;

  if (!habitList) return;
  habitList.forEach((e) => {
    if (!e) return;

    markup += `
    <div class="habit-name">
      <h2 class="habit-h2">${e.title}</h2>
      <i class="fas fa-pen habit-edit icon icon-h2"></i>
      <div class="habit-edit-div">
        <i class="fa-solid fa-arrow-left-long hide-edit icon icon-h2"></i>
        

        ${
          archived
            ? `
            <img
            class="habit-unarchive archive-icon icon"
            src="Icons/box-unarchive-solid.svg"
            alt=""
            />
            `
            : `
            <i class="fas fa-pen habit-rename icon icon-h2"></i>
            <img
            class="habit-archive archive-icon icon"
            src="Icons/box-archive-solid.svg"
            alt=""
          />`
        }


        <i class="fa-solid fa-trash-can habit-delete icon icon-h2"></i>
      </div>
    </div>
    <div class="habit-progress">Habit Progress</div>`;
  });

  element.innerHTML = `
    <div class="habit-name" style="border-bottom: none">
      <i class="fas fa-plus icon add-new-habit"></i>
    </div>
    <div class="habit-progress" style="border-bottom: none"></div>
  `;
  element.insertAdjacentHTML("afterbegin", markup);
  renderObjects(state, "circle", archived);
}

export function confirmDeletePopUp(habit) {
  const markup = `
  <form class="goal-box">
    <p class="add-goal-main-header">Delete habit?</p>
    <p>${habit.title}</p>
    <i class="fas fa-times icon close-window-x"></i>
    <button class="form-button delete-confirm">Confirm deletion</button>
  </form>
  `;
  showBackgroundDiv();
  gridContainer.insertAdjacentHTML("beforeEnd", markup);

  document.querySelector(".goal-box").style.display = "flex";
}

export function createForm(habit) {
  // newForm  ? "New Goal" : "Edit Goal"
  //
  const markup = ` <form action="submit" class="goal-box">
    <p class="add-goal-main-header">${habit ? "Edit Goal" : "New Goal"}</p>

    <p class="form-subheader title-name">Title:</p>
    <input
      type="text"
      name="Title"
      placeholder="Drink water"
      ${habit ? `value="${habit.title}"` : ""}
      class="add-goal-item add-goal-title"
      required
    />
    <p class="form-subheader description-name">Description:</p>
    <textarea
      placeholder="Drink 3 cups of water per day"
      class="add-goal-item add-goal-description"
      maxlength="200">${habit ? `${habit.description}` : ``}</textarea>

    <div class="partial-complete">
      <p>Partially complete goal?</p>

      <input type="checkbox" ${
        habit?.partial ? `checked` : ""
      } id="partial-goal-checkbox" />
      <a class="info-help-btn" href="">
        what is this?
      </a>
    </div>

    <input type="submit" class="save-habit form-button" value="${
      habit ? "Save Goal" : "Create Goal"
    }" />

    <i class="fas fa-times icon close-window-x"></i>
  </form>`;

  gridContainer.insertAdjacentHTML("beforeEnd", markup);

  document.querySelector(".goal-box").style.display = "flex";
}

export function deleteForm(form) {
  form.remove();
  hideBackgroundDiv();
}

export function showBackgroundDiv() {
  formBackgroungDiv.style.visibility = "visible";
  formBackgroungDiv.style.opacity = "30%";
}

export function hideBackgroundDiv() {
  formBackgroungDiv.style.visibility = "hidden";
  formBackgroungDiv.style.opacity = "0%";
}

export function clearForm(form) {
  //removes the required warnings
  form
    .querySelectorAll(".form-required")
    .forEach((e) => e.classList.remove("form-required"));

  //removes the previus input values
  form.querySelectorAll("input").forEach((e) => {
    if (e.getAttribute("type") === "submit") return;
    if (e.getAttribute("type") === "checkbox") return (e.checked = false);

    return (e.value = "");
  });
  form.querySelectorAll("textarea").forEach((e) => {
    return (e.value = "");
  });
}

export function checkNewHabitFormInput() {
  const title = document.querySelector(".add-goal-title");

  if (title.value) {
    // Correct
    return true;
  } else {
    // Incorrect
    if (!title.value) title.classList.add("form-required");
    return false;
  }
}

export function alignWidthScrollBar() {
  if (
    habitsDiv.scrollWidth <
    +window.getComputedStyle(habitsDiv).getPropertyValue("width").slice(0, -2)
  ) {
    habitProgress.forEach((e) => (e.style.paddingLeft = "19px"));
  } else {
    habitProgress.forEach((e) => (e.style.paddingLeft = "0"));
  }
}

export function showEditIcons(target) {
  target.querySelector(".habit-edit-div").style.display = "flex";
  target.querySelector(".habit-edit").style.display = "none";
}

export function hideEditIcons(target) {
  if (target === "all") {
    habitsDiv
      .querySelectorAll(".habit-edit-div")
      .forEach((e) => (e.style.display = "none"));

    habitsDiv.querySelectorAll(".habit-edit").forEach((e) => {
      e.style.display = "inline-block";
    });
  } else {
    target.querySelector(".habit-edit-div").style.display = "none";
    target.querySelector(".habit-edit").style.display = "inline-block";
  }
}

export function changeHabitIconArchived(archived) {
  if (archived) {
    document.querySelector(".go-to-archived").style.display = "none";
    document.querySelector(".go-to-main").style.display = "inline-block";
  }
  if (!archived) {
    document.querySelector(".go-to-main").style.display = "none";
    document.querySelector(".go-to-archived").style.display = "inline-block";
  }
}

export function hideAddNewHabit(showingArchived) {
  if (showingArchived) {
    document.querySelector(".add-new-habit").style.display = "none";
  }
  if (!showingArchived) {
    document.querySelector(".add-new-habit").style.display = "";
  }
}
