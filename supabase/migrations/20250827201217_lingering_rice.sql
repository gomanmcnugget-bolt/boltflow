/*
  # Add status column to tasks table

  1. Changes
    - Add `status` column to tasks table with enum values: 'to_do', 'in_progress', 'completed'
    - Set default value to 'to_do' for existing tasks
    - Update existing completed tasks to have 'completed' status
    - Remove the completed boolean column (replaced by status)

  2. Migration Steps
    - Add new status column
    - Update existing data based on completed field
    - Drop the completed column
    - Add check constraint for valid status values
*/

-- Add status column with default value
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'status'
  ) THEN
    ALTER TABLE tasks ADD COLUMN status text DEFAULT 'to_do';
  END IF;
END $$;

-- Update existing data: set status based on completed field
UPDATE tasks 
SET status = CASE 
  WHEN completed = true THEN 'completed'
  ELSE 'to_do'
END
WHERE status = 'to_do';

-- Drop the completed column if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'completed'
  ) THEN
    ALTER TABLE tasks DROP COLUMN completed;
  END IF;
END $$;

-- Add check constraint for valid status values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'tasks_status_check'
  ) THEN
    ALTER TABLE tasks ADD CONSTRAINT tasks_status_check 
    CHECK (status IN ('to_do', 'in_progress', 'completed'));
  END IF;
END $$;