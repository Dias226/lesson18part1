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

export default togglePopUp;