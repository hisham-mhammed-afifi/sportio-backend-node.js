const Category = require("../models/Category");
const Product = require("../models/Product");

const addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).send(category);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getAllCategories = async (req, res) => {
  try {
    console.log(req.user);
    const categories = await Category.find({});
    res.status(200).send(categories);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const getCategoryProducts = async (req, res) => {
  try {
    const products = await Product.find({ categoryId: req.params.id });
    res.status(200).send(products);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).send(category);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      res.status(404).send("this category already removed");
    }
    await category.remove();
    res.status(200).send("category removed successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryProducts,
  updateCategory,
  deleteCategory,
};
