const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

module.exports.requireSignIn = (req, res, next) => {
    const jwtToken = req.headers.authorization;
    try {
        const decodedValue = jwt.verify(jwtToken, process.env.JWT_SECRET);

        if (decodedValue.email) {    
            req.email = decodedValue.email;
            next();
        } else {
            res.json({
                success: false,
                message: "You are not authenticated"
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: "Invalid Token!"
        })
    }
}
