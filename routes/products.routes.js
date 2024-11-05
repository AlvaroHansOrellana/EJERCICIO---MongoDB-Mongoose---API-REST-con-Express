const productsController = require('../controllers/products.controller');
const router = require('express').Router();

router.get("/:id?", productsController.getProduct);

const express = require('express');
const Product = require('../models/product');
const Provider = require('../models/provider');

// GET todos los products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('provider');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST nuevo product
router.post('/', async (req, res) => {
  try {
    const provider = await Provider.findOne({ company_name: req.body.provider_name });
    if (!provider) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    
    const product = new Product({
      ...req.body,
      provider: provider._id
    });
    
    const newProduct = await product.save();
    res.status(201).json({ message: "producto creado", product: newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update product
router.put('/', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.body._id, req.body, { new: true });
    res.status(200).json({ message: `producto actualizado: ${updatedProduct.title}`, product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE product
router.delete('/', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ title: req.body.title });
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: `Se ha borrado el producto: ${product.title}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/", productsController.createProduct);
router.put("/", productsController.editProduct);
router.delete("/:id?", productsController.deleteProduct);

module.exports = router;