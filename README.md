# ⚙️ SociaLink Backend

This directory contains the **backend server** for **SociaLink**, a real-time chat application.

---

## 🌐 Overview

The backend powers the SociaLink application by providing:

- ✅ RESTful API
- 🔐 Authentication services with JWT & HTTP-only cookies
- ⚡ Real-time messaging via Socket.IO
- 💾 MongoDB integration
- ☁️ Cloudinary support for image uploads
- 🌐 CORS configuration for cross-origin support

Built using **Node.js**, **Express**, **MongoDB**, and **Socket.IO**.

---

## ✨ Features

- 📡 Real-time messaging with **Socket.IO**
- 🔐 User auth & authorization via **JWT**
- 🍪 Secure HTTP-only cookie handling
- 🗄️ MongoDB database with **Mongoose**
- ☁️ Image uploads using **Cloudinary**
- 🟢 Online user tracking
- 🔄 Environment-based configuration
- 🔗 Cross-origin communication support

---

## 🛠 Tech Stack

- **Node.js** – JavaScript runtime  
- **Express.js** – Web framework  
- **MongoDB** – NoSQL database  
- **Mongoose** – ODM for MongoDB  
- **Socket.IO** – Real-time bidirectional communication  
- **JWT** – Token-based authentication  
- **Bcrypt** – Password hashing  
- **Cloudinary** – Image hosting  
- **Cookie-Parser** – Cookie handling middleware  
- **CORS** – Cross-Origin Resource Sharing  

---

## 📁 Project Structure
/src
├── controllers    # Request handlers
├── models         # Mongoose models
├── routes         # API route definitions
├── middleware     # Authentication and other middleware
├── lib            # Utilities (JWT, DB connection, socket, etc.)

---

## 📦 API Endpoints

### 🔐 Auth

- `POST /api/auth/signup` – Register a new user  
- `POST /api/auth/login` – Login user  
- `POST /api/auth/logout` – Logout user  
- `GET /api/auth/check` – Check authentication status  
- `PUT /api/auth/update-profile` – Update user profile  

### 💬 Messages

- `GET /api/messages/users` – Get all users for chat  
- `GET /api/messages/:id` – Get messages with a specific user  
- `POST /api/messages/send/:id` – Send message to user  

---

## 🔌 Socket Events

- `connection` – User connects  
- `disconnect` – User disconnects  
- `getOnlineUsers` – Broadcast online users  
- `newMessage` – Notify receiver of a new message  

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
