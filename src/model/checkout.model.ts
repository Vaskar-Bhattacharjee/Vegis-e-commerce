import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      default: "Bangladesh"
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postcode: {
      type: String,
      required: true
    },
    addressLine1: {
      type: String,
      required: true
    },
    addressLine2: {
      type: String
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"]
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
   
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    status: { 
    type: String, 
    enum: ["Awaiting Payment", "Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },
  stripeSessionId: { 
        type: String, 
        unique: true, 
        sparse: true
    },
    paymentMethod: { 
        type: String, 
        enum: ["COD", "Online"], 
        required: true 
    }
  },
  { timestamps: true }
);

export const checkout =
  mongoose.models.Checkout || mongoose.model("Checkout", checkoutSchema);
