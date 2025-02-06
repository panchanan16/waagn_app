const request = new DataCall();

async function renderAllOrder() {
  const response = await request.GET_POST("v1/orders", "GET");
  if (response.success) {
    document.getElementById("order-table").innerHTML = "";
    response.data.forEach((item, ind) => {
      const html = `<tr class="table-rows" onclick="openOrderDetails(${item.order_id})">
            <td class="search-item">${item.order_id}</td>
            <td class="search-item">${item.shipper_company_name}</td>
            <td >${item.receiver_company_name}</td>
            <td>${item.shipper_contact_number}</td>
            <td>${item.order_date}</td>
            <td>
                <diV style="cursor: pointer;" onclick="editOrder(event, ${item.order_id})">
                    <i class="material-icons">app_registration</i> 
                </div>
            </td>
            </tr>`;
      document.getElementById("order-table").innerHTML += html;
    });
  }
}

function openOrderDetails(orderid) {
  renderOrderDetails(orderid);
  openPopup("order-detail-popup");
}

async function createOrderFromAdmin(e) {
  e.preventDefault();
  const formData = new FormData(
    document.getElementById("order-create-form-admin")
  );
  const response =
    e.target.dataset.orderid != ""
      ? await request.GET_POST(
          `v1/order/${e.target.dataset.orderid}`,
          `PUT`,
          formData,
          "form"
        )
      : await request.GET_POST("v1/order", `POST`, formData, "form");
  if (response.success) {
    renderAllOrder();
    document.getElementById("order-create-form-admin").reset();
  }
}

async function openAddPartnerForm(orderId, target) {
  document.getElementById("order-id-input").value = orderId;
  const response = await request.GET_POST("v1/partners/drop", "GET");
  console.log(response);
  if (response.success) {
    document.getElementById("partner-dropdown").innerHTML = "";
    response.data.forEach((item) => {
      const html = `<option value="${item.company_id}">${item.company_name}</option>`;
      document.getElementById("partner-dropdown").innerHTML += html;
    });
  }
  target.dataset.psid != ""
    ? (document.getElementById("update-partner-btn").dataset.psid =
        target.dataset.psid)
    : (document.getElementById("update-vehicle-btn").dataset.psid = "");
  openPopup("select-3pl-box");
}

async function openAddVehicleForm(orderId, target) {
  document.getElementById("order-id-input-vh").value = orderId;
  const msgTarget = document.getElementById("msg-for-driver");
  msgTarget.textContent != "null"
    ? (document.getElementById("msg-for-driver-inp").value =
        msgTarget.textContent)
    : "";
  const response = await request.GET_POST("v1/vehicles/drivers", "GET");
  if (response.success) {
    document.getElementById("search-list").innerHTML = "";
    response.data.forEach((item) => {
      const html = `<li class="vh-num-li" onclick="selectVehicle(this, ${item.vehicle_id}, ${item.driver_id}, '${item.driver_name}')">${item.registration_number}</li>`;
      document.getElementById("search-list").innerHTML += html;
    });
  }
  target.dataset.vsid != ""
    ? (document.getElementById("update-vehicle-btn").dataset.vsid =
        target.dataset.vsid)
    : (document.getElementById("update-vehicle-btn").dataset.vsid = "");
  openPopup("select-vehicle-box");
}

async function renderGodownLocationInForm() {
  const partnerId = document.getElementById("partner-dropdown").value;
  const type = document.getElementById("godown-type-dropdown").value;
  if (partnerId && type) {
    console.log(partnerId, type);
    const response = await request.GET_POST(
      `v1/godowns/${partnerId}/${type}`,
      "GET"
    );
    if (response.success) {
      document.getElementById("godown-location-dropdown").innerHTML = "";
      if (response.data.length > 0) {
        response.data.forEach((item) => {
          document.getElementById(
            "godown-location-dropdown"
          ).innerHTML += `<option value="${item.godown_id}">${item.full_address}</option>`;
        });
      } else {
        document.getElementById(
          "godown-location-dropdown"
        ).innerHTML = `<option value="" disable>No location added</option>`;
      }
    }
  }
}

async function renderVehiclesInForm() {
  const partnerId = document.getElementById("partner-dropdown").value;
  const type = document.getElementById("godown-type-dropdown").value;
  if (partnerId && type) {
    console.log(partnerId, type);
    const response = await request.GET_POST(`v1/godowns/3/${type}`, "GET");
    if (response.success) {
      document.getElementById("godown-location-dropdown").innerHTML = "";
      response.data.forEach((item) => {
        document.getElementById(
          "godown-location-dropdown"
        ).innerHTML += `<option value="${item.godown_id}">${item.full_address}</option>`;
      });
    }
  }
}

async function renderOrderDetails(id) {
  const response = await request.GET_POST(`v1/order/${id}`, "GET");
  if (response.success) {
    const data = response.data[0];
    console.log(data)
    const html = `<div class="key-value-box scroll-box" style="justify-content: space-around; margin-block: 1rem;">
        <div class="key-value">
            <h2 class="flex details-heading">BOOKING DETAILS</h2>
            <div class="key-value-pair">
                <strong>OrderId:</strong> ${data.order_id}
            </div>            
            <div class="key-value-pair">
                <strong>Pickup Location:</strong> ${
                  data.pickup_location_address
                }
            </div>
            <div class="key-value-pair">
                <strong>Drop Location:</strong>${data.delivery_location_address}
            </div>
            <div class="key-value-pair">
                <strong>Amount:</strong>${data.amount}
            </div>
             <div class="key-value-pair">
                <strong>Payment Mode:</strong>${data.payment_mode}
            </div>
            <div class="key-value-pair">
                <strong>Payment Status:</strong>${data.payment_status}
            </div>

             <div class="key-value-pair">
                <strong>Order Status:</strong>
                <select class="status-red" onchange="updateOrderStatus(this, ${
                  data.order_id
                })">
                    <option value="pending" ${
                      data.order_status == "pending" ? "selected" : ""
                    }>Pending</option>

                    <option value="driver" ${
                      data.order_status == "driver" ? "selected" : ""
                    }>Driver Assigned</option>

                    <option value="pickupprogress" ${
                      data.order_status == "pickupprogress" ? "selected" : ""
                    }>Pickup In Progress</option>

                    <option value="pickupcompleted" ${
                      data.order_status == "pickupcompleted" ? "selected" : ""
                    }>Pickup Completed</option>

                    <option value="transit" ${
                      data.order_status == "transit" ? "selected" : ""
                    }>In transit to 3PL</option>      

                    <option value="arrived" ${
                      data.order_status == "arrived" ? "selected" : ""
                    }>Arrived At Destination</option>

                    <option value="outfordelivery" ${
                      data.order_status == "outfordelivery" ? "selected" : ""
                    }>Out For Delivery</option> 

                    <option value="delivered" ${
                      data.order_status == "delivered" ? "selected" : ""
                    }>Delivered</option>
                </select>
            </div>
        </div>
        <div class="key-value">
            <h2 class="flex details-heading">CONSIGNOR</h2>
            <div class="key-value-pair">
                <strong>Consignor Company:</strong> ${data.shipper_company_name}
            </div>
            <div class="key-value-pair">
                <strong>Consignor Name:</strong> ${data.shipper_name}
            </div>
            <div class="key-value-pair">
                <strong>Consignor Number:</strong> ${data.shipper_contact_number}
            </div>
            <div class="key-value-pair">
                <strong>Consignor Email:</strong> ${data.shipper_email_address}
            </div>
             <div class="key-value-pair">
                <strong>Consignor GST :</strong> ${data.shipper_gst}
            </div>  
            <div class="key-value-pair">
                <strong>City:</strong>  ${data.shipper_town}
            </div>
            <div class="key-value-pair">
                <strong>Pincode:</strong>  ${data.shipper_pincode}
            </div>      
        </div>
        <div class="key-value">
            <h2 class="flex details-heading">3PL PARTNER</h2>
             <div class="key-value-pair">
                <strong>Accepted By 3PL:</strong>
                <span class="${data.is_partner_accepted ? 'status-green' : 'status-red'}">
                ${data.is_partner_accepted ? 'Accepted' : 'Not Yet'}
                </span>
            </div>
             <div class="key-value-pair">
                <strong>3PL Name: </strong> ${data.company_name}
            </div>
            <div class="key-value-pair">
                <strong>Godown Location:</strong> <span class="">${
                  data.full_address
                }</span>
            </div>
            <div class="key-value-pair">
                <strong>Godown Manager:</strong>${data.contact_person_name}
            </div>
            <div class="key-value-pair">
                <strong>Godown Contact:</strong> ${data.godown_contact}
            </div>
        </div>

        <div class="key-value">
            <h2 class="flex details-heading">PICKUP DETAILS</h2>
            <div class="key-value-pair">
                <strong>Vehicle Number:</strong> 
                <span data-vehicleid="${
                  typeof data.vehicle_id == "number" ? data.vehicle_id : ""
                }">
                ${data.registration_number}
                </span>
            </div>
            <div class="key-value-pair">
                <strong>Driver Name:</strong>
                <span data-driverid="${
                  typeof data.driver_id == "number" ? data.driver_id : ""
                }">
                ${data.driver_name}
                </span>
            </div>
            <div class="key-value-pair">
                <strong>Message for Driver:</strong> <span class="" id="msg-for-driver">${
                  data.msg_for_driver
                }</span>
            </div>      
        </div>  

        <div class="key-value">
            <h2 class="flex details-heading">GOODS INFORMATION</h2>
            <div class="key-value-pair">
                <strong>Length Of Box:</strong> <span class="status-green">delivered</span>
            </div>
            <div class="key-value-pair">
                <strong>Breadth Of Box:</strong> John Doe
            </div>
            <div class="key-value-pair">
                <strong>Height Of Box:</strong><span class=""></span>
            </div>
            <div class="key-value-pair">
                <strong>Volume :</strong> Los Angeles, CA
            </div>
            <div class="key-value-pair">
                <strong>Number of boxes :</strong> Los Angeles, CA
            </div>
            <div class="key-value-pair">
                <strong>Actual Weight :</strong> Los Angeles, CA
            </div>
            <div class="key-value-pair">
                <strong>Goods Type :</strong> Los Angeles, CA
            </div>
        </div>              

        <div class="key-value">
            <h2 class="flex details-heading">CONSIGNEE</h2>
            <div class="key-value-pair">
                <strong>Consignee Company:</strong>  ${data.receiver_company_name}
            </div>
            <div class="key-value-pair">
                <strong>Consignee Name:</strong>  ${data.receiver_name}
            </div>
            <div class="key-value-pair">
                <strong>Consignee Number:</strong>  ${data.receiver_contact_number}
            </div>
            <div class="key-value-pair">
                <strong>Consignee Email:</strong>  ${data.receiver_email_address}
            </div>
            <div class="key-value-pair">
                <strong>Consignee GST:</strong>  ${data.receiver_gst}
            </div>
            <div class="key-value-pair">
                <strong>City:</strong>  ${data.receiver_town}
            </div>
            <div class="key-value-pair">
                <strong>Pincode:</strong>  ${data.receiver_pincode}
            </div>
        </div>

        <div class="key-value">
            <h2 class="flex details-heading">DELIVERY DETAILS</h2>
            <div class="key-value-pair">
                <strong>Assigned Vehicle:</strong> ${data.partner_cart}
            </div>
            <div class="key-value-pair">
                <strong>Assined Driver:</strong> ${data.assigned_driver_name}
            </div>
            <div class="key-value-pair">
                <strong>Driver Number:</strong> ${data.assigned_driver_number}
            </div>
            <div class="key-value-pair">
                <strong>E WAY BILL NO:</strong> ${data.e_way_bill_no}
            </div>
            <div class="key-value-pair">
                <strong>Actual Weight:</strong> ${data.actual_weight}
            </div>
            <div class="key-value-pair">
                <strong>Charged Weight:</strong> ${data.charged_weight}
            </div>
             <div class="key-value-pair">
                <strong>Amount By Partner:</strong> ${data.partner_amount}
            </div>
        </div>

        <div class="key-value flex flex-col" style="gap: 1rem;">
            <h2 class="flex details-heading">COMMENTS</h2>
            <div class="key-value-pair form-row">
                <input type="text" name="amount" value="1000">
                <button class="btn">Update</button>
            </div>
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
    </div>
    <div class="flex" style="gap: 1rem">
        <button 
        class="btn"
        data-psid="${
          typeof data.p_assign_id == "number" ? data.p_assign_id : ""
        }" 
        onclick="openAddPartnerForm(${data.order_id}, this)"
        >  
        ${data.partner_assign_status ? "Update Partner" : "Assign 3pl Partner"}
        </button>

        <button 
        class="btn"         
        data-vsid="${
          typeof data.v_assign_id == "number" ? data.v_assign_id : ""
        }"
        onclick="openAddVehicleForm(${data.order_id}, this)"
        data-vsid="${data.vehicle_assign_status ? data.v_assign_id : ""}"
        >
          ${
            data.vehicle_assign_status
              ? "Update Vehicle"
              : "Assign Pickup Vehicle"
          }
        </button>
        <a href="/testing" target="_blank">
          <button class="btn">Download</button>
        </a>
    </div>`;
    document.getElementById("order-details-box").innerHTML = html;
  }
}

async function assignPartnerToOrder(e) {
  e.preventDefault();
  const formData = new FormData(document.getElementById("assign-partner-form"));
  const response = e.target.dataset.psid != ""
    ? await request.GET_POST(
        `v1/assign/partner/${e.target.dataset.psid}`,
        "PUT",
        formData,
        "form"
      )
    : await request.GET_POST(`v1/assign/partner`, "POST", formData, "form");
    if (response.success) {
      closePopup('select-3pl-box', 'form', 'update-partner-btn', 'psid', 'assign-partner-form')
    }
}

async function assignVehicleToOrder(e) {
  e.preventDefault();
  const formData = new FormData(document.getElementById("assign-vehicle-form"));
  const response = e.target.dataset.vsid != ""
    ? await request.GET_POST(
        `v1/assign/vehicle/${e.target.dataset.vsid}`,
        "PUT",
        formData,
        "form"
      )
    : await request.GET_POST(`v1/assign/vehicle`, "POST", formData, "form");
    if (response.success) {
      closePopup('select-vehicle-box', 'form', 'update-vehicle-btn', 'vsid', 'assign-vehicle-form')
    }
}

function selectVehicle(target, vehicleId, driverId, driverName) {
  document.getElementById("vehicle-dropdown").value = target.textContent;
  document.getElementById("driver-name-inp").value = driverName;
  document.getElementById("driver-driverid-inp").value = driverId;
  document.getElementById("driver-vehicleid-inp").value = vehicleId;
  closePopup("search-input");
}

async function updateOrderStatus(target, orderId) {
  const response = await request.DEL_UPD(`v1/order/status/${orderId}`, "PUT", {
    order_status: target.value,
  });
}

async function editOrder(e, orderid) {
  e.stopPropagation();
  alert("Edited successfully!");
  const form = document.getElementById("order-create-form-admin");
  const inputs = Array.from(form.getElementsByTagName("INPUT"));
  const inputArray = inputs.concat(
    Array.from(form.getElementsByTagName("SELECT"))
  );
  const response = await request.GET_POST(`v1/order/update/${orderid}`, "GET");
  if (response.success) {
    for (const key in response.data[0]) {
      inputArray.forEach((item) => {
        if (key == item.id) {
          item.value = response.data[0][key];
        }
      });
    }
  }
  document.getElementById("order-update-btn").dataset.orderid = orderid;
  openPopup("create-order-form-popup");
}

async function searchOrder(target, className, type) {
  if (type == "db") {
    const query = target.parentNode.getElementsByTagName("INPUT")[0].value;
    const response = await request.GET_POST(`v1/order/${query}`, "GET");
    if (response.success && response.data.length > 0) {
      const item = response.data[0]
        const html = `<tr class="table-rows" id="onsearch" onclick="openOrderDetails(${item.order_id})">
              <td class="search-item">${item.order_id}</td>
              <td class="search-item">${item.shipper_company_name}</td>
              <td class="search-item">${item.receiver_company_name}</td>
              <td>${item.shipper_contact_number}</td>
              <td>${item.order_date}</td>
              <td>
                  <diV style="cursor: pointer;" onclick="editOrder(event, ${item.order_id})">
                      <i class="material-icons">app_registration</i> 
                  </div>
              </td>
              </tr>`;
        document.getElementById("order-table").innerHTML += html;
        searchItemsGlobal(undefined, 'table-rows', query, 'onsearch')
    } else {
      alert('No order found!')
    }
  }
}

renderAllOrder();
