const request = new DataCall()

async function renderDashBoardData() {
    const response = await request.GET_POST('v1/dashboard/data', 'GET')
    console.log(response.data)
    if (response.success) {
        document.getElementById('total-order').textContent = response.data[0][0].total_orders
        document.getElementById('active-vehicles').textContent = response.data[1][0].active_vehicles
        document.getElementById('delivered-order').textContent = response.data[0][0].total 
        document.getElementById('transit-order').textContent = response.data[0][3].total 
    }
}

renderDashBoardData()