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
            s.Id, s.Title, s.Description, s.BasePrice, CategoryName = s.Category.Name, s.CategoryId, s.ImageUrl
        }));
    }
    
    [HttpGet("{id}")] public async Task<IActionResult> GetById(Guid id) {
        var s = await _db.Services.Include(s => s.Category).FirstOrDefaultAsync(x => x.Id == id);
        if (s == null) return NotFound();
        return Ok(new {
            s.Id, s.Title, s.Description, s.BasePrice, CategoryName = s.Category.Name, s.CategoryId, s.ImageUrl
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
public class PaymentsController : ControllerBase {
    private readonly ApplicationDbContext _db; public PaymentsController(ApplicationDbContext db) { _db = db; }
    [HttpPost("{orderId}")] public async Task<IActionResult> Process(Guid orderId, [FromBody] decimal amount) {
        _db.Payments.Add(new Payment { OrderId = orderId, Amount = amount, Status = "Completed", TransactionId = Guid.NewGuid().ToString() });
        var order = await _db.Orders.FindAsync(orderId);
        if(order != null) { order.Status = "Pending"; } // paid
        await _db.SaveChangesAsync();
        return Ok(new { success = true });
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ChatController : ControllerBase {
    private readonly ApplicationDbContext _db; public ChatController(ApplicationDbContext db) { _db = db; }
    [HttpGet("Order/{orderId}")] public async Task<IActionResult> GetOrderChat(Guid orderId) {
        var chat = await _db.Chats.Include(c => c.Messages).ThenInclude(m => m.Sender).FirstOrDefaultAsync(c => c.OrderId == orderId);
        if (chat == null) return NotFound();
        return Ok(new {
            chat.Id,
            Messages = chat.Messages.OrderBy(m => m.SentAt).Select(m => new {
                m.Id, m.Content, m.SentAt, m.SenderId, SenderName = m.Sender.FullName
            })
        });
    }

    [HttpPost("{chatId}/Message")] public async Task<IActionResult> SendMessage(Guid chatId, [FromBody] string content) {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(userIdStr == null) return Unauthorized();
        var msg = new Message { ChatId = chatId, SenderId = Guid.Parse(userIdStr), Content = content, SentAt = DateTime.UtcNow };
        _db.Messages.Add(msg);
        await _db.SaveChangesAsync();
        return Ok(msg);
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TicketController : ControllerBase {
    private readonly ApplicationDbContext _db; public TicketController(ApplicationDbContext db) { _db = db; }
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
                m.Id, m.Content, m.SentAt, m.SenderId, SenderName = m.Sender.FullName
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
