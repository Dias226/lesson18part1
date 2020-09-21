window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  //Timer
  function counterTimer(deadline) {
    const timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    function getTimerRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds,
      };
    }
    //Функция добавления 0 перед числами меньше 10
    function checkTime(value) {
      if (value < 10) {
        return "0" + value;
      } else {
        return value;
      }
    }

    function updateClock() {
      const timer = getTimerRemaining();

      timerHours.textContent = checkTime(timer.hours);
      timerMinutes.textContent = checkTime(timer.minutes);
      timerSeconds.textContent = checkTime(timer.seconds);

      if (timer.timeRemaining > 0) {
        setInterval(updateClock, 1000);
      } else if (timer.timeRemaining < 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }
    updateClock();
  }

  counterTimer("22 september 2020");
});