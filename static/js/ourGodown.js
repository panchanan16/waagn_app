const request = new DataCall();

async function createOurGodown(e) {
  e.preventDefault();
  const formData = new FormData(
    document.getElementById("ourgodown-register-form")
  );
  const response = await request.GET_POST(
    "v1/ourgodown",
    "POST",
    formData,
    "form"
  );
  if (response.success) {
    document.getElementById("ourgodown-register-form").reset();
    renderOurGodowns();
  }
}

async function renderOurGodowns() {
  const response = await request.GET_POST("v1/ourgodowns", "GET");
  const table = document.getElementById("ourgodown-table");
  if (response.success) {
    table.innerHTML = "";
    response.data.forEach((item) => {
      const html = `<tr class="table-rows" onclick="renderGodownDetails(${item.godown_id})">
        <td>${item.godown_id}</td>
        <td>${item.contact_person_name}</td>
        <td>${item.town}</td>
        <td>${item.partner_name}</td>
        <td>${item.type_of_godown}</td>
        <td>
          <select onclick="prevent(event)" class="${item.is_active ? 'status-green' : 'status-red'}" onchange="updateDriverStatus(this, ${item.driver_id})">
                    <option value="1" ${item.is_active ? 'selected' : ''}>
                        Active
                    </option>
                    <option value="0" ${item.is_active ? '' : 'selected'}>
                        Unactive
                    </option>
            </select>
        </td>  
        </tr>`;
      table.innerHTML += html;
    });
  }
}

async function renderGodownDetails(godownId) {
  const response = await request.GET_POST(`v1/ourgodown/${godownId}`, "GET");
  console.log(response);
  if (response.success) {
    const data = response.data[0];
    const html = `<div class="key-value">
                        <div class="key-value-pair">
                            <strong>Godown ID:</strong> ${data.godown_id}
                        </div>
                        <div class="key-value-pair">
                            <strong>Town:</strong> ${data.town}
                        </div>
                        <div class="key-value-pair">
                            <strong>Type of Godown:</strong> ${data.type_of_godown}
                        </div>
                        <div class="key-value-pair">
                            <strong>Full Address:</strong> ${data.full_address}
                        </div>
                        <div class="key-value-pair">
                            <strong>Contact Person Name:</strong> ${data.contact_person_name}
                        </div>
                        <div class="key-value-pair">
                            <strong>Number:</strong> ${data.number}
                        </div>
                        <div class="key-value-pair">
                            <strong>Alternate Number:</strong> ${data.alt_number}
                        </div>                     
                    </div>
    <div class="key-value">
            <div class="key-value-pair">
                <strong>Rate:</strong> ${data.rate}
            </div>
            <div class="key-value-pair">
                <strong>Oda Number:</strong> ${data.oda_number}
            </div>
            <div class="key-value-pair">
                <strong>Partner Name:</strong> ${data.partner_name}
            </div>
        <div class="key-value-pair">
            <strong>Status :</strong> 
            <span class="${data.is_active? "status-green" : "status-red"}">
                 ${data.is_active ? "Active" : "Not Active"}
            </span>
        </div>                       
    </div>`;
    document.getElementById("ourgodown-details-box").innerHTML = html;
  }
  openPopup("ourgodown-detail-popup");
}

renderOurGodowns();
