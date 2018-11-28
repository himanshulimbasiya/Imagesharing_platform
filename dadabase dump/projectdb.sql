-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 30, 2018 at 04:10 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectdb`
--
CREATE DATABASE IF NOT EXISTS `projectdb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `projectdb`;

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

DROP TABLE IF EXISTS `user_details`;
CREATE TABLE IF NOT EXISTS `user_details` (
  `username` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `image_id` int(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`username`, `image`, `image_id`, `date`, `time`) VALUES
('test', '4.png', 3, 'Mon Apr 30 2018', '4:44'),
('himanshu', '1.png', 0, 'Mon Apr 30 2018', '4:37'),
('test', '2.png', 1, 'Mon Apr 30 2018', '4:40'),
('test', '3.png', 2, 'Mon Apr 30 2018', '4:41'),
('test', '5.png', 4, 'Mon Apr 30 2018', '4:44'),
('test', '6.png', 5, 'Mon Apr 30 2018', '4:44'),
('test', '7.png', 6, 'Mon Apr 30 2018', '4:44'),
('himanshu', '8.png', 7, 'Mon Apr 30 2018', '4:45'),
('himanshu', '9.png', 8, 'Mon Apr 30 2018', '4:45'),
('himanshu', '10.png', 9, 'Mon Apr 30 2018', '4:45');

-- --------------------------------------------------------

--
-- Table structure for table `user_registration`
--

DROP TABLE IF EXISTS `user_registration`;
CREATE TABLE IF NOT EXISTS `user_registration` (
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_registration`
--

INSERT INTO `user_registration` (`firstname`, `lastname`, `email`, `username`, `password`) VALUES
('Himanshu', 'Limbasiya', 'himanshu.limbasiyaie@gmail.com', 'himanshu', 'rain'),
('test', 'test', 'test@testing.com', 'test', 'test');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
