function hero() {
  // Get the element from the DOM
  const slider = document.querySelector('.slider')

  // If it exists, play the aniamtion
  if (slider) {
    const paginationEl = document.createElement('div')
    paginationEl.classList.add('swiper-pagination')
    paginationEl.classList.add('hero-pagination')
    slider.appendChild(paginationEl)
    const mainSlider = new Swiper(slider, {
      spaceBetween: 2,
      slidesPerView: 1,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: true,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: paginationEl,
        clickable: true,
      },
    })

    const sliderVisible = document.querySelector('.slider-visible')
    const secondSlider = new Swiper(sliderVisible, {
      spaceBetween: 24,
      slidesPerView: 1,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: true,
      },
    })
    mainSlider.controller.control = secondSlider
    secondSlider.controller.control = mainSlider
  }
}

export default hero
