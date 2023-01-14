package amazon.app.backend;

import java.time.LocalDateTime;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import amazon.app.backend.Exception.BadResultException;
import amazon.app.backend.Exception.EntityExistingException;
import amazon.app.backend.Exception.EntityNotFoundException;
import amazon.app.backend.Exception.ErrorResponse;

@ControllerAdvice
public class HandlingAppException  {
    
    @ExceptionHandler({EntityNotFoundException.class, BadResultException.class,  EntityExistingException.class})
    public ResponseEntity<Object> handlingEntityException(RuntimeException ex) {
        ErrorResponse err = new ErrorResponse(ex.getMessage(), ex, LocalDateTime.now());
        return new ResponseEntity<Object>(err, HttpStatus.BAD_REQUEST);
        
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handlingArgumentException(MethodArgumentNotValidException ex) {
        ErrorResponse err = new ErrorResponse(ex.getMessage(), ex, LocalDateTime.now());
        return new ResponseEntity<Object>(err, HttpStatus.BAD_REQUEST);
        
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handlingDataIntegrityException(DataIntegrityViolationException ex) {
        ErrorResponse err = new ErrorResponse(ex.getMessage(), ex, LocalDateTime.now());
        return new ResponseEntity<Object>(err, HttpStatus.BAD_REQUEST);
        
    }
    @ExceptionHandler(EmptyResultDataAccessException.class)
    public ResponseEntity<Object> handlingEntityException(EmptyResultDataAccessException ex) {
        ErrorResponse err = new ErrorResponse(ex.getMessage(), ex, LocalDateTime.now());
        return new ResponseEntity<Object>(err, HttpStatus.BAD_REQUEST);
        
    }
    
}
