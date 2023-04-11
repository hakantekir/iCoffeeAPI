const express = require('express')
const router = express.Router()
const con = require('../utils/sql')

router.get('/', function (req, res){
    let id = req.query.id
    let response = {}
    let sql = "SELECT id, name, quantity, price FROM Cart INNER JOIN Coffee ON Coffee.id = Cart.coffeeId WHERE Cart.userId = ?"
    let filter = [id]
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

router.post('/', function (req, res){
    let body = req.body
    let userId = req.query.userId
    console.log(body)
    let response = {}
    let sql = "INSERT INTO Cart (userId, coffeeId, quantity) VALUES (?, ?, ?)"
    let filter = [userId, body.id, body.quantity]
    con.query(sql,filter, function (err, result) {
        response.status = (err ? 1 : 0)
        console.log(response)
        res.send(response)
    })
})

router.patch('/', function (req, res) {
    let body = req.body
    let userId = req.query.userId
    console.log(userId, body)
    let response = {}
    let sql = "UPDATE Cart SET quantity = ? WHERE userId = ? AND coffeeId = ?"
    let filter = [body.quantity, userId, body.id]
    con.query(sql,filter, function (err, result) {
        response.status = (err ? 1 : 0)
        console.log(response)
        res.send(response)
    })
})

router.delete('/', function (req, res){
    let coffeeId = req.body.id
    let userId = req.query.userId
    console.log(userId, coffeeId)
    let response = {}
    let sql = "DELETE FROM Cart WHERE userId = ? AND coffeeId = ?"
    let filter = [userId, coffeeId]
    con.query(sql,filter, function (err, result) {
        response.status = (err ? 1 : 0)
        console.log(response)
        res.send(response)
    })
})

router.get('/details/', function (req, res){
    let id = req.query.id
    let response = {}

    let sql = "SELECT * FROM Address WHERE userId = ?"
    let filter = [id]
    con.query(sql,filter, function (err, result) {
        if (err) {
            response.status = 1
            res.send(response)
        }
        else {
            if (result){
                response.address = result
                sql = "SELECT SUM(price*quantity) as price FROM Cart INNER JOIN Coffee ON Cart.coffeeId = Coffee.id WHERE userId = ?"
                con.query(sql, filter, function (err, result) {
                    if (err) {
                        response.status = 1
                    } else {
                        if (result[0].price) {
                            response.status = 0
                            response.price = result[0].price
                        } else {
                            response.status = 3
                        }

                    }
                    res.send(response)
                    console.log(response)
                })
            } else {
                response.status = 2
                res.send(response)
            }
        }
    })
})

module.exports = router