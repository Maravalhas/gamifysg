const Cart = require('../model/model.js').Cart

exports.getCart = async(req,res) =>{
    try{
        utility.validateToken(req,res)

        if(req.loggedUserNif != req.params.nif){
            res.status(401).json({message: "You're not authorized to do this request"})
        }
        else{
            const data = await Cart.findOne({where:{id_nif:req.params.nif}})

            if(!data){
                res.status(404).json({
                    message: "Customer does not exist."
                });
            }
            else{
                res.status(201).json(data)
            }
        }
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

exports.updateCart = async(req,res) =>{
    try{
        utility.validateToken(req,res)

        if(req.loggedUserNif != req.params.nif){
            res.status(401).json({message: "You're not authorized to do this request"})
        }

        else{

            const data = await Cart.findOne({where:{id_nif : req.params.nif}})

            if(!data){
                res.status(404).json({
                    message: "Customer does not exist."
                });
            }
            else{
                Cart.update({
                    id_products:req.body.products,
                    products_quantity:req.body.quantity
                },{where:{id_nif:req.params.nif}}).then(()=>{
                    res.status(200).json({message:"Customer cart updated"})
                })
            }
        }

    }
    catch(err){
        res.status(500).json({message:err.message});
    }

}