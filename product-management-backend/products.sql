-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2024 at 01:17 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `product_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `warranty_period` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `brand`, `type`, `warranty_period`, `start_date`, `price`, `created_at`, `updated_at`) VALUES
(1, 'iPhone 13', 'Apple', 'Smartphone', 12, '2024-03-20', 999.99, '2024-10-29 08:34:42', '2024-10-29 08:34:42'),
(2, 'Galaxy S22', 'Samsung', 'Smartphone', 24, '2024-03-20', 899.99, '2024-10-29 08:34:42', '2024-10-29 08:34:42'),
(3, 'neww', 'new', 'uiui', 898, '0000-00-00', 809.00, '2024-10-29 08:49:44', '2024-10-29 08:49:44'),
(8, 'iPhone 13', 'Apple', 'Smartphone', 12, '2024-03-20', 999.99, '2024-10-29 10:57:19', '2024-10-29 10:57:19'),
(9, 'Galaxy S22', 'Samsung', 'Smartphone', 24, '2024-03-20', 899.99, '2024-10-29 10:57:19', '2024-10-29 10:57:19'),
(10, 'www', 'www', 'w', 2, '2024-10-29', 1.00, '2024-10-29 11:00:47', '2024-10-29 11:00:47'),
(12, 'ProductManagement', 'Nike', 'Shoes', 2, '2024-10-30', 2000.00, '2024-10-29 11:10:07', '2024-10-29 11:10:07'),
(19, 'ProductManager', 'Nike', 'Shoes', 8, '2024-10-22', 12000.00, '2024-10-29 11:40:33', '2024-10-29 11:40:33'),
(20, 'Nike Air Force', 'Nike', 'Show', 11, '2024-10-22', 12000.00, '2024-10-29 11:45:33', '2024-10-29 11:45:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
