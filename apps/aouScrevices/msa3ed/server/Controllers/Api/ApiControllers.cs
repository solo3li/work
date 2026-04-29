using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Uis.Server.DTOs;
using Uis.Server.Models;
using Uis.Server.Services;
using Uis.Server.Data;
using System.Security.Claims;

namespace Uis.Server.Controllers.Api;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth; private readonly IOtpService _otp;
    private readonly ApplicationDbContext _db;
    public AuthController(IAuthService auth, IOtpService otp, ApplicationDbContext db) { _auth = auth; _otp = otp; _db = db; }

    [HttpPost("login")] public async Task<IActionResult> Login(LoginDto dto) {
        var token = await _auth.LoginAsync(dto);
        if (token == null) return Unauthorized();
        await _otp.GenerateOtpAsync(dto.Email);
        return Ok(new { Token = token, Message = "OTP sent." });
    }

    [HttpPost("register")] public async Task<IActionResult> Register(RegisterDto dto) {
        var success = await _auth.RegisterAsync(dto);
        if (!success) return BadRequest("Registration failed.");
        return Ok("User registered.");
    }

    [HttpPost("verify-otp")] public async Task<IActionResult> VerifyOtp(OtpVerifyDto dto) {
        var success = await _otp.VerifyOtpAsync(dto.Email, dto.Code);
        if (!success) return BadRequest("Invalid or expired OTP.");
        
        var user = await _db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Email == dto.Email);
        return Ok(new {
            Id = user?.Id,
            Name = user?.FullName,
            Email = user?.Email,
            IsExecutor = user?.IsExecutor,
            Roles = user?.Roles.Select(r => r.Name)
        });
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] string email)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) return NotFound("User not found.");

        await _otp.GenerateOtpAsync(email);
        return Ok(new { Message = "OTP sent to your email." });
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
    {
        var success = await _otp.VerifyOtpAsync(request.Email, request.Code);
        if (!success) return BadRequest("Invalid or expired OTP.");

        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null) return NotFound("User not found.");

        user.PasswordHash = request.NewPassword;
        await _db.SaveChangesAsync();

        return Ok(new { Message = "Password reset successfully." });
    }
}

public class ResetPasswordRequest
{
    public string Email { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController : ControllerBase {
    private readonly ApplicationDbContext _db; public UsersController(ApplicationDbContext db) { _db = db; }
    
    [HttpGet("Me")] public async Task<IActionResult> GetMe() {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(userIdStr == null) return Unauthorized();
        var user = await _db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == Guid.Parse(userIdStr));
        if(user == null) return NotFound();
        return Ok(new {
            user.Id,
            user.FullName,
            user.Email,
            user.IsExecutor,
            user.IsAdmin,
            user.Rating,
            user.CompletedOrdersCount,
            user.ProfilePicture,
            user.University,
            user.Major,
            user.Bio,
            Roles = user.Roles.Select(r => r.Name)
        });
    }
}

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase {
    private readonly ApplicationDbContext _db; public ServicesController(ApplicationDbContext db) { _db = db; }
    [HttpGet] public async Task<IActionResult> GetAll() {
        var services = await _db.Services.Include(s => s.Category).Where(s => s.IsActive).ToListAsync();
        return Ok(services.Select(s => new {
            s.Id, s.Title, s.Description, s.BasePrice, CategoryName = s.Category.Name, s.CategoryId, s.ImageUrl,
            s.Rating, s.ReviewsCount, s.DeliveryTime
        }));
    }
    
    [HttpGet("{id}")] public async Task<IActionResult> GetById(Guid id) {
        var s = await _db.Services.Include(s => s.Category).FirstOrDefaultAsync(x => x.Id == id);
        if (s == null) return NotFound();
        return Ok(new {
            s.Id, s.Title, s.Description, s.BasePrice, CategoryName = s.Category.Name, s.CategoryId, s.ImageUrl,
            s.Rating, s.ReviewsCount, s.DeliveryTime
        });
    }
}

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase {
    private readonly ApplicationDbContext _db; public CategoriesController(ApplicationDbContext db) { _db = db; }
    [HttpGet] public async Task<IActionResult> GetAll() => Ok(await _db.Categories.ToListAsync());
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController : ControllerBase {
    private readonly ApplicationDbContext _db; 
    public OrdersController(ApplicationDbContext db) { _db = db; }

    [HttpGet] public async Task<IActionResult> GetMyOrders() {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(userIdStr == null) return Unauthorized();
        var uid = Guid.Parse(userIdStr);
        var orders = await _db.Orders.Include(o => o.Service).Where(o => o.StudentId == uid || o.ExecutorId == uid)
            .OrderByDescending(o => o.CreatedAt).ToListAsync();
        return Ok(orders.Select(o => new {
            o.Id, o.Status, o.Price, o.CreatedAt, ServiceTitle = o.Service.Title, o.ServiceId, o.StudentId, o.ExecutorId
        }));
    }

    [HttpGet("Available")] public async Task<IActionResult> GetAvailableOrders() {
        var orders = await _db.Orders.Include(o => o.Service).Include(o => o.Student)
            .Where(o => o.Status == "Pending").OrderByDescending(o => o.CreatedAt).ToListAsync();
        return Ok(orders.Select(o => new {
            o.Id, o.Status, o.Price, o.CreatedAt, ServiceTitle = o.Service.Title, StudentName = o.Student.FullName
        }));
    }

    [HttpGet("{id}")] public async Task<IActionResult> GetById(Guid id) {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(userIdStr == null) return Unauthorized();
        var uid = Guid.Parse(userIdStr);
        var o = await _db.Orders.Include(x => x.Service).FirstOrDefaultAsync(x => x.Id == id && (x.StudentId == uid || x.ExecutorId == uid));
        if (o == null) return NotFound();
        return Ok(new {
            o.Id, o.Status, o.Price, o.CreatedAt, ServiceTitle = o.Service.Title, o.ServiceId, o.StudentId, o.ExecutorId
        });
    }

    [HttpPost] public async Task<IActionResult> Create(CreateOrderDto dto) {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(userIdStr == null) return Unauthorized();
        var order = new Order { StudentId = Guid.Parse(userIdStr), ServiceId = dto.ServiceId, Price = dto.Price };
        _db.Orders.Add(order);
        await _db.SaveChangesAsync();
        return Ok(order);
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PaymentsController : ControllerBase {
    private readonly ApplicationDbContext _db; public PaymentsController(ApplicationDbContext db) { _db = db; }
    
    [HttpPost("{orderId}")] public async Task<IActionResult> Process(Guid orderId, [FromBody] decimal amount) {
        _db.Payments.Add(new Payment { OrderId = orderId, Amount = amount, Status = "Completed", TransactionId = Guid.NewGuid().ToString() });
        var order = await _db.Orders.FindAsync(orderId);
        if(order != null) { order.Status = "Pending"; } // paid
        await _db.SaveChangesAsync();
        return Ok(new { success = true });
    }

    [HttpGet("Earnings")]
    public async Task<IActionResult> GetMyEarnings()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(userIdStr == null) return Unauthorized();
        var uid = Guid.Parse(userIdStr);

        var earnings = await _db.Payments
            .Include(p => p.Order)
            .Where(p => p.Order.ExecutorId == uid && p.Status == "Completed")
            .OrderByDescending(p => p.Id)
            .ToListAsync();

        var total = earnings.Sum(e => e.Amount);
        
        return Ok(new {
            Total = total,
            Transactions = earnings.Select(e => new {
                e.Id,
                e.Amount,
                e.Order.ServiceId,
                Title = "إتمام طلب #" + e.OrderId.ToString().Substring(0, 8),
                Date = e.Order.CreatedAt,
                Type = "in"
            })
        });
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ChatController : ControllerBase {
    private readonly ApplicationDbContext _db; 
    private readonly IFileService _fileService;
    public ChatController(ApplicationDbContext db, IFileService fileService) { _db = db; _fileService = fileService; }
    
    [HttpGet("Order/{orderId}")] public async Task<IActionResult> GetOrderChat(Guid orderId) {
        var chat = await _db.Chats.Include(c => c.Messages).ThenInclude(m => m.Sender).FirstOrDefaultAsync(c => c.OrderId == orderId);
        if (chat == null) return NotFound();
        return Ok(new {
            chat.Id,
            Messages = chat.Messages.OrderBy(m => m.SentAt).Select(m => new {
                m.Id, m.Content, m.SentAt, m.SenderId, SenderName = m.Sender.FullName, m.AttachmentUrl, m.AttachmentType
            })
        });
    }

    [HttpGet("Private/{userId}")] public async Task<IActionResult> GetPrivateChat(Guid userId) {
        var myIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(myIdStr == null) return Unauthorized();
        var myId = Guid.Parse(myIdStr);

        var chat = await _db.Chats.Include(c => c.Messages).ThenInclude(m => m.Sender)
            .FirstOrDefaultAsync(c => c.OrderId == null && 
            ((c.StudentId == myId && c.ExecutorId == userId) || (c.StudentId == userId && c.ExecutorId == myId)));
        
        if (chat == null) {
            chat = new Chat { StudentId = myId, ExecutorId = userId };
            _db.Chats.Add(chat);
            await _db.SaveChangesAsync();
        }

        return Ok(new {
            chat.Id,
            Messages = chat.Messages.OrderBy(m => m.SentAt).Select(m => new {
                m.Id, m.Content, m.SentAt, m.SenderId, SenderName = m.Sender.FullName, m.AttachmentUrl, m.AttachmentType
            })
        });
    }

    [HttpPost("{chatId}/Message")] public async Task<IActionResult> SendMessage(Guid chatId, [FromForm] string? content, IFormFile? attachment, [FromForm] string? attachmentType) {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(userIdStr == null) return Unauthorized();
        
        var msg = new Message { ChatId = chatId, SenderId = Guid.Parse(userIdStr), Content = content ?? "", SentAt = DateTime.UtcNow };

        if (attachment != null && attachment.Length > 0)
        {
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(attachment.FileName);
            msg.AttachmentUrl = await _fileService.UploadFileAsync(attachment.OpenReadStream(), fileName);
            msg.AttachmentType = attachmentType ?? "file";
        }

        _db.Messages.Add(msg);
        await _db.SaveChangesAsync();
        return Ok(msg);
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TicketController : ControllerBase {
    private readonly ApplicationDbContext _db; 
    private readonly IFileService _fileService;
    public TicketController(ApplicationDbContext db, IFileService fileService) { _db = db; _fileService = fileService; }
    
    [HttpGet] public async Task<IActionResult> GetMyTickets() {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(userIdStr == null) return Unauthorized();
        var uid = Guid.Parse(userIdStr);
        var tickets = await _db.Tickets.Where(t => t.UserId == uid).OrderByDescending(t => t.Id).ToListAsync();
        return Ok(tickets.Select(t => new { t.Id, t.Subject, t.Status }));
    }

    [HttpGet("{id}")] public async Task<IActionResult> GetById(Guid id) {
        var ticket = await _db.Tickets.Include(t => t.Messages).ThenInclude(m => m.Sender).FirstOrDefaultAsync(t => t.Id == id);
        if (ticket == null) return NotFound();
        return Ok(new {
            ticket.Id, ticket.Subject, ticket.Status,
            Messages = ticket.Messages.OrderBy(m => m.SentAt).Select(m => new {
                m.Id, m.Content, m.SentAt, m.SenderId, SenderName = m.Sender.FullName, m.AttachmentUrl, m.AttachmentType
            })
        });
    }

    [HttpPost] public async Task<IActionResult> Create([FromBody] string subject) {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(userIdStr == null) return Unauthorized();
        var ticket = new Ticket { UserId = Guid.Parse(userIdStr), Subject = subject };
        _db.Tickets.Add(ticket); await _db.SaveChangesAsync();
        return Ok(ticket);
    }

    [HttpPost("{id}/Reply")] public async Task<IActionResult> Reply(Guid id, [FromForm] string? content, IFormFile? attachment, [FromForm] string? attachmentType) {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(userIdStr == null) return Unauthorized();

        var msg = new TicketMessage { TicketId = id, SenderId = Guid.Parse(userIdStr), Content = content ?? "", SentAt = DateTime.UtcNow };

        if (attachment != null && attachment.Length > 0)
        {
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(attachment.FileName);
            msg.AttachmentUrl = await _fileService.UploadFileAsync(attachment.OpenReadStream(), fileName);
            msg.AttachmentType = attachmentType ?? "file";
        }

        _db.TicketMessages.Add(msg);
        await _db.SaveChangesAsync();
        return Ok(msg);
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class KycController : ControllerBase {
    private readonly ApplicationDbContext _db; public KycController(ApplicationDbContext db) { _db = db; }
    [HttpGet("Status")] public async Task<IActionResult> GetStatus() {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(userIdStr == null) return Unauthorized();
        var uid = Guid.Parse(userIdStr);
        var kyc = await _db.KycRequests.OrderByDescending(k => k.Id).FirstOrDefaultAsync(k => k.UserId == uid);
        return Ok(new { Status = kyc?.Status, RejectionReason = kyc?.RejectionReason });
    }

    [HttpPost] public async Task<IActionResult> Submit(KycSubmitDto dto) {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(userIdStr == null) return Unauthorized();
        var uid = Guid.Parse(userIdStr);
        _db.KycRequests.Add(new KycRequest { UserId = uid, NationalId = dto.NationalId, Phone = dto.Phone, Status = "Pending" });
        await _db.SaveChangesAsync();
        return Ok(new { success = true });
    }
}
