const request = new DataCall()

async function renderDrivers() {
    const response = await request.GET_POST('v1/drivers', 'GET')
    const table = document.getElementById('driver-table')
    if (response) {
        table.innerHTML = ''
        response.forEach(item => {
            table.innerHTML += `<tr class="table-rows">
        <td>${item.driver_id}</td>
        <td><select class="status-green" onchange="changeStatus(this)">
                <option value="Active">Active</option>
                <option value="Unactive">Unactive</option>
            </select></td>
        <td><span class="status-green">Active</span></td>
        <td>${item.driver_name}</td>
        <td>20/02/2024</td>
        </tr>`
        });
    }

}

renderDrivers()


async function registerDriver(e) {
    e.preventDefault()
    const formData = new FormData(document.getElementById('driver-register-form'))
    const response = await request.GET_POST('v1/driver/register', 'POST', formData, 'file')
    if (response.success) { renderDrivers() }
}