const { addChef, getChefs } = require("../controllers/chefController");

const router = require("express").Router();

router.post("/add", addChef);
router.get("/get", getChefs);

module.exports = router;
