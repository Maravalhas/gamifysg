const Model = require('../model/model')
const Orders = Model.Orders
const Customers = Model.Customers
const utility = require('../utilities/validationtool')

exports.getOrderById = async (req,res) =>{
    try{
        let data = await Orders.findOne({where:{id_order:req.params.id}})

        if(!data){
            res.status(404).json({message:"Order Not Found!"});
        }
        else{
            data.products = JSON.parse(data.products)
            res.status(200).json(data);
        }

    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

exports.getOrderByCustomerNif = async (req,res) =>{
    try{
        let customer = await Customers.findOne({where:{id_nif:req.params.nif}})

        utility.validateToken(req,res)

        if(req.loggedUserNif != customer.id_nif){
            res.status(401).json({message: "You're not authorized to do this request"})
        }
        else{

            if(!customer){
                res.status(404).json({message:"Customer does not exist."});
            }
            else{
                let data = await Orders.findAll({where:{id_nif:req.params.nif}})
    
                if(data == ""){
                    res.status(404).json({message:"Customer has no orders yet."});
                }
                else{
                    res.status(200).json(data);
                }
            }
        }

        
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

exports.registerOrder = async (req,res) =>{
    try{
        let order = await Orders.create({
            id_nif: req.body.nif,
            email:req.body.email,
            address: req.body.address,
            products: JSON.stringify(req.body.products),
            payment_method: req.body.payment_method,
            price: req.body.price,
            taxrate: req.body.taxrate,
            date: Date.now(),
            carrier: req.body.carrier,
            state: "Em Processamento"
        })

        res.status(201).json({message:`Order registered successfully`})

    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}