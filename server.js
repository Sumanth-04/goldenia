const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Define a route for the root URL ("/")
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//process.env.PORT ||
const PORT = 3000;
const mongodbstr =
  "mongodb+srv://sumanthsk901:sumanthsk901@cluster0.gyjfl3f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(mongodbstr)
  .then(() => {
    console.log("MongoDB connected");

    // Start the server

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  })
  .catch((err) => console.error(err));
