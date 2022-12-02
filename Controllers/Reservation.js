const Reservation = require('../Models/Reservation_Model');
const Event = require('../Models/Events_Model');
const nodemailer = require('nodemailer');
var fs = require('fs');
var pdf = require('html-pdf');
const QRCode = require('qrcode')
const ejs = require('ejs')
const path = require('path');
exports.createReservation = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);//event you clicked on for reservation
    /* Creating a reservation with the data from the request body. */
    const reservation = await Reservation.create(req.body)
    const dataEvent = {// event info
      firstName: `${req.body.firstName}`,
      eventName: `${event.eventName}`,
      eventDate: `${event.eventDate}`,
      eventTime: `${event.eventTime}`,
      price: `${event.price}`,
      location: `${event.location}`
    }
    const qrcodeLink = `http://localhost:4000/qrcodes/${reservation._id}.png` // const to make qrcode's img readable in gmail
    //Creating a qrcode with the dataEvent object and saving it in the qrcodes folder.
    await QRCode.toFile(path.resolve(`./qrcodes/${reservation._id}.png`), JSON.stringify(dataEvent))
    /* Reading the html file and saving it in a variable. */
    var html = fs.readFileSync('Reservation/Ticket.html', 'utf8');
    const render = ejs.render(html, { data: dataEvent, qrcodeLink: qrcodeLink }) //post it in html <%= qrcodeLink %>

    // pdf creation :
    var options = { //pdf pg style
      format: "A3",
      orientation: "landscape",
      border: "10mm"
    };
    /*transform"Rendered html file with dataEvent, object and  qrcodeLink" to file */
    pdf.create(render, options).toFile(`Reservation/${reservation._id}.pdf`, async function (err, res) {
      if (err) {
        console.log(err);
      } else {
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });
        await transporter.sendMail({
          from: process.env.EMAIL,
          to: req.body.email,
          subject: "Event ticket",
          text: "Hello, you can download your ticket bellow!",
          attachments: [
            {
              filename: 'Ticket.pdf',//fichier title in gmail 
              content: fs.createReadStream(`Reservation/${reservation._id}.pdf`)//to make qrcode img readable without clicking
            }
          ]
        });
      }
    })
    res.send({ message: 'reservation is created' })
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || 'server error' })
  }
};