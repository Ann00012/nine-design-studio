import s from 'accordion-js';

export const FURNITURE_API_URL =
  'https://furniture-store-v2.b.goit.study/api/furnitures';
export const renderContainer = document.querySelector(
  '.our-furniture-product-list'
);
export let page = 1;
export const limit = 8;
const loadMoreButton = document.querySelector('.our-furniture-show-more-btn');
export async function fetchFurnitureList(page, limit) {
  const response = await fetch(
    `${FURNITURE_API_URL}?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch furniture list');
  }
  return await response.json();
}
export function createFurnitureCard(furniture) {
  const card = document.createElement('li');
  card.className = 'our-furniture-product-list-card';
  card.innerHTML = `
        <img src="${furniture.images[0]}" alt="${
    furniture.name
  }" class="our-furniture-card-image"/>
        <h3 class="our-furniture-card-title">${furniture.name}</h3>
        <ul class="our-furniture-card-color-list">
            ${furniture.color
              .map(
                color =>
                  `<li class="our-furniture-card-color" style="background-color: ${color};"></li>`
              )
              .join('')}
          </ul>    
        <p class="our-furniture-card-price">${furniture.price} грн</p>
        <button class="our-furniture-card-button"data-id="${
          furniture._id
        }">Детальніше</button>
    `;
  return card;
}
export function showLoader() {
  const loader = document.querySelector('.loader-wrapper');
  if (loader) loader.style.display = 'flex';
}

export function hideLoader() {
  const loader = document.querySelector('.loader-wrapper');
  if (loader) loader.style.display = 'none';
}

export function renderFurnitureList(furnitureList, container) {
  container.innerHTML = '';
  furnitureList.furnitures.forEach(furniture => {
    const card = createFurnitureCard(furniture);
    container.appendChild(card);
    if (furnitureList.totalItems > limit) {
      showLoadMore();
    } else {
      hideLoadMore();
    }
  });
}
export function loadAndRenderFurniture() {
  showLoader();
  try {
    fetchFurnitureList(page, limit)
      .then(furnitureList => {
        renderFurnitureList(furnitureList, renderContainer);
        hideLoader();
      })
      .catch(error => {
        console.error('Error loading furniture list:', error);
        iziToast.error({
          title: 'Error',
          message: 'Failed to load furniture list. Please try again later.',
        });
      });
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

function showLoadMore() {
  if (!loadMoreButton.classList.contains('is-open')) {
    loadMoreButton.classList.add('is-open');
  }
}
function hideLoadMore() {
  if (loadMoreButton.classList.contains('is-open')) {
    loadMoreButton.classList.remove('is-open');
  }
}
export function resetPage() {
  page = 1;
}
function loadMoreFurniture() {
  page += 1;
   showLoader();
  fetchFurnitureList(page, limit)
    .then(furnitureList => {
      furnitureList.furnitures.forEach(furniture => {
        const card = createFurnitureCard(furniture);
        renderContainer.appendChild(card);
      });
      if (furnitureList.totalItems <= page * limit) {
        hideLoadMore();
      }
       hideLoader();
    })
    .catch(error => {
      console.error('Error loading more furniture:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to load more furniture. Please try again later.',
      });
       hideLoader();
    });
}

loadMoreButton.addEventListener('click', loadMoreFurniture);
