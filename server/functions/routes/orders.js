const express = require("express");
const router = express.Router();

const {createOrder} = require("../controllers/orders");

const whitelist = ['http://localhost:3000', 'https://sector17.netlify.app']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

router.post("/", createOrder);
//router.get("/", getOrders);

module.exports = router;
