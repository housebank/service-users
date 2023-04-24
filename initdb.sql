-- Connect to PostgreSQL server
\c host=host_name> dbname=<database_name> user=<username> password=<password>

-- Check if database exists
SELECT datname FROM pg_database WHERE datname = 'techbricks';

-- If database doesn't exist, create it
CREATE DATABASE database_name;

-- Switch to the new database
\c database_name;

-- Check if table exists
SELECT to_regclass('public.user');

-- If table doesn't exist, create it with specified columns
CREATE TABLE IF NOT EXISTS public.user (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255),
    description TEXT,
    address TEXT[],
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    media TEXT[],
    city VARCHAR(255),
    country VARCHAR(255),
    price NUMERIC(10,2),
    availability BOOLEAN,
    verified BOOLEAN,
    owner_id INTEGER,
    size VARCHAR(255),
    bedrooms INTEGER,
    bathrooms INTEGER,
    amenities TEXT[],
    rating_id INTEGER,
    reviews TEXT[],
    bookings INTEGER[],
    listed_by INTEGER,
    tags TEXT[]
    );
