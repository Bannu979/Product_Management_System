# Product Management System

Full-stack app with React (Vite), Express, MongoDB (Mongoose), and Cloudinary uploads.

Folders

- backend/ (Express API)
- frontend/ (React Vite app)

Getting Started

Backend

1) Create backend/.env with:

PORT=5000
MONGO_URI=mongodb+srv://cherrymilky2020:bannu979@cluster0.pgvd2ic.mongodb.net/ProductManagement?retryWrites=true&w=majority&appName=Cluster0
CLOUDINARY_URL=cloudinary://473331934269283:h5LTNF7VtYvJojs7Af0yr0vfdxI@dhn1djkzl

2) Install and run

cd backend
npm install
npm run dev

Frontend

cd ../frontend
npm install
npm run dev

Features

- Product list/grid
- Add product with image upload (Cloudinary)
- Delete with confirmation
- Edit product (optional)
- Sort by price, search by name
- Framer Motion animations


