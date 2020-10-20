const counterTimer = deadline => {
  const timerHours = document.querySelector("#timer-hours"),
    timerMinutes = document.querySelector("#timer-minutes"),
    timerSeconds = document.querySelector("#timer-seconds");

  const getTimerRemaining = () => {
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
  };

  //Function of adding 0 before numbers less than 10
  const checkTime = n => (n < 10 ? `0${n}` : n);

  const updateClock = () => {
    const timer = getTimerRemaining();

    timerHours.textContent = checkTime(timer.hours);
    timerMinutes.textContent = checkTime(timer.minutes);
    timerSeconds.textContent = checkTime(timer.seconds);

    if (timer.timeRemaining < 0) {
      clearInterval(timerInterval);
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
    }
  };
  const timerInterval = setInterval(updateClock, 1000);
  updateClock();
};

export default counterTimer;