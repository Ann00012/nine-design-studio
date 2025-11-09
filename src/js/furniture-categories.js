

const API_URL =
  'https://furniture-store-v2.b.goit.study/api';
const categoryContainer = document.querySelector('.our-furniture-categories');
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
        const ida = (a && a._id) ? String(a._id) : '';
        const idb = (b && b._id) ? String(b._id) : '';
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
    categoryContainer.innerHTML = '<li><button class="our-furniture-category-card" style="background-image: url(../img/our-furniture/1-x/all-products.jpg); background-image: image-set(url(../img/our-furniture/1-x/all-products.jpg) 1x, url(../img/our-furniture/2-x/all-products@2x.jpg) 2x);"><span class="our-furniture-category-card-label">Всі товари</span></button></li>';
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

