const mongoose = require("mongoose");
const Report = require("../models/Report");
const MedicineScan = require("../models/MedicineScan");
const { reports, medicines } = require("../data/memoryStore");

const mongoOn = () => mongoose.connection.readyState === 1;

async function getReports(req, res) {
  if (mongoOn()) {
    const data = await Report.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(30);
    return res.json(data);
  }
  return res.json(reports.filter((x) => x.userId === req.user.id));
}

async function getMedicines(req, res) {
  if (mongoOn()) {
    const data = await MedicineScan.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(30);
    return res.json(data);
  }
  return res.json(medicines.filter((x) => x.userId === req.user.id));
}

module.exports = { getReports, getMedicines };
