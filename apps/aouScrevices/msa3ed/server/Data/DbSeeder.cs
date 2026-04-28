using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Uis.Server.Models;

namespace Uis.Server.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await context.Database.MigrateAsync();

        // 1. Seed Roles
        var adminRole = await GetOrCreateRole(context, "Admin");
        var studentRole = await GetOrCreateRole(context, "Student");
        var executorRole = await GetOrCreateRole(context, "Executor");
        await context.SaveChangesAsync();

        // 2. Seed Admin
        await GetOrCreateUser(context, "admin@uis.com", "مدير النظام الرئيسي", "admin123", adminRole.Id, "جامعة القاهرة", "إدارة نظم معلومات", "مدير المنصة المسؤول عن المراجعة والتحكيم.");

        // 3. Seed Students (Large batch with details)
        var students = new List<User>();
        var universities = new[] { "جامعة القاهرة", "جامعة عين شمس", "جامعة الإسكندرية", "جامعة المنصورة" };
        var majors = new[] { "هندسة حاسبات", "علوم حاسب", "تجارة", "آداب لغة إنجليزية", "حقوق" };

        for (int i = 1; i <= 20; i++)
        {
            var user = await GetOrCreateUser(context, $"student{i}@uis.com", $"طالب رقم {i}", "pass123", studentRole.Id, 
                universities[i % universities.Length], 
                majors[i % majors.Length], 
                $"أنا طالب في السنة {((i%4)+1)}، أحتاج لمساعدة في بعض المشاريع الأكاديمية.");
            students.Add(user);
        }

        // 4. Seed Executors (Large batch with details)
        var executors = new List<User>();
        for (int i = 1; i <= 15; i++)
        {
            var user = await GetOrCreateUser(context, $"executor{i}@uis.com", $"منفذ خدمات {i}", "pass123", executorRole.Id,
                universities[(i+2) % universities.Length],
                majors[(i+1) % majors.Length],
                $"خبير في مجال {majors[(i+1) % majors.Length]} ولدي خبرة أكثر من 3 سنوات في تنفيذ المشاريع الطلابية بجودة عالية.");
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
            var allStudents = await context.Users.Where(u => u.Role.Name == "Student").ToListAsync();
            var allExecutors = await context.Users.Where(u => u.Role.Name == "Executor").ToListAsync();

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
    }

    private static async Task<Role> GetOrCreateRole(ApplicationDbContext context, string name)
    {
        var role = await context.Roles.FirstOrDefaultAsync(r => r.Name == name);
        if (role == null)
        {
            role = new Role { Name = name };
            context.Roles.Add(role);
        }
        return role;
    }

    private static async Task<User> GetOrCreateUser(ApplicationDbContext context, string email, string fullName, string password, Guid roleId, string? uni = null, string? major = null, string? bio = null)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
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
                RoleId = roleId,
                IsActive = true
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();
        }
        return user;
    }
}
