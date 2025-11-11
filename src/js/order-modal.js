import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

// const API_BASE_URL = 'https://furniture-store-v2.b.goit.study';
const API_BASE_URL = 'https://furniture-store-v2.b.goit.study/api';

const orderModal = document.querySelector('.order-modal');
const closeButton = document.querySelector('.form-container .close-button');
const orderForm = document.getElementById('orderForm');

let currentFurnitureId = null;
let currentMarkerValue = null;

export function openOrderModal(furnitureId, markerValue) {
    currentFurnitureId = furnitureId;
    currentMarkerValue = markerValue;

    console.log(currentFurnitureId, currentMarkerValue);
    

    orderModal.classList.add('is-open'); 
    document.body.style.overflow = 'hidden'; 
    document.addEventListener('keydown', onEscKeyPress);
}

function closeOrderModal() {
    orderModal.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onEscKeyPress);
    orderForm.reset();
}

function onEscKeyPress(event) {
    if (event.key === 'Escape') {
        closeOrderModal();
    }
}

closeButton.addEventListener('click', closeOrderModal);

orderModal.addEventListener('click', (event) => {
    if (event.target === orderModal) {
        closeOrderModal();
    }
});



function validateFormData(data) {
    // Регулярний вираз для телефону (допускає +380XXXXXXXXX, або 380XXXXXXXXX)
    const phoneRegex = /^\+?380\d{9}$/; 

    if (!data.name || data.name.length < 2) {
        iziToast.error({ message: 'Ім\'я повинно містити мінімум 2 символи.', position: 'topRight' });
        return false;
    }
    
    // Перевіряємо, чи телефон відповідає формату після видалення пробілів/дужок
    if (!data.phone || !phoneRegex.test(data.phone.replace(/[\s\(\)\-]/g, ''))) {
        iziToast.error({ message: 'Введіть коректний номер телефону у форматі +380XXXXXXXXX.', position: 'topRight' });
        return false;
    }

    return true;
}

orderForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(orderForm);
    const orderData = Object.fromEntries(formData.entries());

    orderData.furnitureId = currentFurnitureId;
    orderData.marker = currentMarkerValue;

    orderData.modelId = currentFurnitureId;
    orderData.color = currentMarkerValue;
    delete orderData.furnitureId;
    delete orderData.marker;

    if (!validateFormData(orderData)) {
        return;
    }
    
    const submitBtn = orderForm.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Надсилання...';

    try {
        const response = await fetch(`${API_BASE_URL}/orders`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            const error = await response.json();
            iziToast.error({
                title: 'Помилка!',
                message: error.message || 'Не вдалося надіслати заявку. Спробуйте пізніше.',
                position: 'topRight'
            });
            return;
        }

        iziToast.success({
            title: 'Успіх!',
            message: 'Ваша заявка успішно надіслана. Ми скоро зв\'яжемося з Вами.',
            position: 'topRight'
        });
        
        closeOrderModal();

    } catch (error) {
        iziToast.error({
            title: 'Помилка мережі!',
            message: 'Перевірте ваше інтернет-з\'єднання.',
            position: 'topRight'
        });
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Надіслати заявку';
    }
});