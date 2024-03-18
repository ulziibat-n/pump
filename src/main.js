import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { CustomEase, ScrollTrigger, SplitText } from 'gsap/all'
import Swiper from 'swiper'
import { Pagination, EffectFade, Autoplay } from 'swiper/modules'
import Typed from 'typed.js'
import 'swiper/css'
import './styles/style.scss'

gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText)

CustomEase.create('base', '0.075, 0.82, 0.165, 1')

document.body.classList.add('is-loading')
console.log('Welcome to Vite + JS + Webflow! 😍')

window.onload = () => {
  const lenis = new Lenis({
    lerp: 0.1,
  })
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

window.onresize = function () {
  location.reload()
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
      const heroSlider = new Swiper(slider, {
        modules: [Pagination, EffectFade, Autoplay],
        spaceBetween: 2,
        slidesPerView: 1,
        loop: true,
        centeredSlides: true,
        autoplay: {
          delay: 500,
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

      heroSlider.autoplay.start()
      heroSlider.init()
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

    const mediaItems = gsap.utils.toArray('.media-item')
    gsap.set('.black-image', {
      scale: 1.5,
    })
    gsap.set('.message', {
      opacity: 0,
      scale: 0.9,
      y: '1rem',
    })
    const blackBottomTimeline = gsap.timeline({
      defaults: {
        ease: 'base',
      },
      scrollTrigger: {
        trigger: '.media-wrapper',
        scrub: true,
        pin: true,
        snap: {
          snapTo: 'labelsDirectional',
          duration: 1,
          delay: 0.5,
          ease: 'base',
        },
        start: 'top top',
        pinnedContainer: '.media-wrapper',
        pinReparent: true,
        pinSpacer: true,
        pinSpacing:
          document.querySelector('.media-item').offsetWidth * mediaItems.length,
        end: () =>
          '+=' +
          document.querySelector('.media-item').offsetWidth *
            (mediaItems.length - 1),
      },
    })

    const blackBottomTimeline1 = gsap.timeline({
      defaults: {
        ease: 'base',
      },
      scrollTrigger: {
        trigger: '.black-bottom',
        start: 'top bottom',
        end: 'bottom center',
        scrub: 1,
      },
    })

    const blackBtoomTitle = new SplitText('.black-bottom h3', { type: 'lines' })
    blackBottomTimeline1
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
          ease: 'base',
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
          ease: 'base',
          scrollTrigger: {
            trigger: '.black-bottom',
            top: 'top 90%',
          },
        },
        '-=2'
      )

    blackBottomTimeline.fromTo(
      mediaItems,
      {
        opacity: 0,
        scale: 0.5,
        y: '3rem',
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 2,
        ease: 'base',
      },
      '-=2'
    )

    let index = 1
    mediaItems.forEach((item) => {
      blackBottomTimeline.add(
        gsap.to(
          mediaItems,
          {
            xPercent: -100 * (index - 1),
            duration: 3,
            ease: 'base',
            onStart: () => {
              gsap.fromTo(
                item.querySelectorAll('.message'),
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
                  duration: 0.35,
                  stagger: 0.2,
                  delay: 0.5,
                  ease: 'base',
                }
              )
            },
            onReverseComplete: () => {
              gsap.fromTo(
                item.querySelector('.black-image'),
                {
                  scale: 1,
                },
                {
                  scale: 1.1,
                  duration: 3,
                }
              )
              gsap.fromTo(
                item.querySelectorAll('.message'),
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotate: '0deg',
                },
                {
                  y: '1rem',
                  opacity: 0,
                  scale: 0.9,
                  rotate: '3deg',
                  duration: 0.25,
                  stagger: 0.2,
                  delay: 0.5,
                  ease: 'base',
                }
              )
            },
          },
          'label'
        )
      )
      index++
    })

    blackBottomTimeline.add(
      gsap.fromTo(
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
        '<'
      )
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
        duration: 2,
        stagger: 0.1,
        delay: 0.5,
        ease: 'base',
        scrollTrigger: {
          trigger: '.cards',
          start: 'top 80%',
          scrub: 1,
          end: 'bottom center',
        },
      }
    )

    gsap.fromTo(
      '.card',
      {
        opacity: 0,
        scale: 0.7,
        y: '3rem',
      },
      {
        opacity: 1,
        y: '0rem',
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'base',
        delay: 0.5,
        scrollTrigger: {
          trigger: '.card-col',
          start: 'top 80%',
          scrub: 3,
          end: 'bottom center',
        },
      }
    )

    // Icons Section
    // ---------------------------------------

    const iconsTitle = new SplitText('.icons-texts h2', { type: 'lines' })

    let iconsTexts = gsap.utils.toArray(['.icons-texts a'])
    iconsTexts.unshift(iconsTitle.lines)

    const iconsTimeline = gsap.timeline({
      defaults: {
        ease: 'power2',
      },
      scrollTrigger: {
        trigger: '.icons',
        pin: true,
        scrub: 2,
        snap: 1 / 3,
        end: () => '+=' + document.querySelector('.cards').offsetHeight * 1.2,
      },
    })

    gsap.set('.icon', { opacity: 0 })
    gsap.set('.icon-featured', { opacity: 1 })
    gsap.set(iconsTexts, { opacity: 0 })
    gsap.set('.icon-bg', { opacity: 0 })
    gsap.set('.icon-text', { opacity: 0 })
    gsap.set('.icon-symbol', { opacity: 1 })

    iconsTimeline
      .fromTo(
        '.icon-featured',
        {
          scale: 0,
          opacity: 0,
          y: '50%',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
        },
        '<50%'
      )
      .fromTo(
        '.icons-vegnete',
        {
          opacity: 0.1,
          scale: 1.1,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 4,
          onComplete: () => {
            document.querySelector('.icon-featured').classList.add('done')
          },
        }
      )
      .fromTo(
        '.icons-rows',
        {
          scale: 2,
        },
        {
          scale: 1,
          duration: 2,
          stagger: 0.1,
        },
        '<30%'
      )
      .fromTo(
        '.row-primary .icon:not(.icon-featured)',
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: {
            each: 0.1,
            grid: 'auto',
            from: 'center',
          },
          onReverseComplete: () => {
            document.querySelector('.icon-featured').classList.remove('done')
          },
        }
      )
      .fromTo(
        '.row-secondary .icon',
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: {
            each: 0.1,
            grid: 'auto',
            from: 'center',
          },
          delay: 0.1,
        }
      )
      .fromTo(
        iconsTexts,
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
        '.row-primary',
        {
          x: 0,
          opacity: 1,
        },
        {
          x: '-10%',
          duration: 8,
          delay: 0.1,
          opacity: 0,
          ease: 'power2',
        },
        '<'
      )
      .fromTo(
        '.row-secondary',
        {
          x: 0,
          opacity: 1,
        },
        {
          x: '10%',
          opacity: 0,
          duration: 8,
          stagger: 0.1,
          delay: 0.1,
          ease: 'power2',
        },
        '<'
      )

    // Black Bottom Section
    // ---------------------------------------

    const reasonTitle = new SplitText('.reason h2', { type: 'lines' })

    let reasonElements = gsap.utils.toArray(['.reason-p'])

    reasonElements.unshift(reasonTitle.lines)

    const reasonTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.reason',
        start: 'top center',
        end: 'bottom center',
        scrub: 3,
      },
    })

    reasonTimeline
      .fromTo(
        reasonElements,
        {
          opacity: 0,
          y: '3rem',
        },
        {
          opacity: 1,
          y: '0rem',
          duration: 2,
          stagger: 0.1,
          delay: 0.5,
          ease: 'base',
        }
      )
      .fromTo(
        '.reason-block',
        {
          opacity: 0,
          scale: 0.7,
          y: '3rem',
        },
        {
          opacity: 1,
          y: '0rem',
          scale: 1,
          duration: 2,
          stagger: 0.2,
          ease: 'base',
        },
        '-=2'
      )

    // Mockup Section
    // ---------------------------------------

    const howTimeline = gsap.timeline({
      defaults: {
        ease: 'base',
      },
      scrollTrigger: {
        trigger: '.how',
        pin: true,
        scrub: true,
        snap: {
          snapTo: 'labels',
          duration: 0.5,
          ease: 'base',
        },
        start: 'top top',
        pinnedContainer: '.how',
        pinSpacer: true,
        pinSpacing: document.querySelector('.how-item').offsetWidth * 1.5,
        end: () => '+=' + document.querySelector('.how-item').offsetWidth * 5,
      },
    })

    howTimeline.fromTo(
      '.how h2',
      {
        opacity: 0,
        y: '3rem',
      },
      {
        opacity: 1,
        y: '0rem',
        duration: 2,
        stagger: 0.1,
      }
    )

    gsap.set('.how-works', {
      opacity: 0,
      scale: 0.9,
      y: '5%',
    })

    gsap.set('.how-mockup', {
      opacity: 0,
      scale: 0.9,
      y: '5%',
    })
    let index2 = 1
    const howItems = document.querySelectorAll('.how-item')
    howItems.forEach((item) => {
      howTimeline.add(
        gsap.to(
          howItems,
          {
            xPercent: -100 * (index2 - 1),
            duration: 3,
            ease: 'base',
            onStart: () => {
              gsap.fromTo(
                item.querySelectorAll('.how-works'),
                {
                  x: '5%',
                  opacity: 0,
                  scale: 0.9,
                },
                {
                  x: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.35,
                  delay: 0.25,
                  ease: 'base',
                }
              )

              gsap.fromTo(
                item.querySelectorAll('.how-mockup'),
                {
                  y: '5%',
                  opacity: 0,
                  scale: 0.9,
                },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.35,
                  stagger: 0.2,
                  delay: 0.5,
                  ease: 'base',
                }
              )
            },
            onReverseComplete: () => {
              gsap.fromTo(
                item.querySelectorAll('.how-works'),
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                },
                {
                  y: '5%',
                  opacity: 0,
                  scale: 0.0,
                  duration: 0.35,
                  delay: 0.5,
                  ease: 'base',
                }
              )

              gsap.fromTo(
                item.querySelectorAll('.how-mockup'),
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                },
                {
                  y: '5%',
                  opacity: 0,
                  scale: 0.9,
                  duration: 0.35,
                  stagger: 0.2,
                  delay: 0.25,
                  ease: 'base',
                }
              )
            },
          },
          'howLabel'
        )
      )
      index2++
    })

    // Reviews Section
    // ---------------------------------------

    const reviewsTimeline = gsap.timeline({
      defaults: {
        ease: 'base',
      },
      scrollTrigger: {
        trigger: '.reviews',
        pin: true,
        scrub: true,
        snap: {
          snapTo: '.reviews',
          duration: 0.5,
          ease: 'base',
        },
        start: 'top top',
        pinnedContainer: '.reviews',
        pinSpacer: true,
        pinSpacing: document.querySelector('.review-item').offsetWidth * 1.5,
        end: () =>
          '+=' + document.querySelector('.review-item').offsetWidth * 5,
      },
    })

    const reviewsTitle = new SplitText('.reviews h2', { type: 'lines' })

    let reviewsElements = gsap.utils.toArray([
      '.reviews-h',
      '.rating-total-top',
    ])

    reviewsElements.unshift(reviewsTitle.lines)
    const review = document.querySelector('.review-item')
    const reviewItems = document.querySelectorAll('.review-item')
    const reviewWrapper = document.querySelector('.reviews-row')
    const reviewsWidth =
      (review.offsetWidth * reviewItems.length - reviewWrapper.offsetWidth) * -1
    console.log(reviewsWidth)
    console.log(review.offsetWidth)

    reviewsTimeline
      .fromTo(
        reviewsElements,
        {
          opacity: 0,
          y: '3rem',
        },
        {
          opacity: 1,
          y: '0rem',
          duration: 2,
          stagger: 0.1,
          ScrollTrigger: {
            trigger: '.review',
            scrub: true,
          },
        }
      )
      .fromTo(
        '.review',
        {
          opacity: 0,
          y: '3rem',
        },
        {
          opacity: 1,
          y: '0rem',
          duration: 2,
          stagger: 0.1,
          ScrollTrigger: {
            trigger: '.review',
          },
        }
      )
      .fromTo(
        '.review-wrapper',
        {
          x: 0,
        },
        {
          x: reviewsWidth,
          duration: 6,
        }
      )

    // Last Section
    // ---------------------------------------
    gsap.set('.cta', {
      backgroundColor: 'transparent',
    })

    const ctaTitle = new SplitText('.cta h2', { type: 'lines' })

    let ctaElements = gsap.utils.toArray(['.cta a'])

    ctaElements.unshift(ctaTitle.lines)

    const ctaTimeline = gsap.timeline({
      defaults: {
        ease: 'base',
      },
      scrollTrigger: {
        trigger: '.cta',
        scrub: 10,
        start: 'top 70%',
      },
    })

    ctaTimeline
      .fromTo(
        '.cta-logo',
        {
          scale: 6,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
        }
      )
      .fromTo(
        ctaElements,
        {
          opacity: 0,
          y: '3rem',
        },
        {
          opacity: 1,
          y: '0rem',
          duration: 2,
          stagger: 0.1,
        }
      )
      .fromTo(
        '.cta',
        {
          backgroundColor: 'transparent',
        },
        {
          backgroundColor: '#333',
          duration: 4,
        }
      )
  }
}
