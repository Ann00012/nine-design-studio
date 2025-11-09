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

// export function openOrder() {
//     modalContantButton.addEventListener('click', () => {
//       addClassName(modalOrderOverlay);
//     });
// }

// Початок запиту на сервер

// const fetchUsers = async () => {
//   const response = await axios.get(
//     'https://furniture-store-v2.b.goit.study/api-docs/'
//   );
//   return response.data;
// };

// fetchUsers()
//     .then(users => console.log(users));

const BASE_URL = 'https://furniture-store-v2.b.goit.study/api/furnitures';

export async function getUrl(BASE_URL) {
  try {
    const response = await axios.get(`${BASE_URL}`);
    console.log(response);
  } catch (error) {
    console.log('Помилка при отриманні користувачів:', error);
  }
}

// export const FURNITURE_API_URL =
//   'https://furniture-store-v2.b.goit.study/api/furnitures';
// // export const renderContainer = document.querySelector(
// //   '.our-furniture-product-list'
// // );
// export let page = 1;
// export const limit = 8;
// export async function fetchFurnitureList(page, limit) {
//   const response = await fetch(
//     `${FURNITURE_API_URL}?page=${page}&limit=${limit}`
//   );
//   if (!response.ok) {
//     throw new Error('Failed to fetch furniture list');
//   }
//   return await response.json();
// }

// export function createFurnitureCard(furniture) {
//   const card = document.createElement('li');
//   card.className = 'our-furniture-product-list-card';
//   card.innerHTML = `
//         <img src="${furniture.images[0]}" alt="${
//     furniture.name
//   }" class="our-furniture-card-image"/>
//         <h3 class="our-furniture-card-title">${furniture.name}</h3>
//         <ul class="our-furniture-card-color-list">
//             ${furniture.color
//               .map(
//                 color =>
//                   `<li class="our-furniture-card-color" style="background-color: ${color};"></li>`
//               )
//               .join('')}
//           </ul>
//         <p class="our-furniture-card-price">${furniture.price} грн</p>
//         <button class="our-furniture-card-button">Детальніше</button>
//     `;
//   return card;
// }

// export function renderFurnitureList(furnitureList, container) {
//   container.innerHTML = '';
//   furnitureList.furnitures.forEach(furniture => {
//     const card = createFurnitureCard(furniture);
//     container.appendChild(card);
//   });
// }
// export function loadAndRenderFurniture() {
//   try {
//     fetchFurnitureList(page, limit)
//       .then(furnitureList => {
//         renderFurnitureList(furnitureList, renderContainer);
//       })
//       .catch(error => {
//         console.error('Error loading furniture list:', error);
//         iziToast.error({
//           title: 'Error',
//           message: 'Failed to load furniture list. Please try again later.',
//         });
//       });
//   } catch (error) {
//     console.error('Unexpected error:', error);
//   }
// }
