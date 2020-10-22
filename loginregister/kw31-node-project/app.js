const express = require('express')
const app = express()
const port = 3000

// let pass='123456';
// var bcrypt = require('bcryptjs')
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync(pass,salt);
// console.log(hash);


// 解决vue的跨域问题
const cors = require('cors');
app.use(cors())


// const db = require('./db/config.js')
// db.query(`SELECT * FROM user_table`,(err,result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// })


const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// 接收json类型的数据
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/user', require('./routes/user.js') )

app.listen(port, () => console.log(`服务器已经启动了`))