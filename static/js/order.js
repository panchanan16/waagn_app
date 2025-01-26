console.log('order connected')

const request = new DataCall()


async function renderAllOrder() {
    const response = await request.GET_POST('v1/orders', 'GET')
    if (response.success) {
        document.getElementById('order-table').innerHTML = ''
        response.data.forEach((item, ind) => {
            const html = `<tr class="table-rows" onclick="openOrderDetails(${item.order_id})">
            <td>${item.order_id}</td>
            <td>${item.shipper_name}</td>
            <td>${item.shipper_email_address}</td>
            <td>${item.shipper_contact_number}</td>
            <td>20/02/2024</td>
            </tr>`
            document.getElementById('order-table').innerHTML += html
        })
    }
}


function openOrderDetails(orderid) {
    console.log(orderid)
    renderOrderDetails(orderid)
    openPopup('order-detail-popup')
}

async function createOrderFromAdmin(e) {
    e.preventDefault()
    const formData = new FormData(document.getElementById('order-create-form-admin'))
    const response = await request.GET_POST('v1/orders', 'POST', formData, 'form')
    if (response.success) { renderAllOrder() }

}


async function openAddPartnerForm(orderId) {
    document.getElementById('order-id-input').value = orderId
    const response = await request.GET_POST('v1/partners/drop', 'GET')
    console.log(response)
    if (response.success) {
        document.getElementById('partner-dropdown').innerHTML = ''
        response.data.forEach((item) => {
            const html = `<option value="${item.company_id}">${item.company_name}</option>`
            document.getElementById('partner-dropdown').innerHTML += html
        })
    }
    openPopup('select-3pl-box')
}

async function openAddVehicleForm(orderId) {
    document.getElementById('order-id-input-vh').value = orderId
    const response = await request.GET_POST('v1/vehicles/drivers', 'GET')
    console.log(response)
    if (response.success) {
        document.getElementById('search-list').innerHTML = ''
        response.data.forEach((item) => {
            const html = ` <li class="vh-num-li" onclick="selectVehicle(this, ${item.vehicle_id}, ${item.driver_id}, '${item.driver_name}')">${item.registration_number}</li>`
            document.getElementById('search-list').innerHTML += html
        })
    }
    openPopup('select-vehicle-box')
}

async function renderGodownLocationInForm() {
    const partnerId = document.getElementById('partner-dropdown').value
    const type = document.getElementById('godown-type-dropdown').value
    if (partnerId && type) {
        console.log(partnerId, type)
        const response = await request.GET_POST(`v1/godowns/3/${type}`, 'GET')
        if (response.success) {
            document.getElementById('godown-location-dropdown').innerHTML = '';
            response.data.forEach((item) => {
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
            response.data.forEach((item) => {
                document.getElementById('godown-location-dropdown').innerHTML += `<option value="${item.godown_id}">${item.full_address}</option>`;
            })
        }
    }
}



async function renderOrderDetails(id) {
    const response = await request.GET_POST(`v1/order/${id}`, 'GET')
    if (response.success) {
        const data = response.data[0]
        const html = `<div class="key-value-box scroll-box" style="justify-content: space-around; margin-block: 1rem;">
        <div class="key-value">
            <h2 class="flex details-heading">BOOKING DETAILS</h2>
            <div class="key-value-pair">
                <strong>OrderId:</strong> ${data.order_id}
            </div>
            <div class="key-value-pair">
                <strong>Name:</strong>  ${data.shipper_name}
            </div>
            <div class="key-value-pair">
                <strong>Pickup Location:</strong> ${data.pickup_location_address}
            </div>
            <div class="key-value-pair">
                <strong>Drop Location:</strong>${data.delivery_location_address}
            </div>
        </div>
        <div class="key-value">
            <h2 class="flex details-heading">CONSIGNOR/CONSIGNEE</h2>
            <div class="key-value-pair">
                <strong>Order Status:</strong>
                <select class="status-red">
                    <option value="pending" ${data.order_status == 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="transit" ${data.order_status == 'transit' ? 'selected' : ''}>In transit</option>
                    <option value="delivered" ${data.order_status == 'delivered' ? 'selected' : ''}>Delivered</option>
                </select>
            </div>
            <div class="key-value-pair">
                <strong>Name:</strong> John Doe
            </div>
            <div class="key-value-pair">
                <strong>Pickup Location:</strong><span class=""> New York, NY, 90001, lkrb path nabin nagar,
                    near police point, paltan bazar</span>
            </div>
            <div class="key-value-pair">
                <strong>Drop Location:</strong> Los Angeles, CA
            </div>
        </div>
        <div class="key-value">
            <h2 class="flex details-heading">GOODS INFORMATION</h2>
            <div class="key-value-pair">
                <strong>Order Status:</strong> <span class="status-green">delivered</span>
            </div>
            <div class="key-value-pair">
                <strong>Name:</strong> John Doe
            </div>
            <div class="key-value-pair">
                <strong>Pickup Location:</strong><span class=""> New York, NY, 90001, lkrb path nabin nagar,
                    near police point, paltan bazar</span>
            </div>
            <div class="key-value-pair">
                <strong>Drop Location:</strong> Los Angeles, CA
            </div>
        </div>
        <div class="key-value">
            <h2 class="flex details-heading"> PICKUP DETAILS</h2>
            <div class="key-value-pair">
                <strong>Order Status:</strong> <span class="status-green">delivered</span>
            </div>
            <div class="key-value-pair">
                <strong>Name:</strong> John Doe
            </div>
            <div class="key-value-pair">
                <strong>Pickup Location:</strong><span class=""> New York, NY, 90001, lkrb path nabin nagar,
                    near police point, paltan bazar</span>
            </div>
            <div class="key-value-pair">
                <strong>Drop Location:</strong> Los Angeles, CA
            </div>
        </div>

        <div class="key-value flex flex-col" style="gap: 1rem;">
            <h2 class="flex details-heading">3PL PARTNER</h2>
            <div class="flex key-value-pair">
                <div>
                    <label for="order-lr" class="btn">Upload LR</label>
                    <input type="file" name="order-lr" id="order-lr" class="hide">
                </div>
                <p class="view-doc">View</p>
            </div>
            <div class="flex key-value-pair">
                <div>
                    <label for="order-tax-invoice" class="btn">Upload Tax Invoice</label>
                    <input type="file" name="order-tax-invoice" id="order-tax-invoice" class="hide">
                </div>
                <p class="view-doc">View</p>
            </div>
            <div class="flex key-value-pair">
                <div>
                    <label for="goods-photos" class="btn">Goods Photo</label>
                    <input type="file" name="goods-photos" id="goods-photos" class="hide">
                </div>
                <p class="view-doc unactive">View</p>
            </div>
        </div>

        <div class="key-value">
            <h2 class="flex details-heading">BILLING INFORMATION</h2>
            <div class="key-value-pair">
                <strong>Order Status:</strong> <span class="status-green">delivered</span>
            </div>
            <div class="key-value-pair">
                <strong>Name:</strong> John Doe
            </div>
            <div class="key-value-pair">
                <strong>Pickup Location:</strong><span class=""> New York, NY, 90001, lkrb path nabin nagar,
                    near police point, paltan bazar</span>
            </div>
            <div class="key-value-pair">
                <strong>Drop Location:</strong> Los Angeles, CA
            </div>
        </div>

        <div class="key-value">
            <h2 class="flex details-heading">Delivery Adress</h2>
            <div class="key-value-pair">
                <strong>Order Status:</strong> <span class="status-green">delivered</span>
            </div>
            <div class="key-value-pair">
                <strong>Name:</strong> John Doe
            </div>
            <div class="key-value-pair">
                <strong>Pickup Location:</strong><span class=""> New York, NY, 90001, lkrb path nabin nagar,
                    near police point, paltan bazar</span>
            </div>
            <div class="key-value-pair">
                <strong>Drop Location:</strong> Los Angeles, CA
            </div>
        </div>

        <div class="key-value">
            <h2 class="flex details-heading">COMMENTS</h2>
            <div class="key-value-pair form-row">
                <input type="text" name="amount" value="1000">
                <button class="btn">Update</button>
            </div>
        </div>
    </div>
    <div class="flex" style="gap: 1rem">
        <button class="btn" onclick="openAddPartnerForm(${data.order_id})">Assign 3pl Partner</button>
        <button class="btn" onclick="openAddVehicleForm(${data.order_id})">Assign Pickup Vehicle</button>
        <button class="btn">Download</button>
    </div>`
        document.getElementById('order-details-box').innerHTML = html
    }
   
}


async function assignPartnerToOrder(e) {
   e.preventDefault()
   const formData = new FormData(document.getElementById('assign-partner-form'))
   const response = await request.GET_POST(`v1/assign/partner`, 'POST', formData, 'form')
}


async function assignVehicleToOrder(e) {
    e.preventDefault()
    const formData = new FormData(document.getElementById('assign-vehicle-form'))
    const response = await request.GET_POST(`v1/assign/vehicle`, 'POST', formData, 'form')
}


function selectVehicle(target, vehicleId, driverId, driverName) {
    document.getElementById('vehicle-dropdown').value = target.textContent
    document.getElementById('driver-name-inp').value = driverName 
    document.getElementById('driver-driverid-inp').value = driverId 
    document.getElementById('driver-vehicleid-inp').value = vehicleId 
    closePopup('search-input')
}

renderAllOrder();