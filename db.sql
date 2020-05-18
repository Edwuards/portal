-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: localhost    Database: avisame
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `log_request`
--

DROP TABLE IF EXISTS `log_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `request` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_request`
--

LOCK TABLES `log_request` WRITE;
/*!40000 ALTER TABLE `log_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `log_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_proof`
--

DROP TABLE IF EXISTS `medical_proof`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_proof` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `request` int(11) DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_proof`
--

LOCK TABLES `medical_proof` WRITE;
/*!40000 ALTER TABLE `medical_proof` DISABLE KEYS */;
/*!40000 ALTER TABLE `medical_proof` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `enabled` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (1,'Permiso',NULL),(2,'Vacación',NULL),(3,'Enfermedad',NULL),(4,'Home Office',NULL);
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recovery_password`
--

DROP TABLE IF EXISTS `recovery_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recovery_password` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `hash` binary(1) DEFAULT NULL,
  `enabled` tinyint(4) DEFAULT NULL,
  `available` tinyint(4) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recovery_password`
--

LOCK TABLES `recovery_password` WRITE;
/*!40000 ALTER TABLE `recovery_password` DISABLE KEYS */;
/*!40000 ALTER TABLE `recovery_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `notice` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `date_start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_finish` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `total` varchar(5) DEFAULT NULL,
  `comments` longtext,
  `status` int(11) NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES (1,1,1,'2020-05-12 11:02:52','2020-05-12 12:02:52','2020-05-12 16:10:13','2020-05-14 02:45:02',NULL,'',1),(2,1,1,'2020-05-12 11:01:52','2020-05-12 11:01:52','2020-05-12 16:10:38','2020-05-14 03:24:29',NULL,'',1),(3,1,1,'2020-05-12 20:01:52','2020-05-12 11:01:52','2020-05-12 16:11:34','2020-05-12 17:14:55',NULL,'',0),(4,2,1,'2020-05-12 22:03:59','2020-05-12 22:03:59','2020-05-12 17:04:18','2020-05-12 18:29:55',NULL,NULL,1),(5,2,1,'2020-05-12 22:04:44','2020-05-12 22:04:44','2020-05-12 17:04:58','2020-05-12 18:31:03',NULL,NULL,0),(6,2,1,'2020-05-12 22:05:44','2020-05-12 22:05:44','2020-05-12 17:08:18','2020-05-14 08:37:35',NULL,NULL,1),(7,2,1,'2020-05-12 22:05:44','2020-05-12 22:05:44','2020-05-12 17:09:31','2020-05-12 18:31:06',NULL,NULL,1),(8,2,1,'2020-05-12 22:05:44','2020-05-12 22:05:44','2020-05-12 17:11:56','2020-05-14 04:31:19',NULL,NULL,1),(9,2,1,'2020-05-12 22:12:04','2020-05-12 22:12:04','2020-05-12 17:12:15','2020-05-14 04:39:29',NULL,NULL,0),(10,2,1,'2020-05-12 22:12:31','2020-05-12 22:12:32','2020-05-12 17:12:39','2020-05-14 08:37:09',NULL,NULL,1),(11,1,1,'2020-05-12 11:02:54','2020-05-12 13:01:54','2020-05-12 23:15:32','2020-05-12 23:15:32',NULL,'dfgsdf',2),(12,2,1,'2020-05-13 04:14:54','2020-05-13 04:14:54','2020-05-12 23:15:52','2020-05-14 02:26:40',NULL,NULL,1),(13,2,1,'2020-05-14 02:55:37','2020-05-14 02:55:37','2020-05-13 21:57:05','2020-05-13 21:57:05',NULL,NULL,2),(14,2,1,'2020-05-14 02:55:37','2020-05-14 02:55:37','2020-05-13 21:57:18','2020-05-14 04:41:42',NULL,NULL,1),(15,2,1,'2020-05-14 03:03:00','2020-05-14 03:03:00','2020-05-13 22:07:57','2020-05-13 22:07:57',NULL,NULL,2),(16,3,1,'2020-05-14 03:03:00','2020-05-14 03:03:00','2020-05-13 22:09:20','2020-05-14 04:48:33',NULL,NULL,1),(17,2,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','2020-05-13 22:12:20','2020-05-13 22:12:20',NULL,NULL,2),(18,2,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','2020-05-13 22:13:38','2020-05-13 22:13:38',NULL,NULL,2),(19,2,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','2020-05-13 22:14:12','2020-05-13 22:14:12',NULL,NULL,2),(20,2,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','2020-05-13 22:14:17','2020-05-13 22:14:17',NULL,NULL,2),(21,2,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','2020-05-13 22:16:25','2020-05-13 22:16:25',NULL,NULL,2),(22,2,1,'2020-05-13 22:16:30','2020-05-13 22:16:30','2020-05-13 22:16:38','2020-05-13 22:16:38',NULL,NULL,2),(23,2,1,'2020-05-15 02:04:45','2020-05-15 02:04:45','2020-05-14 02:05:20','2020-05-14 02:05:20',NULL,NULL,2),(24,4,1,'2020-05-14 02:19:01','2020-05-14 02:19:01','2020-05-14 02:19:11','2020-05-14 02:19:11',NULL,'',2),(25,1,1,'2020-05-13 05:00:26','2020-05-13 05:00:26','2020-05-14 04:59:27','2020-05-14 05:04:57',NULL,'',1),(26,2,1,'2020-05-14 05:03:17','2020-05-14 05:03:17','2020-05-14 05:03:32','2020-05-14 05:03:32',NULL,NULL,2),(27,2,1,'2020-05-14 05:04:44','2020-05-14 05:04:44','2020-05-14 05:05:06','2020-05-14 05:05:06',NULL,NULL,2),(28,2,1,'2020-05-14 05:07:59','2020-05-14 05:07:59','2020-05-14 05:08:05','2020-05-14 05:08:05',NULL,NULL,2),(29,2,1,'2020-05-14 05:12:07','2020-05-14 05:12:07','2020-05-14 05:12:11','2020-05-14 05:12:11',NULL,NULL,2),(30,2,1,'2020-05-14 05:38:42','2020-05-14 05:38:42','2020-05-14 05:38:59','2020-05-14 05:38:59',NULL,NULL,2),(31,1,1,'2020-05-14 05:00:13','2020-05-14 05:00:13','2020-05-14 07:55:40','2020-05-14 07:55:40',NULL,'',2),(32,1,1,'2020-05-14 05:00:45','2020-05-14 05:00:45','2020-05-14 08:12:43','2020-05-14 08:12:43',NULL,'',2),(33,1,1,'2020-05-14 06:04:57','2020-05-14 08:03:57','2020-05-14 19:38:17','2020-05-14 19:38:17',NULL,'23443',2),(34,2,1,'2020-05-14 19:38:52','2020-05-14 19:38:52','2020-05-14 19:40:04','2020-05-14 19:41:20',NULL,NULL,1),(35,2,1,'2020-05-14 19:38:52','2020-05-14 19:38:52','2020-05-14 19:42:00','2020-05-14 19:42:00',NULL,NULL,2),(36,2,1,'2020-05-15 08:35:13','2020-05-15 08:35:13','2020-05-15 08:35:55','2020-05-15 08:35:55',NULL,NULL,2);
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_request`
--

DROP TABLE IF EXISTS `status_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `enabled` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_request`
--

LOCK TABLES `status_request` WRITE;
/*!40000 ALTER TABLE `status_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `status_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `lastname` varchar(25) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `description` tinytext,
  `vacations` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `birthday` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `work_start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` binary(60) DEFAULT NULL,
  `work_position` int(11) DEFAULT NULL,
  `enabled` tinyint(4) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Cesar Ed','Perez','https://scontent.fmex1-1.fna.fbcdn.net/v/t1.0-9/87105879_2932147320180000_864174972170403840_n.png?_nc_cat=107&_nc_sid=85a577&_nc_ohc=iDIiMDlQrYoAX8EkUIZ&_nc_ht=scontent.fmex1-1.fna&oh=cd1a48c38e0769b499d0cdeab2d1fd67&oe=5EDF6664',NULL,9,'cesar@figment.com.mx','1995-11-17 22:00:00','1970-01-05 06:00:00',_binary '$2y$10$Hpaoo5d8xLXQff0J8n2xNORaITHQu1Sc/163GM3lJHExQiGzrTTOi',NULL,NULL,'2020-05-10 23:29:44','2020-05-10 23:29:44',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_areas`
--

DROP TABLE IF EXISTS `work_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `work_areas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `enabled` tinyint(4) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_areas`
--

LOCK TABLES `work_areas` WRITE;
/*!40000 ALTER TABLE `work_areas` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_positions`
--

DROP TABLE IF EXISTS `work_positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `work_positions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `enabled` tinyint(4) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_positions`
--

LOCK TABLES `work_positions` WRITE;
/*!40000 ALTER TABLE `work_positions` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_positions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-15  3:42:47
