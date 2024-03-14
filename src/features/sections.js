import gsap from 'gsap'
import { CustomEase, ScrollTrigger } from 'gsap/all'
import Splitting from 'splitting'

gsap.registerPlugin(CustomEase, ScrollTrigger)

CustomEase.create('base', '0.075, 0.82, 0.165, 1')

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
          y: '4rem',
        },
        {
          opacity: 1,
          y: '0rem',
          duration: 1,
          ease: 'base',
          stagger: 0.1,
        }
      )
    }
  }
}

export default runSections
