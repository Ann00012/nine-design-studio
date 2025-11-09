import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

new Accordion('.accordion-container', {
  duration: 500,
  ariaEnabled: true,
  collapse: true,
  elementClass: 'ac',
});
