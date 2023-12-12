import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Maintenance1.css';
import MaintenanceHistory from './MaintenanceHist'; // Ensure this path is correct

const MaintenancePage = () => {

  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  
  const getStatusClassName = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'status-open';
      case 'in progress':
        return 'status-in-progress';
      case 'resolved':
        return 'status-resolved';
      case 'closed':
        return 'status-closed';
      default:
        return '';
    }
  };
  useEffect(() => {
    // Fetch maintenance requests
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/server1/maintenance');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
      }
    };

    const getStatusClassName = (status) => {
        switch (status.toLowerCase()) {
          case 'open':
            return 'status-open';
          case 'in progress':
            return 'status-in-progress';
          case 'resolved':
            return 'status-resolved';
          case 'closed':
            return 'status-closed';
          default:
            return '';
        }
      };

    fetchRequests();
  }, []);

  const navigateToForm = () => {
    navigate('/maintenance-request'); // Adjust the route as per your setup
  };

  return (
    <div className="maintenance-page">
      <h1>Maintenance Page</h1>
      <button className="add-request-btn" onClick={navigateToForm}>Add New Request</button>
      
      <h2>Maintenance Requests</h2>
      <table className="maintenance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
            {/* Additional headers */}
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request._id}>
              <td>{new Date(request.requestDate).toLocaleDateString()}</td>
              <td>{request.category}</td>
              <td>{request.description}</td>
              <td className={getStatusClassName(request.status)}>{request.status}</td>
              {/* Additional fields */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default MaintenancePage;
