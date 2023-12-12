import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Maintenancehist.css';

const MaintenanceHistory = () => {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);

  useEffect(() => {
    const fetchMaintenanceHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/maintenance-requests'); // Adjust the URL as necessary
        setMaintenanceRequests(response.data);
      } catch (error) {
        console.error('Error fetching maintenance history:', error);
      }
    };

    fetchMaintenanceHistory();
  }, []);

  return (
    <div>
      <h2>Maintenance History</h2>
      <ul>
        {maintenanceRequests.map(request => (
          <li key={request._id}>
            <div>Date: {new Date(request.requestDate).toLocaleDateString()}</div>
            <div>Category: {request.category}</div>
            <div>Description: {request.description}</div>
            <div>Status: {request.status}</div>
            {/* Add more fields as necessary */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenanceHistory;
