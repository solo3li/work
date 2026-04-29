using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Uis.Server.Models;
using Uis.Server.Services;

namespace Uis.Server.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await context.Database.MigrateAsync();

        // 1. Seed Roles
        var adminRole = await GetOrCreateRole(context, "Admin", "Full access to all system features", true);
        var studentRole = await GetOrCreateRole(context, "Student", "Standard student access", true);
        var executorRole = await GetOrCreateRole(context, "Executor", "Service execution access", true);
        await context.SaveChangesAsync();

        // 1.1 Seed Permissions
        if (!await context.Permissions.AnyAsync())
        {
            var permissions = new List<Permission>
            {
                new Permission { Group = "Management", Name = "Users.View", Description = "Can view users list and details" },
                new Permission { Group = "Management", Name = "Users.Edit", Description = "Can toggle user status and edit roles" },
                new Permission { Group = "Management", Name = "Roles.Manage", Description = "Full control over roles and permissions" },
                new Permission { Group = "KYC", Name = "Kyc.Process", Description = "Can approve or reject KYC requests" },
                new Permission { Group = "Catalog", Name = "Services.Manage", Description = "Can CRUD services and categories" },
                new Permission { Group = "Operations", Name = "Orders.View", Description = "Can monitor all orders" },
                new Permission { Group = "Operations", Name = "Orders.Manage", Description = "Can update order statuses" },
                new Permission { Group = "Finance", Name = "Payments.View", Description = "Can view transaction history" },
                new Permission { Group = "Finance", Name = "Disputes.Resolve", Description = "Can arbitrate and resolve financial disputes" },
                new Permission { Group = "Support", Name = "Tickets.Manage", Description = "Can respond to and close support tickets" }
            };
            context.Permissions.AddRange(permissions);
            await context.SaveChangesAsync();

            // Assign all permissions to Admin role
            foreach (var p in permissions)
            {
                context.RolePermissions.Add(new RolePermission { RoleId = adminRole.Id, PermissionId = p.Id });
            }
            await context.SaveChangesAsync();
        }

        // 2. Seed Admin
        await GetOrCreateUser(context, "admin@uis.com", "مدير النظام الرئيسي", "admin123", new List<Role> { adminRole, studentRole }, 
            isAdmin: true, isStaff: true, uni: "جامعة القاهرة", major: "إدارة نظم معلومات", 
            bio: "مدير المنصة المسؤول عن المراجعة والتحكيم.");

        // 3. Seed Students (Large batch with details)
        var students = new List<User>();
        var universities = new[] { "جامعة القاهرة", "جامعة عين شمس", "جامعة الإسكندرية", "جامعة المنصورة" };
        var majors = new[] { "هندسة حاسبات", "علوم حاسب", "تجارة", "آداب لغة إنجليزية", "حقوق" };

        for (int i = 1; i <= 20; i++)
        {
            var user = await GetOrCreateUser(context, $"student{i}@uis.com", $"طالب رقم {i}", "pass123", new List<Role> { studentRole },
                isAdmin: false, isStaff: false, uni: universities[i % universities.Length], 
                major: majors[i % majors.Length], 
                bio: $"أنا طالب في السنة {((i%4)+1)}، أحتاج لمساعدة في بعض المشاريع الأكاديمية.");
            students.Add(user);
        }

        // 4. Seed Executors (Large batch with details)
        var executors = new List<User>();
        for (int i = 1; i <= 15; i++)
        {
            // Executors also have Student role
            var user = await GetOrCreateUser(context, $"executor{i}@uis.com", $"منفذ خدمات {i}", "pass123", new List<Role> { studentRole, executorRole },
                isAdmin: false, isStaff: false, isExecutor: true, uni: universities[(i+2) % universities.Length],
                major: majors[(i+1) % majors.Length],
                bio: $"خبير في مجال {majors[(i+1) % majors.Length]} ولدي خبرة أكثر من 3 سنوات في تنفيذ المشاريع الطلابية بجودة عالية.");
            executors.Add(user);
        }
        await context.SaveChangesAsync();

        // 5. Seed KYC Requests for Executors (With extra details)
        if (await context.KycRequests.CountAsync() < 10)
        {
            var cities = new[] { "القاهرة، مدينة نصر", "الجيزة، الدقي", "الإسكندرية، سموحة", "المنصورة، المشاية" };
            foreach (var ex in executors)
            {
                if (!await context.KycRequests.AnyAsync(k => k.UserId == ex.Id))
                {
                    context.KycRequests.Add(new KycRequest 
                    { 
                        UserId = ex.Id, 
                        NationalId = "2900000" + (1000000 + ex.Email.Length * 100), 
                        Phone = "010" + (10000000 + ex.Email.Length * 50),
                        Address = cities[ex.FullName.Length % cities.Length],
                        BirthDate = DateTime.UtcNow.AddYears(-25).AddDays(ex.FullName.Length),
                        IdExpiryDate = DateTime.UtcNow.AddYears(5),
                        Status = ex.Email.Length % 3 == 0 ? "Pending" : "Approved"
                    });
                }
            }
            await context.SaveChangesAsync();
        }

        // 6. Seed Categories
        if (!await context.Categories.AnyAsync())
        {
            context.Categories.AddRange(
                new Category { Name = "مشاريع تخرج" },
                new Category { Name = "تصميم جرافيك" },
                new Category { Name = "برمجة تطبيقات" },
                new Category { Name = "ترجمة معتمدة" },
                new Category { Name = "شرح مواد هندسية" },
                new Category { Name = "أبحاث علمية" },
                new Category { Name = "تحليل بيانات" },
                new Category { Name = "كتابة محتوى" }
            );
            await context.SaveChangesAsync();
        }
        var categories = await context.Categories.ToListAsync();

        // 7. Seed Services
        if (await context.Services.CountAsync() < 10)
        {
            var random = new Random();
            foreach (var cat in categories)
            {
                for (int i = 1; i <= 3; i++)
                {
                    context.Services.Add(new Service 
                    { 
                        Title = $"{cat.Name} - خدمة رقم {i}", 
                        Description = $"وصف تفصيلي لخدمة {cat.Name} المتميزة رقم {i}. نضمن لك الجودة والالتزام بالمواعيد.", 
                        BasePrice = random.Next(50, 1000), 
                        CategoryId = cat.Id 
                    });
                }
            }
            await context.SaveChangesAsync();
        }
        var services = await context.Services.ToListAsync();

        // 8. Seed Orders
        if (await context.Orders.CountAsync() < 50)
        {
            var random = new Random();
            var statuses = new[] { "Pending", "In Progress", "Completed", "Cancelled" };
            
            for (int i = 0; i < 60; i++)
            {
                var student = students[random.Next(students.Count)];
                var service = services[random.Next(services.Count)];
                var status = statuses[random.Next(statuses.Length)];
                User? executor = status != "Pending" ? executors[random.Next(executors.Count)] : null;

                context.Orders.Add(new Order 
                { 
                    StudentId = student.Id, 
                    ExecutorId = executor?.Id, 
                    ServiceId = service.Id, 
                    Price = service.BasePrice + random.Next(-20, 100), 
                    Status = status,
                    CreatedAt = DateTime.UtcNow.AddDays(-random.Next(1, 60))
                });
            }
            await context.SaveChangesAsync();
        }

        // 9. Seed Payments & Escrows (Ensuring all eligible orders have transactions)
        var allOrders = await context.Orders.ToListAsync();
        var existingPaymentOrderIds = await context.Payments.Select(p => p.OrderId).ToListAsync();
        
        foreach (var order in allOrders)
        {
            if (order.Status != "Pending" && !existingPaymentOrderIds.Contains(order.Id))
            {
                var paymentStatus = order.Status == "Cancelled" ? "Refunded" : "Completed";
                
                // Occasionally add a 'Failed' payment for realism
                if (order.GetHashCode() % 10 == 0 && order.Status == "Pending") paymentStatus = "Failed";

                context.Payments.Add(new Payment 
                { 
                    OrderId = order.Id, 
                    Amount = order.Price, 
                    Status = paymentStatus, 
                    TransactionId = "TXN_" + Guid.NewGuid().ToString().Substring(0, 12).ToUpper() 
                });

                var escrowStatus = order.Status == "Completed" ? "Released" : 
                                  order.Status == "Cancelled" ? "Refunded" : "Held";

                context.Escrows.Add(new Escrow 
                { 
                    OrderId = order.Id, 
                    Amount = order.Price, 
                    Status = escrowStatus 
                });

                // 10. Seed Chat & Messages for this order
                if (order.ExecutorId.HasValue && !await context.Chats.AnyAsync(c => c.OrderId == order.Id))
                {
                    var chat = new Chat { OrderId = order.Id };
                    context.Chats.Add(chat);
                    await context.SaveChangesAsync();

                    var msgs = new List<Message>
                    {
                        new Message { ChatId = chat.Id, SenderId = order.StudentId, Content = "مرحباً، هل بدأت العمل؟", SentAt = order.CreatedAt.AddMinutes(10) },
                        new Message { ChatId = chat.Id, SenderId = order.ExecutorId.Value, Content = "أهلاً بك، نعم سأبدأ الآن وسأوافيك بالتطورات.", SentAt = order.CreatedAt.AddHours(1) },
                        new Message { ChatId = chat.Id, SenderId = order.StudentId, Content = "ممتاز، شكراً جزيلاً لك.", SentAt = order.CreatedAt.AddHours(2) }
                    };

                    if (order.Status == "Completed")
                    {
                        msgs.Add(new Message { ChatId = chat.Id, SenderId = order.ExecutorId.Value, Content = "لقد انتهيت من العمل ورفعت الملفات المطلوبة.", SentAt = order.CreatedAt.AddDays(1) });
                        msgs.Add(new Message { ChatId = chat.Id, SenderId = order.StudentId, Content = "تم الاستلام، جودة رائعة!", SentAt = order.CreatedAt.AddDays(1).AddHours(2) });
                    }

                    context.Messages.AddRange(msgs);
                }
            }
        }
        await context.SaveChangesAsync();

        // 11. Seed Private Chats (Direct Messages without orders)
        if (await context.Chats.CountAsync(c => c.OrderId == null) < 5)
        {
            var allStudents = await context.Users.Where(u => u.Roles.Any(r => r.Name == "Student")).ToListAsync();
            var allExecutors = await context.Users.Where(u => u.Roles.Any(r => r.Name == "Executor")).ToListAsync();

            for (int i = 0; i < 5; i++)
            {
                var student = allStudents[i % allStudents.Count];
                var executor = allExecutors[i % allExecutors.Count];
                
                var privateChat = new Chat { StudentId = student.Id, ExecutorId = executor.Id };
                context.Chats.Add(privateChat);
                await context.SaveChangesAsync();

                context.Messages.AddRange(
                    new Message { ChatId = privateChat.Id, SenderId = student.Id, Content = "مرحباً، أود الاستفسار عن خدماتك بشكل مباشر.", SentAt = DateTime.UtcNow.AddDays(-2) },
                    new Message { ChatId = privateChat.Id, SenderId = executor.Id, Content = "أهلاً بك! أنا متاح للرد على أي استفسار بخصوص البرمجة أو التصميم.", SentAt = DateTime.UtcNow.AddDays(-2).AddMinutes(15) }
                );
            }
            await context.SaveChangesAsync();
        }

        await SeedSystemSettings(context);
        await context.SaveChangesAsync();
    }

    private static async Task SeedSystemSettings(ApplicationDbContext context)
    {
        if (!await context.SystemSettings.AnyAsync())
        {
            context.SystemSettings.AddRange(
                new SystemSetting { Key = "Email.SmtpServer", Value = "smtp.gmail.com", Description = "SMTP Server Host" },
                new SystemSetting { Key = "Email.SmtpPort", Value = "587", Description = "SMTP Server Port" },
                new SystemSetting { Key = "Email.SenderName", Value = "UIS", Description = "Sender Display Name" },
                new SystemSetting { Key = "Email.SenderEmail", Value = "fps60y@gmail.com", Description = "Sender Email Address" },
                new SystemSetting { Key = "Email.Password", Value = "pljh isws wssg oakn", Description = "SMTP App Password" },
                new SystemSetting { Key = "Email.Template.Base", Value = EmailTemplates.GetDefaultBaseTemplate(), Description = "Main HTML Template Wrapper (Use {TITLE} and {CONTENT})" }
            );
        }
    }

    private static async Task<Role> GetOrCreateRole(ApplicationDbContext context, string name, string? description = null, bool isSystem = false)
    {
        var role = await context.Roles.FirstOrDefaultAsync(r => r.Name == name);
        if (role == null)
        {
            role = new Role { Name = name, Description = description, IsSystemRole = isSystem };
            context.Roles.Add(role);
        }
        return role;
    }

    private static async Task<User> GetOrCreateUser(ApplicationDbContext context, string email, string fullName, string password, List<Role> roles, 
        bool isAdmin = false, bool isExecutor = false, bool isStaff = false, string? uni = null, string? major = null, string? bio = null)
    {
        var user = await context.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            user = new User
            {
                Email = email,
                FullName = fullName,
                PasswordHash = password,
                University = uni,
                Major = major,
                Bio = bio,
                IsAdmin = isAdmin,
                IsExecutor = isExecutor,
                IsStaff = isStaff,
                IsActive = true
            };
            foreach (var role in roles)
            {
                user.Roles.Add(role);
            }
            context.Users.Add(user);
            await context.SaveChangesAsync();
        }
        return user;
    }
}
