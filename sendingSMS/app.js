const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'views' });
});

app.post('/sendmessage', (req, res) => {
    sendSMS(req.body.number, res);
    console.log(req.body.number);
});

function sendSMS(number, res) {
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    client.messages
        .create({
            body: 'Hi User, This is a message from Numetry Technology',
            from: process.env.FROM,
            to: number
        })
        .then(message => {
            res.send("SMS sent Successfully");
            console.log("Message Sent", message.sid);
        })
        .catch(err => {
            res.status(500).send("SMS Not sent");
            console.error("Message Not Sent", err);
        });
}

app.listen(5000, () => console.log('Listening at port 5000'));