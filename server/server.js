require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const connectDb = require('./utils/db');
const serviceRoute = require('./router/service-router');
const errorMiddleware = require('./middlewares/error-middleware');
const contactRoute = require('./router/contact-router');
const additionalRoute = require("./router/user-router");
const adminRoute = require("./router/admin-router");

// Handling CORS
const corsOptions = {
    origin: 'https://blood-bank-eight-iota.vercel.app', // Specify the allowed origin
    credentials: true, // Enable credentials
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
};
app.use(cors(corsOptions));

// Middleware to parse JSON data in the request body
app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Jai Mata Di" });
});

app.use('/api/auth', authRoute);
app.use("/api/form", contactRoute);
app.use('/user/form', additionalRoute);  // Corrected path
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);
app.use(errorMiddleware);

const PORT = 8080;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
});
