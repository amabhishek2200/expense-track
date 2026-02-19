package com.example.expense.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ExpenseRequest {

    private String category;
    private String description;
    private BigDecimal amount;
    private LocalDate expenseDate;

    // Constructors
    public ExpenseRequest() {
    }

    public ExpenseRequest(String category, String description, BigDecimal amount, LocalDate expenseDate) {
        this.category = category;
        this.description = description;
        this.amount = amount;
        this.expenseDate = expenseDate;
    }

    // Getters and Setters
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getExpenseDate() {
        return expenseDate;
    }

    public void setExpenseDate(LocalDate expenseDate) {
        this.expenseDate = expenseDate;
    }
}
