const mongoose = require('mongoose');
const MaintenanceRequestSchema = new mongoose.Schema({
   propertyAddress: {
    type: String,
    required: true,
   // Assuming you have a Property model that this references
  },
   requestDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  urgency: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High', 'Critical'] // For example
  },
  status: {
    type: String,
    required: true,
    default: 'Open',
    enum: ['Open', 'In Progress', 'Resolved', 'Closed']
  },
  resolution: {
    type: String,
    // Not required because it may not be resolved when the request is made
  },
  estimatedCost: {
    type: Number,
    // Not required as the cost might be estimated later
  },
  actualCost: {
    type: Number,
    // Not required as the cost might be known only after the work is done
  },
  notes: {
    type: [String],
    // Array of notes, not required
  },
});

module.exports = mongoose.model('MaintenanceRequest', MaintenanceRequestSchema);
