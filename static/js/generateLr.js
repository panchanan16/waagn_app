function addItemRow(data) {
  const html = `<div class="row" ondblclick="removeItemField(this, 'lr')">
                <div class="column">2</div>
                <div class="column">${data[0].value}</div>
                <div class="column">${data[1].value}</div>
                <div class="column">${data[2].value}</div>
                <div class="column">${data[3].value}</div>
                <div class="column">${data[4].value}</div>
            </div> `;
  document.getElementById("item-add-row").innerHTML += html;
}

function addItemField(e) {
  e.preventDefault();
  const itemFields = document.getElementById("item-desc-field");
  const inputs = itemFields.getElementsByTagName("INPUT");
  console.log(inputs);
  const html = `<div class="flex" style="gap: 1rem; padding: 1rem; align-items: center;">
                  <div class="item-display">${inputs[0].value}</div>
                  <div class="item-display">${inputs[1].value}</div>
                  <div class="item-display">${inputs[2].value}</div>
                  <div class="item-display">${inputs[3].value}</div>
                  <div class="item-display">${inputs[4].value}</div>
                  <div style="cursor:pointer;" onclick="removeItemField(this)">&#10006;</div>
                </div>`;
  document.getElementById("item-data-box").innerHTML += html;
  addItemRow(inputs);
  Array.from(inputs).forEach((item) => (item.value = ""));
}

function removeItemField(target, type) {
  if (type == "lr") {
    target.remove();
  } else {
    target.parentNode.remove();
  }
}

function generateLR(e) {
  e.preventDefault()
  const formdata = new FormData(document.getElementById("generate-lr-form"));
  const boxes = document.getElementById("charges-box-lr").childNodes;
  document.querySelectorAll('.lr-field').forEach((el)=> {
    el.classList.remove('checked')
  })
  for (let [key, value] of formdata.entries()) {
    boxes.forEach((item)=> {
      if (item.id == key) { item.textContent = value }
    })
    document.querySelectorAll('.lr-field').forEach((item, ind, arr)=> {
      if (item.id == value || item.id == key) {
        if (item.classList.contains('checkbox')) {
          item.classList.toggle('checked') 
        } else {
          item.textContent = value
        }        
      } 
    })
  }

  alert("LR Generated Successfully ✅")
 
}


function previewLR(e) {
  e.preventDefault()
   document.getElementById('lr-pdf').classList.toggle('hide')
}
