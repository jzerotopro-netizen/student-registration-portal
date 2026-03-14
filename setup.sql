-- ============================================
-- GGU Student Portal - MySQL Setup Script
-- Run this in MySQL Workbench or Command Line
-- ============================================

-- Step 1: Create the database (Spring Boot will also auto-create it)
CREATE DATABASE IF NOT EXISTS ggu_student_db;
USE ggu_student_db;

-- Step 2: (Optional) The table is auto-created by Spring Boot (JPA)
-- But you can also manually create it:

CREATE TABLE IF NOT EXISTS students (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name   VARCHAR(150) NOT NULL,
    pin_number  VARCHAR(50)  NOT NULL UNIQUE,
    department  VARCHAR(150) NOT NULL,
    year        INT          NOT NULL,
    semester    INT          NOT NULL,
    section     VARCHAR(10)  NOT NULL,
    email       VARCHAR(150) NOT NULL UNIQUE,
    skills      TEXT
);

-- Step 3: (Optional) Insert a test student
-- INSERT INTO students (full_name, pin_number, department, year, semester, section, email, skills)
-- VALUES ('Test Student', 'PIN001', 'Computer Science & Engineering', 1, 1, 'A', 'test@ggu.ac.in', 'Web Development, Data Science');

SELECT 'Database setup complete!' AS Status;