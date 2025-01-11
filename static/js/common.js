console.log('connected js')

function openPopup(className) {
    document.querySelector(`.${className}`).classList.remove('hide')
}

function closePopup(className) {
    document.querySelector(`.${className}`).classList.add('hide')
}