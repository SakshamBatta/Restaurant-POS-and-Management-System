const express = require("express");
const cors = require("cors");
const connectDB = require("./database/config");
require("dotenv").config();
const tableRoutes = require("./routes/tableRoutes");
const orderRoutes = require("./routes/orderRoutes");
const chefRoutes = require("./routes/chefRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/tables", tableRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chefs", chefRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
