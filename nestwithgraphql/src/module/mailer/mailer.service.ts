import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as ejs from 'ejs';
import { invitationTemplate } from '../../templates/welcome';
interface SendMailPerameter {
  to: string;
}
@Injectable()
export class NodeMailerService {
  constructor(private readonly mailerService: MailerService) {}
  async sendWelcomeEmail(obj: SendMailPerameter): Promise<void> {
    await this.mailerService.sendMail({
      from: 'Kwanso Test', // sender address
      to: obj.to, // list of receivers
      subject: 'Welcome ✔', // Subject line
      // template: 'welcome',
      html: invitationTemplate(),
      // html: '<b>welcome</b>',
    });
  }

  forgetPasswordEamil(obj: SendMailPerameter) {
    ejs.renderFile(
      __dirname + +'/templates/forgetPassword.ejs',
      { ...obj },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          this.mailerService.sendMail({
            from: 'Kwanso Test', // sender address
            to: obj.to, // list of receivers
            subject: 'Forget Password', // Subject line
            html: data, // html body
          });
        }
      },
    );
  }
}
