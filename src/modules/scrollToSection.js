const scrollToSection = () => {
  const scroll = menuItem => {
    document.querySelector(`${menuItem}`).scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  };
  document.querySelectorAll('a[href="#service-block"], menu li>a').forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      scroll(item.getAttribute('href'));
    });
  });
};

export default scrollToSection;