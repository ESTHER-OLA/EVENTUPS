# Find Talent – Responsive Event and Talent Discovery Web App

## 🚀 Overview

**Find Talent** is a full-featured, responsive web application built with **React.js (Next.js)**, **Tailwind CSS**, and **shadcn/ui**. Designed to help users **discover events**, **connect with top talents**, and **organize or attend events**, this app ensures a seamless experience across all devices.

> 🏁 This project is part of the **FIND Talent Challenge** – a coding challenge aimed at building scalable fullstack applications using modern frontend and backend technologies like React and MongoDB.

---

## ✨ Features

- **Home Page** displaying upcoming events (static data for now).
- **Find Talent Page** with:
  - Real-time **search**
  - **Filters** for event type (webinar, hackathon), location, and date
- **Event Details Page** with full event info
- **Authentication**:
  - Signup with email and username
  - Login functionality
- **User Profile Page**
- **Settings Page**:
  - Edit user details
  - Switch between **Attendee** and **Organizer**
- **Create Event Page** for organizers to publish events
- **Event Sharing**:
  - Share to social apps
  - Copy event links
- **Ticket Pages**:
  - Get ticket
  - Retrieve ticket
- **Informational Pages**:
  - About
  - FAQ
  - Terms of Service
  - Privacy Policy
  - Cookie Policy

---

## 🧱 Tech Stack

- **Frontend**:
  - React.js (Next.js)
  - Tailwind CSS
  - shadcn/ui
- **Backend (Future plan)**:
  - Node.js
  - MongoDB
- **Libraries/Utilities**:
  - React Hook Form / Formik
  - date-fns
  - Zustand / React Context API
  - Lucide Icons
  - Vercel (for deployment)

---

## 📱 Responsive Design

Built with **Flexbox** and **CSS Grid**, the layout is fully responsive and optimized for both mobile and desktop screens.

---

## 📂 Project Structure

```

/pages
├── index.js                # Home
├── find-talent.js
├── event/\[id].js          # Event Details
├── login.js
├── signup.js
├── profile.js
├── settings.js
├── create-event.js
├── retrieve-ticket.js
├── get-ticket.js
├── about.js
├── faq.js
├── terms.js
├── privacy-policy.js
├── cookie-policy.js

/components
├── Navbar.js
├── Footer.js
├── EventCard.js
├── Filters.js
├── ProfileForm.js
└── ...more

```

---

## 🧪 Getting Started

1. **Clone the Repository**:

```bash
git clone https://github.com/ESTHER-OLA/EVENTUPS/tree/master
cd find-talent-app
```

2. **Install Dependencies**:

```bash
npm install
```

3. **Start Development Server**:

```bash
npm run dev
```

4. **View App**:

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📈 SEO Keywords

FIND Services, FIND Talent, Coding Challenge, React App, Fullstack Challenge, MongoDB Events App, Event Management Platform, Event Hosting App, TailwindCSS Next.js Template, Talent Discovery App, Responsive Web App, Developer Showcase App.

---

## 📌 Future Enhancements

- Add MongoDB database integration
- Enable real-time ticketing with QR codes
- Integrate NextAuth.js for secure authentication
- Add event image upload and gallery
- Email notifications for attendees and organizers

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vercel](https://vercel.com/)

---

> 💡 Built with ❤️ during the FIND Talent Challenge

---