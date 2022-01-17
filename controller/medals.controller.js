const Model = require('../model/model')
const Medals = Model.Medals;
const CustomerMedals = Model.CustomerMedals;

exports.getMedal = async (req,res) =>{
    try {
        let medal = await Medals.findOne({where:{id_medal:req.params.id}})

        if(!medal)
        {
            res.status(404).json({
                message: "This medal does not exist."
            });
        }
        
        res.status(200).json(medal);
        
    }
    catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}

exports.associateMedal = async (req,res) =>{
    try{
        let medal = await Medals.findOne({where:{id_medal:req.body.id_medal}})

        if(!medal){
            res.status(404).json({
                message: "This medal does not exist."
            });
        }

        CustomerMedals.create({
            id_nif: req.params.nif,
            id_medal: req.params.id
        })

        res.status(200).json({message:"Medal associated successfully."});
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}