require('dotenv').config();

const express = require('express');
const Razorpay = require('razorpay');
const app = express();

app.use(express.json());
app.use(express.static('./public'));

const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//     res.send("index.html");
// });

app.post("/order", async (req, res) => {
    const amount = req.body.amount;
    var instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    var options = {
        amount: amount * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    // instance.orders.create(options, function(err, order) {
    //     res.json(order);
    // });
    const myOrder = await instance.orders.create(options)

    res.status(200).json({
        success : true,
        amount,
        order: myOrder
    });

})

app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});
