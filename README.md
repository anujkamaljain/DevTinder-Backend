<h1 align="center">🔥 DevTinder Backend 🔥</h1>
<p align="center">
  <img src="https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge&logo=vercel" />
  <img src="https://img.shields.io/badge/Built%20with-Node.js-blue?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Made%20by-Anuj%20Jain-orange?style=for-the-badge&logo=github" />
</p>

<p align="center">
   Match. Chat. Collaborate. <br />
  The ultimate backend API powering DevTinder — a sleek platform for developers to match with people.
</p>

---

## 🚀 Live Website

👉 **Website Live at**: [anujkamaljainprojects.me](https://anujkamaljainprojects.me)

---

## 🧠 What is DevTinder?

DevTinder is like dating... but for devs! Whether you're hunting for your next hackathon partner, a side project buddy, or just vibing with code — this is your go-to zone. And this repo? It's the **backend powerhouse** that makes all the matchmaking magic happen.

---

## ⚙️ Tech Stack

| Tool          | Purpose               |
|-------------  |------------------------|
| **Node.js**   | Runtime                |
| **Express**   | Web Framework          |
| **MongoDB**   | Database               |
| **Mongoose**  | ODM for MongoDB        |
| **JWT**       | Authentication Tokens  |
| **bcrypt**    | Password Hashing       |
| **dotenv**    | Environment Config     |
| **socket.io** | Chat feature           |
| **Amazon SES**| Email Sending Service  |

---

## 📦 Features

- 🔐 **User Authentication** (Login & Signup)
- 🎯 **Project & Profile Matching**
- 💬 **Socket.io for realtime chat**
- 🛡️ **Secure Passwords with Bcrypt & JWT**
- 🧪 **Clean RESTful API Architecture**

---

## 🛠️ Setup Instructions

1. **Clone the repo**  
   ```bash
   git clone https://github.com/anujkamaljain/DevTinder-Backend.git
   cd DevTinder-Backend
2. **Install dependencies**
   ```bash
    npm install
3. **Setup environment variables**
   ```bash
   MONGO_URI=your_mongodb_uri
   JWT_TOKEN_KEY=your_jwt_secret
   AWS_SECRET_KEY = JJ1+v5pGRV2tsIn5rNTyxjJWsJQfzrzqoU1jvcns
4. **Run the server**
    ```bash
    npm run dev

---

## 👨‍💻 Author
# Anuj Jain


---

## Preview

![Screenshot 2025-06-06 092706](https://github.com/user-attachments/assets/9ee73956-ab6f-4b23-a08d-1a0715386514)
![Screenshot 2025-06-06 093510](https://github.com/user-attachments/assets/dfedd71c-f44a-4bce-a709-3383c16ea0b1)
![Screenshot 2025-06-06 093528](https://github.com/user-attachments/assets/b1844284-7d24-4ac2-be78-1a13c77b6ae6)
![Screenshot 2025-06-06 093616](https://github.com/user-attachments/assets/eee655bd-5767-4e09-b0f1-c259a9ef534a)
![Screenshot 2025-06-06 093629](https://github.com/user-attachments/assets/74a2fe98-9c6b-45d5-a6af-9df6609b50d0)
![Screenshot 2025-06-06 093639](https://github.com/user-attachments/assets/366d9b7e-209a-484a-9cfb-41ca0ca291ef)
![Screenshot 2025-06-06 093718](https://github.com/user-attachments/assets/68476e79-8fbc-432f-9a10-4cb5bc426037)
![Screenshot 2025-06-06 093734](https://github.com/user-attachments/assets/2cd90de2-7707-4f7f-893e-ed9652182967)
![Screenshot 2025-06-06 093827](https://github.com/user-attachments/assets/e83c63da-80d4-4970-8721-535a25437f61)

## POSTMAN COLLECTION
https://devtinder-api-tester.postman.co/workspace/DevTinder~1f27e421-3edf-411b-ad94-e3d888ff5d54/collection/43730085-527d77ff-d7b5-4d28-93ae-91097c33247e?action=share&creator=43730085


---

## 📁 Project Structure
```bash
DevTinder-Backend/
├── src/
│   ├── config/          # Database connection config
│   ├── helpers/         # Helper functions (e.g., validations)
│   ├── middlewares/     # Authentication middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes with inline controllers (users, auth, matches, etc.)
│   └── app.js           # App entry point (root of the project)
│
├── utils/               # Utility functions (constants, cron jobs, chat, Amazon SES)
├── .env                 # Environment variable file (should be in .gitignore)
├── .gitignore           # Files/Folders to ignore in GitHub
├── package.json         # Project metadata & npm scripts
├── package-lock.json    # Exact versions of installed dependencies
├── apilist.md           # Initial plan for APIs to be built
└── README.md            # You're here! 😎


MADE WITH ❤️ 
