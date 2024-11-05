const express = require('express');
const router = express.Router();
const Provider = require('../models/provider');
const Product = require('../models/product');

// GET todos los providers
router.get('/', async (req, res) => {
  try {
    const providers = await Provider.find();
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST nuevo provider
router.post('/', async (req, res) => {
  const provider = new Provider(req.body);
  try {
    const newProvider = await provider.save();
    res.status(201).json({ message: "proveedor creado", provider: newProvider });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update provider
router.put('/', async (req, res) => {
  try {
    const updatedProvider = await Provider.findByIdAndUpdate(req.body._id, req.body, { new: true });
    res.status(200).json({ message: `proveedor actualizado: ${updatedProvider.company_name}`, provider: updatedProvider });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE provider
router.delete('/', async (req, res) => {
  try {
    const provider = await Provider.findOne({ company_name: req.body.company_name });
    if (!provider) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    
    // Check if the provider has related products
    const relatedProducts = await Product.find({ provider: provider._id });
    if (relatedProducts.length > 0) {
      return res.status(400).json({ message: "No se puede eliminar el proveedor porque tiene productos relacionados" });
    }
    
    await Provider.deleteOne({ _id: provider._id });
    res.status(200).json({ message: `Se ha borrado el proveedor: ${provider.company_name}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;