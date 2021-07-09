import nodemailer from 'nodemailer'

export async function sendEmail(to: string[], html: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'dv5apgzr34wyovjz@ethereal.email',
      pass: 'A3hccPK9gTCaAMNaUk',
    },
  })

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <restore-password@employees.com>',
    to: to.join(', '),
    subject: 'Change password',
    html,
  })

  // TODO remove
  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
