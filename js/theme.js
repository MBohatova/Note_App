import { refs } from './refs.js';

export const setTheme = (theme) => {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', function() {
  let savedTheme = localStorage.getItem('theme');

  if(!savedTheme) {
    savedTheme = 'dark';
  }

  setTheme(savedTheme);
});

refs.header.themeButton.addEventListener('click', function() {
  let currentTheme = document.body.getAttribute('data-theme');

  let newTheme;

  if(currentTheme === 'dark') {
    newTheme = 'light';
  } else {
    newTheme = 'dark';
  }

  setTheme(newTheme);
})