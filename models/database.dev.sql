CREATE TABLE `admin_auth` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(80) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL UNIQUE,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(10) DEFAULT 'admin',
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Orders table

CREATE TABLE orders (
    order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    booking_type VARCHAR(100) DEFAULT NULL,
    pickup_location_address VARCHAR(255) NOT NULL,
    delivery_location_address VARCHAR(255) NOT NULL,
    shipper_company_name VARCHAR(255),
    shipper_name VARCHAR(100),
    shipper_contact_number VARCHAR(20),
    shipper_gst VARCHAR(100) DEFAULT NULL,
    shipper_email_address VARCHAR(100),
    shipper_pincode VARCHAR(10) DEFAULT NULL,
    shipper_town VARCHAR(100) DEFAULT NULL,
    receiver_company_name VARCHAR(150),
    receiver_name VARCHAR(100),
    receiver_contact_number VARCHAR(20),
    receiver_gst VARCHAR(20),
    receiver_email_address VARCHAR(100),
    receiver_pincode VARCHAR(10) DEFAULT NULL,
    receiver_town VARCHAR(100) DEFAULT NULL,
    types_of_goods TEXT DEFAULT NULL,
    actual_weight_of_consignment DECIMAL(10, 2),
    number_of_boxes INT,
    length_of_box VARCHAR(30),
    height_of_box VARCHAR(30),
    breadth_of_box VARCHAR(30),
    volume_of_consignment VARCHAR(100),
    consignment_risk VARCHAR(100),
    pickup_datetime VARCHAR(100),
    delivery_datetime VARCHAR(100),
    insurance VARCHAR(30),
    tax_invoice_number VARCHAR(80),
    payment_mode VARCHAR(80),
    payment_status VARCHAR(80),
    amount INT DEFAULT NULL,
    order_status VARCHAR(100),
    order_date VARCHAR(80) DEFAULT NULL,
    partner_assign_status TINYINT(1) DEFAULT 0,
    vehicle_assign_status TINYINT(1) DEFAULT 0,
    is_partner_accepted TINYINT(1) DEFAULT 0
);

-- Drivers Table

CREATE TABLE drivers (
    driver_id INT AUTO_INCREMENT PRIMARY KEY,
    driver_name VARCHAR(100),
    contact_number VARCHAR(20) NOT NULL,
    dl_number VARCHAR(20) NOT NULL,
    aadhaar_card_number VARCHAR(20) NOT NULL,
    current_address VARCHAR(255),
    permanent_address VARCHAR(255),
    alt_number VARCHAR(20),
    whatsapp_number VARCHAR(20),
    driver_photo VARCHAR(255),
    emergency_number VARCHAR(20) NOT NULL,
    driver_status TINYINT(1) DEFAULT 1 NOT NULL
);


-- Vehicle table

CREATE TABLE vehicle_information (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_type VARCHAR(255),
    registration_number VARCHAR(150) UNIQUE,
    model VARCHAR(200),
    capacity INT,
    gps_availability TINYINT(1),
    owners_name VARCHAR(255),
    contact_details VARCHAR(255),
    company_affiliation VARCHAR(255),
    driving_license_number VARCHAR(255),
    intercity_intra_city_operation VARCHAR(255),
    preferred_routes TEXT,
    availability_schedule TEXT,
    vehicle_registration_certificate TINYINT(1), 
    pollution_certificate TINYINT(1), 
    road_permit TINYINT(1), 
    fitness_certificate TINYINT(1), 
    types_of_goods_handled TEXT,
    temperature_control TINYINT(1), 
    special_handling_capabilities TEXT,
    cost_per_km_hour INT,
    payment_terms TEXT,
    invoicing_process TEXT,
    gps_tracking_integration TINYINT(1), 
    compatibility_with_logistics_software TINYINT(1), 
    online_availability_status TINYINT(1), 
    insurance_provider VARCHAR(255),
    policy_details TEXT,
    coverage_for_goods_and_vehicle TINYINT(1), 
    claim_process TEXT,
    last_service_date VARCHAR(80) DEFAULT NULL,
    maintenance_schedule TEXT,
    major_repairs TEXT,
    references_from_previous_employers_clients TEXT,
    feedback_on_performance_and_reliability TEXT,
    driver_details INT DEFAULT NULL,
    is_active TINYINT(1) DEFAULT 1,
    FOREIGN KEY (driver_details) REFERENCES drivers(driver_id) ON DELETE SET NULL
);




-- 3pl partners table

CREATE TABLE partner_companies (
    company_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    years_of_experience INT DEFAULT NULL,
    contact_details VARCHAR(255) DEFAULT NULL,
    certifications VARCHAR(255) DEFAULT NULL,
    operational_capability TEXT DEFAULT NULL,
    types_of_goods_handled VARCHAR(255) DEFAULT NULL,
    specialization VARCHAR(255) DEFAULT NULL,
    type_of_services VARCHAR(50) DEFAULT NULL,
    fleet_size VARCHAR(50) DEFAULT NULL,
    frequency_of_loads VARCHAR(80) DEFAULT NULL,
    oda_areas VARCHAR(200) DEFAULT NULL,
    types_of_vehicles VARCHAR(255),
    average_age_of_vehicles INT,
    number_of_warehouses INT,
    area_type_of_logistics ENUM('Intercity', 'Interstate', 'Cross-Border') DEFAULT NULL,
    compliance_with_transportation_laws ENUM('Yes', 'No') NOT NULL,
    driver_certifications TEXT,
    cost_structure TEXT DEFAULT NULL,
    payment_terms TEXT DEFAULT NULL,
    additional_charges_for_specialized_services TEXT DEFAULT NULL,
    real_time_tracking_availability ENUM('Yes', 'No') NOT NULL,
    integration_with_logistics_software ENUM('Yes', 'No') NOT NULL,
    online_booking_systems ENUM('Yes', 'No') NOT NULL,
    customer_support_24_7 ENUM('Yes', 'No') NOT NULL,
    emergency_point_of_contact VARCHAR(255),
    insurance_coverage_for_cargo ENUM('Yes', 'No') NOT NULL,
    liability_in_case_of_damage_or_loss ENUM('Yes', 'No') NOT NULL,
    claim_processing_time VARCHAR(255) DEFAULT NULL,
    references_from_previous_clients TEXT DEFAULT NULL,
    market_reputation_reviews TEXT DEFAULT NULL,
    is_active TINYINT(1) DEFAULT 1
);


-- 3pl godown location

CREATE TABLE partner_godown (
    godown_id INT AUTO_INCREMENT PRIMARY KEY,
    town VARCHAR(150) DEFAULT NULL,
    type_of_godown VARCHAR(50) DEFAULT NULL,
    full_address TEXT DEFAULT NULL,
    contact_person_name VARCHAR(150) DEFAULT NULL,
    number VARCHAR(20) DEFAULT NULL,
    alt_number VARCHAR(20) DEFAULT NULL,
    rate DECIMAL(10, 2) DEFAULT NULL,
    oda_number VARCHAR(255) DEFAULT NULL,
    partner_id INT DEFAULT NULL,
    godown_pincode INT DEFAULT NULL,
    FOREIGN KEY (partner_id) REFERENCES partner_companies(company_id) ON DELETE CASCADE
);


--- Our godowns table 

CREATE TABLE our_godown (
    godown_id INT AUTO_INCREMENT PRIMARY KEY,
    name_of_the_godown VARCHAR(255) DEFAULT NULL,
    full_address TEXT DEFAULT NULL,
    city VARCHAR(100) DEFAULT NULL,
    state VARCHAR(100) DEFAULT NULL,
    pincode VARCHAR(10) DEFAULT NULL,
    contact_person_name VARCHAR(255) DEFAULT NULL,
    contact_number VARCHAR(20) DEFAULT NULL,
    email_id VARCHAR(100) DEFAULT NULL,
    type_of_warehouse VARCHAR(100) DEFAULT NULL,
    ownership_type VARCHAR(50) DEFAULT NULL,
    owners_name VARCHAR(255) DEFAULT NULL,
    gst_number VARCHAR(15) DEFAULT NULL,
    warehouse_license_number VARCHAR(100) DEFAULT NULL,
    expiry_date_of_license VARCHAR(50) DEFAULT NULL,
    total_area DECIMAL(10, 2) DEFAULT NULL,
    covered_area DECIMAL(10, 2) DEFAULT NULL,
    storage_capacity DECIMAL(10, 2) DEFAULT NULL,
    number_of_floors INT DEFAULT NULL,
    loading_unloading_facility TINYINT(1) DEFAULT NULL,
    number_of_loading_docks INT DEFAULT NULL,
    security_measures TEXT DEFAULT NULL,
    types_of_goods_stored TEXT DEFAULT NULL,
    temperature_controlled_storage TINYINT(1) DEFAULT NULL,
    power_backup_available TINYINT(1) DEFAULT NULL,
    availability_of_material_handling_equipment TINYINT(1) DEFAULT NULL,
    nearest_highway_road_connectivity VARCHAR(255) DEFAULT NULL,
    distance_from_nearest_railway_station DECIMAL(10, 2) DEFAULT NULL,
    distance_from_nearest_airport DECIMAL(10, 2) DEFAULT NULL,
    availability_of_parking_facility TINYINT(1) DEFAULT NULL,
    availability_of_transport_services TINYINT(1) DEFAULT NULL,
    special_features_or_facilities TEXT DEFAULT NULL,
    rental_lease_terms TEXT DEFAULT NULL,
    remarks_additional_notes TEXT DEFAULT NULL,
    is_active TINYINT(1) DEFAULT 1
);





--- 3PL assign table 
CREATE TABLE partner_assign (
    p_assign_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT DEFAULT NULL,
    partner_id INT DEFAULT NULL,
    godown_id INT DEFAULT NULL,
    datetime VARCHAR(100) DEFAULT NULL,
    msg_for_partner TEXT DEFAULT NULL,
    is_accepted ENUM("accepted", "notaccepted") DEFAULT 'notaccepted',
    reason_of_fail_delivery TEXT DEFAULT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE SET NULL,
    FOREIGN KEY (partner_id) REFERENCES partner_companies(company_id) ON DELETE CASCADE,
    FOREIGN KEY (godown_id) REFERENCES partner_godown(godown_id) ON DELETE CASCADE,
    CONSTRAINT unique_order_partner_godown UNIQUE (order_id, partner_id, godown_id)
);


--- Vehicle assign table 
CREATE TABLE vehicle_assignment (
    v_assign_id INT AUTO_INCREMENT PRIMARY KEY, 
    order_id BIGINT DEFAULT NULL,                        
    vehicle_id INT NOT NULL,                     
    driver_id INT NOT NULL,                     
    msg_for_driver TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE SET NULL, 
    FOREIGN KEY (vehicle_id) REFERENCES vehicle_information(vehicle_id) ON DELETE CASCADE,  
    FOREIGN KEY (driver_id) REFERENCES drivers(driver_id) ON DELETE CASCADE                 
);


--- Partner Delivery details
CREATE TABLE partner_delivery_details (
    partner_assigned_orderid INT AUTO_INCREMENT PRIMARY KEY,
    partner_id INT DEFAULT NULL,
    order_id BIGINT NOT NULL,
    delivery_godown_address INT DEFAULT NULL,
    assigned_vehicle_no VARCHAR(100) DEFAULT NULL,
    assigned_driver_name VARCHAR(100) DEFAULT NULL,
    assigned_driver_number VARCHAR(20) DEFAULT NULL,
    e_way_bill_no VARCHAR(100) DEFAULT NULL,
    actual_weight DECIMAL(10, 2) DEFAULT NULL,  
    charged_weight DECIMAL(10, 2) DEFAULT NULL, 
    partner_amount DECIMAL(15, 2) DEFAULT NULL,
    collected_amount INT DEFAULT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (partner_id) REFERENCES partner_companies(company_id) ON DELETE CASCADE
);


--- Complaint raise table 
CREATE TABLE customer_complaints (
    complain_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) DEFAULT NULL,
    order_id_tracking_number VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) DEFAULT NULL,
    email_id VARCHAR(255) DEFAULT NULL,
    complaint_type VARCHAR(200) DEFAULT NULL, 
    description_of_issue TEXT,
    preferred_resolution VARCHAR(100) DEFAULT NULL,
    date_of_complaint VARCHAR(50) DEFAULT NULL,
    customer_person_handling_concern VARCHAR(255) DEFAULT NULL
);



-- user create table

CREATE TABLE partners (
    partner_id INT PRIMARY KEY,
    name VARCHAR(100) DEFAULT NULL,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255) DEFAULT NULL
);










