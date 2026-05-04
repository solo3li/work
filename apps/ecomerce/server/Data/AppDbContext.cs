using Microsoft.EntityFrameworkCore;
using EcomServer.Models;

namespace EcomServer.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed admin user
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                Username = "admin",
                PasswordHash = "admin", // In a real app, hash this!
                Role = "Admin"
            });

            // Seed Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Electronics" },
                new Category { Id = 2, Name = "Clothing" },
                new Category { Id = 3, Name = "Books" }
            );

            // Seed Products
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Smartphone", Description = "Latest model smartphone", Price = 699.99m, CategoryId = 1 },
                new Product { Id = 2, Name = "Laptop", Description = "High performance laptop", Price = 1299.99m, CategoryId = 1 },
                new Product { Id = 3, Name = "T-Shirt", Description = "Cotton casual t-shirt", Price = 19.99m, CategoryId = 2 },
                new Product { Id = 4, Name = "Jeans", Description = "Blue denim jeans", Price = 49.99m, CategoryId = 2 },
                new Product { Id = 5, Name = "Novel", Description = "Bestselling fiction novel", Price = 14.99m, CategoryId = 3 }
            );
        }
    }
}