const { exec } = require('child_process')

const __PROD__ = process.env.NODE_ENV === 'production'

if (!__PROD__) {
  exec('husky install', (err, stdout, stderr) => {
    if (err) {
      console.log(new Error(err, { cause: stderr }))
    }
    console.log(stdout)
  })
}
