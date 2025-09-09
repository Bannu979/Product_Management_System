const Product = require('../models/Product');
const { configureCloudinary } = require('../config/cloudinary');

const cloudinary = configureCloudinary();

async function getAllProducts(req, res, next) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const { name, price, description, category } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    let imageUrl = '';
    if (req.file && req.file.path) {
      imageUrl = req.file.path; // when using multer-storage-cloudinary
    } else if (req.body.imageBase64) {
      const uploadRes = await cloudinary.uploader.upload(req.body.imageBase64, {
        folder: 'product_management',
      });
      imageUrl = uploadRes.secure_url;
    }

    const product = await Product.create({ name, price, description, category, imageUrl });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    let updates = { name, price, description, category };
    if (req.file && req.file.path) {
      updates.imageUrl = req.file.path;
    } else if (req.body.imageBase64) {
      const uploadRes = await cloudinary.uploader.upload(req.body.imageBase64, {
        folder: 'product_management',
      });
      updates.imageUrl = uploadRes.secure_url;
    }

    const product = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllProducts, createProduct, deleteProduct, updateProduct };


