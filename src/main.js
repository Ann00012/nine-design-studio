import Accordion from 'accordion-js';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import iziToast from 'izitoast';
import raty from 'raty-js';




// Код нище секція модального контенту
import axios from 'axios';
import {
  closeModal,
} from './js/details-modal';




// Код вище секція модального контенту



import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// const swiper = new Swiper('.swiper', {
//   modules: [Navigation, Pagination],
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   },
// });
import './js/faq-section';
import { loadAndRenderFurniture } from './js/furniture-list.js';
import { loadAndRenderFurnitureCategories } from './js/furniture-categories.js';

// our-furniture section
loadAndRenderFurnitureCategories();
loadAndRenderFurniture();

// end of our-furniture section

