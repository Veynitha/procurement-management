const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const port = process.env.PORT;

const connectDB = require("./db/db");
const routes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();
//app.use(express.urlencoded({ extended: false }));


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(routes);
app.use(requestRoutes);

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/requestRoutes"));
app.use("/api", require("./routes/supplyOrderRoutes"));
app.use("/api", require("./routes/purchaseOrderRoutes"));
app.use("/api", require("./routes/invoiceRoutes"));

connectDB();

app.listen(port, () => console.log(`Server started on port ${port}`));
