const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
app.use(express.json());

const { createUser } = require("./types");
const { User } = require("./schema");


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})