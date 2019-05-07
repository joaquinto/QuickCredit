const button = document.querySelector('.btn');
const firstName = document.querySelector('.firstname');
const lastName = document.querySelector('.lastname');
const email = document.querySelector('.email');
const address = document.querySelector('.address');
const password = document.querySelector('.password');
const errorContainer = document.querySelector('.msg');
const message = document.querySelector('.error-msg');

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const signUp = e => {
  e.preventDefault();  
};

button.addEventListener('click', signUp);