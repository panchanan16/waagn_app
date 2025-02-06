const request = new DataCall()

async function renderDashBoardData() {
    const response = await request.GET_POST('v1/dashboard/data', 'GET')
    console.log(response)
    if (response.success) {
        document.getElementById('total-order').textContent = response.data[0][0].totalOrders
        document.getElementById('active-vehicles').textContent = response.data[1][0].active_vehicles

    }
}

renderDashBoardData()