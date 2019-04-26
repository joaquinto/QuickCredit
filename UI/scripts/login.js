const button = document.querySelector('.btn');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const errorContainer = document.querySelector('.msg');
const message = document.querySelector('.error-msg');

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const login = e => {
  e.preventDefault();
  setTimeout(() => {
    window.location.href = '../pages/dashboard.html';
  }, 500);  
};

button.addEventListener('click', login);