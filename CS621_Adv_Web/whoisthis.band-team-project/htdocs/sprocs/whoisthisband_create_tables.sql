-- ***************************************************************************************
--                        FILE:  whoisthisband_create_tables.sql
--
-- This file provides table creation for whoisthis.band website, to be used in the 
-- mysql database.
-- 
-- Authors:  Caleb Farris, Matthew Jackson, David Parsons, Dongho Jeon
-- ***************************************************************************************

-- Use this to create a database with the correct char-encoding
-- CREATE DATABASE whoisthisband CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- USE whoisthisband

CREATE TABLE users (
  userId int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  pwd varchar(300),
  login varchar(50),
  CUDDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CUDAction int,
  CONSTRAINT users_unique UNIQUE (login)
);

CREATE TABLE views (
  viewId int NOT NULL AUTO_INCREMENT,
  artistName varchar(100),
  popularity char(2),
  userId int(11),
  CUDDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CUDAction int,
  PRIMARY KEY (viewId)
);

CREATE TABLE tweets (
  tweetId int NOT NULL AUTO_INCREMENT,
  tweet varchar(200),
  screen_name varchar(50),
  profile_img varchar(500),
  id_str varchar(50),
  viewId int,
  CUDDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CUDAction int,
  PRIMARY KEY (tweetId),
  CONSTRAINT tweets_ibfk_1 FOREIGN KEY (viewId) REFERENCES views (viewId)
);

CREATE TABLE tracks (
  trackId int NOT NULL AUTO_INCREMENT,
  track varchar(100),
  album varchar(100),
  cover_art varchar(500),
  preview_url varchar(500),
  viewId int,
  CUDDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CUDAction int,
  PRIMARY KEY (trackId),
  CONSTRAINT tracks_ibfk_1 FOREIGN KEY (viewId) REFERENCES views (viewId)
);