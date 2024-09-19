const nodemailer = require("nodemailer")

const SendEmailto = async (mailto, subto, textto) => {

    let transporter = nodemailer.createTransport({
        host: 'mail.wp-codestudio.com',
        port: 465,
        secure: true,
        auth: {
            user: 'email@wp-codestudio.com',
            pass: '$yM.ANKa;6fz'
        }, tls: {
            rejectUnauthorized: false
        }
    })

    let EmailOption = {
        from: 'Inventory <email@wp-codestudio.com>',
        to: mailto,
        subject: subto,
        text: textto
    }

    return await transporter.sendMail(EmailOption)

}

module.exports = SendEmailto;