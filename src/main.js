import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { CustomEase, ScrollTrigger, SplitText, Flip } from 'gsap/all'
import Swiper from 'swiper'
import { Pagination, EffectFade, Autoplay } from 'swiper/modules'
import Typed from 'typed.js'
import './styles/style.scss'

document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText, Flip)

  CustomEase.create('base', '0.075, 0.82, 0.165, 1')

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

  document.body.classList.add('is-loading')
  document.body.classList.remove('is-loading')
  document.body.classList.add('is-loaded')
  console.log('Site Loaded ✅')
  runHome()
  runAbout()
  runReview()
  runCta()
  console.log('Sections Initialized ✅')

  // Store the window width
  var windowWidth = window.innerWidth

  // Resize Event
  window.addEventListener('resize', function () {
    // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
    if (window.innerWidth != windowWidth) {
      windowWidth = window.innerWidth
      location.reload()
    }
  })
})

function runHome() {
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
      const sliderItems = document.querySelectorAll(
        '.slider-visible-right .slider-item'
      )
      const heroTimeline = gsap.timeline({
        defaults: {
          ease: 'base',
        },
      })

      heroElements = gsap.utils.toArray(heroElements)
      heroElements.unshift(heroTitle.lines)

      // Get the element from the DOM
      const slider = document.querySelector('.slider')

      // If it exists, play the aniamtion
      const paginationEl = document.createElement('div')
      paginationEl.classList.add('swiper-pagination')
      paginationEl.classList.add('hero-pagination')
      slider.appendChild(paginationEl)
      const heroSlider = new Swiper(slider, {
        modules: [Pagination, EffectFade, Autoplay],
        spaceBetween: 2,
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        pagination: {
          el: paginationEl,
          clickable: true,
        },
      })
      heroSlider.init()

      gsap.set('.hero-images .swiper', {
        opacity: 0,
        y: '1rem',
      })

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
            duration: 1,
            onComplete: () => {
              new Typed('#heroTyped1', {
                strings: [
                  'Bonjour, je suis Pump votre coach financier qui vous aide à muscler vos finances.',
                ],
                typeSpeed: 15,
                loop: false,
                fadeOut: true,
                showCursor: false,
                fadeOutClass: 'typed-fade-out',
                fadeOutDelay: 500,
                onComplete: () => {
                  new Typed('#heroTyped2', {
                    strings: [
                      'Comme pour le sport, fixons des objectifs à atteindre :',
                    ],
                    typeSpeed: 15,
                    showCursor: true,
                    loop: false,
                    fadeOut: true,
                    fadeOutClass: 'typed-fade-out',
                    fadeOutDelay: 500,
                    onComplete: () => {
                      gsap.fromTo(
                        '.hero-images .swiper',
                        {
                          opacity: 0,
                          y: '1rem',
                        },
                        {
                          opacity: 1,
                          y: '0rem',
                          delay: 0,
                          duration: 2,
                        }
                      )
                    },
                  })
                },
              })
            },
          },
          '-=1'
        )
      console.log('total:' + sliderItems.length)
      const longWidth =
        document.querySelector('.slider-visible-right .slider-item')
          .offsetWidth * sliderItems.length
      gsap.set('.slider-visible-right .slider-list', {
        width: longWidth,
      })
      gsap.set('.slider-visible-left .slider-list', {
        width: longWidth,
      })

      const heroTimeline2 = gsap.timeline({
        defaults: {
          ease: 'linear',
        },
        onComplete: () => {
          heroSlider.slideTo(sliderItems.length)
          console.log('hey')
        },
        onReverseComplete: () => {
          heroSlider.slideTo(0)
        },
        scrollTrigger: {
          trigger: '.hero',
          snap: {
            snapTo: 'labels',
            duration: 0,
            ease: 'linear',
          },
          start: 'bottom bottom',
          pin: true,
          scrub: true,
          pinReparent: true,
          pinSpacer: true,
          pinnedContainer: '.hero',
          pinSpacing:
            document.querySelector('.slider-visible-left .slider-item')
              .offsetWidth * sliderItems.length,
          end: () =>
            '+=' +
            document.querySelector('.slider-visible-left .slider-item')
              .offsetWidth *
              sliderItems.length,
        },
      })

      heroTimeline2.fromTo(
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
          duration: 0.5,
          stagger: {
            each: 0.1,
            from: 'center',
          },
        },
        '-=1.5'
      )

      sliderItems.forEach((item, index) => {
        heroTimeline2.add(
          gsap.to('.slider-visible-right .slider-list', {
            x:
              0 -
              document.querySelector('.slider-visible-left .slider-item')
                .offsetWidth *
                (index + 1),
            duration: 1,
            onComplete: () => {
              console.log('next')
              heroSlider.slideTo(index + 1)
            },
            onReverseComplete: () => {
              console.log('prev')
              heroSlider.slideTo(index + 1)
            },
          })
        )
        heroTimeline2.add(
          gsap.to('.slider-visible-left .slider-list', {
            x:
              0 +
              document.querySelector('.slider-visible-left .slider-item')
                .offsetWidth *
                (index + 1),
            duration: 1,
          }),
          '-=100%'
        )
        heroTimeline2.addLabel('labelSlider')
      })
    }
  }
  const blackTopSection = document.querySelector('.black-top')
  if (blackTopSection) {
    // Black Top Section
    // ---------------------------------------
    gsap.set('.section-black', {
      width: window.innerWidth,
    })
    new Typed('.typed-text', {
      strings: [
        'Comment épargner intelligemment ?',
        'Quels conseils pour commencer à investir ?',
        'Comment créer un patrimoine diversifié et solide',
        'Comment créer un programme d’investissement adapté à ma situation perso ?',
        'Comment me prévoir une super retraite ?',
        'Comment optimiser ma rémunération de dirigeant ?',
        'Est-il possible de transmettre mon patrimoine à moindre coût ?',
        "Est-il possible d'anticiper la cession de mon entreprise ?",
        'Quels objectifs financiers me fixer ?',
        'Comment me créer des revenus complémentaires nets de fiscalité ?',
        'Comment réduire mes impôts ?',
      ],
      typeSpeed: 50,
      backDelay: 1400,
      loop: true,
      loopCount: Infinity,
      showCursor: false,
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
  }

  const blackBottom = document.querySelector('.black-bottom')
  if (blackBottom) {
    // Black Bottom Section
    // ---------------------------------------

    const mediaItems = gsap.utils.toArray('.media-item')
    gsap.set('.message', {
      opacity: 0,
      scale: 0.9,
      y: '1rem',
    })
    const blackBottomTimeline = gsap.timeline({
      defaults: {
        ease: 'linear',
      },
      scrollTrigger: {
        trigger: '.media-wrapper',
        scrub: 1,
        pin: true,
        snap: {
          snapTo: 'labels',
          duration: 1,
          ease: 'linear',
        },
        start: 'center center',
        pinSpacer: true,
        pinnedContainer: '.media-wrapper',
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
        start: 'top 90%',
        end: 'top 20%',
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
  }

  const cardsSection = document.querySelector('.cards')
  if (cardsSection) {
    console.log('cards')
    // Cards
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
        onComplete: () => {
          console.log('cardsyes')
        },
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
  }

  const iconsSection = document.querySelector('.icons-section')
  if (iconsSection) {
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
        trigger: '.icons-section',
        pin: true,
        scrub: true,
        snap: true,
        pinnedContainer: '.icons-section',
        pinSpacer: true,
        pinSpacing: document.querySelector('.icons-section').offsetHeight * 5,
        start: 'top top',
        end: () =>
          '+=' + document.querySelector('.icons-section').offsetHeight * 3,
      },
    })

    gsap.set('.icon', { opacity: 0 })
    gsap.set('.icon-featured', { opacity: 1 })
    gsap.set(iconsTexts, { opacity: 0 })

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
        '.icons-rows',
        {
          scale: 2,
        },
        {
          scale: 1,
          duration: 2,
          stagger: 0.1,
          onComplete: () => {
            document.querySelector('.icon-featured').classList.add('done')
          },
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
        '.icons-vegnete',
        {
          opacity: 0.1,
          scale: 1.1,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 4,
          delay: 2,
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
  }

  const reasonSection = document.querySelector('.reason')
  if (reasonSection) {
    // Reason
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
  }

  const how = document.querySelector('.how')
  if (how) {
    // Mockup Section
    // ---------------------------------------

    let howMatchMedia = gsap.matchMedia()

    howMatchMedia.add('(min-width: 769px)', () => {
      gsap.set('.how-step', {
        opacity: 0,
      })
      const howTimeline = gsap.timeline({
        defaults: {
          ease: 'base',
        },
        scrollTrigger: {
          trigger: '.how',
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 'labels',
            ease: 'linear',
          },
          start: 'top venter',
          pinnedContainer: '.how-flex',
          pinSpacer: true,
          pinSpacing: document.querySelector('.how').offsetHeight * 5,
          end: () => '+=' + document.querySelector('.how').offsetHeight * 5,
        },
      })

      howTimeline
        .fromTo(
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
        .fromTo(
          '.how-mockup',
          {
            opacity: 0,
            scale: 1.5,
            y: '100%',
          },
          {
            opacity: 1,
            scale: 1.2,
            y: '10%',
            duration: 8,
            ease: 'base',
          }
        )
        .fromTo(
          '.how-step-1',
          {
            opacity: 0,
            y: '3rem',
            height: 0,
          },
          {
            opacity: 1,
            y: 0,
            height: 'auto',
            duration: 2,
            ease: 'base',
            onStart: () => {
              document.querySelector('.how-step-1').classList.add('active')
            },
            onReverseComplete: () => {
              document.querySelector('.how-step-1').classList.remove('active')
            },
          },
          '-=4'
        )
        .addLabel('step1')
        .fromTo(
          '.how-step-1',
          {
            opacity: 1,
            y: 0,
            height: 'auto',
          },
          {
            opacity: 0,
            y: '-3rem',
            height: 0,
            duration: 2,
            ease: 'base',
            onStart: () => {
              document.querySelector('.how-step-1').classList.remove('active')
            },
            onReverseComplete: () => {
              document.querySelector('.how-step-1').classList.add('active')
            },
          }
        )
        .fromTo(
          '.how-mockup',
          {
            scale: 1.2,
            y: '10%',
          },
          {
            scale: 1,
            y: 0,
            duration: 4,
            ease: 'base',
          },
          '-=2'
        )
        .fromTo(
          '.how-step-2',
          {
            opacity: 0,
            y: '3rem',
            height: 0,
          },
          {
            opacity: 1,
            y: '0',
            height: 'auto',
            duration: 2,
            ease: 'base',
            onStart: () => {
              document.querySelector('.how-step-2').classList.add('active')
            },
            onReverseComplete: () => {
              document.querySelector('.how-step-2').classList.remove('active')
            },
          },
          '-=4'
        )
        .addLabel('step2')
        .fromTo(
          '.how-step-2',
          {
            opacity: 1,
            y: 0,
            height: 'auto',
          },
          {
            opacity: 0,
            y: '-3rem',
            height: 0,
            duration: 2,
            ease: 'base',
            onStart: () => {
              document.querySelector('.how-step-2').classList.remove('active')
              document.querySelector('.how-step-3').classList.add('active')
            },
            onReverseComplete: () => {
              document.querySelector('.how-step-2').classList.add('active')
              document.querySelector('.how-step-3').classList.remove('active')
            },
            onComplete: () => {
              const state = Flip.getState(
                gsap.utils.toArray('.how-works, .how-mockup')
              )
              // Make DOM or styling changes (swap the squares in our case)
              swap(gsap.utils.toArray('.how-works, .how-mockup'))
              // Animate from the initial state to the end state
              Flip.from(state, {
                duration: 1,
                ease: 'base',
                onStart: () => {
                  gsap.to('.how-mockup', {
                    rotate: '3deg',
                    ease: 'back.out(1.7)',
                  })
                },
                onComplete: () => {
                  gsap.to('.how-mockup', {
                    rotate: '0deg',
                    ease: 'back.out(1.7)',
                  })
                },
              })
            },
          }
        )
        .fromTo(
          '.how-step-3',
          {
            y: '3rem',
            opacity: 0,
            height: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 3,
            height: 'auto',
            delay: 3,
            onReverseComplete: () => {
              const state = Flip.getState(
                gsap.utils.toArray('.how-works, .how-mockup')
              )
              // Make DOM or styling changes (swap the squares in our case)
              swap(gsap.utils.toArray('.how-works, .how-mockup'))
              // Animate from the initial state to the end state
              Flip.from(state, { duration: 2, ease: 'base' })
            },
          }
        )
        .addLabel('step3')
    })
  }
}

function runAbout() {
  const aboutHero = document.querySelector('.about-hero')
  if (aboutHero) {
    const aboutHeroTimeline = gsap.timeline({
      defaults: {
        ease: 'base',
      },
      scrollTrigger: {
        trigger: '.about-hero',
      },
    })

    gsap.set('.about-logo', { opacity: 0, scale: 2.5, y: '4rem' })

    const aboutHeroTitle = new SplitText('.about-h1', { type: 'lines' })
    gsap.set(aboutHeroTitle.lines, { opacity: 0, y: '3rem' })
    aboutHeroTimeline
      .fromTo(
        '.about-logo',
        {
          opacity: 0,
          scale: 2.5,
          y: '4rem',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 2,
          delay: 0.5,
        }
      )
      .fromTo(
        aboutHeroTitle.lines,
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
  }

  const aboutUsText = document.querySelector('.about-us-text')
  if (aboutUsText) {
    const aboutUsTextItems = gsap.utils.toArray('.about-h2, .about-us-p')
    gsap.set(aboutUsTextItems, { opacity: 0, y: '4rem' })

    gsap.fromTo(
      aboutUsTextItems,
      {
        opacity: 0,
        y: '4rem',
      },
      {
        opacity: 1,
        y: '0rem',
        duration: 2,
        stagger: 0.1,
        delay: 0.1,
        ease: 'base',
        scrollTrigger: {
          trigger: '.about-us-text',
          start: 'top center',
        },
      }
    )
  }

  const aboutImage = document.querySelector('.about-us-image')
  if (aboutImage) {
    gsap.set('.about-us-image .message', {
      opacity: 0,
      y: '1rem',
    })

    const aboutMessages = gsap.utils.toArray('.about-us-image .message')

    gsap.fromTo(
      aboutImage,
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
        onStart: () => {
          gsap.fromTo(
            aboutMessages,
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
            aboutMessages,
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
              duration: 0.35,
              stagger: 0.2,
              ease: 'base',
            }
          )
        },
        scrollTrigger: {
          trigger: '.about-image-pin',
          start: 'center center',
          scrub: 2,
          pin: true,
          pinSpacer: true,
          pinnedContainer: '.about-image-pin',
          end: () => '+=' + aboutImage.offsetHeight * 1,
        },
      }
    )
  }

  const philosophie = document.querySelector('.philosophie')
  if (philosophie) {
    const philosophieItems = gsap.utils.toArray(
      '.philosophie-h2, .philosophie-p'
    )
    gsap.set(philosophieItems, { opacity: 0, y: '4rem' })
    gsap.fromTo(
      philosophieItems,
      {
        opacity: 0,
        y: '4rem',
      },
      {
        opacity: 1,
        y: '0rem',
        duration: 2,
        stagger: 0.2,
        delay: 0.1,
        ease: 'base',
        scrollTrigger: {
          trigger: '.philosophie',
          start: 'top center',
        },
      }
    )

    gsap.fromTo(
      '.p1-bg',
      {
        bottom: '-40%',
        opacity: 0,
      },
      {
        bottom: '30%',
        opacity: 1,
        ease: 'linear',
        scrollTrigger: {
          trigger: '.philosophie',
          start: 'top bottom',
          end: 'bottom center',
          scrub: 12,
        },
      }
    )

    gsap.set('.p2-bg', { top: 'auto' })
    gsap.fromTo(
      '.p2-bg',
      {
        bottom: '-50%',
        opacity: 0,
      },
      {
        bottom: '60%',
        opacity: 1,
        ease: 'linear',
        scrollTrigger: {
          trigger: '.philosophie',
          start: 'top bottom',
          end: 'bottom center',
          scrub: 6,
        },
      }
    )
  }
}

function runReview() {
  const reviewSection = document.querySelector('.reviews')
  if (reviewSection) {
    // Reviews Section
    // ---------------------------------------

    const reviewsTimeline = gsap.timeline({
      defaults: {
        ease: 'base',
      },
      scrollTrigger: {
        trigger: '.reviews',
        pin: true,
        scrub: 2,
        snap: 1 / 3,
        start: 'top top',
        pinnedContainer: '.reviews',
        pinReparent: true,
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
        }
      )
      .fromTo(
        '.review-wrapper',
        {
          x: 0,
        },
        {
          x: reviewsWidth,
          duration: 16,
          ease: 'linear',
        }
      )
  }
}

function runCta() {
  const cta = document.querySelector('.cta')
  if (cta) {
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
          onStart: () => {
            gsap.fromTo(
              '.cta',
              {
                backgroundColor: 'rgba(51, 51, 51, 0)',
              },
              {
                backgroundColor: 'rgba(51, 51, 51, 1)',
                duration: 3,
                delay: 2,
              }
            )
          },
          onReverseComplete: () => {
            gsap.fromTo(
              '.cta',
              {
                backgroundColor: 'rgba(51, 51, 51, 1)',
              },
              {
                backgroundColor: 'rgba(51, 51, 51, 0)',
                duration: 2,
              }
            )
          },
        }
      )
  }
}

function swap([a, b]) {
  a.parentNode.children[0] === a
    ? a.parentNode.appendChild(a)
    : a.parentNode.appendChild(b)
}
