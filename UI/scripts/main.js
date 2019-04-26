const menu = document.querySelector('.menu-btn');
const navigations = document.querySelector('.navigations');
const exit = document.querySelector('.close');
const body = document.querySelector('body');

menu.addEventListener('click', () => {
  navigations.classList.toggle('navigations-active');
  body.classList.toggle('active-menu');
});

exit.addEventListener('click', () => {
  navigations.classList.toggle('navigations-active');
  body.classList.toggle('active-menu');
});