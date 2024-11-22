const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON data

// MongoDB connection setup
const uri = 'mongodb+srv://reshmireshma1408:Reshma1408@reshma.0ltvohh.mongodb.net/?retryWrites=true&w=majority&appName=Reshma';
const client = new MongoClient(uri);
let database;

// Connect to MongoDB
client.connect()
  .then(() => {
    database = client.db("RS"); // Database name
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit if connection fails
  });

// API to save student data
app.post("/api/students/add", async (req, res) => {
  try {
    const { id, name, email, age, branch, address, phone, grade, year, feedback } = req.body;

    // Validate input data
    if (!id || !name || !email || !age) {
      return res.status(400).json({ message: "ID, Name, Email, and Age are required!" });
    }

    const collection = database.collection("Students");
    const result = await collection.insertOne(req.body); // Insert student data
    res.status(200).json({ message: "Student saved successfully!", result });
  } catch (error) {
    console.error("Error saving student:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// API to delete student by ID
app.delete("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const collection = database.collection("Students");

    const result = await collection.deleteOne({ id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// API to get all students
app.get("/api/students", async (req, res) => {
  try {
    const collection = database.collection("Students");
    const students = await collection.find().toArray(); // Get all students
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// API to get a student by ID
app.get("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const collection = database.collection("Students");
    const student = await collection.findOne({ id }); // Find student by ID

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
