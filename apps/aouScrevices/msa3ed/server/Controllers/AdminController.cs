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
            OpenTickets = await _db.Tickets.CountAsync(t => t.Status == "Open")
        };

        ViewBag.Stats = stats;
        return View();
    }

    [HttpGet("Users")]
    public async Task<IActionResult> Users()
    {
        var users = await _db.Users.Include(u => u.Role).OrderByDescending(u => u.CreatedAt).ToListAsync();
        return View(users);
    }

    [HttpGet("Kyc")]
    public async Task<IActionResult> Kyc()
    {
        var requests = await _db.KycRequests.Include(k => k.User).OrderByDescending(k => k.Status == "Pending").ToListAsync();
        return View(requests);
    }

    [HttpGet("Services")]
    public async Task<IActionResult> Services()
    {
        var services = await _db.Services.Include(s => s.Category).ToListAsync();
        return View(services);
    }

    [HttpGet("Orders")]
    public async Task<IActionResult> Orders()
    {
        var orders = await _db.Orders.Include(o => o.Student).Include(o => o.Service).OrderByDescending(o => o.CreatedAt).ToListAsync();
        return View(orders);
    }

    [HttpGet("Tickets")]
    public async Task<IActionResult> Tickets()
    {
        var tickets = await _db.Tickets.Include(t => t.User).OrderByDescending(t => t.Status == "Open").ToListAsync();
        return View(tickets);
    }
}
