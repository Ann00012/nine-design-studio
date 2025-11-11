import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Raty from 'raty-js';
import { openOrderModal } from './order-modal';

// Імпорт шляхів до зірочок

import starPath from '../img/symbol-defs.svg';

// Елементи DOM

const modalOverlay = document.querySelector('.modal-overlay');

const closeButton = document.querySelector('.close-button');

const modalDetails = document.querySelector('.modal-details');

const modalContantButton = document.querySelector('.modal-contant-button');

const modalCategory = document.querySelector('.modal-category');

const descriptionModal = document.querySelector('.description-modal');

const dimensionsModal = document.querySelector('.dimensions-modal');

const starRating = document.querySelector('.stars.star-rating');

const loader = document.querySelector('.modal-loader');

const modalContant = document.querySelector('.modal-contant');


const orderModal = document.querySelector('.order-modal');

const body = document.querySelector('body')


let idOurFurnitureCardButton = null;

function addClassName(param) {
  param.classList.add('is-open');
  body.style = 'overflow: hidden';
  
}

// Відкриваю модальне вікно та зберігаю id для запиту на сервер

document.addEventListener('click', event => {
  const btn = event.target.closest('.our-furniture-card-button');
  if (!btn) return;

  addClassName(modalOverlay);

  idOurFurnitureCardButton = btn.dataset.id;

  showLoader();

  getUrl()
    .then(data => {
      imgFirst.src = data.images[0];
      imgSecond.src = data.images[1];
      imgthird.src = data.images[2];

      modalContantTitle.textContent = data.name;

      modalCategory.textContent = data.category.name;

      price.textContent = data.price + ' грн';

      // Відображення зірок

      // starRating.dataset.score = normalizeRating(data.rate);
      // createStars();

      starRating.innerHTML = '';
      createStars(starRating, normalizeRating(data.rate));

      // Відображення кольорових кіл

      wrapperCheckbox.innerHTML = '';

      const inputTypeRadio = data.color
        .map(
          (color, i) =>
            `<input type="radio" name="option" style="background-color:${color}" ${
              i === 0 ? 'checked' : ''
            }>`
        )
        .join('');

      wrapperCheckbox.insertAdjacentHTML('beforeend', inputTypeRadio);

      descriptionModal.textContent = data.description;

      dimensionsModal.textContent = data.sizes;

      // Збереження даних для форми

      
      modalContantButton.addEventListener('click', () => {
        // Зчитування даних про колір інпуту
        const checkedRadio = document.querySelector(
          'input[name="option"]:checked'
        );
        const rgbColor = getComputedStyle(checkedRadio).backgroundColor;

        // Перетворення rgb у hex
        function rgbToHex(rgb) {
          const result = rgb.match(/\d+/g); // отримує [r, g, b]
          return (
            '#' +
            result
              .map(x => {
                const hex = parseInt(x).toString(16);
                return hex.length === 1 ? '0' + hex : hex;
              })
              .join('')
          );
        }

        const markerValueHex = rgbToHex(rgbColor);

        remoweClassName(modalOverlay);
        openOrderModal(idOurFurnitureCardButton, markerValueHex);
      });


      hideLoader();
    })
    .catch(error => {
      iziToast.error({
        title: 'Помилка!',
        message: 'Не вдалося завантажити дані з сервера.',
        position: 'topRight',
      });
    });
});

function remoweClassName(param) {
  param.classList.remove('is-open');
  body.style = '';
}

// Варіанти закриття модального вікна

export function closeModal() {
  closeButton.addEventListener('click', () => {
    remoweClassName(modalOverlay);
  });

  modalOverlay.addEventListener('click', event => {
    if (event.target === modalOverlay) {
      remoweClassName(modalOverlay);
    }
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      remoweClassName(modalOverlay);
    }
  });
}
closeModal();

const imgFirst = document.querySelector('.img-first');
const imgSecond = document.querySelector('.img-second');
const imgthird = document.querySelector('.img-third');
const modalContantTitle = document.querySelector('.modal-contant-title');
const price = document.querySelector('.price');
const wrapperCheckbox = document.querySelector('.wrapper-checkbox');

const BASE_URL = 'https://furniture-store-v2.b.goit.study/api/furnitures';

// Запит на сервер

export async function getUrl() {
  const url = `${BASE_URL}/${idOurFurnitureCardButton}`;

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error(`HTTP${response.status}`);
    const data = await response.json();

    return data;
  } catch (error) {
    hideLoader();
    remoweClassName(modalOverlay);
    return error;
  }
}

// коректне відображення контенту при зміні розміру вікна

window.addEventListener('resize', () => {
  if (!loader.style.display || loader.style.display === 'none') {
    if (window.innerWidth >= 1440) {
      modalContant.style.display = 'flex';
    } else {
      modalContant.style.display = 'block';
    }
  }
});
function showLoader() {
  loader.style.display = 'block';
  modalContant.style.display = 'none';
}
function hideLoader() {
  loader.style.display = 'none';
  if (window.innerWidth >= 1440) {
    modalContant.style.display = 'flex';
  } else {
    modalContant.style.display = 'block';
  }
}

// Відображення зірок

// function createStars() {
//   document.querySelectorAll('.stars.star-rating').forEach(el => {
//     el.innerHTML = '';
//     const score = Number(el.dataset.score || 4);

//     const raty = new Raty(el, {
//       readOnly: true,
//       score,
//       half: true,
//       starType: 'img',
//       starOn: 'https://cdn.jsdelivr.net/npm/raty-js/lib/images/star-on.png',
//       starOff: 'https://cdn.jsdelivr.net/npm/raty-js/lib/images/star-off.png',
//       starHalf: 'https://cdn.jsdelivr.net/npm/raty-js/lib/images/star-half.png',
//     });

//     raty.init();
//   });
// }

function createStars(el, score) {
  el.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    star.setAttribute('width', '16');
    star.setAttribute('height', '15');
    star.setAttribute('viewBox', '0 0 32 32');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');

    if (i <= Math.floor(score)) {
      use.setAttribute('href', `${starPath}#icon-vector-full`);
      use.setAttribute('fill', 'rgba(8, 12, 9, 1)');
    } else if (i - 0.5 === score) {
      use.setAttribute('href', `${starPath}#icon-vector-half`);
      use.setAttribute('fill', 'rgba(8, 12, 9, 1)');
    } else {
      use.setAttribute('href', `${starPath}#icon-star`);
      use.setAttribute('fill', 'rgba(8, 12, 9, 1)');
    }

    star.appendChild(use);
    el.appendChild(star);
  }
}

// Округлення для зірок

function normalizeRating(v) {
  const val = Number(v);
  if (val >= 3.3 && val <= 3.7) return 3.5;
  if (val >= 3.8 && val <= 4.2) return 4;
  return Math.round(val * 2) / 2;
}
