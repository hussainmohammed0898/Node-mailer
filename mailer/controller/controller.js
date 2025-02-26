 const nodemailer = require('nodemailer')
 const {EMAIL, PASSWORD} = require('../env.js')
 const Mailgen = require('mailgen')
 
 const signup = async (req, res)=>{

    let testAccount = await nodemailer.createTestAccount();
   const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "maddison53@ethereal.email",
          pass: "jn7jnAPss4f63QBp6D",
        },
      });
      const message =  transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Successfully Register with us.", // plain text body
        html: "<b>Successfully Register with us.</b>", // html body
      });
    
      transporter.sendMail(message).then((info)=>{
        return res.status(201).json({
            msg:"you should receive an email",
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
      }).catch(error =>{
        return res.status(500).json({error})
      })
    // res.status(201).json('Signup successfully...!');
}

const admin = (req,res)=>{
   
    let config = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
          }
    }
    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: "Mailgen",
            link: "https://mailgen.js"
        }
    })

    let response = {
        body:{
            Intro: 'Your bill has arrived',
            table: {
                data: [{
                    item: "Nodemailer stack Book",
                    description:"A Backend application",
                }
                ]
                
            },
            outro: "Looking forword to do more business"
        }

    }
    let mail = MailGenerator.generate(response)

    let message = {
        from :EMAIL,
        to: 'ashin209@gmail.com',
        subject: "place order",
        html:mail
        
    }

    transporter.sendMail(message).then(()=>{
        return res.status(201).json({
            msg: 'you should receive an email',
        })
    }).catch(error=>{
        return res.status(500).json({error})
    })


    // res.status(201).json('admin successfully...!');


}
module.exports = {
    signup,
    admin
}