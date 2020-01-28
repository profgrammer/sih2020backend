const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const body = "Hello suicide squad (again) from twilio!";
const number = "+919819702550";
const numbers = ["+919819702550", "+919699624212", "+919619745680","+918779132038","+918369910143","+919004064192"];
const numbers2 = ["+919699624212","+918369910143"];

const singleMessage = (number, body) => {
    twilio.messages.create({
        to: number,
        from: process.env.TWILIO_NUMBER,
        body
    }).then(message => console.log(message))
    .catch(error => console.log(error));
};

const bulkMessages = (numbers, body) => {
    Promise.all(
        numbers.map(number => {
            return twilio.messages.create({
                to:number,
                from: process.env.TWILIO_NUMBER,
                body
            });
        })
    ).then(messages => console.log(messages))
    .catch(error => console.error(error));
}

// const notifyBulkMessages = (numbers, body) => {
//     const bindings = numbers.map(number => {
//     return JSON.stringify({ binding_type: 'sms', address: number });
//     });
//     notification = service.notifications
//     .create({
//             toBinding: bindings,
//             body: body
//     })
//     .then(() => {
//             console.log(notification);
//     })
//     .catch(err => {
//             console.error(err);
//     });

// }

const validateNumber = (friendlyName, phoneNumber) => {
    console.log("hi");
    twilio.validationRequests
    .create({friendlyName,phoneNumber})
    .then(validation_request => console.log(`request: ${validation_request}`))
    .catch(error => console.error(error));
}

const sendBulkEmail = msgs => {
    sgMail.send(msgs)
    .then(() => console.log("emails sent successfully!"))
    .catch(error => console.error(error));
}

const msgs = [
    {
        "to": "divya.khetan@somaiya.edu",
        "from": "Prafful Javare <javarep4199@gmail.com>",
        "subject": "Hi Divya! 😍😍",
        "text": "Hello divya!!",
        "html": "<p>Hello divya!!</p>"
    },
    {
        "to": "ahan.shetty@somaiya.edu",
        "from": "Prafful Javare <javarep4199@gmail.com>",
        "subject": "Hi Ahaan! 😍😍",
        "text": "Hello ahaan!!",
        "html": "<p>Hello ahaan!!</p>"
    },
    {
        "to": "chinmay.kamerkar@somaiya.edu",
        "from": "Prafful Javare <javarep4199@gmail.com>",
        "subject": "Hi chinmay! 😍😍",
        "text": "Hello chinmay!!",
        "html": "<p>Hello chinmay!!</p>"
    },
    {
        "to": "yash.gupte@somaiya.edu",
        "from": "Prafful Javare <javarep4199@gmail.com>",
        "subject": "Hi yash! 😍😍",
        "text": "Hello yash!!",
        "html": "<p>Hello yash!!</p>"
    },
    {
        "to": "shivashish.j@somaiya.edu",
        "from": "Prafful Javare <javarep4199@gmail.com>",
        "subject": "Hi shivashish! 😍😍",
        "text": "Hello shivashish!!",
        "html": "<p>Hello shivashish!!</p>"
    },
    {
        "to": "prafful.j@somaiya.edu",
        "from": "Prafful Javare <javarep4199@gmail.com>",
        "subject": "Hi prafful! 😍😍",
        "text": "Hello prafful!!",
        "html": "<p>Hello prafful!!</p>"
    }
]

// validateNumber("Shobha", "+919819508274");

// bulkMessages(numbers, body);

// notifyBulkMessages(numbers, "hello from notify service!");

sendBulkEmail(msgs);