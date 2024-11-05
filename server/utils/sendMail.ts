require('dotenv').config()
import nodemailer, {Transporter} from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

interface EmailOptions{
    email:string;
    subject:string;
    template:string;
    data:{[key:string]:any}
}
// create reusable transporter object using the default SMTP transport 

const sendEmail = async (options:EmailOptions):Promise<void> => {
    const transporter:Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587' ),
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const {email, subject, template, data} = options;

    //get the email template file

    const templatePath:string = path.join(__dirname, '../mails', template);

    //Render the email template
    const html:string = await ejs.renderFile(templatePath, data)

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
}

export default sendEmail;