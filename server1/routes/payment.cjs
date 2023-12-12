const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_51OHXSACTlGFPitgcemoqsXwCAJLTcB6nSG9NkByPnzoQtXVD2pvHuMTwqbce4eQcLyCDR3bZTsCf4MAjvDlXpeLZ00Lp2iSdbN");

router.post("/create-checkout-session",async(req,res)=>{
    const {products} = req.body;


    const lineItems = products.map((product)=>({
        price_data:{
            
            currency:"usd",
            product_data:{
                name:product.title,
            },
            unit_amount:product.price * 100,
        },
        quantity:product.days
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000",
        cancel_url:"http://localhost:3000/cancel",
    });

    res.json({id:session.id})
 
})



module.exports= router