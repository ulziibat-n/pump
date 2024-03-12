import hero from './features/hero'
import viewportDetect from './features/viewportDetect'
import './styles/style.scss'

document.body.classList.add('is-loading')
console.log('Welcome to Vite + JS + Webflow!')

document.addEventListener('DOMContentLoaded', () => {
  Splitting()
  viewportDetect()
  hero()
  document.body.classList.remove('is-loading')
  document.body.classList.add('is-loaded')
})
