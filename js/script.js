window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  //Function of adding 0 before numbers less than 10
  const checkTime = value => {
    if (value < 10) {
      return "0" + value;
    } else {
      return value;
    }
  };

  //Timer
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

  counterTimer("27 september 2020");

  //Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu');

    const handlerMenu = () => menu.classList.toggle('active-menu');

    btnMenu.addEventListener('click', handlerMenu);
    menu.addEventListener("click", event => {
      const target = event.target;
      if (target.matches('a')) {
        handlerMenu();
      }
    });
  };
  toggleMenu();

  //popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn');

    let animateIdOpen, animateIdClose;
    let count = 0;

    const animateOpen = () => {
      animateIdOpen = requestAnimationFrame(animateOpen);
      count += 0.05;
      if (count < 1) {
        popup.style.opacity = count;
      } else {
        cancelAnimationFrame(animateIdOpen);
      }
    };

    const animateClose = () => {
      animateIdClose = requestAnimationFrame(animateClose);
      count -= 0.05;
      if (count >= 0) {
        popup.style.opacity = count;
      } else {
        cancelAnimationFrame(animateIdClose);
        popup.style.display = "none";
      }
    };

    popupBtn.forEach(item => {
      item.addEventListener("click", () => {
        popup.style.display = "block";
        popup.style.opacity = "1";
        if (window.innerWidth > 768) {
          popup.style.opacity = "0";
          animateIdOpen = requestAnimationFrame(animateOpen);
        }
      });
    });

    popup.addEventListener('click', event => {
      let target = event.target;
      if (target.classList.contains('popup-close')) {
        animateIdClose = requestAnimationFrame(animateClose);
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          animateIdClose = requestAnimationFrame(animateClose);
        }
      }

    });
  };
  togglePopUp();

  //Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = index => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', () => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

  //Slider
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      slider = document.querySelector('.portfolio-content'),
      portfolioDots = document.querySelector('.portfolio-dots');

    let currentSlide = 0,
      interval;

    // Creating dots for slider
    const addDots = () => {
      slide.forEach(() => {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        portfolioDots.append(dot);
      });

    };
    addDots();

    //Get the points into a variable and assign the first class to dot-active
    const dots = portfolioDots.querySelectorAll('.dot');
    dots[0].classList.add('dot-active');

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dots, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dots, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', event => {
      event.preventDefault();

      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dots, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dots.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dots, currentSlide, 'dot-active');

    });
    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        startSlide();
      }
    });
    startSlide(2000);
  };
  slider();

  // Our team section (data attributes)

  const changeImage = () => {
    const img = document.querySelectorAll(".command__photo");
    img.forEach((item, i) => {
      item.addEventListener("mouseenter", event => {
        event.target.src = event.target.dataset.img;
        event.target.dataset.img = `images/command/command-${i + 1}.jpg`;
      });
      item.addEventListener("mouseleave", event => {
        event.target.src = event.target.dataset.img;
        event.target.dataset.img = `images/command/command-${i + 1}a.jpg`;
      });
    });
  };

  changeImage();

  // check inputs of calculator (regular expressions)
  const checkInputCalc = () => {
    const inputCalc = document.querySelectorAll('.calc-block>input');
    inputCalc.forEach(item => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/\D/g, '');
      });
    });
  };

  checkInputCalc();

  // calculator

  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = Math.ceil(price * typeValue * squareValue * countValue * dayValue);
      }

      totalValue.textContent = total;
    };

    calcBlock.addEventListener('change', event => {
      const target = event.target;

      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    });
  };

  calc(1000);


});