using System;
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

        // Ensure database is created and migrations are applied
        await context.Database.MigrateAsync();

        // 1. Seed Roles
        var adminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "Admin");
        if (adminRole == null)
        {
            adminRole = new Role { Name = "Admin" };
            context.Roles.Add(adminRole);
        }

        var studentRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "Student");
        if (studentRole == null)
        {
            studentRole = new Role { Name = "Student" };
            context.Roles.Add(studentRole);
        }

        var executorRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "Executor");
        if (executorRole == null)
        {
            executorRole = new Role { Name = "Executor" };
            context.Roles.Add(executorRole);
        }
        
        await context.SaveChangesAsync();

        // 2. Seed Admin User
        var adminUser = await context.Users.FirstOrDefaultAsync(u => u.Email == "admin@uis.com");
        if (adminUser == null)
        {
            adminUser = new User
            {
                Email = "admin@uis.com",
                FullName = "System Admin",
                PasswordHash = "admin123", // Basic hashing skipped for MVP based on AuthService logic
                RoleId = adminRole.Id,
                IsActive = true
            };
            context.Users.Add(adminUser);
            await context.SaveChangesAsync();
        }

        // 3. Seed Categories
        if (!await context.Categories.AnyAsync())
        {
            var categories = new[]
            {
                new Category { Name = "مشاريع تخرج" },
                new Category { Name = "تصميم" },
                new Category { Name = "برمجة" },
                new Category { Name = "ترجمة" },
                new Category { Name = "شرح مواد" }
            };
            
            context.Categories.AddRange(categories);
            await context.SaveChangesAsync();

            // 4. Seed Dummy Service
            var service = new Service
            {
                Title = "تصميم عرض تقديمي احترافي لمشروع التخرج",
                Description = "تصميم شرائح PowerPoint احترافية بجودة عالية لتغطية كل متطلبات مشروع التخرج.",
                BasePrice = 150m,
                CategoryId = categories[1].Id, // تصميم
                IsActive = true
            };
            context.Services.Add(service);
            await context.SaveChangesAsync();
        }
    }
}
