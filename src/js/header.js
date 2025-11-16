document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.querySelector('.burger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-close-btn');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .btn-buy, .mobile-buy');
  const logo = document.querySelector('.logo');
  const furnitureGrid = document.querySelector('.furniture-grid');
  const menuBackdrop = document.querySelector('.menu-backdrop'); 

  
  let loader = document.querySelector('.loader');
  if (!loader) {
    loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
                          font-size:24px;color:#6b0609;">Завантаження...</div>`;
    document.body.appendChild(loader);
  }
  const showLoader = () => loader.style.display = 'block';
  const hideLoader = () => loader.style.display = 'none';

 
  const showToast = (message) => {
    iziToast.error({
      title: 'Помилка',
      message: message,
      position: 'topRight',
      timeout: 3000,
    });
  };


  const openMenu = () => {
    if (!mobileMenu || !burgerBtn || !closeBtn) return;
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    burgerBtn.setAttribute('aria-expanded', 'true');
    burgerBtn.style.display = 'none';
    closeBtn.style.display = 'block';
    if (menuBackdrop) menuBackdrop.classList.add('is-active'); // показати бекдроп
    closeBtn.focus();
  };

  
  const closeMenu = () => {
    if (!mobileMenu || !burgerBtn || !closeBtn) return;
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    burgerBtn.setAttribute('aria-expanded', 'false');
    burgerBtn.style.display = '';
    closeBtn.style.display = 'none';
    if (menuBackdrop) menuBackdrop.classList.remove('is-active'); 
    burgerBtn.focus();
  };

 
  if (burgerBtn) burgerBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) closeMenu();
  });

  document.addEventListener('click', e => {
    if (mobileMenu && mobileMenu.classList.contains('is-open') &&
        !mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) closeMenu();
  });


  let furnitureCache = null;
  navLinks.forEach(link => {
    link.addEventListener('click', async (e) => {
      const href = link.getAttribute('href');

      if (mobileMenu && mobileMenu.classList.contains('is-open')) closeMenu();

      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          const yOffset = -70;
          const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }

      if (href === '#furniture' && furnitureGrid) {
        showLoader();
        try {
          let data;
          if (furnitureCache) {
            data = furnitureCache;
          } else {
            const response = await fetch('https://furniture-store-v2.b.goit.study/api/furniture');
            if (!response.ok) throw new Error('Помилка завантаження меблів');
            data = await response.json();
            furnitureCache = data;
          }

          furnitureGrid.innerHTML = '';
          data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'furniture-card';
            card.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
            `;
            furnitureGrid.appendChild(card);
          });
        } catch(err) {
          showToast(err.message);
        } finally {
          hideLoader();
        }
      }
    });
  });


  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (mobileMenu && mobileMenu.classList.contains('is-open')) closeMenu();
    });
  }
});
