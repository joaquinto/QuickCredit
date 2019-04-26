const clients = document.querySelector('.clients');
const close = document.querySelector('.close');
const table = document.getElementById("tableId");
const logOut = document.querySelector('.fa-sign-out-alt');
const exit = document.querySelector('.exit-btn');
const navigation = document.querySelector('.side-nav-1');
const body = document.querySelector('body');
const menu = document.querySelector('.menu-btn');
const dashboard = document.querySelector('.dash');
const loanApplication = document.querySelector('.loa');
const currentLoan = document.querySelector('.cur');
const repaidLoans = document.querySelector('.rep');

logOut.addEventListener('click', () => {
  window.location.href = '../pages/login.html';
});

menu.addEventListener('click', () => {
  navigation.style.display = 'flex';
  body.style.overflow = 'hidden';
});

dashboard.addEventListener('click', () => {
  navigation.style.display = 'none';
  setTimeout(() => {
    window.location.href = '../pages/admin-dashboard.html';
  }, 500);
});

loanApplication.addEventListener('click', () => {
  navigation.style.display = 'none';
  setTimeout(() => {
    window.location.href = '../pages/admin-loan-applications.html';
  }, 500);
});

currentLoan.addEventListener('click', () => {
  navigation.style.display = 'none';
  setTimeout(() => {
    window.location.href = '../pages/admin-current-loan.html';
  }, 500);
});

repaidLoans.addEventListener('click', () => {
  navigation.style.display = 'none';
  setTimeout(() => {
    window.location.href = '../pages/admin-repaid-loans.html';
  }, 500);
});

exit.addEventListener('click', () => {
  navigation.style.display = 'none';
  body.style.overflow = 'visible';
});
