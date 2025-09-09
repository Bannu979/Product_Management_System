Setup

1) Create .env in backend/ using the provided example values or these real values:

PORT=5000
MONGO_URI=mongodb+srv://cherrymilky2020:bannu979@cluster0.pgvd2ic.mongodb.net/ProductManagement?retryWrites=true&w=majority&appName=Cluster0
CLOUDINARY_URL=cloudinary://473331934269283:h5LTNF7VtYvJojs7Af0yr0vfdxI@dhn1djkzl

2) Install and run

npm install
npm run dev

API

- GET /api/products
- POST /api/products (multipart form with field name "image")
- DELETE /api/products/:id
- PUT /api/products/:id (multipart optional)


