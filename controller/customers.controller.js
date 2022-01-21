const Model = require('../model/model.js')
const Customers = Model.Customers
const Score = Model.Score
const Cart = Model.Cart

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')

exports.login = async (req,res) =>{
    try{
        let customer = await Customers.findOne({ where: { email: req.body.email } });

        if (!customer){
            return res.status(404).json({ message: "Customer does not exist!" });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, customer.password)

        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ id_nif: customer.id_nif }, config.secret, { expiresIn: 8600 });

        return res.status(200).json({
            nif:customer.id_nif,
            accessToken: token
        })

    }
    catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}

exports.register = async (req,res) =>{
    try {
        let data = await Customers.findOne({where: {id_nif: req.body.nif }})

        if(!data){
            Customers.create({
                id_nif:req.body.nif,
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password, 8),
                gender:req.body.gender,
                birthday:req.body.birthday
            }).then(data=>{

                Score.create({
                    id_nif:req.body.nif,
                    points:0
                })

                Cart.create({
                    id_nif:req.body.nif
                })

                res.status(201).json({ message: "New customer created."})
            })
        }
        else{
            res.status(500).json({
                message:
                    err.message || "Customer Already Exists."
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}

exports.getCustomerByNif = async (req,res) =>{
    try {
        let data = await Customers.findOne({where: {id_nif: req.params.nif}})

        if (!data){
            res.status(404).json({
                message:
                    err.message || `Customer with nif ${req.params.nif} does not exist!`
            })
        }
        else{
            res.status(201).json(data)
        }
    }
    catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}