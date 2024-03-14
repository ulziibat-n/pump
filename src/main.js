import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { CustomEase, ScrollTrigger } from 'gsap/all'
import Splitting from 'splitting'
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'splitting/dist/splitting.css'
import './styles/style.scss'

gsap.registerPlugin(CustomEase, ScrollTrigger)

CustomEase.create('base', '0.075, 0.82, 0.165, 1')

document.body.classList.add('is-loading')
console.log('Welcome to Vite + JS + Webflow!')

document.addEventListener('DOMContentLoaded', () => {
  const lenis = new Lenis()
  lenis.on('scroll', (e) => {
    console.log(e)
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
  document.body.classList.remove('is-loading')
  document.body.classList.add('is-loaded')
  runSections()
})

function runSections() {
  // Get the element from the DOM
  const sectionHero = document.querySelector('[data-section="hero"]')

  // If it exists, play the aniamtion
  if (sectionHero) {
    const heroElements = sectionHero.querySelectorAll('.hero-content > *')
    const heroTitle = Splitting({
      target: sectionHero.querySelector('h1'),
      by: 'lines',
    })

    if (heroElements && heroTitle) {
      gsap.fromTo(
        heroElements,
        {
          opacity: 0,
          y: '3rem',
        },
        {
          opacity: 1,
          y: '0rem',
          duration: 2,
          ease: 'base',
          stagger: 0.1,
          delay: 0.1,
        }
      )
    }

    // Get the element from the DOM
    const slider = document.querySelector('.slider')

    // If it exists, play the aniamtion
    if (slider) {
      const paginationEl = document.createElement('div')
      paginationEl.classList.add('swiper-pagination')
      paginationEl.classList.add('hero-pagination')
      slider.appendChild(paginationEl)
      new Swiper(slider, {
        modules: [Pagination],
        spaceBetween: 2,
        slidesPerView: 1,
        loop: true,
        centeredSlides: true,
        autoplay: {
          delay: 1000,
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
    }
  }
}
