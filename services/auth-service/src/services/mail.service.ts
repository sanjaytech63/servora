import { transporter } from "../config/mail";

export class MailService {
  static async send(to: string, subject: string, html: string) {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to,
      subject,
      html,
    });
  }
}
