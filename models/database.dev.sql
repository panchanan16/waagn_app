CREATE TABLE `admin_auth` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(80) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL UNIQUE,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(10) DEFAULT 'admin',
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


