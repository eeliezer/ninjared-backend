import nodemailer from "nodemailer"
import axios from "axios";

//Configuaracion del transporte
//recordar crear el correo con validacion en dos pasos
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "redninjacollectionsmailer@gmail.com",
        pass: "qqoexeiebrqftdsg"
    },    
    tls: {
        rejectUnauthorized: false
    },
    from: "redninjacollectionsmailer@gmail.com"
})

// Función para enviar un correo electrónico

export const sendEmail =async (to:string, code: string):Promise<void> => {
    try{
        //configuracion de detalles para el correo electrónico
        const imageUrl = 'https://res.cloudinary.com/divurmndi/image/upload/v1684020290/red-ninja-collections-low-resolution-color-logo_w8yngp.png';
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');
  
        const mailOptions={
            from: '"Red Ninja Collections" redninjacollectionsmailer@gmail.com',
            to,
            subject: "Código de verificación para tu cuenta",
            text: `
                Llegó tu código para Red Ninja Collections.
                El código para verificarte es : ${code}
            `, 
            html: `<h1>Llegó tu código para Red Ninja Collections.</h1>
                    <h2>El código para verificarte es : ${code}</h2>
                    <img src = "cid:myImg" style="width:400px;height:300px;"/></div>`,
            attachments: [
                {
                  content: imageBuffer,
                  cid: 'myImg',
                },
              ],
        }
        //enviar el correo electrónico
        await transporter.sendMail(mailOptions)
        console.log("Correo electrónico enviado")
    }catch(error){
        console.error("Error al enviar el correo electrónico", error)
    }
}