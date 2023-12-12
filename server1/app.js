// import modules
const express = require("express");
const { json, urlencoded } = express;
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const authRoute = require ("./routes/auth");
const usersRoute = require ("./routes/user");
const hotelsRoute = require ("./routes/hotels");
const roomsRoute = require ("./routes/rooms");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const paymentRoute = require("./routes/payment.cjs");
const nodemailer = require("nodemailer");
const maintenanceRoutes = require('./routes/maintenance');
// app
const app = express();

// db
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB CONNECTED"))
	.catch((err) => console.log("DB CONNECTION ERROR", err));

// middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());

// routes
// const userRoutes = require("./routes/user");
// app.use("/", userRoutes);
app.use("/server1/auth", authRoute);
app.use("/server1/users", usersRoute);
app.use("/server1/hotels", hotelsRoute);
app.use("/server1/rooms", roomsRoute);
app.use("/server1/payments", paymentRoute);
app.use('/server1/maintenance', maintenanceRoutes);
app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Something went wrong!";
	return res.status(errorStatus).json({
	  success: false,
	  status: errorStatus,
	  message: errorMessage,
	  stack: err.stack,
	});
  });

  function sendEmail({ recipient_email, OTP }) {
	return new Promise((resolve, reject) => {
	  var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
		  user: process.env.MY_EMAIL,
		  pass: process.env.MY_PASSWORD,
		},
	  });

	  const mail_configs = {
		from: process.env.MY_EMAIL,
		to: recipient_email,
		subject: "Rental Voyage PASSWORD RECOVERY",
		html: `<!DOCTYPE html>
  <html lang="en" >
  <head>
	<meta charset="UTF-8">
	<title>CodePen - OTP Email Template</title>
	
  
  </head>
  <body>
  <!-- partial:index.partial.html -->
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
	<div style="margin:50px auto;width:70%;padding:20px 0">
	  <div style="border-bottom:1px solid #eee">
		<a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Rental Voyage</a>
	  </div>
	  <p style="font-size:1.1em">Hi,</p>
	  <p>Thank you for choosing Rental Voyage. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
	  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
	  <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
	  <hr style="border:none;border-top:1px solid #eee" />
	  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
		<p>Rental Voyage Inc</p>
		<p>IU Bloomington</p>
		<p>Indiana</p>
	  </div>
	</div>
  </div>
  <!-- partial -->
	
  </body>
  </html>`,
	  };
	  transporter.sendMail(mail_configs, function (error, info) {
		if (error) {
		  console.log(error);
		  return reject({ message: `An error has occured` });
		}
		return resolve({ message: "Email sent succesfuly" });
	  });
	});
  }
  
  app.get("/", (req, res) => {
	console.log(process.env.MY_EMAIL);
  });
  
  app.post("/send_recovery_email", (req, res) => {
	sendEmail(req.body)
	  .then((response) => res.send(response.message))
	  .catch((error) => res.status(500).send(error.message));
  });
// port
const port = process.env.PORT || 3001;

// listener
const server = app.listen(port, () =>
	console.log(`Server is running on port ${port}`)
);
