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
            const html = `<tr class="table-rows">
            <td>${ind + 1}</td>
            <td><select class="status-green" onchange="changeStatus(this)">
                    <option value="Active">Active</option>
                    <option value="Unactive">Unactive</option>
                </select></td>
            <td><span class="status-green">Active</span></td>
            <td>${item.owners_name}</td>
            <td>20/02/2024</td>
            </tr>`
            table.innerHTML += html
        })
    }
}

renderVehicleList() 