import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { CustomEase, ScrollTrigger, SplitText } from 'gsap/all'
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import Typed from 'typed.js'
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
            y: '1rem',
            scale: 0.95,
          },
          {
            opacity: 1,
            y: '0rem',
            scale: 1,
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
    new Typed('.typed-text', {
      strings: [
        'Quels objectifs financiers me fixer?',
        'Comment me créer des revenus complémentaires nets de fiscalité?',
        'Comment réduire mes impôts?',
        'Je souhaiterais optimiser ma rémunération de dirigeant',
        'Comment épargner intelligemment? ',
        'Est-ilpossible de transmettre mon patrimoine à moindre coût',
        'Quelles recommandations pour protéger ma famille',
        "J'ai besoin de me créer un patrimoine diversifié et solide",
        'Comment créer un programme d’investissement adapté à ma situation perso',
        "Est-il possible d'anticiper la cession de mon entreprise",
        'Comment préparer ma retraite individuelle pour conserver mon niveau de vie',
        'Quelles conseils pour commencer à investir?',
      ],
      typeSpeed: 70,
      backDelay: 1400,
      loop: false,
      loopCount: Infinity,
      showCursor: true,
      fadeOut: true,
      fadeOutClass: 'typed-fade-out',
      fadeOutDelay: 500,
    })

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

    // Black Bottom Section
    // ---------------------------------------

    const blackBottomTimeline = gsap.timeline({
      defaults: {
        ease: 'base',
      },
      scrollTrigger: {
        trigger: '.black-bottom',
        start: 'top 70%',
        end: 'bottom 70%',
      },
    })

    const blackBtoomTitle = new SplitText('.black-bottom h3', { type: 'lines' })

    blackBottomTimeline
      .fromTo(
        blackBtoomTitle.lines,
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
        '.black-bottom p',
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
        '.black-media',
        {
          opacity: 0,
          scale: 0.95,
          y: '3rem',
        },
        {
          opacity: 1,
          scale: 1,
          y: '0rem',
          duration: 2,
          stagger: 0.1,
          delay: 0.1,
        },
        '-=2'
      )
      .fromTo(
        '.black-media .black-image',
        {
          scale: 1.5,
        },
        {
          scale: 1,
          duration: 3,
          stagger: 0.1,
          delay: 0.1,
        },
        '-=2'
      )
      .fromTo(
        '.message',
        {
          y: '1rem',
          opacity: 0,
          scale: 0.9,
          rotate: '3deg',
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: '0deg',
          duration: 1,
          stagger: 0.2,
          delay: 0.5,
        },
        '-=2'
      )
      .fromTo(
        '.black-bottom .button',
        {
          opacity: 0,
          y: '3rem',
        },
        {
          opacity: 1,
          y: 0,
          duration: 3,
          stagger: 0.1,
          delay: 0.1,
        },
        '-=1'
      )

    // Black Bottom Section
    // ---------------------------------------

    const cardTitle = new SplitText('.cards h2', { type: 'lines' })

    gsap.fromTo(
      cardTitle.lines,
      {
        opacity: 0,
        y: '3rem',
      },
      {
        opacity: 1,
        y: '0rem',
        duration: 1,
        stagger: 0.1,
        delay: 0.5,
        ease: 'base',
        scrollTrigger: {
          trigger: '.cards',
          start: 'top 10%',
          end: 'top center',
        },
      }
    )

    gsap.fromTo(
      '.card',
      {
        opacity: 0,
        scale: 0.9,
        y: '40%',
      },
      {
        opacity: 1,
        y: '0rem',
        scale: 1,
        duration: 1,
        stagger: 0.1,
        delay: 1,
        ease: 'base',
        scrollTrigger: {
          trigger: '.card-row',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          once: true,
        },
      }
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
