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
        await GetOrCreateUser(context, "admin@uis.com", "مدير النظام الرئيسي", "admin123", adminRole.Id);

        // 3. Seed Students (Large batch)
        var students = new List<User>();
        for (int i = 1; i <= 20; i++)
        {
            var user = await GetOrCreateUser(context, $"student{i}@uis.com", $"طالب رقم {i}", "pass123", studentRole.Id);
            students.Add(user);
        }

        // 4. Seed Executors (Large batch)
        var executors = new List<User>();
        for (int i = 1; i <= 15; i++)
        {
            var user = await GetOrCreateUser(context, $"executor{i}@uis.com", $"منفذ خدمات {i}", "pass123", executorRole.Id);
            executors.Add(user);
        }
        await context.SaveChangesAsync();

        // 5. Seed KYC Requests for Executors
        if (await context.KycRequests.CountAsync() < 10)
        {
            foreach (var ex in executors)
            {
                if (!await context.KycRequests.AnyAsync(k => k.UserId == ex.Id))
                {
                    context.KycRequests.Add(new KycRequest 
                    { 
                        UserId = ex.Id, 
                        NationalId = "29000000000000" + (ex.Email.Length % 10), 
                        Phone = "010000000" + (ex.Email.Length % 10),
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

        // 7. Seed Services (Large batch)
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
                        Description = $"وصف تفصيلي لخدمة {cat.Name} المتميزة رقم {i}", 
                        BasePrice = random.Next(50, 1000), 
                        CategoryId = cat.Id 
                    });
                }
            }
            await context.SaveChangesAsync();
        }
        var services = await context.Services.ToListAsync();

        // 8. Seed Orders (Large batch)
        if (await context.Orders.CountAsync() < 20)
        {
            var random = new Random();
            var statuses = new[] { "Pending", "In Progress", "Completed", "Cancelled" };
            
            for (int i = 0; i <= 50; i++)
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
                    Price = service.BasePrice, 
                    Status = status,
                    CreatedAt = DateTime.UtcNow.AddDays(-random.Next(1, 30))
                });
            }
            await context.SaveChangesAsync();
        }

        // 9. Seed Tickets
        if (await context.Tickets.CountAsync() < 5)
        {
            var random = new Random();
            for (int i = 1; i <= 10; i++)
            {
                var user = random.Next(2) == 0 ? students[random.Next(students.Count)] : executors[random.Next(executors.Count)];
                context.Tickets.Add(new Ticket 
                { 
                    UserId = user.Id, 
                    Subject = $"مشكلة فنية رقم {i}", 
                    Status = i % 3 == 0 ? "Closed" : "Open" 
                });
            }
            await context.SaveChangesAsync();
        }

        // 10. Seed Notifications
        if (await context.Notifications.CountAsync() < 10)
        {
            foreach (var student in students.Take(10))
            {
                context.Notifications.Add(new Notification { UserId = student.Id, Message = "مرحباً بك في منصة UIS المحدثة!", CreatedAt = DateTime.UtcNow });
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

    private static async Task<User> GetOrCreateUser(ApplicationDbContext context, string email, string fullName, string password, Guid roleId)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            user = new User
            {
                Email = email,
                FullName = fullName,
                PasswordHash = password,
                RoleId = roleId,
                IsActive = true
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();
        }
        return user;
    }
}
