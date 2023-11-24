const nodemailer = require("nodemailer");

// async function main() {

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//           user: "maulana27fandi@gmail.com",
//           pass: "osjk ngak kkep ikfl"
//         },
//       });

//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: '"Foo Foo 👻" <maulana27fandi@gmail.com>', // sender address
//       to: "muhammadsubhantarmedi@gmail.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//     })
//     console.log('kirim')
// }

// main()


const sendEmailAfterUserCreation = async (user) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'maulana27fandi@gmail.com',
      pass: 'osjk ngak kkep ikfl',
    },
  });

  const info = await transporter.sendMail({
    from: '"Foo Foo 👻" <maulana27fandi@gmail.com>',
    to: user,
    subject: 'New User Created',
    text: `Anda berhasil register`,
  });

  console.log('Email sent:', info.messageId);
};

module.exports = sendEmailAfterUserCreation;
