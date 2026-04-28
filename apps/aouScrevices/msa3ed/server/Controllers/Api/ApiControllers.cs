using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Uis.Server.DTOs;
using Uis.Server.Services;
using System.Security.Claims;

namespace Uis.Server.Controllers.Api;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth; private readonly IOtpService _otp;
    public AuthController(IAuthService auth, IOtpService otp) { _auth = auth; _otp = otp; }

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
        return Ok("OTP verified.");
    }
}

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase {
    private readonly IUserService _svc; public UsersController(IUserService svc) { _svc = svc; }
    [HttpGet] public async Task<IActionResult> GetAll() => Ok(await _svc.GetAllUsersAsync());
}

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase {
    private readonly ICatalogService _svc; public ServicesController(ICatalogService svc) { _svc = svc; }
    [HttpGet] public async Task<IActionResult> GetAll() => Ok(await _svc.GetServicesAsync());
}

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase {
    private readonly ICatalogService _svc; public CategoriesController(ICatalogService svc) { _svc = svc; }
    [HttpGet] public async Task<IActionResult> GetAll() => Ok(await _svc.GetCategoriesAsync());
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController : ControllerBase {
    private readonly IOrderService _svc; public OrdersController(IOrderService svc) { _svc = svc; }
    [HttpGet] public async Task<IActionResult> GetAll() => Ok(await _svc.GetOrdersAsync());
    [HttpPost] public async Task<IActionResult> Create(CreateOrderDto dto) {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(userIdStr == null) return Unauthorized();
        var order = await _svc.CreateOrderAsync(Guid.Parse(userIdStr), dto);
        return Ok(order);
    }
}

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase {
    private readonly IPaymentService _svc; public PaymentsController(IPaymentService svc) { _svc = svc; }
    [HttpPost("{orderId}")] public async Task<IActionResult> Process(Guid orderId, [FromBody] decimal amount) => Ok(await _svc.ProcessPaymentAsync(orderId, amount));
}

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase {
    private readonly IChatService _svc; public ChatController(IChatService svc) { _svc = svc; }
    [HttpPost("{orderId}")] public async Task<IActionResult> Create(Guid orderId) => Ok(await _svc.CreateChatAsync(orderId));
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TicketController : ControllerBase {
    private readonly ITicketService _svc; public TicketController(ITicketService svc) { _svc = svc; }
    [HttpPost] public async Task<IActionResult> Create([FromBody] string subject) {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(userIdStr == null) return Unauthorized();
        return Ok(await _svc.CreateTicketAsync(Guid.Parse(userIdStr), subject));
    }
}

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class KycController : ControllerBase {
    private readonly IKycService _svc; public KycController(IKycService svc) { _svc = svc; }
    [HttpGet] public async Task<IActionResult> GetPending() => Ok(await _svc.GetPendingRequestsAsync());
    [HttpPost] public async Task<IActionResult> Submit(KycSubmitDto dto) {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(userIdStr == null) return Unauthorized();
        return Ok(await _svc.SubmitKycAsync(Guid.Parse(userIdStr), dto.NationalId, dto.Phone));
    }
}