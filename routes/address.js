const express = require('express');
const router = express.Router();
const con = require('../utils/sql');

router.post('/:id', function (req , res){
    let id = req.params.id
    let address = req.body
    console.log(address)
    let sql = "INSERT INTO Address (userId, title, country, city, zip, phone, billingAddress, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    let filter = [id ,address.title, address.country, address.city, address.zip, address.phone, address.billingAddress, address.latitude, address.longitude]
    con.query(sql, filter, function (err, result) {
        if (err) {
            console.log({"status":1})
            res.send({"status":1})
        } else {
            console.log({"status":0})
            res.send({"status": 0})
        }
    })
})

router.get('/:id', function (req, res){
    let id = req.params.id
    let response = {}
    let sql = "SELECT id, title, country, city, zip, phone, billingAddress, latitude, longitude FROM Address WHERE Address.userId = ?"
    let filter = [id]
    con.query(sql, filter, function (err, result) {
        if (err) {
            response.status = 1
        } else {
            response.status = 0
            response.addresses=result
        }
        res.send(response)
    })
})

module.exports = router;