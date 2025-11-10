import Accordion from 'accordion-js';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import iziToast from 'izitoast';
import raty from 'raty-js';


// Код нище секція модального контенту
import axios from 'axios';
import {
  closeModal,
  getUrl,

  // openModal
} from './js/details-modal';
// openModal(); 
closeModal();




// Код вище секція модального контенту

import './js/faq-section';
import { loadAndRenderFurniture } from './js/furniture-list.js';
// our-furniture section
loadAndRenderFurniture();
// end of our-furniture section

