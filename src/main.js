import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { CustomEase, ScrollTrigger, SplitText } from 'gsap/all'
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import './styles/style.scss'

gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText)

CustomEase.create('base', '0.075, 0.82, 0.165, 1')

document.body.classList.add('is-loading')
console.log('Welcome to Vite + JS + Webflow! 😍')

window.onload = () => {
  const lenis = new Lenis()
  // lenis.on('scroll', (e) => {
  //   console.log(e)
  // })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  console.log('Lenis ✅')
  document.body.classList.remove('is-loading')
  document.body.classList.add('is-loaded')
  console.log('Site Loaded ✅')
  runSections()
  console.log('Hero Section ✅')
}

function runSections() {
  // Hero Section
  // ---------------------------------------
  const sectionHero = document.querySelector('[data-section="hero"]')

  // If it exists, play the aniamtion
  if (sectionHero) {
    const heroTitle = new SplitText('.hero-content h1', { type: 'lines' })
    let heroElements = gsap.utils.toArray([
      '.hero-content p',
      '.hero-content a',
    ])
    if (heroElements && heroTitle) {
      const heroTimeline = gsap.timeline({
        defaults: {
          ease: 'base',
        },
      })

      heroElements = gsap.utils.toArray(heroElements)
      heroElements.unshift(heroTitle.lines)

      heroTimeline
        .fromTo(
          heroElements,
          {
            opacity: 0,
            y: '3rem',
          },
          {
            opacity: 1,
            y: '0rem',
            duration: 2,
            stagger: 0.1,
            delay: 0.1,
          }
        )
        .fromTo(
          '.hero-width.is-main',
          {
            opacity: 0,
            y: '1rem',
            scale: 0.95,
          },
          {
            opacity: 1,
            y: '0rem',
            scale: 1,
            delay: 0,
            duration: 2,
          },
          '-=1'
        )
        .fromTo(
          '.hero-width.is-grow .hero-slider-item',
          {
            opacity: 0,
            y: '3rem',
          },
          {
            opacity: 1,
            y: '0rem',
            duration: 2,
            stagger: {
              each: 0.1,
              from: 'center',
            },
          },
          '-=1.5'
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

    // Black Top Section
    // ---------------------------------------
    const blackTopTimeline = gsap.timeline({
      defaults: {
        ease: 'base',
      },
      scrollTrigger: {
        trigger: '.black-top',
        start: 'top 70%',
      },
    })

    const blackTopTitle = new SplitText('.black-top h2', { type: 'lines' })

    blackTopTimeline
      .fromTo(
        blackTopTitle.lines,
        {
          opacity: 0,
          y: '3rem',
        },
        {
          opacity: 1,
          y: '0rem',
          duration: 2,
          stagger: 0.1,
          delay: 0.1,
        }
      )
      .fromTo(
        '.black-top p.black-desciption',
        {
          opacity: 0,
          y: '3rem',
        },
        {
          opacity: 1,
          y: '0rem',
          duration: 2,
          stagger: 0.1,
          delay: 0.1,
        },
        '-=2'
      )
      .fromTo(
        '.black-top .search',
        {
          opacity: 0,
          y: '3rem',
        },
        {
          opacity: 1,
          y: '0rem',
          duration: 2,
          stagger: 0.1,
          delay: 0.1,
        },
        '-=2'
      )

    // ScrollTrigger.create({
    //   animation: blackTopTimeline,
    //   trigger: '.black-top',
    //   start: 'bottom 90%',
    //   end: '+=' + document.querySelector('.black-top').offsetHeight,
    //   markers: true, // only during development!
    //   pin: true,
    //   pinSpacing: true,
    //   anticipatePin: 1,
    //   pinType: 'transform',
    //   pinReparent: '.black-top-pin',
    //   pinnedContainer: '.black-top-pin',
    //   toggleActions: 'play pause resume reverse',
    // })
  }
}
