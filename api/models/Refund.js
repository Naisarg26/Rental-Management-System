import mongoose from "mongoose";
const refundSchema = new mongoose.Schema({
  renterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    //ref: 'User' // Assuming you have a User model
  },
  rentalId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    //ref: 'Rental' // Assuming you have a Rental model
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'Pending', // e.g., Pending, Approved, Denied
    enum: ['Pending', 'Approved', 'Denied']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Refund = mongoose.model('Refund', refundSchema);
module.exports = Refund;
