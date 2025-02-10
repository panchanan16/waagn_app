const request = new DataCall()

async function createNewVehicle(e) {
    e.preventDefault();
    const formData = new FormData(document.getElementById('vehicle-add-form'))
    const response = e.target.dataset.vehicleid != "" ? await request.DEL_UPD(`v1/vehicle/${e.target.dataset.vehicleid}`, 'PUT', formData, 'form') 
    : await request.GET_POST('v1/vehicle', 'POST', formData, 'form')
    if (response.success) { 
        document.getElementById('vehicle-add-form').reset()
        renderVehicleList() 
    }
}


async function renderDriverListInForm() {
    const response = await request.GET_POST('v1/drivers/drop', 'GET')
    if (response.success) {
        const target = document.getElementById('driver-list-dropdown')
        target.innerHTML = ''
        response.data.forEach((item) => {
            target.innerHTML += `<option value="${item.driver_id}">${item.driver_name}</option>`
        })
    }

    return response;
}


async function renderDriversAddOpenForm() {
    renderDriverListInForm()
    openPopup('vehicle-add-form-popup')
}


async function renderVehicleList() {
    const response = await request.GET_POST('v1/vehicles', 'GET')
    const table = document.getElementById('vehicle-table')
    if (response.success) {
        table.innerHTML = ''
        response.data[0].forEach((item, ind) => {
            const html = `<tr class="table-rows" onclick="renderVehicleDetails(${item.vehicle_id})">
            <td>${ind + 1}</td>
            <td>
                ${item.registration_number}
            </td>
            <td>${item.vehicle_type}</td>
            <td>${item.model}</td>
            <td>${item.capacity}</td>
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
            <td>
                <diV style="cursor: pointer;" onclick="editVehicles(event, ${item.vehicle_id})">
                    <i class="material-icons">app_registration</i> 
                </div>
            </td>
            </tr>`
            table.innerHTML += html
        })

        document.getElementById('total-vehicle').textContent = response.data[1][0].total
        document.getElementById('active-vehicle').textContent = response.data[2][0].active
        document.getElementById('unactive-vehicle').textContent = response.data[3][0].unactive
    }
}


async function renderVehicleDetails(vehicleID) {
    const response = await request.GET_POST(`v1/vehicle/${vehicleID}`, 'GET')
    if (response.success) {
        const data = response.data[0]
        console.log(data)
        const html2 = `<div class="key-value-box scroll-box" style="justify-content: space-around; margin-block: 1rem;">
    <div class="key-value">
        <h2 class="flex details-heading">VEHICLES DETAILS</h2>
        <div class="key-value-pair">
            <strong>Vehicle Status:</strong>
            <span class="${data.is_active ? 'status-green' : 'status-red'}">
                 ${data.is_active ? 'Active' : 'Not Active'}
            </span>
        </div>
        <div class="key-value-pair">
            <strong>Vehicle ID:</strong><span>${data.vehicle_id}</span>
        </div>
        <div class="key-value-pair">
            <strong>Registration Number:</strong> ${data.registration_number}
        </div>
        <div class="key-value-pair">
            <strong>Vehicle Model:</strong> ${data.model}
        </div>
         <div class="key-value-pair">
            <strong>Vehicle Capacity:</strong> ${data.capacity}
        </div>
        <div class="key-value-pair">
            <strong>Vehicle Type:</strong> ${data.vehicle_type}
        </div>
    </div>
    <div class="key-value">
        <h2 class="flex details-heading">OWNER DETAILS</h2>                           
        <div class="key-value-pair">
            <strong>Owner name:</strong> ${data.owners_name}
        </div>
        <div class="key-value-pair">
            <strong>Owner Contact:</strong><span>${data.contact_details}</span>
        </div>
        <div class="key-value-pair">
            <strong>Company affiliation:</strong> ${data.company_affiliation}
        </div>
        <div class="key-value-pair">
            <strong>DL Number:</strong> ${data.driving_license_number || 'N/A'}
        </div>
        <div class="key-value-pair">
            <strong>Vehicle Registration:</strong> ${data.vehicle_registration_certificate ? 'Yes' : 'No'}
        </div>
        <div class="key-value-pair">
            <strong>Pollution Certificate:</strong> ${data.pollution_certificate ? 'Yes' : 'No'}
        </div>
        <div class="key-value-pair">
            <strong>Fitness Certificate:</strong> ${data.fitness_certificate ? 'Yes' : 'No'}
        </div>
    </div>
    <div class="key-value">
        <h2 class="flex details-heading">TECHNOLOGY</h2>
        <div class="key-value-pair">
            <strong>GPS Integration:</strong> ${data.gps_tracking_integration ? 'Yes' : 'No'}
        </div>
        <div class="key-value-pair">
            <strong>Compatibility With Software:</strong> ${data.compatibility_with_logistics_software ? 'Yes' : 'No'}
        </div>
        <div class="key-value-pair">
            <strong>Temperature Control:</strong><span>${data.temperature_control ? 'Yes' : 'No'}</span>
        </div>
        <div class="key-value-pair">
            <strong>Online Availability Status:</strong> ${data.online_availability_status ? 'Yes' : 'No'}
        </div>
    </div>
    <div class="key-value">
        <h2 class="flex details-heading">MAINTENANCE</h2>
        <div class="key-value-pair">
            <strong>Last Service date:</strong> ${data.last_service_date}
        </div>
        <div class="key-value-pair">
            <strong>Maintenance Schedule:</strong> ${data.maintenance_schedule}
        </div>
        <div class="key-value-pair">
            <strong>Major Repairs:</strong>${data.major_repairs}
        </div>
        <div class="key-value-pair">
            <strong>Insurance Provider:</strong> ${data.insurance_provider}
        </div>
        <div class="key-value-pair">
            <strong>Policy details:</strong> ${data.policy_details}
        </div>
        <div class="key-value-pair">
            <strong>Referencesrom :</strong> <span>${data.references_from_previous_employers_clients}</span>
        </div>
        <div class="key-value-pair">
            <strong>Feedback :</strong> <span>${data.feedback_on_performance_and_reliability}</span>
        </div>
         <div class="key-value-pair">
            <strong>Claim Process :</strong> <span>${data.claim_process}</span>
        </div>
    </div>                   

    <div class="key-value">
        <h2 class="flex details-heading">CAPABILITY</h2>                         
        <div class="key-value-pair">
            <strong>Cost per Kilometer:</strong> ${data.cost_per_km_hour} USD
        </div>
        <div class="key-value-pair">
            <strong>Preferred Routes:</strong><span>${data.preferred_routes}</span>
        </div>
        <div class="key-value-pair">
            <strong>Availability Schedule:</strong> ${data.availability_schedule}
        </div>
        <div class="key-value-pair">
            <strong>Special handling Capabilities:</strong> ${data.special_handling_capabilities}
        </div>
        <div class="key-value-pair">
            <strong>Road Permit:</strong> ${data.road_permit ? 'Yes' : 'No'}
        </div>
        <div class="key-value-pair">
            <strong>types Of Goods handled :</strong> ${data.ypes_of_goods_handled}
        </div>
         <div class="key-value-pair">
            <strong>Coverage for Goods :</strong> ${data.coverage_for_goods_and_vehicle ? 'Yes' : 'No'}
        </div>
    </div>

    <div class="key-value">
        <h2 class="flex details-heading">DRIVER ASSIGNED</h2>
        <div class="key-value-pair">
            <strong>Driver Name:</strong> ${data.driver_name}
        </div>
        <div class="key-value-pair">
            <strong>Driver Number:</strong> ${data.contact_number}
        </div>
        <div class="key-value-pair">
            <strong>Driver Status:</strong>
            <span class="${data.driver_status ? 'status-green' : 'status-red'}">
             ${data.driver_status ? 'Active' : 'Not Active'}
            </span>
        </div>
        <div class="key-value-pair">
            <strong>Driver License No.:</strong> ${data.dl_number}
        </div>
    </div>                       
</div>
`

        document.getElementById('vehicle-details-box').innerHTML = html2
    }

    openPopup('vehicle-detail-popup')
}


async function updateVehicleStatus(target, vehicleID) {
    changeStatus(target)
    const response = await request.DEL_UPD(`v1/vehicle/status/${vehicleID}`, 'PUT', { status: target.value })
}


async function editVehicles(e, vehicleid, formId) {
    e.stopPropagation();
    alert("Do you like to edit ??");
    const form = document.getElementById("vehicle-add-form");
    const inputs = Array.from(form.getElementsByTagName("INPUT"));
    const inputArray = inputs.concat(
        Array.from(form.getElementsByTagName("SELECT")).concat(Array.from(form.getElementsByTagName("textarea")))
    );
    const isDriverRendered = await renderDriverListInForm()
    if (isDriverRendered.success) {
        const response = await request.GET_POST(`v1/vehicle/${vehicleid}`, 'GET')
        if (response.success) {
            for (const key in response.data[0]) {
                inputArray.forEach((item) => {
                    if (key == item.id) {
                        item.value = response.data[0][key];
                    }
                });
            }
            document.getElementById('driver-list-dropdown').value = response.data[0]['driver_details']
        }
    }
    document.getElementById("vehicle-update-btn").dataset.vehicleid = vehicleid;
    openPopup("vehicle-add-form-popup");
}


renderVehicleList() 