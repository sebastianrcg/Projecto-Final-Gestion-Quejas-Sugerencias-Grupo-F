
const Mailgun = require("mailgun.js")
const FormData = require("form-data")

const enviarCorreo = async (nombre, correo, tracking) => {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAIL_API_KEY,
    
  });
  try {
    const data = await mg.messages.create("sandboxce0f199440d442eea28186f20fdb72e8.mailgun.org", {
      from: "Mailgun Sandbox <postmaster@sandboxce0f199440d442eea28186f20fdb72e8.mailgun.org>",
      to: [correo],
      subject: "CAPA APP - Queja Recivida",
      text: ` Gracias ${nombre}, por tomar el tiempo de completar el formulario de quejas. Tu queja ha sido registrada exitosamente en nuestro sistema. El equipo de calidad iniciará la investigación correspondiente y podrás dar seguimiento con tu código de tracking: ${tracking}. \n 
      
      Gracias por ayudarnos a mejorar.`,
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}

module.exports = enviarCorreo;