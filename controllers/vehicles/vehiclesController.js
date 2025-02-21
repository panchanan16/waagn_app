const db = require('../../config/dbConfig');

// Function to add a vehicle
function createVehicle(req, res) {
    const query = `INSERT INTO vehicle_information (
        vehicle_type, registration_number, model, capacity, gps_availability,
        owners_name, contact_details, company_affiliation, driving_license_number,
        intercity_intra_city_operation, preferred_routes, availability_schedule,
        vehicle_registration_certificate, pollution_certificate, road_permit,
        fitness_certificate, types_of_goods_handled, temperature_control, special_handling_capabilities,
        cost_per_km_hour, payment_terms, invoicing_process, gps_tracking_integration,
        compatibility_with_logistics_software, online_availability_status, insurance_provider,
        policy_details, coverage_for_goods_and_vehicle, claim_process, last_service_date,
        maintenance_schedule, major_repairs, references_from_previous_employers_clients,
        feedback_on_performance_and_reliability, driver_details
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const values = [
        req.body.vehicle_type, req.body.registration_number, req.body.model, req.body.capacity, req.body.gps_availability,
        req.body.owners_name, req.body.contact_details, req.body.company_affiliation, req.body.driving_license_number,
        req.body.intercity_intra_city_operation, req.body.preferred_routes, req.body.availability_schedule,
        req.body.vehicle_registration_certificate, req.body.pollution_certificate, req.body.road_permit,
        req.body.fitness_certificate, req.body.types_of_goods_handled, req.body.temperature_control, req.body.special_handling_capabilities,
        req.body.cost_per_km_hour, req.body.payment_terms, req.body.invoicing_process, req.body.gps_tracking_integration,
        req.body.compatibility_with_logistics_software, req.body.online_availability_status, req.body.insurance_provider,
        req.body.policy_details, req.body.coverage_for_goods_and_vehicle, req.body.claim_process, req.body.last_service_date,
        req.body.maintenance_schedule, req.body.major_repairs, req.body.references_from_previous_employers_clients,
        req.body.feedback_on_performance_and_reliability, req.body.driver_details
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: 'Database error', error: err });
        }
        res.status(200).json({ success: true, message: 'Vehicle added successfully', vehicle_id: result.insertId });
    });
}

// Function to get all vehicles
function getAllVehicles(req, res) {
    const query = 'SELECT * FROM vehicle_information;SELECT COUNT(*) AS total FROM vehicle_information;SELECT COUNT(*) AS active FROM vehicle_information WHERE is_active = 1;SELECT COUNT(*) AS unactive FROM vehicle_information WHERE is_active = 0;';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error', error: err });
        }
        return res.status(200).json({ success: true, data: results });
    });
}


// Function to get One vehicle
function getOneVehicle(req, res) {
    const { id } = req.params
    const query = 'SELECT vehicle_information.*, drivers.* FROM vehicle_information LEFT JOIN drivers ON drivers.driver_id = vehicle_information.driver_details WHERE vehicle_information.vehicle_id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error', error: err });
        }
        return res.status(200).json({ success: true, data: results });
    });
}



// Function to get vehicles with driver name ---
function getAllVehiclesWithDriver(req, res) {
    const query = `SELECT vehicle_id, registration_number, driver_id, driver_name, contact_number FROM vehicle_information INNER JOIN drivers ON vehicle_information.driver_details = drivers.driver_id;`

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error', error: err });
        }
        return res.status(200).json({ success: true, data: results });
    });
}

// Function to update a vehicle by ID
function updateVehicle(req, res) {
    const { id } = req.params;
    const query = `UPDATE vehicle_information SET 
        vehicle_type = ?, registration_number = ?, model = ?, capacity = ?, gps_availability = ?,
        owners_name = ?, contact_details = ?, company_affiliation = ?, driving_license_number = ?,
        intercity_intra_city_operation = ?, preferred_routes = ?, availability_schedule = ?,
        vehicle_registration_certificate = ?, pollution_certificate = ?, road_permit = ?,
        fitness_certificate = ?, types_of_goods_handled = ?, temperature_control = ?, special_handling_capabilities = ?,
        cost_per_km_hour = ?, payment_terms = ?, invoicing_process = ?, gps_tracking_integration = ?,
        compatibility_with_logistics_software = ?, online_availability_status = ?, insurance_provider = ?,
        policy_details = ?, coverage_for_goods_and_vehicle = ?, claim_process = ?, last_service_date = ?,
        maintenance_schedule = ?, major_repairs = ?, references_from_previous_employers_clients = ?,
        feedback_on_performance_and_reliability = ?, driver_details = ?
    WHERE vehicle_id = ?`;

    const values = [
        req.body.vehicle_type, req.body.registration_number, req.body.model, req.body.capacity, req.body.gps_availability,
        req.body.owners_name, req.body.contact_details, req.body.company_affiliation, req.body.driving_license_number,
        req.body.intercity_intra_city_operation, req.body.preferred_routes, req.body.availability_schedule,
        req.body.vehicle_registration_certificate, req.body.pollution_certificate, req.body.road_permit,
        req.body.fitness_certificate, req.body.types_of_goods_handled, req.body.temperature_control, req.body.special_handling_capabilities,
        req.body.cost_per_km_hour, req.body.payment_terms, req.body.invoicing_process, req.body.gps_tracking_integration,
        req.body.compatibility_with_logistics_software, req.body.online_availability_status, req.body.insurance_provider,
        req.body.policy_details, req.body.coverage_for_goods_and_vehicle, req.body.claim_process, req.body.last_service_date,
        req.body.maintenance_schedule, req.body.major_repairs, req.body.references_from_previous_employers_clients,
        req.body.feedback_on_performance_and_reliability, req.body.driver_details, id
    ];

    db.query(query, values, (err, result) => {
        console.log(result)
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error', error: err });
        }
        if (result.changedRows === 0) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }
        return res.status(200).json({ success: true, message: 'Vehicle updated successfully' });
    });
}


// Function to Update a vehicle Status
function updateVehicleStatus(req, res) {
    const {id} = req.params
    const query = 'UPDATE vehicle_information SET is_active = ? WHERE vehicle_id = ?';

    db.query(query, [req.body.status, id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Vehicle Status Not Updated!', error: err });
        }
        return res.status(200).json({ success: true, message: 'Vehicle Status Updated Successfully!', data: results });
    });
}



// Function to delete a vehicle by ID
function deleteVehicle(id, callback) {
    const query = 'DELETE FROM vehicle_information WHERE vehicle_id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            return callback({ success: false, message: 'Database error', error: err });
        }
        if (result.affectedRows === 0) {
            return callback({ success: false, message: 'Vehicle not found' });
        }
        callback({ success: true, message: 'Vehicle deleted successfully' });
    });
}

module.exports = {
    createVehicle,
    getAllVehicles,
    getOneVehicle,
    getAllVehiclesWithDriver,
    updateVehicle,
    updateVehicleStatus,
    deleteVehicle
};
