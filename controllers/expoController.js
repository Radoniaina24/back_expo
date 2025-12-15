const Expo = require("../models/expoModel");

// POST /api/candidate
const createExpo = async (req, res) => {
  try {
    // Récupération des données depuis le body
    const {
      visitorType,
      title,
      firstName,
      lastName,
      email,
      phone,
      country,
      company,
      position,
      industry,
      newsletter,
      terms,
    } = req.body;
    // verification si 'email est déja utilisé
    // const emailExist = await Expo.findOne({ email: email });
    // if (emailExist) {
    //   return res
    //     .status(401)
    //     .json({ message: "Cette email est déja utilisé ." });
    // }
    // Création du recruteur
    const newExpo = new Expo({
      visitorType,
      title,
      firstName,
      lastName,
      email,
      phone,
      country,
      company,
      position,
      industry,
      newsletter,
      terms,
    });
    await newExpo.save();

    return res.status(201).json({
      message: "Candidature soumise avec succès.",
    });
  } catch (error) {
    console.error("Erreur lors de la soumission de candidature :", error);
    return res
      .status(500)
      .json({ message: "Une erreur interne s'est produite." });
  }
};
// GET /api/expo
const getAllExpo = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sort, status } = req.query;
    // Construction dynamique des filtres
    const filters = {};

    if (search) {
      filters.$or = [
        { lastName: { $regex: search, $options: "i" } },
        {
          firstName: { $regex: search, $options: "i" },
        },
      ];
    }
    if (status && status !== "all") {
      filters.status = status;
    }
    const sortOption = sort === "asc" ? 1 : -1;

    const totalExpos = await Expo.countDocuments(filters);
    const totalPages = Math.ceil(totalExpos / limit);

    const expos = await Expo.find(filters)
      .sort({
        createdAt: sortOption,
      })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      totalExpos,
      totalPages,
      currentPage: parseInt(page),
      expos,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des candidatures :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

// Delete /api/expo
const deleteExpo = async (req, res) => {
  try {
    const { id } = req.params;
    const expo = await Expo.findById(id);
    if (!expo) {
      return res.status(404).json({ message: "Candidature non trouvée" });
    }
    // Suppression du Candidature
    await Expo.deleteOne({ _id: id });
    res.status(200).json({ message: "Candidature supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

module.exports = {
  createExpo,
  getAllExpo,
  deleteExpo,
};
