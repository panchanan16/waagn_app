const request = new DataCall();

document.getElementById('partner-name').textContent = sessionStorage.getItem('partnername')

async function renderAllPartnerOrder() {
    const partnerID = sessionStorage.getItem('partnerid')
    const response = await request.GET_POST(`v1/assign/orders/${partnerID}`, "GET");
    if (response.success) {
        console.log(response)
        document.getElementById("order-table").innerHTML = "";
        response.data[0].forEach((item, ind) => {
            const html = `<tr class="table-rows" onclick="openPartnerOrderDetails(${item.order_id
                })">
            <td>${item.order_id}</td>
            <td>${item.company_name}</td>
            <td>${item.receiver_name}</td>
            <td><span class="${item.order_status == "delivered" ? "status-green" : "status-red"
                }">${item.order_status}</span></td>
            <td>${item.receiver_town}</td>
            <td><button class="btn" onclick="acceptOrder(event, ${item.order_id
                })">
            ${item.is_partner_accepted ? "Accepted" : "Accept Now"}
            </button>
            </td>
            </tr>`;
            document.getElementById("order-table").innerHTML += html;
        });

        renderSummary(response.data[1], 'order_status')
        document.getElementById('pending-acceptance').textContent = response.data[1][0]['pending_acceptance']
        document.getElementById('accepted-order').textContent = response.data[1][0]['total'] - response.data[1][0]['pending_acceptance']
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
                <strong>Tax Invoice No. :</strong> ${data.tax_invoice_number}
            </div>
             <div class="key-value-pair">
                <strong>Order Status :</strong> 
                <span class="${data.order_status == "delivered" ? "status-green" : "status-red"}">
                    ${data.order_status}
                </span>
            </div>

             <div class="key-value-pair">
                <strong>Update Status:</strong>
                <select class="${data.order_status == "delivered" ? "status-green" : "status-red"}" onchange="updateOrderStatus(this, ${
                  data.order_id
                })">    
                    <option value="" selected disabled>Update Status</option>                   
                    <option value="arrived">Arrived At Destination</option>
                    <option value="outfordelivery">Out For Delivery</option> 
                    <option value="delivered">Delivered</option>
                    <option value="notdelivered">Not Delivered</option>
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
                <strong>Length Of Box :</strong> ${data.length_of_box}
            </div>
            <div class="key-value-pair">
                <strong>Breadth Of Box :</strong> ${data.breadth_of_box}
            </div>
            <div class="key-value-pair">
                <strong>Height Of Box :</strong> ${data.height_of_box}
            </div>
            <div class="key-value-pair">
                <strong>Volume :</strong> ${data.volume_of_consignment}
            </div>
            <div class="key-value-pair">
                <strong>Number of boxes :</strong> ${data.number_of_boxes}
            </div>
            <div class="key-value-pair">
                <strong>Actual Weight :</strong> ${data.actual_weight_of_consignment} kg
            </div>
            <div class="key-value-pair">
                <strong>Goods Type :</strong> ${data.types_of_goods}
            </div>
            <div class="key-value-pair">
                <strong>Risk Of Goods :</strong> ${data.consignment_risk}
            </div>
             <div class="key-value-pair">
                <strong>Insurance. :</strong> ${data.insurance}
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
            <div class="key-value-pair">
                <strong>Amount collected:</strong> ${data.collected_amount}
            </div>
        </div>

        <div class="key-value flex flex-col" style="gap: 1rem;">
            <h2 class="flex details-heading">COMMENTS</h2>
            <div class="key-value-pair">
                <strong>Reason Of Fail Delivery :</strong>
                <span> ${data.reason_of_fail_delivery}</span>
            </div>
            <div class="key-value-pair flex flex-col hide" id="reason-box">
                <textarea style="padding: .8rem" id="reason_of_fail_delivery" placeholder="Reason for not delivered..." name="reason_of_fail_delivery" required></textarea>
                <button class="btn" onclick="updateReasonOfDeliveryFail(this, ${data.order_id})">Update</button>
            </div>
           
            <div class="key-value-pair ${data.order_status == 'delivered' && data.payment_status == 'topay' ? '' : 'hide'}" id="collected-amount-box">
                <input style="padding:10px" type="text" name="collected_amount" id="collected_amount" placeholder="Update collected amount...">
                <button class="btn" onclick="updateAmountCollected(this, ${data.order_id})">Update</button>
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


async function renderGodownListInAssignForm(target) {
    const partnerId = document.getElementById('partner_id').value
    const type = target.value
    if (partnerId && type) {
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


async function updateOrderStatus(target, orderId) {
    changeStatus(target)
    const response = await request.DEL_UPD(`v1/order/status/${orderId}`, "PUT", {
      order_status: target.value,
    });
    if (target.value == "notdelivered") {
       document.getElementById('reason-box').classList.remove('hide')
    }
  }

async function updateReasonOfDeliveryFail(target, id) {
    const text = target.parentNode.querySelector('#reason_of_fail_delivery').value
    if (text != "") {
        const response = await request.DEL_UPD(`v1/assign/partner/fail/${id}`, 'PUT', {text})
    } else {
        alert('Type the reason First then update!')
    }
}


async function updateAmountCollected(target, id) {
    const collectedAmount = target.parentNode.querySelector('#collected_amount').value
    if (collectedAmount != "") {
        const response = await request.DEL_UPD(`v1/dispatch/amount/${id}`, 'PUT', {collectedAmount})
    } else {
        alert('Type the reason First then update!')
    }
}

renderAllPartnerOrder();
