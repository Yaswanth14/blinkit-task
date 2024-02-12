const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Database ${conn.connection.host}`);
    } catch (error) {
        console.log('Error in mongo', error);
    }
}
connectDB();

// Schema
const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true})

const User = mongoose.model('User', UserSchema);
const Data = mongoose.model('Data', DataSchema);

module.exports = {
    User,
    Data
}

