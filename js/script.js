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
    const menu = document.querySelector("menu"),
      handlerMenu = () => menu.classList.toggle("active-menu");
    document.addEventListener('click', event => {
      let target = event.target;

      if (target.matches('menu li>a') || target.closest('.menu')) {
        handlerMenu();
        target = target.closest('.menu');
      } else if (menu.classList.contains('active-menu')) {
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

  // scrolling through menu items
  const scroll = menuItem => {
    document.querySelector(`${menuItem}`).scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  };

  const scrollToSection = () => {
    document.querySelectorAll('a[href="#service-block"], menu li>a').forEach(item => {
      item.addEventListener('click', event => {
        event.preventDefault();
        scroll(item.getAttribute('href'));
      });
    });
  };

  scrollToSection();

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

  // calculator
  const calc = price => {
    const calcType = document.querySelector('.calc-type'),
      calcBlock = document.querySelector('.calc-block'),
      calcSquare = document.querySelector('.calc-square'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day'),
      totalValue = document.getElementById('total'),
      inputCalc = document.querySelectorAll('.calc-block>input');

    const countSum = () => {
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;
      let total = 0,
        dayValue = 1,
        countValue = 1,
        count = 0,
        countSpeed = 0,
        animateId;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = Math.ceil(price * typeValue * squareValue * dayValue * countValue);
      }

      countSpeed = String(total).length ** 4; // selection of calculation speed
      const animatePrice = () => {
        animateId = requestAnimationFrame(animatePrice);
        count += countSpeed; //animation acceleration
        if (count <= total) {
          totalValue.textContent = count;
        } else {
          totalValue.textContent = total; //count when raised to a power is not equal to total, so we print total
          cancelAnimationFrame(animateId);
        }
      };
      animateId = requestAnimationFrame(animatePrice);

    };

    calcBlock.addEventListener('change', event => {
      const target = event.target;

      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    });

    inputCalc.forEach(item => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/\D/g, '');
      });
    });
  };
  calc(100);

  // Validation
  const valid = () => {
    const inputs = document.querySelectorAll('input.calc-item'),
      phoneInputs = document.querySelectorAll('[type = tel]'),
      textInputs = document.querySelectorAll('[name="user_name"]'),
      textMessage = document.querySelector('[name="user_message"]'),
      forms = document.querySelectorAll('form');

    forms.forEach(item => item.autocomplete = "off");

    const validText = item => {
      item.value = item.value.replace(/[^А-Яа-яЁё ]/i, '');
    };

    phoneInputs.forEach(phoneInput => {
      phoneInput.addEventListener('input', () => {
        phoneInputs.forEach(phoneInput => {
          phoneInput.addEventListener('input', () => {
            const thisForm = phoneInput.closest('form'),
              btnForm = thisForm.querySelector('button');

            const regExp = /^\+?[78]([-()]*\d){10}$/;

            if (!regExp.test(phoneInput.value)) {
              phoneInput.style.border = '2px solid red';
              btnForm.disabled = true;
            } else {
              phoneInput.style.border = '';
              btnForm.disabled = false;
            }
          });
        });
      });
    });

    inputs.forEach(item => {
      item.addEventListener('input', () => item.value = item.value.replace(/\D/g, ''));
    });

    textInputs.forEach(item => {
      item.addEventListener('input', () => {
        validText(item);
      });
    });

    textMessage.addEventListener('input', () => {
      validText(textMessage);
    });
  };

  valid();

  // Send-ajax-form

  const sendForm = () => {
    const errorrMessage = 'Что то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const forms = document.querySelectorAll('form');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `font-size: 2rem; font-weight: bolder; color: green; 
        text-shadow: 1px 1px 2px black, 0 0 1em black;`;

    const postData = body => fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    forms.forEach(form => {
      form.addEventListener('submit', event => {
        event.preventDefault();
        form.appendChild(statusMessage);
        statusMessage.innerHTML = loadMessage;
        const formData = new FormData(form);

        postData(formData)
          .then(response => {
            if (response.status !== 200) {
              throw new Error(`status network ${response.status}!`);
            }
            statusMessage.textContent = successMessage;
            form.reset();
          })
          .catch(error => {
            statusMessage.textContent = errorrMessage;
            statusMessage.style.cssText = `font-size: 2rem; font-weight: bolder; color: red; 
                    text-shadow: 1px 1px 2px black, 0 0 1em black;`;
            console.error(error);
          });
      });
    });
  };

  sendForm();

});