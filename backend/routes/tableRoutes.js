const {
  createTable,
  getAllTables,
  deleteTable,
} = require("../controllers/tableController");

const router = require("express").Router();

router.post("/create", createTable);
router.get("/all", getAllTables);
router.delete("/delete/:id", deleteTable);

module.exports = router;
