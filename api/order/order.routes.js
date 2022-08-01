const express = require("express");
const {
  requireAuth,
  requireAdmin,
} = require("../../middlewares/requireAuth.middleware");
const { getorders, addorder, updateorder } = require("./order.controller");
const router = express.Router();

router.get("/", getorders);
router.post("/", addorder);
router.put("/:id", updateorder);

module.exports = router;
