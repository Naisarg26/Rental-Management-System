const MaintenanceRequest = require("../models/Maintenance");

exports.createMaintenanceRequest = async (req, res, next) => {
  const newMaintenanceRequest = new MaintenanceRequest(req.body);

  try {
    const savedMaintenanceRequest = await newMaintenanceRequest.save();
    res.status(200).json(savedMaintenanceRequest);
  } catch (err) {
    next(err);
  }
};

exports.updateMaintenanceRequest = async (req, res, next) => {
  try {
    const updatedMaintenanceRequest = await MaintenanceRequest.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedMaintenanceRequest);
  } catch (err) {
    next(err);
  }
};

exports.deleteMaintenanceRequest = async (req, res, next) => {
  try {
    await MaintenanceRequest.findByIdAndDelete(req.params.id);
    res.status(200).json("Maintenance request has been deleted.");
  } catch (err) {
    next(err);
  }
};

exports.getMaintenanceRequest = async (req, res, next) => {
  try {
    const maintenanceRequest = await MaintenanceRequest.findById(req.params.id);
    res.status(200).json(maintenanceRequest);
  } catch (err) {
    next(err);
  }
};

exports.getMaintenanceRequests = async (req, res, next) => {
  try {
    const maintenanceRequests = await MaintenanceRequest.find({});
    res.status(200).json(maintenanceRequests);
  } catch (err) {
    next(err);
  }
};

exports.countByCategory = async (req, res, next) => {
  try {
    const categories = req.query.categories.split(",");
    const list = await Promise.all(
      categories.map((category) => {
        return MaintenanceRequest.countDocuments({ category: category });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

exports.countByStatus = async (req, res, next) => {
  try {
    const statusCounts = await MaintenanceRequest.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(statusCounts);
  } catch (err) {
    next(err);
  }
};

// Add any other specific controllers you need below
