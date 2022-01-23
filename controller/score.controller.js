const Score = require('../model/model').Score

exports.getCustomerScore= async (req,res) =>{
    try {
        let data = await Score.findOne({where:{id_nif:req.params.nif}})
        if(!data)
        {
            res.status(404).json({
                message: "Customer does not exist."
            });
        }
        else{
                res.status(200).json(data);
        }
    }
    catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}

exports.updateCustomerScore = async (req,res) =>{
    try {
        let data = await Score.findOne({where:{id_nif:req.params.nif}})
        if(!data)
        {
            res.status(404).json({
                message: "Customer does not exist."
            });
        }
        else{
            Score.update({points: data.points + req.body.points},{where:{id_nif:req.params.nif}})
            .then(res.status(201).json({ data, message: "Customer score updated", location: "/score/" + req.params.nif }))
        }
    }
    catch (err) {
        res.status(500).json({
            message:err.message || "Some Error Occurred"
        });
    }
}