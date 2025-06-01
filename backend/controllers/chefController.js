const chefSchema = require("../models/chefSchema");

exports.addChef = async (req, res) => {
  try {
    const { name } = req.body;

    const chef = new chefSchema({
      name,
    });
    await chef.save();
    return res.status(201).json({
      message: "Chef added successfully",
      chef,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.getChefs = async (req, res) => {
  try {
    const chefs = await chefSchema.find({});

    return res.status(200).json({
      message: "Chefs fetched successfully",
      chefs,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
