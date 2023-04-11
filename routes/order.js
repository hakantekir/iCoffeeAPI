const express = require('express');
const router = express.Router();
const date = require('date');
const con = require('../utils/sql');

router.post('/', function (req, res){
    let userId = req.query.userId, addressId = req.query.addressId
    let response = {}
    getCartItems(userId, function(err, coffees) {
        if (err) {
            response.status = 1
            console.log(response)
            return res.send(response)
        }
        console.log(coffees)
        createOrder(userId, addressId, function(err, orderId) {
            if (err) {
                response.status = 1
                console.log(response)
                return res.send(response)
            }
            insertOrderDetails(orderId, coffees, function(err) {
                if (err) {
                    response.status = 1
                    console.log(response)
                    return res.send(response)
                }
                deleteCart(userId, function(err) {
                    if (err) {
                        response.status = 1
                        console.log(response)
                        return res.send(response)
                    }
                    response.status = 0
                    console.log(response)
                    res.send(response)
                })
            })
        })
    })
})

function getCartItems(userId, callback) {
    let sql = "SELECT userId, coffeeId, quantity, price FROM Cart INNER JOIN Coffee ON Cart.coffeeId = Coffee.id WHERE userId = ?"
    let filter = [userId]
    con.query(sql, filter, function (err, result) {
        if (err) {
            callback(err)
        } else {
            callback(null, result)
        }
    })
}

function createOrder(userId, addressId, callback) {
    let sql = "INSERT INTO iCoffee.Order (userid, addressid, orderdate) VALUES (?, ? ,curdate())"
    let dateString = date.toString()
    let filter = [userId, addressId, dateString]
    con.query(sql, filter, function (err, result) {
        if (err) {
            callback(err)
        } else {
            let orderId = result.insertId
            callback(null, orderId)
        }
    })
}

function insertOrderDetails(orderId, coffees, callback) {
    let filter = []
    let sql = "INSERT INTO iCoffee.OrderDetails (orderId, coffeeId, quantity, price) VALUES ?"
    for (let i = 0; i < coffees.length; i++) {
        filter[i] = [orderId, coffees[i].coffeeId, coffees[i].quantity, coffees[i].price]
    }
    con.query(sql, [filter], function (err, result) {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}

function deleteCart(userId, callback) {
    let sql = "DELETE FROM Cart WHERE userId = ?"
    let filter = [userId]
    con.query(sql, filter, function (err, result) {
        if (err) {
            callback(err)
        } else {
            callback(null)
        }
    })
}


module.exports = router;