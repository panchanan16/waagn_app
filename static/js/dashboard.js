const request = new DataCall()

async function renderDashBoardData() {
    const response = await request.GET_POST('v1/dashboard/data', 'GET')
    if (response.success) {
        console.log(response)
        document.getElementById('total-order').textContent = response.data[0][0].total_orders
        document.getElementById('active-vehicles').textContent = response.data[1][0].active_vehicles
        document.getElementById('delivered-order').textContent = response.data[0][0].total 
        document.getElementById('transit-order').textContent = response.data[0][4].total 
        document.getElementById('pending-pickup-order').textContent = response.data[0][3].total 
        document.getElementById('pending_acceptance').textContent = response.data[2][0].pending_acceptance 
    }
}

renderDashBoardData()