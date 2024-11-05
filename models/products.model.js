const mongoose = require("mongoose");
const Provider = require("./providers.model");
require("../config/db_mongo"); // Conexión a BBDD MongoDB

// const objectSchema = {
//   id: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   title: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     validate: {
//       validator: function (url) {
//         if (url.indexOf(".jpg") != -1 || url.indexOf(".png") != -1) return true;
//         else {
//           return false;
//         }
//       },
//       message: "Porfa, sólo imágenes JPG o PNG",
//     },
//   },
//   provider: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Provider",
//     required: true,
//   },
// };
// Crear el esquema
const productSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  provider: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Provider', 
    required: true 
  }
});

// Crear el modelo --> Colección
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// Crear juego pasando titulo + nombre de compañía por parámetro
async function createProduct(
  id,
  title,
  price,
  description,
  image,
  companyName
) {
  const provider = await Provider.find({ companyName });
  const provider_id = provider[0]._id.toString();

  const product = new Product({
    id,
    title,
    price,
    description,
    image,
    provider: provider_id,
  });

  const result = await product.save();
  console.log(result);
}

/* createProduct(
  1,
  "Tortilla de patatas",
  1.5,
  "Cafe jugosa del teatro",
  "https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-1200x828.jpg",
  "La casa de las flores"
);

//crear otro pruducto para la casa de las plantas
createProduct(
  2,
  "Ensalada de tomate",
  2.5,
  "Cafe jugosa del teatro",
  "https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-1200x828.jpg",
  "La casa de las plantas"
); */

// Insertar un producto
/*
const p = new Product({
    id: 8,
    title: "Barrita tomate",
    price: 1.80,
    description: "Cafe jugosa del teatro",
    image:"https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-768x530.png"
});

// Guardar en la BBDD
p.save()
.then((data)=>console.log(data))
.catch(err=>console.log(err))


// Leer todo de la BBDD
Product.find({}).then(data=>console.log(data));
//Product.updateOne({id: 6}, {price: 2.00}).then(data=>console.log(data));
//Product.deleteOne({id: 6}).then(data=>console.log(data));
*/







