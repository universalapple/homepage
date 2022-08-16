var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
// var app = require('../app');
var app = express();
var router = express.Router();
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        // メールアドレス
        user: "pocketspla@gmail.com",
        // 16桁のアプリパスワード
        // !!サーバーの環境関数に保存すべきでしょう!!
        pass: "fcineaschztjdnxc",
    },
});

app.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('form', { title: 'Express', content: 'GET' });
});
router.post('/', function (req, res, next) {
    var msg = 'POST: ' + req.body.name + ', ' + req.body.message;
    res.render('form', { title: 'Express', content: msg });
});

router.post('/complete', function(req, res, next) {
    res.render('complete', { title: 'Express', name: req.body.name, message: req.body.message });
    var msg = req.body.name + ': ' + req.body.message;
    transporter.sendMail(
        {
            from: "pocketspla@gmail.com",
            to: "pocketspla@gmail.com",
            subject: "try nodemailer",
            text: msg,
        }, function (error, info) {
            if (error) {
                console.error(error);
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        }
    );
});

module.exports = router;