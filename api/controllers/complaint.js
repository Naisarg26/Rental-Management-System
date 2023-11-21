// controllers/complaint.js
import Complaint from '../models/complaint.js';


export const createComplaint = async (req, res) => {
    try {
      const newComplaint = new Complaint(req.body);
      await newComplaint.save();
      res.status(201).json(newComplaint);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const updateComplaint = async (req, res) => {
    try {
      const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json(updatedComplaint);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteComplaint = async (req, res) => {
    try {
      await Complaint.findByIdAndDelete(req.params.id);
      res.status(200).json("Complaint has been deleted.");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getComplaint = async (req, res) => {
    try {
      const complaint = await Complaint.findById(req.params.id);
      res.status(200).json(complaint);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getComplaints = async (req, res) => {
    try {
      const complaints = await Complaint.find();
      res.status(200).json(complaints);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  