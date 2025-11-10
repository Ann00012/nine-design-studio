import axios from 'axios';

const modalOverlay = document.querySelector('.modal-overlay');

const closeButton = document.querySelector('.close-button');

const modalDetails = document.querySelector('.modal-details');

const modalContantButton = document.querySelector('.modal-contant-button');

const modalCategory = document.querySelector('.modal-category');

const descriptionModal = document.querySelector('.description-modal');

const dimensionsModal = document.querySelector('.dimensions-modal');

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

  getUrl()
    .then(data => {
      console.log(data);

      imgFirst.src = data.images[0];
      imgSecond.src = data.images[1];
      imgthird.src = data.images[2];

      modalContantTitle.textContent = data.name;
      
      modalCategory.textContent = data.category.name;

      price.textContent = data.price + ' грн';

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
    })
    .catch(error => {
      console.log(error);
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

    if (!response.ok) throw new Error(HTTP`${response.status}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

  
  