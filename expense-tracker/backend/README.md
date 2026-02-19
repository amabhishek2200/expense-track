# Expense Tracker Backend

A Spring Boot REST API for tracking and managing personal expenses.

## Features

- Create, read, update, and delete expenses
- Filter expenses by category
- Filter expenses by date range
- Comprehensive error handling
- CORS enabled for frontend integration
- Unit and integration tests

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL/PostgreSQL (optional, H2 used by default)

## Running the Application

### Using Maven

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### API Endpoints

- `POST /api/expenses` - Create a new expense
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/{id}` - Get expense by ID
- `PUT /api/expenses/{id}` - Update an expense
- `DELETE /api/expenses/{id}` - Delete an expense
- `GET /api/expenses/category/{category}` - Get expenses by category
- `GET /api/expenses/date-range?startDate=2024-01-01&endDate=2024-12-31` - Get expenses by date range

## Database Configuration

The application uses H2 database by default. To use MySQL or PostgreSQL, uncomment the respective configuration in `application.yml`.

## Testing

```bash
mvn test
```
