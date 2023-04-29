const Interest = require("../models/interest.model");

const getInterests = async (req, res) => {
  try {
    const interests = await Interest.find();
    res.status(200).json(interests);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const postInterests = async (req, res) => {
    try {
        const newInterest = new Interest(req.body);
        await newInterest.save();
        res.status(201).json(newInterest);
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
      }
  };

module.exports = {
  getInterests,
  postInterests
};
