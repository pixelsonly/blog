'use strict';

document.addEventListener('DOMContentLoaded', function() {
  var body    = document.querySelector('body');
  var menu    = document.querySelector('#menu');
  var toggles = document.querySelectorAll('.js-menu-toggle');

  toggles.forEach(function(button) {
    button.addEventListener('click', function(event) {
      if (menu.classList.contains('is-visible')) {
        menu.classList.remove('is-visible');
        body.classList.remove('menu-open');
      } else {
        menu.classList.add('is-visible');
        body.classList.add('menu-open');
      }
    }, false);
  });
});
