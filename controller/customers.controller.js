const url = "https://design.sofiagodinho.com/api/customers"
var key = require('../config/db.config').key
var convert = require('xml-js')
const axios = require('axios')

class Customer {
    constructor(id,firstname,lastname,nif,email,password,gender,birthday){
        this.id=id,
        this.firstname=firstname,
        this.lastname=lastname,
        this.nif = nif,
        this.email=email,
        this.password=password,
        this.gender=gender, 
        this.birthday=birthday
    }
}

exports.getCustomerById = async (req,res) =>{
    try {
        let data = await axios.get(url+`/${req.params.id}?`+key)
        data = JSON.parse(convert.xml2json(data.data, {compact: true, ignoreComment: true, spaces: 4}))
        data = data.prestashop.product
        const customer = new Customer(data.id._cdata,data.firstname._cdata,data.lastname._cdata,data.email._cdata,data.passwd._cdata,data.id_gender._cdata,data.birthday._cdata)        
        res.status(200).json(customer)
    }
    catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}

exports.login = async (req,res) =>{

    try{

    }
    catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}

exports.register = async (req,res) =>{
    try {
    }
    catch (err) {
        res.status(500).json({
            message:err.message
        });
    }
}