gsap.registerPlugin(ScrollTrigger)
function viewportDetect() {
  const inViews = document.querySelectorAll('[data-inview]')

  if (inViews) {
    Array.from(inViews).forEach((inViewElement) => {
      let start = 'top center'
      let end = 'bottom center'
      if (
        inViewElement.hasAttribute('data-inview-start') &&
        inViewElement.dataset.inviewStart
      ) {
        start = inViewElement.dataset.inviewStart
      }

      if (
        inViewElement.hasAttribute('data-inview-end') &&
        inViewElement.dataset.inviewEnd
      ) {
        end = inViewElement.dataset.inviewEnd
      }
      if (inViewElement.dataset.inview === 'once') {
        ScrollTrigger.create({
          trigger: inViewElement,
          once: true,
          start: start,
          onEnter: (self) => {
            self.trigger.classList.add('is-inview')
          },
        })
      } else if (inViewElement.dataset.inview === 'repeat') {
        ScrollTrigger.create({
          trigger: inViewElement,
          start: start,
          end: end,
          onEnter: (self) => {
            self.trigger.classList.add('is-inview')
          },
          onLeave: (self) => {
            self.trigger.classList.remove('is-inview')
          },
        })
      }
    })
  }
}

export default viewportDetect
