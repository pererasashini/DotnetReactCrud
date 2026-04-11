using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class PersonDto
{
    public int Id { get; set; }

    [Required]
    [MaxLength(30)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [MaxLength(30)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(100)]
    public string? EmailAddress { get; set; }

    [Required]
    public DateTime? DateOfBirth { get; set; }

    [Required]
    [Range(0, double.MaxValue)]
    public decimal? Salary { get; set; }

    [Required]
    [MaxLength(50)]
    public string? Department { get; set; }
}