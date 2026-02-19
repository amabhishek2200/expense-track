# Expense Tracker

A full-stack web application for tracking and managing personal expenses. Built with Spring Boot backend and vanilla JavaScript frontend.

## Project Structure

```
expense-tracker/
├── backend/           # Spring Boot REST API
├── frontend/          # HTML, CSS, JavaScript
├── docker-compose.yml # Docker orchestration
├── .gitignore
└── README.md         # This file
```

## Features

### Backend
- ✅ RESTful API for expense management
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Filter by category and date range
- ✅ Global exception handling
- ✅ CORS enabled
- ✅ Comprehensive test suite
- ✅ Database migrations with Hibernate

### Frontend
- ✅ Responsive web interface
- ✅ Add, edit, delete expenses
- ✅ Filter and search functionality
- ✅ Real-time expense summary
- ✅ Modern UI with CSS Grid/Flexbox
- ✅ Dynamic data loading

## Technology Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Hibernate ORM
- H2/MySQL/PostgreSQL (configurable)
- JUnit 5
- Mockito

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Fetch API

### DevOps
- Docker
- Docker Compose
- Nginx
- MySQL 8.0

## Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- Node.js (optional, for frontend)
- Docker & Docker Compose (optional)

### Option 1: Run Locally

#### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend will be available at `http://localhost:8080`

#### Frontend
```bash
cd frontend
# Open index.html in a browser or use a local server
python -m http.server 8000  # Python 3
# or
npx http-server             # Node.js
```

Frontend will be available at `http://localhost:8000`

### Option 2: Run with Docker

```bash
docker-compose up -d
```

- Backend: `http://localhost:8080`
- Frontend: `http://localhost`
- MySQL: `localhost:3306`

To stop services:
```bash
docker-compose down
```

## API Endpoints

### Expense Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses/{id}` | Get expense by ID |
| POST | `/api/expenses` | Create new expense |
| PUT | `/api/expenses/{id}` | Update expense |
| DELETE | `/api/expenses/{id}` | Delete expense |
| GET | `/api/expenses/category/{category}` | Get by category |
| GET | `/api/expenses/date-range` | Get by date range |

### Example Request

```bash
# Create expense
curl -X POST http://localhost:8080/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Food",
    "description": "Lunch",
    "amount": 25.50,
    "expenseDate": "2024-01-15"
  }'

# Get expenses by date range
curl "http://localhost:8080/api/expenses/date-range?startDate=2024-01-01&endDate=2024-12-31"
```

## Database Configuration

### H2 (Default - In-Memory)
No additional setup required. Database is in-memory.

### MySQL
Update `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/expense_tracker
    username: root
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
```

### PostgreSQL
Update `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/expense_tracker
    username: postgres
    password: your_password
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQL94Dialect
```

## Testing

### Run Tests
```bash
cd backend
mvn test
```

### Test Coverage
- ExpenseServiceTest: Tests business logic
- ExpenseControllerTest: Tests API endpoints

## Project Snapshots

### Backend Package Structure
```
com.example.expense/
├── controller/     # REST controllers
├── service/        # Business logic
├── repository/     # Data access
├── model/          # JPA entities
├── dto/            # Request/Response DTOs
├── exception/      # Exception handling
└── config/         # Configuration
```

### Frontend Files
- `index.html` - Main HTML structure
- `style.css` - Styling and responsive design
- `app.js` - Main application logic
- `api.js` - API integration layer

## Future Enhancements

- [ ] User authentication & authorization
- [ ] Monthly/yearly reports and charts
- [ ] Budget management
- [ ] Expense categories management
- [ ] Recurring expenses
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Advanced analytics

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is open source and available under the MIT License.

## Support

For support, email support@expensetracker.com or open an issue in the repository.

## Authors

- **Your Name** - Initial work

## Acknowledgments

- Spring Boot community
- Bootstrap for CSS inspiration
- All contributors
