console.log('partner connected')

const request = new DataCall()

async function getAllpartners(e) {
    const response = await request.GET_POST('v1/partners', 'GET')
    console.log(response)
}


async function renderPartners() {
    const response = await request.GET_POST('v1/partners', 'GET')
    if (response.success) {
        const table = document.getElementById('partners-display-table')
        table.innerHTML = ''
        response.data.forEach((item, ind) => {
            const html = `<tr data-partnerid="${item.company_id}" class="table-rows" ondblclick="setIdAndOpenPartnerDetails(${item.company_id})">
        <td>${ind + 1}</td>
        <td>${item.company_name}</td>
        <td>${item.contact_details}</td>
        <td>${item.years_of_experience}</td>
        <td>01/09/2002</td>
        <td>09/09/2024</td>
        <td>
            <select class="${item.is_active ? 'status-green' : 'status-red'}" onchange="updatePartnerStatus(this, ${item.company_id})">
                <option value="1" ${item.is_active ? 'selected' : ''}>Active</option>
                <option value="0" ${item.is_active ? '' : 'selected'}>Unactive</option>
            </select>
        </td>
       </tr>`

            table.innerHTML += html
        })

    }
}


async function createpartner(e) {
    e.preventDefault()
    const formData = new FormData(document.getElementById('partner-create-form'))
    const response = await request.GET_POST('v1/partner', 'POST', formData, 'form')
    if (response.success) { renderPartners() }
}


async function setIdAndOpenPartnerDetails(partnerId) {
    openPopup('partner-details-popup')
    renderPartnerDetails(partnerId)
}

async function getIdAndOpenGodownForm(target) {
    const partnerId = document.getElementById('company_id').textContent
    document.getElementById('partner-id-inp').value = partnerId
    openPopup('sub-popup')
}


async function renderPartnerDetails(partnerId) {
    const response = await request.GET_POST(`v1/partner/${partnerId}`, 'GET')
    const boxData = response.data;
    if (response.success) {
        const detailsBox = document.getElementById('partner-details-box')
        const html = `<div class="key-value-box scroll-box" style="justify-content: space-around; margin-block: 1rem;">
                        <div class="key-value">
                            <h2 class="flex details-heading">COMPANY DETAILS</h2>
                            <div class="key-value-pair">
                                <strong>Partner Id:</strong> <span id="company_id">${boxData.company_id}</span>
                            </div>
                            <div class="key-value-pair">
                                <strong>Company name:</strong> ${boxData.company_name}
                            </div>
                            <div class="key-value-pair">
                                <strong>Years of Experience:</strong> ${boxData.years_of_experience}
                            </div>
                            <div class="key-value-pair">
                                <strong>Contact details:</strong> ${boxData.
                                    contact_details}
                            </div>
                            <div class="key-value-pair">
                                <strong>Certifications:</strong> ${boxData.
                                    certifications}
                            </div>
                        </div>
    
                        <div class="key-value">
                            <h2 class="flex details-heading">Operational Capability</h2>
                            <div class="key-value-pair">
                                <strong>Types of Goods Handled:</strong>
                                ${boxData.types_of_goods_handled}
                            </div>
                            <div class="key-value-pair">
                                <strong>Specialization:</strong>
                                ${boxData.specialization}
                            </div>
                            <div class="key-value-pair">
                                <strong>Services Types:</strong>
                                 ${boxData.type_of_services}
                            </div>
                        </div>
    
                        <div class="key-value">
                            <h2 class="flex details-heading">Fleet Details</h2>
                            <div class="key-value-pair">
                                <strong>Fleet Size: </strong>
                                ${boxData.fleet_size}
                            </div>
                            <div class="key-value-pair">
                                <strong>Types of Vehicles:</strong>
                                ${boxData.types_of_vehicles}
                            </div>
                            <div class="key-value-pair">
                                <strong>Average Age of Vehicles:</strong>
                                ${boxData.average_age_of_vehicles}
                            </div>                    
                        </div>
                        
                        <div class="key-value">
                            <h2 class="flex details-heading">Warehouse</h2>
                            <div class="key-value-pair">
                                <strong>Number of Warehouses:</strong>
                                  ${boxData.number_of_warehouses}
                            </div>
                            <div class="key-value-pair">
                                <strong>Locations of Warehouses:</strong>
                                <button class="btn" onclick="renderGodownList(${boxData.company_id})">View all</button>
                            </div>
                            <div class="key-value-pair">
                                <strong>Logistics Area:</strong>
                                ${boxData.area_type_of_logistics}
                            </div>
                        </div>
    
                        <div class="key-value">
                            <h2 class="flex details-heading">Compliance</h2>
                            <div class="key-value-pair">
                                <strong>Compliance with Transportation Laws:</strong> <span class="status-green">delivered</span>
                            </div>
                            <div class="key-value-pair">
                                <strong>Driver Certifications:</strong> John Doe
                            </div>
                        </div>
    
                        <div class="key-value">
                            <h2 class="flex details-heading">Pricing</h2>
                            <div class="key-value-pair">
                                <strong>Cost Structure:</strong> <span class="status-green">delivered</span>
                            </div>
                            <div class="key-value-pair">
                                <strong>Payment Terms:</strong> John Doe
                            </div>
                            <div class="key-value-pair">
                                <strong>Additional Charges for Specialized Services:</strong><span class=""> New York, NY, 90001, lkrb path nabin nagar,
                                    near police point, paltan bazar</span>
                            </div>
                        </div>
    
                        <div class="key-value">
                            <h2 class="flex details-heading">Technology Integration</h2>
                            <div class="key-value-pair">
                                <strong>Real-Time Tracking Availability:</strong> John Doe                                                       
                            </div>
                            <div class="key-value-pair">
                                <strong>Integration with Logistics Software :</strong> John Doe
                            </div>
                            <div class="key-value-pair">
                                <strong>Online Booking System:</strong> John Doe
                            </div>
                        </div>
                        
                        <div class="key-value">
                            <h2 class="flex details-heading">Customer Support</h2>
                            <div class="key-value-pair">
                                <strong>24/7 Customer Support:</strong> John Doe                                                        
                            </div>
                            <div class="key-value-pair">
                                <strong>Escalation Process:</strong> John Doe
                            </div>
                            <div class="key-value-pair">
                                <strong>Emergency Point of Contact:</strong> John Doe
                            </div>
                            
                        </div>
    
                        <div class="key-value">
                            <h2 class="flex details-heading">Insurance and Liability</h2>
                            <div class="key-value-pair">
                                <strong>Insurance Coverage For Cargo:</strong> John Doe                                                        
                            </div>
                            <div class="key-value-pair">
                                <strong>Liability in Case of Damage/Loss :</strong> John Doe
                            </div>
                            <div class="key-value-pair">
                                <strong>Claim Processing Time:</strong> John Doe
                            </div>
                            
                        </div>
    
                        <div class="key-value">
                            <h2 class="flex details-heading">References And Reputations</h2>
                            <div class="key-value-pair">
                                <strong>References from Previous Clients:</strong> John Doe                                                        
                            </div>
                            <div class="key-value-pair">
                                <strong>Market Reputation/Reviews:</strong> John Doe
                            </div>                                             
                        </div>
                    
        </div>`
        detailsBox.innerHTML = html
    }
}


async function createGodown(e) {
    e.preventDefault()
    const formData = new FormData(document.getElementById('godown-create-form'))
    const response = await request.GET_POST('v1/godown', 'POST', formData, 'form')
}


async function renderGodownList(partnerId) {
    const response = await request.GET_POST(`v1/godown/${partnerId}`, 'GET')
    if (response.success) {
        document.getElementById('godown-location-box').innerHTML = '';
        response.data.forEach((item)=> {
            const html = `<div class="key-value-box scroll-box"
            style="justify-content: space-around; margin-block: 1rem;">
            <div class="key-value">
                <div class="key-value-pair">
                    <strong>Type:</strong> <span
                        id="company_id">${item.type_of_godown}</span>
                </div>
                <div class="key-value-pair">
                    <strong>Town:</strong> ${item.town}
                </div>
                <div class="key-value-pair">
                    <strong>Full Address:</strong> ${item.full_address}
                </div>
                <div class="key-value-pair">
                    <strong>Contact Person:</strong> ${item.
                    contact_person_name}
                </div>
                <div class="key-value-pair">
                    <strong>Numbers:</strong> ${item.
                        number} / ${item.alt_number}
                </div>
                <div class="key-value-pair">
                    <strong>Rate:</strong> ${item.
                    rate}
                </div>
                <div class="key-value-pair">
                    <strong>ODA number:</strong> ${item.
                    oda_number}
                </div>
                 <div onclick="deletePartnerGodown(this)" data-gid="${item.godown_id}" data-pid="${item.partner_id}">
                    <i class="material-icons" style="color: red; cursor: pointer; font-size: 35px">delete_forever</i>
                 </div>
            </div>
           
        </div>`
        document.getElementById('godown-location-box').innerHTML += html;
        })
    }
    openPopup('godown-list-popup')

}


async function deletePartnerGodown(target) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
        confirmButtonColor: '#E3242B',
        cancelButtonColor: '#1b1b1b'
      }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await request.DEL_UPD(`v1/godown/${target.dataset.gid}/partner/${target.dataset.pid}`, 'DELETE')
            if (response.success) { target.parentNode.parentNode.remove() } 
        } else {
          return;
        }
      });
}

async function updatePartnerStatus(target, partnerID) {
    changeStatus(target)
    await request.DEL_UPD(`v1/partner/status/${partnerID}`, 'PUT', {status: target.value})
}




renderPartners();
