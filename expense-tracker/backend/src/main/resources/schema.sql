-- Create expenses table
CREATE TABLE expenses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    amount DECIMAL(10, 2) NOT NULL,
    expense_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create index on category for faster queries
CREATE INDEX idx_category ON expenses(category);

-- Create index on expense_date for date range queries
CREATE INDEX idx_expense_date ON expenses(expense_date);
