const mongoose = require("mongoose");

const ExpoSchema = new mongoose.Schema(
  {
    // Informations personnelles
    visitorType: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Le numéro de téléphone est requis"],
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    newsletter: {
      type: Boolean,
      required: true,
      trim: true,
    },
    terms: {
      type: Boolean,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // Ajoute createdAt et updatedAt automatiquement
);
const Expo = mongoose.model("Expo", ExpoSchema);
module.exports = Expo;
