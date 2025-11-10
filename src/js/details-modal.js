import axios from 'axios';

const modalOverlay = document.querySelector('.modal-overlay');

const closeButton = document.querySelector('.close-button');

const modalDetails = document.querySelector('.modal-details');

const modalContantButton = document.querySelector('.modal-contant-button');

export const buttonOpenModal = document.querySelector(
  '.our-furniture-card-button'
);

function addClassName(param) {
  param.classList.add('is-open');
}

// export function openModal() {
//   ourFurnitureCardButton.addEventListener('click', () => {
//     addClassName(modalOverlay);
//     console.log('add');
// });
// } Повісити на якусь кнопку для відкривання модалки

function remoweClassName(param) {
  param.classList.remove('is-open');
}

export function closeModal() {
  closeButton.addEventListener('click', () => {
    remoweClassName(modalOverlay);
    console.log('ok');
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

  modalContantButton.addEventListener('click', () => {
    remoweClassName(modalOverlay);
  });
}

const imgFirst = document.querySelector('.img-first');
const imgSecond = document.querySelector('.img-second');
const imgthird = document.querySelector('.img-third');
const modalContantTitle = document.querySelector('.modal-contant-title');
const price = document.querySelector('.price');
const wrapperCheckbox = document.querySelector('.wrapper-checkbox');

const BASE_URL = 'https://furniture-store-v2.b.goit.study/api/furnitures';
const LIMIT = 1;

export async function getUrl() {
  const url = `${BASE_URL}?limit=${LIMIT}`;
  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error(HTTP`${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

getUrl()
  .then(data => {
    console.log(data.furnitures[0].color);

    imgFirst.src = data.furnitures[0].images[0];
    imgSecond.src = data.furnitures[0].images[1];
    imgthird.src = data.furnitures[0].images[2];
     
    modalContantTitle.textContent = data.furnitures[0].name;
    price.textContent = data.furnitures[0].price + ' грн';
      
      const inputTypeRadio = data.furnitures[0].color
        .map(
          (color, i) =>
            `<input type="radio" name="option" style="background-color:${color}" ${
              i === 0 ? 'checked' : ''
            }>`
        )
        .join('');

      wrapperCheckbox.insertAdjacentHTML('beforeend', inputTypeRadio);
     
  })
  .catch(error => {
    console.log(error);
  });