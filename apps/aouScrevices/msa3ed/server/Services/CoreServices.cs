using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Uis.Server.Data;
using Uis.Server.Models;
using Uis.Server.DTOs;

namespace Uis.Server.Services;

public interface IEmailService { Task SendEmailAsync(string to, string subject, string body); Task SendTemplatedEmailAsync(string to, string subject, string title, string message, string? buttonText = null, string? buttonUrl = null); }
public class EmailService : IEmailService {
    private readonly IConfiguration _config;
    public EmailService(IConfiguration config) { _config = config; }
    
    public async Task SendEmailAsync(string to, string subject, string body) {
        var email = new MimeMessage();
        email.From.Add(new MailboxAddress(_config["EmailSettings:SenderName"], _config["EmailSettings:SenderEmail"]));
        email.To.Add(MailboxAddress.Parse(to));
        email.Subject = subject;
        email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = body };

        using var smtp = new SmtpClient();
        await smtp.ConnectAsync(_config["EmailSettings:SmtpServer"], int.Parse(_config["EmailSettings:SmtpPort"]), SecureSocketOptions.StartTls);
        await smtp.AuthenticateAsync(_config["EmailSettings:SenderEmail"], _config["EmailSettings:Password"]);
        await smtp.SendAsync(email);
        await smtp.DisconnectAsync(true);
    }

    public async Task SendTemplatedEmailAsync(string to, string subject, string title, string message, string? buttonText = null, string? buttonUrl = null) {
        var buttonHtml = !string.IsNullOrEmpty(buttonText) && !string.IsNullOrEmpty(buttonUrl) 
            ? $@"<div style='margin-top: 30px;'><a href='{buttonUrl}' style='background: linear-gradient(135deg, #6366F1 0%, #A855F7 100%); color: white; padding: 14px 32px; border-radius: 14px; text-decoration: none; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);'>{buttonText}</a></div>"
            : "";

        var body = $@"
        <div dir='rtl' style='font-family: ""Tajawal"", Tahoma, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px; text-align: center;'>
            <div style='max-width: 550px; margin: 0 auto; background: white; border-radius: 32px; overflow: hidden; box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.05);'>
                <div style='background: linear-gradient(135deg, #6366F1 0%, #A855F7 100%); padding: 50px 20px; color: white;'>
                    <h1 style='margin: 0; font-size: 36px; font-weight: 900; letter-spacing: 3px;'>UIS</h1>
                    <p style='margin: 12px 0 0; opacity: 0.8; font-size: 16px; font-weight: 500;'>بوابتك الذكية للخدمات الجامعية</p>
                </div>
                <div style='padding: 45px 35px;'>
                    <h2 style='color: #1e293b; margin: 0 0 24px; font-size: 24px; font-weight: 800;'>{title}</h2>
                    <div style='color: #64748b; line-height: 1.8; font-size: 16px;'>{message}</div>
                    {buttonHtml}
                </div>
                <div style='background: #f8fafc; padding: 30px; border-top: 1px solid #f1f5f9;'>
                    <p style='color: #94a3b8; font-size: 13px; margin: 0;'>هذا بريد تلقائي من منصة UIS.</p>
                    <div style='margin-top: 15px;'>
                        <a href='#' style='color: #6366F1; text-decoration: none; font-size: 12px; margin: 0 10px;'>مركز الدعم</a>
                        <a href='#' style='color: #6366F1; text-decoration: none; font-size: 12px; margin: 0 10px;'>الشروط والأحكام</a>
                    </div>
                    <p style='color: #cbd5e1; font-size: 11px; margin-top: 20px;'>© 2026 UIS Platform. All rights reserved.</p>
                </div>
            </div>
        </div>";

        await SendEmailAsync(to, subject, body);
    }
}

public interface IAuthService { Task<string?> LoginAsync(LoginDto dto); Task<bool> RegisterAsync(RegisterDto dto); }
public class AuthService : IAuthService {
    private readonly ApplicationDbContext _db; private readonly IJwtService _jwt; private readonly IOtpService _otp;
    public AuthService(ApplicationDbContext db, IJwtService jwt, IOtpService otp) { _db = db; _jwt = jwt; _otp = otp; }
    public async Task<string?> LoginAsync(LoginDto dto) {
        var user = await _db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null || user.PasswordHash != dto.Password) return null;
        return _jwt.GenerateToken(user);
    }
    public async Task<bool> RegisterAsync(RegisterDto dto) {
        if (await _db.Users.AnyAsync(u => u.Email == dto.Email)) return false;

        // Every registered user is a Student by default
        var studentRole = await _db.Roles.FirstOrDefaultAsync(r => r.Name == "Student");
        if (studentRole == null) {
            studentRole = new Role { Name = "Student", IsSystemRole = true };
            _db.Roles.Add(studentRole);
        }

        var user = new User { 
            Email = dto.Email, 
            FullName = dto.FullName, 
            PasswordHash = dto.Password,
            IsAdmin = false,
            IsExecutor = false,
            IsStaff = false
        };

        user.Roles.Add(studentRole);

        _db.Users.Add(user); await _db.SaveChangesAsync(); return true;
    }
}

public interface IOtpService { Task<string> GenerateOtpAsync(string email); Task<bool> VerifyOtpAsync(string email, string code); }
public class OtpService : IOtpService {
    private readonly ApplicationDbContext _db; 
    private readonly IEmailService _emailService;
    public OtpService(ApplicationDbContext db, IEmailService emailService) { _db = db; _emailService = emailService; }
    public async Task<string> GenerateOtpAsync(string email) {
        var code = new Random().Next(1000, 9999).ToString();
        var otp = new EmailOtp { Email = email, Code = code, ExpiryDate = DateTime.UtcNow.AddMinutes(10) };
        _db.EmailOtps.Add(otp); 
        await _db.SaveChangesAsync(); 
        
        var message = $@"
            مرحباً، استخدم الرمز التالي لإتمام عملية تسجيل الدخول إلى حسابك في UIS:
            <div style='margin-top: 30px; background: #f1f5f9; border-radius: 20px; padding: 25px; display: inline-block; border: 2px dashed #6366F1;'>
                <span style='font-size: 42px; font-weight: 900; color: #6366F1; letter-spacing: 12px; font-family: monospace;'>{code}</span>
            </div>
            <p style='margin-top: 25px; font-size: 14px;'>هذا الرمز صالح لمدة 10 دقائق فقط.</p>";

        await _emailService.SendTemplatedEmailAsync(email, "رمز التحقق الخاص بك - UIS", "تحقق من هويتك", message);
        
        return otp.Code;
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
        var claims = new List<Claim> { 
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), 
            new Claim(ClaimTypes.Email, user.Email) 
        };

        // Add all roles to claims
        foreach (var role in user.Roles) {
            claims.Add(new Claim(ClaimTypes.Role, role.Name));
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Secret"] ?? "default_secret_key_default_secret_key_default_secret_key"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(issuer: _config["JwtSettings:Issuer"], audience: _config["JwtSettings:Audience"], claims: claims, expires: DateTime.UtcNow.AddDays(7), signingCredentials: creds);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public interface IUserService { Task<User?> GetUserByIdAsync(Guid id); Task<IEnumerable<User>> GetAllUsersAsync(); }
public class UserService : IUserService {
    private readonly ApplicationDbContext _db; public UserService(ApplicationDbContext db) { _db = db; }
    public async Task<User?> GetUserByIdAsync(Guid id) => await _db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == id);
    public async Task<IEnumerable<User>> GetAllUsersAsync() => await _db.Users.Include(u => u.Roles).ToListAsync();
}