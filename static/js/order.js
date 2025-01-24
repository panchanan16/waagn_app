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


async function openAddPartnerForm(params) {
    const response = await request.GET_POST('v1/partners/drop', 'GET')
    console.log(response)
    if (response.success) {
        document.getElementById('partner-dropdown').innerHTML = ''
        response.data.forEach((item)=> {
            const html = `<option value="${item.company_id}">${item.company_name}</option>`
            document.getElementById('partner-dropdown').innerHTML += html
        })
    }
    openPopup('select-3pl-box')
}

async function renderGodownLocationInForm() {
    const partnerId = document.getElementById('partner-dropdown').value
    const type = document.getElementById('godown-type-dropdown').value
    if (partnerId && type) {
        console.log(partnerId, type)
        const response = await request.GET_POST(`v1/godowns/3/${type}`, 'GET')
        if (response.success) {
            document.getElementById('godown-location-dropdown').innerHTML = '';
            response.data.forEach((item)=> {              
                document.getElementById('godown-location-dropdown').innerHTML += `<option value="${item.godown_id}">${item.full_address}</option>`;
            })
        }
    }
}


async function renderVehiclesInForm() {
    const partnerId = document.getElementById('partner-dropdown').value
    const type = document.getElementById('godown-type-dropdown').value
    if (partnerId && type) {
        console.log(partnerId, type)
        const response = await request.GET_POST(`v1/godowns/3/${type}`, 'GET')
        if (response.success) {
            document.getElementById('godown-location-dropdown').innerHTML = '';
            response.data.forEach((item)=> {              
                document.getElementById('godown-location-dropdown').innerHTML += `<option value="${item.godown_id}">${item.full_address}</option>`;
            })
        }
    }
}

getAllOrders();