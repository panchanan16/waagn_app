console.log('connected js')

function openPopup(className) {
    document.querySelector(`.${className}`).classList.remove('hide')
}

function closePopup(className) {
    document.querySelector(`.${className}`).classList.add('hide')
}


function addNewField(formId) {
    const form = document.getElementById(formId)
    const htmlField = `<div class="form-group">
                    <label>location</label>
                    <textarea></textarea>
                </div>`
    form.innerHTML += htmlField
}