let express = require('express');

let app = express();
app.use(express.json());

const authRouter = require('./routes/auth');
const addressRouter = require('./routes/address');
const cartRouter = require('./routes/cart');
const coffeeRouter = require('./routes/coffee');
const orderRouter = require('./routes/order');

app.use('/auth', authRouter)
app.use('/address', addressRouter)
app.use('/cart', cartRouter)
app.use('/coffee', coffeeRouter)
app.use('/order', orderRouter)

let server = app.listen(8081, function () {
    console.log("iCoffee API listening at %s", server.address().port)
})