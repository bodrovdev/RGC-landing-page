import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import md5 from 'js-md5';

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

// --- Генерация ссылки для оплаты произвольной суммы
window.addEventListener('load', () => {
  if (document.getElementById('donation_custom_input') === null || document.getElementById('donation_custom_link') === null) {
    return;
  }
  else {
    let custom_input = document.getElementById('donation_custom_input');
    let custom_link = document.getElementById('donation_custom_link');

    function givePayLink(sum) {
      let signatureValue = md5(`zaharfond:${sum}::hfP3joFMcqUL7tV0u3Q1`);
      return `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=zaharfond&OutSum=${sum}&Description=customPayment&SignatureValue=${signatureValue}`;
    }

    custom_input.addEventListener('change', () => {
      custom_link.setAttribute('href', `${givePayLink(custom_input.value)}`);
    })

    custom_link.addEventListener('click', (e) => {
      if (custom_input.value === null || custom_input.value === '') {
        e.preventDefault();
        alert('Пожалуйста, введите сумму пожертвования');
        return;
      }
      else {
        custom_input.value = '';
      }
    })
  }
})

// --- Модальное окно с подтверждением оплаты
window.addEventListener('load', () => {
  if (document.getElementById('success_modal') === null) {
    return;
  }
  else {
    let modal = document.getElementById('success_modal');
    let modal_close = document.getElementById('success_modal_close');

    if (window.location.hash === '#success') {
      modal.classList.add('modal--active');
      disableBodyScroll(modal);
    }

    // - Закрытие модалки по клику на кнопку закрытия
    modal_close.addEventListener('click', () => {
      modal.classList.remove('modal--active');
      enableBodyScroll(modal);
    })

    // - Закрытие модалки по клику на на пустое пространство
    modal.addEventListener('click', (event) => {
      if (event.target !== event.currentTarget) {
        return;
      }
      else {
        modal.classList.remove('modal--active');
        enableBodyScroll(modal);
      }
    })
  }
})

// --- Открытие и закрытие модального меню с формой для оплаты
// window.addEventListener('load', () => {
//   if (document.getElementById('payModal') === null) {
//     return;
//   }
//   else {
//     let modal = document.getElementById('payModal');
//     let modal_close = document.getElementById('payModal_close');
//     let button_list = document.querySelector('.donation-main__donation-list');

//     let donation_custom_input = document.querySelector('.donation-main__donation-input');
//     let donation_custom_button = document.querySelector('.donation-main__donation-custom');

//     let hidden_price = document.querySelector('.js_payment_price');
//     let shown_price = document.querySelector('.pay-price');

    // - Открытие модалки по клику на кнопку оплаты, передача значения суммы пожертвования
    // button_list.addEventListener('click', function (event) {
    //   let target = event.target;

    //   if (!target.classList.contains('donation-main__donation-button')) return;

    //   hidden_price.setAttribute(`value`, `${target.dataset.sum}`)
    //   shown_price.textContent = target.dataset.sum;

    //   console.log(hidden_price.getAttribute('value'));

    //   modal.classList.add('donation-modal--active');
    //   disableBodyScroll(modal);
    // })

    // - Открытие модалки по клику на кнопку оплаты с полем для ввода своей суммы, передача значения суммы пожертвования
    // donation_custom_button.addEventListener('click', () => {
    //   hidden_price.setAttribute(`value`, `${donation_custom_input.value}`)
    //   shown_price.textContent = donation_custom_input.value;

    //   console.log(hidden_price.getAttribute('value'));

    //   modal.classList.add('donation-modal--active');
    //   disableBodyScroll(modal);
    // })

    // - Закрытие модалки по клику на кнопку закрытия
    // modal_close.addEventListener('click', () => {
    //   modal.classList.remove('donation-modal--active');
    //   enableBodyScroll(modal);
    // })

    // - Закрытие модалки по клику на на пустое пространство
    // modal.addEventListener('click', (event) => {
    //   if (event.target !== event.currentTarget) {
    //     return;
    //   }
    //   else {
    //     modal.classList.remove('donation-modal--active');
    //     enableBodyScroll(modal);
    //   }
    // })
//   }
// });


// $('.pay-btn').click(function () {
//   $('.js_payment_price').attr("value", $(this).data("sum"));
//   $('.pay-price').text($(this).data("sum"));
// });
// $('.pay-custom-btn').click(function () {
//   $('.js_payment_price').attr("value", $(this).parents(".pay-custom").find(".sum-input").val());
//   $('.pay-price').text($(this).parents(".pay-custom").find(".sum-input").val());
// });

// --- Определение высоты первого блока
// const setHeight = () => {
//   document.getElementById("index_heading").style.minHeight = window.innerHeight + "px";
// };

// let deviceWidth = window.matchMedia("(max-width: 1024px)");

// if (deviceWidth.matches) {
//   window.addEventListener("resize", setHeight);
//   setHeight();
// }