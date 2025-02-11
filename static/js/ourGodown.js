const request = new DataCall();

async function createOurGodown(e) {
  e.preventDefault();
  const formData = new FormData(
    document.getElementById("ourgodown-register-form")
  );
  const response =  e.target.dataset.godownid != "" ? await request.DEL_UPD(
    `v1/ourgodown/${e.target.dataset.godownid}`,
    "PUT",
    formData,
    "form"
  ) : await request.GET_POST(
    "v1/ourgodown",
    "POST",
    formData,
    "form"
  );

  if (response.success) {
    document.getElementById("ourgodown-register-form").reset();
    renderOurGodowns();
  }
}

async function renderOurGodowns() {
  const response = await request.GET_POST("v1/ourgodowns", "GET");
  const table = document.getElementById("ourgodown-table");
  if (response.success) {
    table.innerHTML = "";
    response.data.forEach((item) => {
      const html = `<tr class="table-rows" onclick="renderGodownDetails(${item.godown_id})">
        <td>${item.godown_id}</td>
        <td>${item.name_of_the_godown}</td>
        <td>${item.full_address}</td>
        <td>${item.contact_person_name}</td>
        <td>
          <select onclick="prevent(event)" class="${item.is_active ? 'status-green' : 'status-red'}" onchange="updateOurLocationStatus(this, ${item.godown_id})">
                    <option value="1" ${item.is_active ? 'selected' : ''}>
                        Active
                    </option>
                    <option value="0" ${item.is_active ? '' : 'selected'}>
                        Unactive
                    </option>
            </select>
        </td> 
         <td>
            <diV style="cursor: pointer;" onclick="editLocation(event, ${item.godown_id})">
                <i class="material-icons">app_registration</i> 
            </div>
        </td> 
        </tr>`;
      table.innerHTML += html;
    });
  }
}

async function renderGodownDetails(godownId) {
  const response = await request.GET_POST(`v1/ourgodown/${godownId}`, "GET");
  console.log(response);
  if (response.success) {
    const data = response.data[0];
    const html = `<div class="key-value">
                        <div class="key-value-pair">
                            <strong>Godown ID:</strong> ${data.godown_id}
                        </div>
                        <div class="key-value-pair">
                            <strong>Name of Godown:</strong> ${data.name_of_the_godown}
                        </div>
                        <div class="key-value-pair">
                            <strong>Full address:</strong> ${data.full_address}
                        </div>
                        <div class="key-value-pair">
                            <strong>City:</strong> ${data.city}
                        </div>
                        <div class="key-value-pair">
                            <strong>State :</strong> ${data.state}
                        </div>
                        <div class="key-value-pair">
                            <strong>Pincode :</strong> ${data.pincode}
                        </div>
                        <div class="key-value-pair">
                            <strong>Contact Person Name:</strong> ${data.contact_person_name}
                        </div> 
                        <div class="key-value-pair">
                            <strong>Contact Number:</strong> ${data.contact_number}
                        </div>
                        <div class="key-value-pair">
                            <strong>Email Id:</strong> ${data.email_id}
                        </div>
                        <div class="key-value-pair">
                            <strong>Type of Warehouse:</strong> ${data.type_of_warehouse}
                        </div>   
                          <div class="key-value-pair">
                            <strong>Ownership Type:</strong> ${data.ownership_type}
                        </div>
                        <div class="key-value-pair">
                            <strong>Owner Name:</strong> ${data.owners_name}
                        </div> 
                        <div class="key-value-pair">
                            <strong>GST number:</strong> ${data.gst_number}
                        </div>
                        <div class="key-value-pair">
                            <strong>Warehouse Licsence Number:</strong> ${data.warehouse_license_number}
                        </div>
                        <div class="key-value-pair">
                            <strong>Liscense Expiry date:</strong> ${data.expiry_date_of_license}
                        </div>
                         <div class="key-value-pair">
                            <strong>Total Area:</strong> ${data.total_area}
                        </div>
                        <div class="key-value-pair">
                            <strong>Covered Area :</strong> ${data.covered_area}
                        </div>
                          <div class="key-value-pair">
                            <strong>Storage Capacity :</strong> ${data.storage_capacity}
                        </div>
                        <div class="key-value-pair">
                            <strong>Number of Floors :</strong> ${data.number_of_floors}
                        </div>
                         <div class="key-value-pair">
                            <strong>Loading Unloading Facility:</strong> 
                            <span>${data.loading_unloading_facility ? 'Available' : 'Not Available'}</span>              
                        </div>
                        <div class="key-value-pair">
                            <strong>Number of Loading Docks:</strong> ${data.number_of_loading_docks}
                        </div>
                    </div>
                    
                  <div class="key-value">
                          <div class="key-value-pair">
                            <strong>Security Measures:</strong> ${data.security_measures}
                        </div>
                        <div class="key-value-pair">
                            <strong>Types Of Goods Stored:</strong> ${data.types_of_goods_stored}
                        </div>
                         <div class="key-value-pair">
                            <strong>Temparature Controlled Storage:</strong>
                            <span>${data.temperature_controlled_storage ? 'Available' : 'Not Available'}</span>                       
                        </div>
                        <div class="key-value-pair">
                            <strong>Power Backup:</strong> 
                            <span>${data.power_backup_available ? 'Available' : 'Not Available'}</span>               
                        </div>
                         <div class="key-value-pair">
                            <strong>Material Handling Equipment :</strong>                 
                            <span>${data.availability_of_material_handling_equipment ? 'Available' : 'Not Available'}</span>
                        </div>
                        <div class="key-value-pair">
                            <strong>Nearest Highway Road Connectivity:</strong> ${data.nearest_highway_road_connectivity}
                        </div>
                        <div class="key-value-pair">
                            <strong>Distance from Railway :</strong> ${data.distance_from_nearest_railway_station} km
                        </div>
                        <div class="key-value-pair">
                            <strong>Distance from Airport :</strong> ${data.distance_from_nearest_airport} km
                        </div> 
                        <div class="key-value-pair">
                            <strong>Parking facility :</strong> 
                            <span>${data.availability_of_parking_facility ? 'Available' : 'Not Available'}</span>                          
                        </div>                    
                        <div class="key-value-pair">
                            <strong>Availibility Of transport Service :</strong> 
                            <span>${data.availability_of_transport_services ? 'Available' : 'Not Available'}</span>
                        </div>
                          <div class="key-value-pair">
                              <strong>Special features :</strong> ${data.special_features_or_facilities}
                          </div>
                          <div class="key-value-pair">
                              <strong>Renteal lease Terms :</strong> ${data.rental_lease_terms}
                          </div>
                          <div class="key-value-pair">
                              <strong>Remarks :</strong> ${data.remarks_additional_notes}
                          </div>
                           <div class="key-value-pair">
                              <strong>Status :</strong> 
                              <span class="${data.is_active? "status-green" : "status-red"}">
                                 ${data.is_active ? "Active" : "Not Active"}
                              </span>
                          </div>                                           
                  </div>
                  `;
    document.getElementById("ourgodown-details-box").innerHTML = html;
  }
  openPopup("ourgodown-detail-popup");
}


async function editLocation(e, id) {
    e.stopPropagation();
    alert("Do you want to edit ??");
    const form = document.getElementById("ourgodown-register-form");
    const inputs = Array.from(form.getElementsByTagName("INPUT"));
    const inputArray = inputs.concat(
      Array.from(form.getElementsByTagName("SELECT")).concat(Array.from(form.getElementsByTagName("textarea")))
    );
    const response = await request.GET_POST(`v1/ourgodown/${id}`, "GET");
    if (response.success) {
      for (const key in response.data[0]) {
        inputArray.forEach((item) => {
          if (key == item.id) {
            item.value = response.data[0][key];
          }
        });
      }
    }
    document.getElementById("godown-update-btn").dataset.godownid = id;
    openPopup("create-ourgodown-form-popup");
  }


async function updateOurLocationStatus(target, godownId) {
  changeStatus(target)
  await request.DEL_UPD(`v1/ourgodown/status/${godownId}`, 'PUT', {status: target.value})
}

renderOurGodowns();
