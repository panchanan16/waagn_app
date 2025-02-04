const request = new DataCall()

async function createNewVehicle(e) {
    e.preventDefault();
    const formData = new FormData(document.getElementById('vehicle-add-form'))
    const response = await request.GET_POST('v1/vehicle', 'POST', formData, 'form')
    if (response.success) { renderVehicleList() }
}


async function renderDriversAddOpenForm() {
    const response = await request.GET_POST('v1/drivers/drop', 'GET')
    if (response.success) {
        const target = document.getElementById('driver-list-dropdown')
        target.innerHTML = ''
        response.data.forEach((item)=> {
            target.innerHTML += ` <option value="${item.driver_id}">${item.driver_name}</option>`
        })
    }
    openPopup('vehicle-add-form-popup')
}


async function renderVehicleList() {
    const response = await request.GET_POST('v1/vehicles', 'GET')
    const table = document.getElementById('vehicle-table')
    if (response.success) {
        table.innerHTML = ''
        response.data.forEach((item, ind)=> {
            const html = `<tr class="table-rows" onclick="renderVehicleDetails()">
            <td>${ind + 1}</td>
            <td>
                ${item.registration_number}
            </td>
            <td>${item.model}</td>
            <td>
                <select onclick="prevent(event)" class="${item.is_active ? 'status-green' : 'status-red'}" onchange="updateVehicleStatus(this, ${item.vehicle_id})">
                    <option value="1" ${item.is_active ? 'selected' : ''}>
                        Active
                    </option>
                    <option value="0" ${item.is_active ? '' : 'selected'}>
                        Unactive
                    </option>
                </select>
            </td>
            <td>${item.owners_name}</td>
            </tr>`
            table.innerHTML += html
        })
    }
}


async function renderVehicleDetails(vehicleID) {
    openPopup('vehicle-detail-popup')
}


function prevent(e) { e.stopPropagation() }


async function updateVehicleStatus(target, vehicleID) {
    changeStatus(target)
    const response = await request.DEL_UPD(`v1/vehicle/status/${vehicleID}`, 'PUT', {status: target.value})
}


renderVehicleList() 