const db = require('../../config/dbConfig');

// Create Partner Company
exports.createPartnerCompany = (req, res) => {
    const {
        company_name,
        years_of_experience,
        contact_details,
        certifications,
        operational_capability,
        types_of_goods_handled,
        specialization,
        type_of_services,
        fleet_size,
        types_of_vehicles,
        average_age_of_vehicles,
        number_of_warehouses,
        area_type_of_logistics,
        compliance_with_transportation_laws,
        driver_certifications,
        cost_structure,
        payment_terms,
        additional_charges_for_specialized_services,
        real_time_tracking_availability,
        integration_with_logistics_software,
        online_booking_systems,
        customer_support,
        emergency_point_of_contact,
        insurance_coverage_for_cargo,
        liability_in_case_of_damage_loss,
        claim_processing_time,
        references_from_previous_clients,
        market_reputation_reviews
    } = req.body;

    console.log(req.body)

    const query = `
    INSERT INTO partner_companies 
    (company_name, years_of_experience, contact_details, certifications, operational_capability, 
    types_of_goods_handled, specialization, type_of_services, fleet_size, types_of_vehicles, 
    average_age_of_vehicles, number_of_warehouses, area_type_of_logistics, compliance_with_transportation_laws, 
    driver_certifications, cost_structure, payment_terms, additional_charges_for_specialized_services, 
    real_time_tracking_availability, integration_with_logistics_software, online_booking_systems, 
    customer_support_24_7, emergency_point_of_contact, insurance_coverage_for_cargo, 
    liability_in_case_of_damage_or_loss, claim_processing_time, references_from_previous_clients, 
    market_reputation_reviews) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    db.query(query, [
        company_name, years_of_experience, contact_details, certifications, operational_capability,
        types_of_goods_handled, specialization, type_of_services, fleet_size, types_of_vehicles,
        average_age_of_vehicles, number_of_warehouses, area_type_of_logistics, compliance_with_transportation_laws,
        driver_certifications, cost_structure, payment_terms, additional_charges_for_specialized_services,
        real_time_tracking_availability, integration_with_logistics_software, online_booking_systems,
        customer_support, emergency_point_of_contact, insurance_coverage_for_cargo,
        liability_in_case_of_damage_loss, claim_processing_time, references_from_previous_clients,
        market_reputation_reviews
    ], (error, result) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: "Error creating partner company", error: error.message });
        }
        res.status(201).json({ success: true, message: "Partner Company created successfully", data: result });
    });
};


// Get all Partner Companies
exports.getAllPartnerCompanies = (req, res) => {
    const query = 'SELECT * FROM partner_companies';

    db.query(query, (error, rows) => {
        if (error) {
            return res.status(500).json({ success: false, message: "Error fetching partner companies", error: error.message });
        }

        res.status(200).json({ success: true, data: rows });
    });
};



// Read Partner Company by ID
exports.getPartnerCompanyById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM partner_companies WHERE company_id = ?';

    db.query(query, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({ success: false, message: "Error fetching partner company", error: error.message });
        }

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Partner Company not found" });
        }

        res.status(200).json({ success: true, data: rows[0] });
    });
};

// Update Partner Company
exports.updatePartnerCompany = (req, res) => {
    const { id } = req.params;
    const {
        company_name,
        years_of_experience,
        contact_details,
        certifications,
        operational_capability,
        types_of_goods_handled,
        specialization,
        type_of_services,
        fleet_size,
        types_of_vehicles,
        average_age_of_vehicles,
        number_of_warehouses,
        area_type_of_logistics,
        compliance_with_transportation_laws,
        driver_certifications,
        cost_structure,
        payment_terms,
        additional_charges_for_specialized_services,
        real_time_tracking_availability,
        integration_with_logistics_software,
        online_booking_systems,
        customer_support_24_7,
        emergency_point_of_contact,
        insurance_coverage_for_cargo,
        liability_in_case_of_damage_or_loss,
        claim_processing_time,
        references_from_previous_clients,
        market_reputation_reviews
    } = req.body;

    const query = `
    UPDATE partner_companies SET
    company_name = ?, years_of_experience = ?, contact_details = ?, certifications = ?, operational_capability = ?,
    types_of_goods_handled = ?, specialization = ?, type_of_services = ?, fleet_size = ?, types_of_vehicles = ?,
    average_age_of_vehicles = ?, number_of_warehouses = ?, area_type_of_logistics = ?, compliance_with_transportation_laws = ?,
    driver_certifications = ?, cost_structure = ?, payment_terms = ?, additional_charges_for_specialized_services = ?,
    real_time_tracking_availability = ?, integration_with_logistics_software = ?, online_booking_systems = ?,
    customer_support_24_7 = ?, emergency_point_of_contact = ?, insurance_coverage_for_cargo = ?,
    liability_in_case_of_damage_or_loss = ?, claim_processing_time = ?, references_from_previous_clients = ?,
    market_reputation_reviews = ?
    WHERE company_id = ?
  `;

    db.query(query, [
        company_name, years_of_experience, contact_details, certifications, operational_capability,
        types_of_goods_handled, specialization, type_of_services, fleet_size, types_of_vehicles,
        average_age_of_vehicles, number_of_warehouses, area_type_of_logistics, compliance_with_transportation_laws,
        driver_certifications, cost_structure, payment_terms, additional_charges_for_specialized_services,
        real_time_tracking_availability, integration_with_logistics_software, online_booking_systems,
        customer_support_24_7, emergency_point_of_contact, insurance_coverage_for_cargo,
        liability_in_case_of_damage_or_loss, claim_processing_time, references_from_previous_clients,
        market_reputation_reviews, id
    ], (error, result) => {
        if (error) {
            return res.status(500).json({ success: false, message: "Error updating partner company", error: error.message });
        }
        res.status(200).json({ success: true, message: "Partner Company updated successfully", data: result });
    });
};

// Delete Partner Company
exports.deletePartnerCompany = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM partner_companies WHERE company_id = ?';

    db.query(query, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ success: false, message: "Error deleting partner company", error: error.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Partner Company not found" });
        }

        res.status(200).json({ success: true, message: "Partner Company deleted successfully" });
    });
};




//  ------------------------------- partners Godown controllers -------------------------------------


// CREATE Partner gowdown
exports.createGodown = (req, res) => {
    const { town, full_address, contact_person_name, number, alt_number, rate, oda_number, partner_id } = req.body;

    const query = `INSERT INTO partner_godown (town, full_address, contact_person_name, number, alt_number, rate, oda_number, partner_id) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [town, full_address, contact_person_name, number, alt_number, rate, oda_number, partner_id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Error inserting partner address", error: err.message });
        }
        res.status(201).json({ success: true, message: "Partner address created successfully", data: result });
    });
};

// GET all Partner Addresses
exports.getAllGodown = (req, res) => {
    const query = 'SELECT * FROM partner_godown';

    db.query(query, (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Error fetching partner godown", error: err.message });
        }

        res.status(200).json({ success: true, data: rows });
    });
};


// UPDATE Partner Address by ID
exports.updatePartnerGodown = (req, res) => {
    const { id } = req.params;
    const { town, full_address, contact_person_name, number, alt_number, rate, oda_number, partner_id } = req.body;

    const query = `UPDATE partner_godown SET town = ?, full_address = ?, contact_person_name = ?, number = ?, alt_number = ?, 
                   rate = ?, oda_number = ?, partner_id = ? WHERE id = ?`;

    db.query(query, [town, full_address, contact_person_name, number, alt_number, rate, oda_number, partner_id, id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Error updating partner address", error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Partner Godown not found" });
        }

        res.status(200).json({ success: true, message: "Partner Godown updated successfully" });
    });
};