import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import Raty from 'raty-js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

/* ------------------ Конфіг ------------------ */
const API_BASE = 'https://furniture-store-v2.b.goit.study/api';
const LIMIT = 10;

/* ------------------ DOM ------------------ */
const loaderEl = () => document.querySelector('.feedback__loader');
const listEl = () => document.getElementById('feedbackList');
const prevBtn = () => document.querySelector('.feedback__prev');
const nextBtn = () => document.querySelector('.feedback__next');

/* ------------------ Loader ------------------ */
const showLoader = () => loaderEl()?.removeAttribute('hidden');
const hideLoader = () => loaderEl()?.setAttribute('hidden', '');

/* ------------------ Округлення рейтингу ------------------ */
function normalizeRating(v) {
  const val = Number(v);
  if (val >= 3.3 && val <= 3.7) return 3.5;
  if (val >= 3.8 && val <= 4.2) return 4;
  return Math.round(val * 2) / 2;
}

/* ------------------ Шаблон картки ------------------ */
function cardTemplate({ name, descr, rate }) {
  const normalized = normalizeRating(rate);
  return `
    <div class="swiper-slide">
      <article class="feedback-card">
        <div class="feedback-card__content">
          <div class="feedback-card__block">
            <div class="feedback-card__stars" data-score="${normalized}"></div>
            <p class="feedback-card__text">“${descr}”</p>
            <p class="feedback-card__author">${name}</p>
          </div>
        </div>
      </article>
    </div>`;
}

/* ------------------ Отримання даних ------------------ */
async function fetchFeedbacks() {
  const url = `${API_BASE}/feedbacks?limit=${LIMIT}`;
  try {
    showLoader();
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data?.feedbacks?.slice(0, LIMIT) ?? [];
  } catch (e) {
    iziToast.warning({
      title: '⚠ API недоступне',
      message: 'Показано тестові дані.',
      position: 'topRight',
      timeout: 2500,
    });
    return [
      {
        name: 'Олена Коваль',
        descr:
          'Дуже задоволена покупкою! Диван не тільки стильний, а й неймовірно зручний.',
        rate: 4.5,
      },
      {
        name: 'Ірина Соколова',
        descr: 'Нарешті знайшли меблі, які ідеально вписались у наш інтер’єр.',
        rate: 4,
      },
      {
        name: 'Андрій Шевченко',
        descr: 'Замовляв шафу й ліжко — все приїхало раніше терміну!',
        rate: 5,
      },
    ];
  } finally {
    loaderEl()?.remove();
  }
}

/* ------------------ Відображення зірок ------------------ */
function mountStars() {
  document.querySelectorAll('.feedback-card__stars').forEach(el => {
    const score = Number(el.dataset.score || 4);

    const raty = new Raty(el, {
      readOnly: true,
      score,
      half: true,
      starType: 'img',
      starOn: 'https://cdn.jsdelivr.net/npm/raty-js/lib/images/star-on.png',
      starOff: 'https://cdn.jsdelivr.net/npm/raty-js/lib/images/star-off.png',
      starHalf: 'https://cdn.jsdelivr.net/npm/raty-js/lib/images/star-half.png',
    });

    raty.init();
  });
}

/* ------------------ Синхронізація кнопок ------------------ */
function syncArrowDisabled(swiper) {
  prevBtn().disabled = swiper.isBeginning;
  nextBtn().disabled = swiper.isEnd;
}

/* ------------------ Ініціалізація ------------------ */
async function initFeedback() {
  const feedbacks = await fetchFeedbacks();

  if (!feedbacks.length) {
    listEl().innerHTML = `
      <div class="swiper-slide">
        <p class="feedback-card__text">Немає відгуків 😔</p>
      </div>`;
    return;
  }

  listEl().innerHTML = feedbacks.map(cardTemplate).join('');
  mountStars();

  const swiper = new Swiper('.feedback__swiper', {
    slidesPerView: 3,
    spaceBetween: 24,
    pagination: {
      el: '.feedback__pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.feedback__prev',
      nextEl: '.feedback__next',
    },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 16 },
      768: { slidesPerView: 2, spaceBetween: 24 },
      1440: { slidesPerView: 3, spaceBetween: 24 },
    },
    on: {
      afterInit(sw) {
        syncArrowDisabled(sw);
      },
      slideChange(sw) {
        syncArrowDisabled(sw);
      },
    },
  });
}

/* ------------------ Запуск ------------------ */
document.addEventListener('DOMContentLoaded', initFeedback);
