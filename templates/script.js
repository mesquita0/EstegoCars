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

    const buttonEP = document.querySelector('.edit-button-profile')
    const modalEP = document.querySelector('.edit-profile')
    const buttonCloseEP = document.querySelector('.close-edits-profile')

    buttonEP.addEventListener('click', () => {
        modalEP.showModal()
        modalP.close()
    })

    buttonCloseEP.addEventListener('click', () => {
        modalEP.close()
    })

    const buttonEC = document.querySelector('.edit-button')
    const modalEC = document.querySelector('.edit-car')
    const buttonCloseEC = document.querySelector('.close-edits')

    buttonEC.addEventListener('click', () => {
        modalEC.showModal()
    })

    buttonCloseEC.addEventListener('click', () => {
        modalEC.close()
    })

    const buttonL = document.querySelector('.login-button')
    const modalL = document.querySelector('.login')
    const buttonCloseL = document.querySelector('.enter')

    buttonL.addEventListener('click', () => {
        modalL.showModal()
    })

    buttonCloseL.addEventListener('click', () => {
        modalL.close()
    })

    const buttonR = document.querySelector('.register-button')
    const modalR = document.querySelector('.register')
    const buttonCloseR = document.querySelector('.close-edits')

    buttonR.addEventListener('click', () => {
        modalR.showModal()
    })

    buttonCloseR.addEventListener('click', () => {
        modalR.close()
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