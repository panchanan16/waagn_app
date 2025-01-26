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
    <label class="
    label-location" style="display: flex;"><span>location</span> <span class="material-icons" onclick="closeField(this)">close</span></label>
    <textarea></textarea>
    </div>  `
    form.innerHTML += htmlField
}

function closeField(target) {
    target.parentNode.parentNode.remove()
}

function cancelFilter() {
    closePopup('filter-box')
}

function changeStatus(target) {
    console.log(target.classList)
    if (target.value === 'Active') {
        target.classList.remove('status-red')
        target.classList.add('status-green')
    } else {
        target.classList.remove('status-green')
        target.classList.add('status-red')
    }
}


function searchItems(target, searchId) {
    const items = document.querySelectorAll(`.${searchId}`)
    const query = target.value.toLowerCase(); 
    for (let i = 0; i < items.length; i++) {
      const itemText = items[i].textContent.toLowerCase(); 
      
      if (itemText.includes(query)) {
        items[i].style.display = 'list-item';
      } else {
        items[i].style.display = 'none';
      }
    }
  }