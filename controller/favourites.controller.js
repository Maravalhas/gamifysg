const Favourites = require('../model/model.js').Favourites

exports.getFavourites = async(req,res) =>{
    try{
        utility.validateToken(req,res)

        if(req.loggedUserNif != req.params.nif){
            res.status(401).json({message: "You're not authorized to do this request"})
        }
        else{
            const data = await Favourites.findOne({where:{id_nif:req.params.nif}})

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

exports.updateFavourites = async(req,res) =>{
    try{
        utility.validateToken(req,res)

        if(req.loggedUserNif != req.params.nif){
            res.status(401).json({message: "You're not authorized to do this request"})
        }

        else{

            const data = await Favourites.findOne({where:{id_nif : req.params.nif}})

            if(!data){
                res.status(404).json({
                    message: "Customer does not exist."
                });
            }
            else{
                Favourites.update({
                    id_products:req.body.products
                },{where:{id_nif:req.params.nif}}).then(()=>{
                    res.status(200).json({message:"Customer favourites updated"})
                })
            }
        }

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}



exports.createFavourite = async (req, res) => {
    try {
        let data = await Favourites.findOne({ where: { id_nif: req.body.nif } })

        if (!data) {
            Favourites.create({
                id_nif: req.body.nif,
                id_products: req.body.id_products,
                name : req.body.name,
                category: req.body.category,
                price: req.body.price,
                img: req.body.img
            }).then(data => {

                
                res.status(201).json({ message: "New favourite created." })
            })
        }
        else {
            res.status(500).json({
                message: "Favourite Already Exists."
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}