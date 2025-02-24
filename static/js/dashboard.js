const request = new DataCall()

async function renderDashBoardData() {
    const response = await request.GET_POST('v1/dashboard/data', 'GET')
    if (response.success) {
        console.log(response)

        response.data[0].forEach((item)=> {
            console.log(item.order_status)
            const target = document.getElementById(item.order_status)
            if (target) { target.textContent = item.total }           
        })

        document.getElementById('total-order').textContent = response.data[0][0].total_orders 
        document.getElementById('pending_acceptance').textContent = response.data[2][0].pending_acceptance  ? response.data[2][0].pending_acceptance : 0
    }
}

renderDashBoardData()