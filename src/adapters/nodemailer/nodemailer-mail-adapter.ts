import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bdb3fd582ac96e",
    pass: "30c346f892e523"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Pamela Badermann <badermann.pamela@gmail.cpm>',
      subject,
      html: body
    });
  };
}