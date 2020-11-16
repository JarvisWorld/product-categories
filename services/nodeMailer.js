const CONFIG = require('./../config/config');
var nodemailer = require('nodemailer');

let sendMailUsingNode = (toId, subject, mailText) => {
    // console.log(mailText,'testing');
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: CONFIG['MAILUSERNAME'],
            pass: CONFIG['MAILPASSWORD']
        }
    });
    var mailOptions = {
        from: CONFIG['MAILUSERNAME'],
        to: toId,
        subject: subject,
        html: mailText
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            finalResponse = { 'status': false, response: 'Invalid username or password' };
            // console.log("error",error);
            return finalResponse;
        } else {
            // console.log('Email sent: ' + info.response);
            finalResponse = { 'status': true, response: 'account created successfully' };
            return finalResponse;
        }
    });
}
module.exports = {
    sendMailUsingNode: sendMailUsingNode

}