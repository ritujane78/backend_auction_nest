# Backend Auction Nest

A backend application built with **NestJS** to power an online auction platform.  
It provides RESTful APIs for user management, auctions, bidding, and real-time updates.

---

## 🛠 Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/)  
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)  
- **Authentication**: JWT (JSON Web Tokens)  
- **Real-Time Updates**: Socket.IO  
- **API Documentation**: Swagger  

---

## 🚀 Features

- **User Authentication**: Registration, login, and JWT-based sessions  
- **Auction Management**: Create, update, delete auctions  
- **Bidding System**: Place and track bids in real time  
- **Real-Time Updates**: Live auction notifications via WebSocket  
- **Swagger Documentation**: Interactive API testing  

---

## 📁 Project Structure

├── src/
│ ├── controllers/ # Request handlers
│ ├── modules/ # Application modules
│ ├── models/ # Mongoose schemas
│ ├── services/ # Business logic
│ ├── main.ts # Application entry point
├── .env # Environment variables
├── package.json # Dependencies and scripts
├── README.md # Project documentation

## ⚙️ Installation

1. **Clone the repository:**
   git clone https://github.com/ritujane78/backend_auction_nest.git
   cd backend_auction_nest
