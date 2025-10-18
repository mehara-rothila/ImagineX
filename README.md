# 🎟️ QR-Based Event Management System

## 📖 Overview
The **QR-Based Event Management System (Frontend)** is an interactive web application designed to simplify event organization through personalized QR invitations and a modern admin dashboard.  
This project focuses on the **frontend implementation** — building a clean, responsive, and user-friendly interface that handles event views, participant displays, QR-based check-in UI, and analytics dashboards.

---

## 🎯 Objective
To design and develop a **fully functional frontend** for an event management system that:
- Displays events categorized as **Upcoming**, **Ongoing**, and **Past**.
- Allows admins to manage event data visually.
- Provides attendees with a smooth **QR-based check-in** and **feedback** experience.
- Maintains UI consistency and good user experience across all pages.

---

## 🧠 Main Features

### 🏠 Dashboard Overview
- Shows total counts of events, participants, and key metrics.  
- Consistent layout across all modules.  
- Notification section for admin updates and alerts.  
- Responsive UI design for desktop and mobile.

---

### 📅 Upcoming Events Page
- Display events as **cards** (name, date, location, image).  
- Option to **upload CSV file button** (for adding invitee data, placeholder in UI).  
- Each event card links to its **detailed event view**.  
- Simple report section (static mock data or chart placeholder).

---

### 🟢 Ongoing Events Page
- Event cards showing currently active events.  
- Clicking on an event opens:
  - Event details (name, date, venue).  
  - Participant list table (mock/sample data).  
  - QR verification page (simulated check-in screen).  
- Includes **Report Section** (summary cards or charts).

---

### 🕓 Past Events Page
- Event cards for all completed events.  
- Clicking a card shows:
  - Event summary and participant list.  
  - **Feedback Page** (form or visualization mockup).  
  - **Analysis Page** with charts and graphs (Chart.js or Recharts).  
  - **Report Download (placeholder)** button.

---

### 🔐 Login / Signup Page
- Simple authentication UI with form validation.  
- Toggle between Login and Signup.  
- Placeholder for future backend connection.

---

### 📲 QR Invitation Flow
Three UI screens designed (based on Figma prototype):

1. **Invitation Page:**  
   Displays personalized event invitation details (event name, date, time, venue).

2. **Welcome Page (Check-in):**  
   Shows “Welcome, [Name]!” when user simulates scanning their QR code.

3. **Feedback Form:**  
   After event, attendees can fill in their feedback.  
   Feedback summary shown in Past Events → Reports section.

---

## 🧩 Project Structure

```
QR-Event-Management-Frontend/
├── public/
│   ├── assets/
│   └── index.html
│
├── src/
│   ├── components/        # Reusable components (cards, charts, tables)
│   ├── pages/             # Dashboard, Login, Events, Feedback, etc.
│   ├── layouts/           # Common layouts (Navbar, Sidebar)
│   ├── utils/             # Helper functions
│   ├── App.js             # Main app router
│   └── main.jsx
│
├── package.json
├── tailwind.config.js
├── README.md
└── .gitignore
```

---

## 🛠️ Tech Stack
| Category | Technology |
|-----------|-------------|
| **Framework** | React.js |
| **Styling** | Tailwind CSS |
| **Routing** | React Router DOM |
| **Charts / Graphs** | Recharts or Chart.js |
| **UI Components** | Custom components or ShadCN / Material UI |
| **Design Prototype** | Figma |
| **QR Display / Simulation** | `qrcode.react` (optional for QR rendering demo) |

---

## 📊 UI Sections Summary

| Page | Description |
|------|--------------|
| **Dashboard Overview** | Summary cards, charts, notifications |
| **Upcoming Events** | Event cards, add CSV button, report |
| **Ongoing Events** | Cards + participant check-in + QR view |
| **Past Events** | Feedback + analysis charts + reports |
| **Login/Signup** | Admin login page |
| **QR Invitation Flow** | Invitation → Welcome → Feedback (Figma-based flow) |

---

## 💡 Design Focus
- Clean, consistent UI with reusable design patterns.  
- Color theme and typography aligned with Figma design.  
- Dashboard with responsive card grids.  
- Interactive hover and transition effects (Tailwind + Framer Motion optional).  
- Accessibility-friendly and mobile responsive.

---

## 🧠 Future Enhancements
- Connect to backend (Node.js/Express or Firebase).  
- Add authentication and real data handling.  
- Integrate QR scanner for real check-in functionality.  
- Add live charts using API data.  
- Enable report exports (PDF/CSV).

---

## 🎨 Figma Design
Includes:
- Dashboard UI  
- Upcoming / Ongoing / Past Events pages  
- Login & Signup pages  
- QR Invitation Flow screens  
