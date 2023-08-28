import nodemailer from "nodemailer";
class SMTPMailer {
    host;
    port;
    secure = true;
    username;
    password;
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: this.host = process.env.SMTP_HOST,
            port: this.port = process.env.SMTP_PORT,
            secure: this.secure, // true for 465, false for other ports
            auth: {
                user: this.username = process.env.SMTP_USERNAME, // generated ethereal user
                pass: this.password = process.env.SMTP_PASSWORD, // generated ethereal password
            },
        });
    }

    async send(from, to, subject, html) {
        if(process.env.AWS_SANDBOX === 'true')
            from = to = process.env.AWS_SANDBOX_SES_RECIPIENT;
        return await this.transporter.sendMail({
            from, to, subject, html
        });
    }
}

export default new SMTPMailer()
