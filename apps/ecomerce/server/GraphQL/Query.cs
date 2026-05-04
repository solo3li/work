using EcomServer.Data;
using EcomServer.Models;
using System.Linq;

namespace EcomServer.GraphQL
{
    public class Query
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Product> GetProducts(AppDbContext context) => context.Products;

        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Category> GetCategories(AppDbContext context) => context.Categories;

        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Order> GetOrders(AppDbContext context) => context.Orders;

        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<User> GetUsers(AppDbContext context) => context.Users;
    }
}