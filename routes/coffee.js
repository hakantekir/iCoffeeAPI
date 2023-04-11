const express = require('express');
const router = express.Router();
const con = require('../utils/sql');

router.get('/', function (req, res){
    let name = "%"+req.query.search+"%"
    let id = req.query.id
    let response = {}
    let sql = "SELECT id,name,description,price,image,quantity FROM iCoffee.Coffee LEFT JOIN iCoffee.Cart ON Cart.userId = ? AND Cart.coffeeId = Coffee.id WHERE Coffee.name LIKE (?)"
    let filter = [id, name]
    con.query(sql, filter, function (err, result) {
        if (err) {
            response.status = 1
        } else {
            response.status = 0
            response.coffees = result
        }
        console.log(response)
        res.send(response)
    })
})

module.exports = router;