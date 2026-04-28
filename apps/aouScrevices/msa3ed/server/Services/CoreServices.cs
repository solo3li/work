using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Uis.Server.Data;
using Uis.Server.Models;
using Uis.Server.DTOs;

namespace Uis.Server.Services;

public interface IAuthService { Task<string?> LoginAsync(LoginDto dto); Task<bool> RegisterAsync(RegisterDto dto); }
public class AuthService : IAuthService {
    private readonly ApplicationDbContext _db; private readonly IJwtService _jwt; private readonly IOtpService _otp;
    public AuthService(ApplicationDbContext db, IJwtService jwt, IOtpService otp) { _db = db; _jwt = jwt; _otp = otp; }
    public async Task<string?> LoginAsync(LoginDto dto) {
        var user = await _db.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null || user.PasswordHash != dto.Password) return null;
        return _jwt.GenerateToken(user);
    }
    public async Task<bool> RegisterAsync(RegisterDto dto) {
        if (await _db.Users.AnyAsync(u => u.Email == dto.Email)) return false;
        var role = await _db.Roles.FirstOrDefaultAsync(r => r.Name == dto.Role);
        if (role == null) {
            role = new Role { Name = dto.Role };
            _db.Roles.Add(role);
        }
        var user = new User { Email = dto.Email, FullName = dto.FullName, PasswordHash = dto.Password, Role = role };
        _db.Users.Add(user); await _db.SaveChangesAsync(); return true;
    }
}

public interface IOtpService { Task<string> GenerateOtpAsync(string email); Task<bool> VerifyOtpAsync(string email, string code); }
public class OtpService : IOtpService {
    private readonly ApplicationDbContext _db; public OtpService(ApplicationDbContext db) { _db = db; }
    public async Task<string> GenerateOtpAsync(string email) {
        var otp = new EmailOtp { Email = email, Code = "1234", ExpiryDate = DateTime.UtcNow.AddMinutes(10) };
        _db.EmailOtps.Add(otp); await _db.SaveChangesAsync(); return otp.Code;
    }
    public async Task<bool> VerifyOtpAsync(string email, string code) {
        var otp = await _db.EmailOtps.FirstOrDefaultAsync(o => o.Email == email && o.Code == code && !o.IsUsed && o.ExpiryDate > DateTime.UtcNow);
        if (otp == null) return false;
        otp.IsUsed = true; await _db.SaveChangesAsync(); return true;
    }
}

public interface IJwtService { string GenerateToken(User user); }
public class JwtService : IJwtService {
    private readonly IConfiguration _config; public JwtService(IConfiguration config) { _config = config; }
    public string GenerateToken(User user) {
        var claims = new[] { new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), new Claim(ClaimTypes.Email, user.Email), new Claim(ClaimTypes.Role, user.Role?.Name ?? "Student") };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Secret"] ?? "default_secret_key_default_secret_key_default_secret_key"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(issuer: _config["JwtSettings:Issuer"], audience: _config["JwtSettings:Audience"], claims: claims, expires: DateTime.UtcNow.AddDays(7), signingCredentials: creds);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public interface IUserService { Task<User?> GetUserByIdAsync(Guid id); Task<IEnumerable<User>> GetAllUsersAsync(); }
public class UserService : IUserService {
    private readonly ApplicationDbContext _db; public UserService(ApplicationDbContext db) { _db = db; }
    public async Task<User?> GetUserByIdAsync(Guid id) => await _db.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Id == id);
    public async Task<IEnumerable<User>> GetAllUsersAsync() => await _db.Users.Include(u => u.Role).ToListAsync();
}