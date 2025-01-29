customers,
customer_address,
vehicles,
drivers,
3pl_partners,
3pl_godowns,
customer_orders,
orders_assign,
3pl_orders,
customer_invoice,
3pl_invoice

admin_auth
partners_auth
customers_auth


Vehicle Type
Registration Number
Model: 
Capacity: 
GPS Availability 
Owner’s Name:
Contact Details:
Company Affiliation (if any):
Driving License Number
Intercity/Intra-city Operation:
Preferred Routes:
Availability Schedule: 
Vehicle Registration Certificate (RC) [Yes/No]:
Pollution Certificate [Yes/No]:
Road Permit [Yes/No]:
Fitness Certificate [Yes/No]:
Types of Goods Handled:
Temperature Control (if any) [Yes/No]:
Special Handling Capabilities: 
Cost per Kilometer/Hour:
Payment Terms:
Invoicing Process:
GPS Tracking Integration [Yes/No]:
Compatibility with Logistics Software [Yes/No]:
Online Availability Status [Yes/No]:
Insurance Provider:
Policy Details:
Coverage for Goods and Vehicle [Yes/No]:
Claim Process:
Last Service Date:
Maintenance Schedule:
Major Repairs (if any):
References from Previous Employers/Clients:
Feedback on Performance and Reliability: 



### 3pl onboard from ---

Company Name:
Years of Experience:
Contact Details (Phone/Email):
Certifications (e.g., ISO):
Operational Capability
Types of Goods Handled:
Specialization (e.g., B2B Cargo):
Dedicated or Shared Services:
Fleet Size:
Types of Vehicles (e.g., Refrigerated, Container, Bulk):
Average Age of Vehicles:
Number of Warehouses:
Intercity, Interstate, or Cross-Border Logistics:
Compliance with Transportation Laws [Yes/No]:
Driver Certifications:
Cost Structure:
Payment Terms:
Additional Charges for Specialized Services:
Technology Integration
Real-Time Tracking Availability [Yes/No]:
Integration with Logistics Software [Yes/No]:
Online Booking Systems [Yes/No]:
24/7 Customer Support [Yes/No]:
Emergency Point of Contact:
Insurance Coverage for Cargo [Yes/No]:
Liability in Case of Damage/Loss [Yes/No]:
Claim Processing Time:
References and Reputation
References from Previous Clients:
Market Reputation/Reviews:

### 3pl locations of gowdown ---
town
full_address
contact_person_name
number
alt_number
rate
oda_number
partner_id

### Assign 3pL table ---
assign_id
order_id
partner_id
godown_id
datetime
msg_for_partner


### Assign vehicles table ---
v_assign_id
orderid
vehicle_id
driver_id
msg_for_driver

### Assign delivery by 3pl table ---

partner_assigned_orderid
Assigned 3PL Partner
 Delivery Godwon Adress:
 Assigned Vehicle No.
 Assigned Driver Name
 Assigned Driver Number
 E Way BIll NO.
 Actual Weight: (it can be kg/ton)
 Charged weights  (it can be kg/ton)
 Amount:


### Details Order Query ---
SELECT orders.order_id, orders.shipper_name, orders.amount,
partner_companies.company_name, 
partner_assign.is_accepted AS partner_accepted, vehicle_information.registration_number, drivers.driver_name,  
partner_assign.godown_id, partner_godown.full_address,
partner_delivery_details.assigned_vehicle_no AS partner_cart
FROM orders 
LEFT JOIN partner_assign ON partner_assign.order_id = orders.order_id
LEFT JOIN partner_godown ON partner_godown.godown_id = partner_assign.godown_id
LEFT JOIN partner_companies ON partner_companies.company_id = partner_assign.partner_id
LEFT JOIN vehicle_assignment ON vehicle_assignment.order_id = orders.order_id
LEFT JOIN drivers ON drivers.driver_id = vehicle_assignment.driver_id
LEFT JOIN vehicle_information ON vehicle_information.vehicle_id = vehicle_assignment.vehicle_id
LEFT JOIN partner_delivery_details ON partner_delivery_details.order_id = orders.order_id

