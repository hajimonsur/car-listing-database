const Car = require("../models/Car");

// create a new car
exports.createCar = async (req, res) => {
  try {
    const car = await Car.create({ ...req.body, postedBy: req.user.userId });

    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//handle get all cars
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// handle get car by id
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );
    res.json(car);
  } catch (error) {
    res.status(400).json({ error: "Car not found" });
  }
};

// handle delete
exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
