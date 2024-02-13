const { Data } = require("../utils/schema");
const fs = require('fs');

module.exports.createData = async (req, res) => {
 try {
    const {name} = req.fields
    const {photo} = req.files
    if (!name || !photo) return res.send({error: "Missing fields"});
    if(photo.size > 1000000) return res.send({error:  "File size too large, should be less than 1mb"});

    const data = new Data({name});
    if(photo){
        data.photo.data = fs.readFileSync(photo.path);
        data.photo.contentType = photo.type;
    }
    await data.save();
    res.status(201).send({
        message: "Data created successfully",
        data: data
    });
    
 } catch (error) {
    console.log(error);
    res.status(500).send({
        message:"Error in creating Data"
    });
 }   
}


module.exports.getData = async (req, res) => {
    try {
        const data = await Data
        .find({})
        .limit(10)
        .sort({ createdAt: -1});

        res.status(200).send({
            countTotal: data.length,
            message: data
        })
    } catch (error) {
        res.status(500).send({
            message:"Error in getting Data"
        });
    }
}