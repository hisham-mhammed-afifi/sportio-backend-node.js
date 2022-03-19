const mongoose = require("mongoose");

const cartItemsSchema = new mongoose.Schema({
  productId: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [cartItemsSchema],
    tax: {
      type: Number,
      required: true,
      default: 14,
    },
    shippingFee: {
      type: Number,
      required: true,
      default: 0,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "delivered", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
