import * as controller from "./controller.js";

export const state = {
  amountOfDays: 0,
  displayedDays: [],
  currentDate: "",
  daySizePixels: 60,
  daySizeGap: 20,
};

export function init() {
  currentDate();
  calculateAmountOfDays();
  displayedDays();
}

export function testing() {
  alert("working model.js");
}

export function calculateAmountOfDays() {
  const width = document.querySelector(".habit-progress").offsetWidth;
  // const circle = document.querySelector(".circle");
  // const circleWidth = circle.offsetWidth;
  // const circleMargin = +window.getComputedStyle(circle).margin.slice(0, -2);
  // const circleTotalWidth = circleWidth + circleMargin * 2;
  state.amountOfDays = Math.floor(
    width / (state.daySizePixels + state.daySizeGap)
  );
}

export function currentDate() {
  state.currentDate = new Date();
  // console.log(state.currentDate);
}

export function displayedDays() {
  state.displayedDays = [];
  console.log(state.amountOfDays);
  for (let i = 0; i < state.amountOfDays; i++) {
    let calcDate = new Date(
      new Date().setDate(state.currentDate.getDate() + i)
    );
    state.displayedDays.push(calcDate);
  }
  // console.log(state.displayedDays);
}
