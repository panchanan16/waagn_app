const request = new DataCall();

async function renderAllPartnerOrder() {
    const response = await request.GET_POST("v1/assign/partners", "GET");
    if (response.success) {
        document.getElementById("order-table").innerHTML = "";
        response.data.forEach((item, ind) => {
            const html = `<tr class="table-rows" onclick="openPartnerOrderDetails(${item.order_id
                })">
            <td>${item.order_id}</td>
            <td>${item.company_name}</td>
            <td>${item.full_address}</td>
            <td><span class="${item.order_status == "delivered" ? "status-green" : "status-red"
                }">${item.order_status}</span></td>
            <td>${item.contact_person_name}</td>
            <td><button class="btn" onclick="acceptOrder(event, ${item.order_id
                })">
            ${item.is_accepted == "accepted" ? "Accepted" : "Accept Now"}
            </button>
            </td>
            </tr>`;
            document.getElementById("order-table").innerHTML += html;
        });
    }
}

async function renderPartnerOrderDetails(id) {
    const response = await request.GET_POST(`v1/order/${id}`, "GET");
    if (response.success) {
        const data = response.data[0];
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
                <select class="${data.order_status == "delivered" ? "status-green" : "status-red"}" onchange="updateOrderStatus(this, ${
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
        class="btn ${data.is_partner_accepted ? "" : "hide"}" 
        onclick="openDispatchForm(${data.order_id}, ${data.dispatchId})"
        >  
         ${data.dispatchId != null ? 'Update Dispatch' : 'Assign Now'}
        </button>
    </div>`

    document.getElementById("order-details-box").innerHTML = html;
    }
}

function openPartnerOrderDetails(orderid) {
    renderPartnerOrderDetails(orderid);
    openPopup("order-detail-popup");
}

async function openDispatchForm(orderId, dispatchId) {
    if (dispatchId !== null) {
        const response = await request.GET_POST(`v1/dispatch/${orderId}`, "GET");
        const from = document.getElementById('dispatch-details-form')
        const inputs = Array.from(from.getElementsByTagName('INPUT')).concat(Array.from(from.getElementsByTagName('SELECT')))
        for (const key in response.data[0]) {
            inputs.forEach((item) => {
                if (item.id === key) {
                    item.value = response.data[0][key]
                }
            })
        }
        document.getElementById('dispatch-btn').dataset.dispatchid = response.data[0].partner_assigned_orderid
        openPopup("select-3pl-box");
    } else {
        const response = await request.GET_POST(`v1/assign/partner/${orderId}`, "GET");
        if (response.success) {
            document.getElementById("partner_id").value = response.data[0].partner_id;
            document.getElementById("order_id").value = orderId;
            openPopup("select-3pl-box");
        } else {
            alert('Something Went Wrong!')
        }
    }
}

async function addDispatchDetails(e) {
    e.preventDefault();
    const formData = new FormData(
        document.getElementById("dispatch-details-form")
    );

    const response = e.target.dataset.dispatchid != "" ? await request.GET_POST(`v1/dispatch/${e.target.dataset.dispatchid}`, "PUT", formData, "form") : await request.GET_POST("v1/dispatch", "POST", formData, "form");
    if (response.success) { closePopup('select-3pl-box', 'form', 'dispatch-btn', 'dispatchid', 'dispatch-details-form') }

}

async function acceptOrder(e, orderID) {
    e.stopPropagation();
    alert(`Accepted Successfully For ${orderID}!`);
    const response = await request.DEL_UPD(
        `v1/assign/partner/status/${orderID}`,
        "PUT",
        { id: "4" }
    );
    if (response.success) {
        renderAllPartnerOrder();
    }
}

renderAllPartnerOrder();
