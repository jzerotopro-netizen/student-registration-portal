package com.ggu.student.controller;

import com.ggu.student.model.Student;
import com.ggu.student.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")  // Allow frontend to connect
public class StudentController {

    @Autowired
    private StudentService studentService;

    // GET all students (admin dashboard)
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // POST - register new student
    @PostMapping
    public ResponseEntity<?> registerStudent(@Valid @RequestBody Student student) {
        try {
            Student saved = studentService.saveStudent(student);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // DELETE - remove student
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok(Map.of("message", "Student deleted successfully."));
    }
}