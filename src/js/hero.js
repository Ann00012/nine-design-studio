document.addEventListener('DOMContentLoaded', () => {
    const heroBtn = document.querySelector('.hero-btn');
    if (heroBtn) { 
        heroBtn.addEventListener('click', e => {
            const href = heroBtn.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    heroBtn.classList.add('clicked'); 
                    const yOffset = -70;
                    const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ 
                        top: y, 
                        behavior: 'smooth' 
                    });
                    heroBtn.blur();
                }
            }
        });
    }
});
