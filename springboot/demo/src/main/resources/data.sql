-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               9.4.0 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for spring
CREATE DATABASE IF NOT EXISTS `spring` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `spring`;

-- Dumping structure for table spring.courses
CREATE TABLE IF NOT EXISTS `courses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table spring.courses: ~0 rows (approximately)

-- Dumping structure for table spring.departments
CREATE TABLE IF NOT EXISTS `departments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping structure for table spring.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table spring.users: ~0 rows (approximately)

-- Dumping structure for table spring.profile
CREATE TABLE IF NOT EXISTS `profile` (
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK6x079ilawxjrfsljwyyi5ujjq` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table spring.profile: ~0 rows (approximately)

-- Dumping structure for table spring.role
CREATE TABLE IF NOT EXISTS `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `role` (`id`, `code`, `name`)
SELECT 1 AS id, 'ADMIN' AS code, 'admin' AS name FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `role` WHERE id = 1);
INSERT INTO `role` (`id`, `code`, `name`)
SELECT 2 AS id, 'LANDLORD' AS code, 'landlord' AS name FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `role` WHERE id = 2);
INSERT INTO `role` (`id`, `code`, `name`)
SELECT 3 AS id, 'USER' AS code, 'user' AS name FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `role` WHERE id = 3);

-- Dumping structure for table spring.students
CREATE TABLE IF NOT EXISTS `students` (
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `id` bigint NOT NULL,
  `department_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKalgc33nsolpmegw14o3h6g6rr` (`department_id`),
  CONSTRAINT `FK7xqmtv7r2eb5axni3jm0a80su` FOREIGN KEY (`id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKalgc33nsolpmegw14o3h6g6rr` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table spring.students: ~0 rows (approximately)

-- Dumping structure for table spring.student_courses
CREATE TABLE IF NOT EXISTS `student_courses` (
  `student_id` bigint NOT NULL,
  `course_id` bigint NOT NULL,
  KEY `FKsfpq78oyrqua1h0obpl7ulc18` (`course_id`),
  KEY `FKwj1l0mta35u161acdl2tupoo` (`student_id`),
  CONSTRAINT `FKsfpq78oyrqua1h0obpl7ulc18` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `FKwj1l0mta35u161acdl2tupoo` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table spring.student_courses: ~0 rows (approximately)

-- Dumping structure for table spring.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`id`, `password`, `username`)
SELECT 1 AS id, '123456' AS password, 'admin' AS username FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `user` WHERE id = 1);
INSERT INTO `user` (`id`, `password`, `username`)
SELECT 2 AS id, '123456' AS password, 'landlord' AS username FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `user` WHERE id = 2);
INSERT INTO `user` (`id`, `password`, `username`)
SELECT 3 AS id, '123456' AS password, 'user' AS username FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `user` WHERE id = 3);

-- Dumping structure for table spring.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table spring.users: ~0 rows (approximately)

-- Dumping structure for table spring.user_roles
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  KEY `FKrhfovtciq1l558cw6udg0h0d3` (`role_id`),
  KEY `FK55itppkw3i07do3h7qoclqd4k` (`user_id`),
  CONSTRAINT `FK55itppkw3i07do3h7qoclqd4k` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKrhfovtciq1l558cw6udg0h0d3` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user_roles` (`user_id`, `role_id`)
SELECT 1 AS user_id, 1 AS role_id FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `user_roles` WHERE user_id = 1 AND role_id = 1);
INSERT INTO `user_roles` (`user_id`, `role_id`)
SELECT 2 AS user_id, 2 AS role_id FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `user_roles` WHERE user_id = 2 AND role_id = 2);
INSERT INTO `user_roles` (`user_id`, `role_id`)
SELECT 3 AS user_id, 3 AS role_id FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `user_roles` WHERE user_id = 3 AND role_id = 3);
INSERT INTO `user_roles` (`user_id`, `role_id`)
SELECT 1 AS user_id, 2 AS role_id FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `user_roles` WHERE user_id = 1 AND role_id = 2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
