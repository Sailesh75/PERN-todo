-- \l --> list all the DATABASE in postgresql
-- \c {database_name} --> move inside a DATABASE
-- \dt --> show table in DATABASE

-- In cmd,, type psql -U postgres (must have path added in env variables)

CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);