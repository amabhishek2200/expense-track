import com.example.expense.dto.ExpenseRequest;
import com.example.expense.dto.ExpenseResponse;
import com.example.expense.exception.ResourceNotFoundException;
import com.example.expense.model.Expense;
import com.example.expense.repository.ExpenseRepository;
import com.example.expense.service.ExpenseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ExpenseServiceTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @InjectMocks
    private ExpenseService expenseService;

    private Expense expense;
    private ExpenseRequest expenseRequest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        expense = new Expense();
        expense.setId(1L);
        expense.setCategory("Food");
        expense.setDescription("Lunch");
        expense.setAmount(new BigDecimal("25.50"));
        expense.setExpenseDate(LocalDate.now());

        expenseRequest = new ExpenseRequest("Food", "Lunch", new BigDecimal("25.50"), LocalDate.now());
    }

    @Test
    void testCreateExpense() {
        when(expenseRepository.save(any(Expense.class))).thenReturn(expense);

        ExpenseResponse response = expenseService.createExpense(expenseRequest);

        assertNotNull(response);
        assertEquals(expense.getCategory(), response.getCategory());
        assertEquals(expense.getAmount(), response.getAmount());
        verify(expenseRepository, times(1)).save(any(Expense.class));
    }

    @Test
    void testGetExpenseById() {
        when(expenseRepository.findById(1L)).thenReturn(Optional.of(expense));

        ExpenseResponse response = expenseService.getExpenseById(1L);

        assertNotNull(response);
        assertEquals(expense.getId(), response.getId());
        verify(expenseRepository, times(1)).findById(1L);
    }

    @Test
    void testGetExpenseByIdNotFound() {
        when(expenseRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> expenseService.getExpenseById(1L));
    }
}
