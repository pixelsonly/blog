document.addEventListener('DOMContentLoaded', () => {
  const body    = document.querySelector('body');
  const menu    = document.querySelector('#menu');
  const toggles = document.querySelectorAll('.js-menu-toggle');

  for (const button of toggles) {
    button.addEventListener('click', (event) => {
      if (menu.classList.contains('is-visible')) {
        menu.classList.remove('is-visible');
        body.classList.remove('menu-open');
      } else {
        menu.classList.add('is-visible');
        body.classList.add('menu-open');
      }
    }, false);
  }
});
