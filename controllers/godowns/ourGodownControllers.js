const db = require('../../config/dbConfig');

// Add new godown
exports.createOurGodown = (req, res) => {
    const {
        name_of_the_godown,
        full_address,
        city,
        state,
        pincode,
        contact_person_name,
        contact_number,
        email_id,
        type_of_warehouse,
        ownership_type,
        owners_name,
        gst_number,
        warehouse_license_number,
        expiry_date_of_license,
        total_area,
        covered_area,
        storage_capacity,
        number_of_floors,
        loading_unloading_facility,
        number_of_loading_docks,
        security_measures,
        types_of_goods_stored,
        temperature_controlled_storage,
        power_backup_available,
        availability_of_material_handling_equipment,
        nearest_highway_road_connectivity,
        distance_from_nearest_railway_station,
        distance_from_nearest_airport,
        availability_of_parking_facility,
        availability_of_transport_services,
        special_features_or_facilities,
        rental_lease_terms,
        remarks_additional_notes
    } = req.body;

    const query = `INSERT INTO our_godown (
    name_of_the_godown, full_address, city, state, pincode, contact_person_name, contact_number,
    email_id, type_of_warehouse, ownership_type, owners_name, gst_number, warehouse_license_number,
    expiry_date_of_license, total_area, covered_area, storage_capacity, number_of_floors,
    loading_unloading_facility, number_of_loading_docks, security_measures, types_of_goods_stored,
    temperature_controlled_storage, power_backup_available, availability_of_material_handling_equipment,
    nearest_highway_road_connectivity, distance_from_nearest_railway_station, distance_from_nearest_airport,
    availability_of_parking_facility, availability_of_transport_services, special_features_or_facilities,
    rental_lease_terms, remarks_additional_notes
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [
        name_of_the_godown, full_address, city, state, pincode, contact_person_name, contact_number,
        email_id, type_of_warehouse, ownership_type, owners_name, gst_number, warehouse_license_number,
        expiry_date_of_license, total_area, covered_area, storage_capacity, number_of_floors,
        loading_unloading_facility, number_of_loading_docks, security_measures, types_of_goods_stored,
        temperature_controlled_storage, power_backup_available, availability_of_material_handling_equipment,
        nearest_highway_road_connectivity, distance_from_nearest_railway_station, distance_from_nearest_airport,
        availability_of_parking_facility, availability_of_transport_services, special_features_or_facilities,
        rental_lease_terms, remarks_additional_notes
    ], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Failed to create Godown' });
        }
        res.status(200).json({ success: true, data: results, message: "Godown Added Successfully!" });
    });

};


// Update godown ---
exports.updateOurGodown = (req, res) => {
    const { id } = req.params
    const {
        name_of_the_godown,
        full_address,
        city,
        state,
        pincode,
        contact_person_name,
        contact_number,
        email_id,
        type_of_warehouse,
        ownership_type,
        owners_name,
        gst_number,
        warehouse_license_number,
        expiry_date_of_license,
        total_area,
        covered_area,
        storage_capacity,
        number_of_floors,
        loading_unloading_facility,
        number_of_loading_docks,
        security_measures,
        types_of_goods_stored,
        temperature_controlled_storage,
        power_backup_available,
        availability_of_material_handling_equipment,
        nearest_highway_road_connectivity,
        distance_from_nearest_railway_station,
        distance_from_nearest_airport,
        availability_of_parking_facility,
        availability_of_transport_services,
        special_features_or_facilities,
        rental_lease_terms,
        remarks_additional_notes
    } = req.body;

    const query = `UPDATE our_godown
    SET 
    name_of_the_godown = ?,
    full_address = ?,
    city = ?,
    state = ?,
    pincode = ?,
    contact_person_name = ?,
    contact_number = ?,
    email_id = ?,
    type_of_warehouse = ?,
    ownership_type = ?,
    owners_name = ?,
    gst_number = ?,
    warehouse_license_number = ?,
    expiry_date_of_license = ?,
    total_area = ?,
    covered_area = ?,
    storage_capacity = ?,
    number_of_floors = ?,
    loading_unloading_facility = ?,
    number_of_loading_docks = ?,
    security_measures = ?,
    types_of_goods_stored = ?,
    temperature_controlled_storage = ?,
    power_backup_available = ?,
    availability_of_material_handling_equipment = ?,
    nearest_highway_road_connectivity = ?,
    distance_from_nearest_railway_station = ?,
    distance_from_nearest_airport = ?,
    availability_of_parking_facility = ?,
    availability_of_transport_services = ?,
    special_features_or_facilities = ?,
    rental_lease_terms = ?,
    remarks_additional_notes = ?
WHERE godown_id = ?;`;

    db.query(query, [
        name_of_the_godown, full_address, city, state, pincode, contact_person_name, contact_number,
        email_id, type_of_warehouse, ownership_type, owners_name, gst_number, warehouse_license_number,
        expiry_date_of_license, total_area, covered_area, storage_capacity, number_of_floors,
        loading_unloading_facility, number_of_loading_docks, security_measures, types_of_goods_stored,
        temperature_controlled_storage, power_backup_available, availability_of_material_handling_equipment,
        nearest_highway_road_connectivity, distance_from_nearest_railway_station, distance_from_nearest_airport,
        availability_of_parking_facility, availability_of_transport_services, special_features_or_facilities,
        rental_lease_terms, remarks_additional_notes, id
    ], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Failed to Update Godown' });
        }
        res.status(200).json({ success: true, data: results, message: "Godown Updated Successfully!" });
    });

};


// get All godown List ---

exports.getAllGodowns = (req, res) => {
    const query = 'SELECT * FROM our_godown';

    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch Godowns' });
        }
        return res.status(200).json({ success: true, data: results, message: "Godowns fetched Successfully!" });
    });
};


// get One godown ---
exports.getOneGodown = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM our_godown WHERE godown_id = ?';

    db.query(query, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch the Godown' });
        }
        return res.status(200).json({ success: true, data: results, message: "Godowns data fetched Successfully!" });
    });
};


// Update status of Ourgodown status ---
exports.updateOurGodownStatus = (req, res) => {
    const { id } = req.params;
    const query = `UPDATE our_godown SET is_active = ? WHERE godown_id = ?`;

    db.query(query, [req.body.status, id], (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Failed to Update the Godown Status' });
        }
        return res.status(200).json({ success: true, data: results, message: "Godown Status Successfully!" });
    });
};




