// header features
document.addEventListener('DOMContentLoaded', () => {

    const buttonP = document.querySelector('.account-circle')
    const modalP = document.querySelector('.profile')
    const buttonCloseP = document.querySelector('.profile-close')

    buttonP.addEventListener('click', () => {
        modalP.showModal()
    })

    buttonCloseP.addEventListener('click', () => {
        modalP.close()
    })

    const buttonS = document.querySelector('.sell-button')
    const modalS = document.querySelector('.sell')
    const buttonCloseS = document.querySelector('.sell-close')

    buttonS.addEventListener('click', () => {
        modalS.showModal()
    })

    buttonCloseS.addEventListener('click', () => {
        modalS.close()
    })

    const buttonF = document.querySelector('.filter')
    const modalF = document.querySelector('.filter-options')
    const buttonCloseF = document.querySelector('.filter-options-close')

    buttonF.addEventListener('click', () => {
        modalF.showModal()
    })

    buttonCloseF.addEventListener('click', () => {
        modalF.close()
    })
})

// car-page features
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('#carouselContainer')
    const nextBtn = document.querySelector('#nextBtn')
    const prevBtn = document.querySelector('#prevBtn')
    const fullscreenImg = document.querySelector('#fullscreenImg')
    const fullscreenImage = document.querySelector('#fullscreenImage')
    const closeBtn = document.querySelector('#closeFullscreen');

    let scrollAmount = 0;

    // scroll to the next image
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: window.innerWidth, // scroll the width of the viewport
            behavior: 'smooth'
        });
    });

    // scroll to the previous image
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -window.innerWidth, // scroll the width of the viewport in the opposite direction
            behavior: 'smooth'
        })
    })

    // fullscreen functionality
    document.querySelectorAll('.carousel-image').forEach(img => {
        img.addEventListener('click', function () {
            fullscreenImage.src = this.src
            fullscreenImg.style.display = 'flex'
        })
    })

    closeBtn.addEventListener('click', () => {
        fullscreenImg.style.display = 'none';
    })
})