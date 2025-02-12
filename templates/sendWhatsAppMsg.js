async function sendWhatsAppMsg(template, number, status) {
    const fet = await fetch(`https://wapapp.tittu.in/api/v1/directmessage?api_token=CiE1zP8BZz5RYggnPaEMiLHe53Vja0vPVEq4HLJJYyohXiprSeuPmZNHtSig&template_uid=${template}&to=${number}`, 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
)
    const res = await fet.json()
    console.log(res)
    return res;
}

// 6608386d62553
module.exports = sendWhatsAppMsg;