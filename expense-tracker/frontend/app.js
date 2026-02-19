// DOM Elements
const expenseForm = document.getElementById('expenseForm');
const expensesBody = document.getElementById('expensesBody');
const totalAmountSpan = document.getElementById('totalAmount');
const filterCategory = document.getElementById('filterCategory');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setTodayAsDefault();
    showAllExpenses();
    expenseForm.addEventListener('submit', handleAddExpense);
});

// Set today's date as default in the date input
function setTodayAsDefault() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('expenseDate').value = today;
}

// Handle Add Expense
async function handleAddExpense(e) {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const expenseDate = document.getElementById('expenseDate').value;

    if (!category || !description || !amount || !expenseDate) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    try {
        const expenseData = {
            category,
            description,
            amount: parseFloat(amount),
            expenseDate
        };

        await createExpense(expenseData);
        showAlert('Expense added successfully!', 'success');
        expenseForm.reset();
        setTodayAsDefault();
        showAllExpenses();
    } catch (error) {
        showAlert('Error adding expense: ' + error.message, 'error');
    }
}

// Show All Expenses
async function showAllExpenses() {
    try {
        const expenses = await fetchExpenses();
        displayExpenses(expenses);
    } catch (error) {
        expensesBody.innerHTML = '<tr><td colspan="7" class="text-center">Error loading expenses</td></tr>';
    }
}

// Filter Expenses
async function filterExpenses() {
    const category = filterCategory.value;
    const start = startDate.value;
    const end = endDate.value;

    if (!category && !start && !end) {
        showAlert('Please enter filter criteria', 'error');
        return;
    }

    try {
        let filteredExpenses = [];

        if (category) {
            filteredExpenses = await getExpensesByCategory(category);
        }

        if (start && end) {
            const dateRangeExpenses = await getExpensesByDateRange(start, end);
            if (filteredExpenses.length > 0) {
                filteredExpenses = filteredExpenses.filter(expense => 
                    dateRangeExpenses.some(de => de.id === expense.id)
                );
            } else {
                filteredExpenses = dateRangeExpenses;
            }
        }

        displayExpenses(filteredExpenses);
        showAlert('Expenses filtered successfully', 'success');
    } catch (error) {
        showAlert('Error filtering expenses: ' + error.message, 'error');
    }
}

// Display Expenses
function displayExpenses(expenses) {
    if (expenses.length === 0) {
        expensesBody.innerHTML = '<tr><td colspan="7" class="text-center">No expenses found</td></tr>';
        totalAmountSpan.textContent = '0.00';
        return;
    }

    let totalAmount = 0;
    expensesBody.innerHTML = '';

    expenses.forEach(expense => {
        const row = document.createElement('tr');
        const createdDate = new Date(expense.createdAt).toLocaleDateString();
        
        totalAmount += parseFloat(expense.amount || 0);

        row.innerHTML = `
            <td>${expense.id}</td>
            <td>${expense.category}</td>
            <td>${expense.description}</td>
            <td>$${parseFloat(expense.amount).toFixed(2)}</td>
            <td>${expense.expenseDate}</td>
            <td>${createdDate}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="handleEditExpense(${expense.id})">Edit</button>
                    <button class="btn-danger" onclick="handleDeleteExpense(${expense.id})">Delete</button>
                </div>
            </td>
        `;
        expensesBody.appendChild(row);
    });

    totalAmountSpan.textContent = totalAmount.toFixed(2);
}

// Handle Edit Expense
async function handleEditExpense(id) {
    try {
        const expense = await getExpenseById(id);
        
        document.getElementById('category').value = expense.category;
        document.getElementById('description').value = expense.description;
        document.getElementById('amount').value = expense.amount;
        document.getElementById('expenseDate').value = expense.expenseDate;

        // Change button text and form action
        const submitBtn = expenseForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Update Expense';

        // Update form submission to handle update
        const updateHandler = async (e) => {
            e.preventDefault();
            
            const category = document.getElementById('category').value;
            const description = document.getElementById('description').value;
            const amount = document.getElementById('amount').value;
            const expenseDate = document.getElementById('expenseDate').value;

            try {
                const expenseData = {
                    category,
                    description,
                    amount: parseFloat(amount),
                    expenseDate
                };

                await updateExpense(id, expenseData);
                showAlert('Expense updated successfully!', 'success');
                expenseForm.reset();
                submitBtn.textContent = originalText;
                expenseForm.removeEventListener('submit', updateHandler);
                expenseForm.addEventListener('submit', handleAddExpense);
                setTodayAsDefault();
                showAllExpenses();
            } catch (error) {
                showAlert('Error updating expense: ' + error.message, 'error');
            }
        };

        expenseForm.removeEventListener('submit', handleAddExpense);
        expenseForm.addEventListener('submit', updateHandler);

        // Scroll to form
        expenseForm.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showAlert('Error loading expense: ' + error.message, 'error');
    }
}

// Handle Delete Expense
async function handleDeleteExpense(id) {
    if (confirm('Are you sure you want to delete this expense?')) {
        try {
            await deleteExpense(id);
            showAlert('Expense deleted successfully!', 'success');
            showAllExpenses();
        } catch (error) {
            showAlert('Error deleting expense: ' + error.message, 'error');
        }
    }
}

// Show Alert Message
function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Insert at the top of main
    document.querySelector('main').insertBefore(alertDiv, document.querySelector('.form-section'));
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}
