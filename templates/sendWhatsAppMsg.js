async function msgApiCall(endpoint) {
    const BASE_URL = `https://wapapp.tittu.in/api/v1/directmessage?`;
    const API_TOKEN = `api_token=CiE1zP8BZz5RYggnPaEMiLHe53Vja0vPVEq4HLJJYyohXiprSeuPmZNHtSig`;
    const API_URL = BASE_URL + API_TOKEN + endpoint;
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    const res = await response.json()
    console.log(res)
    return res
}

async function sendWhatsAppMsg(msgDescription) {

    const goods_description = encodeURIComponent(msgDescription.goodsDescription)
    if (msgDescription.type == 'outfordelivery') {
        msgDescription.persons.forEach((item) => {
            const outForDeliveryParams = `&template_uid=67acf4afb2199&to=91${item.Number}&full_name=${encodeURIComponent(item.name)}&order_id=${msgDescription.orderID}&goods_description=${goods_description}&delivery_person=${encodeURIComponent(msgDescription.deliveryPerson)}&agent_contact=${encodeURIComponent(msgDescription.agentContact)}`;
            msgApiCall(outForDeliveryParams)
        });
    } else if (msgDescription.type == 'orderplaced') {
        msgDescription.persons.forEach((item) => {
            const orderPlacedParams = `&template_uid=67acdc323b839&to=91${item.Number}&full_name=${encodeURIComponent(item.name)}&order_type=${encodeURIComponent(msgDescription.orderType)}&order_id=${msgDescription.orderID}&goods_description=${goods_description}&pick_location=${encodeURIComponent(msgDescription.pickLocation)}&drop_location=${encodeURIComponent(msgDescription.deliveryLocation)}`;
            msgApiCall(orderPlacedParams)
        });
    } else if (msgDescription.type == 'driverAssigned') {
        msgDescription.persons.forEach((item) => {
            const driverAssignParams = `&template_uid=67b84f3b3d678&to=91${item.Number}&full_name=${encodeURIComponent(item.name)}&driver_name=${encodeURIComponent(msgDescription.driverName)}&order_id=${msgDescription.orderID}&driver_number=${msgDescription.driverNumber}&vehicle_number=${encodeURIComponent(msgDescription.vehicleNumber)}`;
            msgApiCall(driverAssignParams)
        });
    }
   
}

// 6608386d62553
module.exports = sendWhatsAppMsg;
