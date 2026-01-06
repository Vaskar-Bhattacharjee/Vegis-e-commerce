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
    }
  },
  { timestamps: true }
);

export const checkoutUser =
  mongoose.models.User || mongoose.model("Checkout", checkoutSchema);
