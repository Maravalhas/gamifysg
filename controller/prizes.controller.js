const Model = require('../model/model')
const Prizes = Model.Prizes;
const CustomerPrizes = Model.CustomerPrizes;
const Score = Model.Score;

exports.getPrize = async (req,res) =>{
    try {
        let data = await Prizes.findOne({where:{id_prize:req.params.id}})
        if(!data)
        {
            res.status(404).json({
                message: "This prize does not exist."
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

exports.buyPrize = async (req,res) =>{
    try {
        utility.validateToken(req,res)

        if(req.loggedUserNif != req.params.nif){
            res.status(401).json({message: "You're not authorized to do this request"})
        }
        else{
            let prize = await Prizes.findOne({where:{id_prize:req.params.id}})
            if(!prize)
            {
                res.status(404).json({
                    message: "This prize does not exist."
                });
            }
            else{
                let customerScore = await Score.findOne({where:{id_nif:req.params.nif}})
                if (!customerScore){
                    res.status(404).json({
                        message: "This customer does not exist."
                    });
                }
                else{
                    if(customerScore <= prize.points){
                        res.status(401).json({
                            message: "This customer does not have enough points."
                        });
                    }
                    else{
                        CustomerPrizes.create({
                            id_nif: req.params.nif,
                            id_prize: req.params.id
                        })
                        res.status(200).json({message:"Prize bought successfully."});
                    }
                }
            }
        }
    }
    catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}