-- Remove CREATE DATABASE since loan_management already exists
-- CREATE DATABASE lending;

-- Create clients table with consistent id naming
CREATE TABLE clients (
  id SERIAL PRIMARY KEY NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  contactNumber VARCHAR(20), -- Changed to VARCHAR for better phone number handling
  email VARCHAR(255),
  address VARCHAR(255),
  username VARCHAR(255),
  password VARCHAR(255) -- Added password column since it's referenced in UPDATE
);

-- Create admin table, fix syntax error
CREATE TABLE admin (
  id SERIAL PRIMARY KEY NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  contactNumber VARCHAR(20), -- Changed to VARCHAR8
  email VARCHAR(255), -- Removed invalid 'L'
  address VARCHAR(255),
  password VARCHAR(255),
  username VARCHAR(255)
);

-- Create loans table, fix foreign key reference
CREATE TABLE loans (
  id SERIAL PRIMARY KEY NOT NULL,
  client_id INT,
  balance NUMERIC(12,2),
  gross_loan NUMERIC(12,2),
  amort NUMERIC(12,2),
  terms INT,
  date_released TIMESTAMP WITHOUT TIME ZONE,
  maturity_date DATE,
  type VARCHAR(255),
  status VARCHAR(255),
  FOREIGN KEY (client_id) REFERENCES clients(id) -- Reference clients(id), not client_id
);

-- Create payments table, fix foreign key references
CREATE TABLE payments (
  id SERIAL PRIMARY KEY NOT NULL,
  client_id INT,
  loan_id INT,
  amount NUMERIC(12,2),
  new_balance NUMERIC(12,2),
  collection_date TIMESTAMP WITHOUT TIME ZONE,
  collected_by VARCHAR(255),
  method VARCHAR(255),
  FOREIGN KEY (client_id) REFERENCES clients(id), -- Reference clients(id)
  FOREIGN KEY (loan_id) REFERENCES loans(id) -- Reference loans(id), not loan_id
);

-- DATA
-- CLIENTS
INSERT INTO clients (firstName, lastName, contactNumber, email, address, username)
VALUES ('Elon', 'Musk', '444333', 'elonmusk@gmail.com', 'Boca Chica, Texas', 'notElonMusk');

INSERT INTO clients (firstName, lastName, contactNumber, email, address, username)
VALUES ('Peter', 'Parker', '555666', 'peterparker@gmail.com', 'New York', 'notPeterParker');

INSERT INTO clients (firstName, lastName, contactNumber, email, address, username)
VALUES ('Tony', 'Stark', '777888', 'tonystark@gmail.com', 'New York', 'notTonyStark');

INSERT INTO clients (firstName, lastName, contactNumber, email, address, username)
VALUES ('Bruce', 'Banner', '999000', 'bruce@gmail.com', 'New York', 'notHulk');

INSERT INTO clients (firstName, lastName, contactNumber, email, address, username)
VALUES ('Stephen', 'Strange', '111222', 'stephen@gmail.com', 'New York', 'notStrange');

-- Skip UPDATE for id = 9 since it doesn't exist yet
-- UPDATE clients SET firstName = 'Ian Czar', lastName = 'Dino', contactNumber = '112233', address = 'Daraga Albay', email = 'ianczar@gmail.com', username = 'ian2', password = '12345' WHERE id = 9 RETURNING *;

-- LOANS
INSERT INTO loans (client_id, balance, gross_loan, amort, terms, date_released, maturity_date, type, status) 
VALUES (1, 5000, 5000, 2500, 1, '2023-02-04 05:30:01', '2023-03-04', 'Personal Loan', 'Pending');

-- Skip UPDATE for loan_id = 9 since it doesn't exist yet
-- UPDATE loans SET type = 'Salary Loan', balance = 0, gross_loan = 5000, amort = 2500, terms = 2500, date_released = '2023-02-04', maturity_date = '2023-03-04', status = 'Disbursed' WHERE loan_id = 9 RETURNING *;

-- PAYMENTS
INSERT INTO payments (client_id, loan_id, amount, new_balance, collection_date, collected_by, method) 
VALUES (1, 1, 5000, 0, '2023-03-04', 'admin', 'ATM');

-- JOINED DATA
-- Fix column references in JOINs
SELECT * FROM clients INNER JOIN loans ON clients.id = loans.client_id;

-- Fix the LEFT JOIN and WHERE clause (id is integer, not UUID)
SELECT * FROM clients AS c LEFT JOIN loans AS l ON c.id = l.client_id WHERE c.id = 1;