const menuBtn = document.querySelector('.menu-btn')
const closeBtn = document.querySelector('.close-btn')
const navLinks = document.querySelector('.nav-links')
const cvBtn = document.querySelectorAll('[data-cv]')
const projectImg = document.querySelectorAll('.project-img')
const left = document.querySelector('.fa-circle-arrow-left')
const right = document.querySelector('.fa-circle-arrow-right')
const num = document.querySelector('.num')

// Functions
// Pie chart
const bakePie = () => {
  let allPies = document.querySelectorAll('.pie')
  allPies.forEach((pie) => {
    let gradientStart = 0
    let cssGradientString = ''
    let slices = pie.dataset.slices.split`,`.map((x) => +x)
    let slicesTotal = slices.reduce((a, b) => a + b, 0)
    let hue = pie.dataset.hue || 200
    let lightnessIncrement = 73 / slices.length
    slices.forEach((slice, index) => {
      let sliceWidth = (slice / slicesTotal) * 360
      let hsl = `hsl(${hue}, 38%, ${lightnessIncrement * index}%)`
      cssGradientString += `${hsl} ${gradientStart}deg ${
        gradientStart + sliceWidth
      }deg,`
      gradientStart += sliceWidth
    })
    cssGradientString = cssGradientString.slice(0, -1)
    pie.style.backgroundImage = `conic-gradient(${cssGradientString})`
  })
}

bakePie()

// Slider
let x = 1
const showProject = () => {
  for (let project of projectImg) {
    project.style.display = 'none'
  }
  if (x > projectImg.length) {
    x = 1
  }
  if (x < 1) {
    x = projectImg.length
  }
  projectImg[x - 1].style.display = 'block'
  projectImg[x - 1].classList.add('animate')
  num.innerHTML = `${x} / ${projectImg.length}`
}

showProject()

// Testimonial

let testimonial = document.getElementById('testimonial'),
  testimonialDots = Array.prototype.slice.call(
    document.getElementById('testimonial-dots').children
  ),
  testimonialContent = Array.prototype.slice.call(
    document.getElementById('testimonial-content').children
  ),
  testimonialLeftArrow = document.getElementById('left-arrow'),
  testimonialRightArrow = document.getElementById('right-arrow'),
  testimonialSpeed = 4500,
  currentSlide = 0,
  currentActive = 0,
  testimonialTimer,
  touchStartPos,
  touchEndPos,
  touchPosDiff,
  ignoreTouch = 30

window.onload = function () {
  function playSlide(slide) {
    for (let k = 0; k < testimonialDots.length; k++) {
      testimonialContent[k].classList.remove('active')
      testimonialContent[k].classList.remove('inactive')
      testimonialDots[k].classList.remove('active')
    }

    if (slide < 0) {
      slide = currentSlide = testimonialContent.length - 1
    }

    if (slide > testimonialContent.length - 1) {
      slide = currentSlide = 0
    }

    if (currentActive != currentSlide) {
      testimonialContent[currentActive].classList.add('inactive')
    }
    testimonialContent[slide].classList.add('active')
    testimonialDots[slide].classList.add('active')

    currentActive = currentSlide

    clearTimeout(testimonialTimer)
    testimonialTimer = setTimeout(function () {
      playSlide((currentSlide += 1))
    }, testimonialSpeed)
  }

  testimonialLeftArrow.addEventListener('click', function () {
    playSlide((currentSlide -= 1))
  })

  testimonialRightArrow.addEventListener('click', function () {
    playSlide((currentSlide += 1))
  })

  for (let l = 0; l < testimonialDots.length; l++) {
    testimonialDots[l].addEventListener('click', function () {
      playSlide((currentSlide = testimonialDots.indexOf(this)))
    })
  }

  playSlide(currentSlide)

  // keyboard shortcuts
  document.addEventListener('keyup', function (e) {
    switch (e.keyCode) {
      case 37:
        testimonialLeftArrow.click()
        break

      case 39:
        testimonialRightArrow.click()
        break

      case 39:
        testimonialRightArrow.click()
        break

      default:
        break
    }
  })

  testimonial.addEventListener('touchstart', function (e) {
    touchStartPos = e.changedTouches[0].clientX
  })

  testimonial.addEventListener('touchend', function (e) {
    touchEndPos = e.changedTouches[0].clientX

    touchPosDiff = touchStartPos - touchEndPos

    // console.log(touchPosDiff)
    // console.log(touchStartPos)
    // console.log(touchEndPos)

    if (touchPosDiff > 0 + ignoreTouch) {
      testimonialLeftArrow.click()
    } else if (touchPosDiff < 0 - ignoreTouch) {
      testimonialRightArrow.click()
    } else {
      return
    }
  })
}

// Event listener
cvBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    alert('Permission denied')
  })
})

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active')
})

closeBtn.addEventListener('click', () => {
  navLinks.classList.remove('active')
})

right.addEventListener('click', () => {
  x += 1
  showProject()
})
left.addEventListener('click', () => {
  x -= 1
  showProject()
})
