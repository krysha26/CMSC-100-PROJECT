# CMSC 100 Final Project: Farm-to-Table E-commerce Platform

*Farm-to-table* is a social movement that promotes direct connections between food producers and consumers. This web application was developed for the Department of Agriculture (DA) to facilitate direct transactions between farmers and customers, removing the need for intermediaries.

## 👨‍🌾 Project Overview

This is a full-stack e-commerce platform where:
- *Customers* can register, browse products, add to cart, and place orders.
- *Department of Agriculture (DA)* manages product listings, orders, users, and sales reports via an admin dashboard.

---

## 💻 Tech Stack

- *Frontend*: React.js
- *Backend*: Node.js + Express.js
- *Database*: MongoDB

---

## 👥 User Types

### 1. *Customer*
- Can register and log in.
- Can browse the product catalog.
- Can add items to cart.
- Can place and cancel orders (if not yet confirmed).
- Cannot access admin routes or dashboard.

### 2. *Department of Agriculture (Admin)*
- Has a default account; no need to register.
- Can manage users, product listings, order fulfillment, and sales reports.
- Has access to an exclusive dashboard.

---

## 🔐 Authentication

- Email-based signup and login.
- Only logged-in users can access the system.
- Protected routes for admin and customer users.

---

## 📦 E-commerce Features

### For Customers
- View product listings
- Add to cart / Remove from cart
- View cart summary (total price & quantity)
- Checkout with cash-on-delivery
- Cancel pending orders

### For Admin
- Manage user accounts (view and total)
- Add/Edit/Delete products (with inventory)
- Confirm orders
- Generate sales reports:
  - Weekly
  - Monthly
  - Yearly

---

## 🗃️ Database Schema

### User
- First Name
- Middle Name (optional)
- Last Name
- User Type (customer, admin)
- Email
- Password

### Products
- Product ID
- Product Name
- Product Description
- Product Type (1 = Crop, 2 = Poultry)
- Product Price
- Product Quantity

### Order Transactions
- Transaction ID
- Product ID
- Order Quantity
- Order Status (0 = Pending, 1 = Completed, 2 = Canceled)
- Customer Email
- Date Ordered
- Time Ordered

---

## 🚀 Getting Started

### Prerequisites
To access the deployed website, visit: [https://anico-app.vercel.app](https://anico-app.vercel.app)


## 📸 Screenshots

(Add your screenshots here once available)

---

## 🧾 License

This project is developed for educational purposes for CMSC 100 at UPLB.

---

## 👨‍👩‍👧‍👦 Team Members

- Christian Concordia
- Krysha Fei C. Maceda
- Justin Dayne Bryant Peña
- Franz Saragena