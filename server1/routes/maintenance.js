const express = require('express');
const router = express.Router();
const maintenance = require('../controllers/maintenance'); // Adjust the path as needed

router.post('/', maintenance.createMaintenanceRequest);
router.put('/:id', maintenance.updateMaintenanceRequest);
router.delete('/:id', maintenance.deleteMaintenanceRequest);
router.get('/:id', maintenance.getMaintenanceRequest);
router.get('/', maintenance.getMaintenanceRequests);

module.exports = router;
