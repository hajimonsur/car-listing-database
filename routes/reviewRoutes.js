const express = require("express");
const {addReview, getReviews} = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/:carId", getReviews);
router.post("/:carId", authMiddleware, addReview);

module.exports = router;
