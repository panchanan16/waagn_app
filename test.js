const bcrypt = require('bcryptjs')

const hashedPassword = bcrypt.hashSync('1234', 10);

console.log(hashedPassword)

// INSERT INTO admin_auth (name, email, password, role)
// VALUES ('Nasim Ahmed', 'nasim@gmail.com', '$2a$10$UcgeQ1cmKuGcStLuSGZWReU2a4mGI/9de8wPGOHnv/lx9uSeN8WOi', 'admin');

// async function sendMsg(params) {
//     const fet = await fetch(``, {
//         method: 'https://wapapp.tittu.in/api/v1/campaigns',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body)
//     })
//     const res = await fet.json()
//     console.log(res)
// }