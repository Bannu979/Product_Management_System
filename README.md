# 📦 Product Management System

A **full-stack web application** for managing products with image uploads, built using:

* **Frontend:** React (Vite), Framer Motion for animations
* **Backend:** Express.js, MongoDB (Mongoose), Cloudinary for image storage

---

## 🚀 Features

* 📋 **Product list/grid view**
* ➕ **Add product** with image upload (via **Cloudinary**)
* 🗑️ **Delete product** with confirmation
* ✏️ **Edit product** (optional, supported)
* 🔍 **Search products** by name
* 💰 **Sort products** by price
* 🎨 **Smooth animations** with **Framer Motion**

---

## 📂 Project Structure

```
Product-Management-System/
│── backend/     # Express API with MongoDB & Cloudinary
│── frontend/    # React Vite frontend
```

---

## ⚙️ Getting Started

### 1️⃣ Backend Setup

1. Create a `.env` file inside the **backend** folder:

   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<your-mongo-uri>
   CLOUDINARY_URL=cloudinary://<your-cloudinary-credentials>
   ```

2. Install dependencies and run the server:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

---

### 2️⃣ Frontend Setup

1. Move to frontend:

   ```bash
   cd ../frontend
   ```

2. Install dependencies and start the development server:

   ```bash
   npm install
   npm run dev
   ```

---

## 🛠️ Tech Stack

* **React (Vite)** – UI
* **Express.js** – Backend REST API
* **MongoDB + Mongoose** – Database
* **Cloudinary** – Image storage & management
* **Framer Motion** – Animations

---

## 📸 Screenshots (Optional)
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/04919197-5806-47d0-8922-1a81852e8936" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9ba23ecb-0444-4769-b183-29941efa23ed" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5760e742-9699-4428-9c41-963957965ae3" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3caea372-fae4-4268-ba78-4bc2cc503f25" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0b52d11c-f8e0-4677-9a8f-d31d31e3e642" />


## 🔮 Future Improvements

* ✅ Pagination for product list
* ✅ User authentication & roles
* ✅ More filtering options (category, rating, etc.)

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to change.

