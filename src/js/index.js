import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { CountUp } from 'countup.js';

//Функция для проверки нахождения элемента во вьюпорте
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


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
  console.log(target.tagName);

  if (target.tagName !== 'A') {
    return;
  }
  else {
    enableBodyScroll(mobile_menu);
    burger.classList.toggle('main-nav__burger--active');
    mobile_menu.classList.toggle('main-nav__nav-menu--mobile--active');
  }
};

// --- Поочерёдное появление графических элементов в блоке помощи
window.addEventListener('load', () => {
  let allChecks = document.querySelectorAll('.help__graphic-icon');

  if (allChecks === null) {
    return;
  }
  else {
    function timeOutFunction(value, time) {
      setTimeout(() => {
        value.classList.add('check-icon');
      }, time * 500)
    }

    window.addEventListener('scroll', () => {
      if (document.querySelector('.help__wrapper-item') === null) {
        return;
      }
      else if (isInViewport(document.querySelector('.help__wrapper-item'))) {
        Array.from(allChecks).map((item, index) => timeOutFunction(item, index));
      }
    })
  }
})

// --- Анимация счётчика процентов
window.addEventListener('load', () => {
  if (document.getElementById('count_1') === null || document.getElementById('count_2') == null) {
    return;
  }
  else {
    let count_1_num = document.getElementById('count_1_num');
    let count_2_num = document.getElementById('count_2_num');
    const countUpOne = new CountUp(document.getElementById('count_1'), count_1_num.textContent, { enableScrollSpy: true, scrollSpyOnce: true, useEasing: true, duration: 5, });
    const countUpTwo = new CountUp(document.getElementById('count_2'), count_2_num.textContent, { enableScrollSpy: true, scrollSpyOnce: true, useEasing: true, duration: 5, });
  }
})

//Выпадающее меню с выбором языка в блоке feedback
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

    phone_input.value = '+7 ';
  }
})

select_item_ar.addEventListener('click', () => {
  if (select_flag.classList.contains('feedback__select-item--ar')) {
    return;
  }
  else {
    select_flag.classList.remove('feedback__select-item--ru');
    select_flag.classList.add('feedback__select-item--ar');

    phone_input.value = '+971 ';
  }
})

// Модальное окно с подтверждением
let form = document.getElementById('form');
let modal = document.getElementById('modal');
let modal_close = document.getElementById('modal_close');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  modal.classList.add('modal--active');
  disableBodyScroll(modal);
})

modal_close.addEventListener('click', () => {
  modal.classList.remove('modal--active');
  enableBodyScroll(modal);
})

modal.addEventListener('click', (e) => {
  if (e.target !== e.currentTarget) {
    return;
  }
  else {
    modal.classList.remove('modal--active');
    enableBodyScroll(modal);
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