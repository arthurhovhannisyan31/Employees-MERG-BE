import nodemailer from 'nodemailer'
// nodemailerEmployees
export async function sendEmail(to: string[], html: string): Promise<void> {
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

  transporter.sendMail({
    from: '"Employees" <employeesemployees@yandex.ru>',
    to: to.join(', '),
    subject: 'Change password',
    html, // todo html page
  })
}
