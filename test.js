const bcrypt = require('bcryptjs')

const hashedPassword = bcrypt.hashSync('1234', 10);
console.log(hashedPassword)

// INSERT INTO admin_auth (name, email, password, role)
// VALUES ('Nasim Ahmed', 'nasim@gmail.com', '$2a$10$UcgeQ1cmKuGcStLuSGZWReU2a4mGI/9de8wPGOHnv/lx9uSeN8WOi', 'admin');

async function getMsg(params) {
    const fet = await fetch(`https://wapapp.tittu.in/api/v1/templates?api_token=CiE1zP8BZz5RYggnPaEMiLHe53Vja0vPVEq4HLJJYyohXiprSeuPmZNHtSig`, {
        method: 'GET',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(body)
    })
    const res = await fet.json()
    console.log(res)
}

getMsg()


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
    } else {
        msgDescription.persons.forEach((item) => {
            const orderPlacedParams = `&template_uid=67acdc323b839&to=91${item.Number}&full_name=${encodeURIComponent(item.name)}&order_type=${encodeURIComponent(msgDescription.orderType)}&order_id=${msgDescription.orderID}&goods_description=${goods_description}&pick_location=${encodeURIComponent(msgDescription.pickLocation)}&drop_location=${encodeURIComponent(msgDescription.deliveryLocation)}`;
            msgApiCall(orderPlacedParams)
        });
    }
   
}

sendWhatsAppMsg({
    orderID: 34,
    persons: [{ name: 'Panchanan', Number: '6000192289' }],
    goodsDescription: 'milk and butter',
    deliveryPerson: 'rahul ali',
    agentContact: '9854876587',
    type: 'outfordelivery'
  })

// sendWhatsAppMsg({
//     goodsDescription: 'cold cream and milk, powder',
//     persons: [{name: 'Panchanan deka', Number: '6000192289'}, {name: 'sky rocket, Arjun', Number: '7002956967'}],
//     orderType: 'Part time load',
//     orderId: 234,
//     pickLocation: 'lokhra bylane 7',
//     deliveryLocation: 'beltola, near apart grind'
// })