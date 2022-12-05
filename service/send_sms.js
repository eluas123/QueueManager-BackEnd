
module.exports.sendSMS =(phone, name, date, time,service)=>{
    phone = phone.slice(1);
    const accountSid = 'AC79b0a19d62b9647cb6b9b56b94333f2d';
    const apiKey = 'SKd330ef9947f9f8db965494e6d2e6aecb';
    const apiSecret = 'QjnnXYv7kHIQXUQFezAbPmFA939JtLEM';
    const client = require('twilio')(apiKey, apiSecret, { accountSid: accountSid });

    client.messages
        .create({
            body:`hello ${name}, you schdual an appointment for ${service} on ${time}, ${date}`
            ,
            from: '+19803754348',
            to: `+972${phone}`
        })
        .then(message => console.log(message.sid));
}

module.exports.sendSMSAdmin =( name, date, time, service)=>{

    const accountSid = 'AC79b0a19d62b9647cb6b9b56b94333f2d';
    const apiKey = 'SKd330ef9947f9f8db965494e6d2e6aecb';
    const apiSecret = 'QjnnXYv7kHIQXUQFezAbPmFA939JtLEM';
    const client = require('twilio')(apiKey, apiSecret, { accountSid: accountSid });

    client.messages
        .create({
            body:`${name}, schdual an appointment for ${service} on ${time}, ${date}`
            ,
            from: '+19803754348',
            to: `+972548173179`
        })
        .then(message => console.log(message.sid));
}

module.exports.sendSMSdel =(phone,time ,date,service, name)=>{
    phone = phone.slice(1);
    const accountSid = 'AC79b0a19d62b9647cb6b9b56b94333f2d';
    const apiKey = 'SKd330ef9947f9f8db965494e6d2e6aecb';
    const apiSecret = 'QjnnXYv7kHIQXUQFezAbPmFA939JtLEM';
    const client = require('twilio')(apiKey, apiSecret, { accountSid: accountSid });

    client.messages
        .create({
            body:`hello ${name}, you canceled your apoointmet for ${service} on ${date}, ${time}`,
            from: '+19803754348',
            to: `+972${phone}`
        })
        .then(message => console.log(message.sid));
}

module.exports.sendSMSdelAdmin =(time ,date,service, name)=>{
    const accountSid = 'AC79b0a19d62b9647cb6b9b56b94333f2d';
    const apiKey = 'SKd330ef9947f9f8db965494e6d2e6aecb';
    const apiSecret = 'QjnnXYv7kHIQXUQFezAbPmFA939JtLEM';
    const client = require('twilio')(apiKey, apiSecret, { accountSid: accountSid });

    client.messages
        .create({
            body:`${name}, canceled apoointmet for ${service} on ${date}, ${time}`,
            from: '+19803754348',
            to: `+972548173179`
        })
        .then(message => console.log(message.sid));
}


module.exports.sendSMSwaitingListAdmin =(date, name)=>{
    const accountSid = 'AC79b0a19d62b9647cb6b9b56b94333f2d';
    const apiKey = 'SKd330ef9947f9f8db965494e6d2e6aecb';
    const apiSecret = 'QjnnXYv7kHIQXUQFezAbPmFA939JtLEM';
    const client = require('twilio')(apiKey, apiSecret, { accountSid: accountSid });

    client.messages
        .create({
            body:`${name}, added to the wating list on ${date}`,
            from: '+19803754348',
            to: `+972548173179`
        })
        .then(message => console.log(message.sid));
}

// module.exports.sendSMSBeforeAppointment =(phone, name, date, time,service)=>{
//     phone = phone.slice(1);
//     const accountSid = 'AC79b0a19d62b9647cb6b9b56b94333f2d';
//     const apiKey = 'SKd330ef9947f9f8db965494e6d2e6aecb';
//     const apiSecret = 'QjnnXYv7kHIQXUQFezAbPmFA939JtLEM';
//     const client = require('twilio')(apiKey, apiSecret, { accountSid: accountSid });

//     client.messages
//         .create({
//             body:`hello ${name}, bgdjgkgkdj ${service} on ${time}, ${date}`
//             ,
//             from: '+19803754348',
//             to: `+972${phone}`
//         })
//         .then(message => console.log(message.sid));
// }