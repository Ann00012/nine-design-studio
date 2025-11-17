import {
  renderFurnitureList,
  renderContainer,
  page,
  limit,
  resetPage,
  showLoader,
  hideLoader,
} from './furniture-list';
const API_URL = 'https://furniture-store-v2.b.goit.study/api';
export const categoryContainer = document.querySelector(
  '.our-furniture-categories'
);
async function fetchFurnitureCategories() {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch furniture categories');
  }
  return await response.json();
}
function sortCategories(categories) {
  if (!Array.isArray(categories)) return [];
  return categories.slice().sort((a, b) => {
    const ida = a && a._id ? String(a._id) : '';
    const idb = b && b._id ? String(b._id) : '';
    const sa = ida.slice(-2);
    const sb = idb.slice(-2);
    return sa.localeCompare(sb, undefined, { sensitivity: 'base' });
  });
}
function createCategoryOption(category) {
  const option = document.createElement('li');
  option.innerHTML = `
    <button class="our-furniture-category-card" data-category="${category._id}"> <span class="our-furniture-category-card-label">${category.name}</span>
    </button>
    `;
  return option;
}
function renderCategoryOptions(categories) {
  categoryContainer.innerHTML =
    '<li><button class="our-furniture-category-card is-active" style="background-image: url(/src/img/our-furniture/1-x/all-products.jpg); background-image: image-set(url(/src/img/our-furniture/1-x/all-products.jpg) 1x, url(/src/img/our-furniture/2-x/all-products@2x.jpg) 2x);"><span class="our-furniture-category-card-label">Всі товари</span></button></li>';
  categories.forEach(category => {
    const option = createCategoryOption(category);
    categoryContainer.appendChild(option);
  });
}
export function loadAndRenderFurnitureCategories() {
  fetchFurnitureCategories()
    .then(categories => {
      renderCategoryOptions(sortCategories(categories));
    })
    .catch(error => {
      console.error('Error loading furniture categories:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to load furniture categories. Please try again later.',
      });
    });
}
async function fetchFurnitureListByFilter(page, limit, category) {
  const response = await fetch(
    `${API_URL}/furnitures?page=${page}&limit=${limit}` +
      (category ? `&category=${category}` : '')
  );
  return response;
}
categoryContainer.addEventListener('click', event => {
  const button = event.target.closest('.our-furniture-category-card');
  if (!button) return;
  const selectedCategory = button.getAttribute('data-category') || null;
  try {
    resetPage();
    showLoader("loaderProductList");
    fetchFurnitureListByFilter(page, limit, selectedCategory)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch furniture list by filter');
        }
        return response.json();
      })
      .then(furnitureList => {
        renderFurnitureList(furnitureList, renderContainer);
        hideLoader("loaderProductList");
      })
      .catch(error => {
        console.error('Error loading filtered furniture list:', error);
        iziToast.error({
          title: 'Error',
          message: 'Failed to load furniture list. Please try again later.',
        });
        hideLoader("loaderProductList");
      });
  } catch (error) {
    console.error('Unexpected error:', error);
    hideLoader("loaderProductList");
  }
});
function toggleActiveCategory(selectedButton) {
  const currentActive = categoryContainer.querySelector(
    '.our-furniture-category-card.is-active'
  );
  if (currentActive) {
    currentActive.classList.remove('is-active');
  }
  selectedButton.classList.add('is-active');
}
categoryContainer.addEventListener('click', event => {
  const button = event.target.closest('.our-furniture-category-card');
  if (!button) return;
  toggleActiveCategory(button);
});
