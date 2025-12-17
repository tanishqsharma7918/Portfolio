# Contact Form Setup Instructions

## 📧 How to Connect the Contact Form to Your Email

The contact form is currently configured to use **Formspree** (a free email service for forms). Follow these steps to activate it:

### Option 1: Using Formspree (Recommended - FREE)

1. **Go to Formspree**: Visit [https://formspree.io](https://formspree.io)

2. **Sign Up**: Create a free account using your email (tanishq.822@gmail.com)

3. **Create a New Form**:
   - Click "New Project" or "New Form"
   - Name it: "Portfolio Contact Form"
   - Set the email destination to: `tanishq.822@gmail.com`

4. **Get Your Form Endpoint**:
   - After creating the form, you'll get a unique endpoint URL like:
   - `https://formspree.io/f/YOUR_FORM_ID`

5. **Update the Code**:
   - Open `src/components/Contact.jsx`
   - Find this line (around line 23):
   ```javascript
   const response = await fetch('https://formspree.io/f/xnnqanpo', {
   ```
   - Replace `xnnqanpo` with YOUR actual form ID from Formspree

6. **Test It**:
   - Submit a test message from your portfolio
   - Check your email at tanishq.822@gmail.com
   - You should receive the message!

### Option 2: Using EmailJS (Alternative)

1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Sign up with tanishq.822@gmail.com
3. Create an email service
4. Get your Service ID, Template ID, and Public Key
5. Install EmailJS: `npm install @emailjs/browser`
6. Update the Contact.jsx component with EmailJS code

### Option 3: Backend API (Custom Solution)

If you want more control, you can create a backend API using:
- Node.js + Nodemailer
- AWS SES
- SendGrid
- Mailgun

---

## ✅ Current Setup

The form is currently set to a **temporary Formspree endpoint**. You need to:

1. Create your own Formspree account
2. Get your unique form ID
3. Replace `xnnqanpo` with your form ID in Contact.jsx

---

## 🎯 Form Features

✅ **Email Destination**: tanishq.822@gmail.com  
✅ **Email Label Changed**: Now says "Your Email"  
✅ **Response Time Message**: "💌 I'll reply within 24 hours!"  
✅ **Form Validation**: All fields required  
✅ **Loading State**: Shows spinner while sending  
✅ **Success Message**: Confirms message sent  
✅ **Error Handling**: Falls back to direct email  
✅ **Form Reset**: Clears after successful send  

---

## 📝 What Gets Sent

When someone submits the form, you receive:

**Subject**: `New Portfolio Contact from [Their Name]`

**Body**:
```
Name: [Their Name]
Email: [Their Email]
Message: [Their Message]
```

**Reply-To**: Set to their email for easy response

---

## 🔧 Troubleshooting

**Form not sending?**
1. Check your Formspree form ID is correct
2. Verify email is set to tanishq.822@gmail.com
3. Check browser console for errors
4. Make sure you're online

**Not receiving emails?**
1. Check spam folder
2. Verify Formspree email settings
3. Confirm form ID is correct
4. Test with Formspree dashboard

---

## 🚀 Quick Start

**Fastest way to get it working:**

```bash
# 1. Go to Formspree and create account
# 2. Create a new form
# 3. Get your form ID (looks like: abc123xyz)
# 4. Update Contact.jsx:

# Find this line:
const response = await fetch('https://formspree.io/f/xnnqanpo', {

# Replace with:
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

That's it! Your contact form will be live! 🎉
