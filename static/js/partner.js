console.log('partner connected')

const request = new DataCall()

async function getAllpartners(e) {
    const response = await request.GET_POST('v1/partners', 'GET')
}


async function renderPartners() {
    const response = await request.GET_POST('v1/partners', 'GET')
    if (response.success) {
        console.log(response)
        const table = document.getElementById('partners-display-table')
        table.innerHTML = ''
        response.data[0].forEach((item, ind) => {
            const html = `<tr data-partnerid="${item.company_id}" class="table-rows" ondblclick="setIdAndOpenPartnerDetails(${item.company_id})">
        <td>${ind + 1}</td>
        <td>${item.company_name}</td>
        <td>${item.contact_details}</td>
        <td>${item.years_of_experience}</td>
        <td>${item.frequency_of_loads}</td>
        <td>
            <select class="${item.is_active ? 'status-green' : 'status-red'}" onchange="updatePartnerStatus(this, ${item.company_id})">
                <option value="1" ${item.is_active ? 'selected' : ''}>Active</option>
                <option value="0" ${item.is_active ? '' : 'selected'}>Unactive</option>
            </select>
        </td>
        <td>
            <diV style="cursor: pointer;" onclick="editPartner(event, ${item.company_id})">
                <i class="material-icons">app_registration</i> 
            </div>
        </td>
       </tr>`
        table.innerHTML += html
        })

        renderSummary(response.data[1], 'is_active')

    }
}


async function createpartner(e) {
    e.preventDefault()
    const formData = new FormData(document.getElementById('partner-create-form'))
    const response =  e.target.dataset.partnerid != "" ? await request.DEL_UPD(`v1/partner/${e.target.dataset.partnerid }`, 'PUT', formData, 'form') : await request.GET_POST('v1/partner', 'POST', formData, 'form')  

    if (response.success) { 
        renderPartners() 
        document.getElementById("partner-create-form").reset();
    }
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
    if (response.success) {
        const boxData = response.data;
        console.log(boxData)
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
                            <div class="key-value-pair">
                                <strong>ODA areas :</strong>
                                 <span>${boxData.oda_areas}</span>
                            </div>
                            <div class="key-value-pair">
                                <strong>Frequency Of Loads :</strong>
                                 <span>${boxData.frequency_of_loads}</span>
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
                                <strong>Compliance with Transportation Laws:</strong> ${boxData.compliance_with_transportation_laws}
                            </div>
                            <div class="key-value-pair">
                                <strong>Driver Certifications:</strong> ${boxData.driver_certifications
            }
                            </div>
                        </div>
    
                        <div class="key-value">
                            <h2 class="flex details-heading">Pricing</h2>
                            <div class="key-value-pair">
                                <strong>Cost Structure:</strong> ${boxData.cost_structure}
                            </div>
                            <div class="key-value-pair">
                                <strong>Payment Terms:</strong> ${boxData.
                payment_terms
            }
                            </div>
                            <div class="key-value-pair">
                                <strong>Additional Charges for Specialized Services:</strong> ${boxData.additional_charges_for_specialized_services
            }
                            </div>
                        </div>
    
                        <div class="key-value">
                            <h2 class="flex details-heading">Technology Integration</h2>
                            <div class="key-value-pair">
                                <strong>Real-Time Tracking Availability:</strong> ${boxData.real_time_tracking_availability}    
                            </div>
                            <div class="key-value-pair">
                                <strong>Integration with Logistics Software :</strong>${boxData.integration_with_logistics_software}
                            </div>
                            <div class="key-value-pair">
                                <strong>Online Booking System:</strong> ${boxData.
                online_booking_systems
            }
                            </div>
                        </div>
                        
                        <div class="key-value">
                            <h2 class="flex details-heading">Customer Support</h2>
                            <div class="key-value-pair">
                                <strong>24/7 Customer Support:</strong> ${boxData.customer_support_24_7}                                                       
                            </div>                       
                            <div class="key-value-pair">
                                <strong>Emergency Point of Contact:</strong> ${boxData.emergency_point_of_contact
            }
                            </div>
                            
                        </div>
    
                        <div class="key-value">
                            <h2 class="flex details-heading">Insurance and Liability</h2>
                            <div class="key-value-pair">
                                <strong>Insurance Coverage For Cargo:</strong> ${boxData.insurance_coverage_for_cargo}      
                            </div>
                            <div class="key-value-pair">
                                <strong>Liability in Case of Damage/Loss :</strong> ${boxData.
                liability_in_case_of_damage_or_loss}
                            </div>
                            <div class="key-value-pair">
                                <strong>Claim Processing Time:</strong> ${boxData.claim_processing_time}
                            </div>
                            
                        </div>
    
                        <div class="key-value">
                            <h2 class="flex details-heading">References And Reputations</h2>
                            <div class="key-value-pair">
                                <strong>References from Previous Clients:</strong> ${boxData.references_from_previous_clients}     
                            </div>
                            <div class="key-value-pair">
                                <strong>Market Reputation/Reviews:</strong> ${boxData.market_reputation_reviews
            }
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
        response.data.forEach((item) => {
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
                    <strong>Pincode:</strong> ${item.godown_pincode}
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


async function editPartner(e, partnerId) {
    e.stopPropagation();
    alert("Do you like to edit ??");
    const form = document.getElementById("partner-create-form");
    const inputs = Array.from(form.getElementsByTagName("INPUT"));
    const inputArray = inputs.concat(
        Array.from(form.getElementsByTagName("SELECT")).concat(Array.from(form.getElementsByTagName("textarea")))
    );
    const response = await request.GET_POST(`v1/partner/${partnerId}`, 'GET')
    if (response.success) {
        for (const key in response.data) {
            inputArray.forEach((item) => {
                if (key == item.id) {
                    item.value = response.data[key];
                }
            });
        }
    }
    document.getElementById("partner-update-btn").dataset.partnerid = partnerId;
    openPopup("partner-add-form-popup");
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
    await request.DEL_UPD(`v1/partner/status/${partnerID}`, 'PUT', { status: target.value })
}




renderPartners();
