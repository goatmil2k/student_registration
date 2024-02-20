CREATE DATABASE student_info;

CREATE TABLE academic_info (
    id SERIAL PRIMARY KEY,
    myanmar smallint,
    english smallint,
    math smallint,
    student_year smallint,
    studentId SERIAL,
    CONSTRAINT fk_studentId FOREIGN KEY (studentId) REFERENCES general_info(id)
);

CREATE TABLE general_info (
    id SERIAL PRIMARY KEY,
    student_id VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    dob DATE,
    gender VARCHAR(20),
    address TEXT,
    nrc VARCHAR(20),
    region VARCHAR(40),
    hobbies TEXT,
    photo BYTEA
);



SELECT * FROM general_info;

INSERT INTO general_info (student_id, name, dob, gender, address, nrc, hobbies) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *

SELECT id FROM general_info WHERE name = 'Hla Hla' AND student_id = '123456';


SELECT id, name, student_id, gender, nrc, address, hobbies, dob FROM general_info;
