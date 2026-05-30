CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE severity_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE material_category AS ENUM ('stone', 'timber', 'alloy', 'plaster', 'ceramic');

CREATE TABLE climate_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    avg_lux NUMERIC(10, 2),
    humidity NUMERIC(5, 2),
    thermal_range NUMERIC(5, 2),
    latitude NUMERIC(9, 6)
);

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    name TEXT NOT NULL,
    location TEXT,
    climate_profile_id UUID REFERENCES climate_profiles(id),
    active_environment_id UUID, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE environments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    environment_version INTEGER DEFAULT 1,
    parent_environment_id UUID REFERENCES environments(id),
    snapshot JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE projects ADD CONSTRAINT fk_active_env FOREIGN KEY (active_environment_id) REFERENCES environments(id);

CREATE TABLE materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category material_category NOT NULL,
    reflectance_value NUMERIC(5, 2) NOT NULL,
    spectral_shift NUMERIC(5, 2),
    roughness NUMERIC(5, 2) NOT NULL,
    warmth_retention NUMERIC(5, 2),
    acoustic_absorption NUMERIC(5, 2)
);

CREATE TABLE render_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    material_id UUID REFERENCES materials(id) ON DELETE CASCADE,
    ambient_gradient TEXT,
    bounce_intensity NUMERIC(3, 2),
    diffusion_strength NUMERIC(3, 2),
    noise_opacity NUMERIC(3, 2),
    atmospheric_latency INTEGER
);

CREATE TABLE lighting_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    environment_id UUID NOT NULL REFERENCES environments(id) ON DELETE CASCADE,
    kelvin INTEGER NOT NULL,
    intensity_value NUMERIC(5, 2) NOT NULL
);

CREATE TABLE atmospheric_observations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    environment_id UUID NOT NULL REFERENCES environments(id) ON DELETE CASCADE,
    severity severity_level NOT NULL,
    message TEXT NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);