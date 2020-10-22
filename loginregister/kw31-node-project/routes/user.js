const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');

const db = require('../db/config.js')

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// 接收json类型的数据
// parse application/json
router.use(bodyParser.json())

let responseData = {
    code: 0,
    message: ''
}

router.post('/register', (req, res) => {
    // console.log(req.body);
    let { regUserName, regPassword, checkPassword } = req.body;
    if (regUserName.trim() == '') {
        responseData.code = 1;
        responseData.message = "注册用户名不能为空";
        res.json(responseData);
        return;
    }
    if (regPassword.trim() == '') {
        responseData.code = 2;
        responseData.message = "注册密码不能为空";
        res.json(responseData);
        return;
    }
    if (regPassword.trim() != checkPassword.trim()) {
        responseData.code = 3;
        responseData.message = "两次密码不一致";
        res.json(responseData);
        return;
    }
    db.query(`SELECT username FROM user_table WHERE username='${regUserName}'`, (err, result) => {
        if (err) throw err;
        if (result.length != 0) {
            responseData.code = 4;
            responseData.message = "用户名已经存在";
            res.json(responseData);
            return;
        } else {
            var hash = bcrypt.hashSync(regPassword, 8)
            db.query(`INSERT INTO user_table(username,userpass) VALUES('${regUserName}','${hash}')`, (err, result) => {
                if (err) throw err;
                // console.log(result);
                responseData.code = 0;
                responseData.message = "注册成功";
                res.json(responseData);
            });
        }
        // console.log(result);
    })
})
router.post('/login', (req, res) => {
    // res.send('登录')
    let { logUserName, logPassword } = req.body;
    if (logUserName.trim() == '') {
        responseData.code = 1;
        responseData.message = "登录用户名不能为空";
        res.json(responseData);
        return;
    }
    if (logPassword.trim() == '') {
        responseData.code = 2;
        responseData.message = "登录密码不能为空";
        res.json(responseData);
        return;
    }
    db.query(`SELECT username,userpass FROM user_table WHERE username='${logUserName}'`, (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            responseData.code = 3;
            responseData.message = "用户名不存在";
            res.json(responseData);
            return;
        } else {
            // console.log(result);
            var checkpass = bcrypt.compareSync(logPassword, result[0].userpass);
            if (checkpass) {
                responseData.code = 0;
                responseData.message = "登录成功";
                res.json(responseData);
            } else {
                responseData.code = 4;
                responseData.message = "密码错误";
                res.json(responseData);
            }

        }
    })
})

module.exports = router;