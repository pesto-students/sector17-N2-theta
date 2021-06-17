const express = require("express");
const router = express.Router();
const cors = require("cors");

const {createOrder} = require("../controllers/orders");

const whitelist = ['http://localhost:3000']
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
router.options('/', cors());
//router.get("/", getOrders);

module.exports = router;
