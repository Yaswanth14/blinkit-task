const { Data } = require("../utils/schema");

module.exports.createData = async (req, res) => {
 try {
    
 } catch (error) {
    console.log(error);
    res.status(500).send({
        message:"Error in creating Data"
    });
 }   
}