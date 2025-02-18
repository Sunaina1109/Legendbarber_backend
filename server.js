const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;
app.get('/', (req, res) => {
  res.send('Hello, World!'); // Basic response to check if the server is working
});

// Other routes, e.g. for your API
app.post('/send-email', (req, res) => {
  // Handle email sending logic here
});

app.use(cors({ origin: "https://legendbarberstudio.com" }));
app.use(express.json()); 
app.use(bodyParser.json());

// Route to handle form submission
app.post("/send-email", async (req, res) => {
  const { name, number, email, store, gender, services, date, time } = req.body; // ✅ Added 'date' here

  if (!name || !email || !store || !gender || !date || !time) {
    // ✅ Ensure 'date' is required
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "cosmicdatasystems@gmail.com",
        pass: "znat fxmr tkyb jflj",
      },
    });

    // Email options
    const mailOptions = {
      from: "Gmail",
      to: "cosmicdatasystems@gmail.com",
      subject: "Appointment Request",
      html: `
        <h2>Hello Team,</h2>
        <p>We have a new appointment request. Please see the customer details below:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Number:</strong> ${number}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Store:</strong> ${store}</p>
        <p><strong>Gender:</strong> ${
          gender.charAt(0).toUpperCase() + gender.slice(1)
        }</p>
        <p><strong>Date:</strong> ${date}</p> <!-- ✅ Now 'date' is correctly defined -->
        <p><strong>Time:</strong> ${time}</p> <!-- ✅ Now 'time' is correctly defined -->

        <p><strong>Services:</strong> ${
          services.length > 0 ? services.join(", ") : "No services selected"
        }</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
