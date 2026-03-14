package com.ggu.student.service;

import com.ggu.student.model.Student;
import com.ggu.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student saveStudent(Student student) {
        if (studentRepository.existsByPinNumber(student.getPinNumber())) {
            throw new RuntimeException("PIN number already registered.");
        }
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Email already registered.");
        }
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}