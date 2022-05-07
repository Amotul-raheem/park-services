import express from "express"
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors"
import {mongodbConnection} from "./config/MongoDBConnection.js";
import {authenticationRouter} from "./routes/authentication/AuthenticationRouter.js";
import {passwordRouter} from "./routes/authentication/PasswordRouter.js";
import {bookingRouter} from "./routes/booking/BookingRouter.js";
import parkSpotsRouter from "./routes/booking/ParkSpotsRouter.js";
import {userProfileRouter} from "./routes/profile/UserProfileRouter.js";

mongodbConnection()

dotenv.config()
const app = express();
app.use(cors())

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

const PORT = process.env.PORT

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Authentication
app.use("/api", authenticationRouter);
app.use("/api", passwordRouter)

//Booking
app.use("/api", bookingRouter);
app.use("/api", parkSpotsRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//User Profile
app.use("/api", userProfileRouter)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});









