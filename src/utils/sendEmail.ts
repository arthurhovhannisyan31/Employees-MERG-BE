import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export async function sendEmail(
  to: string[],
  html: string
): Promise<SMTPTransport.SentMessageInfo> {
  const transporter = nodemailer.createTransport({
    service: 'Yandex',
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'employeesemployees',
      pass: 'miulaanzfnbtzjqq',
    },
  })

  return await transporter.sendMail({
    from: '"Employees" <employeesemployees@yandex.ru>',
    to: to.join(', '),
    subject: 'Change password',
    html,
  })
}
