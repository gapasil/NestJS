import { Injectable } from "@nestjs/common"

const nodemailer = require('nodemailer')

@Injectable()
export class MailerService{
    constructor(){}

    async mailer(user, link){
        try{
            let transporter = nodemailer.createTransport({
                host: 'smtp.mail.ru',
                port: 465,
                auth: {
                  user: "gapasilka6@mail.ru",
                  pass: `${process.env.PASS__MAIL}`,
                },
            })
            
            await transporter.sendMail({           
                from: {
                    name: "Zа Россию",
                    address: "gapasilka6@mail.ru",
                },
                to: user.email,
                subject: 'Message from Node js',
                text: 'This message was sent from Node js server.',
                replyTo: user.email,
                html:
                `<div>
                  <h1>Здравствуйте ${user.firstName}""${user.lastName}</h1>
                  <p>Благодорим вас за регистрацию для завершения регистраций переидите по ссылке:<a href=${link}>Z</a></p>
                </div>`
            })
        } catch(e) {
            return e
        }
    }
}