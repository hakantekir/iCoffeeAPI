const express = require('express');
const router = express.Router();
const con = require('../utils/sql');

router.post('/signin', function (req, res){
    let user = req.body
    let response
    console.log(user)
    let sql = "SELECT id, password FROM Users WHERE Users.Username = ?"
    let filter = [user.username]
    con.query(sql, filter, function (err, result) {
        if (err) throw err;
        if(!result.length){
            response = {"status":1}
            console.log(response)
            res.send(response)
        }
        else if(result[0]["password"]!==user.password){
            response = {"status":2}
            console.log(response)
            res.send(response)
        }
        else {
            user.id = result[0]["id"]
            getDetails(user, function () {
                response = {"status": 0, "user": user}
                console.log(response)
                res.send(response)
            });
        }
    });
})

router.post('/signup', function (req, res){
    let user = req.body
    insertUser(user, res)
})

function insertUser(user, res) {
    let sql = "INSERT INTO Users (username, password) VALUES (?, ?)"
    let filter = [user.username, user.password]
    con.query(sql, filter, function (err, result) {
        if (err) {
            let response = {"status": 1}
            res.send(response)
        }
        else {
            user.id = result.insertId
            insertDetails(user, res)
        }
    });
}

function insertDetails(user, res) {
    let sql = "INSERT INTO UserDetails (id, name, lastname, mail, phone) VALUES (?, ?, ?, ?, ?)"
    let filter = [user.id, user.userDetails.name, user.userDetails.lastname, user.userDetails.mail, user.userDetails.phone]
    con.query(sql, filter, function (err, result) {
        let response = {}
        if (err) {
            response["status"] = 1
        }
        else {
            response["status"] = 0
            response.user = {"id": user.id}
        }
        console.log(response)
        res.send(response)
    });
}

function getDetails(user, callback) {
    let sql = "SELECT * FROM UserDetails WHERE UserDetails.id = ?"
    let filter = [user.id]
    con.query(sql, filter, function (err, result) {
        if (err) throw err;
        if(!result.length){
            user.details = {}
        }
        else {
            user.details = result[0]
        }
        callback()
    });
}

module.exports = router;