DROP DATABASE EduMall;

CREATE DATABASE EduMall;

USE EduMall;

CREATE TABLE roles (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	rolename varchar(255) NOT NULL
);

CREATE TABLE users (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
    	gender int,
	dateofbirth Date,
	school varchar(255),
	major varchar(255),
	career varchar(255),
	subject varchar(255),
	class varchar(255),
	address varchar(255)
);

CREATE TABLE userrole (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	roleid bigint,	
	uid bigint,
	FOREIGN KEY (roleid) REFERENCES roles(id),
	FOREIGN KEY (uid) REFERENCES users(id)
);

CREATE TABLE teacher (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	uid bigint UNIQUE,
	FOREIGN KEY (uid) REFERENCES users(id)
);

CREATE TABLE student (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	uid bigint UNIQUE,
	FOREIGN KEY (uid) REFERENCES users(id)
);

CREATE TABLE Course (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	type int,
	uid bigint,
	cate int,
	description text,
	createat Date,
	updateat Date,
	deleteat Date,
	active boolean,
	price double
);

CREATE TABLE teachercourse (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	teacherid bigint,
	courseid bigint,
	FOREIGN KEY (teacherid) REFERENCES teacher(id),
	FOREIGN KEY (courseid) REFERENCES course(id)
);

CREATE TABLE route (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	courseid bigint,
	orders int,
	title int,
	content text,
	FOREIGN KEY (courseid) REFERENCES course(id)
);

CREATE TABLE studentcourse (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	studentid bigint,
	courseid bigint,
	FOREIGN KEY (studentid) REFERENCES student(id),
	FOREIGN KEY (courseid) REFERENCES course(id)
);

CREATE TABLE category (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	description text
);

CREATE TABLE document (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	routeid bigint,
	link text,
	FOREIGN KEY (routeid) REFERENCES route(id)
);

CREATE TABLE type (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	type text
);

CREATE TABLE video (
	id bigint PRIMARY KEY AUTO_INCREMENT,
	routeid bigint,
	link text,
	FOREIGN KEY (routeid) REFERENCES route(id)
)