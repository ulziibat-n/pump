import Swiper from 'swiper'

function hero() {
  // Get the element from the DOM
  const slider = document.querySelector('.slider')

  // If it exists, play the aniamtion
  if (slider) {
    new Swiper(slider, {
      spaceBetween: 10,
      slidesPerView: 1,
      loop: true,
      autoplay: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: false,
      },
    })
  }
}

export default hero
