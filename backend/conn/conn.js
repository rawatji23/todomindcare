const mongoose = require("mongoose");

const conn = async (req, res) => {
    try {
        await mongoose.connect("mongodb+srv://vijayrawat:vijayrawat@cluster0.dsxbi.mongodb.net/");
        console.log("Connected");
        // Only send a response if you are inside a route handler
        if (res) {
            res.status(200).json({ message: "Connected" });
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        if (res) {
            res.status(400).json({ message: "Not connected" });
        }
    }
};

// Call `conn` only if you're testing outside of a route handler
conn();
