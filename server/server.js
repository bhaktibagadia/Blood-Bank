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



// handling cors
const corsOptions = {
    origin: "*",
    method: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
// middleware responsible to parse json data in request body



app.get("/", (req, res) => {
    return res.status(200).json({ message: "Jai Mata Di" });
})
app.use(express.json());
app.use('/api/auth', authRoute);
app.use("/api/form", contactRoute);
app.use('user/form', additionalRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);
app.use(errorMiddleware);

const PORT = 8080;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server at port ${PORT}`);
    });
});
