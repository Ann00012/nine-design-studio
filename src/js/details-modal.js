import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const modalOverlay = document.querySelector('.modal-overlay');

const closeButton = document.querySelector('.close-button');

const modalDetails = document.querySelector('.modal-details');

const modalContantButton = document.querySelector('.modal-contant-button');

const modalCategory = document.querySelector('.modal-category');

const descriptionModal = document.querySelector('.description-modal');

const dimensionsModal = document.querySelector('.dimensions-modal');

const loader = document.querySelector('.modal-overlay .loader');

const modalContant = document.querySelector('.modal-contant');

let idOurFurnitureCardButton = null;

function addClassName(param) {
  param.classList.add('is-open');
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

  modalContantButton.addEventListener('click', () => {
    remoweClassName(modalOverlay);
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
  
  