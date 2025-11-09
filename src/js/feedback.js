document.addEventListener("DOMContentLoaded", () => {
  const feedbackCards = document.querySelectorAll(".feedback__card");

  feedbackCards.forEach((card) => {
    const ratingContainer = card.querySelector(".feedback__rating");
    let rating = parseFloat(card.dataset.rating);

    // Округлення
    if (rating >= 3.3 && rating <= 3.7) rating = 3.5;
    else if (rating >= 3.8 && rating <= 4.2) rating = 4;
    else rating = Math.round(rating * 2) / 2;

    ratingContainer.innerHTML = "";


    for (let i = 1; i <= 5; i++) {
      const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      star.setAttribute("viewBox", "0 0 24 24");
      star.setAttribute("width", "24");
      star.setAttribute("height", "24");
      star.classList.add("star");

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute(
        "d", "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      );

      if (i <= Math.floor(rating)) {

        // Повна зірка
        path.setAttribute("fill", "#000000ff");
      } else if (i - rating === 0.5) {
        // Напівзірка (заповнення зліва направо)
        const gradId = `grad-${Math.random().toString(36).substring(2, 9)}`;
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const grad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");

        grad.setAttribute("id", gradId);
        grad.setAttribute("x1", "0");
        grad.setAttribute("y1", "0");
        grad.setAttribute("x2", "100%");
        grad.setAttribute("y2", "0");

        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop1.setAttribute("offset", "50%");
        stop1.setAttribute("stop-color", "#000000ff");
        
        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop2.setAttribute("offset", "50%");
        stop2.setAttribute("stop-color", "#e0e0e0");
        grad.appendChild(stop1);
        grad.appendChild(stop2);
        defs.appendChild(grad);
        star.appendChild(defs);
        path.setAttribute("fill", `url(#${gradId})`);
      } else {

        // Порожня зірка
        path.setAttribute("fill", "#e0e0e0");
      }

      star.appendChild(path);
      ratingContainer.appendChild(star);
    }
  });
});