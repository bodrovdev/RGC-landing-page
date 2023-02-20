import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import whenInViewport from 'when-in-viewport';

// --- Мобильное меню
let burger = document.getElementById('burger');
let mobile_menu = document.getElementById('mobile_menu');
let nav_list = document.querySelector('.main-nav__nav-list');

// - Открытие по по клику на бургер
burger.addEventListener('click', () => {
  burger.classList.toggle('main-nav__burger--active');
  mobile_menu.classList.toggle('main-nav__nav-menu--mobile--active');

  if (burger.classList.contains('main-nav__burger--active')) {
    disableBodyScroll(mobile_menu);
    console.log('opa');
  }
  else {
    enableBodyScroll(mobile_menu);
    console.log('ne ponel');
  }
})

// - Закрытие по клику на пункт меню
nav_list.onclick = function (event) {
  let target = event.target;

  if (target.tagName != 'a') return;

  burger.classList.toggle('main-nav__burger--active');
  mobile_menu.classList.toggle('main-nav__nav-menu--mobile--active');

  if (mobile_menu.classList.contains('main-nav__nav-menu--mobile--active')) {
    enableBodyScroll(mobile_menu);
  }
};

// --- Поочерёдное появление графических элементов в блоке помощи
window.addEventListener('load', () => {
  let allChecks = document.querySelectorAll('.help__graphic-icon');

  function timeOutFunction(value, time) {
    setTimeout(() => {
      value.classList.add('check-icon');
    }, time * 1000)
  }

  whenInViewport(document.querySelector('.help__wrapper-item'), () => {
    Array.from(allChecks).map((item, index) => timeOutFunction(item, index));
  });
})

//Выпадающее меню с выбором категории на странице feedback

//Плавный скроллинг до якорных ссылок
$('a[href^="#"]').on('click', function (e) {
  e.preventDefault();

  var id = $(this).attr('href'),
    top = $(id).offset().top;

  $('body,html').animate({
    scrollTop: top
  }, 2000);
});

let b1 = document.querySelector('#test1');
let b2 = document.querySelector('#test2');

b1.addEventListener('click', () => {
  disableBodyScroll(b1);
  console.log('opa');
})
b2.addEventListener('click', () => {
  enableBodyScroll(b1);
  console.log('nihuya');
})