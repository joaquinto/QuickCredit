const button = document.querySelector('.btn');
const email = document.querySelector('.email');
const errorContainer = document.querySelector('.msg');
const message = document.querySelector('.error-msg');

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const forgotPassword = e => {
  e.preventDefault();
  
};

button.addEventListener('click', forgotPassword);