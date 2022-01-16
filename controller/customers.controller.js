let Model = require('../model/model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
Model = Model.Customers

exports.login = async (req,res) =>{
    try{
        let user = await Model.findOne({ where: { email: req.body.email } });

        if (!user){
            return res.status(404).json({ message: "User does not exist!" });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ nif: user.id_nif }, config.secret, { expiresIn: 8600 });

        return res.status(200).json({
            nif:user.id_nif,
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
        let data = await Model.findOne({where: {id_nif: req.body.nif }})

        if(!data){
            Model.create({
                id_nif:req.body.nif,
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password, 8),
                gender:req.body.gender,
                birthday:req.body.birthday
            }).then(data=>{
                res.status(201).json({ message: "New user created."})
            })
        }
        else{
            res.status(500).json({
                message:
                    err.message || "User Already Exists."
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}

exports.getCustomerById = async (req,res) =>{
    try {
        let data = await Model.findOne({where: {id_nif: req.params.id}})

        if (!data){
            res.status(404).json({
                message:
                    err.message || `User with nif ${req.params.nif} does not exist!`
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