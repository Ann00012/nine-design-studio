import Accordion from 'accordion-js';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import iziToast from 'izitoast';
import raty from 'raty-js';

import './js/faq-section';
import { loadAndRenderFurniture } from './js/furniture-list.js';
import { loadAndRenderFurnitureCategories } from './js/furniture-categories.js';


// our-furniture section
loadAndRenderFurnitureCategories();
loadAndRenderFurniture();
// end of our-furniture section
