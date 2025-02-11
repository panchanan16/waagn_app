console.log("connected js");

function openPopup(className) {
  document.querySelector(`.${className}`).classList.remove("hide");
}

function closePopup(className, type, id, key, formid) {
  if (type == "form") {
    document.getElementById(id).dataset[key] = "";
    document.getElementById(formid).reset();
    document.querySelector(`.${className}`).classList.add("hide");
  } else {
    document.querySelector(`.${className}`).classList.add("hide");
  }
}

function addNewField(formId) {
  const form = document.getElementById(formId);
  const htmlField = `<div class="form-group">
    <label class="
    label-location" style="display: flex;"><span>location</span> <span class="material-icons" onclick="closeField(this)">close</span></label>
    <textarea></textarea>
    </div>  `;
  form.innerHTML += htmlField;
}

function closeField(target) {
  target.parentNode.parentNode.remove();
}

function cancelFilter() {
  closePopup("filter-box");
}

function changeStatus(target) {
  console.log(target.classList);
  if (target.value == 1 || target.value == 'delivered') {
    target.classList.remove("status-red");
    target.classList.add("status-green");
  } else {
    target.classList.remove("status-green");
    target.classList.add("status-red");
  }
}

function searchItems(target, searchIdOne) {
  const items = document.querySelectorAll(`.${searchIdOne}`);
  const query = target.value.toLowerCase();
  for (let i = 0; i < items.length; i++) {
    const itemText = items[i].textContent.toLowerCase();

    if (itemText.includes(query)) {
      items[i].style.display = "list-item";
    } else {
      items[i].style.display = "none";
    }
  }
}

function toggleAsideSubmenu(target) {
  const targetUl = target.parentNode.childNodes[3];
  targetUl.classList.toggle("hide");
  target.parentNode.querySelector(".arr-right").classList.toggle("hide");
  target.parentNode.querySelector(".arr-down").classList.toggle("hide");
}

function toggleFilterBox(target) {
    document.getElementById(target).classList.toggle('hide')
}

function prevent(e) {
  e.stopPropagation();
}

function searchItemsGlobal(target, className, value, removeId) {
  const items = Array.from(document.querySelectorAll(`.${className}`));
  const query = value ? value.toLowerCase() : target.value.toLowerCase();
  for (let i = 0; i < items.length; i++) {
    Array.from(items[i].childNodes).forEach((item) => {
      const itemText = items[i].textContent.toLowerCase() || items[i].innerText.toLowerCase();
      if (itemText.indexOf(query) > -1) {
        items[i].style.display = "table-row";
      } else {
        items[i].style.display = "none";
      }
    });
  }

  if (removeId) { document.getElementById(removeId).remove() }
}


async function logOutAdmin() {
    const response = await fetch('v1/auth/admin/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({user: 'admin'})
  })
    const json = await response.json()
    if (json.success) {
      window.location.href = location.origin + json.redirect;
  }
}

function renderSummary(values, status) {
  const target = Array.from(document.querySelector('.service-cards').getElementsByTagName('h3'))
  target.forEach((item)=> {
      values.forEach((valu)=> {
          if (valu[status] == item.id) {
             item.textContent = valu.sum
          }     
      })
  })
  document.getElementById('total').textContent = values[0].total
}
