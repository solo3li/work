using EcomServer.Data;
using EcomServer.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EcomServer.GraphQL
{
    public class Mutation
    {
        public async Task<Product> AddProductAsync(
            string name, string description, decimal price, int categoryId, 
            AppDbContext context)
        {
            var product = new Product
            {
                Name = name,
                Description = description,
                Price = price,
                CategoryId = categoryId
            };

            context.Products.Add(product);
            await context.SaveChangesAsync();
            return product;
        }

        public async Task<Category> AddCategoryAsync(
            string name, 
            AppDbContext context)
        {
            var category = new Category { Name = name };
            context.Categories.Add(category);
            await context.SaveChangesAsync();
            return category;
        }

        public async Task<User> RegisterUserAsync(
            string username, string password, 
            AppDbContext context)
        {
            // Note: In a real app, hash the password!
            var user = new User 
            { 
                Username = username, 
                PasswordHash = password,
                Role = "Customer" 
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return user;
        }

        public async Task<Order> CreateOrderAsync(
            int userId, List<OrderItemInput> items, 
            AppDbContext context)
        {
            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.UtcNow
            };

            foreach (var item in items)
            {
                order.OrderItems.Add(new OrderItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice
                });
            }

            context.Orders.Add(order);
            await context.SaveChangesAsync();
            return order;
        }
    }

    public class OrderItemInput
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}