-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 21, 2024 at 11:14 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `issue9`
--

-- --------------------------------------------------------

--
-- Table structure for table `dept`
--

DROP TABLE IF EXISTS `dept`;
CREATE TABLE IF NOT EXISTS `dept` (
  `dept_no` int NOT NULL AUTO_INCREMENT,
  `dept_name` text NOT NULL,
  `dept_chairman` text NOT NULL,
  `dept_dean` text NOT NULL,
  PRIMARY KEY (`dept_no`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dept`
--

INSERT INTO `dept` (`dept_no`, `dept_name`, `dept_chairman`, `dept_dean`) VALUES
(1, 'HR Dept', 'Shahnawaz Talpur', 'Mumtaz Ali'),
(2, 'HR Dept', 'Shahnawaz Talpur', 'Mumtaz Ali');

-- --------------------------------------------------------

--
-- Table structure for table `emp`
--

DROP TABLE IF EXISTS `emp`;
CREATE TABLE IF NOT EXISTS `emp` (
  `emp_no` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `designation` text NOT NULL,
  `dept` text NOT NULL,
  `salary` int NOT NULL,
  `emp_s_date` date NOT NULL,
  `p_email` varchar(50) NOT NULL,
  `org_email` varchar(50) NOT NULL,
  `phone_num` bigint NOT NULL,
  `address` varchar(100) NOT NULL,
  PRIMARY KEY (`emp_no`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `emp`
--

INSERT INTO `emp` (`emp_no`, `name`, `designation`, `dept`, `salary`, `emp_s_date`, `p_email`, `org_email`, `phone_num`, `address`) VALUES
(1, 'Abdul Aziz', 'Developer', 'HR', 200000, '0007-05-21', 'aziz@gmail.com', 'azizdev@xcltechnologies.com', 1234567890, 'abc street');

-- --------------------------------------------------------

--
-- Table structure for table `identity`
--

DROP TABLE IF EXISTS `identity`;
CREATE TABLE IF NOT EXISTS `identity` (
  `role` text NOT NULL,
  `username` text NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `identity`
--

INSERT INTO `identity` (`role`, `username`, `password`) VALUES
('HR', 'anza', 'anza'),
('Employee', 'aziz', 'aziz'),
('Employee', 'aisha', 'aisha');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
