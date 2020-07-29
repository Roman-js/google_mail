const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors(/*{
    origin: 'https://roman-js.github.io/Portfolio/'
}*/
));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let smtp_login = process.env.SMTP_LOGIN || '';
let smtp_password = process.env.SMTP_PASSWORD || '';


const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    service:'yahoo',
    secure: false,
    auth: {
        user: smtp_login,
        pass: smtp_password
    },
    debug: false,
    logger: true /*.  <---highly recommend this one here*/
});


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/sendMessage', async function (req, res) {
    // send mail with defined transport object

    let {message, contacts, name} = req.body;
    let info = await transporter.sendMail({
        from: 'romand07@yahoo.com', // sender address
        to: "liverkuzen1989@gmail.com", // list of receivers
        subject:" HRs WANTS ME", // Subject line
        html: `<b>HСообщение с вашего портфолио</b>
               <div>name: ${name}</div>
               <div>contacts: ${contacts}</div>
               <div>message: ${message}</div>`, // html body
    });
    res.send(req.body);
});

let port = process.env.PORT || 3010;

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});



