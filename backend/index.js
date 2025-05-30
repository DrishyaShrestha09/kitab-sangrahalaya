const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: ["https://kitab-sangrahalaya.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

// routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Hola Amigo! Welcome to the book server!");
});

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

main()
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch((err) => console.log("MongoDB connection error:", err));

// start server
app.listen(port, () => {
  console.log(`🚀 Server is listening on port ${port}`);
});

module.exports = app;