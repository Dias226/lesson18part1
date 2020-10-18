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

export default toggleMenu;