const Order = require("../models/Order");
const Product = require("../models/Product");
const JWT = require("jsonwebtoken");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).send(orders);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    res.status(200).send(order);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = JWT.verify(req.user, process.env.JWT_SECRET)._id;
    console.log(userId);
    const orders = await Order.find({ userId: userId });
    res.status(200).send(orders);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const createOrder = async (req, res) => {
  try {
    const userId = JWT.verify(req.user, process.env.JWT_SECRET)._id;
    const { tax, shippingFee, cartItems } = req.body;
    let subTotal = 0;
    orderItems = [];

    for (let item of cartItems) {
      const product = await Product.findOne({ _id: item.productId });
      if (!product) {
        return res.status(404).send("Product NOT found.");
      }
      let { _id, title, price, image, discount, inStock } = product;
      orderItem = {
        qty: item.qty,
        title,
        price,
        image,
        productId: _id,
      };
      inStock === 0 ? inStock : (inStock -= item.qty);
      // -----------update inStock Prop in product-------------
      await Product.findOneAndUpdate(
        { _id },
        { inStock },
        { new: true, runValidators: true }
      );
      // ------------------------------------------------------
      const withDiscount = price - (price * discount) / 100;
      subTotal += item.qty * withDiscount;
      orderItems = [...orderItems, orderItem];
    }
    const withTax = subTotal + (subTotal * tax) / 100;

    const total = withTax + shippingFee;

    const order = {
      userId,
      tax,
      shippingFee,
      cartItems: orderItems,
      subTotal,
      total,
    };

    const newOrder = await Order.create(order);
    res.status(201).send(newOrder);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).send(updatedOrder);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getUserOrders,
  createOrder,
  updateOrder,
};
