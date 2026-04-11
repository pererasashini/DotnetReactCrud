using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        //POST  /api/people
        private readonly AppDbContext _context;
        public PeopleController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost] //POST  /api/people
        public async Task<IActionResult> AddPerson(PersonDto personDto)
        {
            try
            {
                var person = new Person
                {
                    FirstName = personDto.FirstName,
                    LastName = personDto.LastName,
                    EmailAddress = personDto.EmailAddress,
                    DateOfBirth = personDto.DateOfBirth,
                    Salary = personDto.Salary ?? 0,
                    Department = personDto.Department
                };

                _context.People.Add(person);
                await _context.SaveChangesAsync();
                return CreatedAtRoute("GetPerson", new { id = person.Id }, person);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpGet] //GET   /api/people
        public async Task<IActionResult> GetPeople()
        {
            try
            {
                var people = await _context.People.ToListAsync();
                return Ok(people); //200 Ok status code + person object in the body 
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.
                Message);
                //500 internal server error 
            }

        }

        [HttpGet("{id:int}", Name = "GetPerson")] //GET   /api/people/1
        public async Task<IActionResult> GetPerson(int id)
        {
            try
            {
                var person = await _context.People.FindAsync(id);
                if (person is null)
                {
                    return NotFound();//404 not found status code 
                }
                return Ok(person); //200 Ok status code + person object in the body 
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.
                Message);
                //500 internal server error 
            }

        }

        [HttpPut("{id:int}")] //PUT  /api/people/1
        public async Task<IActionResult> UpdatePerson(int id, [FromBody] Person person)
        {
            try
            {
                if (id != person.Id)
                {
                    return BadRequest("Id in url and body mismatches");
                }

                var existingPerson = await _context.People.FindAsync(id);
                if (existingPerson is null)
                {
                    return NotFound();
                }

                // Update all fields
                existingPerson.FirstName = person.FirstName;
                existingPerson.LastName = person.LastName;
                existingPerson.EmailAddress = person.EmailAddress;
                existingPerson.DateOfBirth = person.DateOfBirth;
                existingPerson.Salary = person.Salary;
                existingPerson.Department = person.Department;

                await _context.SaveChangesAsync();

                // Return the updated person with calculated age
                return Ok(existingPerson); // Return 200 with the updated person
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpDelete("{id:int}")] //Delete  /api/people/1
        public async Task<IActionResult> DeletePerson(int id)
        {
            try
            {

                var person = await _context.People.FindAsync(id);
                if (person is null)
                {
                    return NotFound();//404 not found status code 
                }
                _context.People.Remove(person);
                await _context.SaveChangesAsync();
                return NoContent(); //204 status code 
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.
                Message);
                //500 internal server error 
            }

        }

    }
}
