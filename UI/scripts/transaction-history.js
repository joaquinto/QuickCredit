const logOut = document.querySelector('.fa-sign-out-alt');
const navigation = document.querySelector('.side-nav');
const body = document.querySelector('body');
const menu = document.querySelector('.menu-btn');
const dashboard = document.querySelector('.dash');
const loan = document.querySelector('.loa');
const history = document.querySelector('.his');

let clicks = 0;

logOut.addEventListener('click', () => {
  window.location.href = '../pages/login.html';
});

menu.addEventListener('click', () => {
  clicks += 1;
  console.log(clicks);
  if ((clicks % 2) === 0) {
    navigation.style.display = 'none';
    body.style.overflow = 'visible';
  } else {
    navigation.style.display = 'flex';
    body.style.overflow = 'hidden';
  }
});

dashboard.addEventListener('click', () => {
  navigation.style.display = 'none';
  setTimeout(() => {
    window.location.href = '../pages/dashboard.html';
  }, 500);
});

loan.addEventListener('click', () => {
  navigation.style.display = 'none';
  setTimeout(() => {
    window.location.href = '../pages/loan.html';
  }, 500);
});

history.addEventListener('click', () => {
  navigation.style.display = 'none';
  setTimeout(() => {
    window.location.href = '../pages/transaction-history.html';
  }, 500);
});
