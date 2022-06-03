const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve(__dirname, '../views/emails'),
        defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, '../views/emails'),
    extName: '.hbs',
};

transporter.use('compile', hbs(handlebarOptions));

const sendEmail = async (options) => {
    const mailOptions = {
        from: `LMS Team <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        template: options.template,
        context: options.context
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
