using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Uis.Server.Data;
using Uis.Server.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews(); // MVC for Admin panel & APIs

// Configure PostgreSQL Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = Encoding.UTF8.GetBytes(jwtSettings["Secret"] ?? "default_secret_key");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(secretKey)
    };
});

// Configure Services
builder.Services.AddScoped<Uis.Server.Services.IAuthService, Uis.Server.Services.AuthService>();
builder.Services.AddScoped<Uis.Server.Services.IOtpService, Uis.Server.Services.OtpService>();
builder.Services.AddScoped<Uis.Server.Services.IJwtService, Uis.Server.Services.JwtService>();
builder.Services.AddScoped<Uis.Server.Services.IUserService, Uis.Server.Services.UserService>();
builder.Services.AddScoped<Uis.Server.Services.IKycService, Uis.Server.Services.KycService>();
builder.Services.AddScoped<Uis.Server.Services.ICatalogService, Uis.Server.Services.CatalogService>();
builder.Services.AddScoped<Uis.Server.Services.IOrderService, Uis.Server.Services.OrderService>();
builder.Services.AddScoped<Uis.Server.Services.IPaymentService, Uis.Server.Services.PaymentService>();
builder.Services.AddScoped<Uis.Server.Services.IEscrowService, Uis.Server.Services.EscrowService>();
builder.Services.AddScoped<Uis.Server.Services.IChatService, Uis.Server.Services.ChatService>();
builder.Services.AddScoped<Uis.Server.Services.IFileService, Uis.Server.Services.FileService>();
builder.Services.AddScoped<Uis.Server.Services.ITicketService, Uis.Server.Services.TicketService>();
builder.Services.AddScoped<Uis.Server.Services.INotificationService, Uis.Server.Services.NotificationService>();

// Configure SignalR
builder.Services.AddSignalR();

var app = builder.Build();

// Call Database Seeder
await Uis.Server.Data.DbSeeder.SeedAsync(app.Services);

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // For local file storage and static assets

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Map SignalR Hubs
app.MapHub<ChatHub>("/hubs/chat");

// Map MVC Controllers (Admin) and API Controllers
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
