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
    const duration = 10
    const sectionIncrement = duration / (mediaItems.length - 1)
    const blackBottomTimeline = gsap.timeline({
      defaults: {
        ease: 'base',
      },
      scrollTrigger: {
        trigger: '.black-bottom',
        scrub: true,
        pin: true,
        snap: {
          snapTo: 1 / (mediaItems.length - 1),
          duration: 2,
          directional: true,
          ease: 'linear',
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

    mediaItems.forEach((section, index) => {
      let tween = gsap.from(section, {
        opacity: 0,
        scale: 0.6,
        duration: 1,
        force3D: true,
        paused: true,
      })
      addSectionCallbacks(blackBottomTimeline, {
        start: sectionIncrement * (index - 0.99),
        end: sectionIncrement * (index + 0.99),
        onEnter: () => tween.play(),
        onLeave: () => tween.reverse(),
        onEnterBack: () => tween.play(),
        onLeaveBack: () => tween.reverse(),
      })
      index || tween.progress(1) // the first tween should be at its end (already faded/scaled in)
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
        },
        '-=2'
      )
      .to(
        mediaItems,
        {
          xPercent: -100 * (mediaItems.length - 1),
          duration: duration,
          ease: 'none',
          onStart: () => {
            console.log(this)
          },
        },
        'HSS'
      )
      // .fromTo(
      //   '.black-media .black-image',
      //   {
      //     scale: 1.5,
      //   },
      //   {
      //     scale: 1,
      //     duration: 3,
      //     stagger: 0.1,
      //     delay: 0.1,
      //   },
      //   '-=2'
      // )
      // .fromTo(
      //   '.message',
      //   {
      //     y: '1rem',
      //     opacity: 0,
      //     scale: 0.9,
      //     rotate: '3deg',
      //   },
      //   {
      //     y: 0,
      //     opacity: 1,
      //     scale: 1,
      //     rotate: '0deg',
      //     duration: 1,
      //     stagger: 0.2,
      //     delay: 0.5,
      //   },
      //   '-=2'
      // )
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
        duration: 2,
        stagger: 0.1,
        delay: 0.5,
        ease: 'base',
        scrollTrigger: {
          trigger: '.cards',
          start: 'top 80%',
          end: 'top center',
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
        scrollTrigger: {
          trigger: '.card-col',
          start: 'top 80%',
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
            delay: 0.5,
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
            delay: 0.5,
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

function addSectionCallbacks(
  timeline,
  { start, end, param, onEnter, onLeave, onEnterBack, onLeaveBack }
) {
  let trackDirection = (animation) => {
      // just adds a "direction" property to the animation that tracks the moment-by-moment playback direction (1 = forward, -1 = backward)
      let onUpdate = animation.eventCallback('onUpdate'), // in case it already has an onUpdate
        prevTime = animation.time()
      animation.direction = animation.reversed() ? -1 : 1
      animation.eventCallback('onUpdate', () => {
        let time = animation.time()
        if (prevTime !== time) {
          animation.direction = time < prevTime ? -1 : 1
          prevTime = time
        }
        onUpdate && onUpdate.call(animation)
      })
    },
    empty = (v) => v // in case one of the callbacks isn't defined
  timeline.direction || trackDirection(timeline) // make sure direction tracking is enabled on the timeline
  start >= 0 &&
    timeline.add(
      () => ((timeline.direction < 0 ? onLeaveBack : onEnter) || empty)(param),
      start
    )
  end <= timeline.duration() &&
    timeline.add(
      () => ((timeline.direction < 0 ? onEnterBack : onLeave) || empty)(param),
      end
    )
}
