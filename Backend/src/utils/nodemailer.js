import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport ({
    service: 'gmail',
    auth: {
        user: "natalia.amse@gmail.com",
        pass: ""
    }
})

export const sendEmailChangePassword = async(email, linkChangePassword) => {
    const mailOptions = {
        from: "natalia.amse@gmail.com",
        to: email,
        subject: "Recuperacion de contraseña",
        
        html: 
        `
        <p>Haz click aqui para cambiar tu contraseña: </p> <button> <a href=${linkChangePassword}>Cambiar contraseña</a></button>
        `
    }

    transporter.sendMail(mailOption, (error, info) => {
        if(error) {
            console.log("Error al enviar correo de cambio de contraseña")
        } else {
            console.log("Correo enviado correctamente", info.response)
        }
    })
}