const Review = require("../models/Review");

// handle add review
exports.addReview = async (req, res) => {
    try {
        const review = await Review.create({ ...req.body, User: req.user.userId });
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// handle get reviews by car id
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ Car: req.params.id }).populate("user", "name");
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

