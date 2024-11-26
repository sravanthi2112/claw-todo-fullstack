const mongoose = require("mongoose")

const conn = async (req,res) => {
    try {
        await mongoose.connect("mongodb+srv://sravanthi2112:clawtodo@cluster0.jczr20g.mongodb.net/")
    .then(() => {
        console.log("Connected")
    })
    } catch (error) {
        res.status(400).json(error)
    }
}

conn();
