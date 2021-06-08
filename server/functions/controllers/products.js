const productsDB = require("../firebase/firestore/products");

const getProducts = async (req, res, next) => {
  try {
    res.status(200).json(await productsDB.getProducts(req.query));
  } catch (e) {
    next(e);
  }
};

const getCategories = async (req, res, next) => {
  try {
    res.status(200).json(await productsDB.getCategories(req.query));
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getProducts,
  getCategories,
};
