const TableSchema = require("../models/tableSchema");

exports.createTable = async (req, res) => {
  try {
    const { name, chairs, number } = req.body;
    const table = await TableSchema.create({
      name,
      chairs,
      number,
    });
    res.status(201).json({
      success: true,
      table,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllTables = async (req, res) => {
  try {
    const tables = await TableSchema.find();
    res.status(200).json({
      success: true,
      tables,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await TableSchema.findByIdAndDelete(id);
    if (!table) {
      return res.status(404).json({
        success: false,
        message: "Table not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Table deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
