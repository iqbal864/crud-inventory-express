-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2023 at 03:34 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Rini', 'rini123@gmail.com', '$2b$10$PQ72/.3g99eRu8nJWHEgmuJSKEIQcqilyyPTg9wMOHHueRhRCO/bq', '2023-08-06 19:08:49', '2023-08-06 19:56:27');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `name`, `qty`, `price`, `created_at`, `updated_at`) VALUES
(1, 'Sepatu Nike', 17, 2000000, '2023-08-06 17:05:40', '2023-08-06 20:21:44'),
(2, 'Sepatu Compass', 2, 500000, '2023-08-06 17:08:43', '2023-08-06 20:19:46');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_order`
--

CREATE TABLE `purchase_order` (
  `po_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `purchase_order`
--

INSERT INTO `purchase_order` (`po_id`, `supplier_id`, `product_id`, `qty`, `created_at`) VALUES
(1, 1, 1, 5, '2023-08-06 17:16:36'),
(2, 1, 1, 5, '2023-08-06 17:23:55'),
(3, 1, 1, 5, '2023-08-06 17:32:10'),
(4, 1, 1, 5, '2023-08-06 17:33:09'),
(5, 1, 1, 5, '2023-08-06 17:33:41'),
(6, 1, 1, 5, '2023-08-06 17:33:58'),
(7, 1, 1, 5, '2023-08-06 17:34:37'),
(8, 1, 1, 5, '2023-08-06 17:35:22'),
(9, 1, 1, 5, '2023-08-06 17:35:57'),
(10, 1, 1, 5, '2023-08-06 17:36:23'),
(11, 1, 1, 5, '2023-08-06 17:38:02'),
(12, 1, 2, 7, '2023-08-06 17:39:34'),
(13, 1, 2, 4, '2023-08-06 17:40:44'),
(14, 1, 2, 5, '2023-08-06 18:11:44'),
(15, 1, 1, 7, '2023-08-06 18:45:28'),
(16, 1, 1, 5, '2023-08-06 20:21:27');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `supplier_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`supplier_id`, `name`, `address`, `email`, `created_at`, `updated_at`) VALUES
(1, 'PT Anugrah Jaya', 'Bandung', 'sup1@anugrah.co.id', '2023-08-06 13:33:53', '2023-08-06 13:55:37'),
(4, 'PT Sukses Makmur', 'Bandung', 'sup4@makmur.co.id', '2023-08-06 18:43:16', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `trans_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`trans_id`, `product_id`, `customer_id`, `qty`, `total_price`, `created_at`) VALUES
(1, 2, 1, 2, 1000000, '2023-08-06 20:13:03'),
(2, 2, 1, 2, 1000000, '2023-08-06 20:13:33'),
(3, 2, 1, 3, 1500000, '2023-08-06 20:15:16'),
(4, 2, 1, 10, 5000000, '2023-08-06 20:18:50'),
(5, 2, 1, 10, 5000000, '2023-08-06 20:19:28'),
(6, 2, 1, 7, 3500000, '2023-08-06 20:19:46'),
(7, 2, 1, 7, 3500000, '2023-08-06 20:20:13'),
(8, 1, 1, 3, 6000000, '2023-08-06 20:20:24'),
(9, 1, 1, 2, 4000000, '2023-08-06 20:21:44');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Muhamad Iqbal Falah', 'iqbal@gmail.com', '$2b$10$iey5B0LOtbuvPOR0S2s86uM9LkUzAUm1ON35BUHYOxjtmbRF3CAgK', '2023-08-06 13:00:02', '2023-08-06 13:04:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `purchase_order`
--
ALTER TABLE `purchase_order`
  ADD PRIMARY KEY (`po_id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`trans_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `purchase_order`
--
ALTER TABLE `purchase_order`
  MODIFY `po_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `supplier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `trans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
