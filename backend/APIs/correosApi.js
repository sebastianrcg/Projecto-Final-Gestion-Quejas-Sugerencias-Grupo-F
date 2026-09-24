const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY); 


const enviarCorreo = (nombre, correo, tracking) => {

const msg = {
  to: `${correo}`, // Change to your recipient
  from: 'sebalox92@gmail.com', // Change to your verified sender
  subject: "CAPA APP - Queja Recivida",
  text: ` Gracias ${nombre}, por tomar el tiempo de completar el formulario de quejas. Tu queja ha sido registrada exitosamente en nuestro sistema. El equipo de calidad iniciará la investigación correspondiente y podrás dar seguimiento con tu código de tracking: ${tracking}. Gracias por ayudarnos a mejorar.`,
  html: ` Gracias ${nombre}, por tomar el tiempo de completar el formulario de quejas. Tu queja ha sido registrada exitosamente en nuestro sistema. El equipo de calidad iniciará la investigación correspondiente y podrás dar seguimiento con tu código de <strong>tracking: ${tracking}</strong>. <br></br>Gracias por ayudarnos a mejorar.`,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

}

module.exports = enviarCorreo;