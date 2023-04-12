/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : topo

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 12/04/2023 11:21:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for animates
-- ----------------------------
DROP TABLE IF EXISTS `animates`;
CREATE TABLE `animates`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `frames` json NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for common_component_menus
-- ----------------------------
DROP TABLE IF EXISTS `common_component_menus`;
CREATE TABLE `common_component_menus`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `expand` tinyint(1) NULL DEFAULT 1,
  `show` tinyint(1) NULL DEFAULT 1,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `role` int(255) NOT NULL DEFAULT 0,
  `type` int(255) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for commoncomponents
-- ----------------------------
DROP TABLE IF EXISTS `commoncomponents`;
CREATE TABLE `commoncomponents`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `width` int(11) NULL DEFAULT 100,
  `bgimage` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `height` int(11) NULL DEFAULT 100,
  `data` json NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `menuId` int(11) NULL DEFAULT NULL,
  `commonComponentMenuId` int(11) NULL DEFAULT NULL,
  `role` int(255) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `menuId`(`menuId`) USING BTREE,
  INDEX `commonComponentMenuId`(`commonComponentMenuId`) USING BTREE,
  CONSTRAINT `commoncomponents_ibfk_1` FOREIGN KEY (`menuId`) REFERENCES `common_component_menus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `commoncomponents_ibfk_2` FOREIGN KEY (`commonComponentMenuId`) REFERENCES `common_component_menus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1575 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for communications
-- ----------------------------
DROP TABLE IF EXISTS `communications`;
CREATE TABLE `communications`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `data` json NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for components
-- ----------------------------
DROP TABLE IF EXISTS `components`;
CREATE TABLE `components`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `width` int(11) NULL DEFAULT 100,
  `bgimage` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `height` int(11) NULL DEFAULT 100,
  `data` json NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `menuId` int(11) NULL DEFAULT NULL,
  `CustomizeComponentMenuId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `menuId`(`menuId`) USING BTREE,
  INDEX `CustomizeComponentMenuId`(`CustomizeComponentMenuId`) USING BTREE,
  CONSTRAINT `components_ibfk_1` FOREIGN KEY (`menuId`) REFERENCES `customize_component_menus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `components_ibfk_2` FOREIGN KEY (`CustomizeComponentMenuId`) REFERENCES `customize_component_menus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for customize_component_menus
-- ----------------------------
DROP TABLE IF EXISTS `customize_component_menus`;
CREATE TABLE `customize_component_menus`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `expand` tinyint(1) NULL DEFAULT 1,
  `show` tinyint(1) NULL DEFAULT 1,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for drawings
-- ----------------------------
DROP TABLE IF EXISTS `drawings`;
CREATE TABLE `drawings`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `drawingId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `thumbnail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for issueds
-- ----------------------------
DROP TABLE IF EXISTS `issueds`;
CREATE TABLE `issueds`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `data` json NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for mqttinfos
-- ----------------------------
DROP TABLE IF EXISTS `mqttinfos`;
CREATE TABLE `mqttinfos`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `data` json NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for system_infos
-- ----------------------------
DROP TABLE IF EXISTS `system_infos`;
CREATE TABLE `system_infos`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `key` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `value` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `describption` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for uploads
-- ----------------------------
DROP TABLE IF EXISTS `uploads`;
CREATE TABLE `uploads`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `filename` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `pathname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `role` int(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 124 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `avatar` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `favoriteColor` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `age` int(11) NULL DEFAULT NULL,
  `cash` int(11) NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `role` int(255) NOT NULL,
  `visit` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
