const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Query = require('./models/query.model');

const app = express();
const port = 3000;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://suganthan0001:vithya0001@cluster0.ta00wr1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (e) {
    console.log(e);
  }
};

connectToMongoDB();

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

app.use(express.json());

app.use(cors());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json({ message: "Login successful!!" });
    } else {
      res.status(401).json({ message: "Invalid username or password." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

app.post("/insertMany", async (req, res) => {
    try {
        const data = req.body;
        const result = await User.insertMany(data);
        res.status(200).json({ message: "Data inserted successfully!" });
      } catch (error) {
        console.error('Error inserting data:', error);
      }
})

app.post('/submit-query', async (req, res) => {
  try {
    const newQuery = new Query(req.body);
    const savedQuery = await newQuery.save();
    res.status(201).send(savedQuery);
  } catch (error) {
    console.error('Error saving query:', error);
    res.status(500).json({"message":'Error saving query'});
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
