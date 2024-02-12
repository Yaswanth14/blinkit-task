const dotenv = require('dotenv');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const { createUser } = require("./validations");
const { User } = require("./schema");


dotenv.config();

module.exports.signUp = async (req, res)=>{
    const createPayload = req.body;
    const parsePayload = createUser.safeParse(createPayload);
    if(!parsePayload.success){
        return res.status(411).json({
            message: "You send a wrong input"
        })
    }
    const password = await bcrypt.hash(createPayload.password, 10);
    try{
        const userExists = await User.findOne({email: createPayload.email});
        if(userExists) return res.send({message: "User already exists"});

        await User.create({
            email: createPayload.email,
            password: password
        })

        res.json({
            message: "User created successfully!"
        });
    } catch(e){

        res.status(400).send({message: 'Error occured in user creation'})
    }
}


module.exports.signIn = async (req, res) => {

    const createPayload = req.body;
    const parsePayload = createUser.safeParse(createPayload);
    if(!parsePayload.success){
        return res.status(411).json({
            message: "You send a wrong input"
        })
    }
    const user = await User.findOne({
        email: createPayload.email
    })
    const hashedPassword = user.password;
    const isValid = bcrypt.compare(createPayload.password, hashedPassword);
    try {
        if(user && isValid){
            const token = jwt.sign({
                email: user.email
            }, process.env.JWT_SECRET, {
                expiresIn: "3d",
            });
    
            res.status(200).send({
                success: true,
                message: "User loged in",
                user: {
                    _id: user._id,
                    name: user.email
                },
                token: token
            });
        }
        else{
            res.send({
                success: false,
                message: "Incorrect email or password"
            });
        }
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "User doesn't exist"
        });
    }  
}