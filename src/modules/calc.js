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

export default calc;