// Backend/Models/Person.cs
using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Person
{
    public int Id { get; set; }

    [Required]
    [MaxLength(30)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [MaxLength(30)]
    public string LastName { get; set; } = string.Empty;

    [EmailAddress]
    [MaxLength(100)]
    public string EmailAddress { get; set; } = string.Empty;

    public DateTime? DateOfBirth { get; set; }

    public int Age
    {
        get
        {
            if (!DateOfBirth.HasValue) return 0;
            var today = DateTime.Today;
            var age = today.Year - DateOfBirth.Value.Year;
            if (DateOfBirth.Value.Date > today.AddYears(-age)) age--;
            return age;
        }
    }

    [Range(0, double.MaxValue)]
    public decimal Salary { get; set; }

    [MaxLength(50)]
    public string Department { get; set; } = string.Empty;
}