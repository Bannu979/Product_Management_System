const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { configureCloudinary } = require('../config/cloudinary');
const { getAllProducts, createProduct, deleteProduct, updateProduct } = require('../controllers/productController');

const router = express.Router();

const cloudinary = configureCloudinary();

// Setup multer storage for direct-to-cloudinary uploads
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'product_management',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      public_id: undefined,
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    };
  },
});

const upload = multer({ storage });

router.get('/', getAllProducts);
router.post('/', upload.single('image'), createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', upload.single('image'), updateProduct);

module.exports = router;


