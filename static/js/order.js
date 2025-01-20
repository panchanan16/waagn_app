console.log('order connected')

const request = new DataCall()

async function getAllOrders(e) {
    const response =  await request.GET_POST('v1/orders', 'GET')
    console.log(response)
}

async function createOrderFromAdmin(e) {
    e.preventDefault()
    const formData = new FormData(document.getElementById('order-create-form-admin'))
    const response =  await request.GET_POST('v1/orders', 'POST', formData, 'form')
    console.log(response)
}

getAllOrders();