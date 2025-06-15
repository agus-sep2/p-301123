
-- Modify projects table to support multiple categories and make fields optional
ALTER TABLE projects 
ADD COLUMN categories TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Update existing projects to move single category to categories array
UPDATE projects 
SET categories = ARRAY[category] 
WHERE category IS NOT NULL AND categories IS NULL;

-- Make category and status optional
ALTER TABLE projects 
ALTER COLUMN category DROP NOT NULL,
ALTER COLUMN status DROP NOT NULL;

-- Update example project with multiple categories
UPDATE projects 
SET categories = ARRAY['Full Stack', 'Web Development', 'Backend', 'Frontend']
WHERE award IS NOT NULL;
