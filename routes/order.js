const express = require('express');
const router = express.Router();
const date = require('date');
const con = require('../utils/sql');

router.post('/', function (req, res){
    let userId = req.query.userId, addressId = req.query.addressId
    let response = {}

    let sql = "SELECT userId, coffeeId, quantity, price FROM Cart INNER JOIN Coffee ON Cart.coffeeId = Coffee.id WHERE userId = ?"
    let filter = [userId]
    con.query(sql, filter, function (err, result) {
        if (err) {
            response.status = 1
            res.send(response)
        } else {
            if (result.length > 0) {
                let coffees = result
                let sql = "INSERT INTO iCoffee.Order (userid, addressid, orderdate) VALUES (?, ? ,curdate())"
                let dateString = date.toString()
                let filter = [userId, addressId, dateString]
                con.query(sql, filter, function (err, result) {
                    if (err) {
                        response.status = 1
                        res.send(response)
                        console.log(response)
                    } else {
                        let orderId = result.insertId
                        let filter = []
                        let sql = "INSERT INTO iCoffee.OrderDetails (orderId, coffeeId, quantity, price) VALUES ?"
                        for (let i = 0; i < coffees.length; i++) {
                            filter[i] = [orderId, coffees[i].coffeeId, coffees[i].quantity, coffees[i].price]
                        }
                        console.log(filter)
                        con.query(sql, [filter], function (err, result) {

                            if (err) {
                                response.status = 1
                                res.send(response)
                                console.log(response)
                            } else {
                                let sql = "DELETE FROM Cart WHERE userId = ?"
                                let filter = [userId]
                                con.query(sql, filter, function (err, result) {
                                    if (err) {
                                        response.status = 1
                                        res.send(response)
                                        console.log(response)
                                    } else {
                                        response.status = 0
                                        res.send(response)
                                        console.log(response)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }
    })
})

module.exports = router;