function hero() {
  // Get the element from the DOM
  const slider = document.querySelector('.slider')

  // If it exists, play the aniamtion
  if (slider) {
    const paginationEl = document.createElement('div')
    paginationEl.classList.add('swiper-pagination')
    paginationEl.classList.add('hero-pagination')
    slider.appendChild(paginationEl)
    new Swiper(slider, {
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

    // const sliderVisibleLeft = document.querySelector('.slider-visible-left')
    // const secondSliderLeft = new Swiper(sliderVisibleLeft, {
    //   spaceBetween: 0,
    //   slidesPerView: 'auto',
    //   loop: true,
    // })
    // secondSliderLeft.changeLanguageDirection('rtl')
    // const sliderVisibleRight = document.querySelector('.slider-visible-right')
    // const secondSliderRight = new Swiper(sliderVisibleRight, {
    //   spaceBetween: 0,
    //   slidesPerView: 'auto',
    //   loop: true,
    // })
    // mainSlider.controller.control = secondSliderLeft
    // mainSlider.controller.control = secondSliderRight
    // secondSliderRight.controller.control = mainSlider
    // secondSliderLeft.controller.control = mainSlider
  }
}

export default hero
