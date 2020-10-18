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

export default changeImage;