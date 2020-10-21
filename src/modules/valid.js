const valid = () => {
  document.documentElement.addEventListener('input', event => {
    const target = event.target;
    if (target.matches(`[name='user_name']`)) {
      target.value = target.value.replace(/[^а-яА-ЯёЁ\s]/g, '');
    } else if (target.matches(`[name='user_message']`)) {
      target.value = target.value.replace(/^[?!,.а-яА-ЯёЁ0-9\s]+$/g, '');
    } else if (target.matches(`[name='user_email']`)) {
      target.value = target.value.replace(/[а-яА-ЯёЁ]/g, '');
    } else {
      return;
    }
  });
};

export default valid;