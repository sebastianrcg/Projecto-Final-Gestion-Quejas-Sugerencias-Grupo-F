const sgMail = require('@sendgrid/mail')



const enviarCorreo = (nombre, correo, tracking) => {

sgMail.setApiKey(process.env.SENDGRID_API_KEY); 

const msg = {
  to: `${correo}`, // Change to your recipient
  from: 'capardapp@gmail.com', // Change to your verified sender
  subject: "CAPA APP - Queja Recivida",
  text: ` Gracias ${nombre}, por tomar el tiempo de completar el formulario de quejas. Tu queja ha sido registrada exitosamente en nuestro sistema. El equipo de calidad iniciará la investigación correspondiente y podrás dar seguimiento con tu código de tracking: ${tracking}. Gracias por ayudarnos a mejorar.`,
  html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f7;
        margin: 0;
        padding: 0;
        font-size: 18px;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      }
      .header {
        background: #004aad;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 20px;
        font-size: 18px;
        color: #333333;
        line-height: 1.6;
      }
      .tracking {
        background: #f0f8ff;
        border: 1px solid #004aad;
        padding: 10px;
        margin: 20px 0;
        text-align: center;
        font-weight: bold;
        color: #004aad;
        border-radius: 4px;
      }
      .footer {
        background: #f9f9f9;
        color: #777777;
        font-size: 14px;
        text-align: center;
        padding: 15px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>CAPA APP - Queja Recibida</h2>
      </div>
      <div class="content">
        <p>Estimado/a <strong>${nombre}</strong>,</p>
        <p>
          Gracias por tomar el tiempo de completar el formulario de quejas.
          Tu queja ha sido registrada exitosamente en nuestro sistema.
        </p>
        <p>
          El equipo de calidad iniciará la investigación correspondiente y podrás dar seguimiento con tu código:
        </p>
        <div class="tracking">
          Tracking: ${tracking}
        </div>
        <p>
          Agradecemos tu colaboración para ayudarnos a mejorar continuamente.
        </p>
        <p>Atentamente,<br>Equipo de Calidad</p>
      </div>
      <div class="footer">
        © 2026 CAPA APP | Este correo es generado automáticamente, por favor no responder.
      </div>
    </div>
  </body>
</html>
`,
}

// const msg = {
//   to: `${correo}`, // Change to your recipient
//   from: 'capardapp@gmail.com', // Change to your verified sender
//   subject: "CAPA APP - Queja Recivida",
//   text: ` Gracias ${nombre}, por tomar el tiempo de completar el formulario de quejas. Tu queja ha sido registrada exitosamente en nuestro sistema. El equipo de calidad iniciará la investigación correspondiente y podrás dar seguimiento con tu código de tracking: ${tracking}. Gracias por ayudarnos a mejorar.`,
//   html: ` Gracias ${nombre}, por tomar el tiempo de completar el formulario de quejas. Tu queja ha sido registrada exitosamente en nuestro sistema. El equipo de calidad iniciará la investigación correspondiente y podrás dar seguimiento con tu código de <strong>tracking: ${tracking}</strong>. <br></br>Gracias por ayudarnos a mejorar.`,
// }


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