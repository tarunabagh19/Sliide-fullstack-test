DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_database WHERE datname = 'categories_db'
   ) THEN
      CREATE DATABASE categories_db;
   END IF;
END
$$;

\c categories_db;

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    parent_id INT REFERENCES categories(id) ON DELETE SET NULL
);

INSERT INTO categories (name, description, parent_id) VALUES
('Electronics', 'Devices and gadgets', NULL),
('Laptops', 'Portable computers', 1),
('Smartphones', 'Mobile devices', 1),
('Books', 'Printed and digital books', NULL),
('Fiction', 'Novels and stories', 4);
