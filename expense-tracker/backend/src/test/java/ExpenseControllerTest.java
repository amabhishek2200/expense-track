import com.example.expense.controller.ExpenseController;
import com.example.expense.dto.ExpenseRequest;
import com.example.expense.dto.ExpenseResponse;
import com.example.expense.service.ExpenseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

class ExpenseControllerTest {

    @Mock
    private ExpenseService expenseService;

    @InjectMocks
    private ExpenseController expenseController;

    private ExpenseRequest expenseRequest;
    private ExpenseResponse expenseResponse;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        expenseRequest = new ExpenseRequest("Food", "Lunch", new BigDecimal("25.50"), LocalDate.now());
        expenseResponse = new ExpenseResponse(1L, "Food", "Lunch", new BigDecimal("25.50"),
                LocalDate.now(), LocalDateTime.now(), LocalDateTime.now());
    }

    @Test
    void testCreateExpense() {
        when(expenseService.createExpense(any(ExpenseRequest.class))).thenReturn(expenseResponse);

        ResponseEntity<ExpenseResponse> response = expenseController.createExpense(expenseRequest);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(expenseResponse.getId(), response.getBody().getId());
        verify(expenseService, times(1)).createExpense(any(ExpenseRequest.class));
    }

    @Test
    void testGetExpenseById() {
        when(expenseService.getExpenseById(1L)).thenReturn(expenseResponse);

        ResponseEntity<ExpenseResponse> response = expenseController.getExpenseById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(expenseResponse.getId(), response.getBody().getId());
        verify(expenseService, times(1)).getExpenseById(1L);
    }

    @Test
    void testUpdateExpense() {
        when(expenseService.updateExpense(eq(1L), any(ExpenseRequest.class))).thenReturn(expenseResponse);

        ResponseEntity<ExpenseResponse> response = expenseController.updateExpense(1L, expenseRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(expenseService, times(1)).updateExpense(eq(1L), any(ExpenseRequest.class));
    }

    @Test
    void testDeleteExpense() {
        doNothing().when(expenseService).deleteExpense(1L);

        ResponseEntity<Void> response = expenseController.deleteExpense(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(expenseService, times(1)).deleteExpense(1L);
    }
}
