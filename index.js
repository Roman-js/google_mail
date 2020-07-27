const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

var helper = require('sendgrid').mail;
var from_email = new helper.Email('rdmytrenko07@gmail.com');
var to_email = new helper.Email('liverkuzen1989@gmail.com');
var subject = 'Hello World from the SendGrid Node.js Library!';
var content = new helper.Content('text/plain', 'Hello, Email!');
var mail = new helper.Mail(from_email, subject, to_email, content);

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
    method: 'POST',
    path: '/sendMessage',
    body: mail.toJSON(),
});

sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
});




const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let smtp_login = process.env.SMTP_LOGIN || '';
let smtp_password = process.env.SMTP_PASSWORD || '';


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
        user: from_email, // generated ethereal user
        pass: 'Liverkuzen1989', // generated ethereal password
     },
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/sendMessage', async function (req, res) {
    // send mail with defined transport object

    let {message, contacts, name} = req.body;
    let info = await transporter.sendMail({
        from: 'HRs WANTS ME', // sender address
        to: to_email, // list of receivers
        subject:" HRs WANTS ME", // Subject line
        /* text: "Hello world?", // plain text body*/
        html: `<b>HСообщение с вашего портфолио</b>
               <div>name: ${name}</div>
               <div>contacts: ${contacts}</div>
               <div>message: ${message}</div>`, // html body
    });


    res.send(req.body);
});

let port = process.env.PORT || '';

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});


/*

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let smtp_login = process.env.SMTP_LOGIN || '';
let smtp_password = process.env.SMTP_PASSWORD || '';


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
        user: 'rdmytrenko07@gmail.com', // generated ethereal user
        pass: 'Liverkuzen1989', // generated ethereal password
     },
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/sendMessage', async function (req, res) {
    // send mail with defined transport object

    let {message, contacts, name} = req.body;
    let info = await transporter.sendMail({
        from: 'HRs WANTS ME', // sender address
        to: "liverkuzen1989@gmail.com", // list of receivers
        subject:" HRs WANTS ME", // Subject line
        /!* text: "Hello world?", // plain text body*!/
        html: `<b>HСообщение с вашего портфолио</b>
               <div>name: ${name}</div>
               <div>contacts: ${contacts}</div>
               <div>message: ${message}</div>`, // html body
    });


    res.send(req.body);
});

let port = process.env.PORT || '';

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});

*/


