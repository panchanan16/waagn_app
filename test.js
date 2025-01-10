const bcrypt = require('bcryptjs')

const hashedPassword = bcrypt.hashSync('1234', 10);

console.log(hashedPassword)