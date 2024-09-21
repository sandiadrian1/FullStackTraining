using Microsoft.EntityFrameworkCore;
using TechnicalTest.Models;

namespace TechnicalTest.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
        public DbSet<Item> Items { get; set; }
        public DbSet<TransaksiItem> TransaksiItems { get; set; }
        public DbSet<User> Users { get; set; }


    }
}
