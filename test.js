// const bcrypt = require('bcryptjs')

// const hashedPassword = bcrypt.hashSync('1234', 10);

// console.log(hashedPassword)

async function sendMsg(params) {
    const fet = await fetch(``, {
        method: 'https://wapapp.tittu.in/api/v1/campaigns',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    const res = await fet.json()
    console.log(res)
}