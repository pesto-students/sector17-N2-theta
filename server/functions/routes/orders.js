const express = require("express");
const router = express.Router();

const {createOrder, getOrders} = require("../controllers/orders");

router.posts("/", createOrder);
router.get("/", getOrders);

module.exports = router;
