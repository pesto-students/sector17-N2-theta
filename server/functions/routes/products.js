const express = require("express");
const router = express.Router();

const {getProducts, getCategories} = require("../controllers/products");

router.get("/", getProducts);
router.get("/categories", getCategories);

module.exports = router;
