using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TechnicalTest.Data;
using TechnicalTest.Models;
using TechnicalTest.Models.DTO;


namespace TechnicalTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(AppDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            var user = _context.Users.SingleOrDefault(x => x.Username == loginDto.Username && x.PasswordHash == loginDto.Password);

            if (user == null)
            {
                return Unauthorized("Username atau password salah.");
            }

            var token = _jwtService.GenerateToken(user.Username);

            return Ok(new JwtTokenResponse
            {
                Token = token,
                Expiration = DateTime.Now.AddMinutes(30)
            });

        }
    }
}

