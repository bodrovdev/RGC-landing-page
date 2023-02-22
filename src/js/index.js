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
  }
  else {
    enableBodyScroll(mobile_menu);
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
    }, time * 500)
  }

  whenInViewport(document.querySelector('.help__wrapper-item'), () => {
    Array.from(allChecks).map((item, index) => timeOutFunction(item, index));
  });
})

// --- 
whenInViewport(document.querySelector('.features__stats-num'), () => {
  VanillaCounter();
});

//Выпадающее меню с выбором языка на странице feedback
let select = document.getElementById('select');
let select_flag = document.getElementById('select_flag');
let select_menu = document.querySelector('.feedback__select-list');
let select_item_ru = document.querySelector('.feedback__select-item--ru');
let select_item_ar = document.querySelector('.feedback__select-item--ar');

let phone_input = document.getElementById('phone_input');

select.addEventListener('click', () => {
  select_menu.classList.toggle('feedback__select-list--active');
  console.log('test');
})

select_item_ru.addEventListener('click', () => {
  if (select_flag.classList.contains('feedback__select-item--ru')) {
    return;
  }
  else {
    select_flag.classList.remove('feedback__select-item--ar');
    select_flag.classList.add('feedback__select-item--ru');
    phone_input.value = '';



    console.log('поменял на русский');

  }
})

select_item_ar.addEventListener('click', () => {
  if (select_flag.classList.contains('feedback__select-item--ar')) {
    return;
  }
  else {
    select_flag.classList.remove('feedback__select-item--ru');
    select_flag.classList.add('feedback__select-item--ar');
    phone_input.value = '';



    console.log('поменял на арабский');
  }
})



//Плавный скроллинг до якорных ссылок
$('a[href^="#"]').on('click', function (e) {
  e.preventDefault();

  var id = $(this).attr('href'),
    top = $(id).offset().top;

  $('body,html').animate({
    scrollTop: top
  }, 0);
});