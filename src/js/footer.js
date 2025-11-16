document.addEventListener('DOMContentLoaded', () => {
  const footerLogo = document.querySelector('.footer-logo');
  const footerLinks = document.querySelectorAll('.footer-link');
  const socialLinks = document.querySelectorAll('.footer-socials a');
  const footerYear = document.querySelector('.footer-copyright');

 
  footerLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          const yOffset = -70; 
          const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });


  if (footerLogo) {
    footerLogo.addEventListener('click', e => {
  
      window.location.href = './index.html';
    });
  }

  socialLinks.forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.textContent = `© ${year} Меблерія. Всі права захищені`;
  }
});
