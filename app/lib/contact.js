import { query } from './connect';
import nodemailer from 'nodemailer';

export async function createContactsTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      messages JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await query(sql);
    console.log('Contacts table created successfully.');
  } catch (error) {
    console.error('Error creating contacts table:', error);
  }
}

createContactsTable();

// Insert contact form data into MySQL
export async function insertContact({ name, email, message }) {
  const checkEmailSql = `SELECT * FROM contacts WHERE email = ?`;
  const result = await query(checkEmailSql, [email]);

  if (result.length > 0) {
    // Email exists, update the existing record
    const updateSql = `
      UPDATE contacts
      SET messages = JSON_ARRAY_APPEND(messages, '$', JSON_OBJECT('name', ?, 'message', ?, 'created_at', CURRENT_TIMESTAMP))
      WHERE email = ?;
    `;
    await query(updateSql, [name, message, email]);
  } else {
    // Email does not exist, create a new record
    const insertSql = `
      INSERT INTO contacts (email, messages)
      VALUES (?, JSON_ARRAY(JSON_OBJECT('name', ?, 'message', ?, 'created_at', CURRENT_TIMESTAMP)));
    `;
    await query(insertSql, [email, name, message]);
  }
}

// Send email using nodemailer
export async function sendContactForm({ name, email, message }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact Form Submission from ${name}`,
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              width: 80%;
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
              font-size: 24px;
              margin-bottom: 20px;
            }
            p {
              line-height: 1.6;
              margin: 0 0 10px;
            }
            .about-us {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
            }
            .about-us h2 {
              font-size: 20px;
              margin: 0 0 10px;
            }
            .about-us p {
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Contact Form Submission</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <div class="about-us">
              <h2>About Us</h2>
              <p>Thank you for reaching out to us. We are dedicated to providing exceptional service and support. If you have any questions or need further assistance, please do not hesitate to contact us.</p>
              <p>Best regards,<br>Your Company Name</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}
