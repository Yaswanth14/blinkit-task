const express = require('express');
const app = express();
const dotenv = require('dotenv');
const {requireSignIn} = require('./utils/middleware');
const { signUp, signIn } = require('./utils/userController');

dotenv.config();
app.use(express.json());

// register as a new user
app.post("/signup", signUp);

//Sign in as the registered user
app.post('/signin', signIn);


// app.post('/create-data', requireSignIn, (req, res) => {

// });


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})