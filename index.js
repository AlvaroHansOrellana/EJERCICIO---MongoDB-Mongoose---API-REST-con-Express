const express = require("express"); // Importamos el paquete express
const mongoose = require('mongoose');
const providersRouter = require('./routes/providers');
const productsRouter = require('./routes/products');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express(); // Inciializar servidor con express


// Connect to MongoDB
mongoose.connect('mongodb://localhost/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

// Use routers
app.use('/api/providers', providersRouter);
app.use('/api/products', productsRouter);


// const port = 3000; // Puerto a usar por el servidor

// Importar middlewares
const manage404 = require("./middlewares/manage404");
// const checkApiKey = require("./middlewares/auth_api_key");
const morgan = require("./middlewares/morgan");

// Logger
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));


app.use(express.json()); // Middleware para parsear el body de las peticiones



// Para ruta no existente
app.use("*", manage404);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));