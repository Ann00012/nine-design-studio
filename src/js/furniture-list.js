export const FURNITURE_API_URL =
  'https://furniture-store-v2.b.goit.study/api/furnitures';
export const renderContainer = document.querySelector(
  '.our-furniture-product-list'
);
export let page = 1;
export const limit = 8;
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
        (color) => `<li class="our-furniture-card-color" style="background-color: ${color};"></li>`
      )
      .join('')}
          </ul>    
        <p class="our-furniture-card-price">${furniture.price} грн</p>
        <button class="our-furniture-card-button">Детальніше</button>
    `;
  return card;
}

export function renderFurnitureList(furnitureList, container) {
    container.innerHTML = '';
    furnitureList.furnitures.forEach(furniture => {
        const card = createFurnitureCard(furniture);
        container.appendChild(card);
    });
}
export function loadAndRenderFurniture() {
    try {
        fetchFurnitureList(page, limit)
            .then(furnitureList => { 
                renderFurnitureList(furnitureList, renderContainer);
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