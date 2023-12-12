import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Maintenance.css'; // Make sure to create a corresponding CSS file for styling


const MaintenanceRequestForm = () => {
  const [formData, setFormData] = useState({
    propertyAddress: '', // Assuming you want the address as a string
    requestDate: new Date().toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
    category: '',
    description: '',
    urgency: 'Low',
    status: 'Open',
    actualCost: '',
    notes: ['']
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "notes") {
      // Special handling for notes array
      setFormData(prevFormData => ({
        ...prevFormData,
        notes: [value]
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint
      const response = await axios.post('http://localhost:8080/server1/maintenance', formData);
      console.log(response.data);
      navigate('/');
      // Handle success (e.g., show a message or redirect)
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="maintenance-request-form">
      <h1>Create Maintenance Request</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="propertyAddress">Property Address</label>
          <input
            type="text"
            id="propertyAddress"
            name="propertyAddress"
            value={formData.propertyAddress}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="requestDate">Request Date</label>
          <input
            type="date"
            id="requestDate"
            name="requestDate"
            value={formData.requestDate}
            onChange={handleChange}
          />
        </div>

        {/* Add more form inputs for each field in the formData state */}
        {/* For example, for the category: */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Urgency */}
        <div className="form-group">
          <label htmlFor="urgency">Urgency</label>
          <select name="urgency" id="urgency" value={formData.urgency} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        {/* Status */}
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select name="status" id="status" value={formData.status} onChange={handleChange}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>


        {/* Notes */}
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <input
            type="text"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default MaintenanceRequestForm;
