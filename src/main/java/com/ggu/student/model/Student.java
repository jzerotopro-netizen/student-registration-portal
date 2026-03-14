package com.ggu.student.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Full name is required")
    @Column(nullable = false)
    private String fullName;

    @NotBlank(message = "PIN number is required")
    @Column(nullable = false, unique = true)
    private String pinNumber;

    @NotBlank(message = "Department is required")
    @Column(nullable = false)
    private String department;

    @Min(1) @Max(4)
    @Column(nullable = false)
    private int year;

    @Min(1) @Max(8)
    @Column(nullable = false)
    private int semester;

    @NotBlank(message = "Section is required")
    @Column(nullable = false)
    private String section;

    @Email(message = "Valid email is required")
    @NotBlank(message = "Email is required")
    @Column(nullable = false, unique = true)
    private String email;

    @Column(columnDefinition = "TEXT")
    private String skills;

    // ---- Constructors ----
    public Student() {}

    // ---- Getters & Setters ----
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPinNumber() { return pinNumber; }
    public void setPinNumber(String pinNumber) { this.pinNumber = pinNumber; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public int getSemester() { return semester; }
    public void setSemester(int semester) { this.semester = semester; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }
}