import nodemailer from 'nodemailer'

export async function sendEmail(to: string[], html: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  const info = await transporter.sendMail({
    from: '<restore-password@employees.com>',
    to: to.join(', '),
    subject: 'Change password',
    html,
  })

  // TODO remove
  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
