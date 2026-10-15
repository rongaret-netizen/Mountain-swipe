// Скрипты подключены с defer: HTML готов, библиотеки загружены первыми.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 600,
    easing: "ease-out-cubic",
    offset: 64,
    once: true,
    disable: prefersReducedMotion,
  });
}

const reviewsCarousel = document.querySelector(".reviews-carousel");

if (reviewsCarousel) {
  if (typeof Swiper === "undefined") {
    document.querySelector(".slider-message").hidden = false;
  } else {
    const reviewsSwiper = new Swiper(".reviews-slider", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoHeight: true,
      speed: prefersReducedMotion ? 0 : 450,
      grabCursor: true,
      allowTouchMove: true,
      simulateTouch: true,

      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },

      // Контейнер точек находится за пределами .swiper.
      pagination: {
        el: ".reviews-pagination",
        clickable: true,
        bulletElement: "button",
      },

      // Внешние стрелки связаны со слайдером собственными классами.
      navigation: {
        nextEl: ".reviews-next",
        prevEl: ".reviews-prev",
        addIcons: false,
      },

      a11y: {
        containerMessage: "Отзывы путешественников",
        prevSlideMessage: "Предыдущий отзыв",
        nextSlideMessage: "Следующий отзыв",
        paginationBulletMessage: "Перейти к отзыву {{index}}",
        slideLabelMessage: "Отзыв {{index}} из {{slidesLength}}",
      },
    });

    reviewsCarousel.classList.add("reviews-carousel--ready");

    // После загрузки шрифтов высота цитаты может измениться.
    if (document.fonts) {
      document.fonts.ready.then(() => {
        reviewsSwiper.updateAutoHeight(0);
        if (typeof AOS !== "undefined") AOS.refresh();
      });
    }
  }
}
