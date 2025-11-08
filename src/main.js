import Accordion from 'accordion-js';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';;
import iziToast from 'izitoast';
import raty from 'raty-js';

// my code
import axios from 'axios';
import { closeModal } from './js/details-modal';
closeModal()

// Видалити код нище

const fetchUsers = async () => {
  const response = await axios.get(
    'https://furniture-store-v2.b.goit.study/api-docs/furnitures'
  );
  return response;
};

fetchUsers().then(users => console.log(users));

// Видалити код вище