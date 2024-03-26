const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;
app.use(cors());
app.use(bodyParser.json());
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection Success!");
});
y
const staffRouter= require("./routes/staff");
app.use("/staff",staffRouter);

const eventRouter= require("./routes/event");
app.use("/events",eventRouter);

const roomRouter= require("./routes/rooms");
app.use("/rooms",roomRouter);

const inventoryRouter= require("./routes/inventory");
app.use("/inventory",inventoryRouter);


const kitchenRouter= require("./routes/kitchen");
app.use("/kitchen",kitchenRouter);

const maintenanceRouter= require("./routes/maintenance");
app.use("/maintenance",maintenanceRouter);

const financeRouter= require("./routes/finance");
app.use("/finance",financeRouter);

const userRouter= require("./routes/user");
app.use("/user",userRouter);

const packageRouter= require("./routes/package");
app.use("/package",packageRouter);

const bookingRouter= require("./routes/booking");
app.use("/booking",bookingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
