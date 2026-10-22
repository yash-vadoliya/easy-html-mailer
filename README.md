# Easy HTML Mailer

A lightweight and easy-to-use Node.js package built on top of `nodemailer` to quickly send HTML emails by providing your `MAIL_USER`, `MAIL_PASSWORD`, recipient email ID, and HTML page content.

## Features

- Simple single-function API to send HTML emails.
- Supports passing `MAIL_USER` and `MAIL_PASSWORD` directly or via `.env` environment variables.
- Supports single or multiple recipient email IDs.
- Built-in validation and Promise/async-await support.

---

## Installation

Install the package via npm:

```bash
npm install easy-html-mailer
```

## Prerequisites (For Gmail Users)

If you are using a Gmail account for `MAIL_USER`, you must use an **App Password** instead of your regular account password:

1. Go to your [Google Account Security Settings](https://myaccount.google.com/security).
2. Enable **2-Step Verification**.
3. Search for **App Passwords**, generate a new 16-character password, and use it as your `MAIL_PASSWORD`.

---

## Usage

### Method 1: Passing Credentials Directly

```javascript
const { sendHtmlEmail } = require("easy-html-mailer");

async function main() {
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
      <h2 style="color: #4CAF50;">Welcome to Our Platform!</h2>
      <p>Hello,</p>
      <p>This is a test HTML email sent using <strong>easy-html-mailer</strong>.</p>
      <a href="[https://example.com](https://example.com)" style="background: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
        Visit Website
      </a>
    </div>
  `;

  try {
    const result = await sendHtmlEmail({
      MAIL_USER: "your-email@gmail.com",
      MAIL_PASSWORD: "your-16-digit-app-password",
      fromName: "My App Support",
      to: "recipient@example.com", // Can also be an array: ['user1@example.com', 'user2@example.com']
      subject: "Welcome Email - HTML Test",
      htmlContent: htmlTemplate,
    });

    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
```

### Method 2: Using `.env` Environment Variables

You can store `MAIL_USER` and `MAIL_PASSWORD` in your `.env` file so you don't need to pass them every time:

```env
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-16-digit-app-password
```

```javascript
require("dotenv").config();
const { sendHtmlEmail } = require("easy-html-mailer");

await sendHtmlEmail({
  to: "recipient@example.com",
  subject: "Hello from .env config!",
  htmlContent: "<h1>Hello World!</h1><p>Sent using environment variables.</p>",
});
```

---

## API Options

| Parameter       | Type                 | Required | Default                     | Description                                                            |
| :-------------- | :------------------- | :------- | :-------------------------- | :--------------------------------------------------------------------- |
| `MAIL_USER`     | `string`             | Yes\*    | `process.env.MAIL_USER`     | Sender email address.                                                  |
| `MAIL_PASSWORD` | `string`             | Yes\*    | `process.env.MAIL_PASSWORD` | Sender email password / App Password.                                  |
| `to`            | `string \| string[]` | **Yes**  | -                           | Recipient email ID (or array of email IDs).                            |
| `subject`       | `string`             | No       | `'No Subject'`              | Subject line of the email.                                             |
| `htmlContent`   | `string`             | **Yes**  | -                           | Full HTML string to be rendered in the email body.                     |
| `fromName`      | `string`             | No       | `''`                        | Custom sender display name.                                            |
| `service`       | `string`             | No       | `'gmail'`                   | Nodemailer service provider (e.g., `'gmail'`, `'outlook'`, `'yahoo'`). |

_\*Required either in the options object or set in environment variables._

---

## License

MIT
