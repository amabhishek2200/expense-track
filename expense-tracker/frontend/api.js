// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// API Functions
async function fetchExpenses() {
    try {
        const response = await fetch(`${API_BASE_URL}/expenses`);
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
}

async function getExpenseById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/expenses/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch expense');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching expense:', error);
        throw error;
    }
}

async function createExpense(expenseData) {
    try {
        const response = await fetch(`${API_BASE_URL}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData)
        });
        if (!response.ok) {
            throw new Error('Failed to create expense');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating expense:', error);
        throw error;
    }
}

async function updateExpense(id, expenseData) {
    try {
        const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData)
        });
        if (!response.ok) {
            throw new Error('Failed to update expense');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error;
    }
}

async function deleteExpense(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete expense');
        }
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw error;
    }
}

async function getExpensesByCategory(category) {
    try {
        const response = await fetch(`${API_BASE_URL}/expenses/category/${category}`);
        if (!response.ok) {
            throw new Error('Failed to fetch expenses by category');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching expenses by category:', error);
        throw error;
    }
}

async function getExpensesByDateRange(startDate, endDate) {
    try {
        const response = await fetch(`${API_BASE_URL}/expenses/date-range?startDate=${startDate}&endDate=${endDate}`);
        if (!response.ok) {
            throw new Error('Failed to fetch expenses by date range');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching expenses by date range:', error);
        throw error;
    }
}
