using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Uis.Server.Data;
using Uis.Server.Models;

namespace Uis.Server.Controllers;

[Route("[controller]")]
public class AdminController : Controller
{
    private readonly ApplicationDbContext _db;

    public AdminController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpGet("")]
    [HttpGet("Index")]
    public async Task<IActionResult> Index()
    {
        var stats = new
        {
            TotalUsers = await _db.Users.CountAsync(),
            TotalOrders = await _db.Orders.CountAsync(),
            PendingKyc = await _db.KycRequests.CountAsync(k => k.Status == "Pending"),
            OpenTickets = await _db.Tickets.CountAsync(t => t.Status == "Open"),
            TotalRevenue = await _db.Payments.Where(p => p.Status == "Completed").SumAsync(p => p.Amount)
        };

        ViewBag.Stats = stats;
        
        // Recent Orders for dashboard
        var recentOrders = await _db.Orders.Include(o => o.Student).Include(o => o.Service).OrderByDescending(o => o.CreatedAt).Take(5).ToListAsync();
        ViewBag.RecentOrders = recentOrders;

        return View();
    }

    // --- User Management ---
    [HttpGet("Users")]
    public async Task<IActionResult> Users(string? search, string? role)
    {
        var query = _db.Users.Include(u => u.Role).AsQueryable();

        if (!string.IsNullOrEmpty(search))
            query = query.Where(u => u.FullName.Contains(search) || u.Email.Contains(search));

        if (!string.IsNullOrEmpty(role))
            query = query.Where(u => u.Role.Name == role);

        var users = await query.OrderByDescending(u => u.CreatedAt).ToListAsync();
        ViewBag.Search = search;
        ViewBag.Role = role;
        return View(users);
    }

    [HttpPost("Users/ToggleStatus/{id}")]
    public async Task<IActionResult> ToggleUserStatus(Guid id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user != null)
        {
            user.IsActive = !user.IsActive;
            await _db.SaveChangesAsync();
        }
        return RedirectToAction(nameof(Users));
    }

    [HttpGet("Users/{id}")]
    public async Task<IActionResult> UserDetails(Guid id)
    {
        var user = await _db.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user == null) return NotFound();

        // Get user activity summary
        ViewBag.OrdersCount = await _db.Orders.CountAsync(o => o.StudentId == id || o.ExecutorId == id);
        ViewBag.RecentOrders = await _db.Orders
            .Where(o => o.StudentId == id || o.ExecutorId == id)
            .Include(o => o.Service)
            .OrderByDescending(o => o.CreatedAt)
            .Take(5)
            .ToListAsync();
        
        ViewBag.KycRequest = await _db.KycRequests.FirstOrDefaultAsync(k => k.UserId == id);

        return View(user);
    }

    // --- KYC Management ---
    [HttpGet("Kyc")]
    public async Task<IActionResult> Kyc()
    {
        var requests = await _db.KycRequests.Include(k => k.User).OrderByDescending(k => k.Status == "Pending").ToListAsync();
        return View(requests);
    }

    [HttpGet("Kyc/{id}")]
    public async Task<IActionResult> KycDetails(Guid id)
    {
        var request = await _db.KycRequests
            .Include(k => k.User)
            .FirstOrDefaultAsync(k => k.Id == id);

        if (request == null) return NotFound();

        return View(request);
    }

    [HttpPost("Kyc/Approve/{id}")]
    public async Task<IActionResult> ApproveKyc(Guid id)
    {
        var request = await _db.KycRequests.FindAsync(id);
        if (request != null)
        {
            request.Status = "Approved";
            await _db.SaveChangesAsync();
        }
        return RedirectToAction(nameof(Kyc));
    }

    [HttpPost("Kyc/Reject/{id}")]
    public async Task<IActionResult> RejectKyc(Guid id, string reason)
    {
        var request = await _db.KycRequests.FindAsync(id);
        if (request != null)
        {
            request.Status = "Rejected";
            request.RejectionReason = reason;
            await _db.SaveChangesAsync();
        }
        return RedirectToAction(nameof(Kyc));
    }

    // --- Category Management ---
    [HttpGet("Categories")]
    public async Task<IActionResult> Categories()
    {
        var categories = await _db.Categories.ToListAsync();
        return View(categories);
    }

    [HttpPost("Categories/Create")]
    public async Task<IActionResult> CreateCategory(string name)
    {
        if (!string.IsNullOrEmpty(name))
        {
            _db.Categories.Add(new Category { Name = name });
            await _db.SaveChangesAsync();
        }
        return RedirectToAction(nameof(Categories));
    }

    [HttpPost("Categories/Delete/{id}")]
    public async Task<IActionResult> DeleteCategory(Guid id)
    {
        var cat = await _db.Categories.FindAsync(id);
        if (cat != null)
        {
            _db.Categories.Remove(cat);
            await _db.SaveChangesAsync();
        }
        return RedirectToAction(nameof(Categories));
    }

    // --- Service Management ---
    [HttpGet("Services")]
    public async Task<IActionResult> Services()
    {
        ViewBag.Categories = await _db.Categories.ToListAsync();
        var services = await _db.Services.Include(s => s.Category).ToListAsync();
        return View(services);
    }

    [HttpPost("Services/Create")]
    public async Task<IActionResult> CreateService(Service service)
    {
        _db.Services.Add(service);
        await _db.SaveChangesAsync();
        return RedirectToAction(nameof(Services));
    }

    [HttpPost("Services/ToggleStatus/{id}")]
    public async Task<IActionResult> ToggleServiceStatus(Guid id)
    {
        var service = await _db.Services.FindAsync(id);
        if (service != null)
        {
            service.IsActive = !service.IsActive;
            await _db.SaveChangesAsync();
        }
        return RedirectToAction(nameof(Services));
    }

    // --- Order Management ---
    [HttpGet("Orders")]
    public async Task<IActionResult> Orders(string? search, string? status)
    {
        var query = _db.Orders.Include(o => o.Student).Include(o => o.Service).AsQueryable();

        if (!string.IsNullOrEmpty(search))
            query = query.Where(o => o.Id.ToString().Contains(search) || o.Student.FullName.Contains(search));

        if (!string.IsNullOrEmpty(status))
            query = query.Where(o => o.Status == status);

        var orders = await query.OrderByDescending(o => o.CreatedAt).ToListAsync();
        ViewBag.Search = search;
        ViewBag.Status = status;
        return View(orders);
    }

    [HttpPost("Orders/UpdateStatus/{id}")]
    public async Task<IActionResult> UpdateOrderStatus(Guid id, string status)
    {
        var order = await _db.Orders.FindAsync(id);
        if (order != null)
        {
            order.Status = status;
            await _db.SaveChangesAsync();
        }
        return RedirectToAction(nameof(Orders));
    }

    [HttpGet("Orders/{id}")]
    public async Task<IActionResult> OrderDetails(Guid id)
    {
        var order = await _db.Orders
            .Include(o => o.Student)
            .Include(o => o.Executor)
            .Include(o => o.Service)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null) return NotFound();

        ViewBag.Payment = await _db.Payments.FirstOrDefaultAsync(p => p.OrderId == id);
        ViewBag.Escrow = await _db.Escrows.FirstOrDefaultAsync(e => e.OrderId == id);
        
        // Load Chat and Messages
        ViewBag.Chat = await _db.Chats
            .Include(c => c.Messages.OrderBy(m => m.SentAt))
            .ThenInclude(m => m.Sender)
            .FirstOrDefaultAsync(c => c.OrderId == id);

        return View(order);
    }

    // --- Ticket Management ---
    [HttpGet("Tickets")]
    public async Task<IActionResult> Tickets(string? search, string? status)
    {
        var query = _db.Tickets.Include(t => t.User).AsQueryable();

        if (!string.IsNullOrEmpty(search))
            query = query.Where(t => t.Subject.Contains(search) || t.User.FullName.Contains(search));

        if (!string.IsNullOrEmpty(status))
            query = query.Where(t => t.Status == status);

        var tickets = await query.OrderByDescending(t => t.Status == "Open").ThenByDescending(t => t.Id).ToListAsync();
        ViewBag.Search = search;
        ViewBag.Status = status;
        return View(tickets);
    }

    [HttpGet("Tickets/{id}")]
    public async Task<IActionResult> TicketDetails(Guid id)
    {
        var ticket = await _db.Tickets
            .Include(t => t.User)
            .Include(t => t.Messages.OrderBy(m => m.SentAt))
            .ThenInclude(m => m.Sender)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (ticket == null) return NotFound();

        return View(ticket);
    }

    [HttpPost("Tickets/ReplyApi")]
    public async Task<IActionResult> ReplyToTicketApi([FromBody] ReplyRequest request)
    {
        var admin = await _db.Users.FirstOrDefaultAsync(u => u.Email == "admin@uis.com");
        if (admin == null) return Unauthorized();

        var message = new TicketMessage
        {
            TicketId = request.TicketId,
            SenderId = admin.Id,
            Content = request.Content,
            SentAt = DateTime.UtcNow
        };

        _db.TicketMessages.Add(message);
        await _db.SaveChangesAsync();

        return Json(new { 
            success = true, 
            senderName = "مدير النظام", 
            content = message.Content, 
            time = message.SentAt.ToLocalTime().ToString("HH:mm") 
        });
    }

    public class ReplyRequest
    {
        public Guid TicketId { get; set; }
        public string Content { get; set; } = string.Empty;
    }

    [HttpPost("Tickets/Reply")]
    public async Task<IActionResult> ReplyToTicket(Guid ticketId, string content)
    {
        var admin = await _db.Users.FirstOrDefaultAsync(u => u.Email == "admin@uis.com");
        if (admin == null) return Unauthorized();

        var message = new TicketMessage
        {
            TicketId = ticketId,
            SenderId = admin.Id,
            Content = content,
            SentAt = DateTime.UtcNow
        };

        _db.TicketMessages.Add(message);
        await _db.SaveChangesAsync();

        return RedirectToAction(nameof(TicketDetails), new { id = ticketId });
    }

    [HttpPost("Tickets/Close/{id}")]
    public async Task<IActionResult> CloseTicket(Guid id)
    {
        var ticket = await _db.Tickets.FindAsync(id);
        if (ticket != null)
        {
            ticket.Status = "Closed";
            await _db.SaveChangesAsync();
        }
        return RedirectToAction(nameof(Tickets));
    }

    [HttpPost("Tickets/ResolveDispute")]
    public async Task<IActionResult> ResolveDispute(Guid ticketId, string action)
    {
        var ticket = await _db.Tickets.Include(t => t.User).FirstOrDefaultAsync(t => t.Id == ticketId);
        if (ticket == null || !ticket.OrderId.HasValue) return NotFound();

        var escrow = await _db.Escrows.FirstOrDefaultAsync(e => e.OrderId == ticket.OrderId.Value);
        var order = await _db.Orders.FindAsync(ticket.OrderId.Value);

        if (escrow != null && order != null)
        {
            if (action == "refund")
            {
                escrow.Status = "Refunded";
                order.Status = "Cancelled";
                // In a real app, integrate with Paymob/Wallet Refund here
            }
            else if (action == "release")
            {
                escrow.Status = "Released";
                order.Status = "Completed";
                // In a real app, transfer funds to Executor Wallet here
            }

            ticket.Status = "Closed";
            await _db.SaveChangesAsync();
        }

        return RedirectToAction(nameof(TicketDetails), new { id = ticketId });
    }

    // --- Monitoring & General Chat ---
    [HttpGet("Chats")]
    public async Task<IActionResult> Chats()
    {
        var chats = await _db.Chats
            .Include(c => c.Order)
            .Include(c => c.Student)
            .Include(c => c.Executor)
            .Include(c => c.Messages)
            .OrderByDescending(c => c.Messages.Max(m => m.SentAt))
            .ToListAsync();
        return View(chats);
    }

    [HttpGet("Chats/{id}")]
    public async Task<IActionResult> ChatDetails(Guid id)
    {
        var chat = await _db.Chats
            .Include(c => c.Order)
            .Include(c => c.Student)
            .Include(c => c.Executor)
            .Include(c => c.Messages.OrderBy(m => m.SentAt))
            .ThenInclude(m => m.Sender)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (chat == null) return NotFound();

        return View(chat);
    }

    // --- Payment Management ---
    [HttpGet("Payments")]
    public async Task<IActionResult> Payments()
    {
        var payments = await _db.Payments.Include(p => p.Order).ThenInclude(o => o.Student).OrderByDescending(p => p.Id).ToListAsync();
        return View(payments);
    }

    [HttpGet("Payments/{id}")]
    public async Task<IActionResult> PaymentDetails(Guid id)
    {
        var payment = await _db.Payments
            .Include(p => p.Order)
            .ThenInclude(o => o.Student)
            .Include(p => p.Order)
            .ThenInclude(o => o.Service)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (payment == null) return NotFound();

        ViewBag.Escrow = await _db.Escrows.FirstOrDefaultAsync(e => e.OrderId == payment.OrderId);

        return View(payment);
    }

    [HttpGet("GetDashboardStats")]
    public async Task<IActionResult> GetDashboardStats()
    {
        var last7Days = Enumerable.Range(0, 7).Select(i => DateTime.UtcNow.Date.AddDays(-i)).Reverse();
        
        var orderData = await _db.Orders
            .Where(o => o.CreatedAt >= DateTime.UtcNow.Date.AddDays(-7))
            .GroupBy(o => o.CreatedAt.Date)
            .Select(g => new { Date = g.Key, Count = g.Count() })
            .ToListAsync();

        var labels = last7Days.Select(d => d.ToString("MM-dd")).ToList();
        var data = last7Days.Select(d => orderData.FirstOrDefault(x => x.Date == d)?.Count ?? 0).ToList();

        return Json(new { labels, data });
    }
}
