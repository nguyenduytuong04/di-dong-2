-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2024 at 02:23 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `example05`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `address_id` bigint(20) NOT NULL,
  `building_name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `pincode` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`address_id`, `building_name`, `city`, `country`, `pincode`, `state`, `street`) VALUES
(1, 'Building A', 'City Name', 'Country', '123456', 'State', '123 Main St'),
(4, 'string', 'string', 'string', 'string', 'string', 'string');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cart_id` bigint(20) NOT NULL,
  `total_price` double DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`cart_id`, `total_price`, `user_id`) VALUES
(1, -6435000000, 1),
(2, 0, 3),
(3, 0, 4);

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` bigint(20) NOT NULL,
  `discount` double NOT NULL,
  `product_price` double NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `cart_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` bigint(20) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Iphone');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `order_date` date DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `total_amount` double DEFAULT NULL,
  `payment_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `email`, `order_date`, `order_status`, `total_amount`, `payment_id`) VALUES
(1, 'tuong1@gmail.com', '2024-11-05', 'Order Accepted !', -2467575000000, 1),
(2, 'tuong1@gmail.com', '2024-11-05', 'Order Accepted !', -2475000000, 2),
(3, 'tuong1@gmail.com', '2024-11-05', 'Order Accepted !', -2475000000, 3),
(4, 'tuong1@gmail.com', '2024-11-05', 'Order Accepted !', -2475000000, 4),
(5, 'tuong1@gmail.com', '2024-11-05', 'Order Accepted !', -2475000000, 5),
(6, 'tuong1@gmail.com', '2024-11-05', 'Order Accepted !', -2475000000, 6),
(7, 'tuong1@gmail.com', '2024-11-05', 'Order Accepted !', -1980000000, 7),
(50, 'tuong1@gmail.com', '2024-11-05', 'Order Accepted !', -8910000000, 50),
(51, 'tuong1@gmail.com', '2024-11-05', 'Order Accepted !', -8910000000, 51),
(52, 'tuong1@gmail.com', '2024-11-05', 'Order Accepted !', -8514000000, 52),
(53, 'tuong1@gmail.com', '2024-11-05', 'Order Accepted !', -8019000000, 53),
(54, 'tuong1@gmail.com', '2024-11-05', 'Order Accepted !', -8910000000, 54),
(55, 'tuong1@gmail.com', '2024-11-05', 'Order Accepted !', -7920000000, 55),
(56, 'tuong1@gmail.com', '2024-11-05', 'Order Accepted !', -8514000000, 56),
(57, 'tuong1@gmail.com', '2024-11-05', 'Order Accepted !', -8910000000, 57);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` bigint(20) NOT NULL,
  `discount` double NOT NULL,
  `ordered_product_price` double NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `discount`, `ordered_product_price`, `quantity`, `order_id`, `product_id`) VALUES
(1, 10000, -2475000000, 997, 1, 1),
(2, 10000, -2475000000, 1, 2, 1),
(3, 10000, -2475000000, 1, 3, 1),
(4, 10000, -2475000000, 1, 4, 1),
(5, 10000, -2475000000, 1, 5, 1),
(6, 10000, -2475000000, 1, 6, 1),
(7, 10000, -1980000000, 1, 7, 2),
(122, 10000, -2475000000, 1, 50, 1),
(123, 10000, -2475000000, 1, 51, 1),
(124, 10000, -2079000000, 1, 52, 55),
(125, 10000, -1584000000, 1, 53, 54),
(126, 10000, -2475000000, 1, 54, 1),
(127, 10000, -1485000000, 1, 55, 53),
(128, 10000, -2079000000, 1, 56, 55),
(129, 10000, -2475000000, 1, 57, 1);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` bigint(20) NOT NULL,
  `payment_method` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `payment_method`) VALUES
(1, 'credit_card'),
(2, 'credit_card'),
(3, 'credit_card'),
(4, 'credit_card'),
(5, 'credit_card'),
(6, 'credit_card'),
(7, 'credit_card'),
(50, 'credit_card'),
(51, 'credit_card'),
(52, 'credit_card'),
(53, 'credit_card'),
(54, 'credit_card'),
(55, 'credit_card'),
(56, 'credit_card'),
(57, 'credit_card');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` bigint(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `discount` double NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `special_price` double NOT NULL,
  `category_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `description`, `discount`, `image`, `price`, `product_name`, `quantity`, `special_price`, `category_id`) VALUES
(1, 'Iphone 16 Pro\n', 10000, '4b1b928c-853c-43d1-ac19-a5d0e261a0ee.jpg', 25000000, 'Iphone 16 Pro', 1, -2475000000, 1),
(2, 'Iphone 16', 10000, '1abf6507-a329-4011-86e0-9cc2f6806d16.jpg', 20000000, 'Iphone 16 ', 2, -1980000000, 1),
(52, 'Iphone 14 Pro Max', 10000, '0e800943-5cf9-4d51-9e99-30ea19a1095b.jpg', 20000000, 'Iphone 14 Pro Max', 2, -1980000000, 1),
(53, 'Iphone 12 Pro Max', 10000, '17ec9877-c7c0-4612-b936-38d86c03dadd.jpg', 15000000, 'Iphone 12 Pro Max', 2, -1485000000, 1),
(54, 'Iphone 13', 10000, '0ff98e79-b7c1-4138-938c-ee13a276d34d.jpg', 16000000, 'Iphone 13', 2, -1584000000, 1),
(55, 'Iphone 15 Pro Max', 10000, 'ca868d0d-beb2-4e33-84de-090defc91889.jpg', 21000000, 'Iphone 15 Pro Max', 1, -2079000000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products_seq`
--

CREATE TABLE `products_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products_seq`
--

INSERT INTO `products_seq` (`next_val`) VALUES
(151);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` bigint(20) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(101, 'ADMIN'),
(102, 'USER');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `mobile_number` varchar(10) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `first_name`, `last_name`, `mobile_number`, `password`) VALUES
(1, 'tuong1@gmail.com', 'duytuong', 'nguyen', '0222525587', '$2a$10$sGiAWhUy.1lCUjB8xmvTCusMx4aGBqqkN.Mm0WuM6q1h32YMVc90W'),
(3, 'tuong12@gmail.com', 'tuong', 'duyyy', '1234567899', '$2a$10$QuOCsAf5FtBzFcXE4SU0W.DKozokYimbdu.MlrcGOK3vg7fwPKzfW'),
(4, 'tuong123@gmail.com', 'tuongg', 'tiiii', '1234567890', '$2a$10$NPPytlUQbz18JcQxZxX1N.Q.0FYmTv29djqKnne8/ZddF.h7HJ.xe');

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `user_id` bigint(20) NOT NULL,
  `address_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`user_id`, `address_id`) VALUES
(1, 1),
(3, 4),
(4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`user_id`, `role_id`) VALUES
(1, 102),
(3, 101),
(3, 102),
(4, 101),
(4, 102);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD UNIQUE KEY `UK64t7ox312pqal3p7fg9o503c2` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD KEY `FKpcttvuq4mxppo8sxggjtn5i2c` (`cart_id`),
  ADD KEY `FK1re40cjegsfvw58xrkdp6bac6` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `UKhaujdjk1ohmeixjhnhslchrp1` (`payment_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  ADD KEY `FKocimc7dtr037rh4ls4l95nlfi` (`product_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `FKog2rp4qthbtt2lfyhfo32lsw9` (`category_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD KEY `FKpv7y2l6mvly37lngi3doarqhd` (`address_id`),
  ADD KEY `FKrmincuqpi8m660j1c57xj7twr` (`user_id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKt7e7djp752sqn6w22i6ocqy6q` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `address_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `cart_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `FKb5o626f86h46m4s7ms6ginnop` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `FK1re40cjegsfvw58xrkdp6bac6` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `FKpcttvuq4mxppo8sxggjtn5i2c` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK8aol9f99s97mtyhij0tvfj41f` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`payment_id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `FKocimc7dtr037rh4ls4l95nlfi` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FKog2rp4qthbtt2lfyhfo32lsw9` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Constraints for table `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `FKpv7y2l6mvly37lngi3doarqhd` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`address_id`),
  ADD CONSTRAINT `FKrmincuqpi8m660j1c57xj7twr` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `FKj345gk1bovqvfame88rcx7yyx` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FKt7e7djp752sqn6w22i6ocqy6q` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
