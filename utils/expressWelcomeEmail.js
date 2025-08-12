const { Resend } = require('resend')
const express  = require('express')
const {Resquest, Response } = require('express')


const app = express()
const resend = new Resend(process.env.RESEND_API_KEY)

const sendWelcomeEmail = async(name, email)=>{
    try {
        await resend.emails.send({
        from: '"Bookly" <hi@booklyio.com>',
        to: email,
        subject: "Welcome to Booklt",
        html: `<strong>Welcome ${name}!</strong>`,
    })

       console.log(`Email sent to ${email}`);
       
    } catch (error) {
        console.log(`Something went wrong, ${error}`);
        
    }
}

module.exports = sendWelcomeEmail
