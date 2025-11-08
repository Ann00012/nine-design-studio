import axios from 'axios';

const modalOverlay = document.querySelector('.modal-overlay');

// const modalOrderOverlay = document.querySelector('.modal-order-overlay'); змінна для відкривання форми замовлення

const closeButton = document.querySelector('.close-button');

const modalDetails = document.querySelector('.modal-details');

const modalContantButton = document.querySelector('.modal-contant-button');

function addClassName(param) {
  param.classList.add('is-open');
}

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

