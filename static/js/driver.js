const request = new DataCall()

async function renderDrivers() {
    const response = await request.GET_POST('v1/drivers', 'GET')
    const table = document.getElementById('driver-table')
    if (response.success) {
        table.innerHTML = ''
        response.data[0].forEach(item => {
        table.innerHTML += `<tr class="table-rows" onclick="renderDriverDetails(${item.driver_id})">
        <td>${item.driver_id}</td>
        <td class="search-item">${item.driver_name}</td>
        <td>${item.contact_number}</td>
        <td>${item.dl_number}</td>
        <td>
            <select onclick="prevent(event)" class="${item.driver_status ? 'status-green' : 'status-red'}" onchange="updateDriverStatus(this, ${item.driver_id})">
                    <option value="1" ${item.driver_status ? 'selected' : ''}>
                        Active
                    </option>
                    <option value="0" ${item.driver_status ? '' : 'selected'}>
                        Unactive
                    </option>
            </select>
        </td>
        </tr>`
        });

        document.getElementById('total-driver').textContent = response.data[1][0].total
        document.getElementById('active-driver').textContent = response.data[2][0].active
        document.getElementById('unactive-driver').textContent = response.data[3][0].unactive
    }

}

renderDrivers()


async function renderDriverDetails(driverId) {
    const response =  await request.GET_POST(`v1/driver/${driverId}`, 'GET')
    if (response.success) {
        const data = response.data[0]
        const html = `<div class="key-value">
                        <div class="key-value-pair">
                            <strong>driverId:</strong> ${data.driver_id}
                        </div>
                        <div class="key-value-pair">
                            <strong>Driver Name:</strong> ${data.driver_name}
                        </div>
                        <div class="key-value-pair">
                            <strong>Contact Number:</strong> ${data.contact_number}
                        </div>
                        <div class="key-value-pair">
                            <strong>Aadhaar Number:</strong> ${data.aadhaar_card_number}
                        </div>
                        <div class="key-value-pair">
                            <strong>Driving License Number:</strong>${data.dl_number}
                        </div>
                        <div class="key-value-pair">
                            <strong>Permanent Address:</strong> ${data.permanent_address}
                        </div>
                        <div class="key-value-pair">
                            <strong>Current Address:</strong> ${data.current_address}
                        </div>
                        <div class="key-value-pair">
                            <strong>WhatsApp Number:</strong> ${data.whatsapp_number}
                        </div>
                        <div class="key-value-pair">
                            <strong>Alternate Number:</strong> ${data.alt_number}
                        </div>
                    </div>
                    <div class="key-value">
                        <div class="key-value-pair">
                            <strong>Emergency Number:</strong> ${data.emergency_number}
                        </div>
                        <div class="key-value-pair">
                            <strong>Vehicle Assigned:</strong> ${data.contact_number}
                        </div> 
                        <div class="key-value-pair">
                            <strong>Status :</strong> 
                            <span class="${data.driver_status ? 'status-green' : 'status-red'}">
                            ${data.driver_status ? 'Active' : 'Not Active'}
                            </span>
                        </div>                       
                    </div>`
            document.getElementById('driver-details-box').innerHTML = html
    }
    openPopup('driver-detail-popup')
}

async function registerDriver(e) {
    e.preventDefault()
    const formData = new FormData(document.getElementById('driver-register-form'))
    const response = await request.GET_POST('v1/driver/register', 'POST', formData, 'file')
    if (response.success) { renderDrivers() }
}


async function updateDriverStatus(target, driverId) {
    changeStatus(target)
    await request.DEL_UPD(`v1/driver/status/${driverId}`, 'PUT', {status: target.value})
}