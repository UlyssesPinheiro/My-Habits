export function createObjects(object, targetElement) {
  const circle = document.querySelector(".circle");
  const width = document.querySelector(".habit-progress").offsetWidth;
  const circleWidth = circle.offsetWidth;
  const circleMargin = +window.getComputedStyle(circle).margin.slice(0, -2);
  const circleTotalWidth = circleWidth + circleMargin * 2;

  console.log(width);
  console.log(circleWidth, circleMargin, circleTotalWidth);

  const amountOfCircles = Math.floor(width / circleTotalWidth);
  console.log(amountOfCircles);

  const habitProgress = document.querySelectorAll(targetElement);
  [...habitProgress].forEach((element) => {
    let markup = "";
    for (let i = 0; i < amountOfCircles; i++) {
      markup = markup + `${object}`;
    }
    console.log(markup);
    element.innerHTML = markup;
  });
  console.log();
}
