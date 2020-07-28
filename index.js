const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let smtp_login = process.env.SMTP_LOGIN || '';
let smtp_password = process.env.SMTP_PASSWORD || '';


let transporter = nodemailer.createTransport({
/*
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    /!*host: 'gmail',*!/
    auth: {
        user: smtp_login, // generated ethereal user
        pass:smtp_password, // generated ethereal password
     },*/

    host: 'imap.rambler.ru',
    port: 995,
    auth: {
        user: 'pilesos9@rambler.ru',
        pass: 'Roman371789'
    }
});


/*
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
        type: 'OAuth2'
    }
});

transporter.set('oauth2_provision_cb', (user, renew, callback) => {
    let accessToken = userTokens['rdmytrenko07@gmail.com'];
    if(!accessToken){
        return callback(new Error('Unknown user'));
    }else{
        return callback(null, accessToken);
    }
});

transporter.sendMail({
    from: 'rdmytrenko07@gmail.com',
    to: 'liverkuzen1989@gmail.com',
    subject: 'Message',
    text: 'I hope this message gets through!',
    auth: {
        user: 'user@example.com'
    }
});
*/

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
        /* text: "Hello world?", // plain text body*/
        html: `<b>HСообщение с вашего портфолио</b>
               <div>name: ${name}</div>
               <div>contacts: ${contacts}</div>
               <div>message: ${message}</div>`, // html body
    });

    res.send(req.body);
});

let port = process.env.PORT || ''; //3010

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});



