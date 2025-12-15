const express = require("express");
const expoRouter = express.Router();
const expoController = require("../controllers/expoController");

expoRouter.post("/", expoController.createExpo);
expoRouter.get("/", expoController.getAllExpo);
expoRouter.delete("/:id", expoController.deleteExpo);
module.exports = expoRouter;
