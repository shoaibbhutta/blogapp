import { Module } from '@nestjs/common';
import { NodeMailerService } from './mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 587,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_USER_PASS,
        },
      },
      // defaults: {
      //   from: '"nest-modules" <modules@nestjs.com>',
      // },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [NodeMailerService],
  exports: [NodeMailerService],
})
export class NodeMailerModule {}
