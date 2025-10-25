-- Exhibit Fabric Database Schema
-- Run this SQL in your Supabase SQL Editor to create the required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  file_url TEXT,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quotations table
CREATE TABLE IF NOT EXISTS quotations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_name VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  message TEXT,
  file_url TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_quotations_created_at ON quotations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotations_status ON quotations(status);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotations ENABLE ROW LEVEL SECURITY;

-- Create policies for contacts table
-- Allow insert for anyone (for the contact form)
CREATE POLICY "Anyone can insert contacts" ON contacts
  FOR INSERT
  WITH CHECK (true);

-- Allow read only for authenticated users (admin)
CREATE POLICY "Authenticated users can read contacts" ON contacts
  FOR SELECT
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Allow update only for authenticated users (admin)
CREATE POLICY "Authenticated users can update contacts" ON contacts
  FOR UPDATE
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Create policies for quotations table
-- Allow insert for anyone (for the quotation form)
CREATE POLICY "Anyone can insert quotations" ON quotations
  FOR INSERT
  WITH CHECK (true);

-- Allow read only for authenticated users (admin)
CREATE POLICY "Authenticated users can read quotations" ON quotations
  FOR SELECT
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Allow update only for authenticated users (admin)
CREATE POLICY "Authenticated users can update quotations" ON quotations
  FOR UPDATE
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotations_updated_at BEFORE UPDATE ON quotations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for quotation files
-- Run this in the Supabase dashboard or via the Supabase client
INSERT INTO storage.buckets (id, name, public) VALUES ('quotation-files', 'quotation-files', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for quotation files
CREATE POLICY "Anyone can upload quotation files" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'quotation-files');

CREATE POLICY "Anyone can read quotation files" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'quotation-files');
